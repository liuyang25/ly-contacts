import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { asyncComponent } from './asyncComponent'
const Home = asyncComponent(() => import('@/pages/home'))
const Detail = asyncComponent(() => import('@/pages/detail'))

export const mainPages: Page[] = [
  {
    component: Home,
    name: 'Home',
    path: '/home',
    // icon: 'home'
  },
  {
    component: Detail,
    name: 'Detail',
    path: '/detail',
  },
]

function renderPages(pages: Page[], defaultPage?: string) {
  const pagesNode = [] //Array<JSX.Element>(); 
  const renderPage = page => {
    if (!page.pages) {
      pagesNode.push(
        <Route
          key={page.path}
          exact={page.exact}
          path={page.path}
          component={page.component}
        />
      )
    } else {
      page.pages.forEach(renderPage)
    }
  }
  pages.forEach(renderPage)

  return (
    <Switch>
      {pagesNode}
      {defaultPage && <Redirect to={defaultPage} />}
    </Switch>
  )
}
export function mainIndex() {
  return renderPages(mainPages, '/home')
}
