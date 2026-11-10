---
name: Ali Nojoumi Flagship
description: A founder's record, engraved and issued like a banknote plate.
colors:
  plate: "#070b11"
  plate-2: "#0b121c"
  navy: "#101b2c"
  bone: "#ede6d6"
  mist: "#a3b3c6"
  copper: "#cf7b36"
  gold: "#ecb964"
  emerald: "#1d9c79"
  emerald-deep: "#0a3a2e"
  teal: "#1b7189"
typography:
  display:
    fontFamily: "'Mona Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.5rem, 6.4vw, 6.6rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "'Mona Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.3rem, 6.6vw, 7rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 108"
  title:
    fontFamily: "'Mona Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.8rem, 3.4vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 122"
  lead:
    fontFamily: "'Mona Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.3rem, 1.9vw, 1.9rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "'Mona Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "'Mona Sans Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.07em"
  serial:
    fontFamily: "'Martian Mono Variable', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12em"
    fontFeature: "'tnum'"
rounded:
  focus: "2px"
  frame: "3px"
  pill: "9999px"
spacing:
  frame-inset: "11px"
  gutter: "5vw"
  gutter-wide: "7vw"
  block: "clamp(2.5rem, 5vw, 4.5rem)"
  flood: "clamp(5rem, 11vw, 10rem)"
  section: "clamp(6rem, 14vw, 12rem)"
components:
  button-foil:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.plate}"
    rounded: "{rounded.pill}"
    padding: "16px 24px 16px 28px"
  button-ink:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "20px 28px 20px 32px"
  button-ink-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.plate}"
  button-ghost:
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  button-ghost-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.plate}"
  nav-link:
    textColor: "{colors.bone}"
    typography: "{typography.label}"
  nav-link-on-flood:
    textColor: "{colors.plate}"
    typography: "{typography.label}"
  practice-plate:
    backgroundColor: "{colors.plate-2}"
    textColor: "{colors.bone}"
    rounded: "{rounded.frame}"
    padding: "48px"
  flood-emerald:
    backgroundColor: "{colors.emerald}"
    textColor: "{colors.plate}"
    padding: "clamp(5rem, 11vw, 10rem) 5vw"
  flood-copper:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.plate}"
    padding: "clamp(5rem, 12vw, 10rem) 5vw 32px"
  serial-tag:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.bone}"
    typography: "{typography.serial}"
    padding: "4px 8px"
---

# Design System: Ali Nojoumi Flagship

## Overview

**Creative North Star: "The Plate Room"**

The page is the room in a mint where a plate is engraved and a note is issued. The ground is plate-black navy with a live guilloche of hairlines turning behind everything. Ink is bone. One optically variable foil runs copper to emerald, and the pointer is the lamp that tilts it. Two sections are flooded edge to edge, one emerald and one copper, the way a banknote gives a whole panel to a single ink.

Scale is the main instrument. A 6px microtext rule and a billboard-wide name share one viewport, and nothing in between competes with them. Type is a wide black grotesque set in capitals, with the largest settings filled by engraving lines instead of solid ink. Density is low: one idea per screen, long vertical intervals, text columns held to roughly 30 to 52 characters.

Depth is a printing matter and never a lighting one. Frames carry two hairline passes printed out of register that snap true under the pointer. Nothing floats on a blurred shadow. Every pointer effect is an enrichment: the page is complete with no hover, no script, no WebGL and reduced motion.

**Key Characteristics:**
- Plate-black ground, bone ink, one copper-to-emerald foil.
- Achromatic text everywhere; colour lives in metal, floods and print passes.
- Wide weight-900 capitals at width 125, engraved-line fill at the largest sizes.
- Mono reserved for serials, dates and sources.
- Square 3px frames with an inner rule; pills only for actions and the portrait window.
- Two out-of-register hairline outlines instead of shadows.
- The pointer is a lamp; nothing depends on it.

## Colors

A near-black navy and a warm bone carry the whole reading experience; copper, gold, emerald and teal exist as one continuous foil and as two section floods.

### Primary
- **Mint Emerald** (`emerald`): the cool end of the foil, the second print-pass outline, and the ground of the figures section. As a flood it takes plate ink (about 5.7:1).
- **Plate Copper** (`copper`): the warm end of the foil, the first print-pass outline, and the ground of the closing contact section. As a flood it takes plate ink (about 6.1:1).

