import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, NotifierStackCardConfig, ResolvedNotification } from "./types.js";
import { CARD_NAME, DEFAULTS, NOTIFICATION_GAP } from "./constants.js";
import { getActiveNotifications, sanitiseCssSize } from "./utils.js";

@customElement(CARD_NAME)
export class NotifierStackCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private _config!: NotifierStackCardConfig;

  static getConfigElement() {
    return document.createElement("notifier-stack-card-editor");
  }

  static getStubConfig(): NotifierStackCardConfig {
    return {
      type: `custom:${CARD_NAME}`,
      notification_height: DEFAULTS.NOTIFICATION_HEIGHT,
      notification_width: DEFAULTS.NOTIFICATION_WIDTH,
      notifications: [
        {
          entity: "input_boolean.example_notification",
          text: "Example Notification",
          icon: DEFAULTS.ICON,
          color: DEFAULTS.COLOR,
          priority: DEFAULTS.PRIORITY,
        },
      ],
    };
  }

  setConfig(config: NotifierStackCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
  }

  private get _notificationHeight(): string {
    return sanitiseCssSize(this._config?.notification_height, DEFAULTS.NOTIFICATION_HEIGHT);
  }

  private get _notificationWidth(): string {
    return sanitiseCssSize(this._config?.notification_width, DEFAULTS.NOTIFICATION_WIDTH);
  }

  private _handleTap(notification: ResolvedNotification): void {
    if (!this.hass) return;
    this.hass.callService("input_boolean", "turn_off", {
      entity_id: notification.entity,
    });
  }

  private _renderNotification(notification: ResolvedNotification) {
    return html`
      <div
        class="notification"
        style="--notification-rgb: ${notification.color};"
        role="button"
        tabindex="0"
        aria-label="Dismiss: ${notification.text}"
        @click=${() => this._handleTap(notification)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") this._handleTap(notification);
        }}
      >
        <ha-icon icon="${notification.icon}" class="notification-icon"></ha-icon>
        <span class="notification-text">${notification.text}</span>
        ${notification.priority === "urgent"
          ? html`<span class="priority-badge">Urgent</span>`
          : nothing}
      </div>
    `;
  }

  private _renderEmpty() {
    return html`
      <div
        class="notification empty-state"
        style="--notification-rgb: ${DEFAULTS.EMPTY_COLOR};"
      >
        <ha-icon icon="${DEFAULTS.EMPTY_ICON}" class="notification-icon empty-icon"></ha-icon>
        <span class="notification-text empty-text">${DEFAULTS.EMPTY_TEXT}</span>
      </div>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const activeNotifications = getActiveNotifications(this._config, this.hass.states);

    return html`
      <ha-card>
        <div
          class="card-content"
          style="
            --notification-height: ${this._notificationHeight};
            --notification-width: ${this._notificationWidth};
            --notification-gap: ${NOTIFICATION_GAP};
          "
        >
          ${activeNotifications.length > 0
            ? activeNotifications.map((n) => this._renderNotification(n))
            : this._renderEmpty()}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: var(--notification-gap, 8px);
      padding: 0;
    }

    .notification {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      min-height: var(--notification-height, 72px);
      width: var(--notification-width, 100%);
      box-sizing: border-box;
      padding: 16px;
      border-radius: 16px;
      background: rgba(var(--notification-rgb, 120, 120, 120), 0.18);
      border-left: 4px solid rgb(var(--notification-rgb, 120, 120, 120));
      cursor: pointer;
      user-select: none;
      outline: none;
      position: relative;
    }

    .notification:focus-visible {
      box-shadow: 0 0 0 2px rgb(var(--notification-rgb, 120, 120, 120));
    }

    .notification:active {
      opacity: 0.8;
    }

    .notification-icon {
      --mdc-icon-size: 36px;
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      color: rgb(var(--notification-rgb, 120, 120, 120));
    }

    .notification-text {
      font-size: 20px;
      font-weight: 500;
      flex: 1;
      line-height: 1.3;
      color: var(--primary-text-color);
    }

    .priority-badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: rgb(var(--notification-rgb, 120, 120, 120));
      border: 1px solid rgb(var(--notification-rgb, 120, 120, 120));
      border-radius: 4px;
      padding: 2px 6px;
      flex-shrink: 0;
    }

    .empty-state {
      cursor: default;
      justify-content: center;
    }

    .empty-icon {
      opacity: 0.5;
    }

    .empty-text {
      opacity: 0.6;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
    }
  `;
}
