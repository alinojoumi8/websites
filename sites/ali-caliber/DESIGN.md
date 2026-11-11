---
name: Ali Nojoumi Caliber
description: A product leader's record built as a steel sports watch at night.
colors:
  obsidian: "#07090e"
  slate: "#0f141c"
  slate-2: "#161d28"
  slate-3: "#1e2633"
  rail: "#3a4657"
  steel-lo: "#64748b"
  steel: "#94a3b8"
  steel-hi: "#cbd5e1"
  ink: "#e8ecf2"
  ink-2: "#aeb9c9"
  gold: "#d4af37"
  gold-hi: "#f0d77a"
  gold-lo: "#b08d22"
  on-gold: "#0b0d12"
  emerald: "#10b981"
  emerald-hi: "#6ee7b7"
  cyan: "#38bdf8"
  cyan-deep: "#0e2a3b"
  shade: "#000"
  highlight: "#fff"
  print-paper: "#fff"
  print-desk: "#e9ecf1"
  print-ink: "#10141c"
  print-ink-2: "#2b3442"
  print-ink-3: "#4a5565"
  print-line: "#c5ccd6"
  print-gold: "#7a5f10"
  print-gold-rule: "#b79526"
  line: "rgb(148 163 184 / 0.16)"
  line-2: "rgb(148 163 184 / 0.32)"
typography:
  display:
    fontFamily: "'Syne Variable', 'Syne', system-ui, sans-serif"
    fontSize: "clamp(3rem, 5.1vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Syne Variable', 'Syne', system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Syne Variable', 'Syne', system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  title-plate:
    fontFamily: "'Syne Variable', 'Syne', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.7vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'cv11', 'ss01'"
  body-sm:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  lead-section:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  lead-case:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.45
  note:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  control:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1
  label:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
  button:
    fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
  figure:
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace"
    fontSize: "clamp(1.55rem, 2.5vw, 2.35rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "'tnum'"
  data:
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.76rem"
    fontWeight: 500
    lineHeight: 1.5
    fontFeature: "'tnum'"
rounded:
  chip: "6px"
  window: "7px"
  tip: "9px"
  control-sm: "10px"
  button-sm: "11px"
  field: "12px"
  control: "14px"
  well: "16px"
  key: "18px"
  plate: "24px"
  stage: "28px"
  switch: "30px"
  print: "3mm"
  pill: "999px"
  round: "50%"
spacing:
  tick: "12px"
  tick-major: "60px"
  groove: "27px"
  bar: "64px"
  band: "clamp(20px, 3vw, 46px)"
  pad: "clamp(1.1rem, 4vw, 3.5rem)"
  section: "clamp(5.5rem, 12vw, 10rem)"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "52px"
  button-steel:
    backgroundColor: "{colors.slate-3}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "52px"
  button-emerald:
    textColor: "{colors.emerald-hi}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "52px"
  button-sm:
    typography: "{typography.control}"
    rounded: "{rounded.button-sm}"
    padding: "0 0.95rem"
    height: "40px"
  segmented:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.ink-2}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "4px"
  segmented-thumb:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    rounded: "{rounded.control-sm}"
    height: "40px"
  pill:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
    height: "44px"
  pill-pressed:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
  top-bar:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.ink}"
    height: "{spacing.bar}"
    padding: "0 clamp(1.1rem, 4vw, 3.5rem)"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.body-sm}"
    padding: "0.6rem 0"
  nav-link-active:
    textColor: "{colors.ink}"
  plate:
    backgroundColor: "{colors.slate-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "1.5rem"
  stage:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.stage}"
    padding: "clamp(1.1rem, 2.2vw, 2rem)"
  key:
    backgroundColor: "{colors.slate-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.key}"
    padding: "1.1rem 1.2rem"
  key-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
  date-window:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.window}"
    padding: "0.3rem 0.6rem"
  input:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 0.9rem"
    height: "50px"
  hotspot:
    backgroundColor: "{colors.gold}"
    rounded: "{rounded.round}"
    size: "46px"
