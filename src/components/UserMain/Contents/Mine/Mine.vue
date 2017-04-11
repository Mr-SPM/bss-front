<template>
  <div class="mine">
    <h1>个人信息
    </h1>
    <h3 class="info_bar">你好！ {{userInfo.UserName}}</h3>
    <button class="LoginBtn" v-on:click='logout'>注销</button>
  </div>
</template>

<script>
  import router from 'router';
  import UserService from 'service/userservice';
  export default {
    name: 'mine',
    data() {
      return {
        userInfo: {
          UserName: this.$store.state.currentUser.userName
        }
      };
    },
    methods: {
      logout() {
        UserService.logout().then((rs) => {
          rs = rs.body;
          if (rs.Status) {
            this.$store.commit('resetCurrentUser');
            router.push({
              path: '/'
            });
          }
        });
      }
    }
  };

</script>

<style>
  .LoginBtn {
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 115px;
    height: 35px;
    font-size: 0.8rem;
    border: 1px solid;
    margin-bottom: 14px;
    border-radius: 10px;
    background-color: #09bb07;
    color: #fff
  }
  .info_bar {
    font-size:0.9rem;
    height:50px;
    line-height:50px;
  }

</style>
