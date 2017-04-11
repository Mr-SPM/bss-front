<template>
  <div class="login">
    <img src="./logo.jpg" v-on:click="logOut">
    <h1>{{msg}}</h1>
    <div v-show='renderType'>
      <input class="LoginInput" type="text" v-model='loginInfo.loginName' placeholder="请输入用户名"  autocomplete="on" />
      <input class="LoginInput" type="password" v-model='loginInfo.passWord' placeholder="请输入密码" v-on:keyup.enter="login">
      <button class="LoginBtn" v-on:click='login'>登录</button>
      <span class="Message" v-on:click='changeRenderType'>还没有帐号？点击注册</span>
      <!--<button v-on:click='showPop'>显示弹窗</button>-->
    </div>
    <div v-show='!renderType'>
      <input class="LoginInput" type="text" v-model='registerInfo.loginName' placeholder="请输入用户名" />
      <input class="LoginInput" type="text" v-model='registerInfo.CName' placeholder="请输入昵称" />
      <input class="LoginInput" type="password" v-model='registerInfo.passWord1' placeholder="请输入密码" />
      <div>
        <input class="LoginInput1" v-bind:class="{icon:(registerInfo.passWord1 && registerInfo.passWord1==registerInfo.passWord2)}"
          type="password" v-model='registerInfo.passWord2' placeholder="请确认密码" v-on:keyup.enter="register" />
      </div>
      <button class="LoginBtn" v-on:click='register'>注册</button>
      <span class="Message" v-on:click='changeRenderType'>已有帐号？点击登录</span>
    </div>
  </div>
</template>

<script>
  import router from 'router';
  import UserService from 'service/userservice';
  import StorageService from 'service/localstorageAPI';
  let flag = true;
  export default {
    name: 'login',
    data() {
      return {
        msg: '欢迎使用彩蛋系统',
        loginInfo: {
          loginName: StorageService.fetch().loginName || '',
          passWord: ''
        },
        registerInfo: {
          loginName: '',
          CName: '',
          passWord1: '',
          passWord2: ''
        },
        renderType: true,
        errorMsg: ''
      };
    },
    methods: {
      changeRenderType: function () {
        this.loginInfo = {
          loginName: '',
          passWord: ''
        };
        this.registerInfo = {
          loginName: '',
          CName: '',
          passWord1: '',
          passWord2: ''
        };
        this.renderType = !this.renderType;
      },
      login: function () {
        let errorTips = '';
        if (!flag) {
          errorTips = '请勿重复提交！';
        } else if (this.loginInfo.loginName === '') {
          errorTips = '请输入用户名！';
        } else if (this.registerInfo.passWord === '') {
          errorTips = '请输入密码！';
        }
        flag = false;
        if (errorTips !== '') {
          this.$store.state.popModal.renderType = 2;
          this.$store.state.popModal.tips = errorTips;
          return;
        }
        var obj = {
          Name: this.loginInfo.loginName,
          Password: this.loginInfo.passWord
        };
        UserService.login(obj).then((rs) => {
          rs = rs.body;
          flag = true;
          if (rs.Status) {
            this.$store.commit('setCurrentUser', rs.Data);
            rs.Data.loginName = obj.Name;
            StorageService.save(rs.Data);
            router.push({
              path: '/UserMain'
            });
          } else {
            this.$store.state.popModal.renderType = 2;
            this.$store.state.popModal.tips = rs.Message;
          }
        });
      },
      register: function () {
        let errorTips = '';
        if (!flag) {
          errorTips = '请勿重复提交！';
        } else if (this.registerInfo.loginName === '') {
          errorTips = '请输入用户名！';
        } else if (this.registerInfo.CName === '') {
          errorTips = '请输入昵称！';
        } else if (this.registerInfo.passWord1 === '' || this.registerInfo.passWord1.length < 6) {
          errorTips = '请输入密码,最少6位！';
        } else if (this.registerInfo.passWord2 === '') {
          errorTips = '请输入确认密码！';
        } else if (this.registerInfo.passWord2 !== this.registerInfo.passWord1) {
          errorTips = '2次密码输入不相同，请重新输入！';
        }
        flag = false;
        if (errorTips !== '') {
          this.$store.state.popModal.renderType = 2;
          this.$store.state.popModal.tips = errorTips;
          return;
        }
        let obj = {
          name: this.registerInfo.loginName,
          passWord: this.registerInfo.passWord2,
          CName: this.registerInfo.CName
        };
        UserService.register(obj).then((rs) => {
          rs = rs.body;
          flag = true;
          if (rs.Status) {
            this.$store.commit('setCurrentUser', rs.Data);
            rs.Data.loginName = obj.Name;
            StorageService.save(rs.Data);
            this.$store.state.popModal.renderType = 1;
            this.$store.state.popModal.tips = '注册成功！';
            this.$store.state.popModal.endFunc = function () {
              router.push('/UserMain');
            };
          } else {
            this.$store.state.popModal.renderType = 2;
            this.$store.state.popModal.tips = rs.Message;
          }
        });
        // this.$http.post('local/UserApi/Register', obj).then(
        //   function (result) {
        //     console.log('1');
        //   }
        // );
      },
      logOut: function () {
        router.push('/');
      },
      showPop: function () {
        this.$store.state.popModal.renderType = 1;
        this.$store.state.popModal.tips = '注册成功！';
        this.$store.state.popModal.endFunc = function () {
          alert('弹窗出来了吗？');
        };
      }
    }
    // computed: {
    //   isSamePswd: function () {
    //     if (this.registerInfo.passWord1 && this.registerInfo.passWord2) {
    //       if (this.registerInfo.passWord1 === this.registerInfo.passWord2) {
    //         return '2次密码相同';
    //       } else {
    //         return '输入有误！';
    //       }
    //     } else {
    //       return '';
    //     }
    //   }
    // }
  };

</script>

<style>
  .login{
    position:fixed;
    top:10%;
    width:100%;
  }
  .LoginInput {
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid;
    border-radius: 7px;
    margin-bottom: 20px;
    height: 35px;
    font-size:1rem;
  }
  
  .LoginBtn {
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 115px;
    height: 35px;
    border: 1px solid;
    margin-bottom: 14px;
    border-radius: 10px;
    background-color: #09bb07;
    color: #fff
  }
  
  .Message {
    font-size: 0.87rem;
    display: block;
    color: tomato;
  }
  
  .LoginInput1 {
    text-align: center;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid;
    border-radius: 7px;
    margin-bottom: 20px;
    height: 35px;
    font-size:1rem;
  }
  
  .icon {
    background-image: url('./bg_ok_1.png');
    background-repeat: no-repeat;
    background-position: center right;
  }
  h1 {
    font-size:1.8rem;
    font-weight:bold;
    line-height:1.8rem;
    padding:0.8rem;
  }
</style>
