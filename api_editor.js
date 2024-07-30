document.getElementById('saveApi').addEventListener('click', function() {
    const apiName = document.getElementById('apiName').value.trim();
    const apiUrl = document.getElementById('apiUrl').value.trim();

    if (!apiName || !apiUrl) {
        setStatus('请填写所有字段。', 'red');
        return;
    }

    chrome.storage.sync.get(['apiSettings'], function(result) {
        let apiSettings = result.apiSettings || [];
        let existingApi = apiSettings.find(api => api.name === apiName);
        if (existingApi) {
            existingApi.url = apiUrl;
        } else {
            apiSettings.push({ name: apiName, url: apiUrl, active: false });
        }

        chrome.storage.sync.set({apiSettings}, function() {
            setStatus('API 设置已保存。', 'green');
            loadApis();
        });
    });
});

function loadApis() {
    chrome.storage.sync.get(['apiSettings'], function(result) {
        const apiList = document.getElementById('apiList');
        apiList.innerHTML = '';
        (result.apiSettings || []).forEach((api, index) => {
            const apiElement = document.createElement('div');
            apiElement.textContent = `${api.name} - ${api.url}`;
            const useButton = document.createElement('button');
            useButton.textContent = api.active ? '当前使用' : '设为当前使用';
            useButton.onclick = function() { setActiveApi(index); };
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.onclick = function() { deleteApi(index); };
            apiElement.appendChild(useButton);
            apiElement.appendChild(deleteButton);
            apiList.appendChild(apiElement);
        });
    });
}

function setActiveApi(index) {
    chrome.storage.sync.get(['apiSettings'], function(result) {
        let apiSettings = result.apiSettings || [];
        apiSettings.forEach((api, idx) => {
            api.active = idx === index;
        });
        chrome.storage.sync.set({apiSettings}, function() {
            setStatus('已更新当前使用的 API。', 'green');
            loadApis();
        });
    });
}

function deleteApi(index) {
    chrome.storage.sync.get(['apiSettings'], function(result) {
        let apiSettings = result.apiSettings || [];
        apiSettings.splice(index, 1);
        chrome.storage.sync.set({apiSettings}, function() {
            setStatus('API 已删除。', 'green');
            loadApis();
        });
    });
}

function setStatus(message, color) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.style.color = color;
}

document.addEventListener('DOMContentLoaded', loadApis);
