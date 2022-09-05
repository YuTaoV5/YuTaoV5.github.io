# 手把手教你写上位机_（一）初步搭建QT环境
# 搭建QT环境
## 下载
QT是一款开源软件，官网提供了两种安装手段，一种是在线安装需要登录注册，一种是直接下载离线安装包，两者差不多
但是官网在5.15版本之后就停止更新了离线安装包
[在线安装地址](https://www.qt.io/zh-cn/download)
这里以离线安装为例
我们直接选最后更新的5.14.2-windows版本
[官网离线安装地址](https://download.qt.io/archive/qt/5.14/5.14.2/)
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191159.png)

如果你发现没有网速或者下载不下来，不用怀疑自己，可能只是被墙了，这里提供另一个下载地址
[清华镜像源下载](https://mirrors.tuna.tsinghua.edu.cn/qt/archive/qt/5.14/5.14.2/)
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191237.png)

## 安装
下载好后用`管理员身份`运行

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191312.png)

接下来一路next，安装路径一定要选择一个存储空间充足的地方，Qt的大小和Matlab有的一拼，`注册信息`随便填填就好
接下来是组件选择，以下是我的选择
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191331.png)

当然如果空间不够，可以做适当删减，下图可供参考
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191404.png)

然后就直接点开始安装
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191425.png)

完成后按win键会出现
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191436.png)

这样就安装成功了
## 跑个例程
打开`QTcalulate`这个项目
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191445.png)

如果报这个提示，那说明你打开的是别人的项目，你本地没有编译信息
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191456.png)

点击OK后，选择编译环境即可然后点击下面的`Configure Project`
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191511.png)

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191520.png)

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191528.png)

一个简易的计算器程序就运行成功啦~

## QT界面介绍
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191536.png)

如果想要跨平台使用，可以在这里修改编译套件
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191544.png)

Tips:千万要注意，这里打开多个项目的时候，保存编译的时候不要选错项目~
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191550.png)

然后是界面编辑器
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220619191558.png)

至于基本控件对象的方法，我们就在接下来的实例中一步步学习吧~
