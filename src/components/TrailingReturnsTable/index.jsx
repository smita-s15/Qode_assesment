import React from "react";
import "./TrailingReturnsTable.css";

const periods = ["1M", "3M", "6M", "1Y", "3Y", "5Y", "SI", "DD", "MAXDD"];

const TrailingReturnsTable = ({ data }) => {
  return (
    <div className="table-wrapper">
      <table className="trailing-table">
        <thead>
          <tr>
            <th>Scheme / Benchmark</th>
            {periods.map((p) => (
              <th key={p}>{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name}>
              <td className="scheme-name">{row.name}</td>
              {periods.map((p) => (
                <td key={p}>{row[p] !== undefined ? row[p] : "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrailingReturnsTable;
