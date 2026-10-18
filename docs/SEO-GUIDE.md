# Search visibility guide

My own checklist for getting the portfolio found online and for keeping an eye on how it is doing. I wrote it in plain steps so that I, or anyone else with a small personal site, can follow it without any SEO background. Search engines are patient. I am less so. Both of those facts will matter below.

## The short version

1. Verify the site in **Google Search Console** and **Bing Webmaster Tools**.
2. Submit `sitemap.xml` in both, and ask Google to index the home page.
3. Put my website link on every profile I own (GitHub, LinkedIn, TryHackMe, Hack The Box, LeetCode, Codeforces).
4. Check the reports now and then, fix what they flag, and wait. Weeks, not hours.

My site address: `https://sandesh-gupta-portfolio.vercel.app/`

## First, three different goals

People mix these up, so it helps to keep them apart.

| Goal | What it means | Which tools help |
| --- | --- | --- |
| **Indexing** | A search engine knows my page exists and has stored it. A page that is not indexed can never show up. | Search Console, Bing Webmaster Tools, a sitemap, `robots.txt` that allows crawling |
| **Ranking** | Where my page appears when someone searches. | Mostly my content, links from other real sites, and a fast, clean website. Time also matters. |
| **Monitoring** | Seeing what happened: impressions, clicks, errors, speed. | Search Console, Bing Webmaster Tools, PageSpeed Insights, Lighthouse |

The tools below mainly help with **indexing** and **monitoring**. They show problems and let me fix them, which can help rankings indirectly, but **no tool can guarantee a higher ranking**. Anyone who promises a "guaranteed #1 on Google" is selling something that does not exist.

## The tools at a glance

| Tool | What it is for | Link |
| --- | --- | --- |
| Google Search Console | Check if Google indexed my site, submit the sitemap, see searches, clicks and errors | https://search.google.com/search-console |
| Bing Webmaster Tools | Same thing for Bing (Yahoo and parts of DuckDuckGo also use Bing results) | https://www.bing.com/webmasters |
| IndexNow (optional) | Tells Bing and some other engines right away when a page changes. Google does not use it. | https://www.indexnow.org |
| PageSpeed Insights | Speed and Core Web Vitals for mobile and desktop | https://pagespeed.web.dev |
| Lighthouse (in Chrome) | Performance, accessibility, SEO and best-practice checks on my own computer | Built into Chrome DevTools (press F12) |
| Rich Results Test | Checks if Google can read my structured data | https://search.google.com/test/rich-results |
| Schema Markup Validator | Checks all schema.org structured data for errors | https://validator.schema.org |
| W3C Markup Validator | Finds HTML mistakes | https://validator.w3.org |
| WAVE | Accessibility problems shown on the page | https://wave.webaim.org |
| axe DevTools | Accessibility checks as a browser extension | https://www.deque.com/axe/devtools/ |
| LinkedIn Post Inspector | Refreshes and previews the link card on LinkedIn | https://www.linkedin.com/post-inspector/ |
| Facebook Sharing Debugger | Same for Facebook, WhatsApp and Instagram previews | https://developers.facebook.com/tools/debug/ |
| Google Tag Manager / Analytics | Counts visitors and what they do (different from search data) | https://tagmanager.google.com and https://analytics.google.com |
| Vercel Analytics | Simple visitor and speed numbers from my host (check current free limits) | https://vercel.com/docs/analytics |

## Google Search Console

**Why:** It is Google's own dashboard for my site. It is free, it is the most important tool on this list, and it is the only place that shows how Google really sees my pages.

### Register and verify
1. Open https://search.google.com/search-console and sign in with a Google account.
2. Click **Add property** and choose **URL prefix**. Type my address exactly: `https://sandesh-gupta-portfolio.vercel.app/`
   (The **Domain** option needs a DNS record on a domain I own, so it does not work on a free `vercel.app` address.)
3. Pick a verification method. Two of them are already in this project, so the site just needs to be deployed first:
   - **HTML file:** `google4df08e21eeb8b18c.html` in the project root.
   - **HTML tag:** the `google-site-verification` meta tag in `index.html`.
