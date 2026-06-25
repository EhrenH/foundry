# Foundry — Focal Point & Motion Spec

> Build spec for the Foundry homepage centerpiece (the "forge" focal point) and the site-wide motion system. Written for Claude Code. Pairs with `PRODUCT_BRIEF.md` — all brand tokens, colours, and voice rules there still apply.

> **Build approach:** Option A — a pre-rendered visual asset with *faked* interaction via lightweight CSS/Canvas. NOT real-time Three.js/WebGL 3D. This is deliberate: it achieves ~90% of the premium feel at a fraction of the performance cost, and runs smoothly on low-end mobile. Real-time 3D is an explicit v2 consideration, out of scope here.

> **The non-negotiable constraint:** The site must score **95+ on Lighthouse Performance on mobile** with all of this implemented. If any effect threatens that, the effect loses. Premium *feel* and premium *performance* are both required; when they conflict, performance wins, because stutter is what actually reads as "cheap" to users.

---

## Part 1: The concept (what we're building and why)

Foundry sells **growth** — an abstraction, not a physical product. Like Vercel (which sells infrastructure via an abstract 3D triangle), Foundry needs a geometric focal point that *represents* its value rather than depicting it.

**The metaphor: the forge.** Foundry is a place where raw material becomes something valuable through heat and craft. The focal point is a **dark, forged geometric form with a molten Workshop Ochre glow** — heat and light emanating from within/behind it against a deep near-black background.

This ties three things together that no competitor can copy:
- The **name** (Foundry / forge)
- The **accent colour** (Workshop Ochre `#B8860B` as molten heat, not just a UI accent)
- The **value proposition** (raw business refined into something valuable)

Contrast with Vercel: they use *cold white* light on a black triangle. Foundry uses *warm molten* light on a dark forged form. That warm-vs-cold contrast differentiates instantly.

---

## Part 2: The visual asset (ASSET TASK — not a code task)

**⚠️ This section is about an asset that must be sourced/created separately. Claude Code cannot generate the image itself. Build the components in Part 3 to *receive* this asset; the human will supply the file.**

### What the asset is

A high-resolution image (or short image sequence — see Part 3.4) of the forge focal point:

- **Subject:** A dark, angular, forged geometric form. Could be a monolithic shard, an angular monolith, a faceted dark mass — something that reads as *solid, forged, substantial*. Not a soft orb; it should have edges and weight, like cooled metal or volcanic rock.
- **The glow:** Warm Workshop Ochre (`#B8860B`) light emanating from within or behind the form — as if molten heat glows at its core or radiates from behind it. This is the emotional heart of the image. The glow should feel like forge-fire: warm, alive, slightly uneven.
- **Background:** Deep near-black (`#1A1A1A` or slightly darker, e.g. `#0D0D0D` for the hero specifically — confirm with brand, but the hero can run darker than the rest of the site). The form sits in darkness; the glow is the only significant light.
- **Lighting:** Dramatic, single-source, high-contrast. Most of the form is in shadow; the Ochre glow rims/backlights it. Think chiaroscuro — Renaissance lighting drama, not flat product-shot lighting.
- **Mood:** Premium, elemental, a little mysterious. Calm but powerful. It should feel like *potential energy* — something powerful held in a still moment.

### How to source it

Options for the human, in order of recommendation:

1. **AI image generation** (fastest, free-ish, full control). Tools: Midjourney, DALL-E, or similar. The asset is abstract/geometric, which AI generators handle well (no faces, no hands, no brand-likeness issues). Suggested prompt direction:

   > "A dark angular forged geometric monolith floating in deep black space, glowing warm amber-ochre light emanating from within and behind it, dramatic single-source chiaroscuro lighting, most of the form in shadow, molten heat glow, premium minimal abstract, volcanic obsidian texture, cinematic, high contrast, dark background, 8k render"

   Generate several, pick the one with the best *glow* and the cleanest *negative space* around the form (it needs room to breathe — it sits in a large hero with white space around it). Iterate on the prompt for warmth and drama.

2. **Commission a 3D artist** (best quality, costs money, slower). A freelancer on Fiverr/Upwork renders a custom forge form in Blender/Cinema4D. Gives a truly bespoke, perfectly on-brand asset and high-res exports. v1.5 upgrade if AI generation isn't crisp enough.

3. **Render it yourself in Blender** (free, full control, learning curve). If the human has the time/inclination.

### Asset deliverables needed

- **Primary:** One high-res PNG/WebP of the focal point, ideally on transparent or pure-black background, at least 2000px on the long edge. Subject roughly centered with generous negative space around it.
- **Optional (for richer interaction — see 3.4):** A short sequence of 2-3 frames showing the form/glow at slightly different lighting angles, OR separate layers (the dark form as one layer, the glow as another) so the glow can be animated independently in code. **If layers are provided, the faked interaction in Part 3 becomes much more convincing.** Strongly recommended: export the **glow as a separate transparent PNG** from the **form**, so code can move/pulse the glow relative to the form.

