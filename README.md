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
