import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, NotificationConfig, NotifierStackCardConfig } from "./types.js";
import { DEFAULTS, EDITOR_NAME } from "./constants.js";

// Drag state for reordering
interface DragState {
  draggingIndex: number;
  overIndex: number;
}

@customElement(EDITOR_NAME)
export class NotifierStackCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private _config!: NotifierStackCardConfig;
  @state() private _drag: DragState | null = null;

  setConfig(config: NotifierStackCardConfig): void {
    this._config = { ...config };
  }

  // ---------------------------------------------------------------------------
  // Config helpers
  // ---------------------------------------------------------------------------

  private _fire(config: NotifierStackCardConfig): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _updateGlobal(key: keyof NotifierStackCardConfig, value: string): void {
    this._fire({ ...this._config, [key]: value });
  }

  private _updateNotification(index: number, key: keyof NotificationConfig, value: string | number | boolean): void {
    const notifications = [...(this._config.notifications ?? [])];
    notifications[index] = { ...notifications[index], [key]: value };
    this._fire({ ...this._config, notifications });
  }

  private _addNotification(): void {
    const notifications = [
      ...(this._config.notifications ?? []),
      {
        entity: "",
        text: "New Notification",
        icon: DEFAULTS.ICON,
        color: DEFAULTS.COLOR,
        priority: DEFAULTS.PRIORITY,
      } satisfies NotificationConfig,
    ];
    this._fire({ ...this._config, notifications });
  }

  private _removeNotification(index: number): void {
    const notifications = [...(this._config.notifications ?? [])];
    notifications.splice(index, 1);
    this._fire({ ...this._config, notifications });
  }

  private _moveNotification(from: number, to: number): void {
    if (to < 0 || to >= (this._config.notifications?.length ?? 0)) return;
    const notifications = [...(this._config.notifications ?? [])];
    const [item] = notifications.splice(from, 1);
    notifications.splice(to, 0, item);
    this._fire({ ...this._config, notifications });
  }

  // ---------------------------------------------------------------------------
  // Drag & drop
  // ---------------------------------------------------------------------------

  private _onDragStart(e: DragEvent, index: number): void {
    this._drag = { draggingIndex: index, overIndex: index };
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(index));
    }
  }

  private _onDragOver(e: DragEvent, index: number): void {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    if (this._drag && this._drag.overIndex !== index) {
      this._drag = { ...this._drag, overIndex: index };
    }
  }

  private _onDrop(e: DragEvent, toIndex: number): void {
    e.preventDefault();
    if (!this._drag) return;
    const fromIndex = this._drag.draggingIndex;
    this._drag = null;
    if (fromIndex !== toIndex) {
      this._moveNotification(fromIndex, toIndex);
    }
  }

  private _onDragEnd(): void {
    this._drag = null;
  }

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  private _renderGlobalSettings() {
    return html`
      <div class="section-header">Global Settings</div>

      <div class="field-row">
        <label class="field-label">Notification Height</label>
        <input
          class="field-input"
          type="text"
          .value=${this._config.notification_height ?? DEFAULTS.NOTIFICATION_HEIGHT}
          placeholder="${DEFAULTS.NOTIFICATION_HEIGHT}"
          @change=${(e: Event) =>
            this._updateGlobal("notification_height", (e.target as HTMLInputElement).value)}
        />
      </div>

      <div class="field-row">
        <label class="field-label">Notification Width</label>
        <input
          class="field-input"
          type="text"
          .value=${this._config.notification_width ?? DEFAULTS.NOTIFICATION_WIDTH}
          placeholder="${DEFAULTS.NOTIFICATION_WIDTH}"
          @change=${(e: Event) =>
            this._updateGlobal("notification_width", (e.target as HTMLInputElement).value)}
        />
      </div>
    `;
  }

  private _renderNotificationEditor(n: NotificationConfig, index: number) {
    const isDragging = this._drag?.draggingIndex === index;
    const isDragOver = this._drag?.overIndex === index && this._drag?.draggingIndex !== index;

    return html`
      <div
        class="notification-item ${isDragging ? "dragging" : ""} ${isDragOver ? "drag-over" : ""}"
        draggable="true"
        @dragstart=${(e: DragEvent) => this._onDragStart(e, index)}
        @dragover=${(e: DragEvent) => this._onDragOver(e, index)}
        @drop=${(e: DragEvent) => this._onDrop(e, index)}
        @dragend=${() => this._onDragEnd()}
      >
        <div class="notification-item-header">
          <span class="drag-handle" title="Drag to reorder">⠿</span>
          <span class="notification-label">
            ${n.text || n.entity || `Notification ${index + 1}`}
          </span>
          <div class="header-actions">
            <button
              class="icon-btn"
              title="Move up"
              ?disabled=${index === 0}
              @click=${() => this._moveNotification(index, index - 1)}
            >▲</button>
            <button
              class="icon-btn"
              title="Move down"
              ?disabled=${index === (this._config.notifications?.length ?? 0) - 1}
              @click=${() => this._moveNotification(index, index + 1)}
            >▼</button>
            <button
              class="icon-btn remove-btn"
              title="Remove"
              @click=${() => this._removeNotification(index)}
            >✕</button>
          </div>
        </div>

        <div class="notification-fields">
          <!-- Entity picker -->
          <div class="field-row">
            <label class="field-label">Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${n.entity ?? ""}
              .includeDomains=${["input_boolean"]}
              allow-custom-entity
              @value-changed=${(e: CustomEvent) =>
                this._updateNotification(index, "entity", e.detail.value)}
            ></ha-entity-picker>
          </div>

          <!-- Text -->
          <div class="field-row">
            <label class="field-label">Text</label>
            <input
              class="field-input"
              type="text"
              .value=${n.text ?? ""}
              placeholder="Notification text"
              @input=${(e: Event) =>
                this._updateNotification(index, "text", (e.target as HTMLInputElement).value)}
            />
          </div>

          <!-- Icon picker -->
          <div class="field-row">
            <label class="field-label">Icon</label>
            <ha-icon-picker
              .value=${n.icon ?? DEFAULTS.ICON}
              @value-changed=${(e: CustomEvent) =>
                this._updateNotification(index, "icon", e.detail.value)}
            ></ha-icon-picker>
          </div>

          <!-- Colour -->
          <div class="field-row">
            <label class="field-label">Colour (RGB)</label>
            <div class="color-row">
              <input
                class="field-input color-text"
                type="text"
                .value=${n.color ?? DEFAULTS.COLOR}
                placeholder="e.g. 100, 0, 255"
                @change=${(e: Event) =>
                  this._updateNotification(index, "color", (e.target as HTMLInputElement).value)}
              />
              <input
                class="color-swatch"
                type="color"
                .value=${this._rgbToHex(n.color ?? DEFAULTS.COLOR)}
                title="Pick colour"
                @input=${(e: Event) => {
                  const hex = (e.target as HTMLInputElement).value;
                  this._updateNotification(index, "color", this._hexToRgb(hex));
                }}
              />
            </div>
          </div>

          <!-- Alpha -->
          <div class="field-row">
            <label class="field-label">Opacity</label>
            <div class="alpha-row">
              <input
                class="alpha-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                .value=${String(n.alpha ?? DEFAULTS.ALPHA)}
                @input=${(e: Event) =>
                  this._updateNotification(
                    index,
                    "alpha",
                    parseFloat((e.target as HTMLInputElement).value)
                  )}
              />
              <span class="alpha-value">${Math.round((n.alpha ?? DEFAULTS.ALPHA) * 100)}%</span>
            </div>
          </div>

          <!-- Priority -->
          <div class="field-row">
            <label class="field-label">Priority</label>
            <select
              class="field-input"
              .value=${n.priority ?? DEFAULTS.PRIORITY}
              @change=${(e: Event) =>
                this._updateNotification(
                  index,
                  "priority",
                  (e.target as HTMLSelectElement).value
                )}
            >
              <option value="normal" ?selected=${(n.priority ?? "normal") === "normal"}>
                Normal
              </option>
              <option value="urgent" ?selected=${n.priority === "urgent"}>
                Urgent
              </option>
            </select>
          </div>

          <!-- Persistent -->
          <div class="field-row">
            <label class="field-label">Persistent</label>
            <label class="toggle-label">
              <input
                type="checkbox"
                class="toggle-input"
                .checked=${n.persistent ?? DEFAULTS.PERSISTENT}
                @change=${(e: Event) =>
                  this._updateNotification(
                    index,
                    "persistent",
                    (e.target as HTMLInputElement).checked
                  )}
              />
              <span class="toggle-track">
                <span class="toggle-thumb"></span>
              </span>
              <span class="toggle-hint">
                ${n.persistent ? "Won't dismiss on tap" : "Tap to dismiss"}
              </span>
            </label>
          </div>
        </div>
      </div>
    `;
  }

  // ---------------------------------------------------------------------------
  // Colour conversion helpers
  // ---------------------------------------------------------------------------

  private _rgbToHex(rgb: string): string {
    try {
      const parts = rgb.split(",").map((s) => parseInt(s.trim(), 10));
      if (parts.length !== 3 || parts.some(isNaN)) return "#787878";
      return (
        "#" +
        parts
          .map((v) => Math.min(255, Math.max(0, v)).toString(16).padStart(2, "0"))
          .join("")
      );
    } catch {
      return "#787878";
    }
  }

  private _hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return DEFAULTS.COLOR;
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }

  // ---------------------------------------------------------------------------
  // Main render
  // ---------------------------------------------------------------------------

  protected render() {
    if (!this._config) return nothing;

    const notifications = this._config.notifications ?? [];

    return html`
      <div class="editor">
        ${this._renderGlobalSettings()}

        <div class="section-header notifications-header">
          <span>Notifications</span>
          <button class="add-btn" @click=${this._addNotification}>+ Add Notification</button>
        </div>

        ${notifications.length === 0
          ? html`<div class="empty-hint">No notifications configured yet.</div>`
          : notifications.map((n, i) => this._renderNotificationEditor(n, i))}
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 0;
    }

    .section-header {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
      margin-top: 12px;
      margin-bottom: 4px;
    }

    .notifications-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .field-row {
      display: grid;
      grid-template-columns: 130px 1fr;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .field-label {
      font-size: 13px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .field-input {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
    }

    .field-input:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
      border-color: transparent;
    }

    select.field-input {
      cursor: pointer;
    }

    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-text {
      flex: 1;
    }

    .color-swatch {
      width: 36px;
      height: 34px;
      padding: 2px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      cursor: pointer;
      background: none;
      flex-shrink: 0;
    }

    .alpha-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .alpha-slider {
      flex: 1;
      cursor: pointer;
      accent-color: var(--primary-color);
    }

    .alpha-value {
      font-size: 13px;
      color: var(--secondary-text-color);
      min-width: 36px;
      text-align: right;
    }

    .toggle-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .toggle-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-track {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 22px;
      background: var(--divider-color, #ccc);
      border-radius: 11px;
      transition: background 0.2s;
      flex-shrink: 0;
    }

    .toggle-input:checked ~ .toggle-track {
      background: var(--primary-color);
    }

    .toggle-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
    }

    .toggle-input:checked ~ .toggle-track .toggle-thumb {
      transform: translateX(18px);
    }

    .toggle-hint {
      font-size: 13px;
      color: var(--secondary-text-color);
    }

    ha-entity-picker,
    ha-icon-picker {
      display: block;
      width: 100%;
    }

    .notification-item {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      padding: 10px 12px;
      background: var(--secondary-background-color, #f5f5f5);
      cursor: grab;
      transition: box-shadow 0.15s, opacity 0.15s;
    }

    .notification-item.dragging {
      opacity: 0.4;
      cursor: grabbing;
    }

    .notification-item.drag-over {
      box-shadow: 0 0 0 2px var(--primary-color);
      background: var(--primary-color-light, rgba(33, 150, 243, 0.08));
    }

    .notification-item-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }

    .drag-handle {
      font-size: 18px;
      color: var(--disabled-text-color, #999);
      cursor: grab;
      flex-shrink: 0;
      line-height: 1;
    }

    .notification-label {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header-actions {
      display: flex;
      gap: 2px;
      flex-shrink: 0;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1;
    }

    .icon-btn:hover:not([disabled]) {
      background: var(--divider-color);
    }

    .icon-btn[disabled] {
      opacity: 0.3;
      cursor: default;
    }

    .remove-btn {
      color: var(--error-color, #f44336);
    }

    .notification-fields {
      padding-left: 26px;
    }

    .add-btn {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }

    .add-btn:hover {
      opacity: 0.88;
    }

    .empty-hint {
      font-size: 13px;
      color: var(--disabled-text-color, #999);
      text-align: center;
      padding: 12px 0;
    }
  `;
}
