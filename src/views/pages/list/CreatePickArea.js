import React, { useRef,useEffect,useState,Suspense } from 'react';
import { MapContainer, TileLayer, Popup,FeatureGroup,Polygon } from 'react-leaflet';
const Marker = React.lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import axios from 'axios'
import { CButton, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CNavbar } from '@coreui/react';
import { useAppContext } from '../../../context/AppContext';
import CIcon from '@coreui/icons-react';
import { cilInfo } from '@coreui/icons';
import { SET_ALERT } from '../../../context/context_reducer';
import { BASE_URL } from '../../../context/config';

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

function MapComponent() {
  const featureGroupRef = useRef(null);
  const [{ user, token }, dispatch] = useAppContext()
  const [paramMapCity, setParamCityData] = useState('Napoli')
  const [selectedCity, setSelectedCity] = useState('Napoli')
  const [marketGroupLocation, setMarketGroupLocation] = useState([])
  const [name , setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [area, setArea] = useState([])
  const [pickupAreasData, setPickupAreasData] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramCity, setParamCityLoadData] = useState('')
  
  const handleCreated = (e) => {
    const type = e.layerType;
    const layer = e.layer;
    console.log(type);
    console.log('layer',layer._latlngs);
    setVisible(true)
    console.log('area',layer)
    // const formattedArray = layer._latlngs.map(point => point.map(data => [data.lng, data.lat ]));
    // console.log(formattedArray);

    const formattedArray = layer._latlngs.map(point => {
      const newData = point.map(data => [data.lng, data.lat]);
      newData.push(newData[0]); // Add the first element to the end
      return newData;
  });
  
  console.log(formattedArray);
  setArea(formattedArray)
  };
  


  const handleSubmit = () => {

    setVisible(false)
    if(paramMapCity && name && area){

      const formData = {
        area: area,
        name: name,
        city: selectedCity,
      }
    console.log(formData)

    if(user && token){
      axios
        .post(BASE_URL+'pickup/area/create', formData, {
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
                title : 'Pickup Area Registration',
                message : 'Pick up area registration Success',
                color : 'success'
              }
            })
            setName('')
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Pick up area registration  error',
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

  const city = (city) => {
    if (city === 'all') {
      setParamCityData('')
      setSelectedCity('Napoli')
    } else {
      setParamCityData(city)
      setSelectedCity(city)
    }
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
  }, [user, paramMapCity])

  useEffect(() => {
    if (user && token) {
      loadPickAreaData(0)
    }
    }, [])

  const loadPickAreaData = (count) => {
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
          console.log('pickup areas', res.data)

          if(res.data.length > 0){
            const location = res.data.map((item) => {
              return item.geometry.coordinates
            })
            console.log('location', location)

            const layerLatLngs = convertToLatLngArray(location);
            console.log('Convert location', layerLatLngs)
            
            setPickupAreasData(layerLatLngs)
          }else{
            setPickupAreasData([])
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
  function convertToLatLngArray(data) {
    return data.map(point => point.map(data => data.map(loc => ({ lng: loc[0], lat: loc[1] }))));
  }

  return (
    <CContainer>
    
    <CNavbar className="bg-body-tertiary">
        <CDropdown style={{ marginLeft: '90%', width: '10%', marginRight: '5px',backgroundColor: '#ff4d4d' }}>
          <CDropdownToggle >{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
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

          {pickupAreasData.length > 0 && (
              <Polygon positions={pickupAreasData} />
            )}
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            polygon: true,
            circle: true,
            polyline: false,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
      </Suspense>
    </MapContainer>


    <CModal alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Enter name for selected area</a><br></br>
        <CFormInput
         type="text" 
         value={name}
         onChange={(e) => setName(e.target.value)} />
        </CModalBody>
        <CModalFooter>
         
          <CButton style={{backgroundColor:'#ff4d4d', color:'white'}} onClick={() => handleSubmit()}>Save area</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
    
  );
}

export default MapComponent;
