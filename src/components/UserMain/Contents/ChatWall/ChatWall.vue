<template>
  <div class="chatWalls">
    <div class="title">
      <span class="themeName">{{theme}}</span>
    </div> 
    <div class="record_list">
    <div class="loadMore_footer" v-on:click='loadMore' v-show='totalCount > page.PageIndex * page.PageSize'>点击加载更多…</div>
      <div class="record_list_item" v-for='item in chats'>
        <!--<div class="user-information-left">
          <em class="user-select-icon"></em>
        </div>-->
        <div class="user-information" v-bind:class="{'self':(currentUserId == item.UserId)}">
          <p class="user-info">{{item.UserName}} :</p>
          <p class="user-message">{{item.Message}}</p>
        </div>
        <div class="user-information-next"></div>
      </div>
    </div>
    <EditArea v-on:MessagePost='getLatestChatList'></EditArea>
  </div>
</template>

<script>
  import ChatService from 'service/chatservice';
  import EditArea from './components/EditArea/EditArea';
  export default {
    name: 'chatWalls',
    data() {
      return {
        theme: '主题',
        chats: [],
        totalCount: 0,
        page: {
          PageIndex: 1,
          PageSize: 10
        },
        currentUserId: 0
      };
    },
    created: function () {
      this.currentUserId = this.$store.state.currentUser.userId;
      // 暂时写死1
      ChatService.getThemeInfo({
        themeId: this.$route.params.id
      }).then((rs) => {
        rs = rs.body;
        if (rs.Status) {
          this.theme = rs.Data.Title;
        }
      });
      let req = {
        ThemeId: this.$route.params.id,
        Page: {
          PageSize: 10,
          PageIndex: 1
        }
      };
      ChatService.getChatList(req).then((rs) => {
        rs = rs.body;
        if (rs.Status) {
          this.chats = rs.Data.list.reverse();
          console.log(this.chats);
          this.totalCount = rs.Data.totalCount;
          setTimeout(function () {
            document.getElementsByClassName('record_list')[0].scrollTop = document.getElementsByClassName('record_list')[0].scrollHeight;
            console.log(document.getElementsByClassName('record_list')[0].scrollHeight);
          }, 0);
        }
      });
      // 服务器推送事件的 Comet技术
      // var chat = new EventSource('/ChatApi/CreatedChat');
      // chat.onmessage = function (event) {
      //   console.log('chatBegin');
      //   var msg = event.data;
      //   this.chats.push(msg);
      // };
    },
    components: {
      EditArea
    },
    methods: {
      getLatestChatList: function () {
        let req = {
          ThemeId: this.$route.params.id,
          Page: {
            PageSize: 10,
            PageIndex: 1
          }
        };
        ChatService.getChatList(req).then((rs) => {
          rs = rs.body;
          if (rs.Status) {
            this.chats = rs.Data.list.reverse();
            console.log(this.chats);
            this.totalCount = rs.Data.totalCount;
            setTimeout(function () {
            document.getElementsByClassName('record_list')[0].scrollTop = document.getElementsByClassName('record_list')[0].scrollHeight;
          }, 0);
          }
        });
      },
      loadMore: function () {
        this.page.PageIndex++;
        let req = {
          ThemeId: this.$route.params.id,
          Page: {
            PageSize: 10,
            PageIndex: this.page.PageIndex
          }
        };
        ChatService.getChatList(req).then((rs) => {
          rs = rs.body;
          if (rs.Status) {
            let temp = rs.Data.list.reverse();
            this.chats.unshift(...temp);
            console.log(this.chats, temp);
            this.totalCount = rs.Data.totalCount;
          }
        });
      }
    }
  };

</script>

<style>
  .title {
    text-shadow: 0px 0px 1.5px #ff5400;
    height: 50px;
    line-height: 50px;
    background-color: burlywood
  }
  .themeName {
    font-family:"Microsoft YaHei";
    font-size:1.6rem;
  }
  
  .messageBtn {
    height: 45px;
    line-height: 45px;
    border: 1px dotted;
  }
  
  .record_list {
    bottom: 163px;
    overflow-y: scroll;
    position: fixed;
    top: 50px;
    width: 100%;
  }
  
  .record_list_item {
    padding: 0.25rem 0.30rem;
    border-bottom: 1px solid #dcdcdc;
  }
  
  .user-information-left {
    display: table-cell;
    vertical-align: middle;
    width: 0.68rem;
  }
  
  .user-information {
    vertical-align: middle;
    text-align: left;
    font-size: 0.28rem;
    text-align: left;
  }
  
  .user-info {
    color: #7a78de;
    font-weight: bold;
    padding: 0.2rem;
    text-shadow: 0 0 2px #87bede;
    font-size:0.8rem;
  }
  
  .self {
    text-align: right
  }
  
  .user-message {
    line-height: 1rem;
    color: #8c8c8c;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.7rem;
    padding-left: 20px;
    padding-right: 20px;
    white-space: pre-line;
    margin-top: 5px;
  }
  
  .loadMore_footer {
    padding: .25rem 0;
    font-size: 1rem;
    line-height: 1rem;
    color: #999;
  }

</style>
