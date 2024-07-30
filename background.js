chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'decodeCaptcha') {
        // 从存储中获取激活的 API URL
        chrome.storage.sync.get(['apiSettings'], function(result) {
            const activeApi = result.apiSettings ? result.apiSettings.find(api => api.active) : null;
            const apiUrl = activeApi ? activeApi.url : 'http://192.3.128.153:8000/ocr'; // 默认API URL
            console.log('Active API URL:', apiUrl);
            const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';

            // 手动构建请求体
            let requestData = `--${boundary}\r\n`;
            requestData += 'Content-Disposition: form-data; name="image"\r\n\r\n';
            requestData += request.imageData + '\r\n';  // 确保 imageData 是正确的base64编码字符串
            requestData += `--${boundary}--\r\n`;

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': `multipart/form-data; boundary=${boundary}`
                },
                body: requestData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200 && data.message === "Success") {
                        console.log('API response received, data:', data.data);
                        chrome.tabs.sendMessage(sender.tab.id, {
                            action: 'fillCaptcha',
                            captchaText: data.data,
                        });
                    } else {
                        console.error('API response error or unsuccessful:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error sending image to API:', error);
                });
        });

        return true;  // 表示异步响应
    }
});
