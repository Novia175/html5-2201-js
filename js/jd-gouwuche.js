class Cart {
    constructor() {
        this.token;
        this.step;

        this.checkLogin();
        this.getGoods();

        this.bindEve();
        this.getNumPrice();
    }
    async checkLogin() {
        this.token = localStorage.getItem('token');
        let userId = localStorage.getItem('user_id');
        axios.defaults.headers.common['authorization'] = this.token;
        let { data } = await axios.get('http://localhost:8888/users/info/:id' + userId);
        if (!this.token || data.code == 401) {
            location.assign('../html/jd-denglu.html?ReturnUrl=./jd-gouwuche.html');
        }
    }
    async getGoods() {
        this.token = localStorage.getItem('token');
        let userId = localStorage.getItem('user_id');
        axios.defaults.headers.common['authorization'] = this.token;
        let { data, status } = await axios.get('http://localhost:8888/cart/list?id=' + userId);
        if (status == 200) {
            if (data.code == 401) {
                location.assign('../html/jd-denglu.html?ReturnUrl=./jd-gouwuche.html');
            }
            if (data.code == 1) {
                let html = '';
                localStorage.setItem('cartNum', data.cart.length);
                data.cart.forEach(goods => {
                    html += `
                    <ul  data-id="${goods.goods_id}" class="goods-list">
                        <li class="info_1"><input type="checkbox"  class="good-checkbox" /> </li>
                        <li class="info_2"> <img src="${goods.img_small_logo}" width="80px" /> </li>
                        <li class="info_3"><a>${goods.title}</a></li>
                        <li class="info_5">￥${goods.price}</li>
                        <li class="info_6">
                            <button>-</button>
                            <input type="text" value="${goods.cart_number}" />
                            <button class="bot">+</button>
                        </li>
                        <li class="info_7">￥${(goods.price*goods.cart_number).toFixed(2)}</li>
                        <li>
                            <a class="del" href="#none">删除</a><br />
                            <a>移到我的关注</a>
                        </li>
                    </ul>
                    `
                });
                let info = document.querySelector('.info');
                info.innerHTML = html;
            }
        }
    }
    bindEve() {
        this.$('.info').addEventListener('click', this.distribute.bind(this));
        this.$('.tips input').addEventListener('click', this.allOfThem.bind(this));
        this.$('.balance_ul1 input').addEventListener('click', this.allOfThem.bind(this));
        this.$('.bothDel').addEventListener('click', this.bothDel.bind(this));
        this.$('.allDel').addEventListener('click', this.allDel.bind(this));
    }

    allOfThem(eve) {
        let checked = eve.target.checked;
        let goodsList = this.$('.goods-list');
        console.log(eve.path[3].classList[0]);
        let both;
        if (eve.path[3].classList[0] == 'tips') {
            both = this.$('.balance_ul1 input');
        } else {
            both = this.$('.tips input');
        }
        goodsList.forEach(ul => {
            ul.firstElementChild.firstElementChild.checked = checked;
        })
        both.checked = checked;
        this.getNumPrice();
    }
    getNumPrice() {
        let goods = this.$('.goods-list');
        let n = 0,
            price = 0;

        // let res = goods[Symbol.iterator](); //迭代器
        // res.next()
        goods.forEach(element => {
            let infoNum = parseInt(element.querySelector('.info_6 input').value);
            let infoPrice1 = element.querySelector('.info_5').innerHTML;
            if (element.firstElementChild.firstElementChild.checked) {
                let infoPrice = infoPrice1.replace('￥', '') - 0;
                n = n + infoNum;
                price = price + infoNum * infoPrice;
            }
        });
        price = price.toFixed(2);
        let numObj = document.querySelector('.num span');
        let priceObj = document.querySelector('.price span');

        numObj.innerHTML = n;
        priceObj.innerHTML = '￥' + price;
    }
    distribute(eve) {
        let { target } = eve;
        // 删除

        if (target.classList.contains('del')) {
            this.delFn(target);
        }

        // 判断是否为单个商品选中按钮
        if (target.classList.contains('good-checkbox')) {
            //反选
            if (!target.checked) {
                this.$('.tips input').checked = false;
                return;
            }
            if (target.checked) {
                let res = Array.from(this.$('.good-checkbox')).find(checkbox => {
                    return !checkbox.checked
                })
                if (res == undefined) {
                    this.$('.tips input').checked = true;
                    this.$('.balance_ul1 input').checked = true;
                }
            }
            // 选中商品价格和数量
            this.getNumPrice();
        }
        // 判断是否为计数器
        // console.log(eve);
        if (eve.path[1].classList[0] == 'info_6') {
            this.clickhandler(eve);
        }
    }
    clickhandler(eve) {
        let { target } = eve;
        let goodsId = eve.path[2].dataset.id
        let id = localStorage.getItem('user_id');
        let num = Number(eve.path[1].querySelector('input').value);
        let that = this;

        if (target.nodeName !== "BUTTON") return;
        if (target.textContent === "-") {
            num = this.setStep(num - 1);
        } else {
            num = this.setStep(num + 1);
        }
        setTimeout(() => {
            axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
            let data = `id=${id}&goodsId=${goodsId}&number=${num}`;
            console.log(data);
            axios.post('http://localhost:8888/cart/number', data).then(res => {
                let {
                    data,
                    status
                } = res;
                if (status == 200) {
                    if (data.code == 1) {
                        eve.path[1].querySelector('input').value = num;
                        that.getNumPrice();
                    }
                }
            });
        }, 500);
    }
    setStep(value) {
        console.log(value);
        if (value <= 1) {
            return 1;
        } else if (value >= 10) {
            return 10;
        } else {
            return value;
        }
    }

    delFn(target) {
        let that = this;
        let userId = localStorage.getItem('user_id');
        let layerIndex = layer.confirm('确认删除?', { title: '删除提示' }, function() {
            let ulObj = target.parentNode.parentNode;
            let id = ulObj.dataset.id;
            console.log(id, userId);
            axios.get('http://localhost:8888/cart/remove?id=' + userId + '&goodsId=' + id).then(res => {
                let {
                    data,
                    status
                } = res;
                console.log(data, status);
                if (status == 200) {
                    if (data.code == 1) {
                        layer.close(layerIndex);
                        layer.msg('商品删除成功');
                        ulObj.remove();
                        that.getNumPrice();
                    }
                }
            })
        });
    }

    bothDel() { // 选中全部删除
        let checkAll = this.$('.good-checkbox');
        let userId = localStorage.getItem('user_id');
        let that = this;
        let layerIndex = layer.confirm('确认选中的全部删除?', { title: '删除提示' }, function() {
            checkAll.forEach(checkbox => {
                if (checkbox.checked) {
                    let ulObj = checkbox.parentNode.parentNode;
                    let id = ulObj.dataset.id;
                    axios.get('http://localhost:8888/cart/remove?id=' + userId + '&goodsId=' + id).then(res => {
                        let {
                            data,
                            status
                        } = res;
                        if (status == 200) {
                            if (data.code == 1) {
                                layer.close(layerIndex);
                                layer.msg('商品删除成功');
                                ulObj.remove();
                                that.getNumPrice();
                            }
                        }
                    })
                }
            })
        });

    }

    allDel() { //全部删除
        let userId = localStorage.getItem('user_id');
        let divObj = this.$('.info');
        let that = this;
        let layerIndex = layer.confirm('确认清购物车?', { title: '删除提示' }, function() {
            axios.get('http://localhost:8888/cart/clear?id=' + userId).then(res => {
                let {
                    data,
                    status
                } = res;
                if (status == 200) {
                    if (data.code == 1) {
                        layer.close(layerIndex);
                        layer.msg('清空购物车成功');
                        divObj.remove();
                        that.getNumPrice();
                    }
                }
            })
        });
    }
    $(tag) {
        let res = document.querySelectorAll(tag);
        return res.length == 1 ? res[0] : res;
    }
}

new Cart;