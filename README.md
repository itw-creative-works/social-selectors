<div align="center">
  <a href="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg">
    <img src="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg">
  </a>
  <br>
  <br>

![GitHub package.json version](https://img.shields.io/github/package-json/v/itw-creative-works/social-selectors.svg)

![David](https://img.shields.io/david/itw-creative-works/social-selectors.svg)
![David](https://img.shields.io/david/dev/itw-creative-works/social-selectors.svg) <!-- ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/social-selectors/social-selectors.svg) -->
![npm bundle size](https://img.shields.io/bundlephobia/min/social-selectors.svg)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/itw-creative-works/social-selectors.svg)
![npm](https://img.shields.io/npm/dm/social-selectors.svg) <!-- [![NPM total downloads](https://img.shields.io/npm/dt/social-selectors.svg?style=flat)](https://npmjs.org/package/social-selectors) -->
![node](https://img.shields.io/node/v/social-selectors.svg)
![Website](https://img.shields.io/website/https/itwcreativeworks.com.svg)
![GitHub](https://img.shields.io/github/license/itw-creative-works/social-selectors.svg)
![GitHub contributors](https://img.shields.io/github/contributors/itw-creative-works/social-selectors.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/itw-creative-works/social-selectors.svg)

# SocialSelectors
**social-selectors** is an API of CSS selectors for various elements on social media sites. This module puts a constantly updated library at your finger tips and takes the struggle out of dealing with third party, constantly changing CSS classes and IDs.

[Site](https://itwcreativeworks.com) | [NPM Module](https://www.npmjs.com/package/social-selectors) | [GitHub Repo](https://github.com/itw-creative-works/social-selectors)

</div>

SO... you're trying to get the css selector for the _follow button_ on Twitter. **Which would you rather use?**

```js
'.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs *[data-testid*="-follow"]'
// OR //
'pages.profile.elements.followButton.normal.selector'
```

Well, now you don't have to manage those ugly, system generated css selectors anymore!
Introducing **SocialSelectors**: a dynamically updated library of css selectors for social media sites.

## Supported Sites
* Instagram
* Twitter
* SoundCloud _(coming soon!)_
* _more coming soon!_

## Install SocialSelectors
### Install via npm
```shell
npm install social-selectors
```

## Using SocialSelectors
```js
const SocialSelectors = new (require('social-selectors'));
SocialSelectors.load({
  library: 'instagram', // The social media site you want to load
  location: 'hosted', // Load the local library or hosted library (local | hosted).
})
.then(function (library) {
  console.log(library);
  const followButton = SocialSelectors.get('pages.profile.elements.followButton.normal.selector'); // Get the CSS Selector for the follow button on a profile
  console.log(followButton);

  // Now you can pass the selector to your code! Here are some examples:
  // 1. Using querySelectorAll
  document.querySelectorAll(followButton);
  // 2. Using Puppeteer
  const puppeteer = require('puppeteer');
  puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/google/');
    page.$(followButton);
  });

})

```

## How do I find the paths for the selectors?
The easiest way to get the path for the selectors is to view the src JSON files in the repo. For example if you want to find the paths for Instagram, open [https://github.com/itw-creative-works/social-selectors/blob/master/src/libraries/instagram/main.json](/src/libraries/instagram/main.json). Each site has two main sections in the JSON file: `globals` and `pages`. And `pages` is where you'll find the selectors broken down for each page on the site.

So if you wanted the selector for the like button on an Instagram post, you would come up with `pages.post.elements.likeButton.selector`.

## Why use SocialSelectors?
* Does your app scrape social media sites or rely on their css elements in any way?
* Are you annoyed with having to meticulously update your css selectors to successfully scrape these elements?
This library solves that problem by providing an api with *static* css paths that get translated into the current css selectors!

## What Can SocialSelectors do?
SocialSelectors is an API that provides an up-to-date library of CSS selectors for elements on social media sites.

## Final Words
If you are still having difficulty, we would love for you to post
a question to [the SocialSelectors issues page](https://github.com/itw-creative-works/social-selectors/issues). It is much easier to answer questions that include your code and relevant files! So if you can provide them, we'd be extremely grateful (and more likely to help you find the answer!)

## Projects Using this Library
[Somiibo](https://somiibo.com/): A Social Media Bot with an open-source module library. <br>
[JekyllUp](https://jekyllup.com/): A website devoted to sharing the best Jekyll themes. <br>
[Slapform](https://slapform.com/): A backend processor for your HTML forms on static sites. <br>
[SoundGrail Music App](https://app.soundgrail.com/): A resource for producers, musicians, and DJs. <br>
[Hammock Report](https://hammockreport.com/): An API for exploring and listing backyard products. <br>

Ask us to have your project listed! :)
