# Maintenance notes

Everything I need to remember six months from now, when I have forgotten how my own site works: where things are configured, how to deploy, how to add a certificate, and what to check when something looks off. For the short overview, see the [README](../README.md).

## Quick answers

| I want to... | Go to |
| --- | --- |
| Change my email, links, projects or colours | [Configuration](#configuration) |
| Make sure the contact form really delivers | [Setting up the contact form](#setting-up-the-contact-form) |
| Put a change on the live site | [Deployment](#deployment) |
| Add, remove or reorder a certificate | [Images and certificates](#images-and-certificates) |
| Keep Google Search Console happy | [Google Search Console and Tag Manager](#google-search-console-and-tag-manager) |
| Work out why something looks broken | [Troubleshooting](#troubleshooting) |
| Learn how to get found in search | [Search visibility guide](SEO-GUIDE.md) |

## Configuration

The project does **not** use environment variables, so there is no `.env` file or `.env.example`. There are also no API keys or secrets in the code. Everything you might want to change is written directly in the files:

| What | Where |
| --- | --- |
| Email that receives contact form messages | In `index.html`, search for `guptask0722@gmail.com`. It appears in the form script, the email links and the structured data. Also update it in `llms.txt`. |
| Website address | The address `https://sandesh-gupta-portfolio.vercel.app` is used in `index.html` (canonical link, social tags, structured data), `robots.txt`, `sitemap.xml` and `llms.txt`. If you use a different domain, replace it in all four files. |
| Resume link | The "View Resume" button in the About section of `index.html`, and `llms.txt`. |
| Projects | The four cards inside the `#projects` section of `index.html`. The structured data near the top of the file also describes all four. |
| Colours | The CSS variables at the top of the `<style>` block. `:root` is Light Mode and `[data-theme=dark]` is Dark Mode. |
| Education and places | The meta `keywords` tag and the structured data (`address`, `alumniOf`, `hasCredential`), both in `index.html`. They are not shown on the page itself. Also `llms.txt`. |
| Google Tag Manager | The container ID `GTM-PTB8B7DP` appears twice in `index.html` (the script in `<head>` and the `<noscript>` after `<body>`). Remove both to turn it off. |
| Default theme | Light Mode is the default. The code is at the top of `<head>` (a tiny script that sets `data-theme`). |

### Setting up the contact form

When someone presses **Send Message**, the site first tries to send the message straight to my inbox through FormSubmit, which needs no account. If it works, the visitor sees a success message.

If it does not work (FormSubmit is down, the visitor is offline, or the form was never activated), the form does not just fail. It opens the visitor's email app with a new email already written to me: my address, the subject and their message. They only need to press Send. The error text also shows an "Open your email app" link in case the browser blocks the automatic opening, and the text they typed stays in the form.

**One-time step for me:** the first time the form is used, FormSubmit emails me a confirmation link. Click it once, otherwise automatic sending will not work (the email app backup still works). Check the spam folder if it does not show up.

Messages are limited to 1500 characters, because very long text does not fit well in an email link. Also keep in mind that my email address is visible in the page source, like on any static site.

## Deployment

I host the site on Vercel. It is a static site, so there is no build step.

1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Go to https://vercel.com, log in with GitHub and choose **Add New > Project**.
3. Import the repository.
4. Set **Framework Preset** to **Other**. Leave the build command and output directory empty.
5. Click **Deploy**. Every later `git push` to `main` redeploys the site automatically.

`vercel.json` already contains the settings the site needs: a few security headers and caching rules (the HTML is always re-checked, while files in `assets/` are cached for a year). Clean URLs are turned off on purpose, so Vercel serves Google's verification file directly without redirecting it. Vercel also shows `404.html` automatically when someone opens an address that does not exist.

Because of that long cache, **if you replace an image, give the new file a new name** (for example `profile-v2.webp`) and update the reference. Otherwise returning visitors may keep seeing the old image.

Other static hosts (Netlify, Cloudflare Pages) should also work, but `vercel.json` only applies to Vercel.

## Images and certificates

- **Format:** all images are `.webp` to keep them small, except `og-image.jpg` (social networks prefer JPG or PNG) and the icons.
- **Certificate files** are named `1c.webp`, `2c.webp` and so on. The number matches the position of the certificate in the `C` list inside the script near the bottom of `index.html`. The first and second images are the same Google certificate (the certificate page and the Credly badge).
- **To add a certificate:**
  1. Save the image as `assets/images/certifications/19c.webp` (the next number).
  2. Add a short title for it at the end of the `C` list. The title is used as the image description for screen readers.
  3. If it is a professional certificate, you can also add its name to the certification tags in the About section.
  4. Optional: the grid cards crop each image to a 4:3 box and show the upper-middle part by default. If the important part (the title or your name) gets cut off, add an entry to the `FOCUS` list in the same script. For example, `{5:'50% 12%'}` means "for certificate number 6 (counting from 0), show the part 12% from the top". The viewer is not affected, because it always shows the full image.
- **To remove or reorder a certificate,** rename the files so the numbers stay in order and update the `C` list to match.
- **Is it safe from downloading?** The viewer shows the certificate as a background image (not a normal `<img>`), and the gallery and viewer block right-click and dragging. `Ctrl+S` is blocked while the viewer is open, and certificates are hidden when printing. My two profile photos get similar protection: an invisible layer sits on top of the photo (so right-click does not offer "Save image"), dragging and the long-press menu on phones are turned off, and the photos are hidden when printing. I kept the photos as normal `<img>` tags on purpose, so they still have alt text and load quickly for search engines and screen readers. All of this only stops casual saving. Anyone who really wants a copy can still take a screenshot or find the file in the browser's developer tools, because the browser has to download an image to show it. The image files are also public by design, since search engines and link previews need them.

## Google Search Console and Tag Manager

I added these so Google can confirm that I own the site, and so I can add analytics later if I want:

- **Search Console, HTML file:** `google4df08e21eeb8b18c.html` in the project root. Do not delete it, or the site can lose its verification.
- **Search Console, meta tag:** the `google-site-verification` tag near the top of `<head>` in `index.html`. Do not remove it either.
- **Google Tag Manager:** container `GTM-PTB8B7DP`. The script is at the top of `<head>` and the `<noscript>` part is right after `<body>`. By itself it tracks nothing. What it does depends on the tags I set up inside Tag Manager.
- **DNS TXT record method:** not used. It only works with a domain I own, and I use the free `vercel.app` address where I cannot edit DNS. If I buy a domain later, I can use it.

Tag Manager is a third-party script, so it can slow the page a little and, depending on the tags inside it, it can set cookies. If I add analytics, I should add a short privacy note (and a consent banner if visitors from the EU matter).

After verifying, submit `sitemap.xml` in Search Console, and use **URL Inspection > Request indexing** on the home page.

## Troubleshooting

Most problems have boring causes. Check these before assuming the site is haunted.

**Images or certificates do not show.**
Keep the folder structure exactly as it is, and run the site through a local server (see the README). On Vercel, file names are case sensitive, so `1c.webp` and `1C.webp` are different files.

**The certificate section is empty.**
Open the browser console (F12). The gallery is built with JavaScript, so an error in the script stops it. Also check that `assets/images/certifications/` exists.

**The contact form says it could not send automatically.**
That is the backup working: use the "Open your email app" link and the message will be ready to send. To fix automatic sending, check your internet connection and make sure I clicked the FormSubmit activation link (see "Setting up the contact form").

**Search Console says verification failed.**
Open `https://sandesh-gupta-portfolio.vercel.app/google4df08e21eeb8b18c.html` in a browser. It must show the verification text straight away (no redirect). Also check that the `google-site-verification` meta tag is still in `index.html`, and that the latest version is deployed.

**I switched to Dark Mode, but it is Light again the next day.**
That is on purpose. The site always starts in Light Mode and only remembers your choice for the current tab.

**I deployed a change but still see the old site.**
Do a hard refresh (`Ctrl+Shift+R`). If you replaced an image with the same file name, rename it, because images are cached for a year.

**The social preview (WhatsApp, LinkedIn, X) shows an old image.**
Those platforms cache previews. Use their debugging tools, such as the LinkedIn Post Inspector or the Facebook Sharing Debugger, to refresh it.

**The social icons do not change colour on hover.**
This is only on screens wider than 860px and devices with a mouse. On phones the icons stay in the theme colours.

## Known limitations

- The contact form depends on a third-party service (FormSubmit). If it is unavailable, the visitor's own email app is used as a backup.
- Google Tag Manager is also a third-party script (see the section above).
- The page loads three fonts from Google Fonts. If they cannot load, the browser falls back to system fonts.
- There is no automated test suite. I tested by running the site in different screen sizes and checking each feature by hand and with scripts while building it.

If you find something that is not on this list, it is either a bug or a feature I have not documented yet. Open an issue and we will decide which.

Back to the [README](../README.md).
