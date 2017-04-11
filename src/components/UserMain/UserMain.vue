<template>
  <div id="userMain">
    <router-view></router-view>
    <Functions v-bind:funcs='funcs' v-on:clickItem='funcsClick'></Functions>
  </div>
</template>

<script>
  import router from 'router';
  import Functions from './Functions/Functions';
  export default {
    name: 'userMain',
    data() {
      return {
        funcs:
          // 从后端获取
          [{
              key: 'MainIndex',
              description: '留言墙'
            },
            {
              key: 'Game',
              description: '游戏区'
            },
            {
              key: 'Mine',
              description: '我'
            }
          ]
      };
    },
    components: {
      Functions
    },
    methods: {
      funcsClick: function (name) {
        router.push(`/UserMain/${name}`);
      }
    },
    created: function() {
      router.push('/UserMain/MainIndex');
    }
  };

</script>

<style>
#userMain {
  height: 100%;
}
</style>
