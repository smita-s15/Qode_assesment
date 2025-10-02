import React, { useEffect, useState, lazy, Suspense } from "react";
import "./portfolio.css";
import { FiDownload } from "react-icons/fi";
import { RiResetLeftFill } from "react-icons/ri";
import { getTrailingReturnsRow, readNavExcel } from "../../utils/excelUtils";
import Loader from "../../components/Loader";

const TrailingReturnsTable = lazy(() =>
  import("../../components/TrailingReturnsTable")
);
const EquityCurveChart = lazy(() =>
  import("../../components/EquityCurveChart")
);
const DateRangePicker = lazy(() => import("../../components/DateRangePicker"));

function PortFolio() {
  const [data, setData] = useState([]);

  const [navData, setNavData] = useState([]);
  const [filteredNavData, setFilteredNavData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        const fundRow = await getTrailingReturnsRow("Quant Active Fund Gr");
        const niftyRow = await getTrailingReturnsRow("NIFTY50");
        setData([fundRow, niftyRow]);
        const nav = await readNavExcel();
        setNavData(nav);
        setFilteredNavData(nav);
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!navData.length) return;
    setFilterLoading(true);
    const timeout = setTimeout(() => {
      if (!startDate && !endDate) {
        setFilteredNavData(navData);
      } else {
        const filtered = navData.filter((item) => {
          const itemDate = new Date(item.Date);
          return (
            (!startDate || itemDate >= startDate) &&
            (!endDate || itemDate <= endDate)
          );
        });
        setFilteredNavData(filtered);
      }
      setFilterLoading(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [startDate, endDate, navData]);

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredNavData(navData);
  };

  const handleDownloadExcel = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) => headers.map((key) => row[key]).join(",")),
    ];
    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Trailing_Returns.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="portfolio-page">
      {fetchLoading && <Loader />}

      {!fetchLoading && (
        <>
          <div>
            <div className="trail_table_title">
              <h2 className="title_portfolio">Trailing Returns (%)</h2>
              <span onClick={handleDownloadExcel} className="download_file">
                <FiDownload />
              </span>
            </div>
            {data.length === 0 ? (
              <Loader />
            ) : (
              <Suspense fallback={<Loader />}>
                <TrailingReturnsTable data={data} />
              </Suspense>
            )}
            <p className="note_title">Note- Data above 1 Year is annualised</p>
          </div>

          <div>
            <h1 className="title_portfolio">Equity Curve</h1>
            <div className="chart_title_section">
              <div className="subtitle">
                <p className="note_title">Live Since 2015-01-01</p>
                <div className="reset_icons_wrapper" onClick={handleReset}>
                  <RiResetLeftFill /> Reset
                </div>
              </div>

              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>

            {filterLoading ? (
              <Loader />
            ) : filteredNavData.length > 0 ? (
              <Suspense fallback={<Loader />}>
                <EquityCurveChart data={filteredNavData} />
              </Suspense>
            ) : (
              <p className="note_title">No data available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PortFolio;
