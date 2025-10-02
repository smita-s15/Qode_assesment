import * as XLSX from "xlsx";
import navFile from "../data/data.xlsx";

// Parse DD-MM-YYYY to Date
const parseDDMMYYYY = (str) => {
  if (!str) return null;
  const [day, month, year] = str.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Read NAV Excel
export const readNavExcel = async () => {
  const res = await fetch(navFile);
  const arrayBuffer = await res.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rawJson = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

  const headerRowIndex = rawJson.findIndex(
    (row) => row[0] === "NAV Date" && row[1] === "NAV (Rs)"
  );

  if (headerRowIndex === -1) throw new Error("NAV table header not found");

  const dataRows = rawJson.slice(headerRowIndex + 1);

  const navData = dataRows
    .map((row) => ({
      Date: parseDDMMYYYY(row[0]),
      NAV: parseFloat(row[1]),
    }))
    .filter(
      (row) => row.Date instanceof Date && !isNaN(row.Date) && !isNaN(row.NAV)
    );

  // Keep descending order (latest first)
  return navData;
};

// Periods for trailing returns
const periodMap = {
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
  "3Y": 365 * 3,
  "5Y": 365 * 5,
  SI: null, // Since Inception
  DD: null, // Drawdown for last 1Y (example)
  MAXDD: null, // Max drawdown over entire NAV
};

// Calculate drawdown %
const calculateDrawdown = (navSeries) => {
  if (!navSeries || navSeries.length === 0) return "N/A";
  let peak = navSeries[0].NAV;
  let maxDD = 0;
  navSeries.forEach((row) => {
    if (row.NAV > peak) peak = row.NAV;
    const dd = (peak - row.NAV) / peak;
    if (dd > maxDD) maxDD = dd;
  });
  return (maxDD * 100).toFixed(2) + "%";
};

// Calculate trailing returns + DD + MaxDD
export const calculateTrailingReturns = (navData, periods = periodMap) => {
  if (!navData || navData.length === 0) return {};

  const latest = navData[0]; // latest NAV first
  const latestDate = latest.Date;
  const returns = {};

  Object.entries(periods).forEach(([label, days]) => {
    let past = null;

    if (label === "SI") {
      past = navData[navData.length - 1]; // oldest NAV
    } else if (label === "MAXDD") {
      returns[label] = calculateDrawdown(navData); // full history
      return;
    } else if (label === "DD") {
      // Example: Drawdown for last 1Y
      const targetDate = new Date(latestDate);
      targetDate.setDate(targetDate.getDate() - 365);
      past = navData.find((row) => row.Date <= targetDate);
      if (!past) {
        returns[label] = "N/A";
        return;
      }
      const subSeries = navData.filter((row) => row.Date >= past.Date);
      returns[label] = calculateDrawdown(subSeries);
      return;
    } else {
      const targetDate = new Date(latestDate);
      targetDate.setDate(targetDate.getDate() - days);
      past = navData.find((row) => row.Date <= targetDate);
    }

    if (!past) {
      returns[label] = "N/A";
      return;
    }

    const nYears =
      label === "SI"
        ? (latestDate - past.Date) / (365.25 * 24 * 60 * 60 * 1000)
        : days / 365.25;
    const ret =
      nYears >= 1
        ? ((latest.NAV / past.NAV) ** (1 / nYears) - 1) * 100 // annualized
        : (latest.NAV / past.NAV - 1) * 100; // simple for <1Y

    returns[label] = ret.toFixed(2) + "%";
  });

  return returns;
};

// Get trailing returns row for table
export const getTrailingReturnsRow = async (fundName) => {
  const navData = await readNavExcel();
  const returns = calculateTrailingReturns(navData);
  return { name: fundName, ...returns };
};
