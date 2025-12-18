// Save options to storage
function saveOptions(e) {
  e.preventDefault();
  const limit = document.querySelector("#limit").value;

  browser.storage.local.set({
    maxTabs: parseInt(limit)
  }).then(() => {
    const status = document.querySelector("#status");
    status.textContent = "Options saved successfully!";
    setTimeout(() => {
      status.textContent = "";
    }, 2000);
  });
}

// Restore select box and checkbox state using the preferences stored in storage
function restoreOptions() {
  browser.storage.local.get("maxTabs").then((res) => {
    document.querySelector("#limit").value = res.maxTabs || 10;
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
