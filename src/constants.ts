export const CARD_NAME = "notifier-stack-card";
export const EDITOR_NAME = "notifier-stack-card-editor";
export const CARD_VERSION = "1.0.0";

export const DEFAULTS = {
  ICON: "mdi:bell-outline",
  COLOR: "120, 120, 120",
  PRIORITY: "normal" as const,
  NOTIFICATION_HEIGHT: "72px",
  NOTIFICATION_WIDTH: "100%",
  EMPTY_ICON: "mdi:check-circle-outline",
  EMPTY_TEXT: "No Notifications to Action",
  EMPTY_COLOR: "120, 120, 120",
} as const;

export const NOTIFICATION_GAP = "8px";
