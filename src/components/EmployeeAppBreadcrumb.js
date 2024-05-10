import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { employeeRoutes } from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const EmployeeAppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, employeeRoutes) => {
    const currentRoute = employeeRoutes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, employeeRoutes)
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

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/employee/dashboard">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem {...(breadcrumb.active ? { active: true } : {})} key={index}>
            <Link to={breadcrumb.pathname}>Here is {breadcrumb.name} </Link>
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(EmployeeAppBreadcrumb)
