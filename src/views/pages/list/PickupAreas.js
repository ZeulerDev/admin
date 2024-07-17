import React, { useEffect, useState, useRef } from 'react'
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
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormCheck,
  CSpinner,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CFormInput,
  CBadge,
} from '@coreui/react'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilBasket, cilDelete, cilInfo, cilPencil, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import { MapContainer, TileLayer, Marker, Popup,FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { BASE_URL } from '../../../context/config'

const PickupAreas = () => {
  const featureGroupRef = useRef(null);
  const [{ user, token }, dispatch] = useAppContext()
  const [pickupAreasData, setPickupAreasData] = useState([])
  const [paramCity, setParamCityData] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [loading, setLoading] = useState(false)
  const [isDisable, setIsDisable] = useState(true)
  const [visible, setVisible] = useState(false)
  const [visibleName, setVisibleName] = useState(false)
  const [marketGroupLocation, setMarketGroupLocation] = useState([])
  const [paramMapCity, setParamMaoCityData] = useState('Napoli')
  const [polygonData, setPolygonData] = useState([]);
  const [area, setArea] = useState([])
  const [id,setId] = useState('')
  const [name , setName] = useState('')
  const [nameDisplay , setNameDisplay] = useState('')
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [pickupId, setPickupId] = useState(false)
 
  useEffect(() => {
    if (user && token) {
      loadData(0)
    }
  }, [paramCity, user])

  const loadData = (count) => {
    setLoading(true)
    axios
      .get(
        BASE_URL+`pickups/areas/${count}?city=${paramCity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setPickupAreasData(res.data)
          setLoading(false)
          if (res.data.length < 20) {
            setIsDisable(true)
          } else if (res.data.length > 19) {
            setIsDisable(false)
          }
        } else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Loading error',
              message : res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error: ', err)
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          console.error('Response headers:', err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          console.error('Request data:', err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', err.message);
        }
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

  const city = (city) => {
    if (city === 'all') {
      setParamCityData('')
      setSelectedCity('All Cities')
    } else {
      setParamCityData(city)
      setSelectedCity(city)
      setParamMaoCityData(city)
    }
  }
 

  const viewMapModal = (items, id)=>{
    setVisible(true)
    setPolygonData(items);
    setId(id)
    console.log(items)
  }

  const handleToggleName = (id, name)=>{
    setVisibleName(true)
    setId(id)
    setNameDisplay(name)
    console.log(name)
  }

  

  useEffect(() => {
    if (user && token) {
      axios
        .get(BASE_URL+`assistant/markets/groups/locations/pickup/${paramMapCity}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setMarketGroupLocation(res.data)
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Market Group loading error',
                message : res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error:', err)
        })
    }
  }, [user,paramMapCity])

  const handleCreated = (e) => {
    const layer = e.layer;
    console.log('layer',layer._latlngs);
    setArea(layer._latlngs)
  };

  const handleUpdate = (id) => {

    if(id){

      let formData = {}

      if(area){
        formData = {
          area: area,
        }
      }

      if(name){
        formData = {
          name: name,
        }
      }
      
    console.log(formData, id)

    if(user && token){
      axios
        .put(BASE_URL+'pickup/area/update/'+id, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Pickup Area Update',
                message : 'Pick up area update Success',
                color : 'success'
              }
            })
            setId('')
            setName('')
            loadData(0, true)
            setVisible(false)
            setVisibleName(false)
            setNameDisplay('')
          } else if (res.status === 204) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Pick up area update  error',
                message : res.data.message,
                color : 'danger'
              }
            })
          }else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Pick up area update  error',
                message : res.data.message,
                color : 'danger'
              }
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })

    }
   }else{
    alert('Please Check the Fields!')
   }
    
  }

  const updateMap = () => {
    if(id == '', area == ''){
      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Alert',
          message : 'Please select the area',
          color : 'danger'
        }
      })
    }else{
      handleUpdate(id)
    }
  }
  const updateName = () => {
    if(name == '' && id == ''){
      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Alert',
          message : 'Please Name',
          color : 'danger'
        }
      })
    }else{
      handleUpdate(id)
    }
  }

  const handleToggle = (id) => {
    setVisibleDelete(!visibleDelete)
    setPickupId(id)
  }

  const deletePickupArea =(id)=>{
    console.log(id)
    axios
      .delete(
        BASE_URL+`pickup/area/delete/`+id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Pickup Area Delete',
              message : 'Pick up area deleted Successfully',
              color : 'success'
            }
          })
          setVisibleDelete(false)
          loadData(0, true)

        }  else if (res.status === 204) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Pickup Area Delete',
              message : res.data.message,
              color : 'warning'
            }
          })
        } else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Pickup Area Delete',
              message : res.data.message,
              color : 'warning'
            }
          })
        }
      }).catch((err) => {
        console.error('Error:', err)
      })

  }

  return (
    <CContainer>
      <CBadge style={{ marginLeft: '75.5%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{ marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}} >{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      <CNavbar  style={{marginTop:'1%'}}  className="bg-body-tertiary">

      </CNavbar>

      { loading ? <CSpinner/> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">View</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {pickupAreasData.map((item, index) => (
            <CTableRow key={index}>
              {/* <CTableDataCell>{item.name} <Link to={``}><CIcon icon={cilPencil} size="sm" onClick={() => handleToggleName(item._id, item.name)}  /></Link> </CTableDataCell> */}
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
              <CTableDataCell>{item.geometry.type}</CTableDataCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>
              <CButton size='sm' style={{backgroundColor: '#ff4d4d', color:'white'}} variant="outline" onClick={() => viewMapModal(item.geometry.coordinate, item._id)}>
                   View map
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
              <CButton size='sm' style={{backgroundColor: '#ff4d4d'}} variant="outline" onClick={() => handleToggle(item._id)}>
              <CIcon icon={cilTrash} size='lg' style={{color:'white'}}/>
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
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination>

      <CModal alignment="center" visible={visible} scrollable size='xl' onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Map View</CModalTitle>
        </CModalHeader>
        <CModalBody>

        <CBadge style={{ marginLeft: '81.5%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{ marginLeft: '2%', width:'10%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}} >{paramMapCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CNavbar style={{marginTop:'1%'}} className="bg-body-tertiary">

      </CNavbar>

        <MapContainer
      dragging={true}
      center={[40.85631, 14.24641]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       {marketGroupLocation.map((item, index) => (
          <Marker key={index} position={[item.lat, item.lng]}>
             <Popup>
              <div>
              <CIcon
                icon={cilInfo}
                size="lg"
                style={{ marginLeft: '10px' }}
              />{' '}
              <span>{item.address}</span>

              </div>
             
            </Popup>
          </Marker>
        ))}

            {polygonData.length > 0 && (
              <Polygon positions={polygonData} />
            )}

      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            polygon: true,
            circle: true,
            polyline: true,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
        </CModalBody>
        <CModalFooter>
         
          <CButton style={{backgroundColor:'#ff4d4d',color:'white'}} onClick={() => updateMap()} >Save updated area</CButton>
        </CModalFooter>
      </CModal>


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
          
          <CButton style={{backgroundColor:'#ff4d4d', color:'white'}} onClick={() => updateName()}>Save changes</CButton>
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={visibleDelete} scrollable size='sm' onClose={() => setVisibleDelete(false)}>
        <CModalHeader closeButton={false}>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Are you sure you want to delete this pickup area?</a><br></br><br></br>
        <div style={{display : "flex", justifyContent : 'center'}}>
        <CButton onClick={() => deletePickupArea(pickupId)} style={{  backgroundColor:'#ff4d4d', color:'white',marginRight: '10px' }} >Yes</CButton>
        <CButton onClick={() => setVisibleDelete(false)} style={{  backgroundColor:'#ff4d4d', color:'white',marginLeft: '10px' }} >No</CButton>
        </div>
     
        </CModalBody>
      </CModal>
    </CContainer>
  )
}

export default PickupAreas
