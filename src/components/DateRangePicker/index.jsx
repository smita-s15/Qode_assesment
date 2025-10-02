import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css";

function DateRangePicker({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div className="date-range-picker">
      <div className="date-picker-container">
        <label htmlFor="start-date">From Date</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd-MM-yyyy"
          placeholderText="Select start date"
        />
      </div>

      <div className="date-picker-container">
        <label htmlFor="end-date">End Date</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd-MM-yyyy"
          placeholderText="Select end date"
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