**Until the real asset exists, build with a placeholder** — a CSS radial-gradient glow behind a simple dark angular CSS shape (clip-path polygon). This lets the interaction/motion be built and tested now; swap in the real asset when ready. Mark the placeholder clearly with `{/* PLACEHOLDER: replace with forge asset */}`.

---

## Part 3: The build (CODE TASK — this is what Claude Code implements)

### 3.1 Layout & structure

The focal point lives in the **homepage hero**. Layout (desktop):

- Full-viewport-height hero, deep near-black background (darker than the rest of the site).
- **Asymmetric composition**, echoing the Vercel reference: headline text on the **left**, the forge focal point in the **center-right**, a small supporting line of text on the **far right** (optional).
- The focal point is large but surrounded by negative space — it does not fill the hero. It floats in darkness.
- Primary + secondary CTA buttons sit beneath the headline on the left.

Mobile: stack vertically — headline, then focal point (smaller, centered), then CTAs. The focal point scales down but remains the visual anchor.

Reference composition (from the Vercel screenshot the human shared): headline left ("Agentic Infrastructure" position), glowing geometric focal point center-right, tiny text far right, CTAs under headline, logo strip at the very bottom. Foundry mirrors this structure with the forge form and warm glow instead of the cold triangle.

### 3.2 The faked mouse interaction (the core effect)

This is what makes it feel alive and premium without real 3D. Implement with lightweight CSS transforms driven by mouse position — NO WebGL, NO Three.js.

**Effect: parallax glow + subtle form shift on mouse move.**

- Track mouse position over the hero (throttled — see performance rules).
- **The glow layer** (radial gradient or the separate glow PNG) translates *slightly* toward the cursor — max ~15-20px of movement. This makes the "light source" feel responsive to the user.
- **The dark form** translates in the *opposite* direction, *very* subtly — max ~5-8px. This counter-movement creates a parallax sense of depth (the form and its light occupy different planes).
- Movement must be **smooth and damped** — use CSS transitions (e.g. `transition: transform 0.3s ease-out`) so the elements *glide* to the new position rather than snapping. The damping is what makes it feel expensive.
- **Magnitude is everything: keep it subtle.** This is barely-there motion the user feels more than sees. Overshooting magnitude is the #1 way to make it look amateur. When in doubt, reduce the movement.

Implementation approach:
- A container with `position: relative`, the glow and form as absolutely-positioned layers inside.
- A single mouse-move handler on the hero updates CSS custom properties (`--mouse-x`, `--mouse-y`) or directly sets transforms via `requestAnimationFrame`.
- Prefer CSS custom properties + `transform: translate(calc(...))` so the browser handles compositing efficiently.

### 3.3 Ambient idle motion (so it's alive even when still)

When the mouse isn't moving, the focal point should still feel alive, not frozen.

- **Slow glow pulse:** the Ochre glow gently breathes — opacity and/or scale oscillating subtly on a slow loop (e.g. 4-6 second ease-in-out cycle, opacity ~0.85 to ~1.0, scale ~1.0 to ~1.03). Like the slow flicker of forge-fire.
- **Optional gentle drift:** the whole focal point very slowly drifts in a tiny circular/figure-8 path over ~20-30 seconds, a few pixels of movement. Almost imperceptible, but it stops the image feeling static.
- Implement with CSS `@keyframes` animations — these run on the compositor thread and are cheap. No JS needed for the idle loop.

### 3.4 Optional richer interaction (only if layered/sequence asset provided)

If the human provides the glow and form as **separate layers**:
- The glow can pulse and parallax fully independently of the form (much more convincing depth).
- The glow colour intensity can subtly shift warmer/brighter toward the cursor.

If the human provides a **2-3 frame sequence** (form at different lighting angles):
- Cross-fade between frames based on mouse horizontal position, faking the look of the light raking across the form as the user moves. This approaches the real-3D feel at a tiny fraction of the cost.

Build the single-asset version first (3.2 + 3.3). Layer in 3.4 only if/when the richer asset exists. Don't block on it.

### 3.5 Scroll-triggered reveals (site-wide motion)

Beyond the hero, the whole site gets calm scroll-reveal motion:

- Sections and key text/elements **fade up gently** as they enter the viewport — opacity 0→1, translateY ~20-30px→0, over ~0.5-0.6s ease-out.
- Stagger child elements slightly (e.g. headline reveals, then sub-text 100ms later, then CTA 100ms after) for a sense of considered pacing.
- Use the **Intersection Observer API** (native, cheap) to trigger reveals — NOT scroll-event listeners (expensive, janky).
- Each element reveals **once** and stays visible. No re-hiding on scroll-up.
- Keep it subtle and consistent. Same reveal treatment everywhere = cohesive. Wildly different animations per section = amateur.

### 3.6 Reduced-motion accessibility (required)

- Respect `prefers-reduced-motion`. If the user has it enabled: disable the mouse-parallax, disable the idle drift, disable scroll-reveal translateY (content appears immediately, or with opacity-only fade). The glow pulse can remain very subtle or be stilled.
- This is non-negotiable — some users get motion sickness, and it's an accessibility standard.

---

## Part 4: Performance rules (the hard constraints)

