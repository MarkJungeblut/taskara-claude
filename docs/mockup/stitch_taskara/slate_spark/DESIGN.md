# Design System Documentation

## 1. Overview & Creative North Star: "The Analytical Playground"
This design system is built to transform the sterile world of data into a high-end, editorial experience. We are moving away from the "SaaS-template" look. Our Creative North Star, **The Analytical Playground**, balances the rigorous precision of professional data science with the fluid, tactile joy of a creative canvas. 

The system rejects rigid structural lines in favor of **Tonal Layering** and **Intentional Asymmetry**. By utilizing dramatic typographic scales and sophisticated color transitions, we create a dashboard builder that feels less like a spreadsheet and more like a bespoke digital gallery.

---

## 2. Colors & Surface Philosophy
The palette uses a foundation of "Slate Grays" and "Cool Blues" to provide a professional bedrock, while vibrant purples and teals inject personality into data visualizations.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or cards. 
Boundaries must be created through background shifts. For example, a widget (using `surface-container-lowest`) should sit on a dashboard canvas (using `surface-container-low`). This creates a soft, modern depth that feels integrated, not "boxed in."

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials.
*   **Base Layer:** `surface` (#f4f6ff) – The primary background.
*   **Canvas Layer:** `surface-container-low` (#eaf1ff) – The area where widgets are placed.
*   **Widget/Card Layer:** `surface-container-lowest` (#ffffff) – The highest point of focus for data content.
*   **Floating Elements:** Use `surface-bright` with a backdrop-blur (12px–20px) to create a frosted glass effect for tooltips and collapsible sidebars.

### Signature Textures
Main CTAs and "Hero Metrics" should not be flat. Apply a subtle linear gradient from `primary` (#4647d3) to `primary-container` (#9396ff) at a 135-degree angle. This provides a "glow" that feels premium and custom.

---

## 3. Typography: Editorial Authority
We use a dual-font approach to marry function with personality.

*   **Headlines (Manrope):** Use `display-lg` and `headline-lg` for dashboard titles and "Funny Metrics." Manrope’s geometric nature provides a modern, slightly playful character.
*   **Body & Data (Inter):** Use `body-md` and `label-sm` for all data-heavy views. Inter is optimized for readability at small sizes, ensuring that complex charts remain legible.
*   **Editorial Contrast:** To achieve a high-end look, pair a large `display-sm` headline (Manrope) with a significantly smaller `label-md` uppercase subheader (Inter) with 0.05em letter spacing.

---

## 4. Elevation & Depth
We eschew traditional drop shadows for **Ambient Tonal Depth.**

*   **The Layering Principle:** Depth is achieved by "stacking" tiers. A card (`surface-container-lowest`) on a background (`surface-container-low`) creates an immediate 3D relationship without a single pixel of shadow.
*   **Ambient Shadows:** If a floating state is required (e.g., a dragged widget), use a diffused shadow: `y-12, blur-24, color: on-surface (8% opacity)`. This mimics natural light rather than a digital effect.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` (#9eaec7) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Interaction

### The Dashboard Canvas (Edit vs. View)
*   **Edit Mode:** The background should utilize a subtle "dot grid" pattern using `outline-variant` at 10% opacity. Widgets show "Ghost Borders" to indicate draggable areas.
*   **View Mode:** The grid disappears. Surfaces transition to a seamless "Glassmorphic" header using `surface-container-low` with a 20px backdrop blur.

### Buttons
*   **Primary:** Gradient from `primary` to `primary-container`. Corner radius `md` (0.75rem). Text style `label-md` (Inter).
*   **Tertiary (Funny Metrics):** Use `tertiary` (#9e00b4) with a `xl` (1.5rem) roundedness to signal a "playful" interaction area.

### Cards & Widgets
*   **Structure:** No dividers. Separate the "Metric Header" from the "Chart Body" using a `4` (1rem) vertical spacing gap.
*   **Widths:** 50/50 widgets use `6` (1.5rem) gutters. 100% width widgets should have a maximum internal padding of `8` (2rem) to allow the data to "breathe."

### Collapsible Sidebar
*   **Style:** `surface-container-highest` (#c9deff).
*   **Interaction:** When collapsed, use only icons with `on-surface-variant`. When expanded, use `title-sm` for category labels. 

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `xl` (1.5rem) rounding for large dashboard containers to maintain the "playful" vibe.
*   **Do** use `secondary` (#006576) and `tertiary` (#9e00b4) for chart accents to create a vibrant, non-traditional data look.
*   **Do** embrace white space. If a widget feels crowded, increase the spacing to `5` (1.25rem) or `6` (1.5rem) before reducing font size.

### Don’t:
*   **Don’t** use pure black (#000000) for text. Always use `on-surface` (#203044) to maintain a sophisticated slate-gray tone.
*   **Don’t** use standard 1px dividers. If content needs separation, use a background color shift to `surface-container-low` or increase vertical padding.
*   **Don’t** use high-saturation red for errors. Use the sophisticated `error` (#b41340) and `error_container` (#f74b6d) to keep the palette harmonious.

---

## 7. Spacing & Rhythm
All layouts must follow the defined spacing scale to ensure mathematical harmony.
*   **Standard Padding:** `4` (1rem) for internal card padding.
*   **Section Gaps:** `10` (2.5rem) between major dashboard modules.
*   **Tight Grouping:** `1.5` (0.375rem) for labels attached to inputs.

By adhering to these rules, you will create an interface that feels less like a tool and more like a curated, professional environment that celebrates the data it holds.