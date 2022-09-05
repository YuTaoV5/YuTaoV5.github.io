# VS2019中安装OpenCV-4.5.2
## 1. 下载并安装OpenCV

官网地址：[OpenCV下载](https://opencv.org/releases/)

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402757-94f02a76-89d0-4884-98ca-1b0f266e8ce6.png#align=left&display=inline&height=414&margin=%5Bobject%20Object%5D&originHeight=827&originWidth=992&size=0&status=done&style=none&width=496)

**下载后打开，选择安装地址**,直接安装即可

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402771-acdca396-e4dc-4fc7-866f-e34f8467ecfb.png#align=left&display=inline&height=218&margin=%5Bobject%20Object%5D&originHeight=436&originWidth=856&size=0&status=done&style=none&width=428)

## 2. 配置系统环境

打开**`资源管理器`**,点击**`系统属性`**,将界面**全屏**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402766-c5163f44-20ba-47eb-9f12-6d0ed8c11bb1.png#align=left&display=inline&height=423&margin=%5Bobject%20Object%5D&originHeight=564&originWidth=906&size=0&status=done&style=none&width=680)

将界面全屏化后,点击右侧**`高级系统设置`**,配置环境

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402779-82365a64-510a-4c09-8fe6-ccc14e969795.png#align=left&display=inline&height=978&margin=%5Bobject%20Object%5D&originHeight=978&originWidth=1854&size=0&status=done&style=none&width=1854)

选择**`环境变量`**,然后在`系统变量`里面找到`Path`,点击**`编辑`**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402786-f253ac3d-fa4f-4b3b-a9b0-804dd848ec12.png#align=left&display=inline&height=445&margin=%5Bobject%20Object%5D&originHeight=593&originWidth=1075&size=0&status=done&style=none&width=806)

新建后输入安装库的路径

```
X:\OpenCV\opencv\build\x64\vc15\bin
X:\OpenCV\opencv\build\x64\vc15\lib
```

**_上面地址请自行更换到刚刚OpenCV的安装路径_

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402780-cb6ad872-295e-46f5-bd34-70dd4c2307be.png#align=left&display=inline&height=570&margin=%5Bobject%20Object%5D&originHeight=570&originWidth=541&size=0&status=done&style=none&width=541)

## 3. VS2019项目配置

新建一个C++的**空项目**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402796-b1de32b2-e7b0-4906-b7e7-6db23f1a0baa.png#align=left&display=inline&height=569&margin=%5Bobject%20Object%5D&originHeight=759&originWidth=1440&size=0&status=done&style=none&width=1080)

设置**项目名称**,然后点击**创建**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402833-3da59e6a-6b00-4a9b-95ff-9dd4f436187c.png#align=left&display=inline&height=553&margin=%5Bobject%20Object%5D&originHeight=737&originWidth=1396&size=0&status=done&style=none&width=1047)

在**解决方案**里面,选择**源文件**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402773-d6b46702-6241-4d3b-a4a8-e4c44f715574.png#align=left&display=inline&height=287&margin=%5Bobject%20Object%5D&originHeight=287&originWidth=996&size=0&status=done&style=none&width=996)

添加一个**Cpp文件**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402796-98324d5f-f1b1-4ba1-86f8-8a26e8f808d3.png#align=left&display=inline&height=660&margin=%5Bobject%20Object%5D&originHeight=660&originWidth=955&size=0&status=done&style=none&width=955)

最后文件目录如下所示

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402815-2fa8bd1b-3cae-4e12-97b6-8fbdf264915e.png#align=left&display=inline&height=182&margin=%5Bobject%20Object%5D&originHeight=182&originWidth=338&size=0&status=done&style=none&width=338)

点击右下角有一个**属性管理器**,然后在**Debug|x64**下面选择**Microsoft.Cpp.x64.user**并双击

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402829-636acb4e-6bb1-4671-8990-3580acff7850.png#align=left&display=inline&height=955&margin=%5Bobject%20Object%5D&originHeight=955&originWidth=378&size=0&status=done&style=none&width=378)

> 这个操作是为了直接配置VS2019所有项目**Debug|x64**的编译条件,这样配置一次后就不用再配了
> 其他编译条件下操作相似,如果没有**Microsoft.Cpp.x64.user**,请看**常见问题**第一条
> 如果不想将配置永久保留,可以只在本次项目的属性,操作是点击**项目**->**配置**即可,接下来的操作一致


在双击打开来的界面里点击**VC++目录**,选择**包含目录**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402809-1fbfe56c-6c54-403a-a47b-bf553f5cfc68.png#align=left&display=inline&height=555&margin=%5Bobject%20Object%5D&originHeight=555&originWidth=960&size=0&status=done&style=none&width=960)

点击后选择**编辑**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402874-0a214678-7d2b-4df7-aede-199eaf35e67c.png#align=left&display=inline&height=259&margin=%5Bobject%20Object%5D&originHeight=259&originWidth=774&size=0&status=done&style=none&width=774)

打开你的**OpenCV**安装路径下的**build**文件夹选择**include**和他的下级文件夹**opencv2**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402808-94ec23bb-87e7-4d58-a454-5fe968d96071.png#align=left&display=inline&height=573&margin=%5Bobject%20Object%5D&originHeight=573&originWidth=914&size=0&status=done&style=none&width=914)

将两个地址都**复制**进来,点击**确定**

```
X:\OpenCV\opencv\build\include
X:\OpenCV\opencv\build\include\opencv2
```

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402823-19f3e431-e325-4add-82cc-bac2783cb876.png#align=left&display=inline&height=656&margin=%5Bobject%20Object%5D&originHeight=656&originWidth=436&size=0&status=done&style=none&width=436)

然后是选择**库目录**,选择**编辑**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402828-15f4718a-41b9-4e18-91fb-65ed64a611f6.png#align=left&display=inline&height=555&margin=%5Bobject%20Object%5D&originHeight=555&originWidth=960&size=0&status=done&style=none&width=960)

相似的操作,将地址复制进去

```
X:\OpenCV\opencv\build\x64\vc15\lib
```

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402836-74ac84c2-d895-4a3c-bf3c-8f203a7ad463.png#align=left&display=inline&height=656&margin=%5Bobject%20Object%5D&originHeight=656&originWidth=436&size=0&status=done&style=none&width=436)

完成这两步操作后,不要忘记点击**应用**,然后下一步点击**链接器**的输入

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402841-6474503e-93ae-4dd4-b9ee-958c273ab021.png#align=left&display=inline&height=555&margin=%5Bobject%20Object%5D&originHeight=555&originWidth=960&size=0&status=done&style=none&width=960)

在**附加依赖项**里面点击编辑

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402871-8afdff29-a321-4a84-ac54-e16add7c908c.png#align=left&display=inline&height=555&margin=%5Bobject%20Object%5D&originHeight=555&originWidth=960&size=0&status=done&style=none&width=960)

打开OpenCV的安装目录,依次点击**build**->**x64**->**vc15-**>**lib**,复制这个**.lib**后缀的文件名字进去就好

> 这里解释一下,后面的几个数字代表的是**opencv**的版本,所以不同版本会不一样,不必多虑
> 比如这里452代表OpenCV版本为`4.5.2`，如果是OpenCV其他版本，只需要修改dll的名字，例如：opencv版本为`3.4.0`，只需将dll名字改为`opencv_world340d.lib`即可。可以查看opencv\build\x64\vc15\lib目录，确认所修改版本名称。


![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402852-893f40f5-055b-43c0-95d0-2816dde391a3.png#align=left&display=inline&height=573&margin=%5Bobject%20Object%5D&originHeight=573&originWidth=914&size=0&status=done&style=none&width=914)

> 带有d的是指**Debug**版本,没d的是**Release**版本,这里我们是配置**Debug|x64**的版本,所以需要选择带d的,如果你想配置Release版本就选另外一个


然后**复制**进去

```
opencv_world452d.lib
```

点击**确认**,然后千万不要忘了点**应用**!

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438403055-eba82b34-c817-42c9-8682-395765f6fcdd.png#align=left&display=inline&height=656&margin=%5Bobject%20Object%5D&originHeight=656&originWidth=436&size=0&status=done&style=none&width=436)

以上就配置完了,重启`VS2019`

## 4. 测试环境

确保环境正确,是**Debug|x64**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402896-3c03441d-0b33-451b-9efd-50217ea287e4.png#align=left&display=inline&height=197&margin=%5Bobject%20Object%5D&originHeight=197&originWidth=921&size=0&status=done&style=none&width=921)

在之前新建的函数中输入

```
#include <opencv2/opencv.hpp>

using namespace cv;

int main()
{
	Mat img = imread("X:\\CodeItem\\OpenCV\\test\\CV_test\\test.png");
	imshow("这是一张图片", img);
	waitKey(0);
	return 0;
}
```

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402905-290f98fb-d458-4e48-a01d-bcf859b7f976.png#align=left&display=inline&height=541&margin=%5Bobject%20Object%5D&originHeight=541&originWidth=1894&size=0&status=done&style=none&width=1894)

点击**开始执行**,或者直接**ctrl+F5**

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402901-cf891e7e-d0cb-4e61-8e41-beaf3801e668.png#align=left&display=inline&height=483&margin=%5Bobject%20Object%5D&originHeight=483&originWidth=543&size=0&status=done&style=none&width=543)

运行成功!

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402899-a502b673-685e-43d3-9004-bfc60dd370bb.png#align=left&display=inline&height=1056&margin=%5Bobject%20Object%5D&originHeight=1056&originWidth=1928&size=0&status=done&style=none&width=1928)

## 常见问题

#### 没有Microsoft.Cpp.x64.user

那么你需要将一个叫**MSBuild**的文件夹放到**C:\Users"你的用户名"\AppData\Local\Microsoft**这个路径里面

这个文件夹我打包好了[提取码：yqk5](https://pan.baidu.com/s/143ukAslPAi_D_yP-Hjj_vA)

如下图所示

![](https://cdn.nlark.com/yuque/0/2021/png/2050896/1624438402968-b6fcd5b7-206b-4d08-b28e-c55b4d7c4497.png#align=left&display=inline&height=573&margin=%5Bobject%20Object%5D&originHeight=573&originWidth=914&size=0&status=done&style=none&width=914)

然后重启`VS2019`就好了

#### 找不到库函数

如果上面步骤没错,还是报一大堆错说找不到一堆库,建议检查一下**系统环境配置**和**项目配置**,然后重新**生成解决方案**,还不行就直接删项目,新建一个项目再来一次,多半就好了.

#### 运行报错找不到.dll文件

将**opencv\build\x64\vc15\bin**目录下面的`opencv_world452.dll`和`opencv_world452d.dll`文件复制到C:\Windows\SysWOW64文件夹下。
将**opencv\build\x64\vc15\bin**目录里面的`opencv_videoio_ffmpeg452_64.dll`和`opencv_world452d.dll`文件复制到C:\Windows\System32文件夹里面。
如果是opencv其他的版本，把对应的.dll文件移动到上述两个C盘文件夹即可。如果报错找不到opencv_xxxxxxx.lib文件，就试试看把相关lib文件复制到C:\Windows\System32和C:\Windows\SysWOW64这两个文件夹里面。

#### 无法解析的外部符号

编译模式和平台一定要与配置界面保持一致！我们配置的是**Debug | X64**，这里不要设错，设错会出现无法解析的外部符号。

如果附加的依赖项中添加的是不带d的lib，这里就设Release，带d的设Debug,不同的编译环境是不能用一样的设置的!
