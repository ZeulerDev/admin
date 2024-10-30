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
  CSpinner,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CBadge,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilAirplay, cilLeaf } from '@coreui/icons'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import { BASE_URL } from '../../../context/config'



const MarketManagement = () => {

  const [visible, setVisible] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [pickerData, setPickerData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [paramCity, setParamCityData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [paramChainId, setParamChainData] = useState('')
  const [isActivate, setActivate] = useState(false)
  const [pickerId, setPickerId] = useState('')
  const [alert, setAlert] = useState(false)

  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [selectedChain, setSelectedChian] = useState('All Chains')

  const [mGroupData, setMGroupData] = useState([])
  const [chainData, setChainData] = useState([])

  const [selectedCityModal, setSelectedCityModal] = useState('All Cities')
  const [selectedChainModal, setSelectedChianModal] = useState('All Chains')
  const [chainDataModal, setChainDataModal] = useState([])
  const [paramCityModal, setParamCityDataModal] = useState('')
  const [paramChainIdModal, setParamChainDataModal] = useState('')
  const [chainMarket, setChainMarketData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [pickerIdModal, setPickerIdModal] = useState('')
  const [marketIdModal, setMarketIdModal] = useState('')
  const [isDisable, setIsDisable] = useState(true)


  useEffect(() => {
    loadMakerGroup()
    loadChain()
  }, [])

  const loadMakerGroup = () => {
    if (token) {
      axios
        .get(BASE_URL + 'market/groups/dropdown/fetch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setMGroupData(res.data)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Market Group Loading error',
                message: res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

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
            setChainData(res.data)
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
    loadPickersData(timer)
    return () => {
      clearTimeout(timer);
    };
  }, [paramCity, paramGroup, paramChainId, alert])

  const loadPickersData = (timer) => {
    if (user && token) {
      setLoading(true)
      axios
        .get(BASE_URL + `assistant/shoppers/:skip?city=${paramCity}&group=${paramGroup}&chain=${paramChainId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setPickerData(res.data)
            setLoading(false)
            setAlert(false)
            clearTimeout(timer)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Error',
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

  const city = (city, type) => {

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

  const marketGroup = (gId, groupName) => {
    if (gId === 'all') {
      setParamGroupData('')
      setSelectedMarketGroup('All Market Groups')
    } else {
      setParamGroupData(gId)
      setSelectedMarketGroup(groupName)
    }
  }

  const chain = (chainId, chianName, type) => {

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

  const handleToggle = (pId, mId) => {
    setParamCityDataModal('')
    setParamChainDataModal('')
    setSelectedCityModal('All Cities')
    setSelectedChianModal('All Chains')
    setVisible(!visible)
    console.log(pId, mId)

    setPickerIdModal(pId)
    setMarketIdModal(mId)
  }

  const handleActivate = () => {


    const data = {
      status: isActivate
    }

    console.log(pickerId, data)

    if (user && token) {
      axios
        .patch(BASE_URL + 'assistant/shopper/status/' + pickerId, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("updated")
            setVisible(false)
            setActivate('')
            setPickerId('')
            setAlert(true)

          } else if (res.status === 203) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker status update error',
                message: res.data.message
              }
            })

          } else if (res.status === 204) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker status update error',
                message: res.data.message
              }
            })

          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker status update error',
                message: res.data.message
              }
            })

          }
        }).catch((error) => {
          console.error(error)

        })
    }
  }


  //modal
  useEffect(() => {
    if (user && token) {
      loadData(0, true)
    }
  }, [paramChainIdModal, paramCityModal, user])

  const loadData = (count, moveNext) => {
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
            setIsDisable(true)
            console.log("ok")
          } else if (res.data.data.length > 19) {
            setIsDisable(false)
          }
          // if(moveNext){
          //   const nextCount = count + res.data.data.length
          //   setItemsPerPage(nextCount)
          // } else {
          //   const nextCount = count - res.data.data.length
          //   if(count < 0){
          //     setItemsPerPage(0)
          //   } else {
          //     setItemsPerPage(nextCount)
          //   }
          // }
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

  const addMarket = (pickerId, marketId,) => {
    if (marketId && pickerId) {
      const formData = {
        market: marketId,
        shopper: pickerId,
      }

      if (user, token) {
        if (user && token) {
          axios
            .post(BASE_URL + 'assistant/picker/assign/market', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                setVisible(false)
                setPickerIdModal('')
                setMarketIdModal('')

                const updatedEntity = res.data
                const list = pickerData.map((ob) => {
                  if (ob.id === updatedEntity.id) {
                    return updatedEntity
                  } else {
                    return ob
                  }
                })
                setPickerData([...list])

                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market Assign',
                    message: 'successfully Market assigned to the picker ',
                    color: 'success'
                  }
                })

              } else if (res.status === 204) {
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
          message: 'Picker Registration error, Please Check the input fields',
          color: 'warning'
        }
      })

    }
  }

  const removeMarket = (pickerId, marketId) => {
    if (marketId && pickerId) {
      const formData = {
        market: marketId,
        shopper: pickerId,
      }

      if (user, token) {
        if (user && token) {
          axios
            .post(BASE_URL + 'assistant/picker/remove/market', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                setVisible(false)
                setPickerIdModal('')
                setMarketIdModal('')

                const updatedEntity = res.data
                const list = pickerData.map((ob) => {
                  if (ob.id === updatedEntity.id) {
                    return updatedEntity
                  } else {
                    return ob
                  }
                })
                setPickerData([...list])
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Market Assign',
                    message: 'successfully Market removed from the picker ',
                    color: 'success'
                  }
                })


              } else if (res.status === 204) {
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
          message: 'Picker Registration error, Please Check the input fields',
          color: 'warning'
        }
      })

    }
  }


  return (
    <CContainer>
      <CBadge style={{ marginLeft: '34%' }} color="secondary">Filter by</CBadge>
      <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
        <CDropdownToggle style={{ color: 'white' }} >{selectedCity}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => city('all', 'view')}>All</CDropdownItem>
          <CDropdownItem onClick={() => city('Milan', 'view')}>Milan</CDropdownItem>
          <CDropdownItem onClick={() => city('Napoli', 'view')}>Napoli</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

      <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
        <CDropdownToggle style={{ color: 'white' }}>{selectedChain}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => chain('all', null, 'view')}>All</CDropdownItem>
          {chainData.map((item, index) => (
            <CDropdownItem onClick={() => chain(item.id, item.name, 'view')} key={index}>
              {item.name}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>

      <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
        <CDropdownToggle style={{ color: 'white' }} >{selectedMarketGroup}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => marketGroup('all')}>All</CDropdownItem>
          {mGroupData.map((item, index) => (
            <CDropdownItem onClick={() => marketGroup(item._id, item.name)} key={index}>
              {item.name}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>

      <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

      </CNavbar>

      {loading ?  <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>: <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Language</CTableHeaderCell>
            <CTableHeaderCell scope="col">Market</CTableHeaderCell>
            <CTableHeaderCell scope="col">Add Market</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {pickerData.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="10" style={{ textAlign: 'center', backgroundColor: "white" }}>
                <h6 style={{ marginTop: "1%" }}>No Data</h6>
              </CTableDataCell>
            </CTableRow>
          ) : (
            pickerData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.surname}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell>{item.contact}</CTableDataCell>
                <CTableDataCell>{item.country === "it" || item.country === 'Italy' ? 'Italy' : item.country}</CTableDataCell>
                <CTableDataCell>{item.city}</CTableDataCell>
                <CTableDataCell>{item.language === 'en' ? 'English' : item.language === 'it' ? 'Italy' : item.language === 'es' ? 'Spanish' : item.language}</CTableDataCell>
                <CTableDataCell>{item.market?.chain?.name} - {item.market.address}</CTableDataCell>
                <CTableDataCell>
                  {item.market?.id ? (
                    <CButton size='sm' onClick={() => handleToggle(item.id, item.market?.id)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Assign</CButton>
                  ) : (
                    <CButton size='sm' onClick={() => handleToggle(item.id, item.market?.id)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Add</CButton>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>

      }


      <CModal visible={visible} scrollable size='xl' onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Market assign view</CModalTitle>

        </CModalHeader>


        <CModalBody>
          <CBadge style={{ marginLeft: '54%' }} color="secondary">Filter by</CBadge>
          <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
            <CDropdownToggle style={{ color: 'white' }} >{selectedCityModal}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => city('all', 'modal')}>All</CDropdownItem>
              <CDropdownItem onClick={() => city('Milano', 'modal')}>Milano</CDropdownItem>
              <CDropdownItem onClick={() => city('Napoli', 'modal')}>Napoli</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
            <CDropdownToggle style={{ color: 'white' }}>{selectedChainModal}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => chain('all', null, 'modal')}>All</CDropdownItem>
              {chainDataModal.map((item, index) => (
                <CDropdownItem onClick={() => chain(item.id, item.name, 'modal')} key={index}>
                  {item.name}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

          </CNavbar>
          {loadingModal ? <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div> : <CTable>
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
                  <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                  <CTableDataCell>{item.chain.name}</CTableDataCell>
                  <CTableDataCell>{item.address}</CTableDataCell>
                  <CTableDataCell>{item.city}</CTableDataCell>
                  <CTableDataCell>{item.scraped}</CTableDataCell>
                  <CTableDataCell>{
                    marketIdModal === item._id ?
                      (
                        <CButton size='sm' onClick={() => removeMarket(pickerIdModal, item._id)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Remove</CButton>
                      ) : (
                        <CButton size='sm' onClick={() => addMarket(pickerIdModal, item._id)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Add</CButton>
                      )
                  }</CTableDataCell>

                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          }


          <CModalFooter>
            <CPagination aria-label="Page navigation example">
              <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
                Previous
              </CPaginationItem>
              <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
            </CPagination>
          </CModalFooter>

        </CModalBody>
      </CModal>


    </CContainer>
  )
}

export default MarketManagement
