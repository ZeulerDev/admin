import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const location = useLocation()
  const [batchId, setBatchId] = useState(null);

  const getBatchIdFromPath = (pathname) => {
    // console.log('called',pathname)
    const parts = pathname.split('/');
    // console.log('called',parts)
    const batch = parts.indexOf('batches');
    if(batch !== -1) {
      // console.log('called',batch)
      const batchIndex = parts.indexOf('orders');
      if (batchIndex !== -1) {
        const id = parts[batchIndex + 1];
        console.log('called',id)
        return id;
      } else {
        return null;
      }
    }
  
  };

  useEffect(() => {
    const id = getBatchIdFromPath(currentLocation);
    
    if (id) {
      setBatchId(id);
    }
  }, [currentLocation]);

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    if (currentRoute) {
      return currentRoute.name
    }

    const parts = pathname.split('/').filter(Boolean);
    let routePath = ''
    let paramName = ''

    for (const part of parts) {
      routePath += `/${part}`;
      const matchedRoute = routes.find((route) => {
        const routeParts = route.path.split('/').filter(Boolean);

        if (routeParts.length === parts.length) {
          return routeParts.every((routePart, index) => {
            return routePart === parts[index] || routePart.startsWith(':')
          });
        }

        return false
      });

      if (matchedRoute) {
        return matchedRoute.name;
      }
    }

    return false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      // console.log('batch ID',batchId)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          // pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  // console.log('breadcrumbs',breadcrumbs)
  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem {...(breadcrumb.active ? { active: true } : {})} key={index}>
            {breadcrumb.active ? (
              breadcrumb.name
            ) : (
             
              // <Link  to={breadcrumb.pathname}>{breadcrumb.name}</Link>
              <Link   to={batchId ? `/order/batches/market/${batchId}` : breadcrumb.pathname}>{breadcrumb.name}</Link>
            )}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)

// <CBreadcrumbItem
          //   {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}key={index} >
          //    {breadcrumb.name} 
          // </CBreadcrumbItem>
          // import routes from '../routes'

// import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

// const AppBreadcrumb = () => {
//   const currentLocation = useLocation().pathname
   
//   const getRouteName = (pathname, routes) => {
//     const currentRoute = routes.find((route) => route.path === pathname)
//     return currentRoute ? currentRoute.name : false
//   }

//   const getBreadcrumbs = (location) => {
//     const breadcrumbs = []
//     location.split('/').reduce((prev, curr, index, array) => {
//       const currentPathname = `${prev}/${curr}`
//       const routeName = getRouteName(currentPathname, routes)
//       routeName &&
//         breadcrumbs.push({
//           pathname: currentPathname,
//           name: routeName,
//           active: index + 1 === array.length ? true : false,
//         })
//       return currentPathname
//     })
//     return breadcrumbs
//   }

//   const breadcrumbs = getBreadcrumbs(currentLocation)

//   return (
//     <CBreadcrumb className="my-0">
//       <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
//       {breadcrumbs.map((breadcrumb, index) => {
//         console.log(breadcrumb.pathname)
//         return (
          
//           <CBreadcrumbItem {...(breadcrumb.active ? { active: true } : {})} key={index}>
//           {breadcrumb.active ? (
//             breadcrumb.name
//           ) : (
//             <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
//           )}
//         </CBreadcrumbItem>
//         )
//       })}
//     </CBreadcrumb>
//   )
// }

// export default React.memo(AppBreadcrumb)