---

# Design System: Ali Nojoumi Caliber

## Overview

**Creative North Star: "The Watch at Night"**

The page is a steel sports watch seen in low light. The ground is the dial: near-black obsidian cut with wide horizontal grooves, with a soft sheen that follows the pointer across them. The dial is fixed behind every section and never changes colour. One object on the page is photographed metal: a steel cushion bezel, laid around the portrait as a nine-slice frame, with a minute track and a gold seconds mark running round it. A steel loupe follows the pointer over the portrait and shows the second picture inside its ring.

Everything else borrows the watch's own parts. Panels are smoked-glass plates with one polished top edge. Rules are minute tracks: a hairline with short ticks, and a longer tick every fifth mark. Figures sit beside small sub-dial registers whose gold hand swings to its mark. Dates sit in recessed date windows. Buttons are chronograph pushers. Colour follows a strict reading: gold is the hand and the one part that is active, emerald means live or approved, cyan means data moving through a system. There is no red; a rejected or removed state is shown in pale gold with a dashed line or a written word.

Type has three jobs and three faces. Syne sets names and headings, heavy and tight. Inter sets everything that is read. JetBrains Mono sets data only: figures, clocks, log lines, ledger rows, addresses. The page is dark throughout, and it is complete without hover, without scripts and with reduced motion.

**Key Characteristics:**
- One obsidian dial under every section, with horizontal grooves and a pointer sheen.
- One photographed steel bezel, used once, around the portrait.
- Smoked-glass plates with a single polished top edge and a deep, soft shadow below.
- Minute-track ticks as rules, sub-dial registers for figures, date windows for dates.
- Gold for the hand and the active part; emerald for live or approved; cyan for data in transit.
- Syne for names, Inter for reading, JetBrains Mono for data only.
- Sentence case everywhere; no uppercase tracked labels.

## Colors

A near-black dial with cool steel greys for structure and text, one warm gold that marks what is active, and two signal colours that appear only inside live instruments.

### Primary
- **Warm Gold** (`gold`): the primary action, the seconds mark on the bezel track, the sub-dial hands, the hotspots on the portrait and the leader line from a hotspot to its row, the line under the current navigation link, the thumb of a segmented control, a pressed skill pill, the progress line and lit numbers on a strategy rail, the short dash before an outcome, the focus ring, the caret and the text selection. As a fill it always takes `on-gold` text (9.2:1).
- **Pale Gold** (`gold-hi`): gold as text and as the top of the gold gradient. It marks the one emphasised item in a group: the unit prefix on a figure, the active row label in the leadership stack, an outbound link in a case, the "what carried forward" line on a venture, the source of a proof, a wallet address, a hovered link. It is 13.9:1 on obsidian. It is also the colour of a rejected, removed or bearish state inside the demos (a failed ledger row, a cut evidence link, a "short" call), always with a dashed stroke or a word beside it.
- **Deep Gold** (`gold-lo`): the bottom stop of the gold gradient on the primary button, the gold key and the switch thumb. Never a flat fill and never text.
- **On Gold** (`on-gold`): text and icons on any gold fill, and the text colour of a selection. It has no custom property in the stylesheet; it is written as a literal.

### Secondary
- **Live Emerald** (`emerald`): the pulsing dot beside the Toronto clock, and approved strokes in the diagrams (a signer that has signed, a department that has reached its threshold). At 10 and 20 percent it tints the emerald button.
- **Emerald Light** (`emerald-hi`): emerald as text (13.1:1 on obsidian): the status word in a log line, a satisfied threshold, a validated ledger row, an admitted evidence note, a saved review, a "long" call.

### Tertiary
- **Deep Cyan** (`cyan-deep`): the fill of the one agent that is transacting in the Manyworld diagram, under a cyan outline. A state fill for a diagram part and nothing else.
- **Transit Cyan** (`cyan`): data in motion. The live evidence path and its nodes in TrialLens, the agent that is transacting in Manyworld, and a 7 percent pointer glow on the lab benches. It is a stroke or a border, not a fill and not body text.

