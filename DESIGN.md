---
name: CaseIQ
description: One litigant's court record, assembled on an obsidian desk in parchment, gold and emerald.
colors:
  obsidian: "#0b1220"
  navy: "#121c33"
  navy2: "#1d2c4d"
  line: "#2f3f63"
  parchment: "#f1e7d0"
  ivory: "#fbf6ea"
  ink: "#141a2a"
  ink2: "#4a4f5c"
  mist: "#c3cbdc"
  gold: "#e6b23a"
  gold-lift: "#f4c75a"
  golddeep: "#7a570a"
  emerald: "#3ccf9d"
  emdeep: "#0c3a2e"
  emink: "#0b6048"
  emerald-mist: "#d5e6df"
  discrepancy-red: "#9b1c1c"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "4.25rem"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "3.5rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.012em"
  service-title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.25
  exhibit-title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "1.14rem"
    fontWeight: 400
    lineHeight: 1.18
  figure:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "tnum"
  lead:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  note:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.2
  finding:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.6
rounded:
  exhibit: "2px"
  control: "3px"
  pin: "50%"
spacing:
  seam: "3px"
  gutter: "20px"
  gutter-wide: "40px"
  panel: "24px"
  panel-wide: "40px"
  section: "80px"
  section-wide: "112px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.95rem 1.4rem"
  button-gold-hover:
    backgroundColor: "{colors.gold-lift}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.95rem 1.4rem"
  button-ghost-hover:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.95rem 1.4rem"
  button-ink-hover:
    backgroundColor: "{colors.navy2}"
    textColor: "{colors.ivory}"
  field:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    typography: "{typography.note}"
    rounded: "{rounded.control}"
    padding: "0.75rem 0.85rem"
  exhibit-slip:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.exhibit}"
    padding: "0.75rem 0.8rem 0.8rem"
  exhibit-tab:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "3px 3px 0 0"
    padding: "0 0.75rem"
    height: "26px"
  service-row:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.ivory}"
    typography: "{typography.service-title}"
    padding: "1.05rem 1.25rem"
  service-row-hover:
    backgroundColor: "{colors.navy2}"
    textColor: "{colors.ivory}"
  service-row-open:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.ink}"
  service-panel:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.ink}"
    padding: "2.5rem"
---

# Design System: CaseIQ

## Overview

**Creative North Star: "The Bound Court Record"**

Every surface is part of one litigant's file laid out on a dark desk. Obsidian-navy is the desk; parchment and ivory are the paper; gold is the binding hardware of tabs, pins and the chronology rail; emerald is the mark of something verified. The system's central gesture is disorder becoming date order, so structure is shown as an act of attention to the file.

Density is that of a working document: full-bleed fields of a single ground, a wide 1400px sheet, generous section breaks, and tight, tabular detail inside the exhibits. The type pairs a heavy-contrast editorial serif with a plain grotesque that stays legible for a tired reader on an old phone. The system is scoped to the CaseIQ site at `sites/caseiq/`; other sites in this workspace need their own record.

The world rejects the law-firm template: no skyline hero, no scales of justice, no row of boxed service cards.

**Key Characteristics:**
- Full-bleed single-ground fields in obsidian, parchment, ivory, deep emerald and gold.
- Paper objects are the only things that cast a shadow.
- Gold binds and acts; emerald verifies; red marks a discrepancy.
- Gloock at one weight for every heading and figure; Hanken Grotesk for everything read.
- Near-square corners, hairline rules, and round pins on a gold rail.
- Motion is a single long settle, always fully disabled under reduced motion.

## Colors

A restrained desk of blue-blacks and warm papers, with saturated gold and emerald reserved for meaning.

