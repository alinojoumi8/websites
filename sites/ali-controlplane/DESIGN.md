---
name: Ali Nojoumi, control plane
description: An architect's scale model of a financial system at night, with one gold key light and a person you can inspect.
colors:
  gold: "#d4af37"
  gold-hi: "#ecd27a"
  live: "#10b981"
  live-hi: "#6ee7b7"
  data: "#38bdf8"
  obsidian: "#07090e"
  model-floor: "#0a0d14"
  carbon: "#0f141c"
  carbon-2: "#161d29"
  steel: "#94a3b8"
  mist: "#cbd5e1"
  ink: "#e9edf3"
typography:
  display:
    fontFamily: "'Syne Variable', 'Syne', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  hero:
    fontFamily: "'Syne Variable', 'Syne', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, min(3.7vw, 6.6vh), 4rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Syne Variable', 'Syne', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Syne Variable', 'Syne', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'cv11', 'ss03'"
  label:
    fontFamily: "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
  note:
    fontFamily: "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
  metric:
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace"
    fontSize: "clamp(1.75rem, 2.7vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  data:
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.3
rounded:
  none: "0px"
  control: "2px"
  pill: "999px"
spacing:
  control-gap: "8px"
  panel: "22px"
  gutter: "clamp(20px, 4vw, 64px)"
  grid-cell: "64px"
  rail: "76px"
  section-top: "clamp(104px, 16vh, 184px)"
  wrap: "1360px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 1.25rem"
  button-gold-hover:
    backgroundColor: "{colors.gold-hi}"
  button-line:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 0.9rem"
  button-dark:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "64px"
    padding: "0 1.6rem"
  button-ink:
    textColor: "{colors.obsidian}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 1.25rem"
  button-ink-hover:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.gold-hi}"
  switch:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 1rem 0 0.75rem"
  segmented:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.mist}"
    rounded: "{rounded.control}"
    padding: "3px"
  segmented-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
    height: "38px"
    padding: "0 0.95rem"
  chip:
    textColor: "{colors.mist}"
    rounded: "{rounded.control}"
    padding: "5px 0.7rem"
  chip-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
  pill:
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 1.05rem"
  pill-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
  cite:
    textColor: "{colors.data}"
    rounded: "{rounded.control}"
    height: "26px"
    padding: "0 6px"
  cite-hover:
    backgroundColor: "{colors.data}"
    textColor: "{colors.obsidian}"
  input:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 0.75rem"
  panel:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 22px"
  panel-hover:
    backgroundColor: "{colors.carbon-2}"
  rail:
    backgroundColor: "{colors.obsidian}"
    width: "76px"
  rail-mail:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.control}"
    size: "44px"
  contact-field:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
---

# Design System: Ali Nojoumi, control plane

## Overview

**Creative North Star: "The Night Model"**

The page is an architect's scale model of a financial system, seen at night. The floor is obsidian, etched with a fine square grid. One warm gold key light comes from the upper right, the same light that falls on the portraits and on every rendered cover. Systems are drawn as isometric slabs standing on that floor, joined by right-angle rails that carry light. Nothing floats in a card for decoration: a thing on this page is either part of the model, a control that operates it, or a readout from it.

Three devices make the world its own. The isometric model language draws every diagram from one small kit (slab, floor, rail, tag). The rail on the left edge maps the page as a vertical line with diamond nodes, and a white packet rides it with the scroll. The lens is a circle of glass that rests on the portrait and shows a second photograph through it; a switch grows it over the whole portrait. The page is dark from the first pixel to the last section, and then ends on one flat field of gold.

The density is that of an instrument panel read by an executive: large Syne statements, plain Inter explanation, and small mono readouts where a machine would speak. Surfaces are flat. Depth belongs to the model and to the photographs.

