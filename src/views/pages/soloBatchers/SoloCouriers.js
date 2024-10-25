import { CBadge, CButton, CCol, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CNavbar, CPagination, CPaginationItem, CRow, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { SET_ALERT } from '../../../context/context_reducer';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';
import { BASE_URL } from '../../../context/config';
import { cilInfo, cilLayers, cilList, cilMap, cilPencil } from '@coreui/icons';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const SoloCouriers = () => {

  const [visible, setVisible] = useState(false)
  const [courierData, setCourierData] = useState([])
  const [loading, setLoading] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [isDisable, setIsDisable] = useState(true)
  const [resultCount, setResultCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [visibleBonus, setVisibleBonus] = useState(false)
  const [batchId, setBatchId] = useState('')
  const [bonusDisplay, setBonusDisplay] = useState('')
  const [bonus, setBonus] = useState('')
  const [visibleAllRiders, setVisibleAllRiders] = useState(false)
  const [status, setStatus] = useState('')
  const [batchRid, setBatchRid] = useState('')
  const [riderId, setRiderId] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [paramCity, setParamCityData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [mGroupData, setMGroupData] = useState([])
  const [driverData, setDriverData] = useState([])
  const [loadingRiders, setLoadingRiders] = useState(false)
  const [visibleRider, setVisibleRider] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [orderRiderDetails, setOrderRiderDetails] = useState([])
  const [customerAllData, setCustomerAllData] = useState([])
  const [visibleMap, setVisibleMap] = useState(false)
  const [durationData, setDurationData] = useState(
    {
      duration: ' ',
      distance: ' '
  })
  const [location, setLocation]=useState({
    market:[],
    customers:[]
  })
  const [visibleStatusModel, setVisibleStatusModel] = useState(false)
  const [batchIdData, setBatchIdData] = useState('')
  const [paramStatus, setParamStatusData] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All Status')

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Data Loading',
          message: 'Data loading error or Timeout exceeded',
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
  }, [user, token, paramStatus])

  const loadData = (count, timer) => {
    setLoading(true)
    axios
      .get(BASE_URL + 'assistant/solo/courier/' + count +'?status='+paramStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCourierData(res.data.data)
          console.log(res.data.data.length)
          setResultCount(res.data.count)
          setLoading(false)
          clearTimeout(timer)
          if (res.data.length < 20) {
            setIsDisable(true)
          } else if (res.data.length > 19) {
            setIsDisable(false)
          }
        } else if (res.status === 204) {
          setLoading(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batches loading error',
              message: 'No data to show or something went wrong',
            },
          })
        } else if (res.status === 500) {
          setLoading(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batches loading error',
              message: 'No data to show or something went wrong',
            },
          })
        }
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error:', error)
        dispatch({
          type: SET_ALERT,
          payload: {
            status: true,
            title: 'Batches error',
            message: res.data.message,
          },
        })
      })
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    const c = itemsPerPage + 20
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    const c = itemsPerPage - 20
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handlePages = (page) => {
    setCurrentPage(page);
    const c = (page - 1) * 20;
    setItemsPerPage(c);
    loadData(c, true);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(resultCount / 20);
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

  const handleToggleBonus = (id, bonus) => {
    setVisibleBonus(!visibleBonus)
    setBatchId(id)
    if (bonus !== null) {
      setBonusDisplay(bonus)
      }
  }

  const handleUpdate = ()=>{
    if(bonus === ''){
      console.log("bonus is empty")
        dispatch({
          type : SET_ALERT,
          payload : {
            status : true,
            title : 'Bonus Update',
            message : 'Bonus number not provided',
            color:'warning'
          }
        })
    }else{
      const data = {
        bonus: bonus
      }
      if(user && token){
         axios
          .put(BASE_URL+'assistant/solo/courier/bonus/'+batchId, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setVisibleBonus(false)
              const updatedEntity = res.data
              const found = courierData.find((f) => f._id === updatedEntity._id)
              if(found){
                found.bonus = updatedEntity.bonus
              }

              setCourierData([...courierData])
              dispatch({
                type : SET_ALERT,
                payload : {
                  status : true,
                  title : 'Bonus Update',
                  message : 'Bonus Update Success',
                  color:'success'
                }
              })
              setBatchId('')
              setBonus('')
            } else if (res.status === 203) {
                console.log("203")
              dispatch({
                type : SET_ALERT,
                payload : {
                  status : true,
                  title : 'Bonus Update error',
                  message : res.data.message
                }
              })
               
            }else if (res.status === 204) {
                console.log("204")
              dispatch({
                type : SET_ALERT,
                payload : {
                  status : true,
                  title : 'Bonus Update error',
                  message : res.data.message
                }
              })
               
            }else if (res.status === 500) {
              dispatch({
                type : SET_ALERT,
                payload : {
                  status : true,
                  title : 'Bonus Update error',
                  message : res.data.message
                }
              })
               
            }
          }).catch((error) => {
            console.error( error)
            
          })
      }
    }
    
  }

  const handleToggleRiders = (id,status,batchId) => {
    setVisibleAllRiders(!visibleAllRiders)
    setStatus(status)
    setBatchRid(batchId)
    setRiderId(id)
  }

  const city = (city) => {
    if (city === 'all') {
      setParamCityData('')
      setSelectedCity('All Cities')
    } else {
      setParamCityData(city)
      setSelectedCity(city)
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

  useEffect(() => {
    loadMakerGroup()
  }, [])

  const loadMakerGroup = () =>{
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
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Market Group Loading error',
                message : res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  useEffect(() => {
    loadDriversData()
  }, [paramCity, paramGroup])

  const loadDriversData = () => {
    if (user && token) {
      setLoadingRiders(true)
      axios
        .get(
          BASE_URL+`assistant/riders/:skip?city=${paramCity}&group=${paramGroup}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setDriverData(res.data)
            setLoadingRiders(false)
            
          } else if (res.status === 500) {
            setLoadingRiders(false)
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
          setLoadingRiders(false)
          console.error('Error:', error)
        })
    }
  }

  const updateRiderAssign = (bId,rId,batchStatus) =>{

    console.log('bid',bId,'rid',rId,batchStatus)
    const data = {
      riderId : rId,
      status : batchStatus
    }
    if(user && token){
       axios
        .put(BASE_URL+'assistant/solo/courier/assign/rider/'+bId, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("updated")
            if(visibleRider){
              setVisibleRider(false)
            }
            setVisibleAllRiders(false)
            const updatedEntity = res.data
            const found = courierData.find((f) => f.id === updatedEntity._id)
            if(found){
              found.bonus = updatedEntity.bonus
            }

            setCourierData([...courierData])
            loadData(0, true)
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Rider Assign',
                message : 'Rider assign update success',
                color:'success'
              }
            })
            
          } else if (res.status === 203) {
              console.log("203")
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Rider Assign error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 204) {
              console.log("204")
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Rider Assign error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Rider Assign error',
                message : res.data.message
              }
            })
             
          }
        }).catch((error) => {
          console.error( error)
          
        })
    }
  }

  const handleRiderToggle = (id,status) => {
    setVisibleRider(!visibleRider)
    setLoadingModal(true)
    setStatus(status)
    if (token && user) {
      setLoadingModal(true)
      axios
        .get(BASE_URL+'assistant/solo/courier/rider/'+id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setOrderRiderDetails(res.data)
            setLoadingModal(false)
          } else if (res.status === 500) {
            setLoadingModal(false)
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Order details view error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((error) => {
          setLoadingModal(false)
          console.error('Order details view error:', error)
        })
    }
  }

  const handleToggle = (id,customers) => {
    setVisible(!visible)
    // console.log(id,customers)
    
    setCustomerAllData(customers)
    // console.log("customers",customersAll)
  }


  const handleMap = (id,duration, distance,market,customers)=>{
    console.log(id)
    setVisibleMap(!visibleMap)
    const marketLocations = market.map((item) => {
      return {
        lat: item.location.lat,
        lng: item.location.lng,
        address: item.address
      }
    })
    const customerLocations = customers.map((item) => {
      return {
        lat: item.lat,
        lng: item.lng,
        address: item.address
      }
    })
    setLocation({
      market: marketLocations,
      customers: customerLocations
    })
    console.log(marketLocations,customerLocations)
    const durationInMinutes = duration / 60;
    setDurationData(
      {
        duration: durationInMinutes.toFixed(0),
        distance: distance
      }
    )
  }

  const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleToggleStatus = (courierId) => {
    setVisibleStatusModel(!visibleStatusModel)
    setBatchIdData(courierId)
    console.log(courierId)
  }

  const handleStatus = (id)=>{
    console.log('status',id)

    if(user && token){
       axios
        .put(BASE_URL+'assistant/solo/courier/assign/status/'+id, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("updated",res.data)
            setVisibleStatusModel(false)
            const updatedEntity = res.data
            const found = courierData.find((f) => f._id === updatedEntity._id)
            if(found){
              console.log("done",found)
              found.status = updatedEntity.status
            }

            setCourierData([...courierData])
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Status update',
                message : 'Status update success',
                color:'success'
              }
            })
            
          } else if (res.status === 203) {
              console.log("203")
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Status update error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 204) {
              console.log("204")
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Status update error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Status update error',
                message : res.data.message
              }
            })
             
          }
        }).catch((error) => {
          console.error( error)
          
        })
    }

  }

  const groceryStatus = (status) => {
    if (status === 'all') {
      setParamStatusData('')
      setSelectedStatus('All Status')
    } else {
      setParamStatusData(status)
      setSelectedStatus(status)
    }
  }
  


  return (
    <CContainer>

<CBadge style={{ marginLeft: '75.5%'}} color="secondary">Filter by</CBadge>
      <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}} >{selectedStatus}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => groceryStatus('all')}>All Status</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('created')}>Created</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('ready')}>Ready</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('finalized')}>Finalized</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('finished')}>Finished</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('freeze')}>Freeze</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('forced')}>Forced</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('open')}>Open</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('completed')}>Completed</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('waiting')}>Waiting</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('paid ')}>Paid </CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('coloring ')}>Coloring </CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('delivery ')}>Delivery </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      <CNavbar style={{marginTop:'1%'}} className="bg-body-tertiary">

      </CNavbar>

      {loading ? (
        <CSpinner />
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Duration (min)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Distance (m)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Bonus</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Date</CTableHeaderCell> */}
              <CTableHeaderCell scope="col">Hour</CTableHeaderCell>
              <CTableHeaderCell scope="col">fee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Start</CTableHeaderCell>
              <CTableHeaderCell scope="col">End</CTableHeaderCell>
              <CTableHeaderCell scope="col">Rider</CTableHeaderCell>
              <CTableHeaderCell scope="col">Customers</CTableHeaderCell>
              <CTableHeaderCell scope="col">Market</CTableHeaderCell>
              <CTableHeaderCell scope="col">Orders</CTableHeaderCell>
              <CTableHeaderCell scope="col">Map</CTableHeaderCell>
              <CTableHeaderCell scope="col">Batch</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {courierData.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="16" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
            courierData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                <CTableDataCell>{item.no}</CTableDataCell>
                <CTableDataCell>{item.duration}</CTableDataCell>
                <CTableDataCell>{item.distance}</CTableDataCell>
                <CTableDataCell><CBadge style={{ width: 80 }} color="info">{item.status}</CBadge></CTableDataCell>
                <CTableDataCell>{item.bonus != null ? item.bonus.toFixed(2) : 0.00} <Link to={``}><CIcon icon={cilPencil} size="sm" onClick={() => handleToggleBonus(item._id, item.bonus)} /></Link> </CTableDataCell>
                {/* <CTableDataCell>{item.date}</CTableDataCell> */}
                <CTableDataCell>{item.hour}</CTableDataCell>
                <CTableDataCell>{item.fee}</CTableDataCell>
                <CTableDataCell>{new Date(item.start).toLocaleString()}</CTableDataCell>
                <CTableDataCell>{new Date(item.end).toLocaleString()}</CTableDataCell>
                <CTableDataCell>{item.accepted ? <CButton onClick={() => {handleRiderToggle(item._id,item.status) }} size="sm" style={{ width: 80, backgroundColor: '#ff4d4d', color: 'white' }}>View</CButton> : <CButton onClick={() => { handleToggleRiders(item.accepted,item.status,item._id)}} size="sm" style={{ width: 80, backgroundColor: '#ff4d4d', color: 'white' }} >Add</CButton>}</CTableDataCell>
                <CTableDataCell>
                  <Link>
                    <CIcon icon={cilInfo} size="xl" onClick={() => { handleToggle(item._id, item.customers)}} />
                  </Link>
                </CTableDataCell>
                <CTableDataCell>
                  <Link to={`/solocouriers/order/market/${item._id}`}>
                    <CIcon icon={cilList} size="xl" />
                  </Link>
                </CTableDataCell>
                <CTableDataCell>
                  <Link to={`/solocouriers/batches/orders/${item._id}`}>
                    <CIcon icon={cilLayers} size="xl" />
                  </Link>
                </CTableDataCell>
                <CTableDataCell>
                  <Link>
                    <CIcon icon={cilMap} size="xl" onClick={() => { handleMap(item.id,item.duration,item.distance,item.markets,item.customers) }} />
                  </Link>
                </CTableDataCell>
                <CTableDataCell>{item.status === 'complete' ? <CButton  size="sm" disabled={true} style={{ width:80 }}>Cancel</CButton> : item.status === 'canceled' ? <CButton  size="sm" disabled={true} style={{ width:80,backgroundColor:'#ff4d4d',color:'white' }} color="danger">Cancel</CButton> : <CButton onClick={() => handleToggleStatus(item._id)} size="sm" style={{ width:80,backgroundColor:'#ff4d4d',color:'white' }}>Cancel</CButton>}</CTableDataCell>
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

      <CModal alignment="center" visible={visibleBonus} scrollable size='sm' onClose={() => setVisibleBonus(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Enter Bonus Amount</a><br></br>
        <CFormInput
         type="text" 
         placeholder={bonusDisplay}
         onChange={(e) => setBonus(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton style={{backgroundColor:'#ff4d4d', color:'white'}} onClick={() => {handleUpdate()}}>Save changes</CButton>
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={visibleAllRiders} scrollable size='xl' onClose={() => setVisibleAllRiders(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Rider Assign to the Batch</CModalTitle>
        </CModalHeader>
        <CModalBody>

        <CBadge style={{ marginLeft: '57%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}}>{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milan')}>Milan</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}}>{selectedMarketGroup}</CDropdownToggle>
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
      
        {loadingRiders ? (
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
              <CTableHeaderCell scope="col">Add Rider</CTableHeaderCell>
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
                  {item.id === riderId ? (
                    <CButton
                      size="sm"
                      onClick={() => updateRiderAssign(batchRid,item.id, status)}
                      style={{ backgroundColor: '#ff4d4d', width: 90,color:'white' }}
                    >
                      Assigned
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      onClick={() => updateRiderAssign(batchRid,item.id, status)}
                      style={{ backgroundColor: '#ff4d4d', width: 90 ,color:'white'}}
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

  
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>

      <CModal
         alignment="center"
        visible={visibleRider}
        scrollable
        size="lg"
        onClose={() => setVisibleRider(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Rider Information</CModalTitle>
        </CModalHeader>
        <CModalBody
          style={{
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {loadingModal ? (
            <CSpinner />
          ) : (
            <div>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Name
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderRiderDetails.accepted?.name}
                    readOnly
                    plainText
                  />
                </CCol>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderRiderDetails.accepted?.email}
                    readOnly
                    plainText
                  />
                </CCol>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Contact
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={orderRiderDetails.accepted?.contact}
                    readOnly
                    plainText
                  />
                </CCol>
              </CRow>
            
            </div>
          )}
        </CModalBody>
        <CModalFooter>
        <CButton style={{backgroundColor:'#ff4d4d', color:'white'}} onClick={() => handleToggleRiders(orderRiderDetails.accepted?.id,status,orderRiderDetails.id)}>
            Change
          </CButton> 
          
        </CModalFooter>
      </CModal>

      <CModal visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Customers Information</CModalTitle>
        </CModalHeader>
        <CModalBody
          style={{
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {loadingModal ? (
            <CSpinner />
          ) : (
            customerAllData.length === 0 ? <h3>No data to show</h3> :
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">surname</CTableHeaderCell>
                  <CTableHeaderCell scope="col">email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">contact</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Latitude</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Longitude</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {customerAllData.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="9" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                customerAllData?.map((items, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{items?.order?.no}</CTableDataCell>
                    <CTableDataCell>{items?.customer?.name}</CTableDataCell>
                    <CTableDataCell>{items?.customer?.surname}</CTableDataCell>
                    <CTableDataCell>{items?.customer?.email}</CTableDataCell>
                    <CTableDataCell>{items?.customer?.contact}</CTableDataCell>
                    <CTableDataCell>{(items?.order?.total ?? 0).toFixed(2)}</CTableDataCell>
                    <CTableDataCell>{items?.lat}</CTableDataCell>
                    <CTableDataCell>{items?.lng}</CTableDataCell>
                  </CTableRow>
                )))}
              </CTableBody>
            </CTable>
          )}
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton> */}
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={visibleMap} scrollable size='xl' onClose={() => setVisibleMap(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Location Information</CModalTitle>
          <CModalTitle></CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CNavbar className="bg-body-tertiary">
          <a style={{ fontSize:19, marginLeft:760 }}>Distance : {durationData.distance}m</a>  <a style={{ fontSize:19, marginRight:20 }}>Duration : {durationData.duration}min</a>
        </CNavbar>
        <MapContainer dragging={true} center={[40.85631, 14.24641]} zoom={13} scrollWheelZoom={true} style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {location.customers?.map((item, index) => (
          <Marker  key={index} position={[item.lat, item.lng]} icon={greenIcon} onClick={handleToggle}>
            <Popup>
             
              <CIcon
                icon={cilInfo}
                size="lg"
                style={{ marginLeft: '10px' }}
              />{' '}
              <span>{item.address}</span>
             
            </Popup>
          </Marker>
        ))}
         
         {location.market?.map((item, index) => (
          <Marker  key={index} position={[item.lat, item.lng]} icon={redIcon} onClick={handleToggle}>
            <Popup>
             
              <CIcon
                icon={cilInfo}
                size="lg"
                style={{ marginLeft: '10px' }}
              />{' '}
              <span>{item.address}</span>
             
            </Popup>
          </Marker>
        ))}
      </MapContainer>
       
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={visibleStatusModel} scrollable size='sm' onClose={() => setVisibleStatusModel(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Are you sure you want to cancel this solo courier order?</a><br></br>
        {/* <CButton onClick={() => handleStatus(batchIdData)}  style={{marginLeft:200,backgroundColor:'#ff4d4d',color:'white' }}>Yes</CButton> */}
        <div style={{display : "flex", justifyContent : 'center'}}>
        <CButton  onClick={() => handleStatus(batchIdData)}  style={{  backgroundColor:'#ff4d4d', color:'white',marginRight: '10px' }} >Yes</CButton>
        <CButton onClick={() => setVisibleStatusModel(false)} style={{  backgroundColor:'#ff4d4d', color:'white',marginLeft: '10px' }} >No</CButton>
        </div>
        </CModalBody>
      </CModal>


    </CContainer>
  );
};

export default SoloCouriers;