# [转载]VS安装Boost库
原文链接:[VS2013中安装配置和使用Boost库](https://blog.csdn.net/alpha_love/article/details/77897313)
## Step1
Boost官网下载安装包
[Boost最新版](https://www.boost.org/)
![Img](P:/Note/imgpool/img-pool-master/img/yank-note_picgo-image.png)


## Step2
将下载压缩包解压到本地
解压后可看到文件夹下有个`bootstrap.bat`文件。

## Step3
打开cmd命令窗口，运行bootstra.bat文件
执行以下命令，具体根据自己的环境略有变化。

![Img](P:/Note/imgpool/img-pool-master/img/yank-note_picgo-20140724094655249.png)

## Step3
最主要的目的是我们要运行`bootstrap.bat`文件

执行完后，结果如下：


![Img](P:/Note/imgpool/img-pool-master/img/yank-note_picgo-20140724094830440.png)


然后在文件夹下我们会发现新生成了一个名为bjam.exe的文件

![Img](P:/Note/imgpool/img-pool-master/img/yank-note_picgo-20140724094951014.png)

## Step4
在cmd窗口中运行`bjam.exe`文件
![Img](P:/Note/imgpool/img-pool-master/img/yank-note_picgo-20140724095334532.png)


此过程将默认根据系统已经安装好的编译工具VS编译相应的Lib文件、头文件等。

编译完成后如下：
![Img](P:/Note/imgpool/img-pool-master/img/yank-note_picgo-20140724100122595.png)

至此，Boost库安装完成

## Step5
配置VS
新建一个工程文件，添加测试代码

```
#include <boost/lexical_cast.hpp>       
#include <iostream>       
using namespace std;  
int main()  
{  
    using boost::lexical_cast;  
    int a = lexical_cast<int>("123");  
    double b = lexical_cast<double>("123.0123456789");  
    string s0 = lexical_cast<string>(a);  
    string s1 = lexical_cast<string>(b);  
    cout << "number: " << a << "  " << b << endl;  
    cout << "string: " << s0 << "  " << s1 << endl;  
    int c = 0;  
    try{  
        c = lexical_cast<int>("abcd");  
    }  
    catch (boost::bad_lexical_cast& e){  
        cout << e.what() << endl;  
    }  
    return 0;  
}  
```
打开`项目属性`->`C/C++`，在 `附加包含目录` 添加或编辑Boost的文件路径，我的是：
```
D:\软件\C_library\boost_1_55_0
```

在—>`连接器`选项`附加库目录`下添加Boost库lib文件路径，我的是：
```
D:\软件\C_library\boost_1_55_0\libs
```

## Step6
测试代码
代码运行成功，说明Boost库一切配置顺利。



接下来，就去尽情享受Boost带来的欢乐吧~