**Key Characteristics:**
- Obsidian floor with a 64px etched grid at 4% steel, behind everything.
- One light direction, upper right, in the photographs, the hero wash, the slab faces and the cast shadows.
- Isometric slabs and right-angle light rails for every diagram, on their own opaque floor.
- A fixed 76px rail with diamond nodes and a travelling packet on desktop; a 60px glass bar on phones.
- A glass lens over the portrait as the signature interaction.
- Four signal colours with fixed meanings: gold, emerald, cyan, steel.
- Square corners (0 on panels, 2px on controls); pills only for the skill filters.
- One flat gold field, used once, for contact.

## Colors

A near-black blue floor, cool steel greys for structure and text, and three signal colours that each mean one thing.

### Primary
- **Key-Light Gold** (`gold`): the person and his actions. His name in the headline, the email buttons, the selected state of switch, segmented toggle, chip and pill, the past nodes and fill of the rail, focus rings, text selection. Inside a toy model it also marks the item that needs a human look (a new signer, a sceptical reader, an opposing point, a rejected entry). Floods one surface only: the contact field.
- **Gold Highlight** (`gold-hi`): gold as text on dark (active identifiers, currency affixes on the figures, proof row labels, warnings) and the hover state of gold buttons.

### Secondary
- **Live Emerald** (`live`): money in motion and approval. The default rail colour in diagrams, the payment packet, approved signers, running-process dots, the light that travels along the top of the telemetry strip.
- **Emerald Highlight** (`live-hi`): emerald as text on dark (the word "running", satisfied counts, "address unchanged").

### Tertiary
- **Simulation Cyan** (`data`): simulation data only. The Lab's selected tab, citation buttons, source-linked highlights, repository links, checked boxes inside the demos, "interested" tiles in the audience model.

### Neutral
- **Obsidian** (`obsidian`): the page floor, the rail, text on gold, the 4px halo behind diagram labels.
- **Model Floor** (`model-floor`): the opaque tile every isometric diagram stands on, one step off obsidian so the model reads as an object.
- **Carbon Slate** (`carbon`): panels, inputs, the segmented track, code blocks, the timeline.
- **Carbon Lift** (`carbon-2`): the hovered or selected panel.
- **Brushed Steel** (`steel`): structure. Hairlines (16% for dividers, 34% for control borders), idle nodes, secondary data, dates and scope lines.
- **Mist** (`mist`): secondary text and unselected control labels.
- **Ink** (`ink`): primary text on dark.

### Slab tones
Each isometric slab has three faces and a lit top edge. The top face is the lightest, the right face is mid, the left face is the darkest, because the light is upper right. These are the seven tones in `src/lib/iso.ts`:

| Tone | Top | Right | Left | Rim | Used for |
| --- | --- | --- | --- | --- | --- |
| stone | #18202d | #111924 | #0a0e15 | steel 34% | resting, minor parts |
| slate | #222c3c | #18212e | #0d121a | mist 40% | ordinary system parts |
| glass | #2a3649 | #1d2838 | #111a26 | gold 70% | the part he designed |
| titanium | #7f8da3 | #5d6979 | #39424f | ink 70% | the terminal or settled part |
| live | #10b981 | #0b8f66 | #065f46 | #a7f3d0 90% | lit, architecture view; approved |
| gold | #d4af37 | #a88a27 | #6e5a17 | #f6e7a8 90% | lit, strategy view; needs a look |
| data | #38bdf8 | #1583b8 | #0c4a6e | #bae6fd 90% | simulation agents |

### Named Rules
**The Four Signals Rule.** Gold is the person and what he does. Emerald is money moving and approval. Cyan is simulation data. Steel is structure. A colour never borrows another's meaning, and none of the three signals is used as decoration.
**The One Gold Field Rule.** Gold floods exactly one surface, the contact section, where the palette inverts to obsidian text and obsidian buttons on flat gold. Everywhere else gold is a mark: a word, a button, a node, a rim.
**The Upper Right Rule.** Light comes from the upper right in every image, wash, slab and shadow. The hero wash is a gold radial at 17% anchored to the top right corner; shadows fall down and to the left.

## Typography

