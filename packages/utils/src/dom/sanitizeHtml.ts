/**
 * Sanitizes HTML by removing dangerous elements and attributes
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string = ""): string {
  if (typeof document === "undefined") return html;

  const template = document.createElement("template");
  template.innerHTML = html;

  // Remove <script> tags
  template.content.querySelectorAll("script").forEach((el) => el.remove());

  // Remove dangerous attributes
  template.content.querySelectorAll("*").forEach((el) => {
    [...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();

      // Remove event handlers (onclick, onerror, etc.)
      if (name.startsWith("on")) {
        el.removeAttribute(attr.name);
      }

      // Remove suspicious href or src (javascript: protocol)
      if ((name === "href" || name === "src") && value.startsWith("javascript:")) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return template.innerHTML;
}
