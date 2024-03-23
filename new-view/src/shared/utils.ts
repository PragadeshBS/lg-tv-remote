const shortenText = (text: string, maxLength: number) => {
  if (!text) return text;
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export { shortenText };
