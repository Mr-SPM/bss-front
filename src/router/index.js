import Vue from 'vue';
import Router from 'vue-router';
import Hello from 'components/Hello';
import MyTest from 'components/Mytest';
import Login from 'components/login/Login';
import UserMain from 'components/UserMain/UserMain';
import ChatWall from 'components/UserMain/Contents/ChatWall/ChatWall';
import Game from 'components/UserMain/Contents/Game/Game';
import Mine from 'components/UserMain/Contents/Mine/Mine';
import MainIndex from 'components/UserMain/Contents/MainIndex/MainIndex';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Mytest',
      name: 'MyTest',
      component: MyTest
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/UserMain',
      name: 'UserMain',
      component: UserMain,
      children: [{
          path: 'MainIndex',
          name: 'MainIndex',
          component: MainIndex
        }, {
          path: 'ChatWall/:id',
          name: 'ChatWall',
          component: ChatWall
        },
        {
          path: 'Game',
          name: 'Game',
          component: Game
        },
        {
          path: 'Mine',
          name: 'Mine',
          component: Mine
        }
      ]
    }
  ]
});
