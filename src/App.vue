<template>
  <div id="app">
    <div v-show="isError != 0">
      <div class="login_mask"></div>
      <div class="login_Popup">
        <div class="prompt_Popup_time" gi="divtime">{{timeLimit}}秒</div>
        <div v-bind:class="{prompt_Popup_content:isError==1,login_Popup_content:isError==2}" gi="lblErrorMsg">{{message}}</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        isError: false,
        message: '',
        timeLimit: 2
      };
    },
    watch: {
      // vuex 全局检测是否弹窗
      '$store.state.popModal.renderType': function () {
        if (this.$store.state.popModal.renderType !== 0) {
          this.isError = this.$store.state.popModal.renderType;
          this.message = this.$store.state.popModal.tips;
          var timer = setInterval(() => {
            this.timeLimit--;
            if (this.timeLimit === 0) {
              this.isError = 0;
              this.timeLimit = 2;
              this.$store.state.popModal.renderType = 0;
              clearInterval(timer);
              if (this.$store.state.popModal.endFunc !== undefined) {
                this.$store.state.popModal.endFunc();
                this.$store.commit('resetEndFunc');
              }
            }
          }, 1000);
        }
      }
    }
  };

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:100%;
  }
  div {
    font-size:1rem;
    text-align: center;
  }
  .login_mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(204, 204, 204, 0.5);
    z-index: 1;
  }
  
  .login_Popup {
    position: fixed;
    top: 27%;
    left: 50%;
    z-index: 2;
    margin-left: -8.3rem;
    width: 16.5rem;
    height: 5.2rem;
    background: rgba(42, 42, 42, 0.8);
    border-radius: 0.08rem;
  }
  
  .prompt_Popup_time {
    position: absolute;
    right: 0.2rem;
    top: 0.15rem;
    font-size: 0.24rem;
    color: #fff;
  }
  
  .prompt_Popup_content {
    font-size: 0.26rem;
    color: #fff;
    background: url("./assets/prompt_Popup.png") no-repeat center 0.3rem;
    background-size: 2.8rem 2.64rem;
    padding-top: 3.70rem;
  }
  
  .login_Popup_content {
    font-size: 0.26rem;
    color: #fff;
    background: url("./assets/popup_bg.png") no-repeat center 0.5rem;
    background-size: 2.8rem 2.64rem;
    padding-top: 3.70rem;
  }

</style>
