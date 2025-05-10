# Project To-Do List

This file tracks pending tasks for the Educational Resources Web App to ensure they are not forgotten and can be completed in the future.

## HTML Content Updates

### 1. CV PDF
- **Description**: Add or update a section to display or download a CV in PDF format.
- **Tasks**:
  - Create a dedicated section in `index.html` or a new page for the CV.
  - Add a download link or embed the PDF using `<iframe>` or `<object>`.
  - Ensure the section is styled consistently with the app (using Tailwind CSS).
- **Status**: Not started
- **Notes**: Consider adding a button with an icon (e.g., Font Awesome download icon) and ensure the PDF is stored in `assets/`.

### 2. Arabic Translation (data-ar)
- **Description**: Review and correct Arabic translations stored in `data-ar` attributes for UI elements.
- **Tasks**:
  - Audit all `data-ar` attributes in HTML files (`index.html`, `bookmarks.html`).
  - Fix any grammatical, spelling, or contextual errors in Arabic text.
  - Test the translation toggle to ensure it switches correctly between English and Arabic.
- **Status**: Not started
- **Notes**: Ensure translations are culturally appropriate and consistent with the app's tone.

### 3. RTL Design + Light Mode Styling
- **Description**: Add full Right-to-Left (RTL) support for Arabic and complete styling for Light Mode.
- **Tasks**:
  - **RTL Support**:
    - Add `dir="rtl"` to HTML elements when Arabic is selected.
    - Update CSS (in `styles.css`) to handle text alignment, flexbox, and carousel direction for RTL.
    - Test RTL layout for all components (carousel, filters, search bar).
  - **Light Mode**:
    - Finalize color scheme, backgrounds, and fonts for Light Mode.
    - Ensure contrast ratios meet accessibility standards.
    - Test Light Mode across all pages (`index.html`, `bookmarks.html`).
- **Status**: Not started
- **Notes**: Use Tailwind CSS utilities (e.g., `rtl:`, `ltr:`) for easier RTL support. Consider adding a CSS variable for Light Mode colors.

## New Section: Bookmarks (Google Chrome from Laptop)

- **Description**: Add a new section to display bookmarks exported from Google Chrome (from the laptop).
- **Tasks**:
  - Create a new section in `index.html` or a dedicated page (e.g., update `bookmarks.html`).
  - Allow importing Chrome bookmarks (likely from an exported HTML file).
  - Parse the bookmarks HTML file using JavaScript and display them as a list or grid.
  - Style the bookmarks section to match the app's design (using Tailwind CSS).
  - Add filtering or categorization options for bookmarks (e.g., by folder or tags).
- **Status**: Not started
- **Notes**:
  - Chrome exports bookmarks as an HTML file. Use `FileReader` API in JavaScript to read the file.
  - Consider security: Sanitize the HTML to prevent XSS attacks.
  - Test with a sample bookmarks file to ensure compatibility.

## Additional Notes
- Add new tasks to this file as they arise.
- Update the status of each task (e.g., "In Progress", "Completed") as work progresses.
- Refer to `README.md` for project setup and structure details.