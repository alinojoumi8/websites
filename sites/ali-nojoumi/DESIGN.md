---
name: Ali Nojoumi
description: The account books of a product leader, kept as one open double-entry ledger.
colors:
  stock-green: "#cfe2c3"
  stock-gold: "#f2bd3a"
  stock-pink: "#f6a6b2"
  stock-cobalt: "#1c3fae"
  stock-manila: "#d8b683"
  stock-carbon: "#161412"
  ink-black: "#14120f"
  ink-ivory: "#f4f1e6"
  register-red: "#a3170f"
  oxide-red: "#7f1a0c"
  flamingo-red: "#7a0f12"
  cobalt-ochre: "#ffc531"
  carbon-ember: "#ff6a4d"
  stamp-cobalt: "#1d3fa8"
  carbon-focus: "#7aa2ff"
  marbling-vermilion: "#d8361f"
  bulb-ochre: "#e8a317"
typography:
  display:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "min(13.25vw, calc(var(--row) * 5.35))"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "calc(var(--row) * 2.02)"
    fontWeight: 900
    lineHeight: "calc(var(--row) * 3)"
    letterSpacing: "-0.035em"
  headline-sm:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "calc(var(--row) * 1.72)"
    fontWeight: 900
    lineHeight: "calc(var(--row) * 2)"
    letterSpacing: "-0.035em"
  figure-display:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "min(9.6vw, calc(var(--row) * 6))"
    fontWeight: 900
    lineHeight: "calc(var(--row) * 6)"
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "1.9em"
    fontWeight: 900
    lineHeight: "var(--row)"
    letterSpacing: "-0.02em"
  posting:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "1.62em"
    fontWeight: 900
    lineHeight: "var(--row)"
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "max(15px, calc(var(--row) * 0.52))"
    fontWeight: 400
    lineHeight: "var(--row)"
  label:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "0.82em"
    fontWeight: 700
    lineHeight: "var(--row)"
    letterSpacing: "0.01em"
  figure:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "0.92em"
    fontWeight: 400
    lineHeight: "var(--row)"
  hand:
    fontFamily: "Homemade Apple, cursive"
    fontSize: "1.2em"
    fontWeight: 400
    lineHeight: "var(--row)"
  tab:
    fontFamily: "Besley Variable, Georgia, serif"
    fontSize: "14px"
    fontWeight: 800
    lineHeight: "40px"
  seal:
    fontFamily: "Nastaliq Name, serif"
    fontSize: "2.2em"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  square: "0"
  thumb: "7px"
spacing:
  row-stacked: "30px"
  row-wide: "34px"
  row-book: "calc(100svh / 25)"
  edge-stacked: "18px"
  edge-wide: "40px"
  edge-book: "calc(var(--row) * 2.6)"
  inner-book: "calc(var(--row) * 1.7)"
components:
  post-button:
    backgroundColor: "{colors.register-red}"
    textColor: "{colors.stock-green}"
    rounded: "{rounded.square}"
    padding: "0 1em"
    height: "calc(var(--row) * 2)"
  ledger-action:
    textColor: "{colors.ink-black}"
    rounded: "{rounded.square}"
    padding: "0 0.1em"
    height: "calc(var(--row) - 2px)"
  ledger-action-hover:
    textColor: "{colors.register-red}"
  entry-field:
    textColor: "{colors.register-red}"
    typography: "{typography.hand}"
    rounded: "{rounded.square}"
    padding: "0"
    height: "var(--row)"
  thumb-tab:
    backgroundColor: "{colors.stock-gold}"
    textColor: "{colors.ink-black}"
    typography: "{typography.tab}"
    rounded: "{rounded.thumb}"
    padding: "calc(var(--row) * 0.32) calc(var(--row) * 0.24)"
  bookplate:
    backgroundColor: "{colors.stock-green}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.square}"
    padding: "calc(var(--row) * 0.5) 1.2em"
  t-account:
    textColor: "{colors.ink-black}"
    typography: "{typography.figure}"
    height: "var(--row)"
  stamp:
    rounded: "{rounded.square}"
    width: "calc(var(--row) * 5)"
---

# Design System: Ali Nojoumi

## Overview

**Creative North Star: "The Double-Entry Book"**

