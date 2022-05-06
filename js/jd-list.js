class List {
    constructor() {
        this.current = 1;
        this.partPage = 5;
        this.page;
        this.getData(1);

        this.$('.page_num').addEventListener('click', this.getCurrent.bind(this));
        this.$('.sk_bd ul').addEventListener('click', this.addCartFn.bind(this));

        this.bindEve();
    }
    bindEve() {
        this.$('.pageSure').addEventListener('click', this.pageInFn.bind(this));
    }
    pageInFn() {
        let pageIn = parseInt(this.$('.pageIn').value);
        if (pageIn) {
            if (pageIn <= this.page) {
                this.getData(pageIn)
            }
        }
    }
    pn(pages) {
        let pageNum = this.$('.page_num');
        let html = `<a href="#" class="pn-prev">&lt;&lt; 上一页</a>`;
        console.log(pages);
        if (pages + 5 < this.page) {
            if (pages <= 2) {
                for (var i = 1; i <= 6; i++) {
                    if (pages == i) {
                        html += `<a href="#" class="current" data-id="${i}">${i}</a>`;
                    } else { html += `<a href="#" data-id="${i}">${i}</a>`; }
                }
            } else {
                for (var i = pages - 2; i <= pages + 3; i++) {
                    if (pages == i) {
                        html += `<a href="#" class="current" data-id="${i}">${i}</a>`;
                    } else { html += `<a href="#" data-id="${i}">${i}</a>`; }
                }
            }

        } else {
            for (var i = this.page - 5; i <= this.page; i++) {
                if (pages == i) {
                    html += `<a href="#" class="current" data-id="${i}">${i}</a>`;
                } else { html += `<a href="#" data-id="${i}">${i}</a>`; }
            }

        }

        html += ` <a href="#" class="dotted">...</a>
        <a href="#" class="pn-next">下一页&gt;&gt;</a>`;
        console.log(html);
        pageNum.innerHTML = html;
    }
    getCurrent(eve) {
        console.log(this.page);
        let ye = this.current;
        if ((eve.target.dataset.id - 0)) {
            this.current = Number(eve.target.dataset.id);
            console.log(123389);
            this.getData(this.current);
            return;
        } else {
            if (eve.target.classList[0] == 'pn-prev') {
                if (this.current <= 1) {
                    this.current = 1;
                } else {
                    this.current = ye - 1;
                }
                console.log('1233' + this.current);
            }
            if (eve.target.classList[0] == 'pn-next') {
                if (this.current < this.page) {
                    this.current = this.current + 1;

                } else {
                    this.current = this.page;
                }
            }
            this.getData(this.current)
        }
    }
    async getData(value) {
        let { data, status } = await axios.get('http://localhost:8888/goods/list?current=' + parseInt(value));
        var res1 = await axios.get('http://localhost:8888/goods/list');
        this.page = res1.data.total - 1;
        this.$('.pageAll').innerHTML = res1.data.total - 1;
        this.pn(value);
        if (status == 200) {
            console.log(data);
            let html = '';
            data.list.forEach(goods => {
                // console.log(goods);
                html += `<li class="sk_goods" data-id="${goods.goods_id}">
                <a href="#"><img src="${goods.img_big_logo}"></a>
                <h5 class="sk_goods_title">${goods.title}</h5>
                <p class="sk_goods_price"><em>￥${goods.current_price}</em> <del>￥${goods.price}</del></p>
                <div class="sk_goods_progress">
                    已售<i>${goods.sale_type}</i>
                    <div class="bar">
                        <div class="bar_in"></div>
                    </div>
                    剩余<em>${goods.goods_number}</em>件
                </div>
                <a href="#none" class="sk_goods_buy">立即抢购</a>
            </li>`;
            });
            this.$('.sk_bd ul').innerHTML = html;
        }
    }

    async addCartFn(eve) {
        // 判断是否登录
        let token = localStorage.getItem('token');

        if (!token) location.assign('../html/jd-denglu.html?ReturnUrl=./jd-list.html');
        // console.log(token);
        if (eve.target.classList.contains('sk_goods_buy')) {
            let liObj = eve.target.parentNode;
            let goodsId = liObj.dataset.id;
            let userId = localStorage.getItem('user_id');
            if (!userId || !goodsId) throw new Error('error');
            axios.defaults.headers.common['authorization'] = token;
            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'; //默json格式,server处理不了
            let param = `id=${userId}&goodsId=${goodsId}`;
            console.log(param);
            let { data, status } = await axios.post('http://localhost:8888/cart/add', param);
            if (status == 200) {
                if (data.code == 1) {
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
                if (data.code == 401) {
                    location.assign('../html/jd-denglu.html?ReturnUrl=./jd-gouwuche.html');
                }
            }
        }
    }
    $(tag) {
        let res = document.querySelectorAll(tag);
        return res.length == 1 ? res[0] : res;
    }
}
new List;