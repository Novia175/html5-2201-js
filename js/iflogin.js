class ifLogin {
    constructor() {
        this.token;
        this.login1 = this.$('.login1');
        this.login2 = this.$('.login2');
        this.checkLogin();
        this.bindEve();
    }
    bindEve() {
        if (this.$('.tuichu').length > 1) {
            this.$('.tuichu').forEach(tui => {
                tui.addEventListener('click', this.tuichuFn.bind(this));
            });
        } else {
            this.$('.tuichu').addEventListener('click', this.tuichuFn.bind(this));
        }
    }
    async checkLogin() {
        this.token = localStorage.getItem('token');
        let userId = localStorage.getItem('user_id');
        axios.defaults.headers.common['authorization'] = this.token;
        let cartNum = localStorage.getItem('cartNum');
        let { data } = await axios.get('http://localhost:8888/users/info/:id' + userId);
        if (!this.token || data.code == 401) {
            if (this.login1.length > 1) {
                this.login1.forEach(login11 => {
                    login11.style.display = 'block';
                });
                this.login2.forEach(login12 => {
                    login12.style.display = 'none';
                });
            } else {
                this.login1.style.display = 'block';
                this.login2.style.display = 'none';
            }
            this.$('.cartNum').innerHTML = 0;
        } else {
            let user_name = this.$('.uname');
            let nickname = localStorage.getItem('user_nikename');
            if (this.login2.length > 1) {
                this.login1.forEach(login21 => {
                    login21.style.display = 'none';
                });
                this.login2.forEach(login22 => {
                    login22.style.display = 'block';
                });
                user_name.forEach(uName => {
                    uName.innerHTML = nickname;
                })
            } else {
                this.login1.style.display = 'none';
                this.login2.style.display = 'block';
                user_name.innerHTML = nickname;
                // console.log(user_name);
            }
            // console.log(this.$('.cartNum'));
            this.$('.cartNum').innerHTML = cartNum;

        }
    }
    tuichuFn() {
        localStorage.setItem('token', '');
        localStorage.setItem('user_id', '');
        localStorage.setItem('user_nikename', '');
    }
    $(tag) {
        let res = document.querySelectorAll(tag);
        return res.length == 1 ? res[0] : res;
    }
}

new ifLogin;