### Secondary
- **Foil Gold** (`gold`): the bright midpoint of the foil. Also the focus ring on dark ground and the text selection ground. Never a text colour.

### Tertiary
- **Deep Teal** (`teal`): the far cool stop of the foil gradient and the lamp border. It does not appear on its own.

### Neutral
- **Plate Black** (`plate`): page ground, theme colour, and the ink on both floods.
- **Plate Black 2** (`plate-2`): the ground of the practice plates, one step up from the page.
- **Bone** (`bone`): primary ink on dark ground, the primary button ground, inner frame rules at low alpha (14 to 32 percent), dividers at 12 to 15 percent.
- **Mist** (`mist`): secondary ink for supporting paragraphs, serial lines and notes on dark ground.
- **Navy** (`navy`) and **Emerald Deep** (`emerald-deep`): declared in the theme, not placed anywhere in the shipped build. Treat them as reserved; do not assume a role for them.

### Named Rules
**The Achromatic Ink Rule.** Text is bone, mist, or plate ink on a flood. No word is ever set in copper, gold, emerald or teal.

**The Metal, Flood, Pass Rule.** Colour appears in exactly three places: the foil (1px hairline rules, the progress bar, the foil stripe and button sheen), the emerald and copper section floods, and the two print-pass outlines. If colour shows up anywhere else, it is wrong.

**The Whole Section Rule.** A flood owns its section from edge to edge, switches all text and dividers to plate ink, and turns the navigation bar and focus ring to plate ink while it is under them. A flood is never a card, a badge or a stripe.

## Typography

**Display Font:** Mona Sans Variable (with Helvetica Neue, Arial, sans-serif), weight axis 200 to 900, width axis 75 to 125
**Body Font:** Mona Sans Variable, weight 400 at width 100
**Label/Mono Font:** Martian Mono Variable (with ui-monospace, SFMono-Regular, Menlo)

Both families are self-hosted through fontsource with the width axis included.

**Character:** One variable grotesque does everything by moving along two axes: it is narrow and quiet in paragraphs and goes wide, black and upper-case when it speaks. The mono is the numbering machine on the note and is used for nothing else.

### Hierarchy
- **Display** (900, width 125, uppercase, tracking -0.025em, line-height 0.86): section headings at `clamp(2.5rem, 6.4vw, 6.6rem)`, ranging up to `clamp(2.9rem, 10vw, 11.5rem)` for the closing heading. The name in the hero runs `min(17.7vw, 29svh)`; the denomination figures run `clamp(5.5rem, 25vw, 23rem)`.
- **Headline** (700, width 108, sentence case, `clamp(2.3rem, 6.6vw, 7rem)`, line-height 0.98, tracking -0.035em): the single statement paragraph, held to 17ch.
- **Title** (900, width 122, uppercase, `clamp(1.8rem, 3.4vw, 3.5rem)`, line-height 0.92 to 1, tracking -0.025em): practice plate headings, register entries, the signature line.
- **Lead** (600, width 112, `clamp(1.3rem, 1.9vw, 1.9rem)`, line-height 1.1 to 1.25): the role line and the one-sentence summary of each project.
- **Body** (400, width 100, 1rem to 1.15rem, line-height 1.55): paragraphs, held between 30ch and 52ch. On a flood the weight rises to 500 or 600.
- **Label** (600, 0.8rem, uppercase, tracking 0.07em): navigation links. Small pill hints use the same size in sentence case.
- **Serial** (Martian Mono 400, 0.6875rem, uppercase, tracking 0.12em, tabular figures): serial numbers, year ranges, sources under figures, signatory lines, the footer.
- **Microtext** (Martian Mono, 6px, uppercase, tracking 0.22em, 55 percent opacity): a decorative rule made of repeated words. Always hidden from assistive technology.

### Named Rules
**The Two Axes Rule.** Hierarchy is made by weight and width together. Width steps observed: 100 body, 108 statement, 112 lead, 118 to 122 titles, 125 display. Do not introduce a second sans.

**The Numbering Machine Rule.** Mono carries serials, dates and sources. It never sets a heading, a button, a paragraph, or a label that sits above a heading to name the section.

