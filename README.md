# Vue 3 + Vite

## vite-plugin-build-sniffer

### 在运行vite build命令时向index.html文件插入一个自定义的meta标签和script标签,meta标签记录上次打包命令运行时的时间戳,script标签用来定时向服务器请求index.html文件,通过比对两次构建的时间戳来判断服务器是否有内容更新。
