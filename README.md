# Chanderkant Harsh Website — GitHub Pages + FormSubmit

Static website prepared for GitHub Pages.

## Appointment form

The appointment form posts directly to FormSubmit and delivers submissions to:

`chanderkantharsh.mindhealer@gmail.com`

No Flask, PHP, SMTP credentials, Web3Forms key, or server-side backend is required.

### First FormSubmit submission

FormSubmit requires a one-time activation for a new recipient address. After the site is live, submit the appointment form once, open the activation email sent to `chanderkantharsh.mindhealer@gmail.com`, and confirm it. Submissions will then be delivered to that inbox.

## GitHub Pages

Upload the CONTENTS of this folder to the root of a GitHub repository so that `index.html` is at the repository root. Enable Pages from the `main` branch and `/ (root)`.

## Custom domain

The intended custom domain is `www.chanderkantharsh.com`. Configure it in Repository Settings > Pages, then point the GoDaddy DNS records to GitHub Pages. Do not remove MX/TXT/DKIM/SPF records used for email.

## October 2026 website update

- The **featured Events & Workshops** poster is `assets/event-poster-seven-day-workshop.jpg`.
- The former August 2026 poster remains in the Past Batch collection. The featured workshop now shows the accurate information visible on the new poster: **7 days, 1 hour each day, offline, ages 5–18**. Because the poster does not give an event date, visitors are invited to enquire for dates.
- The workshop poster is also featured in a responsive, dismissible welcome dialog. It appears after a short delay **once per browser tab session** (unless the visitor opens a deep link or has already scrolled) and can always be reopened with the **View Workshop Poster** button in Events. Escape, clicking outside, and the close button dismiss it. The dialog is keyboard-accessible and respects reduced-motion preferences.
- `assets/journey-certificate-celebration.jpg` and `assets/journey-community-gathering.jpg` are included in **Moments from the journey**.
- **No appointment form or FormSubmit settings were changed.** No email re-verification should be needed for these site updates.

To deploy: extract this ZIP and copy its contents (`index.html`, `styles.css`, `script.js`, `assets/`, etc.) into the root of your cloned Git repository, allowing files with the same names to be replaced. Existing files in `assets/` will remain present, and the new images will be added. Commit and push to the GitHub Pages deployment branch. Avoid copying the containing folder itself as a subdirectory.
