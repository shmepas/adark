const STORAGE_KEY = "disabledSites";
const siteElement = document.querySelector("#site");
const toggleButton = document.querySelector("#toggle");
const statusElement = document.querySelector("#status");

let activeTabId;
let activeSite;
let themeEnabled;

function setUnavailable(message) {
  siteElement.textContent = message;
  toggleButton.disabled = true;
  statusElement.textContent = "adark works on regular websites.";
}

async function initialize() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (!tab?.url) {
    setUnavailable("No active page");
    return;
  }

  let url;
  try {
    url = new URL(tab.url);
  } catch {
    setUnavailable("This page is unavailable");
    return;
  }

  if (!/^https?:$/.test(url.protocol) || !url.hostname) {
    setUnavailable("This page is unavailable");
    return;
  }

  activeTabId = tab.id;
  activeSite = url.hostname;
  siteElement.textContent = activeSite;

  const result = await browser.storage.local.get(STORAGE_KEY);
  const disabledSites = Array.isArray(result[STORAGE_KEY])
    ? result[STORAGE_KEY]
    : [];
  themeEnabled = !disabledSites.includes(activeSite);
  updateButton();
  toggleButton.disabled = false;
}

function updateButton() {
  toggleButton.textContent = themeEnabled ? "Turn off for this site" : "Turn on for this site";
  statusElement.textContent = themeEnabled ? "Dark appearance is on." : "Dark appearance is off.";
}

toggleButton.addEventListener("click", async () => {
  toggleButton.disabled = true;
  themeEnabled = !themeEnabled;

  const result = await browser.storage.local.get(STORAGE_KEY);
  const disabledSites = new Set(
    Array.isArray(result[STORAGE_KEY]) ? result[STORAGE_KEY] : [],
  );

  if (themeEnabled) disabledSites.delete(activeSite);
  else disabledSites.add(activeSite);

  await browser.storage.local.set({ [STORAGE_KEY]: [...disabledSites] });

  try {
    await browser.tabs.sendMessage(activeTabId, {
      type: "adark:set-enabled",
      enabled: themeEnabled,
    });
    updateButton();
  } catch {
    statusElement.textContent = "Reload this page to apply the setting.";
  }

  toggleButton.disabled = false;
});

initialize().catch(() => setUnavailable("Could not read this page"));
