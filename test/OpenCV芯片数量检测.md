# OpenCV芯片数量检测

环境配置部分参考【opencv配置】
## 测试图片

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620144152.png)

## 程序结果

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620144204.png)

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620144214.png)
## 运行步骤
### 第一步
打开`chip.sln`,修改图片地址
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620144726.png)
### 第二步
检查环境没错的话,直接`运行项目`即可,会生成这几张图片
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620144858.png)
### 第三步
运行`show.exe`,用滚轮进行缩放
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620144958.png)
对检测有问题的部分和结果进行修改
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220620145124.png)
比如这里就是 136+5
## 附录
### opencv代码
```
#include<opencv2/opencv.hpp>
#include<iostream>
#include<math.h>
#include<opencv2\imgproc\types_c.h>
using namespace cv;
using namespace std;

float seekFirstFoot(Mat image, RotatedRect box_min, Size size);
int compare_min(double val1, double val2, double val3, double val4);
int compare_max(double val1, double val2, double val3, double val4);
Point cp(Point pos1, Point pos2, Point pos3, Point pos4);

void main()
{
	Mat src = imread("P:/Item/Opencv/chip/chip/pic_13.jpg");

	//高斯滤波
	Mat gaussian;
	GaussianBlur(src, gaussian, Size(3, 3), 0);
	//imshow("gaussian", gaussian);
	imwrite("gaussian.jpg", gaussian);

	//转灰度图
	Mat gray;
	cvtColor(gaussian, gray, CV_BGR2GRAY);
	//imshow("gray", gray);
	imwrite("gray.jpg", gray);

	//边缘检测
	Mat canny;
	Canny(gray, canny, 100, 255);
	//imshow("canny", canny);
	imwrite("canny.jpg", canny);

	//二值化
	Mat binImag;
	threshold(gray, binImag, 100, 255, THRESH_BINARY);
	//inRange(gray, Scalar(0, 70, 70), Scalar(10, 255, 255), binImag);
	bitwise_not(binImag, binImag);
	//imshow("binImag", binImag);

	//形态学操作
	Mat morphology;
	Mat kernel = getStructuringElement(CV_SHAPE_RECT, Size(3, 3));
	morphologyEx(binImag, morphology, MORPH_OPEN, kernel, Point(-1, -1), 4);
	//imshow("morphology", morphology);
	imwrite("morphology.jpg", morphology);

	//发现轮廓
	vector<vector<Point>> contours;
	findContours(morphology, contours, RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
	cout << "目标数量：" << contours.size() << endl;
	vector<Rect> bounding(contours.size());  //外接矩形
	vector<RotatedRect> box(contours.size()); //定义最小外接矩形集合
	Point2f rect[4];
	Point2f recr_min[4];

	//画轮廓、计算角度
	for (int i = 0; i < contours.size(); i++)
	{
		bounding[i] = boundingRect(Mat(contours[i]));  //计算外接矩形
		box[i] = minAreaRect(Mat(contours[i])); //计算每个轮廓的最小外接矩形
		//printf("最小外接圆旋转角度：%f \r\n", box[i].angle);
		rectangle(src, bounding[i], Scalar(255, 0, 0));  //绘制外接矩形
		circle(src, Point(box[i].center.x, box[i].center.y), 4, Scalar(0, 0, 255), -1);  //绘制最小外接矩形中心
		box[i].points(rect);
		for (int j = 0; j < 4; j++)
		{
			line(src, rect[j], rect[(j + 1) % 4], Scalar(255, 0, 255), 3); //绘制最小外接矩形的四条直线
		}
		drawContours(src,contours,i,Scalar(255,0,0)); //绘制轮廓
		//cout << box[i].size << endl;
		cout << "目标【" << i << "】";
		cout << "坐标：" << box[i].center;
		string str = to_string(i);
		putText(src, str, Point(int(box[i].center.x), int(box[i].center.y)), FONT_HERSHEY_SIMPLEX,1, Scalar(255, 255, 0));


		//计算旋转角度
		float zoom = 0.63;  //缩放比例
		RotatedRect box_min(Point(box[i].center.x, box[i].center.y), Size(box[i].size.width * zoom, box[i].size.height * zoom), box[i].angle); //缩放最小外接旋转矩形

		seekFirstFoot(src, box_min, Size(35, 35));  //根据传入的旋转矩形，计算矩形四个点在size范围内的平均灰度，返回最大平均灰度值所在点与X轴的角度，（0-360度）
	}

	//imshow("src", src);
	imwrite("result.jpg", src);
	waitKey(0);
}



float seekFirstFoot(Mat image, RotatedRect box_min, Size size)
{
	Point2f rect_min[4];
	box_min.points(rect_min);


	Point2f rect_micro[4];
	double m[4];  //可能为丝印四个点的灰度均值
	Point pos[4]; //可能为丝印的四个点左上角坐标
	int target_index;  //丝印点下标
	for (int k = 0; k < 4; k++)
	{
		//line(image, rect_min[k], rect_min[(k + 1) % 4], Scalar(255, 100, 255), 1); //绘制矩形的四条直线
		//cout << "坐标【" << k << "】x=" << rect_min[k].x << "y=" << rect_min[k].y << endl;
	}

	for (int i = 0; i < 4; i++)
	{
		RotatedRect rect_micro(Point(rect_min[i].x, rect_min[i].y), size, 0);
		Point2f rect_micro_pos[4];
		rect_micro.points(rect_micro_pos);
		for (int j = 0; j < 4; j++)
		{
			//line(image, rect_micro_pos[j], rect_micro_pos[(j + 1) % 4], Scalar(0, 255, 0), 1); //绘制矩形的四条直线
			//putText(image, "1", (rect_micro_pos[j], rect_micro_pos[(j + 1) % 4]), (0, 255, 0));
			//putText(image, "q", Point(int(rect_micro_pos[j].x), int(rect_micro_pos[j].y)), FONT_HERSHEY_SIMPLEX,2, Scalar(0, 255, 0));
			//cout << "【1】 X=" << int(rect_micro_pos[j].x) << "  Y=" << int(rect_micro_pos[j].y) << endl;

		}
		pos[i] = cp(rect_micro_pos[0], rect_micro_pos[1], rect_micro_pos[2], rect_micro_pos[3]);  //返回最小矩形左上方坐标，
		Rect rect_temp(int(pos[i].x), int(pos[i].y), size.width, size.height);
		Mat InputImage = image(rect_temp);
		//imshow("InputImage", InputImage); 
		Mat  mat_mean, mat_stddev;
		meanStdDev(InputImage, mat_mean, mat_stddev);//求灰度图像的均值、均方差
		m[i] = mat_mean.at<double>(0, 0);

	}
	target_index = compare_max(m[0], m[1], m[2], m[3]);
	Rect mask(int(pos[target_index].x), int(pos[target_index].y), size.width, size.height);
	//rectangle(image, mask, Scalar(100, 100, 255));

	//计算旋转角度
	Point p1(box_min.center.x, box_min.center.y);
	Point p2(pos[target_index]);
	double numble = 180 / CV_PI * (atan2(p2.y - p1.y, p2.x - p1.x));

	if (numble > 0)
	{
		numble = 360 - abs(numble);
	}
	if (numble < 0)
	{
		numble = abs(numble);
	}
	cout << "角度 = " << numble << endl;
	return 0;
}

//比较四个数，返回最小数的下标
int compare_min(double val1, double val2, double val3, double val4)
{
	if (val1 <= val2 && val1 <= val3 && val1 <= val4)
	{
		return 0;
	}
	if (val2 <= val1 && val2 <= val3 && val2 <= val4)
	{
		return 1;
	}
	if (val3 <= val2 && val3 <= val1 && val3 <= val4)
	{
		return 2;
	}
	if (val4 <= val1 && val4 <= val3 && val4 <= val2)
	{
		return 3;
	}
}

//比较四个数，返回最大数的下标
int compare_max(double val1, double val2, double val3, double val4)
{
	if (val1 >= val2 && val1 >= val3 && val1 >= val4)
	{
		return 0;
	}
	if (val2 >= val1 && val2 >= val3 && val2 >= val4)
	{
		return 1;
	}
	if (val3 >= val2 && val3 >= val1 && val3 >= val4)
	{
		return 2;
	}
	if (val4 >= val1 && val4 >= val3 && val4 >= val2)
	{
		return 3;
	}
}

//比较矩形的四个点，返回矩形左上方的点坐标
Point cp(Point pos1, Point pos2, Point pos3, Point pos4)
{
	int add1 = pos1.x + pos1.y;
	int add2 = pos2.x + pos2.y;
	int add3 = pos3.x + pos3.y;
	int add4 = pos4.x + pos4.y;
	int temp = compare_min(add1, add2, add3, add4);
	if (temp == 0)
		return pos1;
	if (temp == 1)
		return pos2;
	if (temp == 2)
		return pos3;
	if (temp == 3)
		return pos4;
}

```
### 图片显示代码
```
import cv2

# 全局变量
g_window_name = "img"  # 窗口名
g_window_wh = [800, 600]  # 窗口宽高

g_location_win = [0, 0]  # 相对于大图，窗口在图片中的位置
location_win = [0, 0]  # 鼠标左键点击时，暂存g_location_win
g_location_click, g_location_release = [0, 0], [0, 0]  # 相对于窗口，鼠标左键点击和释放的位置

g_zoom, g_step = 1, 0.1  # 图片缩放比例和缩放系数
g_image_original = cv2.imread("result.jpg")  # 原始图片，建议大于窗口宽高（800*600）
g_image_zoom = g_image_original.copy()  # 缩放后的图片
g_image_show = g_image_original[g_location_win[1]:g_location_win[1] + g_window_wh[1], g_location_win[0]:g_location_win[0] + g_window_wh[0]]  # 实际显示的图片


# 矫正窗口在图片中的位置
# img_wh:图片的宽高, win_wh:窗口的宽高, win_xy:窗口在图片的位置
def check_location(img_wh, win_wh, win_xy):
    for i in range(2):
        if win_xy[i] < 0:
            win_xy[i] = 0
        elif win_xy[i] + win_wh[i] > img_wh[i] and img_wh[i] > win_wh[i]:
            win_xy[i] = img_wh[i] - win_wh[i]
        elif win_xy[i] + win_wh[i] > img_wh[i] and img_wh[i] < win_wh[i]:
            win_xy[i] = 0
    # print(img_wh, win_wh, win_xy)


# 计算缩放倍数
# flag：鼠标滚轮上移或下移的标识, step：缩放系数，滚轮每步缩放0.1, zoom：缩放倍数
def count_zoom(flag, step, zoom):
    if flag > 0:  # 滚轮上移
        zoom += step
        if zoom > 1 + step * 20:  # 最多只能放大到3倍
            zoom = 1 + step * 20
    else:  # 滚轮下移
        zoom -= step
        if zoom < step:  # 最多只能缩小到0.1倍
            zoom = step
    zoom = round(zoom, 2)  # 取2位有效数字
    return zoom


# OpenCV鼠标事件
def mouse(event, x, y, flags, param):
    global g_location_click, g_location_release, g_image_show, g_image_zoom, g_location_win, location_win, g_zoom
    if event == cv2.EVENT_LBUTTONDOWN:  # 左键点击
        g_location_click = [x, y]  # 左键点击时，鼠标相对于窗口的坐标
        location_win = [g_location_win[0], g_location_win[1]]  # 窗口相对于图片的坐标，不能写成location_win = g_location_win
    elif event == cv2.EVENT_MOUSEMOVE and (flags & cv2.EVENT_FLAG_LBUTTON):  # 按住左键拖曳
        g_location_release = [x, y]  # 左键拖曳时，鼠标相对于窗口的坐标
        h1, w1 = g_image_zoom.shape[0:2]  # 缩放图片的宽高
        w2, h2 = g_window_wh  # 窗口的宽高
        show_wh = [0, 0]  # 实际显示图片的宽高
        if w1 < w2 and h1 < h2:  # 图片的宽高小于窗口宽高，无法移动
            show_wh = [w1, h1]
            g_location_win = [0, 0]
        elif w1 >= w2 and h1 < h2:  # 图片的宽度大于窗口的宽度，可左右移动
            show_wh = [w2, h1]
            g_location_win[0] = location_win[0] + g_location_click[0] - g_location_release[0]
        elif w1 < w2 and h1 >= h2:  # 图片的高度大于窗口的高度，可上下移动
            show_wh = [w1, h2]
            g_location_win[1] = location_win[1] + g_location_click[1] - g_location_release[1]
        else:  # 图片的宽高大于窗口宽高，可左右上下移动
            show_wh = [w2, h2]
            g_location_win[0] = location_win[0] + g_location_click[0] - g_location_release[0]
            g_location_win[1] = location_win[1] + g_location_click[1] - g_location_release[1]
        check_location([w1, h1], [w2, h2], g_location_win)  # 矫正窗口在图片中的位置
        g_image_show = g_image_zoom[g_location_win[1]:g_location_win[1] + show_wh[1], g_location_win[0]:g_location_win[0] + show_wh[0]]  # 实际显示的图片
    elif event == cv2.EVENT_MOUSEWHEEL:  # 滚轮
        z = g_zoom  # 缩放前的缩放倍数，用于计算缩放后窗口在图片中的位置
        g_zoom = count_zoom(flags, g_step, g_zoom)  # 计算缩放倍数
        w1, h1 = [int(g_image_original.shape[1] * g_zoom), int(g_image_original.shape[0] * g_zoom)]  # 缩放图片的宽高
        w2, h2 = g_window_wh  # 窗口的宽高
        g_image_zoom = cv2.resize(g_image_original, (w1, h1), interpolation=cv2.INTER_AREA)  # 图片缩放
        show_wh = [0, 0]  # 实际显示图片的宽高
        if w1 < w2 and h1 < h2:  # 缩放后，图片宽高小于窗口宽高
            show_wh = [w1, h1]
            cv2.resizeWindow(g_window_name, w1, h1)
        elif w1 >= w2 and h1 < h2:  # 缩放后，图片高度小于窗口高度
            show_wh = [w2, h1]
            cv2.resizeWindow(g_window_name, w2, h1)
        elif w1 < w2 and h1 >= h2:  # 缩放后，图片宽度小于窗口宽度
            show_wh = [w1, h2]
            cv2.resizeWindow(g_window_name, w1, h2)
        else:  # 缩放后，图片宽高大于窗口宽高
            show_wh = [w2, h2]
            cv2.resizeWindow(g_window_name, w2, h2)
        g_location_win = [int((g_location_win[0] + x) * g_zoom / z - x), int((g_location_win[1] + y) * g_zoom / z - y)]  # 缩放后，窗口在图片的位置
        check_location([w1, h1], [w2, h2], g_location_win)  # 矫正窗口在图片中的位置
        # print(g_location_win, show_wh)
        g_image_show = g_image_zoom[g_location_win[1]:g_location_win[1] + show_wh[1], g_location_win[0]:g_location_win[0] + show_wh[0]]  # 实际的显示图片
    cv2.imshow(g_window_name, g_image_show)


# 主函数
if __name__ == "__main__":
    # 设置窗口
    cv2.namedWindow(g_window_name, cv2.WINDOW_NORMAL)
    # 设置窗口大小，只有当图片大于窗口时才能移动图片
    cv2.resizeWindow(g_window_name, g_window_wh[0], g_window_wh[1])
    cv2.moveWindow(g_window_name, 700, 100)  # 设置窗口在电脑屏幕中的位置
    # 鼠标事件的回调函数
    cv2.setMouseCallback(g_window_name, mouse)
    cv2.waitKey()  # 不可缺少，用于刷新图片，等待鼠标操作
    cv2.destroyAllWindows()


```
