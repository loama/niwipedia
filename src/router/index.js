import Vue from 'vue'
import Router from 'vue-router'
import langChoose from '@/components/langChoose'
import wiki from '@/components/wiki'
import wikiarticle from '@/components/wiki/wikiarticle'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'langChoose',
      component: langChoose
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: wiki,
      children: [
        {
          path: ':wikiarticle',
          component: wikiarticle
        }
      ]
    }
  ]
})
