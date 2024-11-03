export const generateFallbackFromName = (fullname) => {
  const parts = fullname.split(" ").map((word) => word[0]);
  return parts.slice(0, 2).join("").toUpperCase();
};
