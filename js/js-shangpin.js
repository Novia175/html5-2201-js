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

//商品
class Commodities {
    constructor() {
        this.goodId = 5;
        this.getgood();
        this.bindEve();

    }
    bindEve() {
        this.$('.shangPinJieShao_top').addEventListener('mouseover', this.overGoodFn.bind(this));
        this.$('.shangPinJieShao_top div').forEach(good => {
            good.addEventListener('click', this.clickGoodFn.bind(this));
        });
        this.$('.wrap-input').addEventListener('click', this.clickhandler.bind(this));
        this.$('.btn-lg').addEventListener('click', this.addCart.bind(this));
    }
    overGoodFn(eve) {
        if (eve.toElement.parentNode.className == 'shangPinJieShao_top') {
            eve.path[1].querySelectorAll('div').forEach(div => {
                div.classList.value = '';
            })
        }
        if (eve.target.classList == '') {
            eve.target.classList.value = 'changeOn';
        }
    }
    clickGoodFn(eve) {
        eve.target.classList.value = 'changeOn';
        // console.log(eve.target.dataset.id);
        let id = Number(eve.target.dataset.id);
        if (id == 1) {
            console.log(this.$('.intro1').style.display + '1');
            this.$('.intro1').style.display = 'block';
            this.$('.intro2').style.display = 'block';
            this.$('.intro3').style.display = 'block';
            this.$('.intro4').style.display = 'block';
            this.$('.intro5').style.display = 'block';
        } else
        if (id == 2) {
            console.log(this.$('.intro1').style.display + '2');
            this.$('.intro1').style.display = 'none';
            this.$('.intro2').style.display = '';
            this.$('.intro3').style.display = 'block';
            this.$('.intro4').style.display = 'block';
            this.$('.intro5').style.display = 'block';
        } else if (id == 3) {
            console.log(this.$('.intro1').style.display + '3');
            this.$('.intro1').style.display = 'none';
            this.$('.intro2').style.display = 'none';
            this.$('.intro3').style.display = 'block';
            this.$('.intro4').style.display = 'block';
            this.$('.intro5').style.display = 'block';
        } else if (id == 4) {
            console.log(this.$('.intro1').style.display + '4');
            this.$('.intro1').style.display = 'none';
            this.$('.intro2').style.display = 'none';
            this.$('.intro3').style.display = 'none';
            this.$('.intro4').style.display = 'block';
            this.$('.intro5').style.display = 'block';
        } else if (id == 5) {
            console.log(this.$('.intro1').style.display + '5');
            this.$('.intro1').style.display = 'none';
            this.$('.intro2').style.display = 'none';
            this.$('.intro3').style.display = 'none';
            this.$('.intro4').style.display = 'none';
            this.$('.intro5').style.display = 'block';
        }
    }
    async getgood() {
        axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
        let { data, status } = await axios.get('http://localhost:8888/goods/item/' + this.goodId);
        if (status == 200) {
            if (data.code == 1) {
                //商品详情
                let goodIntroduce = this.$('.shangPinJieShao_main');
                goodIntroduce.innerHTML = data.info.goods_introduce;
                console.log(this.$('.lazyimg').children);
                this.$('.lazyimg').children[0].classList.value = 'intro1';
                this.$('.lazyimg').children[1].classList.value = 'intro2';
                this.$('.lazyimg').children[2].classList.value = 'intro3';
                this.$('.lazyimg').children[3].classList.value = 'intro4';
                this.$('.lazyimg').children[4].classList.value = 'intro5';

                let html1 = `<div class="miaoshaInfo_left">京&ensp;东&ensp;价</div>
                <div class="dd">
                    <span class="miaoshaInfo_middle">
                    <span style="font-size: 16px;">￥</span>
                    <span style="font-size: 22px;">${data.info.current_price}</span>
                    </span>
                    <a id="jiangjia">降价通知</a>
                    <div class="old-price">
                    <span><strike>￥${data.info.price}</strike>
                        原价</span>
                    </div>
                    <div class="miaoshaInfo_right clearfix">
                        <p style="font-size: 13px;color: #999;">累计评价</p>
                        <p id="leiji">3000+</p>
                    </div>
                </div>`
                this.$('.miaoshaInfo1').innerHTML = html1;
                let html2 = `<a><b>
                ${data.info.title}</b></a>`;
                this.$('.info_2_tittle').innerHTML = html2;
                this.$('.imgGood').forEach(img => {
                    img.src = data.info.img_big_logo;
                })
            }
        }
        // console.log(data);
    }
    addCart() { //加入购物车
        setTimeout(() => {
            let token = localStorage.getItem('token');
            let userId = localStorage.getItem('user_id');
            axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
            axios.defaults.headers.common['authorization'] = token;
            axios.get('http://localhost:8888/cart/list?id=' + userId).then(res => {
                let { data, status } = res;
                let numed;
                console.log(data);
                if (status == 200) {
                    if (data.code == 401 || !token) { location.assign('../html/jd-denglu.html?ReturnUrl=./jd-shangpin.html'); }
                    if (data.code == 1) {
                        console.log(data.cart.length);
                        let flag = false;
                        for (var i = 0; i < data.cart.length; i++) {
                            console.log(data.cart[i].goods_id);
                            if (data.cart[i].goods_id == this.goodId) {
                                flag = true;
                                numed = data.cart[i].cart_number;
                                break;
                            }
                        }
                        if (flag == true) {
                            let num = Number(this.$('.buy-num').value) + Number(numed);
                            let data1 = `id=${userId}&goodsId=${this.goodId}&number=${num}`;
                            axios.post('http://localhost:8888/cart/number', data1).then(res1 => {
                                let {
                                    data,
                                    status
                                } = res1;
                                if (status == 200) {
                                    console.log(data);
                                    layer.open({
                                        content: '加入购物成功',
                                        btn: ['去购物车结算', '留在当前页面'],
                                        yes: function(index, layero) {
                                            location.assign('./jd-gouwuche.html')
                                        },
                                        btn2: function(index, layero) {
                                            //return false 开启该代码可禁止点击该按钮关闭
                                        }
                                    })
                                }
                            });

                        } else { //加入购物车后修改数量
                            axios.defaults.headers.common['authorization'] = token;
                            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'; //默json格式,server处理不了
                            let param = `id=${userId}&goodsId=${this.goodId}`;
                            console.log(param);
                            axios.post('http://localhost:8888/cart/add', param).then(res2 => {
                                let {
                                    data,
                                    status
                                } = res2;
                                if (status == 200) {
                                    if (data.code == 1) {
                                        let num = Number(this.$('.buy-num').value);
                                        console.log(Number(this.$('.buy-num').value) + '数量');
                                        let data1 = `id=${userId}&goodsId=${this.goodId}&number=${num}`;
                                        console.log(data1);
                                        axios.post('http://localhost:8888/cart/number', data1).then(res3 => {
                                            let {
                                                data,
                                                status
                                            } = res3;
                                            if (status == 200) {
                                                if (data.code == 1) {
                                                    console.log(data);
                                                    layer.open({
                                                        content: '加入购物成功',
                                                        btn: ['去购物车结算', '留在当前页面'],
                                                        yes: function(index, layero) {
                                                            location.assign('./jd-gouwuche.html')
                                                        },
                                                        btn2: function(index, layero) {
                                                            //return false 开启该代码可禁止点击该按钮关闭
                                                        }
                                                    })
                                                }

                                            }
                                        });
                                    }
                                }
                            });

                        }

                    }
                }
            });
        }, 500);
    }
    clickhandler(eve) {
        let { target } = eve;
        let num = Number(eve.path[1].querySelector('input').value);
        if (target.classList.value == "btn-add") {
            num = this.setStep(num + 1);
        }
        if (target.classList.value == "btn-reduce") {
            num = this.setStep(num - 1);
        }

        console.log(target.classList.value, num);
        this.$('.buy-num').value = num;
    }
    setStep(value) {
        if (value <= 1) {
            return 1;
        } else if (value >= 10) {
            return 10;
        } else {
            return value;
        }
    }

    $(tag) {
        let res = document.querySelectorAll(tag);
        return res.length == 1 ? res[0] : res;
    }
}
new Commodities;