**The Engraved Fill Rule.** The largest display settings (the name, the figures) are filled with two single-ink line gratings of slightly different pitch (4px and 4.25px) with a 1px stroke in the same ink. They beat into bands and the pointer rolls the bands. One ink per setting, never a colour gradient, with a solid-ink fallback where text clipping or forced colours apply. Do not use it below billboard scale.

## Layout

A fluid 12-column grid appears from 1024px; below that every section is one column. Gutters are fluid (`5vw`, `7vw` from 112rem) and there is no fixed max-width container: headings are allowed to run the full width and text blocks are limited by character count instead.

Columns are split unevenly and alternate: 8/4 for heading and aside, 7/5 for picture and text, 7/5 then 5/7 for the practice plates with every second plate dropped by 4rem. The figures alternate left and right alignment row by row. Vertical rhythm is fluid: `clamp(6rem, 14vw, 12rem)` around plain sections, `clamp(5rem, 11vw, 10rem)` inside floods, `clamp(2.5rem, 5vw, 4.5rem)` between a heading and its content. Rows of record are separated by 1px rules at 12 to 15 percent bone (35 to 45 percent plate on floods), with 16px to 32px of padding.

The first screen fills `100svh`. The project series stacks vertically by default with 4:5 pictures; from 1024px wide and 620px tall, with motion allowed, it becomes one pinned row that travels sideways, with a serial counter and a foil progress bar at the bottom. The navigation bar is fixed, steps aside while scrolling down and returns on the way up or on focus.

## Elevation & Depth

There are no blurred shadows anywhere in the system. Depth is conveyed by print passes, by an inner rule inside each frame, and by layers of the same engraved plate texture at different opacities. The only `box-shadow` in the build is a 1px inset hairline on the practice plates.

### Shadow Vocabulary
- **Print passes** (two `1px solid` outlines, copper at `translate(-7px, -6px)` and emerald at `translate(7px, 6px)`, sitting behind the frame): every framed object at rest. Under the pointer both return to `transform: none` over 0.7s.
- **Inner rule** (`1px solid` bone at 14 to 32 percent, inset 11px): the border of a note vignette, inside photographs and plates.
- **Plate hairline** (`box-shadow: inset 0 0 0 1px rgb(163 179 198 / 0.24)`): the edge of a practice plate.
- **Register entrance** (zero-blur `text-shadow` at -0.075em copper and +0.075em emerald, fading to nothing over 1.5s): headings that land out of register and snap true. It is a transition, never a resting state.
- **Nav shade** (a vertical fade from the current ground colour to transparent behind the bar): keeps links readable over art and floods. A scrim, not a shadow.

### Named Rules
**The Print Pass Rule.** A frame is lifted by two hairlines out of register and by nothing else. Offsets stay at 7px by 6px. The passes register on hover; they do not grow, blur or glow.

**The No Soft Shadow Rule.** If a surface seems to need a drop shadow, it needs a rule, a pass, or a different ground instead.

## Shapes

Two shapes only. Frames are nearly square (3px radius) with an inner rule 11px in, like the border of a banknote vignette, and may carry a wide black corner numeral. Actions and the portrait window are full pills: the window is a tall stadium (100:138) with a 7px clear polymer rim and a vertical foil stripe about a tenth of its width.

Lines are 1px throughout: dividers, foil rules, print passes, inner rules. Pictures inside frames take film grain, and photographs take a fine 38-degree intaglio hatch over their lower half. Circular forms are reserved for the guilloche rosette, which turns once every 70 seconds, and for the cursor ring.

## Components

### Buttons
Calm at rest, metallic under the lamp.
- **Shape:** full pill (9999px).
- **Primary (foil):** bone ground, plate ink, weight 700 at 1.02rem, padding 16px 24px 16px 28px, with a 1em stroked arrow that rotates 45 degrees on hover. On hover or focus the foil texture fades in over 0.4s and its position follows the pointer.
- **Ink (on floods):** plate ground, bone ink, padding 20px 28px 20px 32px; inverts to bone ground with plate ink on hover over 0.3s.
- **Ghost:** 1px bone border at 40 percent, 0.8rem weight 600, padding 8px 16px; fills bone with plate ink on hover.
- **Magnetism:** the two main actions drift toward a mouse pointer at 0.32 of the offset on a spring (stiffness 190, damping 14). Mouse only.
- **Focus:** 2px gold outline offset 4px; plate ink on floods.

