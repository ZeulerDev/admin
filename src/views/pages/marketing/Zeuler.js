import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CNavbar,
  CForm,
  CPagination,
  CPaginationItem,
  CCardImage,
  CSpinner,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'

import { cilClipboard, cilInfo, cilList, cilNotes } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const Zeuler = () => {
  const [visible, setVisible] = useState(false)
  const [visibleCustomer, setVisibleCustomer] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [LinksListData, setLinksListData] = useState([])
  const [orderCustomerDetails, setOrderCustomerDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingModel, setLoadingModel] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [customerData, setCustomerData] = useState([])
  const [itemsData, setItemsData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [isDisable, setIsDisable] = useState(true)
  const [resultCount, setResultCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  const [productData, setProductData] = useState([])
  const [marketData, setMarketData] = useState([])
  const [marketGroupData, setMarketGroupData] = useState([])

  const [selectedType, setSelectedType] = useState('All');
  const [paramType, setParamType] = useState('');

  useEffect(() => {

    const timer = setTimeout(() => {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Data Loading',
          message: 'Data loading error or  Timeout exceeded',
          color: 'warning'
        }
      });
      setLoading(false);
    }, 20000);

    if (user && token) {
      loadData(0, timer)
    }

    return () => {
      clearTimeout(timer);
    };
  }, [user, token, paramType])

  const loadData = (count, timer) => {
    setLoading(true)
    axios
      .get(BASE_URL + `deepLinkUrls/all/${count}?type=${paramType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLinksListData(res.data.list)
          setResultCount(res.data.count)
          setLoading(false)
          clearTimeout(timer);
          if (res.data.length < 50) {
            setIsDisable(true)
          } else if (res.data.length > 49) {
            setIsDisable(false)
          }
        } else if (res.status === 204) {
          setLoading(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Links loading error',
              message: 'No links found',
              color:'info'
            },
          })
        } else if (res.status === 500) {
          setLoading(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'links loading error',
              message: res.data.message,
            },
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
        dispatch({
          type: SET_ALERT,
          payload: {
            status: true,
            title: 'links loading error',
            message: res.data.message,
          },
        })
      })
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    const c = itemsPerPage + 50
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    const c = itemsPerPage - 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handlePages = (page) => {
    setCurrentPage(page);
    const c = (page - 1) * 50;
    setItemsPerPage(c);
    loadData(c, true);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(resultCount / 50);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const startIndex = Math.max(currentPage - 2, 1);
    const endIndex = Math.min(startIndex + 4, totalPages);
    const displayedPageNumbers = pageNumbers.slice(startIndex - 1, endIndex);
    return displayedPageNumbers.map((number) => (
      <CPaginationItem
        key={number}
        active={currentPage === number}
        onClick={() => handlePages(number)}
      >
        {number}
      </CPaginationItem>
    ));
  };

  const handleToggle = (items) => {
    setVisible(!visible)
    setItemsData(items)
    if (items.market !== null) {
      console.log("market")
      setMarketData(items.market)
    } else if (items.marketGroup !== null) {
      console.log("marketGroup")
      setMarketGroupData(items.marketGroup)
    } else if (items.product !== null) {
      console.log("product")
      loadDataMarket(items.product._id)
    }
    // console.log("items", items)
  }

  const handleCustomerToggle = (customer) => {
    setVisibleCustomer(!loadingModal)
    setCustomerData(customer)
  }

  const loadDataMarket = (id) => {
    setLoadingModel(true)
    axios
      .get(
        BASE_URL + `product/view/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setProductData(res.data.list)
          // console.log('data product', res.data.list)
          setLoadingModel(false)
        } else if (res.status === 204) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Product Loading error',
              message: res.data.message
            }
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Product Loading error',
              message: res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error: ', err)
      })
  }

  const filter = (type) => {
    if (type === 'all') {
      setSelectedType('All')
      setParamType('')
    } else if (type === 'Product') {
      setSelectedType(type)
      setParamType('Product')
    } else if (type === 'Market') {
      setSelectedType(type)
      setParamType('Market')
    } else if (type === 'Market Group') {
      setSelectedType(type)
      setParamType('Market Group')
    }
  }

  return (
    <CContainer>
      <Link to={`/marketing/create/marketing`}>
        <CButton style={{ marginLeft: '0%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
          Create URL
        </CButton>
      </Link>
      <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' }}>
        <CDropdownToggle style={{ color: 'white' }}>{selectedType}</CDropdownToggle>
        <CDropdownMenu >
          <CDropdownItem onClick={() => { filter('all') }}>All</CDropdownItem>
          <CDropdownItem onClick={() => { filter('Product') }}>Product</CDropdownItem>
          <CDropdownItem onClick={() => { filter('Market') }}>Market</CDropdownItem>
          <CDropdownItem onClick={() => { filter('Market Group') }}>Market Group</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

      </CNavbar>

      {loading ? (
        <CSpinner />
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">URL</CTableHeaderCell>
              <CTableHeaderCell scope="col">View Details</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {LinksListData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                <CTableDataCell>{item.type}</CTableDataCell>
                <CTableDataCell>{
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>{item.url}</div>
                    <div><CIcon
                      icon={cilClipboard}
                      onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        dispatch({
                          type: SET_ALERT,
                          payload: {
                            status: true,
                            title: 'Copy Success',
                            message: 'URL copied to clipboard',
                            color: 'success',
                          },
                        });
                      }}
                    />

                    </div>
                  </div>

                }</CTableDataCell>
                <CTableDataCell>
                  {
                    item.items === null ?
                      (
                        <CIcon icon={cilInfo} size="xl" />
                      )
                      :
                      (
                        <Link>
                          <CIcon icon={cilInfo} size="xl" onClick={() => handleToggle(item)} />
                        </Link>
                      )
                  }

                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}

      <CPagination aria-label="Page navigation example">
        <CPaginationItem
          disabled={itemsPerPage <= 0 ? true : false}
          onClick={previousPage}
        >
          Previous
        </CPaginationItem>
        {renderPageNumbers()}
        <CPaginationItem
          disabled={isDisable === true ? true : false}
          onClick={nextPage}
        >
          Next
        </CPaginationItem>
      </CPagination>

      <CModal visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Link Information</CModalTitle>
        </CModalHeader>
        <CModalBody
          style={{
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {itemsData.market !== null ? <>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Chain Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                <CTableRow>
                  <CTableDataCell>#</CTableDataCell>
                  <CTableDataCell>{marketData.chain?.name}</CTableDataCell>
                  <CTableDataCell>{marketData.address}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </> : itemsData.marketGroup !== null ? <>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">City</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                <CTableRow>
                  <CTableDataCell>#</CTableDataCell>
                  <CTableDataCell>{marketGroupData.name}</CTableDataCell>
                  <CTableDataCell>{marketGroupData.city}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

          </> : itemsData.product !== null ? <>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Base Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Markup Percentage </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Markup</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Market Address</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                <CTableRow>
                  <CTableDataCell>#</CTableDataCell>
                  <CTableDataCell>{productData.pid}</CTableDataCell>
                  <CTableHeaderCell><CCardImage style={{ width: '50px', height: '50px' }} src={`https://api.zeuler.com/image/` + productData.image} /></CTableHeaderCell>
                  <CTableDataCell>{productData.name}</CTableDataCell>
                  <CTableDataCell>{(productData.price?.basePrice ?? 0).toFixed(2)}</CTableDataCell>
                  <CTableDataCell>{(productData.price?.tax ?? 0).toFixed(2)}</CTableDataCell>
                  <CTableDataCell>{productData.price?.percentage}%</CTableDataCell>
                  <CTableDataCell>{(productData.price?.markup ?? 0).toFixed(2)}</CTableDataCell>
                  <CTableDataCell>{(productData.price?.total ?? 0).toFixed(2)}</CTableDataCell>
                  <CTableDataCell>{productData.brand}</CTableDataCell>
                  <CTableDataCell>{productData.chainName}</CTableDataCell>
                  <CTableDataCell>{productData.marketAddress}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

          </> : <></>}

        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton> */}
        </CModalFooter>
      </CModal>

    </CContainer>
  )
}

export default Zeuler
