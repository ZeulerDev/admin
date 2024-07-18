import React, { useState, useEffect,useRef  } from 'react'
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

import { cilInfo, cilLayers, cilList, cilMap, cilNotes,cilPencil } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { BASE_URL } from '../../../context/config'


const Batch = () => {
  const [visible, setVisible] = useState(false)
  const [visibleStatusModel, setVisibleStatusModel] = useState(false)
  const [visibleBonus, setVisibleBonus] = useState(false)
  const [visibleMap, setVisibleMap] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const navigate = useNavigate()
  const [batchesData, setBatchesData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingRiders, setLoadingRiders] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [batchCustomersDetails, setBatchCustomersDetails] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(0)

  const [bonus, setBonus] = useState('')
  const [status, setStatus] = useState('')
  const [batchId, setBatchId] = useState('')
  const [visibleRider, setVisibleRider] = useState(false)
  const [orderRiderDetails, setOrderRiderDetails] = useState([])

  const [visibleAllRiders, setVisibleAllRiders] = useState(false)

  const [mGroupData, setMGroupData] = useState([])
  const [chainData, setChainData] = useState([])
  const [paramCity, setParamCityData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [paramChainId, setParamChainData] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [selectedChain, setSelectedChian] = useState('All Chains')
  const [driverData, setDriverData] = useState([])
  const [batchRid, setBatchRid] = useState('')
  const [riderId, setRiderId] = useState('')
  const [paramStatus, setParamStatusData] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [batchIdData, setBatchIdData] = useState('')
  const [id, setId] = useState('')
  const [batchMarketsData, setBatchMarketsData] = useState([])
  const [durationData, setDurationData] = useState(
    {
      duration: ' ',
      distance: ' '
  })
  const [isDisable, setIsDisable] = useState(true)
  
  const mapRef = useRef(null);

  useEffect(() => {
    console.log('it comes to batches page')
  }, [])

  // return (
  //   <div>
  //     <h1>Batch</h1>
  //   </div>
  // )

  useEffect(() => {
    if (user && token) {
      console.log('the user was validated in batch')
      loadData(0, true)
    }
  }, [user, token, paramStatus])

  const loadData = (count, moveNext) => {
    setLoading(true)
    axios
      .get(BASE_URL+'assistant/batches/' + count + '?status='+paramStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setBatchesData(res.data)
          setLoading(false)
          if (res.data.length < 50) {
            setIsDisable(true)
            console.log("ok")
          } else if (res.data.length > 49) {
            setIsDisable(false)
          }
        } else if (res.status === 204) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batches loading error',
              message: res.data.message,
            },
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batches loading error',
              message: res.data.message,
            },
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const nextPage = () => {
    const c = itemsPerPage + 50
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    const c = itemsPerPage - 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handleToggle = (id) => {
    setVisible(!visible)
    console.log(id)
    loadCustomerId(id)
  
  }

  const loadCustomerId = (id)=>{
    if (token && user) {
      setLoadingModal(true)
      axios
        .get(BASE_URL+'assistant/batch/customers/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('done')
            setBatchCustomersDetails(res.data)
            setLoadingModal(false)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Batch details view error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((error) => {
          console.error('Batch details view error:', error)
        })
    }
  }

  const handleToggleBonus = (id, bonus = null) => {
    setVisibleBonus(!visible)
    setBatchId(id)
    if (bonus !== null) {
        setBonus(bonus)
      } else {
        console.log("Bonus number not provided");
      }
  }

  const handleUpdate = ()=>{
    const data = {
        bonus: bonus
      }
      if(user && token){
         axios
          .put(BASE_URL+'assistant/batch/bonus/'+batchId, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("updated")
              setVisibleBonus(false)
              const updatedEntity = res.data
              const found = batchesData.find((f) => f.id === updatedEntity._id)
              if(found){
                found.bonus = updatedEntity.bonus
              }

              setBatchesData([...batchesData])
              dispatch({
                type : SET_ALERT,
                payload : {
                  status : true,
                  title : 'Bonus Update',
                  message : 'Bonus Update Success',
                  color:'success'
                }
              })
              
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

  const handleRiderToggle = (id,status) => {
    setVisibleRider(!visibleRider)
    setLoadingModal(true)
    setStatus(status)
    if (token && user) {
      setLoadingModal(true)
      axios
        .get(BASE_URL+'assistant/batch/'+id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setOrderRiderDetails(res.data)
            setLoadingModal(false)
          } else if (res.status === 500) {
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
          console.error('Order details view error:', error)
        })
    }
  }

  const handleToggleRiders = (id,status,batchId) => {
    setVisibleAllRiders(!visibleAllRiders)
    setStatus(status)
    setBatchRid(batchId)
    setRiderId(id)
  }

  useEffect(() => {
    loadMakerGroup()
    loadChain()
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

  const loadChain = ()=>{
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
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Chain Loading error',
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
  }, [paramCity, paramGroup, paramChainId])

  const loadDriversData = () => {
    if (user && token) {
      setLoadingRiders(true)
      axios
        .get(
          BASE_URL+`assistant/riders/:skip?city=${paramCity}&group=${paramGroup}&chain=${paramChainId}`,
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

  const chain = (chainId, chianName) => {
    if (chainId === 'all') {
      setParamChainData('')
      setSelectedChian('All Chains')
    } else {
      setParamChainData(chainId)
      setSelectedChian(chianName)
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
        .put(BASE_URL+'assistant/batch/assign/rider/'+bId, data, {
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
            const found = batchesData.find((f) => f.id === updatedEntity._id)
            if(found){
              found.bonus = updatedEntity.bonus
            }

            setBatchesData([...batchesData])
            loadData(0, true)
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Rider Assign',
                message : 'Rider assign update success',
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
  const groceryStatus = (status) => {
    if (status === 'all') {
      setParamStatusData('')
      setSelectedStatus('All Status')
    } else {
      setParamStatusData(status)
      setSelectedStatus(status)
    }
  }

  const handleToggleStatus = (groceryId) => {
    setVisibleStatusModel(!visibleStatusModel)
    setBatchIdData(groceryId)
    console.log(groceryId)
  }

  const handleStatus = (id)=>{
    console.log('status',id)

    if(user && token){
       axios
        .put(BASE_URL+'assistant/batch/assign/status/'+id, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("updated",res.data)
            setVisibleStatusModel(false)
            const updatedEntity = res.data
            const found = batchesData.find((f) => f.id === updatedEntity._id)
            if(found){
              console.log("done",found)
              found.status = updatedEntity.status
            }

            setBatchesData([...batchesData])

            
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

  let market = [];
  const loadMarketsById = (id) => {
    axios
      .get(BASE_URL+'assistant/batch/markets/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setBatchMarketsData(res.data)
          market = res.data
      
           } else if (res.status === 203) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Batch markets loading error',
                message: res.data.message,
              },
            })
          }else if (res.status === 204) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Batch markets loading error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batch markets loading error',
              message: res.data.message,
            },
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const waypoint=()=>{
    
    console.group('waypoints',market)
    if (market !== null) { 

      const map = L.map('map').setView([51.505, -0.09], 13);

      console.group('waypoints')
  
      
      const waypoints = market.markets.map(item => L.latLng(item.lat, item.lng));
      console.group('waypoints',waypoints)
      
      const routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [{ color: '#6FA1EC', weight: 4 }]
        },
        createMarker: () => null 
      }).addTo(map);
  
      return () => {
        routingControl.removeFrom(map);
      };
    }
  }

  const handleMap = (id,duration, distance)=>{
    console.log(id)
    setId(id)
    setVisibleMap(!visibleMap)
    loadCustomerId(id)
    loadMarketsById(id)
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
              <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
              <CTableHeaderCell scope="col">Distance</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Bonus</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
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
            {batchesData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                <CTableHeaderCell scope="row">{item.no}</CTableHeaderCell>
                <CTableHeaderCell scope="row">{item.duration}</CTableHeaderCell>
                <CTableDataCell>{item.distance}</CTableDataCell>
                <CTableDataCell><CBadge style={{ width:80 }} color="info">{item.status}</CBadge></CTableDataCell>
                <CTableDataCell>{item.bonus !=null ? item.bonus.toFixed(2) : 0.00} <Link to={``}><CIcon icon={cilPencil} size="sm" onClick={() => handleToggleBonus(item.id, item.bonus)}  /></Link> </CTableDataCell>
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>{item.hour}</CTableDataCell>
                <CTableDataCell>{item.fee}</CTableDataCell>
                <CTableDataCell>{item.start}</CTableDataCell>
                <CTableDataCell>{item.end}</CTableDataCell>
                <CTableDataCell>{item.accepted ? <CButton onClick={() => handleRiderToggle(item.id,item.status)} size="sm" style={{ width:80,backgroundColor:'#ff4d4d',color:'white' }}>View</CButton> : <CButton onClick={() => handleToggleRiders(item.accepted,item.status,item.id)} size="sm" style={{ width:80,backgroundColor:'#ff4d4d',color:'white' }} >Add</CButton>}</CTableDataCell>
                <CTableDataCell>
                  <Link>
                    <CIcon icon={cilInfo} size="xl" onClick={() => handleToggle(item.id)} />
                  </Link>
                </CTableDataCell>
                <CTableDataCell>
                <Link to={`/order/batches/market/${item.id}`}>
                    <CIcon icon={cilList} size="xl"/>
                  </Link>
                </CTableDataCell>
                <CTableDataCell>
                <Link to={`/order/batches/orders/${item.id}`}>
                    <CIcon icon={cilLayers} size="xl" />
                  </Link>
                </CTableDataCell>
                <CTableDataCell> 
                <Link>
                    <CIcon icon={cilMap} size="xl" onClick={() => handleMap(item.id,item.duration,item.distance)}/>
                  </Link>
                </CTableDataCell>
                <CTableDataCell>{item.status === 'complete' ? <CButton  size="sm" disabled={true} style={{ width:80 }}>Cancel</CButton> : item.status === 'canceled' ? <CButton  size="sm" disabled={true} style={{ width:80,backgroundColor:'#ff4d4d',color:'white' }} color="danger">Cancel</CButton> : <CButton onClick={() => handleToggleStatus(item.id)} size="sm" style={{ width:80,backgroundColor:'#ff4d4d',color:'white' }}>Cancel</CButton>}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}

      <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination>

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
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Order No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Slot</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Latitude</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Longitude</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {batchCustomersDetails.customers?.map((items, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{items.orderNo}</CTableDataCell>
                    <CTableDataCell>{items.name}</CTableDataCell>
                    <CTableDataCell>{items.address}</CTableDataCell>
                    <CTableDataCell>{items.orderSlot}</CTableDataCell>
                    <CTableDataCell>{items.orderDate}</CTableDataCell>
                    <CTableDataCell>{items.orderTotal}</CTableDataCell>
                    <CTableDataCell>{items.lat}</CTableDataCell>
                    <CTableDataCell>{items.lng}</CTableDataCell>
                  </CTableRow>
                ))}
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

      <CModal alignment="center" visible={visibleBonus} scrollable size='sm' onClose={() => setVisibleBonus(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Enter Bonus Amount</a><br></br>
        <CFormInput
         type="text" 
         placeholder="Bonus"
         value={bonus}
         onChange={(e) => setBonus(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisibleBonus(false)}>
            Close
          </CButton> */}
          <CButton style={{backgroundColor:'#ff4d4d', color:'white'}} onClick={() => handleUpdate()}>Save changes</CButton>
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

        {batchCustomersDetails.customers?.map((item, index) => (
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
         
         {batchMarketsData.markets?.map((item, index) => (
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
          {/* <CButton color="secondary" onClick={() => setVisibleMap(false)}>
            Close
          </CButton> */}
        </CModalFooter>
      </CModal>


      <CModal alignment="center" visible={visibleAllRiders} scrollable size='xl' onClose={() => setVisibleAllRiders(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Rider Assign to the Batch</CModalTitle>
        </CModalHeader>
        <CModalBody>

        <CBadge style={{ marginLeft: '37%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}}>{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milan')}>Milan</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}}>{selectedChain}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
            {chainData.map((item, index) => (
              <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
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
            {driverData.map((item, index) => (
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
            ))}
          </CTableBody>
        </CTable>
      )}

  
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisibleAllRiders(false)}>
            Close
          </CButton> */}
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


      <CModal alignment="center" visible={visibleStatusModel} scrollable size='sm' onClose={() => setVisibleStatusModel(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Are you sure you want to cancel this batch order?</a><br></br>
        {/* <CButton onClick={() => handleStatus(batchIdData)}  style={{marginLeft:200,backgroundColor:'#ff4d4d',color:'white' }}>Yes</CButton> */}
        <div style={{display : "flex", justifyContent : 'center'}}>
        <CButton  onClick={() => handleStatus(batchIdData)}  style={{  backgroundColor:'#ff4d4d', color:'white',marginRight: '10px' }} >Yes</CButton>
        <CButton onClick={() => setVisibleStatusModel(false)} style={{  backgroundColor:'#ff4d4d', color:'white',marginLeft: '10px' }} >No</CButton>
        </div>
        </CModalBody>
      </CModal>
     
    </CContainer>
  )
}

export default Batch