One open account book, hinged on a centre gutter, kept by a clerk who posts everything twice. The left page carries what was missing in red and the right page carries what shipped in black. Coloured form stock, ruled feint, column rules, rubber stamps and marbled edges are the whole material vocabulary, and each of them is doing a job a real ledger would give it.

The system is loud in colour and strict in measure. Stock is saturated and changes with every folio, Besley Black runs at poster scale, and photographic cut-outs of Ali stand on the rules like paper puppets. Against that, every line of text sits on one ruled row and state is carried by ink: a posted entry gets heavier, a refused line is struck through, an approval is stamped. Nothing is erased; corrections are struck and stay on the page.

Two layouts express the same book. The book layout fills the viewport with a 25-row spread and turns real leaves on scroll, while the stacked layout gives phones, narrow or short windows, reduced motion and no-script visitors the complete content as a continuous run of ruled sheets.

**Key Characteristics:**
- One form stock per folio, with ink and accent re-bound to each stock.
- A single ruled row height as the unit of measure.
- Besley Black display, Besley text on the rules, Courier Prime for posted figures, one clerk's hand.
- Depth comes from paper physics: gutter crease, leaf turn, fore-edge, never a raised panel.
- State lives in the ink and the stamp, not in badges or chips.

## Colors

Saturated office form stocks carrying near-black or ivory ink, with one accent re-tuned for each stock so it stays legible as the book changes colour.

