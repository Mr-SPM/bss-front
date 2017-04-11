import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
export default {
  register(registerInfo) {
    return Vue.http.post('/UserApi/Register', registerInfo);
  },
  login(loginInfo) {
    return Vue.http.post('/UserApi/Login', loginInfo);
  },
  logout() {
    return Vue.http.post('/UserApi/Logout');
  },
  getCurrentUser() {
    return Vue.http.get('/UserApi/GetCurrentUser');
  }
};
