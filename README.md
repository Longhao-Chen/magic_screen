# magic_screen

这是一个可以利用老旧手机显示信息的项目，想法来自于：

https://shumeipai.nxez.com/2015/04/08/make-magic-mirror-with-raspberry-pi.html

特性：
* 支持Webview
* 显示时间，农历和公历
* 显示天气
* 自动从caldav服务器上获取日程并显示
* 显示未读邮件数
* 显示[一言](https://hitokoto.cn/)

## 运行方法：

1.配置好配置文件，并重命名为 `config.js`

2.安装依赖
```
npm i
```

3.运行
```
node main.js
```
