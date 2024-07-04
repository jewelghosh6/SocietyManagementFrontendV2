function formatToTimeString(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new RangeError("Invalid time value");
  }
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(":", ".")
    .toLowerCase();
}

export default formatToTimeString;
