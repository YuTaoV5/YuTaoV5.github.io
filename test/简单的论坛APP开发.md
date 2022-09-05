# 简单的论坛APP开发
实际来说其实只需要显示个网页
## 新建个空白Android项目
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620155710.png)

### 添加资源
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620155736.png)

## 修改MainActivity
主要就是启用json,然后更改些配置让webview好看一点
```
package com.example.test_1;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    private WebView myWebView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        if (getSupportActionBar() != null){
            getSupportActionBar().hide();//隐藏标题栏
        }
        myWebView = findViewById(R.id.CyberLabBBS);
        myWebView.getSettings().setJavaScriptEnabled(true);//启用JS
        myWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        myWebView.getSettings().setUseWideViewPort(true);
        myWebView.getSettings().setLoadWithOverviewMode(true);
        myWebView.getSettings().setSupportZoom(true);
        myWebView.getSettings().setBuiltInZoomControls(true);
        myWebView.getSettings().setDisplayZoomControls(false);
        myWebView.getSettings().setDomStorageEnabled(true);//避免浏览器报错
        //设置目标网页仍在当前的WebView中显示，而不是在手机自带的系统浏览器中打开
        //系统浏览器进行网页访问,使用体验很差
        myWebView.loadUrl("https://www.protodrive.xyz");
        myWebView.setWebViewClient(new WebViewClient());

    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event){
        if(keyCode == event.KEYCODE_BACK){
            if(myWebView.canGoBack()){
                myWebView.goBack();
                return true;
            }
        }
        return super.onKeyDown(keyCode,event);
    }

}
```
## 修改SplashActivity
就是开头动画,所以要把app的启动代码移到这来
```
package com.example.test_1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

public class SplashActivity extends AppCompatActivity {
    // private final int SPLASH_DISPLAY_LENGHT = 2000; // 两秒后进入系统
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);//隐藏状态栏
        getSupportActionBar().hide();//隐藏标题栏
        setContentView(R.layout.activity_splash);
        Thread myThread=new Thread(){//创建子线程
            @Override
            public void run() {
                try{
                    sleep(2000);//使程序休眠2秒
                    Intent it=new Intent(getApplicationContext(),MainActivity.class);//启动MainActivity
                    startActivity(it);
                    finish();//关闭当前活动
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        };
        myThread.start();//启动线程

    }
}
```
## 界面配置
其实熟悉QT的话，Android还是很好上手的，他的`Activity`相当于是某个界面的主程序，而他的`xml`就是对应的界面布置。

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620160512.png)
和QT一样Android同样支持图形化界面配置。
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620160542.png)

## 打包.apk
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620160640.png)

