// Import card and editor — side-effects register both custom elements
import "./notifier-stack-card.js";
import "./notifier-stack-card-editor.js";

import { CARD_NAME, CARD_VERSION } from "./constants.js";

// Register with Home Assistant's custom card registry
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: CARD_NAME,
  name: "Notifier Stack Card",
  description:
    "A modern notification stack card for Home Assistant. Displays input_boolean-driven notifications with priority ordering and a clean Mushroom-inspired design.",
  preview: true,
});

// eslint-disable-next-line no-console
console.info(
  `%c NOTIFIER-STACK-CARD %c v${CARD_VERSION} `,
  "background:#1976d2;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:700;",
  "background:#424242;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;"
);
