// 秒杀
class Seckill {
    constructor() {
        this.d1 = document.querySelector('.countdesc');
        this.timeEnd = this.d1.firstElementChild;
        this.hh = document.querySelector('.timehour');
        this.mm = document.querySelector('.timeminute');
        this.ss = document.querySelector('.timesecond');
        this.d2 = parseInt(this.timeEnd.innerHTML);

        this.autoPlay();
    }
    autoPlay() {
        setInterval(() => {
            this.miaoFn(this.d2);
        }, 1000)
    }
    miaoFn(d3) {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let Second = date.getSeconds();
        var h = '',
            m = '',
            s = '';

        if (d3 <= hour || d3 >= (hour + 2)) {
            if (hour % 2 == 0) {
                d3 = hour + 2;
                this.timeEnd.innerHTML = d3 + ':00';
            } else {
                d3 = hour + 1;
                this.timeEnd.innerHTML = d3 + ':00';
            }
        }
        Second = 59 - Second;
        minute = 59 - minute;
        hour = d3 - hour - 1;
        h += parseInt(hour / 10);
        h += parseInt(hour % 10);
        m += parseInt(minute / 10);
        m += parseInt(minute % 10);
        s += parseInt(Second / 10);
        s += parseInt(Second % 10);
        if (h != this.hh.innerHTML) {
            this.hh.innerHTML = h;
        }
        if (m != this.mm.innerHTML) {
            this.mm.innerHTML = m;
        }
        if (s != this.ss.innerHTML) {
            this.ss.innerHTML = s;
        }
    }
}
new Seckill;

//轮播
class rotationPlot {
    constructor() {
        this.liObj1 = document.querySelectorAll('#div1 ul li');
        this.liObj2 = document.querySelectorAll('#div1 ol li');
        this.goPrev = document.querySelector('#goPrev');
        this.goNext = document.querySelector('#goNext');
        this.index = 0;
        this.lastIndex = 0;
        this.times;

        this.autoPlay();
        this.bindEve();
        this.change();
    }
    bindEve() {
        this.liObj2.forEach((li, key) => {
            li.onclick = this.clickFn.bind(this, key);
        })
        this.goPrev.onclick = this.goPrevFn.bind(this);
        this.goNext.onclick = this.goNextFn.bind(this);
    }
    goNextFn() {
        this.lastIndex = this.index;
        this.index++;
        if (this.index > this.liObj1.length - 1) {
            this.index = 0;
        }
        this.change();
    }
    goPrevFn() {
        this.lastIndex = this.index;
        this.index--;
        if (this.index < 0) {
            this.index = this.liObj1.length - 1;
        }
        this.change();
    }
    change() {
        this.liObj2[this.lastIndex].className = '';
        this.liObj1[this.lastIndex].className = '';
        this.liObj2[this.index].className = 'ac';
        this.liObj1[this.index].className = 'ac';
    }
    autoPlay() {
        this.times = setInterval(() => {
            this.goNext.onclick();
        }, 3000)
    }
    clickFn(key) {
        this.lastIndex = this.index;
        this.index = key;
        clearInterval(this.times);
        this.change();
        this.autoPlay();
    }
}
new rotationPlot;

//搜索
// class Seek { constructor() {} }
// new Seek;
let input = document.querySelector('.logoSea input');
let ul = document.querySelector('#shelper');
// console.log(input, ul);
let times;
input.oninput = function() {
    clearTimeout(times);
    times = setTimeout(function() {
        search(this.value);
    }.bind(this), 1000)
}

function search(val) {
    let script = document.createElement("script");
    //script.src = "https://search.jd.com/Search?keyword=" + val + "&enc=utf-8&pvid=d23a3005cc974894815eaada680ea148"//京东 已屏蔽 MIME 类型为 text/html 的跨域响应
    script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&json=1&p=3&sid=22084_1436_13548_21120_22036_22073&req=2&csor=0&cb=callback";
    document.head.appendChild(script);
    script.remove();
}

function callback(data) {
    let s = data.s;
    let html = '';
    s.forEach(ele => {
        html += '<li>' + ele + '</li>'
    });
    html += '<li class="close">关闭</li>'
    ul.style.height = '285px';
    ul.innerHTML = html;
}
//input失去焦点
input.onblur = function() {
    ul.style.display = 'none';
    if (input.value == '') {
        let html = '';
        ul.innerHTML = html;
        ul.style.height = '0';
    }
}
input.onfocus = function() {
    ul.style.display = 'block';
}