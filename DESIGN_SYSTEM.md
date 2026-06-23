# Design System & UI Styling philosophy — SecureSwap

This document outlines the visual tokens, CSS layout patterns, animations, and typography rules of SecureSwap.

---

## 1. Theme Configuration

SecureSwap supports both Light and Dark themes. The active theme class is toggled on the HTML root element (`document.documentElement`), mapping to CSS variables defined in [tailwind.css](file:///c:/Users/krish/Desktop/projects/secureswap/src/styles/tailwind.css).

### 1.1. Color Variable Token Map

| Token Name | Light Theme | Dark Theme | Purpose |
|---|---|---|---|
| `--color-background` | `#FAFBFC` | `#0B0F19` | Main screen body background |
| `--color-foreground` | `#1F2937` | `#F3F4F6` | Default body text |
| `--color-card` | `#FFFFFF` | `#111827` | Content containers and widgets |
| `--color-border` | `#E5E7EB` | `#1E293B` | Thin lines and divider borders |
| `--color-primary` | `#2563EB` | `#3B82F6` | Call to action highlights |
| `--color-success` | `#10B981` | `#10B981` | Positive indicators and trust scores |
| `--color-surface` | `#FFFFFF` | `#1E293B` | Internal popovers and inputs |

---

## 2. Typography

* **Sans Font Family**: `Inter` (applied globally to headings, labels, and text elements).
* **Mono Font Family**: `JetBrains Mono` (applied to values, prices, exchange IDs, and timestamps).

---

## 3. Core Component Layout Styles

### 3.1. Premium Glassmorphic Header
The main header employs backdrop blurs and semi-transparency to overlay clean layouts:
```css
bg-card/85 backdrop-blur-md border-b border-border shadow-sm
```

### 3.2. Responsive Cards
All listing and user match cards use rounded edges and subtle hover states:
```css
border border-border rounded-xl transition-all duration-200 hover:shadow-lg hover:border-primary/20 bg-card
```

### 3.3. Interactive Buttons
All button actions are defined using Tailwind-managed transition properties:
```css
transition-all duration-150 active:scale-98 hover:-translate-y-[1px]
```
This adds translation offsets and interactive feedback upon press.