### Neutral
- **Obsidian** (`obsidian`): the dial ground, the footer, the well of a date window and of a segmented control, and the base of every scrim laid over a picture.
- **Carbon Slate** (`slate`): the ground of a case stage, and at 66 to 94 percent the fill of pills and tooltips.
- **Slate 2** (`slate-2`): the top stop of a plate gradient (venture, bench, contact key), at 72 to 88 percent.
- **Slate 3** (`slate-3`): the top of the steel button, the track of the switch, a resting agent in a diagram.
- **Rail** (`rail`): scrollbar thumb and idle connector lines in diagrams. A line colour only (2.1:1 on obsidian).
- **Steel Low** (`steel-lo`): idle strokes and metal gradient stops inside SVG diagrams. Graphics only; it is 4.2:1 on obsidian and is not used for text.
- **Brushed Steel** (`steel`): the quietest text (7.8:1 on obsidian): demo notes, timestamps, the small word after a name, empty states. Also the drawn hairline of a section rule.
- **Steel High** (`steel-hi`): labels, meta lines, column heads, the footer, hour ticks, the monogram and the loupe rim (13.4:1).
- **Ink** (`ink`): primary text (16.8:1 on obsidian).
- **Ink 2** (`ink-2`): secondary text and paragraphs inside plates (10:1 on obsidian, 8.5:1 on a plate).
- **Shade** (`shade`): pure black. It is the ink of every mask (the gradient masks that fade a picture into the dial, and the circular mask that opens the loupe) and the colour of every cast shadow and recess, at 35 to 100 percent. It is never a surface and never text.
- **Highlight** (`highlight`): pure white, at low alpha only. It is the polished top edge of a plate (7 to 14 percent, 50 to 70 percent on a gold part), the reflection on the crystal and the loupe (7 and 13 percent), the grooves' lit edge (5 percent), the pressed sample row (4.5 percent) and the pointer light on the gold key (45 percent). It is never a surface and never text.
- **Line** (`line`) and **Line 2** (`line-2`): steel at 16 and 32 percent. Line divides rows and outlines plates; Line 2 outlines controls and draws minute ticks.

### Named Rules
**The One Hand Rule.** Gold marks the one active part of a view: the action, the selected option, the item in focus, the point on a scale. A resting plate, a paragraph or a section ground is never gold. Pale gold text is allowed on one item per group.

**The Signal Rule.** Emerald means live or approved. Cyan means data in transit. Neither is decoration, and neither appears outside an instrument, a diagram or a status.

**The Two Palettes Rule.** The `print-*` colours belong to the print dossier and the rest belong to the page. No colour crosses from one surface to the other.

**The No Red Rule.** The build has no red. A rejected or removed state is pale gold with a dashed stroke or a written word, so the state never depends on colour alone.

**The One Dial Rule.** The ground is the obsidian dial in every section. A section changes by what is set on the dial (a plate, a stage, a masked picture), never by a new ground colour or a light section.

## Typography

