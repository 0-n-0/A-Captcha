function applyRules(domain, callback) {
    
    chrome.storage.sync.get(['allRules'], function(result) {

        console.log('Step 1: Reloading Rules');

        const rules = result.allRules || {};
        const rule = rules[domain];
        if (rule) {
            callback(rule.captchaSelector, rule.inputSelector);
        } else {
            console.error('No rules found for this domain:', domain);
        }
    });
}

function captureAndSendCaptcha(captchaSelector) {

    console.log('Step 2: captureAndSendCaptcha Start');

    const captchaElement = document.querySelector(captchaSelector);
    console.log('Step 2: captchaElement:', captchaElement);
    console.log('Step 2: captchaElement.src:', captchaElement.getAttribute('src'));


    if (captchaElement) {
        const checkSrcInterval = setInterval(() => {
            const src = captchaElement.getAttribute('src');

            if (src !== '') {

                let imageData;
                const src = captchaElement.src;
                console.log("src is now available:", src);
                clearInterval(checkSrcInterval);  // 停止定时器
                const regex = /^data:image\/\w+;base64,([A-Za-z0-9+/]+={0,2})/;
                console.log('Step 2: src:[' + src + ']');

                // 检查图片是否已经是 base64 格式
                if (src.startsWith('data:image')) {
                    console.log("base64 imageData: [");
                    imageData = src.split(',')[1]; // 直接从 src 提取 base64 数据
                    console.log(imageData + "]");
                } else {
                    // 使用 canvas 绘制图片，获取 base64 数据
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = captchaElement.naturalWidth;
                    canvas.height = captchaElement.naturalHeight;
                    ctx.drawImage(captchaElement, 0, 0);
                    imageData = canvas.toDataURL('image/png').split(',')[1];
                    console.log("imageData: [" + imageData + "]");
                }

                // 发送数据到 background.js 进行处理
                chrome.runtime.sendMessage({
                    action: 'decodeCaptcha',
                    imageData: imageData
                });


            } else {
                console.log("src is still empty");
            }
        }, 1000);  // 每1000毫秒（1秒）检查一次
    }else {
        console.log('Captcha element not found:', captchaSelector);
    }

}

function fillCaptcha(captchaText, inputSelector) {
    const inputElement = document.querySelector(inputSelector);
    if (inputElement) {
        inputElement.value = captchaText;
    } else {
        console.log('Input element not found:', inputSelector);
    }
}

function maybeCaptureAndSendCaptcha() {
    const domain = window.location.hostname;

    // 适用规则和回调
    applyRules(domain, function(captchaSelector, inputSelector) {
        // 函数来处理 captcha 的捕获和发送
        function handleCaptcha() {
            captureAndSendCaptcha(captchaSelector);
            // 添加监听器来处理从background script或其他地方来的消息
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                console.log('Step 3 : Resaving');
                if (request.action === 'fillCaptcha') {
                    console.log('Resave OK');
                    console.log(request);
                    fillCaptcha(request.captchaText, inputSelector);
                }
            });
        }

        if (document.readyState === "complete") {
            // 如果文档已完全加载，立即执行
            handleCaptcha();
        } else {
            // 否则，确保在加载完成后执行
            window.addEventListener('load', handleCaptcha);
        }
    });
}

maybeCaptureAndSendCaptcha();

