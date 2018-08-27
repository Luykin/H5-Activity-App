import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: () =>
        import ('components/index/index')
    },
    {
      path: '/vip',
      name: 'vip',
      component: () =>
        import ('components/vip/vip')
    },
    {
      path: '/iqos',
      name: 'iqos',
      component: () =>
        import ('components/iqos/iqos')
    },
    {
      path: '/fqa',
      name: 'fqa',
      component: () =>
        import ('components/fqa/fqa')
    },
    {
      path: '/video-card',
      name: 'video-card',
      component: () =>
        import ('components/videocard/videocard')
    },
    {
      path: '/video-sucess',
      name: 'video-sucess',
      component: () =>
        import ('components/videosucess/videosucess')
    },
    {
      path: '/video-record',
      name: 'video-record',
      component: () =>
        import ('components/videosucess/videorecord')
    }
  ]
})
