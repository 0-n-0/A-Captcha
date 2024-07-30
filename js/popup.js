document.getElementById('editRulesButton').addEventListener('click', () => {
    chrome.tabs.create({url: '../html/rules_editor.html'});
});
document.getElementById('apiSettingsButton').addEventListener('click', () => {
    chrome.tabs.create({url: '../html/api_editor.html'});
});
