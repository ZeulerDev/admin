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

import { cilClipboard, cilInfo, cilList, cilNotes, cilPlus } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const AppFlayer = () => {
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
  const [visibleCampaign, setVisibleCampaign] = useState(false)
  const [loadingCampaign, setLoadingCampaign] = useState(false)
  const [campaignData, setCampaignData] = useState([])
  const [campaignCount, setCampaignCount] = useState(0)
  const [loadingSingleUrlCampaign, setLoadingSingleUrlCampaign] = useState(false)
  const [baseLinkId, setBaseLinkId] = useState('')
  const [isHaveMarket, setIsHaveMarket] = useState(false)
  const [marketVisible, setMarketVisible] = useState(false)
  const [singleMarketData, setSingleMarketData] = useState([])
  const [mid, setMid] = useState('')
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
  }, [user, token])

  const loadData = (count, timer) => {
    setLoading(true)
    axios
      .get(BASE_URL + `base/link/all/${count}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res.data.list)
          setLinksListData(res.data.list)
          setResultCount(res.data.count)
          setLoading(false)
          clearTimeout(timer);
          if (res.data.length < 50) {
            setIsDisable(true)
          } else if (res.data.length > 49) {
            setIsDisable(false)
          }
        } else if (res.status === 400) {
          setLoading(false)
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
            message: "Data loading error or  Timeout exceeded",
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
    setVisibleCampaign(false)
    console.log("items", items)
    setItemsData(items)
    if (items.market !== null) {
      console.log("market")
      setMarketData(items.market)
    } else if (items.marketGroup !== null) {
      console.log("marketGroup")
      setMarketGroupData(items.marketGroup)
      const urlParams = new URLSearchParams(items.url.split('?')[1]);
      if (urlParams.has('index')) {
        setIsHaveMarket(true);
        setMid(urlParams.get('index'));
        console.log(urlParams.get('index'));
      }
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
          setLoadingModel(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Product Loading error',
              message: res.data.message
            }
          })
        } else if (res.status === 500) {
          setLoadingModel(false)
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

  const handleCampaign = (id) => {
    setVisibleCampaign(true)
    setLoadingCampaign(true)
    setBaseLinkId(id)
    loadDataCampaign(id)
  }

  useEffect(() => {
    if (loadingCampaign) {
      loadDataCampaign(baseLinkId)
    }
  }, [user, token, paramType])



  const loadDataCampaign = (id) => {
    setLoadingSingleUrlCampaign(true)
    axios
      .get(BASE_URL + `deepLinkUrls/base/all/${id}?type=${paramType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCampaignData(res.data.list)
          // console.log("res", res.data.list)
          setLoadingSingleUrlCampaign(false)

        } else if (res.status === 204) {
          setLoadingSingleUrlCampaign(false)
        } else if (res.status === 500) {
          setLoadingSingleUrlCampaign(false)
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
        setLoadingSingleUrlCampaign(false)
        dispatch({
          type: SET_ALERT,
          payload: {
            status: true,
            title: 'links loading error',
            message: "Data loading error ",
          },
        })
      })
  }

  const handleSingleMarket = (id) => {
    setMarketVisible(true)
    loadMarketData(id)
  }

  const loadMarketData = (id) => {
    axios.get(BASE_URL + `assistant/market/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {

      if (res.status === 200) {
        setSingleMarketData(res.data)
      } else if (res.status === 204) {
        dispatch({
          type: SET_ALERT,
          payload: {
            status: true,
            title: 'Market Data loading error',
            message: res.data.message
          }
        })
      } else if (res.status === 500) {
        dispatch({
          type: SET_ALERT,
          payload: {
            status: true,
            title: 'Market Data loading error',
            message: res.data.message
          }
        })
      }

    }).catch((error) => {
      console.error('Error:', error)
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Market Data loading error',
          message: "Data loading error ",
        },
      })

    })
  }


  return (
    <CContainer>
      <Link to={`/marketing/app/flayer/create`}>
        <CButton style={{ marginLeft: '0%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
          Create URL
        </CButton>
      </Link>
      <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

      </CNavbar>

      {loading ? (
        <div className="d-flex justify-content-center"><CSpinner style={{ marginTop: "15%" }} /></div>
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">URL</CTableHeaderCell>
              <CTableHeaderCell scope="col">Add Campaign</CTableHeaderCell>
              <CTableHeaderCell scope="col">View Campaign</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {LinksListData.length === null ? (
              <CTableRow>
                <CTableDataCell colSpan="4" style={{ textAlign: 'center', backgroundColor: "white" }}>
                  <h6 style={{ marginTop: "1%" }}>No Data</h6>
                </CTableDataCell>
              </CTableRow>
            ) : (
              LinksListData.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
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
                    <Link to={`/marketing/create/marketing/${item.id}`}>
                      <CButton onClick={() => { }} size='sm' style={{ backgroundColor: '#ff4d4d', color: "white" }} variant="outline">
                        <CIcon icon={cilPlus} size='lg' style={{ color: 'white' }} />
                      </CButton>
                    </Link>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton onClick={() => { handleCampaign(item.id) }} size='sm' style={{ backgroundColor: '#ff4d4d', color: "white" }} variant="outline">View</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
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

      <CModal visible={visible} scrollable size="xl" onClose={() => {
        loadDataCampaign(baseLinkId)
        setVisibleCampaign(true)
        setVisible(false)
        setIsHaveMarket(false)
        setMid('')
        setSingleMarketData([])
      }}>
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
                  {
                    isHaveMarket ? <CTableHeaderCell scope="col">Market</CTableHeaderCell> : <></>
                  }
                </CTableRow>
              </CTableHead>
              <CTableBody>

                <CTableRow>
                  <CTableDataCell>#</CTableDataCell>
                  <CTableDataCell>{marketGroupData.name}</CTableDataCell>
                  <CTableDataCell>{marketGroupData.city}</CTableDataCell>
                  {
                    isHaveMarket ? <CTableDataCell> <Link> <CIcon icon={cilInfo} size="xl" onClick={() => { handleSingleMarket(mid) }} /> </Link>
                    </CTableDataCell> : <></>

                  }
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

      <CModal visible={visibleCampaign} scrollable size="xl" onClose={() => {
        setVisibleCampaign(false)
        setSelectedType('All')
        setParamType('')
      }}>
        <CModalHeader closeButton>
          <CModalTitle>Campaign Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CBadge style={{ marginLeft: '74%' }} color="secondary">Filter by</CBadge>
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
          {loadingSingleUrlCampaign ? (
            <div className="d-flex justify-content-center"><CSpinner style={{ marginTop: "5%" }} /></div>
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
                {campaignData.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="4" style={{ textAlign: 'center', backgroundColor: "white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  campaignData.map((item, index) => (
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
                  ))
                )}
              </CTableBody>
            </CTable>
          )}

        </CModalBody>
        <CModalFooter>
        </CModalFooter>

      </CModal>

      <CModal visible={marketVisible} scrollable size="xl" onClose={() => {
        setMarketVisible(false)
       
      }}>
        <CModalHeader closeButton>
          <CModalTitle>Link Market Information</CModalTitle>
        </CModalHeader>
        <CModalBody
          style={{
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
                <CTableDataCell>{singleMarketData.chain?.name}</CTableDataCell>
                <CTableDataCell>{singleMarketData.address}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>

    </CContainer>
  )
}

export default AppFlayer
