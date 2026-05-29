// Home Assistant core types
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ): Promise<void>;
  connection: {
    subscribeEvents: (callback: () => void, event: string) => Promise<() => void>;
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

// Card configuration types
export type NotificationPriority = "normal" | "urgent";

export interface NotificationConfig {
  entity: string;
  text: string;
  icon?: string;
  color?: string;
  priority?: NotificationPriority;
}

export interface NotifierStackCardConfig {
  type: string;
  notification_height?: string;
  notification_width?: string;
  notifications?: NotificationConfig[];
}

// Resolved notification (with defaults applied)
export interface ResolvedNotification extends Required<NotificationConfig> {
  isActive: boolean;
}

// Lovelace editor types
export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: NotifierStackCardConfig): void;
}

// Custom element augmentation
declare global {
  interface HTMLElementTagNameMap {
    "notifier-stack-card": HTMLElement;
    "notifier-stack-card-editor": HTMLElement;
  }
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview: boolean;
    }>;
  }
}
