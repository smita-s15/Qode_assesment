import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export const useExcelData = (filePath) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      } catch (error) {
        console.error("Excel read error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filePath]);

  return { data, loading };
};
