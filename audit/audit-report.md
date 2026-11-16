# adark prototype audit

**Date:** 2026-11-16

**Scope:** The raw Firefox WebExtension prototype in `work/adark-raw/`, followed by review of the publication-ready implementation.

## Prototype check

The raw prototype manifest parsed as JSON, declared Manifest V3, and referenced an existing stylesheet. This confirms the package's basic structure; it does not replace a live Firefox add-on load test.

## Findings and fixes

| Severity | Finding in raw prototype | Change in release candidate |
| --- | --- | --- |
| High | The filter was applied to every matching site with no user control. | Added a toolbar popup to enable or disable the effect per hostname. |
| Medium | No user choice was persisted. | Saved disabled hostnames in `browser.storage.local` and react to storage changes. |
| Medium | The prototype applied to all URL schemes with `<all_urls>`. | Limited matching and host access to HTTP and HTTPS pages. |
| Medium | The package had no installation or permission documentation. | Added development installation steps, limitations, and a permission explanation in `README.md`. |
| Low | The prototype did not declare Firefox signing metadata for current AMO requirements. | Added a Gecko ID, minimum version, and an explicit no-data-collection declaration. |
| Low | The darkening effect also changed the apparent colors of photos and videos. | Restored common media elements with a paired inversion. Some complex graphics can still look unusual. |

## Remaining verification

- Structural checks can validate the manifest, JavaScript syntax, file references, and package contents.
- A live install and visual review in Firefox is still required; Firefox is not installed in the current environment.
- Before an AMO submission, review Mozilla's current submission checks and test the signed package in Firefox.

## References

- [Mozilla: content scripts in `manifest.json`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts)
- [Mozilla: Manifest V3 migration guide](https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/)
- [Mozilla: Firefox extension metadata and data collection declaration](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings)
