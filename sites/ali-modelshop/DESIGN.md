---
name: Ali Nojoumi Model Shop
description: A founder's record laid out on a model maker's cutting mat.
colors:
  mat: "#1b5a4f"
  mat-deep: "#113d37"
  mat-lift: "#27705f"
  line: "#a9dcc8"
  mint: "#c6e3d7"
  card: "#f3f1ea"
  card-edge: "#d3d0c4"
  ink: "#16211f"
  ink-2: "#45534f"
  yellow: "#ffd21f"
  yellow-deep: "#d9ae00"
  tape: "#7dbde8"
typography:
  display:
    fontFamily: "'Shop Display', 'Big Shoulders Stencil Variable', 'Archivo Variable', sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 5.75rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  display-plate:
    fontFamily: "'Shop Display', 'Big Shoulders Stencil Variable', 'Archivo Variable', sans-serif"
    fontSize: "clamp(2.9rem, 5.6vw, 5.4rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "0.005em"
  headline:
    fontFamily: "'Archivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.1rem, 5.4vw, 5.1rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 84"
  title:
    fontFamily: "'Shop Display', 'Big Shoulders Stencil Variable', 'Archivo Variable', sans-serif"
    fontSize: "clamp(1.8rem, 2.9vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 0.95
  lead:
    fontFamily: "'Archivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.15rem, 1.55vw, 1.45rem)"
    fontWeight: 440
    lineHeight: 1.38
  body:
    fontFamily: "'Archivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 640
    lineHeight: 1.55
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 82"
  caption:
    fontFamily: "'Archivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.15
    fontVariation: "'wdth' 88"
  ruler:
    fontFamily: "'Archivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "'tnum'"
rounded:
  cut: "0px"
  print: "1px"
  slip: "2px"
  round: "50%"
spacing:
  grid-minor: "20px"
  grid-major: "100px"
  rule: "28px"
  bar: "44px"
  gutter: "clamp(1.25rem, 5vw, 5rem)"
  section: "clamp(5.5rem, 13vw, 11rem)"
components:
  button-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "0 1.4rem"
    height: "54px"
  button-ghost:
    textColor: "{colors.card}"
    rounded: "{rounded.cut}"
    padding: "0 1.4rem"
    height: "54px"
  button-ghost-hover:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
  button-ghost-on-card:
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "0 1.4rem"
    height: "54px"
  button-ghost-on-card-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.cut}"
    padding: "0 1.4rem"
    height: "54px"
  card-board:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cut}"
    padding: "clamp(1.6rem, 4.4vw, 4.25rem)"
  ruler-bar:
    backgroundColor: "{colors.mat-deep}"
    textColor: "{colors.card}"
    height: "{spacing.bar}"
  nav-link:
    textColor: "{colors.mint}"
    typography: "{typography.caption}"
    height: "44px"
    padding: "0 0.7rem"
  nav-link-active:
    textColor: "{colors.yellow}"
  scale-switch:
    backgroundColor: "{colors.mat-deep}"
    textColor: "{colors.mint}"
    rounded: "{rounded.cut}"
    padding: "5px"
  scale-switch-thumb:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    height: "48px"
  caption-slip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.slip}"
    padding: "0.45rem 0.7rem"
  pin:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.round}"
    size: "26px"
  pin-active:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
---

# Design System: Ali Nojoumi Model Shop

## Overview

**Creative North Star: "The Cutting Mat"**

The page is the top of a model maker's bench. One green self-healing mat runs under everything, from the first screen to the footer, with a pale printed grid on it and a ruler along the top and left edges. On the mat sit things made by hand: white museum-card boards with a visible cut edge and four pin holes, and photo prints held down with blue masking tape. The pointer is a loupe laid on the mat: the grid swells under it and the ruler marks follow it.

Colour is flooded and then rationed. Green owns the whole ground. Card white is the only second surface. Cutter yellow is the one missing part, and each view gets one use of it: the action, the marked phrase, or the thing that is switched on. Type is stencil capitals for names and numbers, as on a parts crate, and a variable engineering sans for everything that has to be read. Figures are drawn the way a drawing sheet draws them, with a dimension line and a source on the line.

Depth is real light on real objects. Boards and prints cast a soft shadow down and to the right, as from a window at the upper left, and a board shows its thickness along its lower edge. Every pointer effect is an enrichment: the page is complete with no hover, no script, no WebGL and reduced motion.

