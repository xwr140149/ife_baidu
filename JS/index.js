//1获取页面元素
    var box = document.getElementById("box");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ol = screen.children[1];
    var arr = document.getElementById("arr");
    var arrLeft = arr.children[0];
    var arrRight = arr.children[1];
    //获取ul中的所有图片
    var lisUl = ul.children;
    //获取screen的宽度，这个宽度等于图片宽
    var imgWidth = screen.offsetWidth;
    //设置定时器
    var timer = null;

    //--------------------------点击按钮变色和移动ul效果-------------------
    //2根据图片数量创建下面的小方块
    for (var i = 0; i < lisUl.length; i++) {
        var newLi = document.createElement("li");
        ol.appendChild(newLi);
        //设置newLi的文本
        newLi.innerHTML = i + 1;
    }
    //3设置第一个按钮默认选中效果
    var lisOl = ol.children;
    lisOl[0].className = "current";

    //4给小方块设置点击按钮变色
    for (var i = 0; i < lisOl.length; i++) {
        //给每个按钮设置自定义属性，记录索引值
        lisOl[i].index = i;

        //给每个小方块设置点击事件
        lisOl[i].onclick = function () {
            //判断ul当前的left值，如果当前显示的是假的第一张，我们需要让ul抽回到真的第一张，防止造成滚动
            if (ul.offsetLeft == -(ul.offsetWidth - imgWidth)) {
                //让图片抽回到第一张
                ul.style.left = 0;
            }
            //排他，清除所有人的类名，设置自己
            for (var j = 0; j < lisOl.length; j++) {
                lisOl[j].className = "";
            }
            this.className = "current";
            //让ul运动
            var target = -this.index * imgWidth;
            animate(ul, target);

            //每一次点击小方块的时候，不仅要做上面的事情，还需要同步pic的值
            pic = this.index;
        };
    }

    //克隆第一张图片，放到后面，当作假的第一张
    var weiFirstPic = lisUl[0].cloneNode(true);
    ul.appendChild(weiFirstPic);

    //----------------------------左右按钮点击-----------------w
    //点击左右按钮效果
    //创建一个变量去管理 滚过的图片数量
    var pic = 0;
    arrRight.onclick = play;

    //点击左按钮
    arrLeft.onclick = function () {
        //如果pic已经是0，就不能再向左滚动了，需要调到后面
        if (pic == 0) {
            ul.style.left = -(ul.offsetWidth - imgWidth) + "px";
            pic = lisUl.length - 1;
        }
        pic--;
        //让ul滚动到指定位置
        var target = -pic * imgWidth;
        animate(ul, target);

        //先清除所有ol中li的类名，然后设置自己
        for (var i = 0; i < lisOl.length; i++) {
            lisOl[i].className = "";
        }
        lisOl[pic].className = "current";


    };

    //-----------------------自动播放部分-----------------------
    //设置自动播放
    timer = setInterval(play, 3000);

    //鼠标移入移出盒子。显示隐藏左右箭头
    box.onmouseover = function () {
        arr.style.display = "block";
        //让自动播放停止
        clearInterval(timer);
    };
    box.onmouseout = function () {
        arr.style.display = "none";
        //设置新的自动播放,一定将定时器给到timer身上，不然无法清除
        timer = setInterval(play, 2000);
    };


    function play() {
        //当调用的时候，发现pic已经是lisUl.length-1了，这会儿需要进行抽回
        if (pic == lisUl.length - 1) {
            ul.style.left = 0 + "px";
            pic = 0;
        }
        pic++;
        //让ul滚动到指定位置
        var target = -pic * imgWidth;
        animate(ul, target);


        //在设置点亮之前进行排他
        for (var i = 0; i < lisOl.length; i++) {
            lisOl[i].className = "";
        }
        //如果当前滚到的是假的第一张，需要让lisOl中的第一个按钮点亮
        if (pic == lisUl.length - 1) {
            lisOl[0].className = "current";
        } else {
            //让对应按钮显示，我们发现，需要点亮的按钮的索引跟pic的值相同
            lisOl[pic].className = "current";
        }


    }

    
    function animate(tag, target) {
        clearInterval(tag.timer);
        tag.timer = setInterval(function () {
            //获取box的当前位置
            var leader = tag.offsetLeft;
            var step = ( target - leader ) / 10;
            //由于距离越近，step越小，我们需要在step计算之后对step进行取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            leader = leader + step;
            // 打印leader跟step的值
           // console.log("leader:" + leader + ",step:" + step);
            //将新位置设置给box
            tag.style.left = leader + "px";

            //如果leader==target，清除定时器
            if (leader == target) {
                clearInterval(tag.timer);
            }
        }, 17);
    }



    var login=document.getElementById("login");
    login.onclick=function(){
         loginShow();
    }

  
//     //点击close关闭登陆模态框将登录框中内容重置为默认值并显示滚动条
    document.getElementById("AmodLoginboxclose").onclick=function(){
        document.getElementById("tanchuang").style.display="none";
    }

    var password1=document.getElementById("password1");
    var password2=document.getElementById("password2");
    var loginPlaceholder=document.getElementById("loginPlaceholder");
    var loginname=document.getElementById("loginname");
    loginname.onfocus=function(){
        if(loginPlaceholder.innerHTML=="手机号码或者邮箱地址"){
        loginPlaceholder.innerHTML="";}
        
    };
    loginname.onblur=function(){
        if (loginname.value==""){
            loginPlaceholder.innerHTML="手机号码或者邮箱地址";
        }
        
    };

    password1.onfocus=function(){
        if(password2.innerHTML=="密码"){
        password2.innerHTML="";}
        
    };
    password1.onblur=function(){
        if (password1.value==""){
            password2.innerHTML="密码";
        }
        
    };

    //显示模态框函数
    function loginShow() {
       
        document.getElementById("tanchuang").style.display="block";

    }

