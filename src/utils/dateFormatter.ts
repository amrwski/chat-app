export const dateFormatter = (timestamp: string) => {
  const date = new Date(Number(timestamp));
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(date);
};