**Key Characteristics:**
- One green mat under every section; no section changes the ground.
- White cut-card boards with square corners, a thick lower edge and four pin holes.
- Yellow is the one part per view: the action, the marked phrase, or the active state.
- Stencil capitals for names and numbers; a width-axis sans for reading.
- Photo prints with a white border, grain, a slight tilt and masking tape.
- Rulers on the top and left edges that carry the navigation and the pointer.
- Soft daylight shadows that fall down and to the right.

## Colors

A deep cutting-mat green carries every region, card white is the only other surface, and one cutter yellow marks the single part that matters in each view.

### Primary
- **Cutter Yellow** (`yellow`): the primary action, the marker drawn behind the key phrase, the active navigation link, the selected job and its number, the pressed pin, the thumb of the scale switch, the loupe ring, the ruler marks and scroll marker, the focus ring on the mat, and the text selection ground. It always takes ink as its text colour (about 11.4:1). As text it appears only on the mat or the ruler bar (5.5:1 and 8.3:1); it is never text on card (1.3:1).
- **Yellow Edge** (`yellow-deep`): the lower edge of anything yellow that has thickness (the primary button, the switch thumb). It is never a fill.

### Neutral
- **Mat Green** (`mat`): the page ground, flooded edge to edge, with a scratched mat texture blended over it in soft light.
- **Mat Deep** (`mat-deep`): the ruler bar, the side ruler, the well of the scale switch, the browser theme colour, and the shade laid under the hero words.
- **Grid Line** (`line`): the printed grid on the mat (minor lines at 8.5 percent, major lines at 20 percent), the ruler ticks (40 and 55 percent) and the crosshair (22 percent). Always a line, never a fill or a text colour.
- **Mint** (`mint`): secondary text on the mat (leads, notes, years, resting navigation links, about 5.9:1 on the mat) and rules on the mat at 40 to 60 percent.
- **Card White** (`card`): the boards, primary text on the mat (about 7.1:1), caption slips, pins, and the heavy rule above a table on the mat.
- **Card Edge** (`card-edge`): the 6px lower edge of a board, which shows the thickness of the card. Nothing else.
- **Graphite** (`ink`): text and rules on card (about 14.6:1), text on yellow, the ink button, the focus ring on card.
- **Graphite 2** (`ink-2`): secondary text on card and on prints (about 7.1:1): captions, sources on dimension lines, point lists.
- **Foam Blue** (`tape`) and **Mat Lift** (`mat-lift`): declared in the theme and not placed by any rule in the shipped stylesheet. Blue reaches the page only through the masking tape picture. Treat both as reserved; do not assume a role for them.

### Named Rules
**The One Part Rule.** Yellow is reserved for the one missing part in each view, the primary action, the marked phrase and the active state. If two unrelated things in one view are yellow at rest, one of them is wrong. The ruler marks and the light under the pointer are instruments and do not count.

**The One Mat Rule.** The ground is mat green everywhere. A section changes by what is laid on the mat (a board, a print, a table of ruled rows), never by a new ground colour.

**The Two Surfaces Rule.** Text sits on the mat in card white, mint or yellow, or on card in graphite. Mint never appears on card and graphite never appears on the mat.

## Typography

**Display Font:** Big Shoulders Stencil Variable, with one glyph (capital L) supplied by Big Shoulders under the family name Shop Display (fallback Archivo Variable, sans-serif)
**Body Font:** Archivo Variable with the width axis (fallback Helvetica Neue, Arial, sans-serif)
**Label/Mono Font:** none. Numbers use tabular figures in the same two families.

All faces are self-hosted through fontsource. The stencil L has a loose foot, so the name could misread; the plain sister face supplies that one letter through a `unicode-range` of `U+004C`, and both faces share their metrics.

**Character:** The stencil is the lettering sprayed on a crate of parts: tall, condensed, upper-case, used for names and numbers. Archivo is the engineer's hand beside it, and it changes width instead of changing family: narrow for labels and captions, normal for paragraphs.

