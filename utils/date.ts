const getTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getFormattedDay = (date: Date, opts?: Intl.DateTimeFormatOptions) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  });
};

export { getFormattedDay, getTime };
