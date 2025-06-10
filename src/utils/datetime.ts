import { formatDate, formatDistanceToNow } from "date-fns";

export function formatForNewsCard(date: Date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export function formatDateFromExcelToData(dateString: string) {
  const [day, month, year] = dateString.split(".");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function formatDateAgo(date: string) {
  return formatDistanceToNow(formatDate(date, "dd.MM.yyyy"), {
    addSuffix: true,
  });
}
