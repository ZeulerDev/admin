import React, { useEffect, useState, useRef,Suspense } from 'react'
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
import { MapContainer, TileLayer, Popup,FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { BASE_URL } from '../../../context/config'

const Marker = React.lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
  const [allAreas, setAllAreas] = useState([])
  // const [milanoLocation, setMilanoLocation] = useState([45.4666507,9.1823022])
  // const [napoliLocation, setNapoliLocation] = useState([40.85631, 14.24641])
  const [location, setlocation] = useState([])
 
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

          const location = res.data.map((item) => {
            return item.geometry.coordinates
          })

          const layerLatLngs = convertToLatLngArrayAll(location);
          setAllAreas(layerLatLngs)

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
      })
  }

  function convertToLatLngArrayAll(data) {
    return data.map(point => point.map(data => data.map(loc => ({ lng: loc[0], lat: loc[1] }))));
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
  
 

  const viewMapModal = (items, id,citys)=>{
    setVisible(true)
    if(citys === 'Milano'){
      setlocation([45.4666507,9.1823022])
      city('Milano')
    }else if(citys === 'Napoli'){
      setlocation([40.85631, 14.24641])
      city('Napoli')
    }
    const layerLatLngs = convertToLatLngArray(items);
    setPolygonData(layerLatLngs);
    setId(id)
  }
  function convertToLatLngArray(data) {
    return data.map(point => point.map(data => ({ lng: data[0], lat: data[1] })));
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

    const formattedArray = layer._latlngs.map(point => {
      const newData = point.map(data => [data.lng, data.lat]);
      newData.push(newData[0]); // Add the first element to the end
      return newData;
  });
  
  console.log(formattedArray);
    setArea(formattedArray)
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

      { loading ? <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>: <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">View</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {pickupAreasData.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="6" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
          pickupAreasData.map((item, index) => (
            <CTableRow key={index}>
               <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
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
              <CButton size='sm' style={{backgroundColor: '#ff4d4d', color:'white'}} variant="outline" onClick={() => viewMapModal(item.geometry.coordinates, item._id,item.city)}>
                   View map
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
              <CButton size='sm' style={{backgroundColor: '#ff4d4d'}} variant="outline" onClick={() => handleToggle(item._id)}>
              <CIcon icon={cilTrash} size='lg' style={{color:'white'}}/>
                </CButton>
           
              </CTableDataCell>
            </CTableRow>
          ))
        )}
        </CTableBody>
      </CTable>

      }

      <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination>

      <CModal alignment="center" visible={visible} scrollable size='xl' 
      onClose={() => {
        setVisible(false)
        city('all')
        }}>
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
      center={location}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Suspense fallback={<div>Loading...</div>}>
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
              <Polygon strokeColor="yellow" strokeWidth={2} fillColor="red"  positions={polygonData} />
            )}

            {allAreas.length > 0 && (
              <Polygon positions={allAreas} />
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
      </Suspense>
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
