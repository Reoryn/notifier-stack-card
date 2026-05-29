import type {
  NotificationConfig,
  ResolvedNotification,
  NotifierStackCardConfig,
} from "./types.js";
import { DEFAULTS } from "./constants.js";

/**
 * Apply defaults to a raw notification config entry.
 */
export function resolveNotification(
  config: NotificationConfig,
  isActive: boolean
): ResolvedNotification {
  return {
    entity: config.entity,
    text: config.text ?? "",
    icon: config.icon ?? DEFAULTS.ICON,
    color: config.color ?? DEFAULTS.COLOR,
    alpha: config.alpha ?? DEFAULTS.ALPHA,
    priority: config.priority ?? DEFAULTS.PRIORITY,
    persistent: config.persistent ?? DEFAULTS.PERSISTENT,
    isActive,
  };
}

/**
 * Sort notifications: urgent first, then preserve order.
 */
export function sortNotifications(
  notifications: ResolvedNotification[]
): ResolvedNotification[] {
  return [...notifications].sort((a, b) => {
    if (a.priority === "urgent" && b.priority !== "urgent") return -1;
    if (a.priority !== "urgent" && b.priority === "urgent") return 1;
    return 0;
  });
}

/**
 * Get active notifications from config + hass state.
 */
export function getActiveNotifications(
  config: NotifierStackCardConfig,
  states: Record<string, { state: string }>
): ResolvedNotification[] {
  if (!config.notifications?.length) return [];

  const resolved = config.notifications.map((n) => {
    const entityState = states[n.entity];
    const isActive = entityState?.state === "on";
    return resolveNotification(n, isActive);
  });

  const active = resolved.filter((n) => n.isActive);
  return sortNotifications(active);
}

/**
 * Validate a CSS size value — accepts px, %, rem, em, vh, vw, etc.
 */
export function isValidCssSize(value: string): boolean {
  return /^\d+(\.\d+)?(px|%|rem|em|vh|vw|fr|ch|ex|pt|cm|mm)$/.test(value.trim());
}

/**
 * Sanitise CSS size — return value if valid, else fallback.
 */
export function sanitiseCssSize(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  return isValidCssSize(value) ? value.trim() : fallback;
}

/**
 * Validate an RGB triplet string like "100, 0, 255".
 */
export function isValidRgb(value: string): boolean {
  return /^\d{1,3},\s*\d{1,3},\s*\d{1,3}$/.test(value.trim());
}