4. Click **Verify**. Keep the file and the tag in the project forever, because Google checks them again from time to time.

### Submit the sitemap
1. In the left menu, open **Sitemaps**.
2. Under **Add a new sitemap**, type `sitemap.xml` and click **Submit**.
3. The status should change to **Success**. If it says "Couldn't fetch", open `https://sandesh-gupta-portfolio.vercel.app/sitemap.xml` in a browser and check it loads.

Google no longer supports the old "ping" URL for sitemaps, so this form is the way to do it.

### Ask Google to index the home page
1. Paste my home page address into the search bar at the top (this is the **URL inspection** tool).
2. If it says **URL is not on Google**, click **Request indexing**.
3. Wait. There is a daily limit, and asking again and again does not make it faster. A new site can take from a few days to a few weeks. "Request indexing" is a request, not a promise.

### What to check, and how often
- **Performance > Search results:** shows **clicks** (people who clicked my link), **impressions** (times my link was shown), **average CTR** (clicks divided by impressions) and **average position**. Use the tabs **Queries** (the words people typed), **Pages**, **Countries** and **Devices**. Data appears after a few days and only once the site starts showing in search. I look for:
  - Queries with my name. Are people finding me with "Sandesh Kumar Gupta" or "Sandesh Gupta"?
  - Many impressions but few clicks. That means my title or description could be better.
- **Indexing > Pages:** shows how many pages are indexed and why others are not. For my one-page site, I want to see 1 indexed page. Reasons like "Crawled - currently not indexed" or "Discovered - currently not indexed" mean Google knows the page but has not stored it yet, and the fix is usually time plus better content and links.
- **Sitemaps:** shows if the sitemap was read without errors.
- **Experience** (Core Web Vitals): needs real visitors, so a new site often shows "no data".
- **Links:** shows which other sites link to me. This is a good way to see if my profile links are being counted.
- Google also emails me about serious problems, so I keep notifications on.

## Bing Webmaster Tools

**Why:** Bing has its own index, and some other search products use Bing results. It is quick to set up and its reports are easy to read.

### Register and verify
1. Open https://www.bing.com/webmasters and sign in with a Microsoft or Google account.
2. The easiest way: choose **Import** from Google Search Console, sign in with the Google account used above, allow access, select my site and click **Import**. Bing copies the verified site and its sitemap, and re-checks ownership from time to time.
3. Or add the site manually and verify with one of Bing's methods (an XML file, a meta tag, or a DNS record). If I choose the file or meta tag, I need to add it to this project and deploy it first.

### Submit the sitemap and URLs
1. Open my site in Bing Webmaster Tools and go to **Sitemaps**.
2. Click **Submit sitemap** and paste the full address: `https://sandesh-gupta-portfolio.vercel.app/sitemap.xml`
3. Use **URL Submission** (or the URL inspection tool) to send my home page. There is a daily quota.

### What to check
- **Search Performance:** clicks, impressions and queries on Bing.
- **Site Explorer and URL inspection:** which pages Bing has and what it found on them.
- **SEO or Site Scan reports:** simple checks for common problems.
- Menu names change from time to time, so I look for the same idea if a label is different.

### IndexNow (optional)
IndexNow lets a site tell Bing, and some other engines, immediately when something changes. Bing generates a key, I host a small text file with that key at my site root, and then I notify IndexNow after updates. Google does not use it, and my portfolio changes rarely, so the sitemap and URL submission are enough for now.

## Other search engines
- **Yahoo and DuckDuckGo:** there is no separate dashboard I need. Working with Bing covers most of it.
- **Yandex, Baidu, Naver:** only worth it if I want readers in those countries. Yandex has https://webmaster.yandex.com.

## Checking speed (performance)
1. Open https://pagespeed.web.dev, paste my address and click **Analyze**.
2. Look at both the **Mobile** and **Desktop** tabs.
3. The top part shows real-visitor data when there is enough traffic. The Lighthouse part below gives scores for **Performance, Accessibility, Best Practices and SEO**, and a list of things to improve.
4. The "good" targets for Core Web Vitals are: Largest Contentful Paint under 2.5 seconds, Cumulative Layout Shift under 0.1, and Interaction to Next Paint under 200 ms.