**Display Font:** Syne Variable (fallback Syne, system-ui, sans-serif)
**Body Font:** Inter Variable with `cv11` and `ss01` (fallback Inter, system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono Variable (fallback JetBrains Mono, ui-monospace, monospace), tabular figures

All three faces are self-hosted through fontsource.

**Character:** Syne is wide and heavy with a slightly odd geometry, like the applied name on a dial. Inter is the neutral reading hand beside it. JetBrains Mono is the engraving on the case back: small, even and numeric.

### Hierarchy
- **Display** (Syne 800, `clamp(3rem, 5.1vw, 6rem)`, line-height 0.9, tracking -0.035em): the name in the hero, on two lines that do not wrap.
- **Headline** (Syne 700, `clamp(2.3rem, 5vw, 4.25rem)`, line-height 1, tracking -0.03em, balanced wrap): section headings and the closing heading (held to 13ch).
- **Title** (Syne 700, `clamp(2.2rem, 4.2vw, 3.6rem)`, line-height 1, tracking -0.03em): the name of a case study. Plate titles step down: `clamp(1.7rem, 2.8vw, 2.4rem)` for a group note, `clamp(1.6rem, 2.4vw, 2.1rem)` for a lab bench, `clamp(1.5rem, 2.2vw, 1.9rem)` for a venture, 1.3rem for a contact key, 1.05rem for the wordmark.
- **Lead** (Inter 500, `clamp(1.2rem, 1.7vw, 1.5rem)`, line-height 1.35, max 24ch, balanced): the one sentence under the name.
- **Section lead** (Inter 400, 1.125rem, line-height 1.6, `ink-2`, max 46ch): the paragraph beside a section heading.
- **Case lead** (Inter 400, `clamp(1.1rem, 1.5vw, 1.25rem)`, line-height 1.45, max 34ch): the challenge sentence that opens a case.
- **Body** (Inter 400, 1.0625rem, line-height 1.6): paragraphs, held to 44ch to 48ch beside a picture and 70ch at most.
- **Body small** (Inter 400, 0.9375rem, line-height 1.45): detail under a row, readouts, rail steps, meta lines.
- **Note** (Inter 400, 0.875rem, line-height 1.45 to 1.6): the step below body small, for text that supports something else: the hint under the hero, the scroll cue, a figure's scope, a venture's role line and its "what carried forward" line, field labels, list rows in the vault and audience demos, the reason under a gauge, the footer.
- **Label** (Inter 600, 0.8125rem, line-height 1.3, sentence case, `steel-hi`): column heads inside an instrument, list terms, hints. It sits beside or under the thing it names.
- **Button** (Inter 600, 1rem, line-height 1).
- **Control** (Inter 600, 0.9rem, line-height 1): small buttons and segmented options. Sample rows under a field use the same size at regular weight.
- **Figure** (JetBrains Mono 600, `clamp(1.55rem, 2.5vw, 2.35rem)`, line-height 1, tracking -0.035em, tabular): the four figures. The unit prefix is half size, raised, in pale gold. The gauge score is 2.2rem.
- **Data** (JetBrains Mono 500, 0.76rem, line-height 1.5, tabular): log lines, ledger cells, audit rows. 0.78rem to 0.8125rem for the clock, repository links, date windows and key values; 600 weight for values inside a row.

### Named Rules
**The Three Faces Rule.** Syne sets names and headings only. Inter sets every sentence, label and button. JetBrains Mono sets data only: numbers, times, addresses, repository paths and log text. Mono never sets a heading, a label or a paragraph.

**The Sentence Case Rule.** Nothing is set in uppercase and no text is letter-spaced wide. Tracking is zero or negative. Hierarchy comes from face, weight, size and the steel ramp.

**The Under, Not Over Rule.** A small line sits under or beside the name it describes (role and dates under a venture, kind under a bench). No small label sits above a heading to name the section.

**The Tabular Rule.** Any number that changes or lines up in a column uses tabular figures.

## Layout

The page is full width with one fluid side padding (`clamp(1.1rem, 4vw, 3.5rem)`) and no centred maximum. Sections are separated by the top padding of the section head (`clamp(5.5rem, 12vw, 10rem)`). A fixed top bar is 64px tall; it is clear over the hero and turns to smoked glass after 24px of scroll.

Columns are uneven. A section head is 13 to 10 (heading, then lead) with a full-width minute-track rule under both. A case is 5 to 8 (text, then stage). The fit section and the education block are 5 to 7. The ventures sit on a six-column grid with 1rem gaps: a two-column note, one four-column plate and two three-column plates. The figures are four registers in one glass strip; the contact keys are four in a row.

The first screen fills `100svh`. The name, the sentence and two actions sit upper left, anchored to the top so they do not move when the leadership stack opens. The portrait in its bezel sits right, sized by the smaller of 53vw and the free height. A minute track runs along the bottom edge with the live Toronto time and the cue to scroll.

Three breakpoints change the layout. At 1180px and below, the figures and keys go to two columns and the diagram and lab splits stack. At 999px and below, the navigation links hide (the wordmark and the gold email button stay), every two-column split becomes one column, and the hero reorders to name, sentence, portrait, switch, stack, actions. At 640px and below, figures, keys and education go to one column and tables drop their first column. From 1000px wide and 700px tall, each case is 185vh tall and its content pins for a full viewport while a scroll value from 0 to 1 lights the strategy rail; on smaller or shorter screens cases scroll normally.

Two repeating measures come from the dial: minute ticks every 12px with a long tick every 60px, and grooves every 27px. Touch targets are 52px for buttons, 44px or more for standalone controls (switch, pills, cue, hotspots at 46px), and 40px for compact controls inside an instrument (segmented options, small buttons, repository links, sample rows).

## Elevation & Depth

Depth is light on dark glass and steel. A plate is lit from above: a 1px inner highlight along its top edge is the polished edge, and a wide, soft black shadow with a large negative spread falls straight down so the plate seems to float just above the dial. Nothing casts a hard or offset shadow. Recessed parts (date window, switch track) take an inset shadow at the top instead. Glow is reserved for gold: under the primary button, on the seconds mark and on the leader line.

Glass blur (`backdrop-filter: blur(14px to 20px) saturate(1.3)`) is used only where a picture or the dial sheen sits behind the plate: the scrolled top bar, the inspect switch on the portrait, the figures strip and the contact keys. Plates over plain ground are near-opaque gradients with no blur.

Pictures are never boxed. Each sits behind its section and is masked to transparent at its edges, with an obsidian scrim (94 percent falling to clear) under the text side. On a plate, a radial light follows a mouse pointer: gold at 9 to 22 percent, or cyan at 7 percent on a lab bench.

### Shadow Vocabulary
- **Polished edge** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.07)` to `0.14`): the top edge of every plate, key, stage and steel button. 0.07 to 0.08 on near-opaque plates, 0.12 to 0.14 on blurred glass.
- **Plate float** (`0 50px 90px -50px #000`, `0 60px 100px -60px #000` for a stage, `0 30px 50px -30px #000` for a key): under a plate. Always centred, always with a spread about equal to its offset.
- **Bezel cast** (`filter: drop-shadow(0 20px 26px rgb(0 0 0 / 0.62))`): the steel bezel image.
- **Crystal** (`inset 0 0 0 1px rgb(255 255 255 / 0.08), inset 0 0 90px rgb(0 0 0 / 0.5)` with a 7 percent white reflection across the top-left corner): over the portrait.
- **Recess** (`inset 0 2px 5px rgb(0 0 0 / 0.7)` to `0.8`): the date window and the switch track.
- **Gold glow** (`inset 0 1px 0 rgb(255 255 255 / 0.55), 0 14px 30px -14px rgb(212 175 55 / 0.7)`; on hover `0.7` and `0 20px 40px -14px rgb(212 175 55 / 0.9)`): the primary button. `drop-shadow(0 0 5px rgb(212 175 55 / 0.9))` on the seconds mark and `0.55` on the leader line.
- **Loupe** (`0 0 0 1px rgb(0 0 0 / 0.7), inset 0 0 0 1px rgb(0 0 0 / 0.6), inset 0 0 38px rgb(0 0 0 / 0.35), 0 22px 44px -12px rgb(0 0 0 / 0.8)`): the steel ring that follows the pointer.
- **Live pulse** (`0 0 0 0 rgb(16 185 129 / 0.7)` growing to `0 0 0 9px` at zero alpha over 2.2s): the emerald dot.

