//放大镜
class fangdajing {
    //构造方法
    constructor() {
        this.boxObj = document.querySelector('.info_1');
        this.smallObj = this.boxObj.firstElementChild;
        this.bigObj = document.querySelector('#big');
        this.maskObj = this.smallObj.lastElementChild;
        this.imgObj = document.getElementById('img');

        this.bindEve();

        this.bL = this.boxObj.offsetLeft;
        this.bT = this.boxObj.offsetTop;

    }

    bindEve() {
        this.smallObj.onmouseenter = this.enterFn.bind(this);
        this.smallObj.onmouseleave = this.leaveFn.bind(this);
        this.smallObj.onmousemove = this.moveFn.bind(this);
        this.smallObj.onmousemove = this.moveFn.bind(this);
    }
    enterFn() {
        this.maskObj.style.display = 'block';
        this.bigObj.style.display = 'block';
    }
    leaveFn() {
        this.maskObj.style.display = 'none';
        this.bigObj.style.display = 'none';
    }
    moveFn(eve) {

        let cx = eve.pageX,
            cy = eve.pageY;
        let mW = this.maskObj.offsetWidth,
            mH = this.maskObj.offsetHeight;
        let mx = cx - this.bL - mW / 2,
            my = cy - this.bT - mH / 2;
        if (mx < 0) {
            mx = 0;
        }
        if (my < 0) {
            my = 0;
        }
        if (mx > (this.smallObj.offsetWidth - mW)) {
            mx = this.smallObj.offsetWidth - mW;
        }
        if (my > (this.smallObj.offsetHeight - mH)) {
            my = this.smallObj.offsetHeight - mH;
        }
        this.maskObj.style.left = mx + 'px';
        this.maskObj.style.top = my + 'px';

        let tIL = mx * (this.bigObj.offsetWidth / this.maskObj.offsetWidth).toFixed(0);
        let tIT = my * (this.bigObj.offsetHeight / this.maskObj.offsetHeight).toFixed(0);
        // console.log(this.bigObj.offsetHeight / this.maskObj.offsetHeight, this.bigObj.offsetWidth / this.maskObj.offsetWidth);

        this.imgObj.style.left = -tIL + 'px';
        this.imgObj.style.top = -tIT + 'px';
    }
}
new fangdajing;

//选中图片
class ChooseImg {
    constructor() {
        this.Img = document.querySelector('.info_1_img').firstElementChild;
        this.bImg = document.querySelector('.big').firstElementChild;
        this.sLi = document.querySelectorAll('.info_1_suo ul li');

        this.bindEve();
    }
    bindEve() {
        // console.log(this.sLi);
        this.sLi.forEach((li, key) => {
            li.onmouseenter = this.enterFn.bind(this, key);
        })
    }
    enterFn(index) {
        if (index >= 1 && index < this.sLi.length - 1) {
            this.sLi.forEach((li) => {
                li.className = '';
            });
            this.sLi[index].className = 'ac';
            let srcImg = this.sLi[index].firstElementChild.src;
            this.Img.src = srcImg;
            this.bImg.src = srcImg;
        }
    }
}
new ChooseImg;

//加入购物车