import Vue from 'vue'
import Router from 'vue-router'
import langChoose from '@/components/langChoose'
import wiki from '@/components/wiki'
import main from '@/components/wiki/main'
import article from '@/components/wiki/article'

Vue.use(Router)

export default new Router({
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
          path: 'Main_Page',
          component: main
        },
        {
          path: ':article',
          component: article
        }
      ]
    }
  ]
})