**Display Font:** Syne Variable (with ui-sans-serif, system-ui fallback)
**Body Font:** Inter Variable (with ui-sans-serif, system-ui fallback), features `cv11` and `ss03` on
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace fallback)

**Character:** Syne is wide and slightly eccentric, set tight and large, so a statement reads as a claim. Inter stays quiet and factual beneath it. JetBrains Mono appears where the model itself is speaking.

### Hierarchy
- **Display** (700, clamp(3rem, 10vw, 6rem), 0.92, -0.04em): company names on the case covers and the Lab cover. The contact statement uses the same voice at clamp(2.75rem, 8vw, 6rem), 0.94.
- **Hero** (500, clamp(2.25rem, min(3.7vw, 6.6vh), 4rem) on desktop, clamp(2rem, 8.4vw, 3rem) on phones, 1.04 to 1.06, -0.035em): the one headline sentence. The name inside it is 700 and gold.
- **Headline** (600, clamp(2.1rem, 4.6vw, 3.75rem), 1.03, -0.03em, balanced): section headings.
- **Title** (600, clamp(1.4rem, 2.2vw, 1.75rem), 1.15, -0.015em): sub-section headings. Panel and tab names use the same face at 1.3125rem; the process table heading at 1.5rem.
- **Lead** (400, 1.1875rem, 1.5, mist, max 58ch): the sentence under a heading.
- **Body** (400, 1.0625rem, 1.6, max 44 to 70ch by context): running text. Supporting text steps down to 0.9375rem.
- **Label** (600, 0.875rem to 0.9375rem, sentence case): buttons, toggles, chips, row names.
- **Note** (400, 0.8125rem, 1.45, steel, max 62ch): scope lines, legends, and the notes that say a demo is a toy.
- **Metric** (mono 600, clamp(1.75rem, 2.7vw, 2.5rem), 1, -0.04em, tabular figures): the four telemetry figures. The currency affix sits raised at 0.46em in gold highlight.
- **Data** (mono 400 to 500, 0.75rem to 0.8125rem): process ids, states, counts, hashes, ledger rows, clock, years.

### Named Rules
**The Machine Voice Rule.** JetBrains Mono is for what a machine would print: identifiers, figures, states, counts, hashes, ledger rows, the clock. Headings, sentences and button labels are never mono.
**The Sentence Case Rule.** All interface text is sentence case with no added letter-spacing. Hierarchy comes from face, size and weight. A heading stands alone with its lead; nothing small sits above it.
**The Negative Track Rule.** Syne is always tracked in (-0.015em at title size to -0.04em at display size) and set at a line-height near 1. Inter is never tracked.

## Layout

The page is one column of full-width stages beside a fixed rail. From 1024px the rail takes 76px on the left and the body is padded by that amount; below 1024px the rail is replaced by a 60px fixed bar across the top. Content sits in a 1360px wrap with a fluid gutter of clamp(20px, 4vw, 64px).

- **Hero stage (desktop):** at least 700px and otherwise one viewport tall. The portrait is frameless, flush right, standing on a 148px glass strip that carries four figures in four columns divided by hairlines. Copy sits bottom left in a column that narrows so it only ever overlaps the dark edge of the photograph. A status line sits top left.
- **Hero (phones):** headline, actions, status line, portrait, then the figures in a 2 by 2 grid.
- **Case study:** a full-bleed cover (clamp(380px, 70vh, 660px) tall, copy at the bottom left over an obsidian scrim), then a workbench of two columns: a 340 to 420px control panel and the diagram. From 1024px wide and 620px tall the workbench pins for 290vh while the diagram's rails draw with the scroll.
- **Asymmetric pairs:** 5fr/7fr (skills and proof), 7fr/5fr (timeline and ventures; education and languages), 1.5fr/1fr (contact copy and monogram), 250px/1fr (lab tabs and panel).
- **Rhythm:** section heads open with clamp(104px, 16vh, 184px) above and clamp(36px, 6vh, 64px) below. Controls sit 6 to 12px apart, panels pad 20 to 22px, lists are separated by 1px steel hairlines with 6 to 13px of row padding.
- **Breakpoints observed:** 640px, 720px, 900px, 960px, 1024px. Below 720px a diagram's in-drawing labels are hidden and a sentence under the diagram names its parts.

