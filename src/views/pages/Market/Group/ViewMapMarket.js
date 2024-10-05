import {
    CButton,
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CNavbar,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import React, { useEffect, useState, Suspense } from 'react'
import { Popup } from 'react-leaflet'
const Marker = React.lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
// const Popup = React.lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })))
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilDrop, cilInfo, cilNotes } from '@coreui/icons'
import { useAppContext } from '../../../../context/AppContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../../../context/config'
import { SET_ALERT } from '../../../../context/context_reducer'


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const ViewMarketMap = () => {
    const { id } = useParams()
    const [visible, setVisible] = useState(false)
    const [{ user, token }, dispatch] = useAppContext()
    const [paramMapCity, setParamCityData] = useState('Napoli')
    const [selectedCity, setSelectedCity] = useState('Napoli')
    const [marketGroupLocation, setMarketGroupLocation] = useState([])
    const [marketGroupData, setMarketGroupData] = useState([])
    const [marketsId, setMarketsId] = useState()
    const [center, setCenter] = useState({lat: "", lng: ""})

    useEffect(() => {
        console.log('id', id)
    })
    const handleToggle = (paramCity, mId) => {
        setVisible(!visible)
        setMarketsId(mId)
        axios
            .get(BASE_URL + `market/groups/fetch/0?city=${paramCity}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setMarketGroupData(res.data)
                } else if (res.status === 500) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'City loading error',
                            message: res.data.message
                        }
                    })
                }
            }).catch((err) => {
                console.error('Error:', err)
            })
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
                .get(BASE_URL + `assistant/markets/groups/locations/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setMarketGroupLocation(res.data.data)
                        setCenter({lat: res.data.center.lat, lng: res.data.center.lng})
                        console.log('center point', res.data.center)
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Market Group loading error',
                                message: res.data.message
                            }
                        })
                    }
                }).catch((err) => {
                    console.error('Error:', err)
                })
        }
    }, [user, paramMapCity])

    const addMarket = (mId, gId) => {
        if (mId && gId) {

            if (user && token) {
                console.log('one')
                axios
                    .put(BASE_URL + `market/groups/assign/${gId}/${mId}`, {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })


                    .then((res) => {
                        if (res.status === 200) {
                            setVisible(false)
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Market Assign',
                                    message: 'New Market Assign Successfully',
                                    color: 'success'
                                }
                            })
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Market Assign error',
                                    message: res.data.message
                                }
                            })
                        }
                        else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Market Assign error',
                                    message: res.data.message
                                }
                            })
                        }
                    }).catch((err) => {
                        console.error('Error:', err)
                    })
            }
        }
    }

    const removeMarket = (mId, gId) => {
        if (mId && gId) {

            if (user && token) {
                axios
                    .put(BASE_URL + `market/groups/remove/${gId}/${mId}`, {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                    .then((res) => {
                        if (res.status === 200) {
                            setVisible(false)
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Market Remove',
                                    message: 'Market removed Successfully',
                                    color: 'success'
                                }
                            })
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Market Remove error',
                                    message: res.data.message
                                }
                            })
                        }
                        else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Market Remove error',
                                    message: res.data.message
                                }
                            })
                        }
                    }).catch((err) => {
                        console.error('Error:', err)
                    })
            }
        }
    }

    const greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    return (
        <CContainer>
            <CNavbar className="bg-body-tertiary">
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

                    <Marker position={[center.lat, center.lng]} icon={greenIcon}>
                        <Popup>
                            <div onClick={() => { }}>
                                <span>Center Point</span>
                            </div>
                        </Popup>
                    </Marker>
                    {marketGroupLocation.map((item, index) => (
                        <Marker key={index} position={[item.lat, item.lng]} onClick={() => handleToggle(item.city, item._id)}>
                            <Popup>
                                <div onClick={() => handleToggle(item.city, item._id)}>
                                    <CIcon icon={cilInfo} size="lg" style={{ marginLeft: '10px' }} />{' '}
                                    <span>{item.address}</span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </Suspense>
            </MapContainer>


        </CContainer>
    )
}

export default ViewMarketMap