### Primary
- **Binder Gold** (#e6b23a): Primary buttons, the chronology rail and its pins, exhibit tabs, the emphasized line of the hero headline, nav hover, and one full closing field. On dark or as a filled ground under ink only.
- **Lifted Gold** (#f4c75a): Hover state of the gold button, nothing else.
- **Aged Gold Ink** (#7a570a): The gold that survives on paper: slip dates, disclosure chevrons, list squares, the open service marker, slider tracks.

### Secondary
- **Verification Emerald** (#3ccf9d): Check marks and deliverable lines on dark and deep-emerald grounds, and the default focus ring.
- **Deep Emerald Field** (#0c3a2e): The full-bleed process field.
- **Emerald Ink** (#0b6048): Findings, the positive column heading and the savings figure on paper; the focus ring on light grounds.
- **Emerald Mist** (#d5e6df): Body copy on the deep emerald field.

### Tertiary
- **Discrepancy Red** (#9b1c1c): Form errors and invalid borders, the circled flaw on a signature, and anomalous figures in an exhibit table. On paper only.

### Neutral
- **Obsidian Desk** (#0b1220): Page ground, header, footer, and the highlighted CaseIQ column in the comparison table.
- **Navy Folder** (#121c33): Closed service rows.
- **Raised Navy** (#1d2c4d): Hover for service rows and the ink button.
- **Desk Rule** (#2f3f63): Hairline borders on dark grounds.
- **Parchment** (#f1e7d0): Full-bleed reading fields, the open service panel, the estimator.
- **Ivory** (#fbf6ea): Exhibit paper, form sheets, inputs, and primary text on dark grounds.
- **Record Ink** (#141a2a): Text on paper and gold; the submit button.
- **Faded Ink** (#4a4f5c): Secondary text on paper.
- **Desk Mist** (#c3cbdc): Secondary text on dark grounds and the ghost button outline.

### Named Rules
**The Ink-Swap Rule.** Bright accents stay on dark grounds. On paper, gold becomes Aged Gold Ink and emerald becomes Emerald Ink.

**The Discrepancy Rule.** Red appears only where something fails to match or fails to validate. It is never decoration or emphasis.

**The Ground-Matched Focus Rule.** Focus is a 3px outline offset 3px: emerald on dark, Emerald Ink on light, Record Ink on gold.

## Typography

**Display Font:** Gloock (with Georgia, serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)

**Character:** Gloock supplies the weight of a printed judgment; Hanken Grotesk is direct and unornamented. Both ship inlined in the page, and figures in records use tabular numerals.

### Hierarchy
- **Display** (400, 2.5rem to 3.75rem at 640px, then min(4.6vw, 4.25rem) from 1024px, 1.04): The single page headline, balanced, with its turn set in gold on its own line.
- **Headline** (400, 2.4rem to 3.5rem at 1024px, 1.1): Section statements, usually capped near 13 to 14em. The closing field runs up to 4.25rem.
- **Title** (400, 1.875rem, 1.2): Stage names, forensic questions, the estimator heading.
- **Service Title** (400, 1.5rem, 1.25): Service rows and comparison column headings.
- **Exhibit Title** (400, 1.14rem, 1.18; 1.02rem under 900px): The quoted or described content of a slip.
- **Figure** (400, 3.75rem to 4.5rem at 1024px, 1, tabular): The estimator result.
- **Lead** (400, 1.25rem, 1.4): Opening paragraphs, 34 to 62ch.
- **Body** (400, 1.0625rem, 1.6): Reading text, held to 40 to 68ch.
- **Note** (400, 1rem, 1.5): Disclaimers, secondary lines, form help and errors.
- **Action** (700, 1.0625rem, 1.2): Buttons.
- **Finding** (600, 0.875rem, 1.3): The verified conclusion at the foot of a slip.
- **Label** (700, 0.8125rem, sentence case): Slip dates and exhibit tabs.

### Named Rules
**The One Weight Rule.** Gloock is set at 400 only, with -0.012em tracking on page headings. Hierarchy comes from size and colour.

**The Sentence Case Rule.** Labels, tabs and buttons stay in sentence or title case at normal tracking.

## Layout

Each section is a full-bleed field holding a centered sheet of up to 1400px, with 20px side gutters widening to 40px at 1024px. Sections break at 80px, widening to 112px at 1024px, and adjacent full-bleed fields change ground; a slim ruled band may continue the ground of the field above it. Inside the sheet, a 12-column grid sets asymmetric splits such as 5/7, 4/8 and 7/5; grid gaps run 24 to 64px.

The sticky header is 72px and anchors offset by 88px. The chronology stage changes axis at 900px, from a horizontal rail with six columns to a vertical rail at the left edge. The service index becomes a 5fr/7fr master and detail at 768px; tabular comparisons restack into labelled blocks under 768px. A fixed bottom action bar appears on phones between the hero and the form.

## Elevation & Depth

Depth is tonal: fields and folders are flat, separated by ground colour, 1px rules and 3px seams. The single true shadow belongs to loose paper.

### Shadow Vocabulary
- **Paper on desk** (`box-shadow: 0 10px 24px -8px rgb(0 0 0 / .65)`): Exhibit slips on the dark desk.

### Named Rules
**The Only Paper Lifts Rule.** A drop shadow means a physical sheet resting on the desk. Panels, sections, buttons and forms stay flat.

## Shapes

Corners are nearly square, as cut paper is: 2px on exhibit slips, 3px on controls, and 3px top corners only on exhibit tabs. Large fields, panels and tables keep square corners. Circles are reserved for hardware: rail pins, stage nodes and slider thumbs. List markers are 8px gold squares. Rules do the structural work, from 2px heavy table heads and gold rails to ink hairlines at 20 to 30% opacity.

## Components

### Buttons
Solid, compact, with a small physical lift.
- **Shape:** Near-square (3px), inline-flex with a 0.55rem icon gap.
- **Gold:** The primary action everywhere on dark grounds, always naming the free triage. In the header its vertical padding tightens to 0.625rem.
- **Ghost:** A 1.5px inset Desk Mist outline with ivory text, filling ivory with ink text on hover. Under 640px it drops the outline and reads as an underlined link.
- **Ink:** The submit button on paper, full width in the form.
- **Hover / Focus:** Lifts 2px over 0.2s on the settle curve, returns on press; focus per the Ground-Matched Focus Rule.

### Cards / Containers
There is no generic card. Containers are paper sheets (form and exhibit, ivory, 24 to 40px padding) or tinted panels (estimator, parchment), square-cornered and flat.

### Inputs / Fields
- **Style:** Ivory fill, 1.5px Record Ink border, 3px corners, 1rem text; labels sit above in semibold.
- **Focus:** The light-ground focus outline, with an Aged Gold Ink caret.
- **Error:** Border and 1px inset ring in Discrepancy Red, with a plain-language instruction below.

### Sliders
A 4px track with a 24px circular thumb in ink or obsidian, ringed 3px in gold. The value appears opposite the label in tabular numerals. Track defaults to Aged Gold Ink; Desk Mist on dark grounds.

### Navigation
Sentence-case Hanken Grotesk at 0.975rem in Desk Mist, turning gold on hover, on a 95%-opaque obsidian bar with a hairline base. The wordmark pairs Gloock with a small parchment page and gold tab drawn in SVG. Under 1024px links collapse to a menu with large block targets, closable by Escape.

### Exhibit Slip (signature)
An ivory sheet holding a date in Aged Gold Ink, a document type, a Gloock title, and a finding pinned to its foot with a Lucide check in Emerald Ink. Slips hang by a gold stem and pin from the rail. In the scattered state they rotate, overlap and hide their findings; on entry they settle into date order over 0.95s on `cubic-bezier(.16,1,.3,1)`, staggered 55ms each, as the rail draws in. Under reduced motion they start in order. Sample material always carries a visible "invented for illustration" caption.

### Exhibit Tab
A 26px gold tab with 3px top corners, sitting on the top edge of an ivory exhibit at the right, naming it ("Exhibit A").

### Service Index
A one-open master and detail. Navy rows separated by 3px seams; the open row turns parchment and joins its panel, marked by a 9px Aged Gold Ink tab at the seam. Exactly one panel is ever open.

### Stage Rail
A 2px gold rule across the top of a three-part sequence with 16px gold nodes at each column start, and columns left unboxed.

### Signature Wipe
Two stroked signatures, Emerald Ink for known and Aged Gold Ink for questioned, on an ivory exhibit with a ruled baseline. A slider clips the questioned stroke; the flaw is circled in Discrepancy Red.

### Disclosure List
Unboxed Gloock questions divided by ink hairlines, with an Aged Gold Ink plus that rotates 45 degrees over 0.25s when open.

## Do's and Don'ts

### Do:
- **Do** set every major section as one full-bleed ground and change the ground between neighbouring fields; a slim ruled band may continue the field above it.
- **Do** use gold for action and binding hardware, and emerald only for verified results.
- **Do** swap to Aged Gold Ink and Emerald Ink on paper.
- **Do** keep drop shadows on loose paper, using the Paper on desk value.
- **Do** caption illustrative exhibits as invented.
- **Do** use tabular numerals in dates, money and exhibit tables.
- **Do** end every motion at a legible, ordered state and honour reduced motion.

### Don't:
- **Don't** use skyline photography, scales of justice or a row of boxed, equal service cards.
- **Don't** set Binder Gold or Verification Emerald as text on parchment or ivory.
- **Don't** use Discrepancy Red for emphasis or decoration.
- **Don't** set Gloock bold or use it for running text.
- **Don't** round rectangles beyond 3px; circles are for pins, nodes and thumbs.
- **Don't** rotate exhibits outside the scattered state.
- **Don't** show more than one service panel open.
