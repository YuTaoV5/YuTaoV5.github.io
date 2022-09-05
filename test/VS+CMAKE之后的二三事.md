# VS+CMAKE之间的二三事-以Pangolin为例
## 概述
本文旨在帮助大家理解`cmake`是怎样用`CMakeLists`生成`.sln`(vs编译)项目文件,并生成可以供项目使用的静态库`.lib`等一系列操作,以及分享几个VS与开源库各自版本之间相爱相杀的故事

## 准备工作
[安装VS](https://visualstudio.microsoft.com/zh-hans/vs/)
[安装CMake](https://blog.csdn.net/m0_55048235/article/details/122277696)
[安装boost库](https://blog.csdn.net/alpha_love/article/details/77897313)
安装git(有手就行)

## 配置背景
  最近有用深度相机`Astra Pro`实现三维重建模型的需求,打算安装PCL以及实现`bundleFusion`算法,这个教程我会另起一文,所以对`Pangolin`这个库有需求,因为我的linux环境因为已经玩过`ORB_SLAM3`所以已有环境,这次就打算在windows下配置一回.

## 版本差异
众所周知,C++标准不断更新,我们的VS与开源库的版本也在一步步迭代,我们要理解版本差异带来的影响,拿`前朝的律法来要求今朝的官`,后果只能是被乱棍打死.
举几个例子~~我已经被坑过的例子~~来说明🤠

`Pangolin`与`ORBSLAM`
Pangolin 目前的最新版本是 0.6，但是该版本基于 C++17 标准编译，与 ORBSLAM2 的源代码不兼容，因此我们只能采用 0.5 版本进行配置ORBSLAM2.但在新的ORBSLAM3中就又可以了.

---
`Eigen3`与`BundleFusion`
不多赘述,去[官网](http://eigen.tuxfamily.org/index.php?title=Main_Page)下3.2版本就好,而BundleFusion只能用VS2013编译对SDK以及CUDA版本都有要求,而且对部分显卡支持不好,毕竟是近十年不怎么维护的开源项目了,所以一切就会变得艰难.

---
`Python`与`CUDA`与`Tensorflow`
这估计已经是所有装过tensorflow初学者的噩梦....

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010414.png)

言归正传...

## 配置环境
Windows 10
VS2022
Pangolin 0.6
Cmake 3.23
`配置目标`：Pangolin x64 Release版本.lib文件

## 构建
由于我已经编译成功过一遍,所以下文的图我有部分是从其他人博客扒来加工一下👅
  在库文件夹的根目录下新建 `build` 文件夹，利用 cmake-gui 进行构建，如下图所示。注意我这里选取的是 x64 模式。


![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010541.png)


  进行 `Configure`，如下图所示。注意这里面的`glew`、`libjpeg`、`libpng` 以及 `zlib` 几个依赖库不用管，后面在编译的时候，VS2017 会自己从对应网址 git clone 下来。不过由于这四个依赖库在 VS2017 实在 git 太慢，因此我们计划将其分别自己配置一下。

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010601.png)


  然后直接 `Generate` 即可完成构建。

## 编译
  首先单独配置以下四个依赖库：

### libjpeg 配置
  通过查看对应工程下的 CMakeLists.txt 文件，得到该库的下载位置如右：https://github.com/LuaDist/libjpeg.git

  git clone 到本地后，还是基于 Cmake-GUI 按照上述相似的方法进行配置。只是注意将配置选项中的`BUILD_STATIC`要勾选，因为我们这里需要的是`静态库`。如下图所示：

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010612.png)


  然后 `Generate`，构建对应的 VS2017 解决方案。

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010621.png)

注意在编译的时候，采用 `release X64` 模式，同时要将 jpeg 项目属性中的C/C++中代码生成中的运行库改为`多线程DLL(/MD)`。不过由于我的项目默认就是 MD 模式，所以就不改了。项目属性常规中的配置类型是.lib静态库。

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010633.png)

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010641.png)


![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010648.png)


![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010659.png)

  编译起来一路绿灯，最终在 build 目录下的 Release 目录中生成了我们需要的 `jpeg.lib`。同时，我们利用文件夹内部的搜索工具把 build 中所有的头文件和源文件，创建 lib 和 include 两个文件夹分别存放生成的库文件和收集的头文件、源文件，以备后用。

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010709.png)
![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010723.png)

lib文件夹同理~
### glew 配置
  该库的下载地址如右：https://github.com/Perlmint/glew-cmake.git

  glew 库下载到本地的根目录中已存在 build 文件夹，看来应该是已经提前构建完成,所以`不用CMAKE`!。由于我们是 VS2017 的 IDE，因此进入到 vc14 文件夹下，打开 glew.sln 解决方案。

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010735.png)

  在打开解决方案时，显示该项目使用的平台工具集比较早，这里我直接确定。如下图所示。


  进入解决方案后，依然是 Release x64 模式，并且将 `glew_static` 项目的属性中的运行库更改为 /MD。然后只右键生成 `glew_static` 项目即可。

  最终生成的是 glew32s.lib 库文件。然后依旧新建 include 和 lib 文件夹将相关文件保存好，以待后用。注意，库文件`自动生成`在了根目录的 lib 文件夹下，不要再到 build 文件夹中去找了。同时 include 文件夹也`直接复制`根目录下的同名文件夹即可。