### Hierarchy
- **Display** (stencil 800, uppercase, `clamp(2.6rem, 6.4vw, 5.75rem)`, line-height 0.92, balanced wrap): section headings. Weight 900 for the plate-scale settings: the hero name (`clamp(4.4rem, 23vw, 7.5rem)`, from 768px `clamp(6rem, min(13.2vw, 25svh), 13.5rem)`, line-height 0.87), the figures (`clamp(4.2rem, 10vw, 9.5rem)`, line-height 0.8, tabular), board names (`clamp(2.9rem, 5.6vw, 5.4rem)`, line-height 0.86) and the closing heading (`clamp(3.2rem, 9.4vw, 9.4rem)`, line-height 0.9).
- **Headline** (Archivo 600, width 84, sentence case, `clamp(2.1rem, 5.4vw, 5.1rem)`, line-height 1.02, tracking -0.022em): the one statement paragraph, held to 17em.
- **Title** (stencil 800, uppercase, `clamp(1.8rem, 2.9vw, 2.6rem)`, line-height 0.95): entries in the parts table. The same face at 1.3rem to 1.5rem sets the wordmark, the job numbers and the ratios on the scale switch.
- **Lead** (Archivo 440, `clamp(1.15rem, 1.55vw, 1.45rem)`, line-height 1.38, max 34em, pretty wrap): the opening paragraph of a section. Weight rises to 470 over the hero photo and to 540 for the one-line summary on a board.
- **Body** (Archivo 400, 1.0625rem, line-height 1.55): paragraphs, held to 30em to 40em. Point lists and notes drop to 0.98rem at line-height 1.4.
- **Label** (Archivo 640, width 82, 0.8125rem, uppercase, tracking 0.07em): the source on a dimension line, the kind and role line under a name, the terms in the notes list.
- **Caption** (Archivo 520 to 620, width 88, 0.8125rem to 0.875rem, sentence case, line-height 1.15 to 1.25): print captions, caption slips, the leader label, navigation links.
- **Ruler numerals** (Archivo 500, 0.625rem, tabular, mint at 62 percent): the numbers on the two rulers. Decorative and hidden from assistive technology.
- **Button** (Archivo 640, 1rem, line-height 1.1, sentence case).

### Named Rules
**The Stencil Rule.** The stencil sets names and numbers only, in capitals, at 1.3rem and above. It never sets a sentence, a paragraph, a caption or a button.

**The Width Axis Rule.** Small text gets narrower before it gets smaller: width 82 for labels, 84 for the statement, 88 to 90 for captions and list labels, normal width for paragraphs. Do not add a third family or a mono.

**The Under, Not Over Rule.** A label sits under the name it describes, or on a dimension line. No label sits above a heading to name the section.

**The Borrowed L Rule.** Keep Shop Display first in the display stack. Without it the stencil L breaks the name.

## Layout

The printed grid is the unit: minor lines every 20px and major lines every 100px, drawn by a fixed WebGL canvas that moves with the scroll, with the same grid as CSS background layers when WebGL is missing. The grid and both rulers share one origin, set 28px in from the left edge from 768px (the width of the side ruler) and at the edge below that.

Content sits in a centred wrap up to 1560px wide with a fluid gutter (`clamp(1.25rem, 5vw, 5rem)`). Sections are separated by `clamp(5.5rem, 13vw, 11rem)`, scaled by 0.4 to 0.8 where two sections belong together. Everything is one column on small screens. Two-column splits arrive at 900px and are uneven: 1.2 to 1 for heading and lead, 1.22 to 1 for photo and text on a board, a 9rem year column with 1.05 to 1.5 for the parts table, and 7 to 5 at 1000px for the scale print and its controls.

The first screen fills `100svh`: the model photo covers it, its plain lower-left field is masked away so the live grid shows under the name, and the name, role and two actions sit at the lower left. Below 768px the photo takes the top of the screen (up to 58svh) and the words follow it. The top ruler bar is fixed at 44px and holds the wordmark and the section links; two links show below 768px and all five from 768px. From 900px wide, and more than 760px tall, the project boards stick under the bar and stack, each one 0.9rem lower than the last. On shorter screens they scroll normally so no text is cut.

Touch targets hold a floor: 44px for links and pins, 48px for the switch, 54px for buttons.

## Elevation & Depth

Objects on the mat cast soft daylight shadows. The light comes from the upper left, so every shadow is offset down and to the right, is pulled in with a negative spread, and is tinted with the darkest mat green instead of black. A board also has physical thickness: a solid lower edge in a darker card tone. Shadows describe an object that is lying on the mat; text and flat rules never carry one, except the name and role over the hero photo, which take a soft dark-green glow so they hold against the picture.

