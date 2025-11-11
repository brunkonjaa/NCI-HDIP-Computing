(() => {
  "use strict";

  const createQuestion = (id, topic, prompt, options, correct, type = "single") => ({
    id,
    topic,
    prompt,
    type,
    options: options.map(([value, text]) => ({
      id: value,
      label: value,
      text,
    })),
    correctAnswers: Array.isArray(correct) ? correct : [correct],
  });

  const cssQuestions = [
    createQuestion(
      "CSS-001",
      "Selectors & Specificity",
      "Which selector targets an element with the id value main?",
      [
        ["A", ".main"],
        ["B", "#main"],
        ["C", "main"],
        ["D", "*#main"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-068",
      "Modern CSS Features",
      "What does the :has() selector enable?",
      [
        ["A", "Selecting an element based on its descendants or subsequent siblings."],
        ["B", "Selecting parents only when they have inline styles."],
        ["C", "Selecting elements based on previous siblings."],
        ["D", "It functions identically to :not()."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-069",
      "Modern CSS Features",
      "How do cascade layers declared with @layer benefit styling?",
      [
        ["A", "They allow you to scope styles to components."],
        ["B", "They provide an explicit order for groups of styles before specificity is considered."],
        ["C", "They automatically reduce specificity of selectors."],
        ["D", "They disable inheritance."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-070",
      "Modern CSS Features",
      "What does @property --brand { syntax: '<color>'; inherits: false; initial-value: #6366f1; } enable?",
      [
        ["A", "Registration of a custom property with type checking and transitions."],
        ["B", "Definition of CSS variables usable only in :root."],
        ["C", "Creation of a new DOM property."],
        ["D", "Automatic fallback colors for unsupported browsers."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-071",
      "Modern CSS Features",
      "How does color-mix(in srgb, var(--brand) 60%, white) compute?",
      [
        ["A", "It selects whichever color has higher contrast."],
        ["B", "It blends the two colors in the specified color space by percentage."],
        ["C", "It converts colors to CMYK first."],
        ["D", "It averages RGB channels without weighting."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-072",
      "Modern CSS Features",
      "What does accent-color: #22d3ee; change?",
      [
        ["A", "The color of ::selection text."],
        ["B", "The highlight color for form controls like checkboxes and range inputs."],
        ["C", "The default link color."],
        ["D", "The outline color for :focus-visible."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-073",
      "Modern CSS Features",
      "What advantage do logical properties like margin-inline-start provide?",
      [
        ["A", "They automatically adjust for writing modes and direction."],
        ["B", "They reduce specificity compared to margin-left."],
        ["C", "They disable margins in RTL layouts."],
        ["D", "They only work for block elements."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-074",
      "Modern CSS Features",
      "When is env(safe-area-inset-top) useful?",
      [
        ["A", "To access the user's battery level."],
        ["B", "To account for display cutouts/notches when positioning fixed headers."],
        ["C", "To detect HDR capabilities."],
        ["D", "To set viewport widths on desktop browsers."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-075",
      "Modern CSS Features",
      "How would you conditionally apply styles only when grid layout is supported?",
      [
        ["A", "@supports (display: grid) { ... }"],
        ["B", "@media (grid: available) { ... }"],
        ["C", "@feature grid { ... }"],
        ["D", "@layer grid { ... }"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-076",
      "Modern CSS Features",
      "What does :focus-within select?",
      [
        ["A", "Elements whose descendants currently have focus."],
        ["B", "Only the element that has focus."],
        ["C", "Elements that previously received focus."],
        ["D", "Elements that can receive focus but are disabled."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-077",
      "Modern CSS Features",
      "What does contain: layout paint; achieve?",
      [
        ["A", "Limits layout, paint, and size calculations to the element, improving rendering performance."],
        ["B", "Disables overflow clipping."],
        ["C", "Forces the element to establish a new stacking context."],
        ["D", "Automatically creates a grid formatting context."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-078",
      "Modern CSS Features",
      "Which media query detects users requesting higher contrast interfaces?",
      [
        ["A", "@media (prefers-contrast: more)"],
        ["B", "@media (contrast: high)"],
        ["C", "@media (prefers-high-contrast: true)"],
        ["D", "@media (accessibility-contrast)"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-079",
      "Modern CSS Features",
      "What is backdrop-filter primarily used for?",
      [
        ["A", "Applying graphical effects like blur to the content behind an element."],
        ["B", "Filtering drop shadows on text."],
        ["C", "Filtering only the element's own background image."],
        ["D", "Disabling filters on child elements."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-080",
      "Modern CSS Features",
      "How does font-size-adjust benefit typography?",
      [
        ["A", "It maintains legible x-height when fallback fonts substitute."],
        ["B", "It scales fonts based on viewport width automatically."],
        ["C", "It converts font sizes to rem units."],
        ["D", "It locks font rendering to subpixel anti-aliasing."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-055",
      "Animations & Transitions",
      "What does transition-property specify?",
      [
        ["A", "The total duration of the transition."],
        ["B", "Which CSS properties will animate when they change."],
        ["C", "The number of times a transition repeats."],
        ["D", "The easing function used by keyframes."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-056",
      "Animations & Transitions",
      "What is the correct order of values in transition: color 250ms ease 50ms;?",
      [
        ["A", "Property, duration, timing-function, delay"],
        ["B", "Duration, delay, property, timing-function"],
        ["C", "Property, delay, duration, timing-function"],
        ["D", "Timing-function, delay, property, duration"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-057",
      "Animations & Transitions",
      "What does animation-fill-mode: forwards; do?",
      [
        ["A", "Keeps the final keyframe styles applied after the animation completes."],
        ["B", "Runs the animation in reverse."],
        ["C", "Resets the animation to the first keyframe when finished."],
        ["D", "Plays the animation forwards only once."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-058",
      "Animations & Transitions",
      "Which value causes an animation to play indefinitely?",
      [
        ["A", "animation-iteration-count: infinite;"],
        ["B", "animation-direction: alternate;"],
        ["C", "animation-play-state: running;"],
        ["D", "animation-delay: infinite;"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-059",
      "Animations & Transitions",
      "How do you target keyframes for an animation named pulse?",
      [
        ["A", "@keyframes pulse { ... }"],
        ["B", "@animation pulse { ... }"],
        ["C", "keyframes(pulse) { ... }"],
        ["D", "@keyframe pulse { ... }"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-060",
      "Animations & Transitions",
      "Why is transform preferred over top/left for performant animations?",
      [
        ["A", "Transform avoids layout and often leverages GPU acceleration."],
        ["B", "Transform changes do not affect stacking contexts."],
        ["C", "Top/left cannot be animated."],
        ["D", "Transform is easier to debug."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-061",
      "Animations & Transitions",
      "What is the purpose of will-change: transform;?",
      [
        ["A", "It immediately applies the transform property."],
        ["B", "It advises the browser to prepare for a transform change for smoother animation."],
        ["C", "It resets cached styles."],
        ["D", "It disables transitions on transform."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-062",
      "Animations & Transitions",
      "How can you pause a CSS animation?",
      [
        ["A", "animation-play-state: paused;"],
        ["B", "animation-direction: reverse;"],
        ["C", "animation-delay: 0;"],
        ["D", "animation-fill-mode: both;"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-063",
      "Animations & Transitions",
      "What does cubic-bezier(.4, 0, .2, 1) describe?",
      [
        ["A", "A custom easing function similar to ease-in-out."],
        ["B", "A spring physics simulation."],
        ["C", "A step-based easing curve."],
        ["D", "A linear easing function."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-064",
      "Animations & Transitions",
      "Which timing function plays an animation in discrete frames?",
      [
        ["A", "steps(5, end)"],
        ["B", "cubic-bezier(0,0,1,1)"],
        ["C", "ease-in-out"],
        ["D", "linear"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-065",
      "Animations & Transitions",
      "How can you respect @media (prefers-reduced-motion) for animations?",
      [
        ["A", "Disable all CSS transitions globally."],
        ["B", "Wrap animations in @media (prefers-reduced-motion: no-preference)."],
        ["C", "Use @media (animation-preference: reduce)."],
        ["D", "Animations automatically adapt with no code changes."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-066",
      "Animations & Transitions",
      "What does scroll-behavior: smooth; achieve?",
      [
        ["A", "It enables momentum scrolling on touch devices."],
        ["B", "It provides a smooth animated scroll for in-page navigation."],
        ["C", "It smooths out CSS keyframe animations."],
        ["D", "It only affects horizontal scrolling."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-067",
      "Animations & Transitions",
      "How do you define a scroll snapping container?",
      [
        ["A", "scroll-snap-type: y mandatory; on the container"],
        ["B", "scroll-snap-align: center; on the container"],
        ["C", "scroll-snap-margin: 0; on the container"],
        ["D", "scroll-padding: 0; on the container"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-042",
      "Typography & Graphics",
      "Which @font-face descriptor controls how a custom font swaps in while it loads?",
      [
        ["A", "font-weight"],
        ["B", "font-display"],
        ["C", "unicode-range"],
        ["D", "font-variant"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-043",
      "Typography & Graphics",
      "Why is using a unitless line-height recommended?",
      [
        ["A", "It scales with the current font-size automatically."],
        ["B", "It locks line-height at a fixed pixel value."],
        ["C", "It disables inheritance."],
        ["D", "It is required for system fonts."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-044",
      "Typography & Graphics",
      "Which combination truncates overflowing text with an ellipsis?",
      [
        ["A", "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"],
        ["B", "text-decoration: ellipsis; white-space: normal;"],
        ["C", "overflow: auto; text-overflow: clip;"],
        ["D", "text-transform: ellipsis;"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-045",
      "Typography & Graphics",
      "What does background-size: cover; do?",
      [
        ["A", "Scales the background image to fully cover the container, possibly cropping."],
        ["B", "Fits the entire image within the container without cropping."],
        ["C", "Repeats the image to fill the container."],
        ["D", "Centers the background image with no scaling."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-046",
      "Typography & Graphics",
      "In box-shadow: 0 4px 12px rgba(15,23,42,.3); what do the first three values represent?",
      [
        ["A", "Horizontal offset, vertical offset, blur radius"],
        ["B", "Horizontal offset, spread radius, blur radius"],
        ["C", "Blur radius, spread radius, opacity"],
        ["D", "Spread radius, blur radius, inset flag"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-047",
      "Typography & Graphics",
      "How does filter: blur(6px); affect an element?",
      [
        ["A", "Applies a Gaussian blur of 6px to the element and its contents."],
        ["B", "Blurs only the element's background."],
        ["C", "Blurs only child images."],
        ["D", "Blurs the element's outline but not content."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-048",
      "Typography & Graphics",
      "What is mask-image used for?",
      [
        ["A", "To clip content using an alpha mask or gradient."],
        ["B", "To apply color correction profiles."],
        ["C", "To blend multiple backgrounds."],
        ["D", "To lazy-load images."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-049",
      "Typography & Graphics",
      "What value does currentColor reference?",
      [
        ["A", "The color of the nearest ancestor element."],
        ["B", "The computed value of the element's color property."],
        ["C", "The default browser color."],
        ["D", "The last declared background color."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-050",
      "Typography & Graphics",
      "How does mix-blend-mode: multiply; affect an element?",
      [
        ["A", "It isolates the element from blending."],
        ["B", "It multiplies the element's color with the backdrop for a darker result."],
        ["C", "It inverts the element's colors."],
        ["D", "It sets the element's opacity to zero."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-051",
      "Typography & Graphics",
      "Which property controls spacing between characters?",
      [
        ["A", "word-spacing"],
        ["B", "letter-spacing"],
        ["C", "text-indent"],
        ["D", "font-kerning"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-052",
      "Typography & Graphics",
      "Which declarations create a soft drop shadow behind text?",
      [
        ["A", "text-shadow: 0 2px 6px rgba(0,0,0,.25);"],
        ["B", "box-shadow: 0 2px 6px rgba(0,0,0,.25);"],
        ["C", "filter: drop-shadow(0 2px 6px rgba(0,0,0,.25)); on text"],
        ["D", "outline: 2px solid rgba(0,0,0,.25);"],
      ],
      ["A", "C"],
      "multi"
    ),
    createQuestion(
      "CSS-053",
      "Typography & Graphics",
      "What is the effect of font-variant-ligatures: none;?",
      [
        ["A", "Disables common ligatures like fi and fl."],
        ["B", "Enables contextual ligatures."],
        ["C", "Converts text to uppercase."],
        ["D", "Replaces numerals with tabular figures."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-054",
      "Typography & Graphics",
      "When would you use font-feature-settings: \"tnum\" 1;?",
      [
        ["A", "To enable tabular numbers for consistent width digits."],
        ["B", "To enable stylistic alternates."],
        ["C", "To disable discretionary ligatures."],
        ["D", "To enable small caps."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-029",
      "Responsive Design",
      "What does the media query @media (min-width: 64rem) target?",
      [
        ["A", "Viewports wider than or equal to 64rem"],
        ["B", "Viewports narrower than 64rem"],
        ["C", "Devices with a minimum pixel density of 64dpi"],
        ["D", "Only portrait orientations"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-030",
      "Responsive Design",
      "How is 1rem calculated?",
      [
        ["A", "Relative to the font-size of the element's parent"],
        ["B", "Relative to the browser default of 16px always"],
        ["C", "Relative to the font-size of the root element (<html>)"],
        ["D", "Relative to viewport width"],
      ],
      "C"
    ),
    createQuestion(
      "CSS-031",
      "Responsive Design",
      "What does clamp(1rem, 2vw + 0.5rem, 2.5rem) do?",
      [
        ["A", "Sets a fixed size of 1rem."],
        ["B", "Returns 2vw + 0.5rem regardless of bounds."],
        ["C", "Keeps the value between 1rem and 2.5rem, preferring 2vw + 0.5rem within that range."],
        ["D", "Swaps between rem and vw units depending on device pixel ratio."],
      ],
      "C"
    ),
    createQuestion(
      "CSS-032",
      "Responsive Design",
      "Which statement about calc() is accurate?",
      [
        ["A", "It only supports addition and subtraction."],
        ["B", "It allows mixing units such as percentage and pixels."],
        ["C", "It can be used only in media queries."],
        ["D", "calc() values are computed at runtime and cannot be animated."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-033",
      "Responsive Design",
      "What does width: 50vw; set?",
      [
        ["A", "Width to half of the viewport width."],
        ["B", "Width to half of the viewport height."],
        ["C", "Width to half of the element's parent."],
        ["D", "Width to 50 pixels."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-034",
      "Responsive Design",
      "How should you honor users who prefer reduced motion?",
      [
        ["A", "Disable all animations for every user."],
        ["B", "Use @media (prefers-reduced-motion: reduce) to simplify animations."],
        ["C", "Use transform: none globally."],
        ["D", "Set animation-duration: 0 for hover effects only."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-035",
      "Responsive Design",
      "Which media query switches to a dark theme automatically?",
      [
        ["A", "@media (prefers-color-scheme: dark)"],
        ["B", "@media (max-color: 0)"],
        ["C", "@media (light-level: dim)"],
        ["D", "@media (color-index: 1)"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-036",
      "Responsive Design",
      "What does object-fit: cover; do on an <img> or <video>?",
      [
        ["A", "Stretches the media to fill its container, ignoring aspect ratio."],
        ["B", "Scales the media to cover the container while preserving aspect ratio and may crop."],
        ["C", "Fits the entire media inside without cropping, leaving letterboxing."],
        ["D", "Centers the media without scaling."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-037",
      "Responsive Design",
      "Which media query checks for device orientation?",
      [
        ["A", "@media (device-orientation: portrait)"],
        ["B", "@media (orientation: portrait)"],
        ["C", "@media (aspect-ratio: portrait)"],
        ["D", "@media (min-orientation: portrait)"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-038",
      "Responsive Design",
      "How does aspect-ratio: 16 / 9 benefit responsive layouts?",
      [
        ["A", "It forces the element to 16px by 9px."],
        ["B", "It preserves a 16:9 ratio regardless of width or height changes."],
        ["C", "It sets a maximum width of 16rem."],
        ["D", "It only affects background images."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-039",
      "Responsive Design",
      "What does image-set() allow you to do in CSS backgrounds?",
      [
        ["A", "Embed multiple video formats."],
        ["B", "Provide resolution-dependent images similar to srcset."],
        ["C", "Generate gradients dynamically."],
        ["D", "Switch images based on orientation automatically without media queries."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-040",
      "Responsive Design",
      "How do container queries differ from media queries?",
      [
        ["A", "Container queries respond to ancestor container size instead of the viewport."],
        ["B", "Container queries only support pixel units."],
        ["C", "Container queries can target device pixel ratio."],
        ["D", "They are equivalent features with different names."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-041",
      "Responsive Design",
      "Which declaration ensures images shrink to fit their container width by default?",
      [
        ["A", "img { width: 100%; height: auto; }"],
        ["B", "img { width: auto; height: 100%; }"],
        ["C", "img { object-fit: contain; }"],
        ["D", "img { max-width: none; }"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-021",
      "Layout Systems",
      "Which layout methods support the gap property in modern browsers?",
      [
        ["A", "Flexbox"],
        ["B", "CSS Grid"],
        ["C", "Float-based layouts"],
        ["D", "Multi-column layouts"],
      ],
      ["A", "B"],
      "multi"
    ),
    createQuestion(
      "CSS-022",
      "Layout Systems",
      "What does place-items: center center; do on a grid container?",
      [
        ["A", "Centers grid items both horizontally and vertically."],
        ["B", "Centers the grid container within its parent."],
        ["C", "Centers text within each grid cell."],
        ["D", "Only affects the first grid item."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-023",
      "Layout Systems",
      "How does minmax(200px, 1fr) behave in grid-template-columns?",
      [
        ["A", "Sets a fixed column width of 200px."],
        ["B", "Allows columns to shrink to 1px and grow to fill space."],
        ["C", "Keeps columns between 200px and a fraction of remaining space."],
        ["D", "Creates an auto-sized column."],
      ],
      "C"
    ),
    createQuestion(
      "CSS-024",
      "Layout Systems",
      "What is the difference between auto-fit and auto-fill when used with repeat() in CSS Grid?",
      [
        ["A", "auto-fit collapses empty tracks, auto-fill preserves them."],
        ["B", "auto-fit only works for rows."],
        ["C", "auto-fill collapses tracks, auto-fit preserves them."],
        ["D", "They are identical in behavior."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-025",
      "Layout Systems",
      "Which property creates a multi-column text layout?",
      [
        ["A", "column-count"],
        ["B", "grid-template-columns"],
        ["C", "column-gap only"],
        ["D", "text-columns"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-026",
      "Layout Systems",
      "Why might position: sticky; fail to work?",
      [
        ["A", "The element lacks a top, right, bottom, or left offset."],
        ["B", "Sticky positioning only works on inline elements."],
        ["C", "Sticky requires display: flex on the parent."],
        ["D", "Sticky is deprecated."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-027",
      "Layout Systems",
      "What does align-content control in a multi-line flex or grid container?",
      [
        ["A", "Spacing between lines on the cross axis when extra space exists."],
        ["B", "Alignment of individual items on the cross axis."],
        ["C", "The distribution of items on the main axis."],
        ["D", "The order of items within a row."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-028",
      "Layout Systems",
      "How do you name grid areas for template placement?",
      [
        ["A", "Using the grid-template-areas property."],
        ["B", "Using flex-basis names."],
        ["C", "By setting id attributes on children."],
        ["D", "With the order property."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-002",
      "Selectors & Specificity",
      "Which selector combination has the highest specificity?",
      [
        ["A", ".card .title"],
        ["B", "section h2"],
        ["C", "#promo .title"],
        ["D", "header nav a:hover"],
      ],
      "C"
    ),
    createQuestion(
      "CSS-003",
      "Selectors & Specificity",
      "What does li:nth-child(2n+1) select?",
      [
        ["A", "Only the first list item"],
        ["B", "Even-numbered list items"],
        ["C", "Odd-numbered list items"],
        ["D", "List items whose text length is odd"],
      ],
      "C"
    ),
    createQuestion(
      "CSS-004",
      "Selectors & Specificity",
      "Which attribute selector matches links whose href value begins with https://?",
      [
        ["A", "a[href$=\"https://\"]"],
        ["B", "a[href*=\"https://\"]"],
        ["C", "a[href^=\"https://\"]"],
        ["D", "a[href|=\"https://\"]"],
      ],
      "C"
    ),
    createQuestion(
      "CSS-005",
      "Selectors & Specificity",
      "Which statements about ::before pseudo-elements are true?",
      [
        ["A", "The ::before content is part of the DOM tree."],
        ["B", "::before requires the content property to display."],
        ["C", "::before can only be applied to inline elements."],
        ["D", "::before can be styled just like any element."],
      ],
      ["B", "D"],
      "multi"
    ),
    createQuestion(
      "CSS-006",
      "Selectors & Specificity",
      "What does the selector button:not([disabled]) match?",
      [
        ["A", "All button elements except those with the disabled attribute"],
        ["B", "Only disabled buttons"],
        ["C", "Buttons whose type is not submit"],
        ["D", "Buttons without text content"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-007",
      "Selectors & Specificity",
      "What does the > combinator select?",
      [
        ["A", "Descendant elements at any depth"],
        ["B", "Direct child elements only"],
        ["C", "Adjacent sibling elements"],
        ["D", "Elements that follow another anywhere in the DOM"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-008",
      "Selectors & Specificity",
      "Which rule has the greatest specificity weight?",
      [
        ["A", ".cta button.primary"],
        ["B", "#signup button"],
        ["C", "button[aria-pressed=\"true\"]"],
        ["D", "button:hover"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-009",
      "Selectors & Specificity",
      "How does :nth-of-type(n) differ from :nth-child(n)?",
      [
        ["A", ":nth-of-type counts only siblings of the same element type."],
        ["B", ":nth-of-type ignores hidden elements."],
        ["C", ":nth-child matches based on class names."],
        ["D", "There is no difference in behavior."],
      ],
      "A"
    ),
    createQuestion(
      "CSS-010",
      "Selectors & Specificity",
      "Which description of the :root selector is correct?",
      [
        ["A", "It always targets the <body> element."],
        ["B", "It targets the highest-level element in the document (typically <html>)."],
        ["C", "It matches the first element inside <main>."],
        ["D", "It is deprecated in modern CSS."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-011",
      "Selectors & Specificity",
      "How does :is(.card, .tile, #feature) affect specificity?",
      [
        ["A", "It always has zero specificity."],
        ["B", "It takes the lowest specificity of the arguments."],
        ["C", "It takes the highest specificity among the arguments."],
        ["D", "It doubles the specificity of the arguments."],
      ],
      "C"
    ),
    createQuestion(
      "CSS-012",
      "Selectors & Specificity",
      "What is unique about the :where() selector?",
      [
        ["A", "It only works in legacy browsers."],
        ["B", "It carries zero specificity regardless of its arguments."],
        ["C", "It matches only when combined with :is()."],
        ["D", "It must contain an ID selector."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-013",
      "Selectors & Specificity",
      "Which statements about the ::marker pseudo-element are correct?",
      [
        ["A", "It styles list item bullets or numbers."],
        ["B", "It can be used on any inline element."],
        ["C", "It supports properties like color and font-size."],
        ["D", "It allows background gradients on markers."],
      ],
      ["A", "C", "D"],
      "multi"
    ),
    createQuestion(
      "CSS-014",
      "Selectors & Specificity",
      "How does :focus-visible differ from :focus?",
      [
        ["A", "It triggers only for mouse interactions."],
        ["B", "It appears when the UA determines focus should be visible, e.g., keyboard navigation."],
        ["C", "It is deprecated in favor of :focus-within."],
        ["D", "It never shows focus outlines."],
      ],
      "B"
    ),
    createQuestion(
      "CSS-015",
      "Layout Systems",
      "Which layout method is best suited for creating a two-dimensional grid?",
      [
        ["A", "Flexbox"],
        ["B", "CSS Grid"],
        ["C", "Float-based layout"],
        ["D", "Multi-column layout"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-016",
      "Layout Systems",
      "What does grid-template-columns: repeat(3, 1fr) create?",
      [
        ["A", "Three columns each sized to their content width"],
        ["B", "Three columns each taking one fraction of remaining space"],
        ["C", "A single column that repeats three times vertically"],
        ["D", "Three columns with fixed 1px width"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-017",
      "Layout Systems",
      "In a flex container, what does justify-content control?",
      [
        ["A", "Alignment along the cross axis"],
        ["B", "Distribution of free space along the main axis"],
        ["C", "The stacking order of flex items"],
        ["D", "Item wrapping behavior"],
      ],
      "B"
    ),
    createQuestion(
      "CSS-018",
      "Layout Systems",
      "Which property aligns items on the cross axis inside a flex container?",
      [
        ["A", "align-items"],
        ["B", "justify-items"],
        ["C", "place-content"],
        ["D", "align-content"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-019",
      "Layout Systems",
      "How can you place an element spanning two columns and two rows on a grid?",
      [
        ["A", "grid-column: span 2; grid-row: span 2;"],
        ["B", "grid-template: span 2 / span 2;"],
        ["C", "flex: 2 2;"],
        ["D", "order: 2;"],
      ],
      "A"
    ),
    createQuestion(
      "CSS-020",
      "Layout Systems",
      "What does flex: 1 0 auto represent?",
      [
        ["A", "flex-grow:1, flex-shrink:0, flex-basis:auto"],
        ["B", "flex-grow:0, flex-shrink:1, flex-basis:auto"],
        ["C", "flex-grow:1, flex-shrink:0, flex-basis:0"],
        ["D", "flex-grow:0, flex-shrink:0, flex-basis:auto"],
      ],
      "A"
    ),
  ];

  window.MockExamQuestionBank = window.MockExamQuestionBank || {};
  window.MockExamQuestionBank.css = cssQuestions;
})();
