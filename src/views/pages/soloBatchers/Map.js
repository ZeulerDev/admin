import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CBadge, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CNavbar } from '@coreui/react';
import { BASE_URL } from '../../../context/config';
import { SET_ALERT } from '../../../context/context_reducer';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.css'
import { format } from 'date-fns';
import L from 'leaflet'
import CIcon from '@coreui/icons-react';
import { cilInfo } from '@coreui/icons';

const Map = () => {
  const position = [51.505, -0.09];
  const [paramStatus, setParamStatusData] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [paramGroup, setParamGroupData] = useState('')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [mGroupData, setMGroupData] = useState([])
  const [{ user, token }, dispatch] = useAppContext()
  const [selectedDates, setSelectedDates] = useState([])
  const [loading, setLoading] = useState(false)
  const [courierData, setCourierData] = useState([])
  const [location, setLocation] = useState([{
    market: [],
    customers: []
  }])
  // useEffect(() => {
  //     const currentDate = new Date();
  //     const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 5);
  //     const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  //     const formattedEndDate = format(currentDate, 'yyyy-MM-dd');
  //     setSelectedDates([formattedStartDate, formattedEndDate])
  //     // loadData([formattedStartDate, formattedEndDate]);
  //   }, []);

  const handleDateRangeChange = (value) => {
    if (value) {
      const formattedStartDate = format(value[0], 'yyyy-MM-dd')
      const formattedEndDate = format(value[1], 'yyyy-MM-dd')
      setSelectedDates([formattedStartDate, formattedEndDate])
      console.log(formattedStartDate, formattedEndDate)
    } else {
      setSelectedDates([])
    }
  }

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
  }, [user, token, paramStatus, selectedDates, paramGroup])

  

  const loadData = (count, timer) => {
    setLoading(true)
    axios
      .get(BASE_URL + `assistant/solo/courier/all/map/${count}?status=${paramStatus}&date=${selectedDates}&group=${paramGroup}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data)

          let data = res.data.data.map((item) => {

            let market = item.markets.map((item) => {
              return {
                lat: item.location.lat,
                lng: item.location.lng,
                address: item.address
              }
            })
            let customer = item.customers.map((item) => {
              return {
                lat: item.lat,
                lng: item.lng,
                address: item.address
              }
            })

            return {
              market: market,
              customer: customer
            }
          })
          console.log(data)
          setCourierData(data)
          console.log(res.data.data.length)
          setLoading(false)
          clearTimeout(timer)
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


  const groceryStatus = (status) => {
    if (status === 'all') {
      setParamStatusData('')
      setSelectedStatus('All Status')
    } else {
      setParamStatusData(status)
      setSelectedStatus(status)
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


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const createCustomIcon = (color) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
            position: relative;
            width: 25px;
            height: 41px;
            background-color: ${color}; 
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        ">
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 8px;
                height: 8px;
                background-color: white;  /* Inner circle color */
                border-radius: 50%;
                transform: translate(-50%, -50%);
            "></div>
        </div>`,
      iconSize: [25, 41],  // Adjusted for pin size
      iconAnchor: [12, 41],  // Adjust the anchor to the pin's bottom point
      popupAnchor: [0, -41]  // Where popups should open relative to the pin
    });
  };

  return (
    <CContainer>
       <CBadge style={{ marginLeft: '28%' }} color="secondary">Filter by</CBadge>
        <DateRangePicker
          style={{ marginLeft: 15, zIndex: 1000 }}
          format="yyyy/MM/dd"
          onChange={handleDateRangeChange}
          value={selectedDates.length > 0 ? [new Date(selectedDates[0]), new Date(selectedDates[1])] : null}
        />
        <CDropdown style={{ marginLeft: '2%', width: '20%', backgroundColor: '#ff4d4d'}}>
          <CDropdownToggle style={{ color: 'white' }}>{selectedMarketGroup}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => marketGroup('all')}>All</CDropdownItem>
            {mGroupData.map((item, index) => (
              <CDropdownItem onClick={() => marketGroup(item._id, item.name)} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginLeft: '2%', width: '20%', backgroundColor: '#ff4d4d' }}>
          <CDropdownToggle style={{ color: 'white' }} >{selectedStatus}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => groceryStatus('all')}>All Status</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('ready')}>Ready</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('picking')}>Picking</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('finished')}>Finished</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('start')}>Start</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('delivery')}>Delivery</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
      </CNavbar>
      
      <MapContainer dragging={true} center={[40.85631, 14.24641]} zoom={13} scrollWheelZoom={true} style={{ height: '500px', width: '100%',zIndex:-1 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {courierData.map((item, index) => {
          const marketColor = getRandomColor();
          const customerColor = getRandomColor();
          return (
            <React.Fragment key={index}>
              {item.customer.map((customer, customerIndex) => (
                <Marker key={customerIndex} position={[customer.lat, customer.lng]} icon={createCustomIcon(customerColor)}>
                  <Popup>
                    <CIcon
                      icon={cilInfo}
                      size="lg"
                      style={{ marginLeft: '10px' }}
                    />{' '}
                    <span>{customer.address}</span>
                  </Popup>
                </Marker>
              ))}
              {item.market.map((market, marketIndex) => (
                <Marker key={marketIndex} position={[market.lat, market.lng]} icon={createCustomIcon(marketColor)}>
                  <Popup>
                    <CIcon
                      icon={cilInfo}
                      size="lg"
                      style={{ marginLeft: '10px' }}
                    />{' '}
                    <span>{market.address}</span>
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </CContainer>
  );
};

export default Map;