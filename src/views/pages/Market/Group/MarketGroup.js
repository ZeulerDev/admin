import React, { useEffect, useState } from 'react'
import {
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CNavbar,
  CForm,
  CPagination,
  CPaginationItem,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavGroup,
  CSpinner,
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CModalFooter,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../../context/AppContext'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilInfo, cilLocationPin, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import { SET_ALERT } from '../../../../context/context_reducer'
import { BASE_URL } from '../../../../context/config'

const MarketGroup = () => {
  const [{ user, token }, dispatch] = useAppContext()
  const [paramCity, setParamCityData] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [marketGroupData, setMarketGroupData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [isDisable, setIsDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [marketGroupId, setMarketGroupId] = useState('')
  const [visibleName, setVisibleName] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [nameDisplay, setNameDisplay] = useState('')

  const [visibleAssignMarket, setVisibleAssignMarket] = useState(false)
  const [gId, setGid] = useState('')
  const [assignMarkets, setAssignMarkets] = useState([])
  const [loadingMarketModal, setLoadingMarkerModal] = useState(false)

  const [visibleMarkets, setVisibleMarkets] = useState(false)
  const [chainDataModal, setChainDataModal] = useState([])
  const [paramCityModal, setParamCityDataModal] = useState('')
  const [selectedCityModal, setSelectedCityModal] = useState('All Cities')
  const [paramChainId, setParamChainData] = useState('')
  const [paramChainIdModal, setParamChainDataModal] = useState('')
  const [selectedChainModal, setSelectedChianModal] = useState('All Chains')
  const [selectedChain, setSelectedChian] = useState('All Chains')
  const [loadingModal, setLoadingModal] = useState(false)
  const [chainMarket, setChainMarketData] = useState([])
  const [isDisableMarket, setIsDisableMarket] = useState(true)
  const [itemsPerPageMarket, setItemsPerPageMarket] = useState(0)
  const [marketIds, setMarketIds] = useState([])

  const city = (city) => {
    if (city === 'all') {
      setParamCityData('')
      setSelectedCity('All Cities')
    } else {
      setParamCityData(city)
      setSelectedCity(city)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Data Loading',
          message: 'Data loading error: Timeout exceeded',
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
  }, [user, paramCity])

  const loadData = (count, timer) => {
    setLoading(true)
    axios
      .get(BASE_URL + `market/groups/fetch/${count}?city=${paramCity}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.status)
        if (res.status === 200) {
          setMarketGroupData(res.data)
          setLoading(false)
          clearTimeout(timer)
          if (res.data.length < 20) {
            setIsDisable(true)
            console.log('ok')
          } else if (res.data.length > 19) {
            setIsDisable(false)
          }
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Makrket Group loading error',
              message: res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error:', err)
      })
  }

  const nextPage = () => {
    const c = itemsPerPage + 20
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    const c = itemsPerPage - 20
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handleToggle = (id) => {
    setVisible(!visible)
    setMarketGroupId(id)
  }

  const deleteMarketGroup = (id) => {
    console.log(id)
    axios
      .delete(
        BASE_URL + `marketgroup/` + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Market Group Delete',
              message: 'Market Group Delete Success',
              color: 'success'
            }
          })
          setVisible(false)
          loadData(0, true)
          console.log('Remove Market Group')

        } else if (res.status === 203) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Market Group Delete',
              message: res.data.message,
              color: 'warning'
            }
          })
        } else if (res.status === 404) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Market Group Delete',
              message: res.data.message,
              color: 'warning'
            }
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Market Group Delete',
              message: res.data.message,
              color: 'warning'
            }
          })
        }
      }).catch((err) => {
        console.error('Error:', err)
      })

  }

  const handleToggleName = (id, name) => {
    setVisibleName(true)
    setId(id)
    setNameDisplay(name)
    console.log(name)
  }

  const updateName = () => {
    console.log('name', name)
    if (name == '') {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Alert',
          message: 'Please Enter Name',
          color: 'danger'
        }
      })
    } else {
      handleUpdate(id)
    }
  }

  const handleUpdate = (id) => {

    if (id) {

      let formData = {
        name: name,
      }

      console.log(formData, id)

      if (user && token) {
        axios
          .put(BASE_URL + 'marketgroup/update/' + id, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              const updatedEntity = res.data
              const found = marketGroupData.find((f) => f.id === updatedEntity.id)
              if (found) {
                found.name = updatedEntity.name
              }

              setMarketGroupData([...marketGroupData])

              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Market Group Update',
                  message: 'Market group name updated successfully',
                  color: 'success'
                }
              })
              setId('')
              setName('')
              // loadData(0, true)
              setVisibleName(false)
              setNameDisplay('')
            } else if (res.status === 204) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Pick up area update  error',
                  message: res.data.message,
                  color: 'danger'
                }
              })
            } else if (res.status === 500) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Pick up area update  error',
                  message: res.data.message,
                  color: 'danger'
                }
              })
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })

      }
    } else {
      alert('Please Check the Fields!')
    }

  }

  const handleToggleMarket = (id) => {
    console.log('markets', id)
    // const marketIds = [];
    // markets.map((item) => {
    //     marketIds.push(item.id)
    // })
    setVisibleAssignMarket(true)
    // setFid(markets)
    setGid(id)
    loadAssignMarketData(id)
  }

  const loadAssignMarketData = (id) => {
    setLoadingMarkerModal(true)
    axios
      .get(
        BASE_URL + `marketgroup/markets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setAssignMarkets(res.data)
          console.log('data market', res.data)
          setLoadingMarkerModal(false)
        } else if (res.status === 204) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Market Loading error',
              message: res.data.message
            }
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Market Loading error',
              message: res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error: ', err)
      })
  }

  const handleToggleAddMarket = (id) => {
    console.log('markets group', id)
    setGid(id)
    setVisibleMarkets(true)
  }

  const cityMarket = (city, type) => {

    if (type === 'view') {
      if (city === 'all') {
        setParamCityData('')
        setSelectedCity('All Cities')
      } else {
        setParamCityData(city)
        setSelectedCity(city)
      }

    } else if (type === 'modal') {
      if (city === 'all') {
        setParamCityDataModal('')
        setSelectedCityModal('All Cities')
      } else {
        setParamCityDataModal(city)
        setSelectedCityModal(city)
      }
    }
  }

  const chainMarkets = (chainId, chianName, type) => {

    if (type === 'view') {

      if (chainId === 'all') {
        setParamChainData('')
        setSelectedChian('All Chains')

      } else {
        setParamChainData(chainId)
        setSelectedChian(chianName)
      }

    } else if (type === 'modal') {
      if (chainId === 'all') {
        setParamChainDataModal('')
        setSelectedChianModal('All Chains')

      } else {
        setParamChainDataModal(chainId)
        setSelectedChianModal(chianName)
      }
    }


  }

  useEffect(() => {
    loadChain()
  }, [])

  const loadChain = () => {
    if (token) {
      axios
        .get(BASE_URL + 'assistant/market/chains/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // setChainData(res.data)
            setChainDataModal(res.data)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Chain Loading error',
                message: res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  useEffect(() => {
    if (user && token) {
      loadDataMarket(0, true)
    }
  }, [paramChainIdModal, paramCityModal, user])

  const loadDataMarket = (count, moveNext) => {
    setLoadingModal(true)
    axios
      .get(
        BASE_URL + `assistant/market/locations/${count}?brand=${paramChainIdModal}&city=${paramCityModal}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setChainMarketData(res.data.data)

          console.log('data market')
          setLoadingModal(false)
          if (res.data.data.length < 20) {
            setIsDisableMarket(true)
            console.log("ok")
          } else if (res.data.data.length > 19) {
            setIsDisableMarket(false)
          }
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Market Loading error',
              message: res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error: ', err)
      })
  }

  const nextPageMarket = () => {
    const c = itemsPerPageMarket + 20
    setItemsPerPageMarket(c)
    loadDataMarket(c, true)
  }

  const previousPageMarket = () => {
    const c = itemsPerPageMarket - 20
    console.log(c)
    setItemsPerPageMarket(c)
    loadDataMarket(c, false)
  }


  const addMarket = (groupId, marketId,) => {
    if (marketId && groupId) {
      const formData = {
        marketId: marketId,
      }

      if (user, token) {
        if (user && token) {
          axios
            .patch(BASE_URL + 'marketgroup/add/market/' + groupId, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                setVisibleMarkets(false)
                setGid('')
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market Assign',
                    message: 'successfully Market assigned to the market group',
                    color: 'success'
                  }
                })

              } else if (res.status === 400) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market Assign error',
                    message: res.data.message,
                    color: 'warning'
                  }
                })
              } else if (res.status === 404) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market Assign error',
                    message: res.data.message,
                    color: 'warning'
                  }
                })
              } else if (res.status === 500) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market Assign error',
                    message: res.data.message,
                    color: 'warning'
                  }
                })
              }
            })
            .catch((error) => {
              console.error('Error:', error)
            })

        }
      }
    } else {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Error!',
          message: 'check again',
          color: 'warning'
        }
      })
    }
  }


  const removeMarket = (groupId, marketId,) => {
    if (marketId && groupId) {
      const formData = {
        marketId: marketId,
      }

      if (user, token) {
        if (user && token) {
          axios
            .patch(BASE_URL + 'marketgroup/remove/market/' + groupId, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                setVisibleAssignMarket(false)
                setGid('')
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market Assign',
                    message: 'successfully Market remove from the market group',
                    color: 'success'
                  }
                })

              } else if (res.status === 400) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market remove error',
                    message: res.data.message,
                    color: 'warning'
                  }
                })
              } else if (res.status === 404) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market remove error',
                    message: res.data.message,
                    color: 'warning'
                  }
                })
              } else if (res.status === 500) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market remove error',
                    message: res.data.message,
                    color: 'warning'
                  }
                })
              }
            })
            .catch((error) => {
              console.error('Error:', error)
            })

        }
      }
    } else {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Error!',
          message: 'check again',
          color: 'warning'
        }
      })
    }
  }

  return (
    <CContainer>
      <Link to={`/marketgroups/marketmap`}>
        <CButton style={{ marginLeft: '0%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
          Add Market
        </CButton>
      </Link>
      <Link to={`/marketgroups/createmarketgroup`}>
        <CButton style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
          Create Market Group
        </CButton>
      </Link>
      <CBadge style={{ marginLeft: '39%' }} color="secondary">Filter by</CBadge>
      <CDropdown style={{ marginLeft: '2%', width: '17%', marginRight: '5px', backgroundColor: '#ff4d4d' }}>
        <CDropdownToggle style={{ color: 'white' }}>{selectedCity}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
          <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
          <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

      </CNavbar>

      {loading ? <CSpinner /> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Assigned Market</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            <CTableHeaderCell scope="col">Add Markets</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {marketGroupData.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
              <CTableDataCell>
                <span>{item.name}</span>
                <Link to={``}>
                  <CIcon
                    style={{ marginLeft: 20, float: 'right' }}
                    icon={cilPencil}
                    size="sm"
                    onClick={() => handleToggleName(item._id, item.name)}
                  />
                </Link>
              </CTableDataCell>
              {/* <CTableDataCell >{item.name}<Link to={``}><CIcon style={{marginLeft:"10%"}} icon={cilPencil} size="sm" onClick={() => handleToggleName(item._id, item.name)}  /></Link></CTableDataCell> */}
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>
                <CButton onClick={() => { handleToggleMarket(item._id) }} size='sm' style={{ backgroundColor: '#ff4d4d', marginLeft: '5px', color: 'white' }}>
                  view
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <Link to={`/marketgroups/marketdistance/${item._id}`}>
                  <CButton size='sm' style={{ backgroundColor: '#ff4d4d', marginLeft: '5px', color: 'white' }}>
                    view
                  </CButton>
                </Link>
              </CTableDataCell>
              <CTableDataCell>
                <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => handleToggle(item._id)}>
                  <CIcon icon={cilTrash} size='lg' style={{ color: 'white' }} />
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton onClick={() => { handleToggleAddMarket(item._id) }} size='sm' style={{ backgroundColor: '#ff4d4d', color: "white" }} variant="outline">
                  <CIcon icon={cilPlus} size='lg' style={{ color: 'white' }} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      }

      <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>
          Next
        </CPaginationItem>
      </CPagination>

      <CModal alignment="center" visible={visibleName} scrollable size='sm' onClose={() => setVisibleName(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Change Name</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <a>Enter New Name</a><br></br>
          <CFormInput
            type="text"
            placeholder={nameDisplay}
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </CModalBody>
        <CModalFooter>

          <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => updateName()}>Save changes</CButton>
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
        <CModalHeader closeButton={false}>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <a>Are you sure you want to delete this market group?</a><br></br><br></br>
          <div style={{ display: "flex", justifyContent: 'center' }}>
            <CButton onClick={() => deleteMarketGroup(marketGroupId)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
            <CButton onClick={() => setVisible(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
          </div>

        </CModalBody>
      </CModal>

      <CModal alignment="center" visible={visibleAssignMarket} scrollable size='lg' onClose={() => {
        setVisibleAssignMarket(false)
        setGid('')
      }}>
        <CModalHeader closeButton>
          <CModalTitle>All Assign Markets details</CModalTitle>
        </CModalHeader>
        <CModalBody>

          {loadingMarketModal ? <CSpinner /> : <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Chain Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                <CTableHeaderCell scope="col">Remove</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {assignMarkets.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.chain.name}</CTableDataCell>
                  <CTableDataCell>{item.address}</CTableDataCell>
                  <CTableDataCell>{item.city}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size='sm' onClick={() => removeMarket(gId, item._id)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Remove</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          }
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>

      <CModal visible={visibleMarkets} scrollable size='xl' onClose={() => {
        setVisibleMarkets(false)
        setItemsPerPageMarket(0)
        setGid('')
      }}>
        <CModalHeader closeButton>
          <CModalTitle>Market assign view</CModalTitle>

        </CModalHeader>


        <CModalBody>
          <CBadge style={{ marginLeft: '54%' }} color="secondary">Filter by</CBadge>
          <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
            <CDropdownToggle style={{ color: 'white' }} >{selectedCityModal}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => cityMarket('all', 'modal')}>All</CDropdownItem>
              <CDropdownItem onClick={() => cityMarket('Milano', 'modal')}>Milano</CDropdownItem>
              <CDropdownItem onClick={() => cityMarket('Napoli', 'modal')}>Napoli</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
            <CDropdownToggle style={{ color: 'white' }}>{selectedChainModal}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => chainMarkets('all', null, 'modal')}>All</CDropdownItem>
              {chainDataModal.map((item, index) => (
                <CDropdownItem onClick={() => chainMarkets(item.id, item.name, 'modal')} key={index}>
                  {item.name}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

          </CNavbar>
          {loadingModal ? <CSpinner /> : <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {chainMarket.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{itemsPerPageMarket + index + 1}</CTableDataCell>
                  <CTableDataCell>{item.chain.name}</CTableDataCell>
                  <CTableDataCell>{item.address}</CTableDataCell>
                  <CTableDataCell>{item.city}</CTableDataCell>
                  <CTableDataCell>{item.scraped}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size='sm' onClick={() => addMarket(gId, item._id)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Add</CButton>
                  </CTableDataCell>

                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          }


          <CModalFooter>
            <CPagination aria-label="Page navigation example">
              <CPaginationItem disabled={itemsPerPageMarket <= 0 ? true : false} onClick={previousPageMarket}>
                Previous
              </CPaginationItem>
              <CPaginationItem disabled={isDisableMarket === true ? true : false} onClick={nextPageMarket}>Next</CPaginationItem>
            </CPagination>
          </CModalFooter>

        </CModalBody>
      </CModal>

    </CContainer>
  )
}

export default MarketGroup
