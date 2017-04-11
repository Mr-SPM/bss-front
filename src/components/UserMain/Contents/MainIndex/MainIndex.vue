<template>
  <div class="main_index">  
    <div class="themeList-wild">
      <div class="themeList-inside">
        <p class="inside-title">跟我相关的留言墙</p>
        <ul>
          <li class="theme-item important" v-on:click="gotoWall(1)">主会场<span class=" tip-right">go</span></li>
          <li class="theme-item" v-for="item in themeList" v-on:click="gotoWall(item.Id)">{{item.ThemeName}} <span class=" tip-right">go</span></li>
        </ul>
      </div>     
    </div>
    <div class="theme_area">
     <p class="inside-title">创建自己的主题</p>
     <div class="theme_inside">
     <input type="text" class="LoginInput1" placeholder="请编辑主题名"  v-model='themeName' v-on:keyup.enter="createTheme" maxlength=10/>
     <button class="themeBtn" v-on:click="createTheme">创建</button>
     </div>
    </div>
    <div class="theme_area">
     <p class="inside-title">加入主题</p>
     <div class="theme_inside">
     <input type="text" class="LoginInput1" placeholder="请输入主题名"  v-model='themeNameOther' v-on:keyup.enter="joinChat" maxlength=10/>
     <button class="themeBtn" v-on:click="joinChat">加入</button>
     </div>
    </div>
  </div>
</template>

<script>
import ChatService from 'service/chatservice';
import router from 'router';
  export default {
    name: 'mainIndex',
    data() {
      return {
        themeList: [],
        themeName: '',
        themeNameOther: ''
      };
    },
    methods: {
      createTheme: function() {
        if (!this.themeName) {
          this.$store.state.popModal.renderType = 2;
          this.$store.state.popModal.tips = '请输入主题名！';
          return;
        }
        ChatService.CreateChatTheme({themeName: this.themeName}).then((rs) => {
          rs = rs.body;
          if (rs.Status) {
            this.$store.state.popModal.renderType = 1;
            this.$store.state.popModal.tips = '创建成功！';
            this.themeName = '';
            let obj = {
              Id: rs.Data.Id,
              ThemeName: rs.Data.Title,
              IsCreator: true
            };
            this.themeList.push(obj);
          } else {
            this.$store.state.popModal.renderType = 2;
            this.$store.state.popModal.tips = rs.Message;
          }
        });
      },
      gotoWall: function(id) {
        router.push({name: 'ChatWall', params: {id: id}});
      },
      joinChat: function (id) {
        ChatService.CreateUserTheme({themeName: this.themeNameOther}).then((rs) => {
          rs = rs.body;
          if (rs.Status) {
            this.$store.state.popModal.renderType = 1;
            this.$store.state.popModal.tips = '加入成功！';
            console.log(rs.Data);
            let obj = {
              Id: rs.Data.ThemeId,
              ThemeName: this.themeNameOther,
              IsCreator: false
            };
            this.themeList.push(obj);
            this.themeNameOther = '';
          } else {
            this.$store.state.popModal.renderType = 2;
            this.$store.state.popModal.tips = rs.Message;
          }
        });
      }
    },
    created: function () {
      ChatService.GetUserChatThemeList().then((rs) => {
        rs = rs.body;
        if (rs.Status) {
          if (rs.Data.length) {
            this.themeList = rs.Data;
          }
        }
      });
    }
};

</script>

<style>
.main_index {
  height: 100%;
}
.errorTip {
    font-size: 1.2rem;
    text-shadow: 0px 0px 1.5px #ff5400;
    height: 40px;
    line-height: 40px;
}
.themeList-wild {
    border-radius: 10px;
}
.themeList-inside {
    overflow-y: auto; 
}
.inside-title {
  font-size:1.6rem;
  text-shadow: 0px 0px 1.5px #ff5400;
  height: 50px;
  line-height: 50px;
  background-color: burlywood
}
.theme-item {
  border-bottom: 1px solid #dcdcdc;
  height: 40px;
  line-height: 40px;
  font-size: 0.8rem;
}
.tip-right {
    position: relative;
    left: 1rem;
    font-size: 0.6rem;
}
.themeBtn {
    height: 30px;
    width: 60px;
    border-radius: 6px;
    background: cornflowerblue;
}
.theme-inside {
  height: 60px;
  line-height: 60px;
  border-bottom: 1.5px solid #171752;
}
.important {
  color: red;
  font-weight: bold;
}
</style>
