// Vibe coded by facts

// Set a default limit if one hasn't been saved yet
const DEFAULT_LIMIT = 10;

// Listen for new tabs being created
browser.tabs.onCreated.addListener(async (newTab) => {
  try {
    // 1. Get the user's stored limit
    const data = await browser.storage.local.get("maxTabs");
    const limit = data.maxTabs || DEFAULT_LIMIT;

    // 2. Count current open tabs in the SAME window as the new tab
    // Use windowId from the newTab to ensure we're counting correctly
    const tabsInWindow = await browser.tabs.query({
      windowId: newTab.windowId
    });

    // 3. Check if THIS window has exceeded the limit
    // Note: tabsInWindow includes the new tab that just triggered this event
    // So we need to check if (tabsInWindow.length - 1) > limit would be more accurate
    // But actually, we want to check if AFTER adding this tab, we exceed the limit
    if (tabsInWindow.length > limit) {
      // Remove the newly created tab immediately
      await browser.tabs.remove(newTab.id);

      // Notify the user
      browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("icons/icon-48.png"),
        "title": "Tab Limit Reached",
        "message": `This window is limited to ${limit} open tabs.`
      });
    }
  } catch (error) {
    console.error("Error in Tab Limiter:", error);
  }
});
