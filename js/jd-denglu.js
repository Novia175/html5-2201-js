 //登录
 class Change {
     constructor() {
         this.scanning = document.querySelector(".main-a1");
         this.cipher = document.querySelector(".main-a2");
         this.ma1 = document.getElementById("ma1");
         this.ma2 = document.getElementById("ma2");
         this.a1 = document.getElementById("a1");
         this.a2 = document.getElementById("a2");
         // console.log(this.scanning, this.cipher);
         this.bindEve();
         this.scanningFn();
         this.cipherFn();
     }
     bindEve() {
         this.scanning.onclick = this.scanningFn.bind(this);
         this.cipher.onclick = this.cipherFn.bind(this);
     }
     scanningFn() {
         // console.log(this);
         this.ma1.style.display = "block";
         this.ma2.style.display = "none";
         this.a1.style.color = "red";
         this.a2.style.color = "black";
     }
     cipherFn() {
         // console.log(this);
         this.ma1.style.display = "none";
         this.ma2.style.display = "block";
         this.a1.style.color = "black";
         this.a2.style.color = "red";
     }
 }
 new Change;

 //输入账户密码
 let btn = document.querySelector('#btn'),
     form = document.forms[0];
 console.log(btn, form);
 btn.addEventListener('click', () => {
     // console.log(form);
     let username = form.elements.user.value,
         password = form.elements.password.value;

     if (!username.trim() || !password.trim()) { //trim去空格
         throw new Error('用户名或密码不为空');
     }
     if (!isNaN(parseInt(username))) { // isNaN为真表示非数字开头
         throw new Error('用户名不能以数字开头');
     }
     if (password.length < 6 || password.length > 20) {
         throw new Error('密码长度不符合要求,长度必须在6~20之间');
     }

     let data = `username=${username}&password=${password}`;
     ajax(data);
     //  console.log(data);
 })

 function ajax(data) {
     let xhr = new XMLHttpRequest();
     xhr.open('post', 'http://localhost:8888/users/login');
     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
     xhr.send(data);
     console.log(data);
     xhr.onload = function() {
         // console.log(xhr.response);
         let res = JSON.parse(xhr.response);
         console.log(res, res.code, res.user.nickname);
         let er = document.querySelector('.msg-wrap');
         setTimeout(() => {
             if (res.code == 0) { //账号或密码有误
                 er.style.visibility = 'visible';
                 return;
             }
             if (res.code == 1) { //登录成功
                 er.style.visibility = 'hidden';
                 window.location.href = "../html/jd-index.html?nickname=" + res.user.nickname;
             }

         }, 500);
     }
 }