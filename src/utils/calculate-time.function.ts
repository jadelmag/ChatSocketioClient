export const calculateTime = (value: string): string => {
  const date = new Date(value);
  const dateStr = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return dateStr;
};
