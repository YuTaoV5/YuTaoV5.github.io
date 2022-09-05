# 手把手教你写上位机_（三）TCP使用
没想到因为更新太慢被学弟催更了TuT，那么这次主要介绍tcp应用以及代码实现原理。
为了更好入门，这次的界面设计就简单一点,灵活性低一点,我们重点讲代码~
## tcp介绍
网络通信中的一个非常重要的概念就是套接字（Socket），简单地说，套接字就是网络进程的 ID，网络通信归根到底是进程的通信，在网络中，每个节点有一个网络地址（即 IP 地址），两个进程通信时，首先要确定各自所在网络节点的网络地址，但是，网络地址只能确定进程所在的计算机，而一台计算机上可能同时有多个网络进程，还不能确定到底是其中的哪个进程，由此套接字中还要有其他的信息，那就是端口号（Port），在一台计算机中，一个端口一次只能分配给一个进程，即端口号与进程是一一对应的关系，所以，端口号和网络地址就能唯一地确定 Internet 中的一个网络进程。可以认为：`套接字`=`网络地址`+`端口号`。系统调用一个 Socket（）得到一个套接字描述符，然后就可以通过他进行网络通信了。
套接字有很多种类，最常用的就有两种；流式套接字和数据报套接字。分别称之为"SOCK_STREAM"和"SOCK_DGRAM）"。它们分别使用不同的协议，流式套接字使用 `TCP 协议`，数据报套接字使用`UDP 协议`，本文所使用的是流式套接字协议。
网络上的绝大多数通信采用的都是客户机/服务器机制（`Client`/`Server`），即服务器提供服务，客户是这些服务的使用者
1. 服务器首先创建一个`Socket`，
2. 然后将该 Socket 与本地地址/端口号绑定`Bind()`，成功之后就在相应的 Socket 上监听`Listen()` 。
3. 当 `Accept()`函数捕捉到一个连接服务`Connect()`请求时，接受并生成一个新的 Socket,并通过这个新的 Socket 与客户端通信，客户端同样也要创建一个 Socket，将该 Socket 与本地地址/端口号绑定，还需要指定服务器端的地址与端口号，随后向服务器端发出 Connect()，请求被服务器端接受后，可以通过 Socket 与服务器端通信。

但是,实际上,就如同智能车有逐飞库,STM32有库函数,QT的自带库也已经实现了所有握手协议,而我们要做的其实只是.......
## Client客户端
新建一个带图形界面的项目命名为`QTclient`
### 界面设计
经过上一讲的介绍,你应该会怎么设计界面了,那么接下来根据我提供的信息,自己操作一下~
#### Push Button控件
![](P:/Note/imgpool/img-pool-master/img/7ba082e2.png)!


分别命名为
```
pushButton_connect
pushButton_disconnect
pushButton_send
```
操作如下
![](P:/Note/imgpool/img-pool-master/img/e42521a3.png)
然后同样`右键`选择`改变文本`
分别命名为
```
发送
连接
断开
```
#### Text Browser控件
![](P:/Note/imgpool/img-pool-master/img/39abeda5.png)
命名为
```
messagetextBrowser
```
#### Line Edit控件
![](P:/Note/imgpool/img-pool-master/img/75e583ae.png)
命名为
```
messagelineEdit
```
## 什么是槽函数
`槽函数`是QT的上位机设计的灵魂，简单的，你们可以类比理解为`中断`的响应函数，而触发事件可以是各式各样的，比如说点击，选择，等等用户操作.

### 槽函数的使用
`右键`->`转到槽`
![](P:/Note/imgpool/img-pool-master/img/78a3276d.png)
选择`clicked()`->`OK`
![](P:/Note/imgpool/img-pool-master/img/76717ea1.png)
然后就会跳转到响应函数
![](P:/Note/imgpool/img-pool-master/img/5f5a172b.png)
相当于用户点击之后就会触发这个函数,然后我们添加代码
```
    QString str=this->ui->messagelineEdit->text();
    QByteArray arr;
    QDataStream dst(&arr,QIODevice::ReadWrite);/*QDataStream 是继承于 QIODevice 的所以 必须要 设置读写权限*/
    dst<<QString("信息:")<<str;/*这里一定要设置好数据类型*/
    this->socket->write(arr);
```
这样我们的一个槽函数就设置好了,接下来
同样的操作再来两次,添加其他两个按钮的槽函数
![](P:/Note/imgpool/img-pool-master/img/af8e5048.png)
添加代码
```
this->socket->connectToHost("127.0.0.1",2333,QTcpSocket::ReadWrite);
    connect(this->socket,SIGNAL(connected()),this,SLOT(connected()));
```
```
this->socket->close();
```


添加完后让我们来看看,在`mainwindow.h`这个文件里面是不是自动生成添加了这些槽函数
![](P:/Note/imgpool/img-pool-master/img/1754c446.png)
所以说,这就是QT的一大优势,他的界面编辑会修改他的头文件里的函数声明
`注意`:这种改变是单向的,所以有可能你有时候`界面与头文件不对应`,所以最好时刻注意,按按左下角的小锤子
![](P:/Note/imgpool/img-pool-master/img/9db51e82.png)

### 使用TCP以太网通讯库
#### 引入库与头文件
在`.pro`的文件中添加 
```
QT += network
```
在`mainwindow.h`中添加下列头文件
```
#include <QtNetwork/QTcpSocket>
#include <QString>
#include <QDataStream>
#include <QByteArray>
#include<QtNetwork/QHostAddress>
#include<QMessageBox>
```
#### 添加TCP库的一个实例
```
QTcpSocket * socket;
```
一般来说,这种实例声明代码我们会把他放到`private私有类`当中
```
this->socket = new QTcpSocket(this);
```
这种带`this`一般都是在构造函数里面添加↓
也就是这里
![](P:/Note/imgpool/img-pool-master/img/033f1a8d.png)

