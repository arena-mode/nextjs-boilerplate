export const CONTENT_TABS = [
  {
    id: "live-stream-alerts",
    label: "Live Stream Alerts"
  },
  {
    id: "crypto-market",
    label: "Crypto Market"
  },
  {
    id: "videos",
    label: "Videos"
  },
  {
    id: "announcements",
    label: "Announcements"
  }
] as const;

export type ContentTabType = typeof CONTENT_TABS[number]["id"];
