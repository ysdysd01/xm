class SetLoop{
    constructor(ele){
        // 接收存储参数
        this.ele = ele;
        // 获取的标签对象
        this.oUl = ele.querySelector('ul');
        this.oOl = ele.querySelector('ol');
        this.oD = ele.querySelector('div');
        this.oUllis = ele.querySelectorAll('ul li');
        // 定义参数
        this.index = 1;
        // 存储自动轮播定时器变量
        this.loopTime = 0;
        // li的默认宽度
        this.oLiwidth = parseInt(window.getComputedStyle(this.oUllis[0]).width );
        // 定义开关变量,防止点击过快
        this.bool = '原始数值';
    }

    //定义方法1
    move(ele, obj, callback) {
        for (let type in obj) {
            // 获取原始定位数据
            let oldVal = parseInt(window.getComputedStyle(ele)[type]);
            // 定义定时器
            let time = setInterval(function () {
                let val = (obj[type] - oldVal) / 5;
                val = val > 0 ? Math.ceil(val) : Math.floor(val);
                oldVal += val;
                ele.style[type] = oldVal + 'px';
                if (oldVal == obj[type]) {
                    clearInterval(time);
                    callback()
                }
            }, 100)
        }
    }
  // 定义方法2 , 设定焦点
  setLi() {
    // 定义变量,存储生成的li标签
    let str = '';
    // 根据原始轮播图,生成焦点按钮
    this.oUllis.forEach(function (item, key) {
        if (key == 0) {
            str += `<li index="${key + 1}" class="active"></li>`;
        } else {
            str += `<li index="${key + 1}" ></li>`;
        }
    });
    this.oOl.innerHTML = str;
}

// 定义方法3 , 复制标签
copyLi() {
    // 1,获取需要复制的标签对象
    let liF = this.oUllis[0];
    let liL = this.oUllis[this.oUllis.length - 1];
 
    // 2,复制标签
    let first = liF.cloneNode(true);
    let last = liL.cloneNode(true);
 
    // 3,写入标签
    this.oUl.appendChild(first);
    this.oUl.insertBefore(last, liF);
 
    // 4,定义ul宽度
    this.oUl.style.width = ((this.oUllis.length + 2) * this.oLiwidth) + 'px';
 
    // 5,定义ul位移
    this.oUl.style.left = -this.oLiwidth + 'px';
}


// 定义方法4,自动轮播
autoLoop() {
    this.loopTime = setInterval( ()=> {
        this.index++;
        // 执行运动函数,改成箭头函数
        this.move(this.oUl, { left: -this.index * this.oLiwidth },  ()=>{
            this.stopLoop();
        })
    }, 3000);
}

// 定义方法5 , 运动终止时,执行的函数
stopLoop() {
    // 1,给开关变量,赋值初始值
    this.bool = '原始数值';
    if (this.index == this.oUllis.length + 1) {
        this.index = 1;
        // 瞬间切换图片
        this.oUl.style.left = (-this.index * this.oLiwidth) + 'px';
    } else if (this.index == 0) {
        this.index = this.oUllis.length;
        this.oUl.style.left = (-this.index * this.oLiwidth) + 'px';
    }
 
    let oOllis = this.ele.querySelectorAll('ol li');
    oOllis.forEach( (item) => {
        // 清除所有的样式
        item.className = '';
        // 给点击的li,添加样式
        if (item.getAttribute('index') == this.index) {
            item.className = 'active';
        }
    })
}

// 定义方法6 , 鼠标移入移出
overOut () {
    this.ele.addEventListener('mouseover',  () =>{
        clearInterval(this.loopTime)
    });
    // 移出,再次执行函数
    this.ele.addEventListener('mouseout',  () =>{
        this.autoLoop();
    });
}

// 定义方法7,焦点按钮切换
focus(){
    // 给ol添加事件
    this.oOl.addEventListener('click' , (e)=>{
        // 如果点击的是li标签
        if(e.target.tagName == 'LI'){
            // 防止点击过快
            if(this.bool !== '原始数值'){
                return;
            }
            this.bool = '非原始数值';
            // 获取点击标签,index的属性,赋值给变量
            this.index = e.target.getAttribute('index')-0;
            // 一定要用move()运动函数,这样才可以再次点击
            this.move(this.oUl, { left: -this.index * this.oLiwidth },  ()=> {
                this.stopLoop();
            })
        }
    })
}

// 定义方法8 , 左右切换
 
leftRight() {
    this.oD.addEventListener('click',  (e)=> {
        // 如果点击的是左切换
        if (e.target.getAttribute('name') == 'left') {
            // 防止过快
            if(this.bool !== '原始数值'){
                return;
            }
            this.bool = '非原始数值';
            // index数值--
            this.index--;
            // 一定要用move()运动函数,这样才可以再次点击
            this.move(this.oUl, { left: -this.index * this.oLiwidth },  ()=> {
                this.stopLoop();
            })
        }else if(e.target.getAttribute('name') == 'right'){
            // 防止过快
            if(this.bool !== '原始数值'){
                return;
            }
            this.bool = '非原始数值';
            // index数值++
            this.index++;
            // 一定要用move()运动函数,这样才可以再次点击
            this.move(this.oUl, { left: -this.index * this.oLiwidth },  ()=> {
                this.stopLoop();
            })
        }
    })
}

// 定义方法9 , 页面隐藏
hidden(){
    // 当 页面显示变化时
    // 此处是特殊的页面显示状态事件,必须是document,不能改的
    document.addEventListener('visibilitychange' , ()=>{
        // 如果隐藏,清除定时器,不执行自动轮播
        if(document.visibilityState === 'hidden'){
            clearInterval(this.loopTime);
        // 如果显示,继续执行自动轮播
        }else if(document.visibilityState === 'visible'){
            this.autoLoop();
        }
    })
}
}