#### 添加操作函数
我们在自己制作上位机时,其实往往不需要自己写以上我给的槽函数代码,那些就相当于`STM32`的库函数,你要做的是`理解`,而不是`会写`,没人会把32的库函数配置背下来,QT库也是同样的道理.为了采集信息,你要做的是正确的跑通你要用的库,而其他的函数用来处理信息的往往才是你要真正自己写的东西
##### 在`mainwindow.h`中添加两个函数
```
void connected(); //已经连接
void readyread(); //准备读取
```

##### 在`mainwindow.cpp`里面添加

```
void MainWindow::connected()
{
    QMessageBox::about(this,"提示","连接成功");
    connect(this->socket,SIGNAL(readyRead()),this,SLOT(readyread())
);
}
void MainWindow::readyread()
{
    QMessageBox::about(this,"提示","准备读取");
    QByteArray arr=this->socket->readAll();
    QDataStream * dst=new
    QDataStream(&arr,QIODevice::ReadOnly);/******重点******/
    QString str1;
    QString str2;
    (*dst)>>str1>>str2;
    this->ui-> messagetextBrowser->append(str1+str2);
    QMessageBox::about(this,"x",str1+str2);
}
```
然后就可以点击`小锤子`->`运行`了,出现以下界面就大功告成!
![](P:/Note/imgpool/img-pool-master/img/5f34b25a.png)

## Server服务器端
### 界面
![](P:/Note/imgpool/img-pool-master/img/8bbee9de.png)
```
sMessagetextBrowser
pushButton_discon
pushButton_send
sMessagelineEdit
```
相信你们已经可以根据这张图做出跟我一模一样的界面了~
### 使用TCP以太网通讯库
#### 引入库与头文件
在`.pro`的文件中添加 
```
QT += network
```
在`mainwindow.h`中添加下列头文件
```
#include<QtNetwork/QTcpServer>
#include<QtNetwork/QTcpSocket>
#include <QMessageBox>
```
#### 添加TCP库的两个实例
```
QTcpServer * server;
QTcpSocket * socket;
```
一般来说,这种实例声明代码我们会把他放到`private私有类`当中
而对应的,在构造函数里面添加
```
this->socket=0;
this->server=new QTcpServer(this);
this->server->listen(QHostAddress::Any,2333);
QObject::connect(this->server,SIGNAL(newConnection()),this,SLOT(newConnection()));
```
![](P:/Note/imgpool/img-pool-master/img/69803461.png)

按照和client按钮一模一样的做法
添加"发送"和"断开"按钮的槽函数
```
void MainWindow::on_pushButton_discon_clicked()
{
    this->socket->close();
}

void MainWindow::on_pushButton_send_clicked()
{
    QString str=this->ui-> sMessagelineEdit->text();
    QByteArray arr;
    QDataStream dst(&arr,QIODevice::ReadWrite);/*QDataStream 是继承于QIODevice 的所以 必须要 设置读写权限*/
    dst<<QString("信息:")<<str;/*这里一定要设置好数据类型*/
    this->socket->write(arr);
}
```
##### 在`mainwindow.h`中添加两个函数
```
void newConnection();
void ReceiveData();
```

##### 在`mainwindow.cpp`里面添加
```
void MainWindow::newConnection()
{
 this->socket=this->server->nextPendingConnection();
 QMessageBox::about(this,"提示","有新的连接！");

connect(this->socket,SIGNAL(readyRead()),this,SLOT(ReceiveData()));
}
void MainWindow::ReceiveData()
{
 QByteArray arr=this->socket->readAll();
 QDataStream dst(arr);
 QString str1;
 QString str2;
 dst>>str1>>str2;
 this->ui-> sMessagetextBrowser ->append(str1+str2);
}
```
然后就可以点击`小锤子`->`运行`了,出现以下界面就大功告成!
![](P:/Note/imgpool/img-pool-master/img/20743182.png)
### 联合测试
打开两个项目
![](P:/Note/imgpool/img-pool-master/img/10b672b7.png)
分别编译运行
![](P:/Note/imgpool/img-pool-master/img/b5f90560.png)
Bravo~!!
## 代码解释

#### 默认文件结构介绍
`mainwindow.h`--项目的头文件,主要声明项目用到的类,如MainWindow
`QTclient.pro`--项目的配置信息,如用到的库,编译语法,文件,路径等等
`main.cpp`--一般不修改,默认作用就是实例化窗口,后续做数据库以及界面优化时会介绍
`mainwindow.cpp`--项目的主要代码存放地,其中默认实现了类的构造函数和析构函数,以及作用域
`mainwindow.ui`--项目的界面

### TCP-Client部分
头文件介绍
![](P:/Note/imgpool/img-pool-master/img/b4449b25.png)
类介绍
![](P:/Note/imgpool/img-pool-master/img/869968f6.png)
函数介绍
![](P:/Note/imgpool/img-pool-master/img/ba4efda1.png)
剩下的写到代码注释里面了,做图片好麻烦= =
![](P:/Note/imgpool/img-pool-master/img/8d4c108e.png)
### TCP-Server部分
与client没差,相信各位可以类比互通~
### 上一期Serial部分

串口...写了半天全删了,我觉得还是再开一个专题讲个TCP与串口联合项目好了,到时候一起讲,培养大家多项目整合能力,有兴趣的同学可以提前做做看~

