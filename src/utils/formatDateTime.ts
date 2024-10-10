const DateUtilityFunction = {
  formatToTimeString: (date: Date): string => {
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
  },
  formatTimeDifference: (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new RangeError("Invalid time value");
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const units: [number, string][] = [
      [60, "seconds"],
      [60, "minutes"],
      [24, "hours"],
      [7, "days"],
      [4.34524, "weeks"],
      [12, "months"],
      [Infinity, "years"],
    ];

    let unitIndex = 0;
    let diff = diffInSeconds;

    while (diff >= units[unitIndex][0] && unitIndex < units.length - 1) {
      diff /= units[unitIndex][0];
      unitIndex++;
    }

    const timeValue = Math.floor(diff);
    const unit = units[unitIndex][1];

    return `${timeValue} ${unit} ago`;
  },
};

// export default formatTimeDifference;

export default DateUtilityFunction;
