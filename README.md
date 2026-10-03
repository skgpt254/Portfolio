# Sandesh Kumar Gupta | Portfolio

My personal portfolio website. It shows my projects, skills, certificates and how to contact me.

**Live site:** https://sandesh-gupta-portfolio.vercel.app

## About this project

I'm a B.Tech CSE student at GLA University in Mathura, and I'm mostly interested in cybersecurity (eBPF, Linux kernel security, VAPT, CTFs). I made this site so people can see my work in one place instead of reading a plain resume.

My first version was built with Angular. It worked, but Angular renders the page with JavaScript, and many search engines and AI crawlers don't run JavaScript, so they could not read my content properly. I rebuilt it as plain HTML, CSS and JavaScript so everything important is already in the page. It is also much simpler to run: no framework, no build step, no dependencies.

## What is on the site

It is a single page with these sections:

- **Home:** my name, a short intro, and my main results.
- **Projects:** eRDS, PacketDive, and this portfolio, each with a short description and a GitHub link.
- **Skills:** the areas I work in and the tools I use.
- **About:** a short bio, highlights, a link to my resume, my certifications and a certificate gallery.
- **Contact:** a form that sends a message to my email.

## Features

- **Light and Dark Mode.** The site always opens in Light Mode. The switch in the top bar changes to Dark Mode. The choice is remembered only for the current browser tab, so a new visit starts in Light Mode again.
- **Social links sidebar** on the left (Email, LinkedIn, GitHub, LeetCode, TryHackMe, Hack The Box). On large screens each icon turns to its brand colour on hover. On phones the same links appear in the footer in the normal theme colours.
- **Responsive layout** with a hamburger menu on small screens. The menu closes when you tap a link, tap outside, press Escape, scroll, or resize the window.
- **Certificate gallery and viewer.** The gallery shows six certificates at a time with a "Show more" button. Every card has the same size and shows a cropped preview, so the grid stays tidy. Clicking a card opens a viewer that always shows the **whole** certificate at its real proportions, where you can:
  - go to the next or previous certificate with the arrow buttons, the left/right arrow keys, or by swiping on a touch screen
  - zoom with the + and - buttons, the mouse wheel, pinching, or by double-tapping / double-clicking
  - drag to move around when zoomed in
  - press `0` to reset the zoom and `Esc` to close
