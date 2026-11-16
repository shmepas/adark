# adark

A lightweight Firefox extension that gives regular web pages a dark appearance. It uses a page color inversion with a hue rotation and restores the original colors of common image and video content.

## Features

- Turns on automatically for HTTP and HTTPS pages.
- Lets you turn the effect on or off for the current site from the toolbar popup.
- Saves site choices locally in Firefox.
- Uses no remote requests, analytics, build step, or third-party dependencies.

## Install for development

1. Open `about:debugging` in Firefox.
2. Select **This Firefox**.
3. Select **Load Temporary Add-on…** and choose `manifest.json` from this folder.
4. Open a regular website and use the adark toolbar button to change the site setting.

Temporary add-ons are removed when Firefox restarts. For general distribution, package and submit the extension through Mozilla Add-ons.

## Limitations

Adark applies a general visual effect rather than rewriting each site's design. Some site-specific graphics, blend modes, and custom controls may look unusual. Use the toolbar button to disable adark on a site. Firefox restricts extensions from changing browser pages such as `about:addons`, the built-in PDF viewer, and other privileged pages.

## Permissions

- `storage`: remembers which sites have the effect disabled.
- HTTP and HTTPS page access: applies the stylesheet and reads the current hostname to maintain the per-site setting.

## Project status

Initial release candidate, version 1.0.0. See [`audit/`](audit/) for the prototype review and follow-up changes.
