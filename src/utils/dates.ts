export function convertDate(date: string): string {
  if (!date) {
    throw new Error("Date is required");
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const parts = date.split("-");
  if (parts.length !== 3) {
    throw new Error("Invalid date format");
  }

  const [year, month, day] = parts.map(Number);

  const suffix = (day: number): string => {
    if (day >= 11 && day <= 13) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  if (month === undefined || day === undefined) {
    throw new Error("Invalid date format");
  }

  return `${months[month - 1]} ${suffix(day)}, ${year}`;
}
