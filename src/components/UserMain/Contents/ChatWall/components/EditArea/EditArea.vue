<template>
  <div class="content">
    <div class="brand">隐藏 ↓</div>
    <div class="btn_area">
      <textarea class="message_area" type="text" placeholder="说点什么吧..." v-model='message'></textarea>
      <button class="addBtn" v-on:click='addChat'>发送</button>
    </div>

  </div>
</template>

<script>
  import ChatService from 'service/chatservice';
  import router from 'router';
  let flag = true;
  export default {
    data() {
      return {
        message: ''
      };
    },
    methods: {
      addChat: function () {
        console.log('提交' + this.message);
        let errorTips = '';
        if (!flag) {
          errorTips = '请勿重复提交！';
        } else if (this.message === '') {
          errorTips = '信息为空，不得发送！';
        }
        if (errorTips !== '') {
          this.$store.state.popModal.renderType = 2;
          this.$store.state.popModal.tips = errorTips;
          return;
        }
        flag = false;
        ChatService.CreatedChat({
          themeId: this.$route.params.id,
          message: this.message
        }).then((rs) => {
          flag = true;
          rs = rs.body;
          if (rs.Status) {
            this.$store.state.popModal.renderType = 1;
            this.$store.state.popModal.tips = '发送成功！';
            this.$emit('MessagePost');
            this.message = '';
          } else {
            this.$store.state.popModal.renderType = 2;
            this.$store.state.popModal.tips = rs.Message;
            if (rs.Message === '尚未登录，请登录后发送信息！') {
              this.$store.state.popModal.endFunc = function () {
                router.push('/');
              };
            }
          }
        });
      }
    }
  };

</script>

<style>
  .content {
    position: fixed;
    bottom: 49px;
    width: 100%;
    height: 120px;
    background: beige;
    left: 0px;
    border-radius: 10px;
    border: 1px dotted;
  }
  
  .message_area {
    position: absolute;
    left: 18px;
    top: 30px;
    width: 12rem;
    height: 72px;
    border: 1px solid;
    border-radius: 5.5px;
    font-size: 0.8rem;
  }
  
  .brand {
    height: 20px;
    background-color: #000;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    color: rgb(207, 215, 234);
    font-size: 0.6rem;
    line-height: 20px;
  }
  
  .addBtn {
    position: absolute;
    left: 14.5rem;
    top: 43px;
    height: 50px;
    line-height: 50px;
    background: cornflowerblue;
    border-radius: 50%;
  }

</style>
