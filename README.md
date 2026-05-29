# Notifier Stack Card

A modern Home Assistant Lovelace custom card that displays a stack of actionable notifications driven by `input_boolean` entities.

Built with **TypeScript + Lit 3 + Vite** — lightweight, performant, and HACS-compatible.

---

## Screenshots

> _Screenshots coming soon — install the card to see it in action._

| Active Notifications | Empty State |
|---|---|
| _(screenshot)_ | _(screenshot)_ |

---

## Features

- 🔔 Displays notifications when `input_boolean` entities are `on`
- 👆 Tap to dismiss — calls `input_boolean.turn_off` on the entity
- ⬆️ Urgent priority notifications always appear first
- 📐 Dynamic card height — grows with the number of active notifications
- 🎨 Per-notification colour, icon, and priority
- ✏️ Full visual editor with drag-and-drop reordering
- 💡 Clean empty state when no notifications are active
- 🚀 Optimised for low-end wall tablets

---

## Installation

### Via HACS (Recommended)

1. Open **HACS** in your Home Assistant sidebar
2. Go to **Frontend**
3. Click the three-dot menu → **Custom repositories**
4. Add this repository URL: `https://github.com/YOUR_USERNAME/notifier-stack-card`
5. Select category: **Lovelace**
6. Click **Add**
7. Search for **Notifier Stack Card** and click **Install**
8. Reload your browser

### Manual Installation

1. Download `notifier-stack-card.js` from the [latest release](../../releases/latest)
2. Copy it to your `config/www/` directory
3. Add a resource in Home Assistant:
   - **Settings → Dashboards → Resources**
   - URL: `/local/notifier-stack-card.js`
   - Type: `JavaScript Module`
4. Reload your browser

---

## Configuration

Add the card to your Lovelace dashboard:

```yaml
type: custom:notifier-stack-card
notification_height: 72px
notification_width: 100%
notifications:
  - entity: input_boolean.amelia_tomorrow
    text: Amelia Scheduled
    icon: mdi:vacuum
    color: 100, 0, 100
    priority: urgent

  - entity: input_boolean.bin_day
    text: Bins Tonight
    icon: mdi:trash-can
    color: 0, 120, 255
    priority: normal

  - entity: input_boolean.front_door_alert
    text: Front Door Left Open
    icon: mdi:door-open
    color: 255, 80, 0
    priority: urgent
```

---

## Configuration Reference

### Card Options

| Option | Type | Default | Description |
|---|---|---|---|
| `notification_height` | `string` | `72px` | Minimum height of each notification item. Any valid CSS size (px, rem, %, etc.) |
| `notification_width` | `string` | `100%` | Width of notification items. Any valid CSS size |
| `notifications` | `list` | `[]` | List of notification definitions (see below) |

### Notification Options

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | `string` | _(required)_ | `input_boolean` entity ID |
| `text` | `string` | _(required)_ | Display text for the notification |
| `icon` | `string` | `mdi:bell-outline` | MDI icon name |
| `color` | `string` | `120, 120, 120` | RGB colour triplet, e.g. `255, 100, 0` |
| `priority` | `normal` \| `urgent` | `normal` | Urgent notifications are shown first |

### Priority Behaviour

- `urgent` notifications always appear at the top of the stack
- Within the same priority level, notifications appear in the order defined in config
- The sort is stable — your configured order is preserved within each priority group

---

## Examples

### Simple Single Notification

```yaml
type: custom:notifier-stack-card
notifications:
  - entity: input_boolean.reminder_pills
    text: Take your medication
    icon: mdi:pill
    color: 0, 180, 100
```

### Multiple Priorities

```yaml
type: custom:notifier-stack-card
notification_height: 80px
notifications:
  - entity: input_boolean.smoke_alarm
    text: Smoke Alarm Triggered!
    icon: mdi:smoke-detector-alert
    color: 255, 30, 30
    priority: urgent

  - entity: input_boolean.bin_day
    text: Bins out tonight
    icon: mdi:trash-can
    color: 0, 120, 255
    priority: normal

  - entity: input_boolean.post_arrived
    text: Post has arrived
    icon: mdi:mailbox
    color: 255, 165, 0
    priority: normal
```

### Compact Layout

```yaml
type: custom:notifier-stack-card
notification_height: 56px
notifications:
  - entity: input_boolean.meeting_soon
    text: Meeting in 15 minutes
    icon: mdi:calendar-clock
    color: 80, 80, 200
```

---

## Visual Editor

The card includes a full visual editor accessible from the Lovelace card editor:

- **Entity picker** — filtered to `input_boolean` entities
- **Text field** — notification display text
- **Icon picker** — MDI icon search
- **Colour picker** — RGB value with visual colour swatch
- **Priority dropdown** — Normal / Urgent
- **Global height/width fields**
- **Add / Remove** notification buttons
- **Drag-and-drop reordering** — drag the ⠿ handle to reorder notifications
- **▲ / ▼ buttons** — keyboard-accessible reordering

---

## Development

### Prerequisites

- Node.js 20+
- npm 9+

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/notifier-stack-card.git
cd notifier-stack-card
npm install
```

### Build

```bash
npm run build
```

Output: `dist/notifier-stack-card.js`

### Type Check

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

### Dev Server

```bash
npm run dev
```

### Project Structure

```
notifier-stack-card/
├── src/
│   ├── index.ts                      # Entry point + card registration
│   ├── notifier-stack-card.ts        # Main card component (Lit)
│   ├── notifier-stack-card-editor.ts # Visual editor component (Lit)
│   ├── types.ts                      # TypeScript interfaces
│   ├── constants.ts                  # Defaults and constants
│   └── utils.ts                      # Helper functions
├── dist/                             # Built output (committed for HACS)
├── .github/workflows/build.yml       # CI: lint, typecheck, build, commit dist
├── hacs.json                         # HACS metadata
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Contributing

Pull requests are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Run `npm run typecheck` and `npm run lint` before committing
4. Open a PR against `main`

---

## License

MIT — see [LICENSE](LICENSE)
