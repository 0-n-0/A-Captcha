# A-Captcha

## 用法：



### 0. OCR api自部署

这一步可以选择部署在本地（响应速度快），或者云服务器（更方便）

这个插件现在默认适配的是ddddocr，推荐用docker部署，具体步骤参考：

[GitHub - sml2h3/ddddocr-fastapi: 使用ddddocr的最简api搭建项目，支持docker](https://github.com/sml2h3/ddddocr-fastapi?tab=readme-ov-file#-ddddocr-api)

确保网络通，端口开放

### 1. 安装

整套源码下载后放在同一个文件夹里，打开浏览器拓展管理—开发者模式，选择加载已解压缩的拓展，文件夹就选这个

### 2. API配置

![Untitled](https://ovo-sec.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F3b7cacab-a4cf-4729-af39-5b0b3625ed16%2Fe9c249dd-35ce-4235-8de1-c3b08cfd185d%2FUntitled.png?table=block&id=834db9f2-29b3-4dfa-8272-ec93ed937144&spaceId=3b7cacab-a4cf-4729-af39-5b0b3625ed16&width=730&userId=&cache=v2)

名称识别，就是一个备注作用

url就是你部署的api的url，内置的默认的是：http://192.3.128.153:8000/ocr

临时搭在vps上的，vps在国外，可能不通，且不保证长期用

填好点保存就行了，如果有保存了多个api，可以在下面列表里指定哪个为当前使用

### 3. 规则配置

![Untitled](https://ovo-sec.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F3b7cacab-a4cf-4729-af39-5b0b3625ed16%2Fef016006-7fee-49a4-8322-bc75e89f8f04%2FUntitled.png?table=block&id=37ac1607-60aa-448f-9d91-8cec9875aeaf&spaceId=3b7cacab-a4cf-4729-af39-5b0b3625ed16&width=780&userId=&cache=v2)

以某个平台为例：[jxgl.hainanu.edu.cn](http://jxgl.hainanu.edu.cn/)

**域名：**

即域名，如：[jxgl.hainanu.edu.cn](http://jxgl.hainanu.edu.cn/)

**验证码选择器：**

这个需要查看前端源码，快速的方式是在目标网页上按 Ctrl+Shift+C，进入元素选择模式，把鼠标移到图片验证码上，会弹出元素信息的浮窗，带“#”的这个就是要填的选择器字段：

![Untitled](https://ovo-sec.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F3b7cacab-a4cf-4729-af39-5b0b3625ed16%2Ff4759917-ff34-4f4b-b1c9-78bb6430b619%2FUntitled.png?table=block&id=cb115195-d1ec-4e2f-acf6-b7f6b76d9108&spaceId=3b7cacab-a4cf-4729-af39-5b0b3625ed16&width=1420&userId=&cache=v2)

或者直接在html源码里复制，即井号加上id：

![Untitled](https://ovo-sec.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F3b7cacab-a4cf-4729-af39-5b0b3625ed16%2F6ee34bde-144a-4a9b-bfb9-48760a179298%2FUntitled.png?table=block&id=2b12eaeb-1e11-4120-baef-2ced3c053d30&spaceId=3b7cacab-a4cf-4729-af39-5b0b3625ed16&width=1420&userId=&cache=v2)

**输入框选择器：**

类似地：

![Untitled](https://ovo-sec.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F3b7cacab-a4cf-4729-af39-5b0b3625ed16%2F53dbadbb-cad6-412f-b84d-073ad1a38c0b%2FUntitled.png?table=block&id=070e4057-1ab4-440f-a8af-8002ed9206a5&spaceId=3b7cacab-a4cf-4729-af39-5b0b3625ed16&width=1420&userId=&cache=v2)

或者直接复制：

![Untitled](https://ovo-sec.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F3b7cacab-a4cf-4729-af39-5b0b3625ed16%2F416b0146-d846-447c-9585-f413aae3abce%2FUntitled.png?table=block&id=1075d95b-c497-46d2-808f-f9750d1615ba&spaceId=3b7cacab-a4cf-4729-af39-5b0b3625ed16&width=1420&userId=&cache=v2)

### 4. 使用

api和规则写好并保存后，重新加载对应网页，没问题的话应该能用了