### Named Rules
**The Polished Edge Rule.** A plate has exactly one highlight, a 1px inner line along its top edge. No plate has a highlight on a side or a coloured border at rest.

**The Straight Down Rule.** Cast shadows fall straight down, are black, and are pulled in by a negative spread close to their offset. No shadow is offset sideways, hard-edged or coloured, except the gold glow under a gold part.

**The Glass Needs Something Behind It Rule.** Blur a plate only when a picture or the sheen is behind it. Over plain ground a plate is a near-opaque gradient.

## Shapes

The watch is a cushion, so corners are generous and they scale with the part. A term chip is 6px, a date window is 7px, a tooltip is 9px, a segmented option or sample row is 10px, a small button or repository link is 11px, a field is 12px, a button and a segmented control are 14px, an inner well is 16px, a contact key is 18px, a plate is 24px, a stage or bench is 28px. Skill pills and the inspect switch are fully round; the switch track is 30px, which is its full height. The bezel and the portrait take their radius from the band thickness (2.6 and 1.25 times `clamp(20px, 3vw, 46px)`), so the frame keeps its proportions at every width. A nested shape always has a smaller radius than its parent.

Circles are the watch's round parts: the sub-dial registers (62px), the numbered stops on a strategy rail (2rem), hotspots, the loupe, the live dot, the switch thumb, signers in the vault diagram.

