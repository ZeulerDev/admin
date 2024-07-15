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
} from '@coreui/react'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilBasket, cilDelete, cilInfo, cilPencil } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import { MapContainer, TileLayer, Marker, Popup,FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

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
 
  useEffect(() => {
    if (user && token) {
      loadData(0, true)
    }
  }, [paramCity, user])

  const loadData = (count, moveNext) => {
    setLoading(true)
    axios
      .get(
        `https://15.160.211.157/pickups/areas/${count}?city=${paramCity}`,
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
            console.log("ok")
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
        .get(`https://15.160.211.157/assistant/markets/groups/locations/pickup/${paramMapCity}`, {
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
        .put('https://15.160.211.157/pickup/area/update/'+id, formData, {
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

  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
        <CDropdown style={{ marginLeft: '85%', width:'13%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle >{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CNavbar>

      { loading ? <CSpinner/> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">View</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {pickupAreasData.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{item.name} <Link to={``}><CIcon icon={cilPencil} size="sm" onClick={() => handleToggleName(item._id, item.name)}  /></Link> </CTableDataCell>
              <CTableDataCell>{item.geometry.type}</CTableDataCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>
              <CButton size='sm' style={{backgroundColor: '#ff4d4d'}} variant="outline" onClick={() => viewMapModal(item.geometry.coordinate, item._id)}>
                   View map
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
        <CNavbar className="bg-body-tertiary">
        <CDropdown style={{ marginLeft: '65%', width:'10%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle >{paramMapCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CNavbar>

        <CModalBody>
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
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => updateMap()} >Save updated area</CButton>
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
          <CButton color="secondary" onClick={() => setVisibleName(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => updateName()}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default PickupAreas
