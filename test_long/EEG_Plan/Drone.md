# EEG-Drone简单综述
## SSVEP

| 论文名称 |A Decoding algorithm for Non-invasive SSVEP-based Drone Flight Control|
| -- | -- | 
| 期刊 |2021 IEEE International Conference on Bioinformatics and Biomedicine|
| 方法 |这篇文章对无人机的控制是基于SSVEP分类(人对着电脑实验信号而非飞行器运动信号), 然后下发不同类别对应指令, 不存在控制环路的闭环. 分类方法是一般大小和深度的CNN模型.|
| 成果 |使用基于稳态视觉诱发电位（SSVEP）的BCI模态在三维（3D）空间中控制无人机。用户能够在第一人称视图模式下使用他/她的大脑活动来控制无人机。因此，用户将通过指挥无人机起飞、着陆、前进、停止和右/左转弯，使用BCI系统完全控制飞行。|
| 评价 |我认为对SSVEP实验的分类结果当作无人机控制信号不免丧失控制的意义, 因为这类实验需要注视它们各自的刺激，这限制了用户的视角, 我不认为适合飞行器控制, 但也证明了实时性简单信号CNN分类控制的可能性. |

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220917204017.png#pic_center%20=400x)
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220917204035.png#pic_center%20=400x)
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220917204046.png#pic_center%20=400x)
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220917204100.png#pic_center%20=400x)

---
## MI

| 论文名称 |Asynchronous Motor Imagery Brain-Computer Interface for Simulated Drone Control|
| -- | -- | 
| 期刊 |2021 9th International Winter Conference on Brain-Computer Interface (BCI)|
| 实验 |1. Unity建立仿真环境 2. 采用湿电极作为实验设备 3. 参与者选择执行左手、右手和静止运动图像，分别执行左旋转、右旋转和停止命令。4. 实验是异步进行, 先采集模拟控制信号, 再仿真与键盘控制比较精度. |
| 方法 | 采集的EEG数据在8和36 Hz之间进行带通滤波，并使用滤波器组公共空间模式（FBCSP）提取数据的空间特征。每个滤波器的宽度为4 Hz，共有7个滤波器组。然后使用LDA对提取的数据进行分类。|
| 成果 |在异步方法中，参与者的精神状态被持续考虑以控制无人机，直到无人机返回其初始位置。通过绘制参与者在执行不同运动图像任务时的地形图，比较了使用BCI和键盘驾驶无人机的结果. 使用BCI控制无人机的速度并不比使用键盘时快. 两名参与者都能够在使用键盘时1.5倍的时间内完成使用BCI的2D控制场景。参与者还能够在使用键盘的2倍时间内完成3D场景。|
| 评价 |这篇文章使用异步的实验方法, 我猜也是因为结论里面BCI控制不如键盘控制速度原因导致的, 可以看出即使用传统方法对于无人机控制, BCI设备运行效率仍然不足? 并且文章依旧是用手,脚,舌头等分类信号作为不同控制信号, 我认为这样不符合人的直观控制. 所以会导致控制的不及时? |

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220918084416.png#pic_center%20=400x)

![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220918083606.png#pic_center%20=400x)
![Img](https://imgpool.protodrive.xyz/img/yank-note-picgo-img-20220918084352.png#pic_center%20=400x)

---
## OpenBCI

| 论文名称 |Drone Control Using Electroencephalogram (EEG) Signals|
| -- | -- | 
| 期刊 |SoutheastCon 2022 IEEE|
| 实验 |1.采用OpenBCI设备采集信号 2.使用OpenBCI GUI软件记录和分析脑电图信号 3.从EEG头带记录的数据文件被导出到Matlab，以执行信号调节、特征提取、人工神经网络（ANN）的设计和训练，用于对面部手势进行分类。项目中使用的无人机是手掌大小的DJI Tello无人机。|
| 成果 |选择了三种面部动作来控制无人机的运动，如下所示：扬起眉毛、用力眨眼和向右看。人工神经网络训练的结果在面部手势分类方面取得了97%的准确率。|
| 评价 |用面部动作控制无人机属实有些怪, 有点怪, 再看一眼,还是好怪, 但低价硬件设备值得考虑|

![Img](https://imgpool.protodrive.xyz/img/yank-note_picgo-tmp-file-0285ecaf6bff8a416b6b5226506765c.png#pic_center%20=400x)

---
## VI

| 论文名称 |Intuitive Visual Imagery Decoding for Drone Swarm Formation Control from EEG Signals |
| -- | -- | 
| 期刊 |2021 9th International Winter Conference on Brain-Computer Interface (BCI) |
| 实验 |头戴式显示器，用于控制无人机等无人驾驶飞行器, 使用直观范式,用视觉运动图像作为BCI范式进行四种无人机群编队控制. 接地电极和参比电极分别安装在FPz和FCz位置。电极的所有阻抗均维持在10 kΩ以下。我们以1000 Hz的频率采集脑电图信号。利用Psychtoolbox利用BrainAmp放大器、BrainVision记录仪和Matlab软件构建实验环境并记录脑电图信号。|
|方法|1. 使用带通滤波器和零相位二阶巴特沃斯滤波器对数据进行预处理 2. 使用通用空间模式（CSP）算法作为特征提取方法 3. 在CSP中，将前三列和后三列的对数方差组成的转换矩阵用作特征。采用线性判别分析（LDA）、支持向量机（SVM）、朴素贝叶斯、k-最近邻（KNN）、决策树和集成等方法对4个不同类别的分类方法进行比较。|
| 成果 |有四类：“悬停”、“分裂”、“分散”和“聚集” 4级分类性能的平均值为76.4%，在8到13Hz之间的最高准确度为83%。|
| 评价 |实验方法感觉合理, 效果也还行|

![Img](https://imgpool.protodrive.xyz/img/yank-note_picgo-tmp-file-image.png#pic_center%20=400x)

![Img](https://imgpool.protodrive.xyz/img/yank-note_picgo-tmp-file-UU9V83U0SD3%60CYV6HI~J2AN.png#pic_center%20=400x)

![Img](https://imgpool.protodrive.xyz/img/yank-note_picgo-tmp-file-1663750362810.jpg#pic_center%20=400x)
![Img](https://imgpool.protodrive.xyz/img/yank-note_picgo-tmp-file-1663750431439.png#pic_center%20=400x)

## 补充
### Blender四轴建模
![Img](https://imgpool.protodrive.xyz/img/yank-note_picgo-tmp-file-1663750776861.jpg#pic_center%20=400x)
### Unity建立仿真
![Img](https://imgpool.protodrive.xyz/img/yank-note_picgo-tmp-file-1663751984431.jpg#pic_center%20=400x)
![Img](https://imgpool.protodrive.xyz/img/yank-note_picgo-tmp-file-1663753267504.jpg#pic_center%20=400x)

### MI
当进行运动成像时，人脑在感觉运动皮层中表现出神经活动的变化。这些变化包括两种不同的模式：**事件相关去同步**（ERD），运动成像期间神经活动振荡的减少，以及**事件相关同步**（ERS），运动成像完成后不久神经活动的恢复。这些模式出现在与执行的不同运动图像任务相对应的不同大脑区域。许多BCI应用程序利用这些模式来控制各种设备，如机器人手臂、轮椅和其他各种导航模拟