### Shadow Vocabulary
- **Board** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.8) inset, 12px 30px 44px -22px rgb(4 24 20 / 0.72), 4px 6px 10px -6px rgb(4 24 20 / 0.45)` with `border-bottom: 6px solid` card edge): every card board.
- **Print** (`box-shadow: 10px 26px 34px -18px rgb(4 24 20 / 0.8), 2px 3px 6px -2px rgb(4 24 20 / 0.5)`): every taped photo print.
- **Tape** (`filter: drop-shadow(1px 2px 2px rgb(4 24 20 / 0.4))`): each strip of masking tape.
- **Slip** (`box-shadow: 4px 10px 16px -10px rgb(4 24 20 / 0.7)`): the leader label on the hero photo.
- **Raised part** (`box-shadow: 0 14px 22px -12px rgb(5 26 22 / 0.7)`, with `border-bottom: 4px solid` yellow edge): the yellow button at rest. It lifts 2px on hover with a longer shadow and sinks 2px when pressed with a shorter one.
- **Drawn outline** (`box-shadow: inset 0 0 0 1.5px`, mint at 35 to 60 percent on the mat, ink on card): the ghost button and the well of the scale switch. A line, not a shadow.
- **Pin holes** (four 8px radial gradients, 4px in from each corner of a board): each board was pinned at its corners.

### Named Rules
**The Window Light Rule.** Every cast shadow falls down and to the right, uses a negative spread, and is tinted dark mat green. No shadow is centred, black, or without blur.

**The Board Thickness Rule.** A thing that has thickness shows it on its lower edge only: 6px for a board, 4px for a button, 3px for the switch thumb. The edge is never drawn on a side.

## Shapes

Card is cut with a knife, so boards, buttons, the scale switch and the ruler bar have square corners (0px). Paper is softer: a print has 1px corners, and the small slips of card that carry a caption or a leader label have 2px corners. Circles are reserved for things that are round in the shop: pins, pin holes, the dot at the end of a leader line and the loupe (a 184px circle with a 5px yellow rim).

Prints are never square to the grid. They sit at a small fixed tilt (between 1.2 and 4 degrees either way), have a white border on three sides with the caption in the wider lower margin, carry photographic grain, and are held by two strips of tape across the top corners or one strip across the top. Lines come in three weights: 1px hairlines for rows and grid, 1.5px for drawn outlines and link underlines, 2px for the rule under a sheet heading, dimension lines and leader lines. Dimension lines end in 16px ticks. Point lists use a 9px open square in a 1.5px outline. Icons are two arrows drawn with one 2px square-capped stroke.

## Components

### Buttons
Cut parts that can be picked up.
- **Shape:** square corners (0px), minimum height 54px, padding 0 1.4rem, 0.7rem gap to a 1.15em arrow.
- **Primary (yellow):** yellow ground, ink text, a 4px yellow-edge lower border and the raised-part shadow. Lifts 2px on hover and sinks 2px on press over 0.25s. Used once per view.
- **Ghost:** no fill, a 1.5px drawn outline. On the mat it is card text with a mint outline and fills card with ink text on hover. On card it is ink text with an ink outline and fills ink with card text on hover.
- **Ink:** ink ground, card text, a 4px black lower edge; lifts 2px on hover. The outbound link at the foot of a board.
- **Arrow:** moves 4px right on hover over 0.35s.
- **Magnetism:** the primary action in the hero and in the closing card drifts toward a mouse pointer at 0.32 of the offset on a spring (stiffness 220, damping 16, mass 0.5). Mouse only, off under reduced motion.
- **Focus:** a 2px yellow outline offset 3px on the mat; ink on card.

### Cards / Containers
- **Board:** card white, square corners, 6px card-edge lower border, the board shadow and four pin holes. Padding `clamp(1.6rem, 4.4vw, 4.25rem)` for a sheet, `clamp(0.9rem, 1.8vw, 1.6rem)` when it frames a photo. A soft yellow light (20 percent, 520px) follows a mouse pointer across it. Boards arrive by being set down: they rise 80px, turn from -1.6 degrees and grow from 0.97 over 1.3s.
- **Project board:** a board with a photo on the left (4:3 on small screens, at least `min(64svh, 600px)` tall from 900px) and text on the right: stencil name, label line, summary, ruled point list, ink button. The photo carries grain and a caption slip at its lower left, and eases from 1.06 to 1 on hover over 1.2s. When stacked, each board shrinks by 0.022 per board above it as the next one lands.
- **Drawing sheet:** a board whose heading sits over a 2px ink rule, followed by rows divided by 1px ink rules at 22 percent. Each row is a stencil figure beside a dimension line with its source label and one sentence.
- **Photo print:** print-paper white (`#fbfaf6`) with a 9px to 12px border, the caption below, grain over the picture, tape, the print shadow and a fixed tilt. It tips up to 4.5 degrees toward a mouse pointer on a spring.
- **Caption slip and leader label:** card ground, ink text, 2px corners, caption type. The leader label adds a 2px card line and a 12px ink dot ringed in card, and points at one thing in a photo.

