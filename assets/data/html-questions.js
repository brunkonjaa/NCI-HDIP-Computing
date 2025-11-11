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

  const htmlQuestions = [
    createQuestion(
      "HTML-001",
      "Semantic Structure",
      "Which HTML element is designed to contain the primary navigation for a document?",
      [
        ["A", "<nav>"],
        ["B", "<aside>"],
        ["C", "<header>"],
        ["D", "<menu>"],
      ],
      "A"
    ),
    createQuestion(
      "HTML-061",
      "HTML APIs",
      "How can you detect when the DOM tree has finished loading without waiting for images?",
      [
        ["A", "window.onload"],
        ["B", "document.addEventListener('DOMContentLoaded', handler)"],
        ["C", "document.readyState === 'interactive'"],
        ["D", "window.onready"],
      ],
      ["B", "C"],
      "multi"
    ),
    createQuestion(
      "HTML-062",
      "HTML APIs",
      "Which API lets you send messages between browsing contexts (e.g., windows or iframes)?",
      [
        ["A", "postMessage"],
        ["B", "BroadcastChannel"],
        ["C", "SharedWorker"],
        ["D", "Push API"],
      ],
      ["A", "B"],
      "multi"
    ),
    createQuestion(
      "HTML-063",
      "HTML APIs",
      "What does the requestAnimationFrame API provide over setInterval for animations?",
      [
        ["A", "It syncs updates with the browser's repaint cycle for smoother animations."],
        ["B", "It guarantees 120 frames per second."],
        ["C", "It runs animations even when the tab is inactive."],
        ["D", "It automatically pauses on slow devices."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-064",
      "HTML APIs",
      "Which API allows offline access to assets by intercepting network requests?",
      [
        ["A", "Service Workers"],
        ["B", "WebSockets"],
        ["C", "Fetch API"],
        ["D", "Web Animations"],
      ],
      "A"
    ),
    createQuestion(
      "HTML-065",
      "HTML APIs",
      "How can you share data between tabs from the same origin in real time?",
      [
        ["A", "Use localStorage events triggered by setItem."],
        ["B", "Use BroadcastChannel to publish messages."],
        ["C", "Use sessionStorage directly."],
        ["D", "Use navigator.share."],
      ],
      ["A", "B"],
      "multi"
    ),
    createQuestion(
      "HTML-066",
      "HTML APIs",
      "Which API enables copying text to the clipboard programmatically?",
      [
        ["A", "Navigator.clipboard.writeText"],
        ["B", "document.execCommand('copy')"],
        ["C", "window.clipboardData.setData"],
        ["D", "ClipboardItem interface"],
      ],
      ["A", "D"],
      "multi"
    ),
    createQuestion(
      "HTML-067",
      "Performance & SEO",
      "Which meta tag is essential for controlling responsive layouts on mobile devices?",
      [
        ["A", "<meta charset=\"utf-8\">"],
        ["B", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"],
        ["C", "<meta name=\"description\" content=\"...\">"],
        ["D", "<meta http-equiv=\"refresh\" content=\"30\">"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-068",
      "Performance & SEO",
      "What is the purpose of the rel=\"preload\" attribute on <link> elements?",
      [
        ["A", "To defer loading of non-critical resources."],
        ["B", "To initiate early loading of critical resources before they are needed."],
        ["C", "To lazy load images on scroll."],
        ["D", "To block rendering until the resource is fetched."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-069",
      "Performance & SEO",
      "Which techniques help reduce layout shifts (CLS) for images?",
      [
        ["A", "Specify width and height attributes."],
        ["B", "Use CSS aspect-ratio."],
        ["C", "Set loading=\"lazy\" on all images."],
        ["D", "Use <picture> for responsive art direction."],
      ],
      ["A", "B", "D"],
      "multi"
    ),
    createQuestion(
      "HTML-070",
      "Performance & SEO",
      "What benefit does rel=\"preconnect\" provide?",
      [
        ["A", "It allows browsers to establish early connections to external origins."],
        ["B", "It fetches the resource immediately."],
        ["C", "It reduces DNS lookup time only for first-party domains."],
        ["D", "It defers script execution."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-071",
      "Performance & SEO",
      "Which HTML elements improve semantic SEO when used appropriately?",
      [
        ["A", "<header>, <main>, <footer>"],
        ["B", "<b>, <i>, <u>"],
        ["C", "<article>, <section>, <aside>"],
        ["D", "<font>, <center>"],
      ],
      ["A", "C"],
      "multi"
    ),
    createQuestion(
      "HTML-072",
      "Performance & SEO",
      "How can you hint search engines about the canonical URL for duplicate or similar pages?",
      [
        ["A", "Use <link rel=\"canonical\" href=\"https://example.com/page\">"],
        ["B", "Use <meta name=\"canonical\" content=\"...\">"],
        ["C", "Use the title element."],
        ["D", "Use <base href>"],
      ],
      "A"
    ),
    createQuestion(
      "HTML-073",
      "Performance & SEO",
      "Which attribute defers execution of non-critical JavaScript until after HTML parsing?",
      [
        ["A", "async"],
        ["B", "defer"],
        ["C", "type=\"module\""],
        ["D", "nomodule"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-074",
      "Performance & SEO",
      "What is the effect of the async attribute on external scripts?",
      [
        ["A", "Scripts are executed immediately after downloading, potentially before HTML parsing completes."],
        ["B", "Scripts wait until the DOM is fully parsed."],
        ["C", "Scripts run only after window load."],
        ["D", "Scripts execute synchronously in order."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-075",
      "Performance & SEO",
      "Which element helps describe structured data to search engines using microdata?",
      [
        ["A", "itemscope and itemprop attributes on HTML elements"],
        ["B", "aria-* attributes"],
        ["C", "style attributes"],
        ["D", "data-* attributes without schema.org vocabularies"],
      ],
      "A"
    ),
    createQuestion(
      "HTML-076",
      "Performance & SEO",
      "How can you flag language changes within a portion of text for search engines and assistive tools?",
      [
        ["A", "Wrap the text in <span lang=\"fr\">…</span>"],
        ["B", "Use a CSS class indicating language."],
        ["C", "Use aria-language attribute."],
        ["D", "No action is needed; browsers auto-detect language."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-077",
      "Performance & SEO",
      "Which technique reduces render-blocking CSS without sacrificing performance?",
      [
        ["A", "Inlining critical CSS in the <head> and deferring the rest."],
        ["B", "Using @import inside CSS files."],
        ["C", "Loading all CSS synchronously."],
        ["D", "Removing media queries."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-078",
      "Performance & SEO",
      "What is a benefit of using semantic HTML for SEO?",
      [
        ["A", "Search engines better understand page structure and content meaning."],
        ["B", "Pages automatically rank higher with no additional work."],
        ["C", "It reduces the need for backlinks."],
        ["D", "It disables JavaScript to improve performance."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-079",
      "Performance & SEO",
      "Which element can be used to define navigation breadcrumbs for enhanced SEO and accessibility?",
      [
        ["A", "<nav aria-label=\"Breadcrumb\">"],
        ["B", "<aside role=\"navigation\">"],
        ["C", "<header role=\"banner\">"],
        ["D", "<footer role=\"contentinfo\">"],
      ],
      "A"
    ),
    createQuestion(
      "HTML-080",
      "Performance & SEO",
      "How can you provide search engines with structured metadata that is easy to maintain?",
      [
        ["A", "Embed JSON-LD inside a <script type=\"application/ld+json\">."],
        ["B", "Use comments in HTML to describe content."],
        ["C", "Use inline JavaScript alert statements."],
        ["D", "Rely solely on title tags."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-041",
      "Forms & Validation",
      "What is the effect of the formnovalidate attribute on a submit button?",
      [
        ["A", "It disables JavaScript handlers on submit."],
        ["B", "It allows submitting the form without running built-in validation."],
        ["C", "It clears all form fields before submission."],
        ["D", "It submits the form via AJAX automatically."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-042",
      "Media & Graphics",
      "How do you provide fallback text for browsers that do not support the <canvas> element?",
      [
        ["A", "Use the alt attribute on <canvas>."],
        ["B", "Place fallback content between the opening and closing <canvas> tags."],
        ["C", "Use aria-label on the <canvas>."],
        ["D", "Canvas does not support fallback content."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-043",
      "Media & Graphics",
      "Which element allows you to provide multiple image sources for responsive images?",
      [
        ["A", "<source> inside <picture>"],
        ["B", "<img srcset>"],
        ["C", "<figure>"],
        ["D", "<svg>"],
      ],
      ["A", "B"],
      "multi"
    ),
    createQuestion(
      "HTML-044",
      "Media & Graphics",
      "What does the controls attribute do on <audio> elements?",
      [
        ["A", "It autoplays the audio file."],
        ["B", "It displays built-in playback controls to the user."],
        ["C", "It loops the audio continuously."],
        ["D", "It hides the audio player."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-045",
      "Media & Graphics",
      "Which attributes help with lazy loading of images in modern browsers?",
      [
        ["A", "loading=\"lazy\""],
        ["B", "decoding=\"async\""],
        ["C", "fetchpriority=\"high\""],
        ["D", "defer"],
      ],
      ["A", "B"],
      "multi"
    ),
    createQuestion(
      "HTML-046",
      "Media & Graphics",
      "What is the purpose of the <track> element inside <video>?",
      [
        ["A", "To provide chapter markers only."],
        ["B", "To supply timed text such as captions or subtitles."],
        ["C", "To load multiple video sources."],
        ["D", "To display transcripts below the video automatically."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-047",
      "Media & Graphics",
      "Which elements are recommended for embedding vector graphics with accessibility support?",
      [
        ["A", "<canvas>"],
        ["B", "<svg>"],
        ["C", "<embed>"],
        ["D", "<object> with type=\"image/svg+xml\""],
      ],
      ["B", "D"],
      "multi"
    ),
    createQuestion(
      "HTML-048",
      "Media & Graphics",
      "How can you offer high-resolution images to devices with high pixel density?",
      [
        ["A", "Use multiple <img> tags for each resolution."],
        ["B", "Use the srcset attribute with density descriptors like 1x and 2x."],
        ["C", "Use <picture> with media queries."],
        ["D", "Increase the width and height attributes manually."],
      ],
      ["B", "C"],
      "multi"
    ),
    createQuestion(
      "HTML-049",
      "Media & Graphics",
      "Which attribute enables looping playback for audio or video elements?",
      [
        ["A", "loop"],
        ["B", "replay"],
        ["C", "repeat"],
        ["D", "cycling"],
      ],
      "A"
    ),
    createQuestion(
      "HTML-050",
      "Media & Graphics",
      "What is the advantage of using <figure> with <figcaption> for media content?",
      [
        ["A", "It provides a semantic caption tied directly to the media."],
        ["B", "It improves SEO without additional work."],
        ["C", "It automatically scales the image."],
        ["D", "It removes the need for alt text."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-051",
      "Media & Graphics",
      "Which attribute on <img> helps reserve space to prevent layout shifts?",
      [
        ["A", "title"],
        ["B", "width and height set to intrinsic dimensions"],
        ["C", "src"],
        ["D", "crossorigin"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-052",
      "Media & Graphics",
      "How can you embed external video content while maintaining accessibility?",
      [
        ["A", "Use <iframe> with a title attribute describing the video."],
        ["B", "Use <embed> without attributes."],
        ["C", "Use <object> with no fallback."],
        ["D", "Use <video> with autoplay and no controls."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-053",
      "Media & Graphics",
      "Which attribute ensures a video starts playing automatically only when audio is muted to respect autoplay policies?",
      [
        ["A", "autoplay"],
        ["B", "muted"],
        ["C", "autoplay and muted together"],
        ["D", "controls"],
      ],
      "C"
    ),
    createQuestion(
      "HTML-054",
      "Media & Graphics",
      "What is the best practice for providing fallbacks for unsupported <video> formats?",
      [
        ["A", "Provide multiple <source> elements with different codecs."],
        ["B", "Use only MP4 because it is universally supported."],
        ["C", "Rely on the browser to transcode the video."],
        ["D", "Use <canvas> to emulate video playback."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-055",
      "HTML APIs",
      "Which API allows you to store key-value pairs that persist across sessions on the same origin?",
      [
        ["A", "sessionStorage"],
        ["B", "localStorage"],
        ["C", "IndexedDB"],
        ["D", "Cache Storage"],
      ],
      ["B", "C"],
      "multi"
    ),
    createQuestion(
      "HTML-056",
      "HTML APIs",
      "What is the main difference between sessionStorage and localStorage?",
      [
        ["A", "sessionStorage data expires when the tab closes, localStorage persists."],
        ["B", "localStorage can only store numbers."],
        ["C", "sessionStorage is accessible across domains."],
        ["D", "localStorage is limited to 1 KB."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-057",
      "HTML APIs",
      "Which API enables drag-and-drop interactions natively in HTML5?",
      [
        ["A", "Notification API"],
        ["B", "Drag and Drop API"],
        ["C", "WebRTC"],
        ["D", "Pointer Lock API"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-058",
      "HTML APIs",
      "How do you request the user's current geographic position in HTML5?",
      [
        ["A", "navigator.mediaDevices.getUserMedia"],
        ["B", "navigator.geolocation.getCurrentPosition"],
        ["C", "navigator.clipboard.readText"],
        ["D", "navigator.credentials.get"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-059",
      "HTML APIs",
      "Which permissions are required for using the Geolocation API in secure contexts?",
      [
        ["A", "User consent via the browser prompt"],
        ["B", "A token in localStorage"],
        ["C", "Running on HTTPS (or localhost)"],
        ["D", "A manifest entry"],
      ],
      ["A", "C"],
      "multi"
    ),
    createQuestion(
      "HTML-060",
      "HTML APIs",
      "Which API would you use to store large structured data asynchronously in the browser?",
      [
        ["A", "localStorage"],
        ["B", "IndexedDB"],
        ["C", "sessionStorage"],
        ["D", "BroadcastChannel"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-021",
      "Accessibility",
      "Which attributes help establish relationships for assistive technologies?",
      [
        ["A", "aria-labelledby"],
        ["B", "aria-controls"],
        ["C", "aria-hidden"],
        ["D", "aria-live"],
      ],
      ["A", "B"],
      "multi"
    ),
    createQuestion(
      "HTML-022",
      "Accessibility",
      "Why is a logical heading structure important for accessibility?",
      [
        ["A", "Screen readers use headings to provide an outline for navigation."],
        ["B", "It improves CSS specificity."],
        ["C", "It automatically assigns keyboard shortcuts."],
        ["D", "It is required for HTML validation."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-023",
      "Accessibility",
      "Which element is appropriate for accessible breadcrumbs when combined with proper semantics?",
      [
        ["A", "<menu>"],
        ["B", "<nav aria-label=\"Breadcrumb\">"],
        ["C", "<aside>"],
        ["D", "<footer>"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-024",
      "Accessibility",
      "What does the aria-live attribute control?",
      [
        ["A", "Whether an element is focusable"],
        ["B", "How updates to content are announced by screen readers"],
        ["C", "The accessible name of an element"],
        ["D", "The reading order of siblings"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-025",
      "Accessibility",
      "Which approach ensures accessible error messaging for form inputs?",
      [
        ["A", "Display errors visually only."],
        ["B", "Use aria-live regions to announce validation errors."],
        ["C", "Add aria-invalid=\"true\" to the input with an associated message."],
        ["D", "Disable the submit button indefinitely."],
      ],
      ["B", "C"],
      "multi"
    ),
    createQuestion(
      "HTML-026",
      "Accessibility",
      "What is the purpose of the lang attribute on the <html> element?",
      [
        ["A", "It changes the default font family."],
        ["B", "It informs assistive technologies of the primary language for pronunciation."],
        ["C", "It enables browser translation automatically."],
        ["D", "It validates spelling in text inputs."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-027",
      "Accessibility",
      "How can you create an accessible disclosure pattern (accordion)?",
      [
        ["A", "Use <details> and <summary> for built-in accessibility."],
        ["B", "Toggle visibility with <div> elements only."],
        ["C", "Wrap headings in <a> tags without ARIA."],
        ["D", "Use CSS :hover to show content."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-028",
      "Forms & Validation",
      "Which input type provides a built-in calendar picker in supporting browsers?",
      [
        ["A", "text"],
        ["B", "date"],
        ["C", "datetime-local"],
        ["D", "month"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-029",
      "Forms & Validation",
      "What is the primary function of the required attribute on form controls?",
      [
        ["A", "It applies a default value."],
        ["B", "It indicates the field must be filled out before submission."],
        ["C", "It sets focus to the field when the form loads."],
        ["D", "It triggers server-side validation automatically."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-030",
      "Forms & Validation",
      "Which attributes enable native client-side validation?",
      [
        ["A", "pattern"],
        ["B", "min and max"],
        ["C", "novalidate"],
        ["D", "step"],
      ],
      ["A", "B", "D"],
      "multi"
    ),
    createQuestion(
      "HTML-031",
      "Forms & Validation",
      "How can you group related form controls with an accessible label?",
      [
        ["A", "Wrap them in a <fieldset> with a <legend>."],
        ["B", "Use a <div> with a heading."],
        ["C", "Place them in a <section>."],
        ["D", "Use aria-role=\"group\" on a <span>."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-032",
      "Forms & Validation",
      "Which attributes control the number of characters allowed in a text input?",
      [
        ["A", "maxlength"],
        ["B", "minlength"],
        ["C", "pattern"],
        ["D", "size"],
      ],
      ["A", "B"],
      "multi"
    ),
    createQuestion(
      "HTML-033",
      "Forms & Validation",
      "What is the effect of adding novalidate to a <form> element?",
      [
        ["A", "It disables built-in browser validation for that form."],
        ["B", "It clears form values on submit."],
        ["C", "It prevents the form from being submitted."],
        ["D", "It clears custom validation messages."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-034",
      "Forms & Validation",
      "Which input type is best for capturing an email address with basic format validation?",
      [
        ["A", "text"],
        ["B", "email"],
        ["C", "url"],
        ["D", "search"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-035",
      "Forms & Validation",
      "How can you associate helper text with an input for accessibility?",
      [
        ["A", "Use aria-describedby on the input referencing the helper text element id."],
        ["B", "Place the text immediately after the input."],
        ["C", "Add title attributes to the input."],
        ["D", "Use placeholder text to show instructions."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-036",
      "Forms & Validation",
      "Which combination allows you to provide custom validation feedback after checking validity in JavaScript?",
      [
        ["A", "setCustomValidity and reportValidity"],
        ["B", "minLength and step"],
        ["C", "valueMissing and defaultValue"],
        ["D", "patternMismatch and innerHTML"],
      ],
      "A"
    ),
    createQuestion(
      "HTML-037",
      "Forms & Validation",
      "What is the default method value for a <form> submission if not specified?",
      [
        ["A", "POST"],
        ["B", "GET"],
        ["C", "PUT"],
        ["D", "PATCH"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-038",
      "Forms & Validation",
      "How do you natively provide multiple selectable options where users can choose more than one?",
      [
        ["A", "<select multiple>"],
        ["B", "Checkbox inputs with the same name"],
        ["C", "Radio inputs with the same name"],
        ["D", "A <datalist> element"],
      ],
      ["A", "B"],
      "multi"
    ),
    createQuestion(
      "HTML-039",
      "Forms & Validation",
      "Which element allows users to provide free-form text with line breaks?",
      [
        ["A", "<input type=\"text\">"],
        ["B", "<textarea>"],
        ["C", "<output>"],
        ["D", "<input type=\"search\">"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-040",
      "Forms & Validation",
      "What is the purpose of the form attribute on form controls?",
      [
        ["A", "It styles the form control."],
        ["B", "It associates the control with a form element elsewhere in the document."],
        ["C", "It disables validation on the control."],
        ["D", "It resets the control after submission."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-002",
      "Semantic Structure",
      "You need to group together a section of related content with its own heading inside the main page. Which element is most appropriate?",
      [
        ["A", "<div>"],
        ["B", "<section>"],
        ["C", "<article>"],
        ["D", "<main>"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-003",
      "Semantic Structure",
      "Which statements about the <main> element are accurate?",
      [
        ["A", "It should appear exactly once per page."],
        ["B", "It can be nested inside an <article> element."],
        ["C", "It must not contain repeated sitewide content such as headers or footers."],
        ["D", "It replaces the <body> element in HTML5."],
      ],
      ["A", "C"],
      "multi"
    ),
    createQuestion(
      "HTML-004",
      "Semantic Structure",
      "Which element is intended to hold contact information for the author or owner of a document or article?",
      [
        ["A", "<footer>"],
        ["B", "<address>"],
        ["C", "<small>"],
        ["D", "<cite>"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-005",
      "Semantic Structure",
      "How do <figure> and <figcaption> work together semantically?",
      [
        ["A", "<figcaption> must always precede <figure> in the DOM."],
        ["B", "<figcaption> provides a caption or legend for the content inside <figure>."],
        ["C", "<figure> must only be used for images."],
        ["D", "<figure> can represent self-contained content that is referenced in the main flow."],
      ],
      ["B", "D"],
      "multi"
    ),
    createQuestion(
      "HTML-006",
      "Semantic Structure",
      "Which scenario best matches the semantic meaning of the <article> element?",
      [
        ["A", "A list of navigation links displayed in the sidebar."],
        ["B", "A self-contained blog post that could be syndicated independently."],
        ["C", "The main container for all site content."],
        ["D", "A small note that appears next to a paragraph."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-007",
      "Semantic Structure",
      "When should you use the <aside> element?",
      [
        ["A", "For tangential content such as pull quotes or related links."],
        ["B", "To wrap the primary navigation menu."],
        ["C", "As a generic container for styling hooks."],
        ["D", "To mark up the footer of the page."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-008",
      "Semantic Structure",
      "Which statements accurately describe the <header> element?",
      [
        ["A", "There can only be one <header> per document."],
        ["B", "It may contain introductory content such as a logo, heading, or navigation."],
        ["C", "It is automatically announced as a landmark region by assistive technology."],
        ["D", "It can be placed inside sections like <article> or <section>."],
      ],
      ["B", "D"],
      "multi"
    ),
    createQuestion(
      "HTML-009",
      "Semantic Structure",
      "Which is the correct way to mark up a machine-readable date of 7 April 2025 for an event?",
      [
        ["A", "<time>7 April 2025</time>"],
        ["B", "<time datetime=\"07/04/2025\">7 April 2025</time>"],
        ["C", "<time datetime=\"2025-04-07\">7 April 2025</time>"],
        ["D", "<time datetime=\"04-07-2025\">7 April 2025</time>"],
      ],
      "C"
    ),
    createQuestion(
      "HTML-010",
      "Semantic Structure",
      "Which markup best describes a glossary of terms and their definitions?",
      [
        ["A", "<ol> with nested <li> elements"],
        ["B", "<ul> with nested <li> elements"],
        ["C", "<dl> containing <dt> and <dd> pairs"],
        ["D", "<table> with two columns"],
      ],
      "C"
    ),
    createQuestion(
      "HTML-011",
      "Semantic Structure",
      "What is the recommended practice for heading levels in HTML?",
      [
        ["A", "Use heading levels based solely on visual size."],
        ["B", "Avoid skipping heading levels to maintain a logical outline."],
        ["C", "Always reset to <h1> for each new section."],
        ["D", "Use headings only for styling, not structure."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-012",
      "Semantic Structure",
      "Which use case is most appropriate for the <mark> element?",
      [
        ["A", "Highlighting search terms the user just searched for."],
        ["B", "Emphasizing important words within a paragraph for SEO."],
        ["C", "Marking content inserted by a script."],
        ["D", "Adding a background color to text for stylistic purposes only."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-013",
      "Semantic Structure",
      "Which element is best suited to represent machine-readable data that also needs human-friendly text?",
      [
        ["A", "<data>"],
        ["B", "<var>"],
        ["C", "<code>"],
        ["D", "<output>"],
      ],
      "A"
    ),
    createQuestion(
      "HTML-014",
      "Semantic Structure",
      "How do <strong> and <b> differ?",
      [
        ["A", "<strong> indicates importance, while <b> is purely presentational."],
        ["B", "<strong> displays text in italics by default."],
        ["C", "<b> is deprecated in HTML5."],
        ["D", "There is no difference in semantics between the two."],
      ],
      "A"
    ),
    createQuestion(
      "HTML-015",
      "Accessibility",
      "What is the primary purpose of the aria-label attribute?",
      [
        ["A", "To associate a text label with a form control"],
        ["B", "To provide a programmatic label for an element without visible text"],
        ["C", "To describe the role of an element"],
        ["D", "To define keyboard shortcuts"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-016",
      "Accessibility",
      "Which practices improve keyboard accessibility?",
      [
        ["A", "Ensuring all interactive elements are reachable using the Tab key."],
        ["B", "Removing focus outlines for aesthetic reasons."],
        ["C", "Providing a visible focus indicator on interactive elements."],
        ["D", "Relying solely on mouse-specific events for interactions."],
      ],
      ["A", "C"],
      "multi"
    ),
    createQuestion(
      "HTML-017",
      "Accessibility",
      "What is the best way to associate a text label with an input field?",
      [
        ["A", "Place the text immediately before the input without any markup."],
        ["B", "Use a <label> element with the for attribute matching the input id."],
        ["C", "Use aria-describedby to point to a paragraph with the label text."],
        ["D", "Wrap the input inside a <span> with the label text."],
      ],
      "B"
    ),
    createQuestion(
      "HTML-018",
      "Accessibility",
      "When providing alternative text for images, what should you consider?",
      [
        ["A", "Describe decorative images in detail."],
        ["B", "Use empty alt attributes for purely decorative images."],
        ["C", "Repeat surrounding text to ensure redundancy."],
        ["D", "Describe the meaning or function of the image."],
      ],
      ["B", "D"],
      "multi"
    ),
    createQuestion(
      "HTML-019",
      "Accessibility",
      "Which element should be used to skip directly to the main content for screen-reader and keyboard users?",
      [
        ["A", "A <div> with role=\"skip\""],
        ["B", "An anchor link with href=\"#main-content\" placed at the top of the page"],
        ["C", "A <span> with tabindex=\"0\""],
        ["D", "An <aside> containing navigation links"],
      ],
      "B"
    ),
    createQuestion(
      "HTML-020",
      "Accessibility",
      "How can you provide a concise description of complex charts or images?",
      [
        ["A", "Use aria-hidden to hide the image completely."],
        ["B", "Provide a short alt attribute and link to a longer description using <figure> and <figcaption>."],
        ["C", "Include the description in the title attribute only."],
        ["D", "Rely on the file name to describe the image."],
      ],
      "B"
    ),
  ];

  window.MockExamQuestionBank = window.MockExamQuestionBank || {};
  window.MockExamQuestionBank.html = htmlQuestions;
})();