Lines come from the dial. A rule is a 1px steel hairline with a row of ticks under it, 12px apart; the hero track adds a taller tick every 60px. The track round the portrait is a dashed stroke: sixty minute marks, twelve heavier hour marks and one gold seconds mark that takes 60s to go round. Rows inside plates are divided by 1px lines at 16 percent. Icons are drawn on a 20px grid with one 1.75px stroke and square ends; the monogram uses a 2.2px stroke with a gold diagonal.

## Components

### Buttons
Chronograph pushers: short, solid and lit from above.
- **Shape:** 14px corners, 52px tall, padding 0 1.35rem, 0.6rem gap to a 1.15em icon. The small size is 40px tall with 11px corners and 0.9rem text.
- **Primary (gold):** a vertical gold gradient (pale gold, gold at 46 percent, deep gold), `on-gold` text, the polished edge at 55 percent and the gold glow. The glow lengthens on hover.
- **Steel:** a slate gradient at 90 percent, ink text, a `line-2` outline and the polished edge at 8 percent. The outline turns steel on hover.
- **Emerald:** emerald at 10 percent, an emerald outline at 60 percent, `emerald-hi` text; 20 percent on hover. It is used once, in the small size, to run the mechanism in the gateway demo. It is not used for navigation.
- **Press:** every button moves down 1px. Disabled is 50 percent opacity.
- **Magnetism:** the main actions drift toward a mouse pointer at 0.3 of the offset (0.18 for the contact keys) on a spring (stiffness 220, damping 16, mass 0.5). Mouse only, off under reduced motion.
- **Focus:** a 2px gold outline, offset 3px, on every focusable element.

### Segmented control
A recessed well (obsidian at 70 percent, `line-2` outline, 14px corners, 4px padding) holding 40px options in Inter 600 at 0.9rem. The pressed option sits on a gold thumb with 10px corners and a polished edge, and its text turns `on-gold`. The thumb slides between options on a spring (stiffness 420, damping 36). It switches a case between its strategy view and its system view, and sets modes inside the demos.

### Chips
- **Skill pill:** fully round, 44px tall, slate at 66 percent with a `line-2` outline and `ink-2` text. Hover brightens the text and outline. Pressed is a flat gold fill with `on-gold` text at weight 600. The pills are a filter: pressing one keeps matching proofs at full strength and drops the others to 50 percent.
- **Repository link:** 40px tall, 11px corners, a `line-2` outline, mono text in `steel-hi`; text and outline turn gold on hover.
- **Term chip:** 6px corners, a `line-2` outline, mono at 0.78rem; `emerald-hi` for a positive term and `gold-hi` for a negative one.