### Navigation
The top ruler is the navigation. A fixed 44px mat-deep bar carries ruler ticks along its lower edge (every 10px and every 100px) with numerals above them from 768px. The wordmark is stencil 800 at 1.3rem; links are caption type in mint, 44px tall, and turn yellow on hover and for the section in view. A 2px yellow mark on the top ruler and on the 28px side ruler follow the pointer, and a yellow triangle travels down the side ruler with the scroll. The side ruler is hidden below 768px. There is no menu button at any width. A skip link appears as a yellow slip on focus.

### Rows on the mat
Lists that sit directly on the mat are ruled rows, not cards. The parts table opens with a 2px card rule and divides rows with 1px mint rules at 42 percent; on hover a yellow marker draws behind the name over 0.5s and the name turns ink. The jobs list uses 1px mint rules at 40 percent, a stencil number and a label; the selected row moves 0.7rem right and its number and label turn yellow.

### Scale switch (signature)
A two-part switch in a mat-deep well with a 1.5px mint outline and 5px of padding. Each side is 48px tall and shows a stencil ratio and a plain label. The selected side sits on a yellow thumb with a 3px yellow-edge lower border, which slides between sides on a spring (stiffness 420, damping 32). It swaps the picture between one person and the team. In the team state, numbered pins (26px card circles with a 2px ink ring, inside a 44px target) drop onto the picture; a pin grows to 1.25 and turns yellow when hovered or pressed, and the picture zooms to 2.15 on the chosen figure. In the single state, a mouse pointer carries the loupe, which shows the team picture inside its ring. Without scripts or with reduced motion the team picture and its pins are shown from the start.

### The mat and the loupe (signature)
A fixed canvas draws the grid (20px, 100px and a faint 400px diagonal) in the grid-line colour. Under a mouse or pen pointer the grid swells within about 190px, major lines turn yellow there, and a thin crosshair spans the page. Touch devices, reduced motion and missing WebGL get the still grid.

### Motion
One easing for interface transitions: `cubic-bezier(0.16, 1, 0.3, 1)`, and GSAP `expo.out` for entrances. Headings and the statement rise line by line from a mask (108 percent, 1.05s, 0.09s stagger); small items rise 30px in batches; figures count up over 1.8s while their dimension lines draw over 1.4s; the yellow marker is drawn across the key phrase as it scrolls past. Lenis smooths the scroll (lerp 0.11). Under `prefers-reduced-motion` none of this runs and all content is visible and still. Items wait hidden only when scripts are running, and a failsafe shows everything after four seconds if the page script never starts.

An element that GSAP animates must not carry the CSS `translate`, `rotate` or `scale` properties; position it with margins or put the fixed tilt on a child. The hero photo frame is centred with negative margins for this reason, and the hero print carries its tilt on the inner figure while GSAP moves the wrapper.

## Do's and Don'ts

### Do:
- **Do** keep the ground mat green in every section and change sections by what is laid on the mat.
- **Do** give each view one yellow thing: the action, the marked phrase or the active state. Put ink on it.
- **Do** cut boards square, with the 6px card-edge lower border, the board shadow and four pin holes.
- **Do** set names and numbers in stencil capitals at weight 800 or 900, and everything that is read as a sentence in Archivo.
- **Do** narrow small text with the width axis (82 to 90) before reducing its size.
- **Do** present a photo as a print: white border, caption below, grain, tape, a tilt of 1.2 to 4 degrees and the print shadow.
- **Do** throw every shadow down and to the right with a negative spread and a dark-green tint.
- **Do** draw a figure with a dimension line and put its source on the line.
- **Do** keep all content present with no hover, no script, no WebGL and reduced motion.
- **Do** keep targets at 44px or more, and buttons at 54px.

### Don't:
- **Don't** use yellow as text on card, as a section ground, or for two unrelated things in one view.
- **Don't** introduce a second ground colour, a dark section, or a cream page.
- **Don't** round a board, a button or the switch. Curves belong to prints (1px), slips (2px) and round objects.
- **Don't** set a sentence, a caption or a button in the stencil, and don't use it below 1.3rem.
- **Don't** place a small label above a heading to name the section.
- **Don't** use a centred, black or zero-blur shadow, or put a shadow on a ruled row.
- **Don't** draw a thick edge on the side of a board or a row. Thickness shows on the lower edge only.
- **Don't** put mint on card or graphite on the mat.
- **Don't** set the CSS `translate`, `rotate` or `scale` properties on an element GSAP animates.
- **Don't** assign a role to foam blue or mat lift without a new decision. Blue is the tape picture and nothing else.
- **Don't** add a mono or a third type family.
