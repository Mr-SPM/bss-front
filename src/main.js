// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from 'router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import UserAPI from 'service/userservice';

Vue.use(VueResource);
Vue.use(Vuex);
// 弹窗模块
const popModal = {
  state: {
    renderType: 0,
    tips: '',
    endFunc: undefined
  },
  mutations: {
    resetEndFunc(state) {
      state.endFunc = undefined;
    }
  }
};
// 用户信息模块
const currentUser = {
  state: {
    loginId: 0,
    userId: 0,
    userName: ''
  },
  mutations: {
    setCurrentUser(state, userInfo) {
      state.loginId = userInfo.LoginId;
      state.userId = userInfo.UserId;
      state.userName = userInfo.UserName;
    },
    resetCurrentUser(state) {
      state.loginId = 0;
      state.userId = 0;
      state.userName = '';
    }
  }
};
//  store 装载
const store = new Vuex.Store({
  modules: {
    popModal: popModal,
    currentUser: currentUser
  }
});
//  获取用户信息以防刷新时间丢失
(function (store) {
  UserAPI.getCurrentUser().then((rs) => {
    rs = rs.body;
    store.commit('setCurrentUser', rs.Data);
  });
})(store);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