- **Scroll animations** that fade content in as you scroll. If your device is set to "reduce motion", the animations are turned off.
- **Contact form** that sends the message to my email using [FormSubmit](https://formsubmit.co). It checks the fields, shows a success or error message, and has a hidden field to catch simple spam bots.
- **Search and AI friendly:** meta tags, social preview image, structured data, `sitemap.xml`, `robots.txt` and `llms.txt` (more in the SEO section below).

## Built with

- HTML, CSS and vanilla JavaScript (everything is in `index.html`)
- Google Fonts: Inter, Space Grotesk and JetBrains Mono
- Brand logo shapes from [Simple Icons](https://simpleicons.org) (the logos belong to their respective owners)
- [FormSubmit](https://formsubmit.co) for the contact form
- [Vercel](https://vercel.com) for hosting

There is no `package.json`, no framework and no build tool.

## Project structure

```
.
├── index.html              The whole website (HTML, CSS and JavaScript)
├── assets/
│   └── images/
│       ├── profile.webp        Photo in the hero section (also used in structured data)
│       ├── profile1.webp       Photo in the About section
│       ├── og-image.jpg        1200x630 image shown when the link is shared
│       └── certifications/     Certificate images: 1c.webp ... 18c.webp
├── favicon.svg             Browser tab icon
├── apple-touch-icon.png    Icon for iPhone/iPad home screens
├── robots.txt              Crawler rules and sitemap location
├── sitemap.xml             Sitemap for search engines
├── llms.txt                Short plain-text summary for AI assistants
├── vercel.json             Hosting settings (security headers and caching)
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

## Run it locally

You only need a browser. To avoid problems with file paths and the contact form, it is best to serve the folder with a small local server instead of double-clicking `index.html`.

1. Download or clone the repository:
   ```bash
   git clone https://github.com/skgpt254/NewPortfolio.git
   cd NewPortfolio
   ```
2. Start a local server. Use either one:
   ```bash
   # Python 3 (already installed on most computers)
   python3 -m http.server 8000
   ```
   ```bash
   # or Node.js
   npx serve .
   ```
3. Open http://localhost:8000 (if you used `serve`, it prints the address to use).

There is nothing to install and nothing to build. When you save a change to `index.html`, just refresh the browser.

## Configuration

The project does **not** use environment variables, so there is no `.env` file or `.env.example`. There are also no API keys or secrets in the code. Everything you might want to change is written directly in the files:

| What | Where |
| --- | --- |
| Email that receives contact form messages | In `index.html`, search for `guptask0722@gmail.com`. It appears in the form script, the email links and the structured data. Also update it in `llms.txt`. |
| Website address | The address `https://sandesh-gupta-portfolio.vercel.app` is used in `index.html` (canonical link, social tags, structured data), `robots.txt`, `sitemap.xml` and `llms.txt`. If you use a different domain, replace it in all four files. |
| Resume link | The "View Resume" button in the About section of `index.html`, and `llms.txt`. |
| Projects | The three cards inside the `#projects` section of `index.html`. The structured data near the top of the file also describes two of them. |
| Colours | The CSS variables at the top of the `<style>` block. `:root` is Light Mode and `[data-theme=dark]` is Dark Mode. |
| Default theme | Light Mode is the default. The code is at the top of `<head>` (a tiny script that sets `data-theme`). |

### Setting up the contact form

The form sends messages through FormSubmit, which needs no account. The first time anyone sends a message, FormSubmit emails the address in the form a confirmation link. **Click that link once**, otherwise messages will not be delivered. After that, every message arrives in the inbox. Check the spam folder if the activation email does not show up.

Keep in mind that the email address is visible in the page source, like on any static site.

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

`vercel.json` already contains the settings the site needs: clean URLs, a few security headers, and caching rules (the HTML is always re-checked, while files in `assets/` are cached for a year).

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

## Search engine and AI visibility

Things that are already set up:

- A unique title, description and canonical URL
- Open Graph and Twitter tags with a 1200x630 preview image
- Structured data (JSON-LD) for my profile, my profile links, my certifications, awards and two of my projects
- `robots.txt` that allows search engines and common AI crawlers, plus a link to the sitemap
- `sitemap.xml` and `llms.txt`
- Descriptive alt text on images, one `h1`, headings in order, a "Skip to content" link, and a light page (about 65 KB of HTML)

If you don't want AI crawlers to use your site, edit `robots.txt` and change `Allow: /` to `Disallow: /` under the crawler names you want to block.

To get listed faster, add the site to [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters), then submit `sitemap.xml`. You can check the structured data with the [Schema.org validator](https://validator.schema.org) and Google's Rich Results Test.

This setup makes the site easy for crawlers to read, but nobody can guarantee rankings or that an AI assistant will mention the site.

## Troubleshooting

**Images or certificates do not show.**
Keep the folder structure exactly as it is, and run the site through a local server (see "Run it locally"). On Vercel, file names are case sensitive, so `1c.webp` and `1C.webp` are different files.

**The certificate section is empty.**
Open the browser console (F12). The gallery is built with JavaScript, so an error in the script stops it. Also check that `assets/images/certifications/` exists.

**The contact form says "Could not send".**
Check your internet connection, and make sure you clicked the FormSubmit activation link (see "Setting up the contact form"). The error message also shows my email address as a backup.

**I switched to Dark Mode, but it is Light again the next day.**
That is on purpose. The site always starts in Light Mode and only remembers your choice for the current tab.

**I deployed a change but still see the old site.**
Do a hard refresh (`Ctrl+Shift+R`). If you replaced an image with the same file name, rename it, because images are cached for a year.

**The social preview (WhatsApp, LinkedIn, X) shows an old image.**
Those platforms cache previews. Use their debugging tools, such as the LinkedIn Post Inspector or the Facebook Sharing Debugger, to refresh it.

**The social icons do not change colour on hover.**
This is only on screens wider than 860px and devices with a mouse. On phones the icons stay in the theme colours.

## Known limitations

- The contact form depends on a third-party service (FormSubmit).
- The page loads three fonts from Google Fonts. If they cannot load, the browser falls back to system fonts.
- There is no automated test suite. I tested by running the site in different screen sizes and checking each feature by hand and with scripts while building it.

## License and content

The code is released under the [MIT License](LICENSE).

The MIT License does **not** cover my personal content: my name and photos, the certificate images, the resume, the project descriptions and the text on the site. These are mine, and please don't reuse them. If you want to use this site as a template, replace all of that with your own.

## Contact

- Email: guptask0722@gmail.com
- LinkedIn: https://www.linkedin.com/in/sandeshkgupta/
- GitHub: https://github.com/skgpt254