These are not optional. Every one protects the 95+ mobile Lighthouse target.

1. **No Three.js, no WebGL, no real-time 3D libraries.** The entire effect is CSS transforms + a static asset + Canvas-at-most. This is the single biggest performance decision.

2. **Animate only `transform` and `opacity`.** These are GPU-composited and cheap. Never animate `width`, `height`, `top`, `left`, `box-shadow`, `filter` (especially blur) in a loop, or background-position — they trigger layout/paint and cause jank.

3. **The glow, if done in CSS, uses `radial-gradient`, not `box-shadow` or `filter: blur()`.** Large blurred shadows are expensive to repaint. A radial-gradient layer is cheap. If blur is unavoidable for the glow, bake it into the static image asset instead of doing it live in CSS.

4. **Throttle the mouse-move handler.** Use `requestAnimationFrame` to batch updates — never update transforms on every raw mousemove event. One update per frame max.

5. **The focal point asset must be optimized.** Served as WebP/AVIF via the Next.js `<Image>` component. Compressed (run through Squoosh/TinyPNG before adding). Appropriately sized — don't ship a 4000px image into a 700px slot. Set `priority` on the hero asset so it loads immediately (it's above the fold); everything else lazy-loads.

6. **Idle animations use CSS `@keyframes`** (compositor thread), not JS animation loops.

7. **Scroll reveals use Intersection Observer**, not scroll-event listeners.

8. **Test on mobile/low-end emulation, not just the dev laptop.** The effect looking smooth on a MacBook means nothing if it stutters on a mid-range Android. Run Lighthouse mobile, run Chrome DevTools CPU throttling (4-6x slowdown) and confirm the interaction stays smooth.

9. **Mobile can run a lighter version.** On touch devices there's no mouse, so the parallax-on-mouse-move doesn't apply anyway. On mobile: show the focal point with just the idle glow pulse (no parallax), or an even simpler static version. Consider disabling the idle drift on mobile too if it costs frames. The mobile experience should prioritize speed — a fast static-but-beautiful focal point beats a janky animated one.

---

## Part 5: Acceptance criteria

The build is done when:

- [ ] Homepage hero shows the forge focal point (real asset or clearly-marked placeholder) in the asymmetric layout (headline left, focal point center-right).
- [ ] Hero background is deep near-black; the Ochre glow is the dominant light.
- [ ] On desktop, moving the mouse subtly parallaxes the glow toward the cursor and the form gently counter-moves — smooth, damped, subtle.
- [ ] The glow has a slow ambient pulse so the focal point feels alive when idle.
- [ ] Sections and key elements fade up gently on scroll-enter via Intersection Observer, revealing once.
- [ ] `prefers-reduced-motion` is fully respected (motion disabled/reduced).
- [ ] Mobile shows a lighter version (idle glow, no mouse parallax) and prioritizes speed.
- [ ] **Lighthouse Performance is 95+ on mobile emulation** with everything implemented.
- [ ] Interaction stays smooth under 4-6x CPU throttling in DevTools.
- [ ] All animation is `transform`/`opacity` only; no layout-triggering properties animated in loops.
- [ ] The focal-point asset is served via Next.js `<Image>`, WebP/AVIF, compressed, with `priority`.

---

## Part 6: Build order

1. Build the hero layout structure (asymmetric, near-black, headline left / focal-point slot center-right / CTAs under headline). Static, no motion yet.
2. Add the **placeholder** focal point (CSS dark clip-path form + radial-gradient glow) so there's something to work with.
3. Implement the idle glow pulse (CSS keyframes).
4. Implement the mouse-parallax interaction (rAF-throttled, CSS-custom-property driven, damped transitions). Tune magnitude to *subtle*.
5. Implement scroll-reveal (Intersection Observer) across the homepage, then site-wide.
6. Add `prefers-reduced-motion` handling.
7. Add the mobile-lighter-version branching.
8. Run Lighthouse mobile + CPU-throttle testing. Optimize until 95+.
9. **(When the human provides it)** Swap the placeholder for the real forge asset. Re-test performance. If layered/sequence asset, layer in the richer interaction (3.4).

Build steps 1-8 now with the placeholder. Step 9 happens when the asset is ready — the human is sourcing it in parallel.

---

## Quick reference

- **Concept:** Forge focal point — dark forged form, molten Ochre glow, deep black. Represents growth/transformation. Ties name + colour + value prop.
- **Approach:** Pre-rendered asset + faked CSS interaction. No real-time 3D.
- **Interaction:** Subtle mouse-parallax (glow toward cursor, form counter-moves, damped). Slow idle glow pulse. Gentle scroll-reveals site-wide.
- **Hard limit:** 95+ mobile Lighthouse. Transform/opacity only. No WebGL. Throttle with rAF. Respect reduced-motion. Lighter on mobile.
- **Asset:** Sourced separately (AI-gen recommended for v1). Build with placeholder until ready. Glow-as-separate-layer strongly preferred.

---

*The forge is the spine of the homepage. Build it calm, build it alive, build it fast. Restraint in the motion, exactly as in the white space — that restraint is what reads as premium.*
