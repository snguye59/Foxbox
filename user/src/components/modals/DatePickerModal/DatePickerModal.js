import styles from "./DatePickerModal.module.css";
import { generateCalendar, getCurrentDateAsMMDDYYYY } from "src/helpers/time";
import { useState, useEffect } from "react";
import { monthsData } from "src/data/monthsData";
import { weekdaysData } from "src/data/weekdaysData";
import {
  CancelButton,
  SubmitButton,
  CalendarNavigationButton,
} from "src/components/buttons";

const DatePickerModal = ({ name, value, onChange, onCancel }) => {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [calendar, setCalendar] = useState();
  const [selectedDate, setSelectedDate] = useState();

  function handleMonthIncrease() {
    setMonth((month + 1) % 12);
    setYear(year + (month === 11 ? 1 : 0));
  }

  function handleMonthDecrease() {
    setMonth(month === 0 ? 11 : month - 1);
    setYear(year - (month === 0 ? 1 : 0));
  }

  function handleYearIncrease() {
    setYear(year + 1);
  }

  function handleYearDecrease() {
    setYear(year - 1);
  }

  useEffect(() => {
    if (value) {
      const [month, day, year] = value.split("/").map(Number);
      setMonth(month - 1);
      setYear(year);
      setSelectedDate(value);

      const calendar = generateCalendar({
        month: month - 1,
        year,
      });
      setCalendar(calendar);
    } else {
      const today = new Date();
      setMonth(today.getMonth());
      setYear(today.getFullYear());

      const calendar = generateCalendar({ month, year });
      setCalendar(calendar);
    }
  }, [value]);

  useEffect(() => {
    const calendar = generateCalendar({ month, year });
    setCalendar(calendar);
  }, [month, year]);

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.calendarButtons}>
          <CalendarNavigationButton
            dateInterval="year"
            direction="backward"
            onClick={handleYearDecrease}
          />
          <CalendarNavigationButton
            dateInterval="month"
            direction="backward"
            onClick={handleMonthDecrease}
          />
        </div>
        <p>
          {monthsData[month]?.abbreviation} {year}
        </p>
        <div className={styles.calendarButtons}>
          <CalendarNavigationButton
            dateInterval="month"
            direction="forward"
            onClick={handleMonthIncrease}
          />
          <CalendarNavigationButton
            dateInterval="year"
            direction="forward"
            onClick={handleYearIncrease}
          />
        </div>
      </div>
      <div className={styles.weekdays}>
        {weekdaysData.map((weekday) => {
          const { day, abbreviation } = weekday;

          return (
            <DatePickerModal.DateButton
              key={day}
              text={abbreviation}
              isDisabled
            />
          );
        })}
      </div>
      <div className={styles.dates}>
        {calendar?.map((date) => {
          const today = new Date();
          const { day, month, year, isDisabled } = date;
          const formattedDate = getCurrentDateAsMMDDYYYY(month, day, year);

          return (
            <DatePickerModal.DateButton
              key={formattedDate}
              text={day}
              isToday={
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
              }
              isActive={selectedDate === formattedDate}
              isDisabled={isDisabled}
              onClick={() => setSelectedDate(formattedDate)}
            />
          );
        })}
      </div>
      <div className={styles.submitButtons}>
        <CancelButton text="Back" onClick={onCancel} />
        <SubmitButton
          text="Done"
          type="button"
          background="blue"
          onClick={() =>
            onChange({
              target: {
                name,
                value: selectedDate || "",
              },
            })
          }
        />
      </div>
    </div>
  );
};

const DateButton = ({ text, isToday, isActive, isDisabled, onClick }) => {
  return (
    <button
      type="button"
      className={` 
        ${styles.dateButton} 
        ${isToday ? styles.currentDate : ""}
        ${isActive ? styles.active : ""}
        ${isDisabled ? styles.disabled : ""}
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

DatePickerModal.DateButton = DateButton;
DateButton.displayName = "DateButton";

export default DatePickerModal;