### Cards / Containers
- **Glass strip (figures):** 24px corners, a gradient from slate at 60 percent to obsidian at 74 percent, blur 20px, a steel-high outline at 17 percent, the polished edge at 12 percent and the plate float. Registers are divided by 1px lines.
- **Plate (venture, bench):** 24px or 28px corners, a gradient from `slate-2` at 86 to 88 percent to near-obsidian at 90 to 92 percent, a `line` outline, the polished edge at 7 percent. The outline steps to `line-2` on hover and the pointer light fades in.
- **Stage (case):** 28px corners, slate ground, a `line` outline, at least 34rem tall. The case picture fills it behind a left-to-right obsidian scrim. In the system view the picture drops to 14 percent, blurs 7px and the diagram takes the stage.
- **Inner well:** 16px corners, obsidian at 62 percent, a `line` outline. It holds a diagram inside a bench.
- **Contact key:** 18px corners, at least 7rem tall, blurred glass, a Syne label over a mono value with a gold icon at the lower right. The outline turns gold on hover. One key is solid gold: the email.

### Inputs / Fields
- **Style:** 50px tall, 12px corners, obsidian at 75 percent, a `line-2` outline, Inter 500 at 1rem, a `steel-hi` label above at 0.875rem.
- **Focus:** the outline turns gold and the gold focus ring sits 2px outside.
- **Sample rows:** under a field, a list of 40px rows with 10px corners; the pressed one gets a `line-2` outline and a 4.5 percent white fill.

### Navigation
A fixed 64px bar: monogram and Syne wordmark at the left, four section links in the centre (Inter 0.9375rem, `ink-2`), a small gold email button at the right. A link brightens to ink on hover. The link for the section in view gets a 1.5px gold line that draws from the left over 0.45s. Past 24px of scroll the bar becomes obsidian at 74 percent with blur 16px and a `line` border below. Below 1000px the links hide and there is no menu button. A skip link appears as a gold slip on focus.

### Minute-track rule
A full-width SVG under each section head: a 1px steel hairline that draws itself from the left as it enters, over a row of `line-2` ticks every 12px. The same ticks, as a background, part a diagram from its readout and run along the bottom of the hero.

### Sub-dial register (signature)
A 62px dial beside each figure: a thin edge ring, sixty minute marks, twelve hour marks in `steel-hi`, and a gold hand on a gold pin. The hand swings to its mark on a soft spring (stiffness 34, damping 11) when the figure counts up. The figure is mono 600 with its unit prefix in pale gold, a label in Inter 500 and a scope line in `ink-2`. The real number is in the HTML; the count is an enrichment.

### Date window (signature)
Dates sit in a recessed window: 7px corners, obsidian fill, a `line-2` outline, the recess shadow, mono 600 at 0.78rem with tabular figures.

### Bezel, loupe and hotspots (signature)
The portrait sits in the photographed steel bezel (a nine-slice `border-image`, with a smaller file at 640px and below) under the crystal shade. Over it, a steel loupe ring with engraved ticks follows a mouse pointer and reveals the second picture through a circular mask; the inspect switch opens that mask to the whole portrait. Then gold hotspots appear in turn (46px target, 13px gold core, a ring that pings every 2.6s). The active hotspot grows to 1.4, turns pale gold and holds a solid ring, and a gold leader line draws to its row in the leadership stack. The switch is a 54 by 30px recessed track with a steel thumb that turns gold and slides 24px when on. Without scripts the second picture is shown whole and the dead controls are hidden.

### Strategy rail
A numbered list down a 1px line. A gold line grows down it with the scroll, and each 2rem numbered stop (mono, on obsidian) lights with a gold ring and an 18 percent gold fill as the line reaches it. Unlit steps rest at 55 percent opacity.

### Readouts
Data inside a plate is ruled, not boxed: log lines (time in steel, status in `emerald-hi`, text in `ink-2`), ledger tables with Inter column heads over mono cells, and definition lists with `steel-hi` terms over mono values. Each demo carries a plain note in steel at 0.8125rem saying it is a toy model with sample data.