**The Rail Rule.** On desktop the page is navigated by the rail and nothing else: a monogram at the top, a 1px line with one diamond node per section, a gold fill and a white packet that follow the scroll, and a gold email button at the foot. There is no top navigation bar on desktop.

## Elevation & Depth

Interface surfaces are flat. Depth is carried three ways: tonal steps (obsidian, carbon, carbon lift), 1px steel hairlines, and a small number of glass surfaces that blur what is behind them. Real shadows exist only where there is a real object: a slab in the model, the lens, the rendered monogram.

### Shadow Vocabulary
- **Slab cast shadow** (a parallelogram on the floor, `#000` at 36%, offset down-left and longer for taller slabs): drawn under every isometric slab. It is part of the drawing, never a CSS shadow.
- **Lens** (`box-shadow: 0 0 0 1px rgb(7 9 14 / 0.6), inset 0 0 0 1px rgb(7 9 14 / 0.4), inset 0 18px 30px -20px rgb(255 255 255 / 0.55), 0 26px 50px -22px rgb(0 0 0 / 0.85)`): the glass lens only.
- **Marker ring** (`box-shadow: 0 0 0 4px rgb(212 175 55 / 0.32)` on the rail packet; `0 0 0 2px rgb(7 9 14 / 0.75)` on a hotspot dot): a ring, with no blur and no offset, that separates a small marker from what is under it.
- **Monogram** (`filter: drop-shadow(0 34px 34px rgb(58 42 0 / 0.5))`): the rendered titanium mark resting on the gold field.
- **Headline over photograph** (`text-shadow: 0 2px 22px rgb(7 9 14 / 0.85)`): keeps the hero copy legible where it overlaps the portrait's edge.

### Glass
- **Telemetry strip:** `rgb(13 18 26 / 0.56)` with `backdrop-filter: blur(22px) saturate(1.25)`, over a blurred continuation of the portrait.
- **Phone bar:** `rgb(7 9 14 / 0.82)`, blur 14px. **Switch:** `rgb(15 20 28 / 0.66)`, blur 10px. **Hero tags:** `rgb(7 9 14 / 0.8)`, blur 8px.

### Named Rules
**The Drawn Depth Rule.** Panels, buttons and cards carry no box-shadow at rest or on hover. If something needs to look raised, it is drawn as a slab in the model with its cast shadow, or it is glass over a photograph.
**The Glass Needs A Subject Rule.** A blurred translucent surface is used only where there is an image or moving content behind it to blur. Over the plain floor, a surface is opaque carbon.

## Shapes

Corners are square. Panels, tabs, tags and callouts have no radius; controls (buttons, switch, segmented track, chips, inputs, citation buttons, checkboxes) take 2px. The skill filters are full pills (999px), the only pills on the page. Circles are reserved for things that are round in the world: the lens, status dots, hotspots, the rail packet, the switch thumb in its capsule track.

The recurring small mark is the diamond: a square of 5 to 9px rotated 45 degrees. It is the node on the rail, the step marker in a runbook, the node in a decision trace, and the separator between facts on a case cover. Hollow with a steel outline means not yet; filled steel means done; filled with the section's accent means now.

Borders are 1px steel at 16% or 34%. Diagram geometry is strictly isometric (30 degree axes) and rails turn only at right angles on the model's grid. Photographs have no frame: the portrait feathers into the floor through a gradient mask, and covers bleed to the edges under an obsidian scrim.

**The Diamond Rule.** A position in a sequence is marked with a 45 degree diamond, never a numbered circle or a bullet.

## Components

Controls are precise and quiet: square, hairline-bordered, labelled in 600 Inter. A selected control fills with its section's accent and its label turns obsidian.

