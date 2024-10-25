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

const GroupManagement = () => {
  const [visible, setVisible] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [driverData, setDriverData] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramCity, setParamCityData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [paramChainId, setParamChainData] = useState('')
  const [isActivate, setActivate] = useState(false)
  const [driverId, setDriverId] = useState('')
  const navigate = useNavigate()
  const[alert, setAlert] = useState(false)

  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [selectedChain, setSelectedChian] = useState('All Chains')

  const [mGroupData, setMGroupData] = useState([])
  const [chainData, setChainData] = useState([])

  const[driverIdmodal, setDriverIdModal] = useState('')
  const [driverGroupData, setDriverGroupData] = useState([])
  const [selectedCityModal, setSelectedCityModal] = useState('All Cities')
  const [paramCityModal, setParamCityDataModal] = useState('')
  const [marketGroupData, setMarketGroupData] = useState([])
  const [loadingModal, setLoadingModal] = useState(false)
  const [isDisable, setIsDisable] = useState(true)
  const [itemsPerPage, setItemsPerPage] = useState(0)

  useEffect(() => {
    loadMakerGroup()
    loadChain()
  }, [])

  const loadMakerGroup = () => {
    if (token) {
      axios
        .get(BASE_URL+'market/groups/dropdown/fetch', {
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
                message: res.data.message,
              },
            })
          }
        })
        .catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  const loadChain = () => {
    if (token) {
      axios
        .get(BASE_URL+'assistant/market/chains/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setChainData(res.data)
            setAlert(false)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Chain Loading error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((err) => {
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
    loadDriversData(timer)
    return () => {
      clearTimeout(timer);
    };
  }, [paramCity, paramGroup, paramChainId,alert])

  const loadDriversData = (timer) => {
    if (user && token) {
      setLoading(true)
      axios
        .get(
          BASE_URL+`assistant/riders/test/0?city=${paramCity}&group=${paramGroup}&chain=${paramChainId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setDriverData(res.data)
            setLoading(false)
            clearTimeout(timer)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Error',
                message: res.data.message,
                color: 'warning',
              },
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }

  const city = (city,type) => {

    if(type === 'view'){
      if (city === 'all') {
        setParamCityData('')
        setSelectedCity('All Cities')
      } else {
        setParamCityData(city)
        setSelectedCity(city)
      }

    }else if(type === 'modal'){
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

  const chain = (chainId, chianName) => {
    if (chainId === 'all') {
      setParamChainData('')
      setSelectedChian('All Chains')
    } else {
      setParamChainData(chainId)
      setSelectedChian(chianName)
    }
  }

  const handleToggle = (driverGroups, driverId) => {
    setSelectedCityModal('All Cities')
    setParamCityDataModal('')
    setVisible(!visible)
    setDriverIdModal(driverId)
    setDriverGroupData(driverGroups)
  }

  const handleActivate = () => {
    const data = {
      status: isActivate,
    }
    console.log(isActivate)

    console.log(driverId, data)

    if (user && token) {
      axios
        .patch(BASE_URL+'assistant/rider/status/' + driverId, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('updated', res.data)
            setVisible(false)
            setActivate('')
            setDriverId('')
            const updatedEntity = res.data
            const list = driverData.map((ob) => {
             if(ob.id === updatedEntity.id){
                return updatedEntity
               } else {
              return ob
               }
               })
                 setDriverData([...list])

          } else if (res.status === 203) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Driver status update error',
                message: res.data.message,
              },
            })
          } else if (res.status === 204) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Driver status update error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Driver status update error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  //modal

  useEffect(() => {
    if (user && token) {
      loadModalMarketGroupData(0, true)
    }
  }, [user, paramCityModal])

  const loadModalMarketGroupData = (count, moveNext) => {
    setLoadingModal(true)
    axios
      .get(BASE_URL+`market/groups/fetch/${count}?city=${paramCityModal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMarketGroupData(res.data)
          setLoadingModal(false)
          if (res.data.length < 20) {
            setIsDisable(true)
            console.log("ok")
          } else if (res.data.length > 19) {
            setIsDisable(false)
          }
          
        } else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Makrket Group loading error',
              message : res.data.message
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


  const closeModal = () => {
    console.log('close', driverGroupData)
  }
  const addMarketGroup = (driverId, groupId, ) => {

    console.log('driver id',driverId )
    console.log('group id',groupId )
    if(groupId && driverId ){

      const formData = {
        id: groupId,
        rider: driverId,
      }

      if(user,token){
          if(user && token){
            axios.put(BASE_URL+'assistant/groups/rider/assign', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
                .then((res) => {
                  if (res.status === 200) {
                    setVisible(false)
                    setDriverIdModal('')
                    setDriverGroupData([])
                    console.log(res.data)
                    loadMakerGroup()
                    const timer = setTimeout(() => {
                      setLoading(false);
                    }, 20000);

                    loadDriversData(timer)
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Market Group Assign',
                        message : 'successfully Market Group assigned to the picker ',
                        color:'success'
                      }
                    })

                  } else if (res.status === 204) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Group Assign error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  } else if (res.status === 500) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Group Assign error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  }
                })
                .catch((error) => {
                  console.error('Error:', error)
                })
        
            }
      }
    }else{

      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Error!',
          message : 'Driver group assign error',
          color:'warning'
        }
      })

    }
  }


  const removeMarketGroup = (driverId, groupId, ) => {
    if(groupId && driverId ){
      const formData = {
        id: groupId,
        rider: driverId,
      }

      if(user,token){
          if(user && token){
            axios.put(BASE_URL+'assistant/groups/rider/remove', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
                .then((res) => {
                  if (res.status === 200) {
                    setVisible(false)
                    setDriverIdModal('')
                    setDriverGroupData([])
                    loadMakerGroup()
                    // const updatedEntity = res.data
                    // const list = driverData.map((ob) => {
                    //  if(ob.id === updatedEntity.id){
                    //     return updatedEntity
                    //    } else {
                    //   return ob
                    //    }
                    //    })
                    //      setDriverData([...list])
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Market Group Remove',
                        message : 'successfully Market Group removed from the picker ',
                        color:'success'
                      }
                    })

                  } else if (res.status === 204) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Group remove error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  } else if (res.status === 500) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Group remove error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  }
                })
                .catch((error) => {
                  console.error('Error:', error)
                })
        
            }
      }
    }else{

      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Error!',
          message : 'Driver group assign error',
          color:'warning'
        }
      })

    }
  }
  

  return (
    <CContainer>
       <CBadge style={{ marginLeft: '54%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{ marginLeft: '2%',width:'18%',backgroundColor: '#ff4d4d', color:'white' }}>
          <CDropdownToggle style={{color:'white'}} >{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all','view')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milan','view')}>Milan</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli','view')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        {/* <CDropdown style={{ marginLeft: '2%',width:'18%',backgroundColor: '#ff4d4d', color:'white' }}>
          <CDropdownToggle style={{color:'white'}} >{selectedChain}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
            {chainData.map((item, index) => (
              <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown> */}

        <CDropdown style={{ marginLeft: '2%',width:'18%',backgroundColor: '#ff4d4d', color:'white' }}>
          <CDropdownToggle style={{color:'white'}} >{selectedMarketGroup}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => marketGroup('all')}>All</CDropdownItem>
            {mGroupData.map((item, index) => (
              <CDropdownItem onClick={() => marketGroup(item._id, item.name)} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
        <CNavbar style={{marginTop:'1%'}}  className="bg-body-tertiary">

      </CNavbar>

      {loading ? (
        <CSpinner />
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Country</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Language</CTableHeaderCell>
              <CTableHeaderCell scope="col">Group</CTableHeaderCell>
              <CTableHeaderCell scope="col">Add Market Group</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {driverData.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="10" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
            driverData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.surname}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell>{item.contact}</CTableDataCell>
                <CTableDataCell>
                  {item.country === 'it' || item.country === 'Italy' ? 'Italy' : item.country}
                </CTableDataCell>
                <CTableDataCell>
                  {item.employeeId ? item.employeeId : <CBadge color="warning">Not Provide</CBadge>}
                </CTableDataCell>
                <CTableDataCell>
                  {item.language === 'en'
                    ? 'English'
                    : item.language === 'it'
                      ? 'Italy'
                      : item.language === 'es'
                        ? 'Spanish'
                        : item.language}
                </CTableDataCell>
                <CTableDataCell>
                  {item.groups.map((mar, index) => (
                    <div key={index}>{mar.name}</div>
                  ))}
                </CTableDataCell>
                <CTableDataCell>
                  {item.groups.length > 0 ? (
                    <CButton
                      size="sm"
                      onClick={() => handleToggle(item.groups, item.id)}
                      style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }}
                    >
                      Assign
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      onClick={() => handleToggle(item.groups, item.id)}
                      style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }}
                    >
                      Add
                    </CButton>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
            )}
          </CTableBody>
        </CTable>
      )}

      <CModal alignment="center" visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Market Group Assign</CModalTitle>
        </CModalHeader>
        <CModalBody>

        <CBadge style={{ marginLeft: '74%'}} color="secondary">Filter by</CBadge>
          <CDropdown style={{ marginLeft: '2%',width:'18%',backgroundColor: '#ff4d4d', color:'white' }}>
          <CDropdownToggle  style={{color:'white'}}>{selectedCityModal}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all','modal')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milano','modal')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli','modal')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CNavbar style={{marginTop:'1%'}}  className="bg-body-tertiary">

        </CNavbar>

        {loadingModal ? <CSpinner/> :  <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {marketGroupData.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>
                
               {
                 driverGroupData.map(grp => grp.id).includes(item._id) ? 
                 (
                   <CButton 
                     size='sm' 
                     onClick={() => removeMarketGroup(driverIdmodal, item._id)} 
                     style={{ backgroundColor:'#ff4d4d', width: 90,color:'white' }} 
                   >
                     Remove
                   </CButton>
                 ) : (
                   <CButton 
                     size='sm' 
                     onClick={() => addMarketGroup(driverIdmodal, item._id)}  
                     style={{ backgroundColor:'#ff4d4d', width: 90 ,color:'white'}} 
                   >
                     Add
                   </CButton>
                 )
               }
            
                
               
              </CTableDataCell>
               
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

     }

      {/* <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 20 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>
          Next
        </CPaginationItem>
      </CPagination> */}


        </CModalBody>
        <CModalFooter>
        <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>
          Next
        </CPaginationItem>
      </CPagination>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default GroupManagement
