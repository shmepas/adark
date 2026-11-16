const STORAGE_KEY = "disabledSites";
const ROOT_ATTRIBUTE = "data-adark";
const site = location.hostname;

function applyTheme(enabled) {
  if (enabled) {
    document.documentElement.setAttribute(ROOT_ATTRIBUTE, "on");
  } else {
    document.documentElement.removeAttribute(ROOT_ATTRIBUTE);
  }
}

async function loadSitePreference() {
  const result = await browser.storage.local.get(STORAGE_KEY);
  const disabledSites = Array.isArray(result[STORAGE_KEY])
    ? result[STORAGE_KEY]
    : [];
  applyTheme(!disabledSites.includes(site));
}

loadSitePreference();

browser.runtime.onMessage.addListener((message) => {
  if (message?.type === "adark:set-enabled" && typeof message.enabled === "boolean") {
    applyTheme(message.enabled);
  }
});

browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes[STORAGE_KEY]) return;

  const disabledSites = Array.isArray(changes[STORAGE_KEY].newValue)
    ? changes[STORAGE_KEY].newValue
    : [];
  applyTheme(!disabledSites.includes(site));
});