### Buttons
- **Shape:** square-cornered (2px), 48px tall by default, 600 Inter at 0.9375rem, icon and label 0.6rem apart. Sizes: 38px, 40px, 48px, 64px.
- **Gold (primary):** gold fill, obsidian label, padding 0 1.25rem. Hover goes to gold highlight. Reserved for emailing him.
- **Line (secondary, used in demos):** 40px, transparent with a steel 34% border and ink label. Hover brightens the border to steel and adds a 10% steel fill.
- **Dark and Ink (on the gold field only):** Dark is an obsidian fill with ink label at 64px for the email address. Ink is a 1.5px obsidian outline with obsidian label; hover fills obsidian and turns the label gold highlight.
- **Text link button:** underlined 0.8125rem 600 mist with an icon, for Reset.
- **States:** press moves the button down 1px; disabled is 45% opacity; focus is a 2px gold outline offset 3px (obsidian on the gold field). The hero email button and the contact actions lean toward a mouse pointer on a spring (magnetic, 26% of the offset).

### Switch
The "Inspect leadership stack" control. A 48px glass box with a steel border, holding a 44 by 24px capsule track and a 20px round thumb. On: the border and track turn gold and the thumb turns obsidian. The thumb travels on a spring.

### Segmented toggle
Two or three options in a carbon track with a 3px inset and a steel border. The selected option is a filled thumb in the section's accent (gold by default) that slides between options; its label is obsidian. 38px options, 32px in the small size.

### Chips and pills
- **Chip:** square (2px), steel border, 0.8125rem mist label, min 32px. Selected fills with the section accent. Used to select a node of a diagram.
- **Pill:** full pill, 44px, steel border, with a small mono count. Selected fills gold. Used only for the skill filters.
- **Signer:** a 32px mono chip with a key icon; gold outline when new, emerald fill when approved.
- **Citation:** a 26px mono button outlined in cyan that fills cyan on hover or focus and highlights its source.

### Panels
- **Corner Style:** square, no radius.
- **Background:** carbon, with a steel 16% border. The lab panel is carbon at 72%.
- **Shadow Strategy:** none; see The Drawn Depth Rule.
- **Hover / selected:** border turns gold (cyan for a selected lab tab) and the fill steps to carbon lift.
- **Internal Padding:** 20px 22px; the lab panel uses clamp(18px, 2.6vw, 34px).

### Inputs
- **Style:** 40px, carbon fill, steel 34% border, 2px corners, ink text.
- **Focus:** the border turns gold with the gold outline drawn tight to the field.
- **Checkbox:** an 18px square that fills cyan with an obsidian tick.

### Navigation
- **Rail (1024px and up):** 76px wide, obsidian, with a steel hairline on its right edge. A 30px hand-drawn AN mark (the A in gold, the N in ink), then the track. Nodes are 8px diamonds: hollow steel ahead, filled gold behind, hollow ink and 1.5 times larger at the current section. A 7px white packet with a gold ring rides the line. A label slides out from a node on hover or focus. A 44px gold email button closes the rail.
- **Bar (below 1024px):** 60px, glass, with the mark and name on the left; an email action appears once the hero has scrolled past.
- **Footer:** underlined ink links on the dark floor, with a steel note line.

### Telemetry strip
Four figures across a glass strip docked to the bottom of the hero. Each is a mono figure, an ink label, and a steel scope line stating what the number covers and when. Hairlines divide the columns. A 1px emerald glint travels along the top edge every 7 seconds. Figures settle on a spring when they first appear.

### Isometric model (signature)
Every diagram is one SVG with named layers (floor, rails, nodes, labels, packet), built from four parts:
- **Floor:** an opaque model-floor tile with grid lines in steel at 9%.
- **Slab:** three faces, a 1px lit rim on the two top edges facing the light, and a cast shadow. Height carries importance; tone carries role (see Slab tones). A slab can be a control: on hover or focus its rim turns white at 2px.
- **Rail:** a right-angle path on the floor. A steel 16% bed, a wide glow at 28% of the colour, and a 2px core. Emerald by default. Rails draw in as the pinned case study is scrolled; a round packet with a soft halo runs along them.
- **Tag:** a 1px steel leader with a small dot, and a 600 Inter title with an optional sub-line, each backed by a 4px obsidian stroke so it stays legible over the model.

