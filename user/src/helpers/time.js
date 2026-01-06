import { timeOfDayData } from "src/data/timeOfDayData";
import { timezoneOffsetsData } from "src/data/timezoneOffsetsData";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

export function getTimeSince(inputDate) {
  const date = new Date(inputDate);
  const secondsAgo = Math.round((Date.now() - Number(date)) / 1000);
  if (secondsAgo < 5) {
    return "Just now";
  }
  if (secondsAgo < MINUTE) {
    return secondsAgo + ` second${secondsAgo > 1 ? "s" : ""} ago`;
  }

  let divisor, unit;
  if (secondsAgo < HOUR) {
    [divisor, unit] = [MINUTE, "minute"];
  } else if (secondsAgo < DAY) {
    [divisor, unit] = [HOUR, "hour"];
  } else if (secondsAgo < WEEK) {
    [divisor, unit] = [DAY, "day"];
  } else if (secondsAgo < MONTH) {
    [divisor, unit] = [WEEK, "week"];
  } else if (secondsAgo < YEAR) {
    [divisor, unit] = [MONTH, "month"];
  } else {
    [divisor, unit] = [YEAR, "year"];
  }
  const timeAgo = Math.floor(secondsAgo / divisor);
  return `${timeAgo} ${unit}${timeAgo > 1 ? "s" : ""} ago`;
}

function extractDate(date) {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
}

export function generateCalendar({ month, year }) {
  const arr = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  if (weekdayOfFirstDay === 0) {
    weekdayOfFirstDay = 7;
  }
  for (let i = 0; weekdayOfFirstDay > 1; i--) {
    const yesterday = new Date(year, month, i);
    arr.push({
      ...extractDate(yesterday),
      isDisabled: true,
    });
    weekdayOfFirstDay--;
  }
  arr.reverse();

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dayInMonth = new Date(year, month, i);
    arr.push({
      ...extractDate(dayInMonth),
    });
  }

  let weekdayOfLastDay = lastDayOfMonth.getDay();
  for (let i = 1; weekdayOfLastDay > 0; i++) {
    const tomorrow = new Date(year, month + 1, i);
    arr.push({
      ...extractDate(tomorrow),
      isDisabled: true,
    });
    weekdayOfLastDay++;
    if (weekdayOfLastDay === 7) {
      weekdayOfLastDay = 0;
    }
  }
  return arr;
}

export function getCurrentDateAsMMDDYYYY(month, day, year) {
  return `${("0" + (month + 1)).slice(-2)}/${("0" + day).slice(-2)}/${year}`;
}

export function getCurrentDateWithOrdinalSuffix() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  let daySuffix;
  if (day % 10 === 1 && day !== 11) {
    daySuffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    daySuffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  return `${month} ${day}${daySuffix}, ${year}`;
}

export function getTimeOfDay() {
  const hour = new Date().getHours();
  let lastEntry = timeOfDayData[timeOfDayData.length - 1];

  for (let i = 0; i < timeOfDayData.length; i++) {
    if (hour < timeOfDayData[i].hour) {
      return lastEntry;
    }
    lastEntry = timeOfDayData[i];
  }

  return lastEntry;
}

export function getTimestamp() {
  return new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });
}

export function readTimestamp(timestamp) {
  const [month, day, year, at, time, period, timezone] =
    timestamp.split(/[\s,]+/);
  let [hour, minute, second] = time.split(":");

  hour = parseInt(hour, 10);
  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }
  const date = new Date(`${month} ${day}, ${year} ${hour}:${minute}:${second}`);

  const offset = timezoneOffsetsData[timezone];
  date.setHours(date.getHours() + offset);

  return date;
}
