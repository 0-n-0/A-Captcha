let currentEditingDomain = null; // 追踪当前编辑的域名

document.getElementById('saveButton').addEventListener('click', function() {
    const domain = document.getElementById('domain').value.trim();
    const captchaSelector = document.getElementById('captchaSelector').value.trim();
    const inputSelector = document.getElementById('inputSelector').value.trim();

    if (!domain || !captchaSelector || !inputSelector) {
        setStatus('所有字段都是必填的，请填写完整。', 'red');
        return;
    }

    chrome.storage.sync.get(['allRules'], function(result) {
        const allRules = result.allRules || {};
        if (currentEditingDomain && currentEditingDomain === domain) {
            allRules[domain] = { captchaSelector, inputSelector };
        } else if (!currentEditingDomain || !allRules[domain]) {
            allRules[domain] = { captchaSelector, inputSelector };
        } else {
            setStatus('域名已更改，请使用新域名添加新规则或取消编辑。', 'red');
            return;
        }

        chrome.storage.sync.set({ allRules }, function() {
            setStatus('规则已成功保存。', 'green');
            loadRules();
            clearForm();
        });
    });
});

function deleteRule(domain) {
    chrome.storage.sync.get(['allRules'], function(result) {
        const allRules = result.allRules || {};
        if (allRules[domain]) {
            delete allRules[domain];
            chrome.storage.sync.set({ allRules }, function() {
                setStatus('规则已被删除。', 'green');
                loadRules();
            });
        }
    });
}

function loadRules() {
    chrome.storage.sync.get(['allRules'], function(result) {
        const rulesContainer = document.getElementById('rulesContainer');
        rulesContainer.innerHTML = '';
        const allRules = result.allRules || {};
        Object.keys(allRules).forEach(domain => {
            const rule = allRules[domain];
            const ruleElement = document.createElement('div');
            ruleElement.className = 'rule';
            ruleElement.textContent = `${domain} - 图片选择器: ${rule.captchaSelector}, 输入框选择器: ${rule.inputSelector}`;
            const editButton = document.createElement('button');
            editButton.textContent = '编辑';
            editButton.onclick = () => editRule(domain, rule);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.onclick = () => deleteRule(domain);
            ruleElement.appendChild(editButton);
            ruleElement.appendChild(deleteButton);
            rulesContainer.appendChild(ruleElement);
        });
    });
}

function editRule(domain, rule) {
    currentEditingDomain = domain;
    document.getElementById('domain').value = domain;
    document.getElementById('captchaSelector').value = rule.captchaSelector;
    document.getElementById('inputSelector').value = rule.inputSelector;
    document.getElementById('domain').disabled = true; // 锁定域名字段
    window.scrollTo(0, 0);
}

function clearForm() {
    document.getElementById('domain').value = '';
    document.getElementById('captchaSelector').value = '';
    document.getElementById('inputSelector').value = '';
    document.getElementById('domain').disabled = false; // 解锁域名字段
}

function setStatus(message, color) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.style.color = color;
}

document.addEventListener('DOMContentLoaded', loadRules);