### Cards / Containers
- **Note frame:** 3px corners, overflow hidden, inner rule, print passes behind. Holds photographs and project pictures. Project pictures add a serial tag (mono on a plate ground, bottom-left) and a 5px foil stripe on the right edge.
- **Practice plate:** plate-2 ground with the engraved plate texture at 30 percent, 1px inset hairline, inner rule at 14 percent, padding 32px to 48px, minimum height 19rem to 23rem. A lamp follows the pointer: a 250px circle of the same texture brightened, plus a 1px gold-to-emerald edge near the pointer. The same state shows on keyboard focus within. This lamp belongs to the practice plates; it is not a general card treatment.
- **Shadow Strategy:** see Elevation & Depth. No blurred shadow.

### Navigation
A fixed bar with the name at 0.95rem weight 900 width 125 and three label links. Links carry a 1px underline that rests at 32 percent of its width and draws to full on hover or focus over 0.5s. Text is bone on dark ground and plate ink over a flood. A skip link appears as a bone pill on focus. There is no menu button at any width; three links fit.

### Rows of record
Lists are ruled rows, not cards: a serial year range, a title, a role and a note across the 12 columns. On hover a foil rule draws across the top over 0.7s and the title shifts 8px to 12px right. Selectable rows use the pressed state for the same treatment.

### The lamp (signature)
The pointer position is published as two custom properties, `--mx` and `--my`, on each section. They slide the foil from copper to emerald, roll the bands in engraved type, and drift the hero art by up to 34px. Over the portrait window the lamp is a soft circle that shows the colour photograph through the engraved plate; the second portrait keeps the colour photograph at rest so the real face is seen once with no hover. A cursor ring (14px idle, 46px over links, 78px bone disc with a short label over tagged targets) follows a fine pointer only.

### Motion
One easing for everything: `cubic-bezier(0.16, 1, 0.3, 1)`. First-screen entrances are CSS keyframes so they never wait for scripts (lines rise from a mask over 1s, the window unrolls over 1.5s). Below the fold, Framer Motion (LazyMotion with domAnimation) runs split-text rises and counters once on entry; GSAP ScrollTrigger pins the sideways series and scrubs the statement word by word; Lenis smooths the scroll. All of it stands down under `prefers-reduced-motion`, and a noscript rule shows every entrance already finished. The WebGL2 guilloche draws one still frame under reduced motion, on software renderers and on slow devices, and falls back to a still image of the same plate when WebGL is missing.

## Do's and Don'ts

### Do:
- **Do** keep every word bone, mist or plate ink. Check the Achromatic Ink Rule before adding any text colour.
- **Do** lift frames with the two print passes (copper up-left, emerald down-right, 7px by 6px) and let them register on hover.
- **Do** set headings in weight 900 at width 125, uppercase, line-height 0.86, and let them run wide.
- **Do** use Martian Mono for serials, dates and sources, at 0.6875rem with 0.12em tracking.
- **Do** give a flood the whole section and switch text, rules, navigation and focus ring to plate ink inside it.
- **Do** drive foil and engraved bands from `--mx` and `--my`, with a sensible resting value when no pointer exists.
- **Do** keep all content present with no hover, no script, no WebGL and reduced motion.
- **Do** limit text blocks by character count (30ch to 52ch) instead of a container width.

### Don't:
- **Don't** set text in copper, gold, emerald or teal, or fill type with the foil gradient. The engraved fill is one ink.
- **Don't** add blurred drop shadows or outer glows to lift a surface.
- **Don't** use a flood colour for a card, badge, tag or button.
- **Don't** use mono for headings, buttons or paragraphs, or as a small label above a heading.
- **Don't** round frames beyond 3px or introduce a mid-size radius; shapes are square frames and full pills.
- **Don't** extend the pointer lamp to new card grids; it belongs to the practice plates and the portrait windows.
- **Don't** add a second sans or a serif; the width axis does that job.
- **Don't** let any figure appear without its scope and date in a serial line beneath it.
