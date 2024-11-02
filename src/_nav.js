import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAvTimer,
  cilBarChart,
  cilBell,
  cilCalculator,
  cilCarAlt,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilFactory,
  cilGarage,
  cilHandPointDown,
  cilInbox,
  cilList,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPowerStandby,
  cilPushchair,
  cilPuzzle,
  cilReportSlash,
  cilSchool,
  cilShareBoxed,
  cilSignLanguage,
  cilSpeedometer,
  cilStar,
  cilStorage,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Operations',
  },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Customers',
  //   to: '/customers',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  // }, 
  // {
  //   component: CNavItem,
  //   name: 'Analytics',
  //   to: '/analytics',
  //   icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Markets',
    to: '/markets',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Market Groups',
    to: '/marketgroups',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Analytics',
    to: '/analytics',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Multiple',
        to: '/analytics/multiple',
      },
      {
        component: CNavItem,
        name: 'Solo',
        to: '/analytics/solo',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Customers',
        to: '/customers/view',
      },
      {
        component: CNavItem,
        name: 'Advanced Search',
        to: '/customers/advanced/search',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Promotions',
    to: '/promotions/flayers',
    icon: <CIcon icon={cilReportSlash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Promotions',
        to: '/promotions/all',
      },{
        component: CNavItem,
        name: 'Flayers',
        to: '/promotions/flayers',
      },
      
    ],
  },
  {
    component: CNavGroup,
    name: 'Marketing',
    to: '/marketing',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Zeuler',
        to: '/marketing/all',
      },
      {
        component: CNavItem,
        name: 'AppFlyer',
        to: '/marketing/app/flayer/all',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Virtual',
    to: '/virtual/flayers',
    icon: <CIcon icon={cilShareBoxed} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Reference',
        to: '/virtual/reference',
      },{
        component: CNavItem,
        name: 'Virtual Market',
        to: '/virtual/markets',
      },{
        component: CNavItem,
        name: 'Virtual Products',
        to: '/virtual/products',
      },
      
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Products',
  //   to: '/products',
  //   icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  // },
  {
    component: CNavGroup,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Products',
        to: '/products/view',
      },
      {
        component: CNavItem,
        name: 'Categories',
        to: '/products/categories',
      },
      {
        component: CNavItem,
        name: 'Create Category',
        to: '/products/createcategory',
      },
      {
        component: CNavItem,
        name: 'Change Category Tree',
        to: '/products/categorytree',
      },
      {
        component: CNavItem,
        name: 'Change Sub Categories',
        to: '/products/categorystructure',
      },
      {
        component: CNavItem,
        name: 'Registered Categories',
        to: '/products/registered/categories',
      },
      {
        component: CNavItem,
        name: 'Category Structure',
        to: '/products/main/category/structure',
      },
      {
        component: CNavItem,
        name: 'DB Category Structure',
        to: '/products/db/main/category/structure',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pickers',
    to: '/picker',
    icon: <CIcon icon={cilHandPointDown} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Picker',
        to: '/picker/view',
      },
      {
        component: CNavItem,
        name: 'Vat Management',
        to: '/picker/vat',
      },
      // {
      //   component: CNavItem,
      //   name: 'Receipts',
      //   to: '/picker/receipt',
      // },
      {
        component: CNavItem,
        name: 'Payout',
        to: '/picker/payout',
      },
      {
        component: CNavItem,
        name: 'Market Management',
        to: '/picker/marketmanagement',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Driver',
    to: '/driver',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Drivers',
        to: '/driver/view',
      },
      {
        component: CNavItem,
        name: 'Vat Management',
        to: '/driver/drivervat',
      },
      // {
      //   component: CNavItem,
      //   name: 'Receipts',
      //   to: '/picker/receipt',
      // },
      {
        component: CNavItem,
        name: 'Payout',
        to: '/driver/payoutdriver',
      },
      {
        component: CNavItem,
        name: 'GroupManagement',
        to: '/driver/groupmanagement',
      },
    ],
  },
  ,
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/order',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Orders',
        to: '/order/view',
      },
      {
        component: CNavItem,
        name: 'Batches',
        to: '/order/batches',
      },
      {
        component: CNavItem,
        name: 'Grocery Groups',
        to: '/order/grocerygroup',
      },
      {
        component: CNavItem,
        name: 'GroceryList',
        to: '/order/grocery/list',
      },
      // {
      //   component: CNavItem,
      //   name: 'GroupManagement',
      //   to: '/driver/groupmanagement',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Solo Delivery',
    to: '/solocouriers',
    icon: <CIcon icon={cilSignLanguage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Orders',
        to: '/order/view',
      },
      {
        component: CNavItem,
        name: 'Batches',
        to: '/solocouriers/all',
      },
      {
        component: CNavItem,
        name: 'View In Map',
        to: '/solocouriers/map',
      }
    ],
  }
  ,
  {
    component: CNavGroup,
    name: 'Pickup',
    to: '/order',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Pickup Area',
        to: '/list/pickerarea',
      },
      {
        component: CNavItem,
        name: 'View Pickup Areas',
        to: '/list/view',
      },
    ],
  }
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Base',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
