![](https://i.imgur.com/u4MVEqB.png)

### About

This is a simple Chrome Extension that finds the highest resolution url of an Instagram asset.

[Available on the Chrome Web Store](https://chrome.google.com/webstore/detail/instagram-high-resolution/jegjlojkkmlmfnhnogmmfbfamjdabgom).

### How It Works

When a user clicks anywhere on Instagram, the extension searches through each DOM layer present at the click coordinates — if an image or video is present, and large enough, it goes into that asset’s srcset and finds the highest resolution src. The url is copied to the clipboard automatically, and download and open buttons are shown. The extension is resilient to simple DOM changes, and will work in unanticipated cases like the introduction of the web stories feature.

### Development

Use `yarn` to install the package file.

Run with `gulp watch`.

Load the `build/` directory in developer mode on `chrome://extensions`.

Reload the extension via Chrome when testing.

To generate a build, use Chrome’s “Pack Extension” button on `chrome://extensions` and attach the private key from previous packaged versions.