Two label sets (strategy and architecture) cross-fade over the same model; lit slabs turn gold in the strategy view and emerald in the architecture view.

### Lens (signature)
A circle of glass over the portrait: a 1px ink border at 75%, an inner highlight at the top, a rim that darkens toward the edge. Through it a second photograph in the same framing shows. It rests on one shoulder, follows a mouse pointer on a spring, and returns. The switch grows it over the whole portrait (0.95s, ease-out); each small figure then gets a gold hotspot with a pulsing ring, an elbow leader, and a tag with a mono id that opens into a callout when selected. The headline swaps for a process table: mono id, name, and a mono state with an emerald dot for running or a hollow steel dot for idle.

### Runbook and trace
Vertical step lists marked with diamonds. The current step is bold white with its diamond in the accent; later steps are steel. Used beside a pinned diagram and for decision traces in the lab.

### Motion
Light travels on rails. The default easing is `cubic-bezier(0.16, 1, 0.3, 1)` (exponential ease-out) with state changes of 0.2 to 0.3s and larger swaps of 0.45 to 0.95s. Springs are critically damped or close to it: counters settle, the lens follows, thumbs and slabs glide, and none of them overshoots visibly. Entering content rises 8 to 14px and may clear from a 6 to 8px blur. Named presets live in `src/lib/motion.ts`. With reduced motion every transition is effectively instant, the travelling glint and hotspot pulse are removed, smooth scrolling and pinning are off, and all content is present.

### Exception: the print dossier
`/dossier/` is a separate print sheet for the PDF: white paper, dark ink, a darkened gold for accents, point sizes. It keeps the three faces and nothing else from this system. Do not treat it as a light theme for the site.

## Do's and Don'ts

### Do:
- **Do** keep the obsidian floor and its 64px grid behind every dark section, and keep the light in the upper right.
- **Do** draw any new diagram with the kit in `src/lib/iso.ts` and `src/components/ui.tsx`: slabs on an opaque floor, right-angle rails, tags with an obsidian halo.
- **Do** give each colour its one meaning: gold for the person and his actions, emerald for money moving and approval, cyan for simulation data, steel for structure.
- **Do** use JetBrains Mono for machine output (ids, figures, states, hashes) and Inter for everything a person says.
- **Do** keep corners square: 0 on panels, 2px on controls.
- **Do** mark steps and positions with 45 degree diamonds.
- **Do** state the scope and date under every figure, in steel, and label every toy model as a toy in a note beside it.
- **Do** keep a 2px gold focus outline (obsidian on the gold field) on every interactive element, including slabs.
- **Do** give every motion a reduced-motion state with all content present.

### Don't:
- **Don't** put a box-shadow on a panel, card or button. Cast shadows belong to slabs, the lens and the monogram.
- **Don't** use gold as a background anywhere except the contact field, or use emerald or cyan as decoration.
- **Don't** add a pill anywhere but the skill filters, or round a panel.
- **Don't** set headings, sentences or button labels in mono, or set interface text in tracked capitals.
- **Don't** draw a system as flat boxes and arrows, a node graph, or a chart. If it is a system, it is a model on the floor.
- **Don't** frame the portrait or place it in a card. It stands on the stage and feathers into the floor.
- **Don't** use glass over the plain floor; blur only where a photograph or moving content sits behind.
- **Don't** let a spring bounce or a transition ease in slowly. Things settle.
- **Don't** borrow the sibling steel-watch site's furniture (dials, bezels, tick rings, gauge arcs). This world draws with slabs, rails and a lens; the watch appears only on his wrist in the photographs.
- **Don't** add a top navigation bar on desktop. The rail is the navigation.
