// Working-hours overlap between Nepal (UTC+5:45, no daylight saving) and the
// markets we serve. Shown on the locations hub; kept here so the numbers live
// in one place.

export const NEPAL_TIME = "Nepal Time (NPT), UTC+5:45, no daylight saving";

export const OVERLAP = [
  {
    market: "Singapore",
    zone: "SGT, UTC+8",
    offset: "Nepal is 2 h 15 min behind",
    overlap: "Almost the whole working day"
  },
  {
    market: "UAE (Dubai, Abu Dhabi)",
    zone: "GST, UTC+4",
    offset: "Nepal is 1 h 45 min ahead",
    overlap: "Almost the whole working day"
  },
  {
    market: "Australia east coast (Sydney, Melbourne)",
    zone: "AEST UTC+10, AEDT UTC+11",
    offset: "Nepal is 4 h 15 min behind (5 h 15 min during Australian daylight saving)",
    overlap: "Your afternoon is our morning"
  },
  {
    market: "Brisbane (Queensland)",
    zone: "AEST UTC+10 all year",
    offset: "Nepal is 4 h 15 min behind, all year",
    overlap: "Your afternoon is our morning"
  },
  {
    market: "New Zealand (Auckland)",
    zone: "NZST UTC+12, NZDT UTC+13",
    offset: "Nepal is 6 h 15 min behind (7 h 15 min during NZ daylight saving)",
    overlap: "Your afternoon is our morning"
  },
  {
    market: "United Kingdom (London)",
    zone: "GMT UTC+0, BST UTC+1",
    offset: "Nepal is 4 h 45 min ahead in summer, 5 h 45 min in winter",
    overlap: "Your morning is our afternoon"
  },
  {
    market: "US East and Toronto (New York)",
    zone: "EDT UTC-4, EST UTC-5",
    offset: "Nepal is 9 h 45 min ahead in summer, 10 h 45 min in winter",
    overlap: "Your early morning is our evening; work moves overnight"
  },
  {
    market: "US Central (Chicago)",
    zone: "CDT UTC-5, CST UTC-6",
    offset: "Nepal is 10 h 45 min ahead in summer, 11 h 45 min in winter",
    overlap: "Your early morning is our late evening; work moves overnight"
  },
  {
    market: "US West and Vancouver (Los Angeles)",
    zone: "PDT UTC-7, PST UTC-8",
    offset: "Nepal is 12 h 45 min ahead in summer, 13 h 45 min in winter",
    overlap: "Short early or late window; mostly written, asynchronous work"
  }
];
