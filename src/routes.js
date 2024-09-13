import React from 'react'

const Products = React.lazy(()=>import('./views/pages/products/Products'))
const Promotion = React.lazy(()=>import('./views/pages/promotions/Promotion'))
const ManageProducts = React.lazy(()=>import('./views/pages/promotions/manageProducts'))
const AddPromotionMarket = React.lazy(()=>import('./views/pages/promotions/AddMarket'))
const AddPromotion = React.lazy(()=>import('./views/pages/promotions/AddPromotion'))
const Flayers = React.lazy(()=>import('./views/pages/promotions/Flayers'))

const DbRegisteredCategory = React.lazy(()=>import('./views/pages/products/DbRegisteredCategory'))
const RegisteredCategory = React.lazy(()=>import('./views/pages/products/RegisteredCategories'))
const MainCategoryStructure = React.lazy(()=>import('./views/pages/products/MainCategoryStructure'))
const ChangeCategoryTree = React.lazy(()=>import('./views/pages/products/ChangeCategoryTree'))
const CategoryStructure = React.lazy(()=>import('./views/pages/products/CategoryStructure'))
const CreateReference = React.lazy(()=>import('./views/pages/products/CreateReference'))
const VirtualProducts = React.lazy(()=>import('./views/pages/products/VirtualProducts'))
const VirtualMarkets = React.lazy(()=>import('./views/pages/products/VirtualMarkets'))
const Categories = React.lazy(()=>import('./views/pages/products/Categories'))
const CreateCategories = React.lazy(()=>import('./views/pages/products/CreateCategory'))

const PickerArea = React.lazy(()=>import('./views/pages/list/CreatePickArea'))
const PickerAreas = React.lazy(()=>import('./views/pages/list/PickupAreas'))

const Analytics = React.lazy(()=>import('./views/pages/analytics/Analytics'))

const GroceryList = React.lazy(()=>import('./views/pages/order/GroceryList'))
const GroceryGroupOrders = React.lazy(()=>import('./views/pages/order/GroceryGroupOrders'))
const GroupOfOrders = React.lazy(()=>import('./views/pages/order/GroupofOrders'))
const BatchMarketOrders = React.lazy(()=>import('./views/pages/order/BatchMarketOrders'))
const BatchOrders = React.lazy(()=>import('./views/pages/order/BatchOrders'))
const BatchMarket = React.lazy(()=>import('./views/pages/order/BatchMarket'))
const Batches = React.lazy(()=>import('./views/pages/order/Batch'))
const Order = React.lazy(()=>import('./views/pages/order/Orders'))

const GroupManagement = React.lazy(()=>import('./views/pages/driver/GroupManagement'))
const PayoutDriver = React.lazy(()=>import('./views/pages/driver/Payout'))
const VatManagementDriver = React.lazy(()=>import('./views/pages/driver/VatManagement'))
const AddDriver = React.lazy(()=>import('./views/pages/driver/AddDriver'))
const Driver = React.lazy(()=>import('./views/pages/driver/Driver'))

const MarketManagement = React.lazy(()=>import('./views/pages/picker/MarketManagement'))
const Payout = React.lazy(()=>import('./views/pages/picker/Payout'))
const PDFReceipt = React.lazy(()=>import('./views/pages/picker/Receipt'))
const VatManagement = React.lazy(()=>import('./views/pages/picker/VatManagement'))
const Picker = React.lazy(()=>import('./views/pages/picker/Picker'))
const AddPicker = React.lazy(()=>import('./views/pages/picker/AddPicker'))

const MarketDistance = React.lazy(()=>import('./views/pages/Market/Group/MarketDistances'))
const MarketMap = React.lazy(()=>import('./views/pages/Market/Group/MarketMap'))
const CreateMarketGroup = React.lazy(()=>import('./views/pages/Market/Group/CreateMarketGroup'))
const MarketGroup = React.lazy(()=>import('./views/pages/Market/Group/MarketGroup'))
const Markets = React.lazy(()=>import('./views/pages/Market/Markets'))
const AddMarket = React.lazy(()=>import('./views/pages/Market/AddMarket'))

const AdvancedSearch = React.lazy(()=>import('./views/pages/Customer/AdvancedSearch'))
const ItemList = React.lazy(()=>import('./views/pages/Customer/ItemList'))
const ProductList = React.lazy(()=>import('./views/pages/Customer/ProductList'))
const OrderList = React.lazy(()=>import('./views/pages/Customer/GroceryList'))
const Customer = React.lazy(()=>import('./views/pages/Customer/Customers'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))


// Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/promotions/products/:id', name: 'Manage Products', element: ManageProducts},
  { path: '/promotions/market/:id', name: 'Market', element: AddPromotionMarket},
  { path: '/promotions/add/promotion', name: 'Register Promotions ', element: AddPromotion},
  { path: '/promotions/flayers', name: 'Flayers ', element: Flayers },
  { path: '/promotions/all', name: 'Promotions ', element: Promotion },
  { path: '/promotions', name: 'Promotion', element: Promotion,exact: true },
  { path: '/products/db/main/category/structure', name: 'DB Category Structure ', element: DbRegisteredCategory },
  { path: '/products/main/category/structure', name: 'Category Structure ', element: MainCategoryStructure },
  { path: '/products/categorytree', name: 'Change Category Tree ', element: ChangeCategoryTree },
  { path: '/products/registered/categories', name: 'Registered Category ', element: RegisteredCategory },
  { path: '/products/categorystructure', name: 'Change Sub Categories ', element: CategoryStructure },
  { path: '/products/createcategory', name: 'Create Category ', element: CreateCategories },
  { path: '/products/virtualreference', name: 'Create Reference ', element: CreateReference },
  { path: '/products/virtualproducts', name: 'Virtual Products ', element: VirtualProducts },
  { path: '/products/virtualmarkets', name: 'Virtual Markets ', element: VirtualMarkets },
  { path: '/products/categories', name: 'Categories ', element: Categories },
  { path: '/products/view', name: 'Products ', element: Products },
  { path: '/products', name: 'Products', element: Products,exact: true },
  { path: '/list/view', name: 'Picker Areas ', element: PickerAreas },
  { path: '/list/pickerarea', name: 'Picker Area ', element: PickerArea },
  { path: '/list', name: 'List', element: PickerAreas,exact: true },
  { path: '/analytics', name: 'Analytics ', element: Analytics },
  { path: '/order/grocery/list', name: 'Grocery List ', element: GroceryList },
  { path: '/order/grocerygroup/orders/:id', name: 'Orders ', element: GroceryGroupOrders },
  { path: '/order/grocerygroup', name: 'Grocery Groups ', element: GroupOfOrders },
  { path: '/order/batches/market/orders/:id/:market', name: 'Orders ', element: BatchMarketOrders },
  { path: '/order/batches/orders/:id', name: 'Orders', element: BatchOrders },
  { path: '/order/batches/market/:id', name: 'Markets', element: BatchMarket },
  { path: '/order/batches', name: 'Batches', element: Batches },
  { path: '/order/view', name: 'View', element: Order },
  { path: '/order', name: 'Orders', element: Order,exact: true },
  { path: '/driver/groupmanagement', name: 'Group', element: GroupManagement },
  { path: '/driver/payoutdriver', name: 'Payout', element: PayoutDriver },
  { path: '/driver/drivervat', name: 'Vat management', element: VatManagementDriver },
  { path: '/driver/adddriver', name: 'Create Driver', element: AddDriver },
  { path: '/driver/view', name: 'View', element: Driver },
  { path: '/driver', name: 'Drivers', element: Driver,exact: true },
  { path: '/picker/marketmanagement', name: 'Market Management', element: MarketManagement },
  { path: '/picker/payout', name: 'Payout', element: Payout },
  { path: '/picker/receipt', name: 'Receipt', element: PDFReceipt },
  { path: '/picker/vat', name: 'Vat Management', element: VatManagement },
  { path: '/picker/view', name: 'View', element: Picker },
  { path: '/picker', name: 'Pickers', element: Picker,exact: true },
  { path: '/picker/addpicker', name: 'CreatePicker', element: AddPicker },
  { path: '/marketgroups/marketdistance/:id', name: 'MarketDistance', element: MarketDistance },
  { path: '/marketgroups/marketmap', name: 'MarketMap', element: MarketMap },
  { path: '/marketgroups/createmarketgroup', name: 'CreateMarketGroup', element: CreateMarketGroup },
  { path: '/marketgroups', name: 'MarketGroup', element: MarketGroup },
  { path: '/markets/addmarket', name: 'AddMarket', element: AddMarket },
  { path: '/markets', name: 'Markets', element: Markets },
  { path: '/customers/advanced/search', name: 'AdvancedSearch', element: AdvancedSearch },
  { path: '/customers/items/:id', name: 'OrderList', element: ItemList },
  { path: '/customers/list/products/:id', name: 'Products', element: ProductList },
  { path: '/customers/list/:id', name: 'Lists', element: OrderList },
  { path: '/customers/view', name: 'Customer', element: Customer },
  { path: '/customers', name: 'Customer', element: Customer,exact: true },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
