import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import { routes } from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  console.log(`currentLocation: ${currentLocation}`)

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  console.log(`breadcrumbs: ${breadcrumbs}`)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem>
        <Link path="/admin/dashboard/">Home</Link>
      </CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem key={index} active={breadcrumb.active}>
            {console.log(`breadcrumb11: ${breadcrumb.name}`)}
            {breadcrumb.active ? (
              breadcrumb.name
            ) : (
              <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
            )}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
