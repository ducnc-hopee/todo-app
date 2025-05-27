export default function date(dateTime) {
  const date = new Date(dateTime);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const formatted = `${day} ${month} ${year}`;
  return formatted;
}
