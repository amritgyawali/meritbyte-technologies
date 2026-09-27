// Dates are formatted at build time in one fixed locale, so the HTML is the
// same on every build machine.
export function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
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
    "December"
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