### Motion
Timing lives in `src/lib/motion.ts`. One easing for interface transitions, `cubic-bezier(0.16, 1, 0.3, 1)`, and `cubic-bezier(0.65, 0, 0.35, 1)` for drawing lines. Named springs drive the loupe, the iris, magnets, counters, sub-dial hands and the gauge needle. A view replaces another by fading, rising 14px and clearing an 8px blur over 0.6s. Headings rise line by line from a mask (1.05s, 0.09s stagger, `expo.out`); small items rise 28px in groups; SVG strokes draw over 1.6s. Lenis smooths the scroll (lerp 0.11). Under `prefers-reduced-motion` none of this runs, the seconds mark, the ping and the live pulse stop, and all content is visible and still. Items wait hidden only when scripts run and motion is welcome, and a failsafe shows everything after four seconds if the page script never starts.

### Second surface: the print dossier
`src/pages/dossier.astro` makes the PDF dossier and has its own light styles; it does not use the tokens above. It is a US Letter page (margins 13mm, 15mm, 12mm) in points and millimetres, with its own named palette: white paper (`print-paper`, on a `print-desk` grey when previewed on screen, with a soft `0 10px 40px` black shadow at 15 percent that does not print), `print-ink` for text (18.4:1), `print-ink-2` and `print-ink-3` for secondary text (12.6:1 and 7.6:1), `print-line` for hairlines, `print-gold` for gold text (6:1 on white) and `print-gold-rule` for the rule under a heading, a line only (2.9:1). The figures box has 3mm corners. The three faces keep their jobs: Syne 800 at 27pt for the name and 700 at 11.5pt for headings, Inter at 9.4pt for text, JetBrains Mono for figures and contact lines. No dial, glass, glow or motion carries over to print.

## Do's and Don'ts

### Do:
- **Do** keep the obsidian dial under every section and change sections by what is set on it.
- **Do** give each view one gold part: the action, the selected option or the item in focus. Put `on-gold` text on a gold fill.
- **Do** use emerald only for live or approved, and cyan only for data in transit.
- **Do** build a panel as a plate: a dark gradient, a `line` outline, one 1px polished top edge and a straight-down black shadow with a negative spread.
- **Do** blur a plate only when a picture or the dial sheen is behind it.
- **Do** rule with minute ticks (12px apart, a long tick every 60px), put figures beside a sub-dial register and put dates in a date window.
- **Do** set names and headings in Syne 700 or 800 with tracking of -0.02em to -0.035em, everything read in Inter, and data in JetBrains Mono with tabular figures.
- **Do** scale corner radius with the part, from 7px for a date window to 28px for a stage, and keep a nested radius smaller than its parent.
- **Do** mask a picture into the dial with a gradient and lay an obsidian scrim under the text.
- **Do** show a rejected or removed state in pale gold with a dashed stroke or a written word.
- **Do** keep all content present with no hover, no script and reduced motion, and read motion timing from `src/lib/motion.ts`.
- **Do** keep buttons at 52px, standalone controls at 44px or more, and compact controls inside an instrument at 40px.

### Don't:
- **Don't** introduce a light section, a second ground colour or a coloured section band on the main page. Light paper belongs to the print dossier only.
- **Don't** use gold for a resting plate, a paragraph or a section ground, or make two unrelated things gold at rest in one view.
- **Don't** use emerald or cyan as decoration, as a heading colour or as a button for navigation.
- **Don't** add red. The system has no red.
- **Don't** set a heading, a label or a paragraph in JetBrains Mono, and don't set data in Syne.
- **Don't** set text in uppercase or with wide letter-spacing, and don't place a small label above a heading to name the section.
- **Don't** use a hard, sideways or coloured cast shadow. Gold glow belongs under gold parts only.
- **Don't** add a second photographed frame. The steel bezel is used once, on the portrait.
- **Don't** box a picture in a card. Pictures sit behind a section, masked at the edges.
- **Don't** use `steel-lo` or `rail` for text; they are stroke colours.
- **Don't** drop text below 0.75rem.
- **Don't** carry the dial, glass or glow into the print dossier, or the dossier's light palette into the page.
