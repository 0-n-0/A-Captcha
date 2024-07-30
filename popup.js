document.getElementById('editRulesButton').addEventListener('click', () => {
    chrome.tabs.create({url: 'rules_editor.html'});
});
document.getElementById('apiSettingsButton').addEventListener('click', () => {
    chrome.tabs.create({url: 'api_editor.html'});
});