To run Lighthouse myself, open the site in a Chrome Incognito window, press F12, open the **Lighthouse** tab and click **Analyze page load**. Scores change a little on every run, so I treat them as hints, not as a game to win. Google Fonts and Tag Manager are third-party files and can lower the score a bit.

## Checking structured data
1. Open the [Rich Results Test](https://search.google.com/test/rich-results), enter my address and click **Test URL**. It shows what Google can read and any errors.
2. Open the [Schema Markup Validator](https://validator.schema.org) and test the same address. It checks every schema.org type I use (Person, ProfilePage, SoftwareSourceCode and so on).
3. Fix errors. Warnings are optional.

Valid structured data helps search engines understand the page. It is not a ranking boost on its own, and it does not guarantee a special result in search.

## Checking accessibility
- Run the **Accessibility** part of Lighthouse.
- Use the WAVE website or the axe DevTools extension and fix anything marked as an error.
- Do a quick manual test: use only the keyboard (Tab, Enter, Esc), zoom the page to 200%, and try the site on a phone.

Accessibility is good for real users, and it often overlaps with what search engines like.

## What really helps rankings
These take time, and none of them is a trick:

1. **Good, clear content** about what people search for: my name, my projects and my skills. More real pages give more chances to be found. For example, a short write-up of how I built eRDS, or a CTF write-up.
2. **Links from real places,** using the same name everywhere: the website field on GitHub (profile and repositories), LinkedIn, TryHackMe, Hack The Box, LeetCode and Codeforces, my college or club pages, and event pages where I placed. A few honest links from trusted sites matter more than many low-quality ones.
3. **The same name, photo and short bio** on all my profiles, so search engines can connect them (`sameAs` in my structured data does this too).
4. **A fast, mobile-friendly, working site** with no broken links.
5. **Patience.** A new site takes weeks or months. "Sandesh Gupta" is a very common name, so the full name "Sandesh Kumar Gupta", or adding a word like "cybersecurity", will work sooner.
6. **Optional: my own domain** (for example `yourname.com`). It is easier to remember and I keep it if I change hosting. If I do this, I must update the address in `index.html`, `robots.txt`, `sitemap.xml` and `llms.txt`, add the new site to Search Console, and set up a redirect from the old address.

## Things I will not do
- Fake reviews, fake ratings or fake followers
- Buying backlinks or joining link-exchange schemes
- Stuffing keywords, hidden text or copying other people's content
- Paying for "guaranteed ranking" services

These can get a site demoted or removed from results, and they go against the rules of the search engines.

## About my meta keywords and `llms.txt`
- The `keywords` meta tag in `index.html` is ignored by Google. It is harmless, but what really counts is the text that visitors can see on the page.
- `llms.txt` and the structured data help machines understand who I am. Major search engines have not confirmed that they use `llms.txt`, and no AI assistant is guaranteed to mention my site.

## My routine

**This week**
1. Deploy, then verify the site in Google Search Console.
2. Submit `sitemap.xml` and request indexing of the home page.
3. Import the site into Bing Webmaster Tools and check the sitemap there.
4. Add my website link to GitHub, LinkedIn, TryHackMe, Hack The Box, LeetCode and Codeforces.
5. Run PageSpeed Insights, the Rich Results Test and the Schema Markup Validator.

**Weeks 2 to 4**
1. Check **Indexing > Pages** in Search Console. Search `site:sandesh-gupta-portfolio.vercel.app` in Google to see if the page appears.
2. Fix any errors the tools show.
3. Write one project or CTF write-up and link it from the portfolio.

**Every month**
1. Look at the Performance report: queries, clicks and impressions.
2. Update the site when I get a new certificate or finish a project. I only change the files and push to GitHub, because the sitemap is re-read automatically.

Back to the [README](../README.md).
