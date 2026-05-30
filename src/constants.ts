export const CARD_NAME = "notifier-stack-card";
export const EDITOR_NAME = "notifier-stack-card-editor";
export const CARD_VERSION = "1.0.0";

export const DEFAULTS = {
  ICON: "mdi:bell-outline",
  COLOR: "0, 0, 0",
  ALPHA: 0.35,
  PRIORITY: "normal" as const,
  PERSISTENT: false,
  NOTIFICATION_HEIGHT: "72px",
  NOTIFICATION_WIDTH: "100%",
  EMPTY_ICON: "mdi:check-circle-outline",
  EMPTY_TEXT: "No Notifications to Action",
  EMPTY_COLOR: "0, 0, 0",
  EMPTY_ALPHA: 0.35,
} as const;

export const NOTIFICATION_GAP = "8px";