### zlib 配置
  该库的下载地址如右：https://github.com/madler/zlib.git

  直接参照上述过程，x64构建生成即可。截图如下：

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010749.png)


  之后还是 Release x64 /MD 模式，注意只生成 zlibstatic 项目，其他就不赘述了。最终还是参照项目中的文件列表，收集所有头文件和源文件，创建 include 和 lib 目录存储。除 zconf.h 在 build 目录下外，其余文件都在根目录下，直接复制即可。

### libpng 配置
  该库的下载地址如右：https://github.com/glennrp/libpng.git

  在构建的时候，会报错没有找到 zlib 库。不过由于在此之间已经配置过，因此参照错误信息，直接勾选`PNG_BUILD_ZLIB`，暂时忽略该错误。等到编译的时候，再链接 zlib 库即可。

  生成解决方案后，于 png_static 项目属性中，在VC++目录/包含目录中添加之前配置 zlib 库中 include 文件夹的目录。在VC++目录/库目录中添加之前配置 zlib 库中 lib 文件夹的目录。注意项目仍然是 Release x64 MD 的模式。

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010801.png)

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010808.png)


![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010814.png)

  最终生成 libpng16_static.lib 库文件。依旧将相关文件分别放到 include 和 lib 文件夹中保存起来。

## 在VS中配置上述第三方库
  我们将上述生成的四个第三方库的 include 和 lib 文件夹放到对应库文件名称的目录下，暂时存放到 Pangolin-0.6 根目录的 external 文件夹下备用。如图所示：

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010823.png)


  此后，我们打开 Pangolin 解决方案，同样在 Release x64 模式下，将 Pangolin 项目的运行库设置为 /MD 模式。我们在属性管理器 Pangolin 项目 Release|x64 文件夹中对上述四个库分别新建属性表，方便管理。诸属性表的配置如下：

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010835.png)

### glew.props
`VC++目录/包含目录`：…\external\glew\include

`VC++目录/库目录`：…\external\glew\lib

`链接器/输入/附加依赖项`：glew32s.lib

### libjpeg.props
`VC++目录/包含目录`：…\external\libjpeg\include

`VC++目录/库目录`：…\external\libjpeg\lib

`链接器/输入/附加依赖项`：jpeg.lib

### zlib.props
`VC++目录/包含目录`：…\external\zlib\include

`VC++目录/库目录`：…\external\zlib\lib

`链接器/输入/附加依赖项`：zlibstatic.lib

### libpng.props
`VC++目录/包含目录`：…\external\libpng\include

`VC++目录/库目录`：…\external\libpng\lib

`链接器/输入/附加依赖项`：libpng16_static.lib

## 继续编译 Pangolin
  上述属性表添加到 Pangolin 项目中后，为保险起见，我们先将四个第三方库的项目（`__glew`、`__libjpeg`、`__libpng`、`__zlib`）卸载，然后单独生成 Pangolin 项目。

## 使用
### Pangolin 库的导入
  然后新建 Pangolin 文件夹，其下新建 include 和 lib 文件夹。生成的 pangolin.lib 放到 lib 文件夹下，include 文件夹则直接复制 Pangolin 根目录的 include 文件夹即可。这里要注意，include 文件夹中还要在对应位置包含 `Pangolin-0.5\build\src\include\pangolin` 目录下的 `config.h` 以及 `pangolin_export.h` 两个头文件，上述两个头文件是 ORBSLAM 运行所需要的的。

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010844.png)

  注意，在具体的使用中，Pangolin 库要和其四个依赖库搭配使用，换言之，ORBSLAM2中，需要同时添加上述五个库的`包含目录`、`库目录`以及`依赖项`。可以将上述配置都集合至`一个属性表`即可。

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010851.png)

## 资源分享
  为方便大家，我在这里分别提供我这次配置完成的 Release x64 MD 模式下的 Pangolin 及其四大依赖库，以及我此前的 Release x64 MT 模式的 Pangolin 库及其依赖库。大家可以按需取用：

链接：https://pan.baidu.com/s/1kz2Q7UoASIKCDoVq1eSHGA?pwd=1111 
提取码：1111 
## 总结
以Pangolin为例,大家已经实操过了VS是如何配置项目属性
1. 不同的项目环境,如`release x64`,都可以有不同的项目配置,所以一定要注意你选择的环境
2. 常用的集成库可以保存`项目配置`,以便下次调用环境,有点类似于Python的`Conda`!
3. 当你的开源库报错时,先查版本是不是对应,对于老项目,尽量用老的库版本保命
4. 除此之外,VS还有`SDK版本`,`工具集`也不能忽视!

![Img](http://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220607010858.png)

CMAKE的作用,在windows里大概率是为了编译CMakeLists,而生成编译器的项目文件,比如说.sln,而项目里面的静态库生成项目的输出就是一个静态库.lib文件,我们使用他时只要把他的`包含目录`、`库目录`以及`依赖项`填上,就能愉快的使用开源库了~

参考博客原文链接：https://blog.csdn.net/weixin_45675146/article/details/120884870