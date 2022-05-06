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
 class Login {
     constructor() {
         this.$('#btn').addEventListener('click', this.clickFn.bind(this));
     }
     clickFn() {
         let forms = document.forms[0].elements;
         let username = forms.user.value,
             password = forms.password.value;
         let er = document.querySelector('.msg-wrap');
         if (!username.trim() || !password.trim()) { //trim去空格
             throw new Error('用户名或密码不为空');
         }
         axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
         let data = `username=${username}&password=${password}`;
         axios.post('http://localhost:8888/users/login', data).then(res => {
             let { status, data } = res;
             console.log(data);

             if (status == 200) { //请求成功
                 //登录成功
                 if (data.code == 0) { //账号或密码有误
                     er.style.visibility = 'visible';
                     return;
                 }
                 if (data.code == 1) { //登录成功
                     er.style.visibility = 'hidden';
                     console.log(data);
                     localStorage.setItem('token', data.token);
                     localStorage.setItem('user_id', data.user.id);
                     localStorage.setItem('user_nikename', data.user.nickname);
                     //  到哪里
                     //  console.log(location.search.split('=')[1]);
                     //  window.location.href
                     location.assign(location.search.split('=')[1]);
                 }
             }
         });
     }
     $(tag) {
         let res = document.querySelectorAll(tag);
         return res.length == 1 ? res[0] : res;
     }

 }
 new Login;