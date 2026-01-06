import styles from "./MonthPickerModal.module.css";
import { useState, useEffect } from "react";
import { monthsData } from "src/data/monthsData";
import {
  CancelButton,
  SubmitButton,
  CalendarNavigationButton,
} from "src/components/buttons";

const MonthPickerModal = ({ name, value, onChange, onCancel }) => {
  const [year, setYear] = useState();
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    if (value) {
      const [month, year] = value.split(" ");
      setYear(Number(year));
      setSelectedDate(value);
    } else {
      const today = new Date();
      setYear(today.getFullYear());
    }
  }, [value]);

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <CalendarNavigationButton
          dateInterval="year"
          direction="backward"
          onClick={() => setYear(year - 1)}
        />
        <p>{year}</p>
        <CalendarNavigationButton
          dateInterval="year"
          direction="forward"
          onClick={() => setYear(year + 1)}
        />
      </div>
      <div className={styles.monthButtons}>
        {monthsData.map((entry, index) => {
          const { month, abbreviation } = entry;
          const formattedDate = `${month} ${year}`;

          return (
            <button
              key={formattedDate}
              type="button"
              className={` 
                ${styles.monthButton} 
                ${index === new Date().getMonth() ? styles.currentMonth : ""}
                ${selectedDate === formattedDate ? styles.active : ""}
              `}
              onClick={() => setSelectedDate(formattedDate)}
            >
              {abbreviation}
            </button>
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

export default MonthPickerModal;