### Primary
- **Register Red** (#a3170f): The accent ink on eye-ease green. Column rules, "what was missing" entries, the primary action, signatures, and the double rule around the bookplate. This is the vermilion the page actually reads as.

### Secondary
- **Oxide Red** (#7f1a0c): Accent ink on goldenrod and manila, where Register Red would lose contrast.
- **Flamingo Red** (#7a0f12): Accent ink on flamingo pink.
- **Cobalt Ochre** (#ffc531): Accent ink and the Released stamp on cobalt stock.
- **Carbon Ember** (#ff6a4d): Accent ink on carbon stock.

### Tertiary
- **Stamp Cobalt** (#1d3fa8): The rubber-stamp ink, the feint rule base on light stocks, the endpaper ground, and the keyboard focus ring.
- **Carbon Focus** (#7aa2ff): The focus ring on carbon stock only.
- **Marbling Vermilion** (#d8361f): The fore-edge ground, the red corner that closes the book, and the staff's rope. A material colour, not a text ink.
- **Bulb Ochre** (#e8a317): The lit sound tab and the staff's light bulb.

### Neutral
- **Eye-Ease Green** (#cfe2c3): Folios 1 and 7, the opening and closing account, and the bookplate.
- **Goldenrod** (#f2bd3a): Folio 2, the payroll.
- **Flamingo** (#f6a6b2): Folio 3, Pontemesto.
- **Cobalt Stock** (#1c3fae): Folio 4, Keywa. Takes ivory ink.
- **Manila** (#d8b683): Folio 5, the earlier books.
- **Carbon Paper** (#161412): Folio 6, the experiments. Takes ivory ink.
- **Ledger Black** (#14120f): Ink on light stocks, the page behind the book, and the stacked tab strip.
- **Ivory** (#f4f1e6): Ink on cobalt and carbon, and the sound tab in the book layout.

### Named Rules
**The One Stock Per Folio Rule.** A folio is one form stock from edge to edge, both pages. Change stock only by turning to a new folio. Green may return to close the book; no other stock repeats.

**The Rebound Ink Rule.** Ink, accent, feint and column rule are set per stock as a group. Never carry one stock's accent onto another.

**The Debit And Credit Rule.** Accent ink means the debit side: what was missing, what was refused, what is still to be signed. Black or ivory ink means what shipped.

## Typography

**Display Font:** Besley Variable (with Georgia, serif)
**Body Font:** Besley Variable (with Georgia, serif)
**Label/Mono Font:** Courier Prime (with Courier New, monospace)
**Hand:** Homemade Apple (with cursive)

**Character:** A heavy Clarendon-descended slab speaks in the printer's voice, the typewriter posts the figures, and a single looping script is the clerk filling in the form.

### Hierarchy
- **Display** (900, up to 5.35 rows in the book; 18.5vw stacked, 8.4vw from 900px, line-height near 1): The name, set once across the gutter.
- **Figure Display** (900, up to 6 rows in the book; 8.5vw stacked, 5vw from 900px): One monumental posted amount across a spread.
- **Headline** (900, 2.02 rows on a 3-row line): The largest folio statement.
- **Headline Small** (900, 1.72 rows on a 2-row line): The default folio statement.
- **Title** (900, 1.9em, on the row): Sub-account headings such as the signing panel. The experiment names step down to 1.4em.
- **Posting** (900, 1.62em, on the row): The struck line of a T-account entry, words or amounts.
- **Body** (400, 17px stacked, 0.52 rows with a 15px floor in the book, line-height one row): All running text, with lining numerals.
- **Label** (700, 0.82em): Running folio heads and printed column heads such as No., Name and Duty.
- **Figure** (Courier Prime 400, 0.92em): Dates, folio numbers, ledger amounts, threshold counts, list numbers.
- **Hand** (Homemade Apple 400, 1.2em): See the rule below.

One Nastaliq setting of the name in Farsi closes Folio 7 as a seal, in accent ink.

### Named Rules
**The On The Rule Rule.** Running text has a line-height of exactly one row, so baselines sit on the feint. Never set body text on a free line-height.

**The Clerk's Hand Rule.** Homemade Apple is what the clerk writes by hand: the "what was missing" and "what shipped" T-account heads, signer marks, the payroll names, the sign-off lines, whatever a visitor types into the entry, and the staff's notes. Printed table heads stay in Besley. Never use the hand for running text or an action.

**The Figures Are Posted Rule.** Amounts in a working ledger are set in Courier Prime. Besley carries an amount only when it is a headline fact: a T-account posting or the one monumental figure on a spread.

## Layout

The unit is the ruled row, painted as a 1px feint at the bottom of every row across the page, with paired vertical column rules 5px apart inside the outer margin.

In the book layout the row is one twenty-fifth of the viewport height, each page is a 25-row grid, and content is placed by row and row span. The left page runs outer margin, text, inner margin; the right page mirrors it. Elements that cross the gutter (the name, the portrait, the monumental figure) are printed on both pages at double width so a turning leaf folds them. The book requires at least 1100px wide, 620px tall, a 5:4 aspect, and motion allowed; if the leaf engine has not started within five seconds the page falls back to stacked.

In the stacked layout the row is 30px, or 34px from 900px where folios become two-column sheets, and blocks are separated by one row. On phones the first sheet pins the portrait beneath the sticky tabs and the rest of the sheet rides up over it. Display sizes here follow the viewport width, and the tab strip is a fixed 40px bar.

### Named Rules
**The One Row Rule.** Every element is measured against the ruled row: widths and offsets of stamps, heights of actions and fields, tab insets, corners, margins. In the book layout this is literal, and offsets may be fractions of a row. In the stacked layout gaps and controls use whole or half rows, and only viewport-sized display type leaves the rules.

**The Only Map Rule.** The thumb-index tabs are the only index of the book, one tab per folio in strict order, coloured with the stock they open. Page corners only turn to the next leaf, and an inline folio reference only cites its entry. Never add a second navigation, menu or table of contents.

## Elevation & Depth

Hybrid, and strictly physical. Pages are flat; what reads as depth is the book itself: a soft crease darkening into the gutter, a marbled fore-edge, a page corner curl, shade and cast gradients while a leaf is turning. Raster paper grain sits over every stock. Nothing is lifted off the page to get attention.

### Shadow Vocabulary
- **Leaf edge** (`box-shadow: 0 -6px 14px rgba(0, 0, 0, .28), 0 -1px 0 rgba(255, 255, 255, .55)`): Stacked layout on phones, along the top of the sheet that rides over the pinned portrait.
- **Thumb tab** (`box-shadow: -2px 1px 5px rgba(0, 0, 0, .3)`): Book layout tabs standing off the fore-edge.
- **Thumb tab, current** (`box-shadow: -3px 2px 8px rgba(0, 0, 0, .42)`): The open folio's tab.
- **Fore-edge** (`box-shadow: inset -3px 0 6px rgba(0, 0, 0, .3)`, mirrored on the right page): Rounds the marbled edge into the block.

### Named Rules
**The Leaf Edge Rule.** In the stacked layout a cast shadow exists only where a sheet physically passes over a photograph. Sheets that follow one another on paper cast nothing.

**The Pasted Not Floating Rule.** A plate is pasted to the page: flat, bordered, shadowless. No element becomes a floating card.

## Shapes

Square by default: stock, buttons, fields, stamps and the bookplate all have hard corners (0). The single curve is the die-cut thumb tab in the book layout, rounded on its outer corners only (7px on the left, 0 at the page edge); stacked tabs are square. Form language comes from rules, not containers: the feint, paired column rules, the T-bar of an account, and a 4px double rule to close a total or frame a plate. The page corner is a triangular clip that curls on hover.

## Components

### Buttons
Ink on paper, in two weights, both sized in rows.
- **Shape:** Square corners (0).
- **Post (primary):** Solid accent block carrying the stock's paper colour, Besley 900 at 1.25em, two rows tall, 1em side padding, closed by a drawn arrow in inline SVG.
- **Hover / Focus:** Tracking opens slightly; on press it settles 2px with a small scale. Focus shows a 3px ring in the folio's stamp colour with a 3px offset.
- **Action (secondary):** Unfilled word on a 2px underline, Besley 800, one row high. Hover and pressed states turn word and rule to the accent ink. Disabled fades.

### Inputs / Fields
- **Style:** No box. A transparent one-row field on the page's own rule, set in the clerk's hand in accent ink. The placeholder is also in accent ink, at full opacity.
- **Focus:** The shared 3px stamp-coloured ring.
- **Posted / Error:** Posting turns the writing to black ink, thickens it slightly, and stamps the row. An error replaces the status line in bold accent ink.

### Navigation
- **Style:** Thumb-index tabs, one per folio, each filled with its stock colour and that stock's ink.
- **Book layout:** Set vertically on the right edge, sized from the row, slightly tucked in and sliding out on hover. The current tab stands proud, widens and takes the deeper shadow. The sound toggle shares the strip as a final ivory tab, ochre when on.
- **Stacked layout:** A sticky, horizontally scrolling 40px strip on black. The current tab takes a 5px underline in its own ink, and the sound toggle is hidden.

### T-Accounts
The data component. Every figure on the site is posted to a ledger form rather than charted.
- **Opening account:** Two facing columns across the gutter, a handwritten head above each, entries as a Posting line with a Body line under it. Debit entries are entirely in accent ink.
- **Working account:** Courier Prime on single rows, Debit and Credit in Besley 800 above a 2px rule, a 2px centre bar, right-aligned amounts, and totals beneath a 4px double rule. Refused lines are struck through in accent ink, and a new line inks in from the left.
- **Line ledger:** A bold row head beside its value, one row each, for facts and contact details.

### Rubber Stamp
Real inked impressions, supplied as raster images with transparency. Each file carries its own ink: cobalt on light stock, ochre for Released on cobalt. Placed at a row-measured width, rotated a few degrees at 92% opacity, overlapping the rules. It drops in fast with a slight page jolt and a thump, or arrives only when the visitor's action earns it.

### Bookplate
A green plate with raster grain, framed by a 4px double rule in Register Red, set flat on the marbled endpaper as the colophon. The same plate titles the marbled intro cover.

### Paper Puppets
Photographic cut-outs of Ali, one monumental portrait per opening spread and a staff of tiny copies standing on the rules. They hop between pages on turn. No outline, no sticker edge, no CSS shadow.

## Do's and Don'ts

### Do:
- **Do** give each folio one form stock and bind its ink, accent, feint and column rule together.
- **Do** measure stamps, controls, margins and offsets in rows.
- **Do** post data to T-accounts and ruled line ledgers on the rows.
- **Do** use the clerk's hand for what a person writes on the form, and Besley for what is printed on it.
- **Do** show state in the ink: heavier when posted, struck through when refused, stamped when approved.
- **Do** keep every correction visible; the book is append-only.
- **Do** make ink texture and paper texture from raster images, as the stamps, grain and marbling already are.
- **Do** keep the complete content available in the stacked layout for phones, reduced motion and no script.

### Don't:
- **Don't** imitate stamp ink with CSS filters, SVG filters or blend modes.
- **Don't** add floating cards, raised panels, pills, chips, icon tiles or badges.
- **Don't** add a second map of the book beside the thumb-index tabs.
- **Don't** put a cast shadow on stacked sheets unless a sheet is passing over a photograph.
- **Don't** repeat a stock on the next folio, or mix two stocks in one folio.
- **Don't** round anything except the outer corners of a thumb tab.
- **Don't** set running text off the row.
