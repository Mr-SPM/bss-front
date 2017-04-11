import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
export default {
    getThemeInfo(themeId) {
        return Vue.http.post('/ChatApi/GetThmemInfo', themeId);
    },
    getChatList(req) {
        return Vue.http.post('/ChatApi/GetChatList', req);
    },
    CreatedChat(req) {
        return Vue.http.post('/ChatApi/CreatedChat', req);
    },
    CreateChatTheme(req) {
        return Vue.http.post('/ChatApi/CreateChatTheme', req);
    },
    CreateUserTheme(req) {
        return Vue.http.post('/ChatApi/CreateUserTheme', req);
    },
    GetUserChatThemeList(req) {
        return Vue.http.get('/ChatApi/GetUserChatThemeList', req);
    }

};
