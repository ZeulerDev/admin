import { CBadge, CButton, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CSpinner } from '@coreui/react';
import React, { useEffect, useState } from 'react';

import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'
import { BASE_URL } from '../../../context/config';

const VirtualProducts = () => {

    const [{ user, token }, dispatch] = useAppContext()
    const [chainData, setChainData] = useState([])
    const [paramMId, setParamMarketData] = useState(null)
    const [chainMarket, setChainMarketData] = useState([])
    const [paramChainId, setParamChainData] = useState('')
    const [selectedChain, setSelectedChian] = useState('All Chains')
    const [selectedMarket, setSelectedMarket] = useState('All market')
    const [selectedMarketTo, setSelectedMarketTo] = useState('All market')
    const [paramChainIdTo, setParamChainDataTo] = useState('')
    const [selectedChainTo, setSelectedChianTo] = useState('All Chains')
    const [chainMarketTo, setChainMarketDataTo] = useState([])
    const [chainDataTo, setChainDataTo] = useState([])
    const [paramMIdTo, setParamMarketDataTo] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
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
                        setChainDataTo(res.data)
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
    }, [])


    const loadDataMarkets = (chainId, type) => {
        axios
            .get(
                BASE_URL+`assistant/market/locations?brand=${chainId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    if (type === 'from') {
                        setChainMarketData(res.data.data)

                    } else if (type === 'to') {
                        setChainMarketDataTo(res.data.data)
                    }

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


    const chain = (chainId, type, chianName) => {

        if (type === 'from') {
            if (chainId === 'all') {
                setParamChainData('')
                setSelectedChian('All Chains')
            } else {
                setParamChainData(chainId)
                loadDataMarkets(chainId, 'from')
                setSelectedChian(chianName)
            }
        } else if (type === 'to') {

            if (chainId === 'all') {
                setParamChainDataTo('')
                setSelectedChianTo('All Chains')
            } else {
                setParamChainDataTo(chainId)
                loadDataMarkets(chainId, 'to')
                setSelectedChianTo(chianName)
            }
        }

    }

    const market = (mId, type, marketName) => {

        if (type === 'from') {
            if (mId === 'all') {
                setParamMarketData('')
                setSelectedMarket('All Markets')
                setParamChainData('')
                setSelectedChian('All Chains')
            } else {
                setParamMarketData(mId)
                setSelectedMarket(marketName)
            }
        } else if (type === 'to') {

            if (mId === 'all') {
                setParamMarketDataTo('')
                setSelectedMarketTo('All Markets')
                setParamChainDataTo('')
                setSelectedChianTo('All Chains')
            } else {
                setParamMarketDataTo(mId)
                setSelectedMarketTo(marketName)
            }
        }

    }
    // const updateMarket = (fromMID, toMID) => {
    //     handleUpdate

    // }

    const handleUpdate = (fromMID, toMID) => {
        console.log('Update', fromMID, toMID);
        // if (fromMID === ' ' && toMID === ' ') {
            setLoading(true)
            if (token, user) {
                axios.post(BASE_URL+`product/market/copy?from=${fromMID}&to=${toMID}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => {
                        if (res.status === 200) {
                            setSelectedChian('All Chains')
                            setSelectedMarket('All Markets')
                            setSelectedChianTo('All Chains')
                            setSelectedMarketTo('All Markets')
                            setLoading(false)
                            dispatch({
                                type : SET_ALERT,
                                payload : {
                                  status : true,
                                  title : 'Product Clone',
                                  message : "Products cloned successfully",
                                  color : 'success'
                                }
                              })
                        } else if (res.status === 204) {
                            dispatch({
                                type : SET_ALERT,
                                payload : {
                                  status : true,
                                  title : 'Product Clone',
                                  message : "Products clone error",
                                  color : 'warning'
                                }
                              })
                              setLoading(false)
                        }else if (res.status === 404) {
                            dispatch({
                                type : SET_ALERT,
                                payload : {
                                  status : true,
                                  title : 'Product Clone',
                                  message : "No products to clone",
                                  color : 'warning'
                                }
                              })
                              setLoading(false)
                        }else if (res.status === 500) {
                            dispatch({
                                type : SET_ALERT,
                                payload : {
                                  status : true,
                                  title : 'Product Clone',
                                  message :  "Products clone error",
                                  color : 'warning'
                                }
                              })
                              setLoading(false)
                        }
                    })
                    .catch((err) => {
                        console.error('Error: ', err);
                    });
            }

        // } else {
        //     dispatch({
        //         type: SET_ALERT,
        //         payload: {
        //             status: true,
        //             title: 'Market Update error',
        //             message: 'Please select the market to update'
        //         }
        //     });
        // }
    }


return (
    <CContainer>
        <h4>From</h4><br></br>
        
        <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d', color:'white' }}>
            <CDropdownToggle style={{color:'white'}} >{selectedChain}</CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem onClick={() => chain('all', 'from')}>All</CDropdownItem>
                {chainData.map((item, index) => (
                    <CDropdownItem onClick={() => chain(item.id, 'from', item.name)} key={index}>
                        {item.name}
                    </CDropdownItem>
                ))}
            </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginLeft: '2%', width: '53%', backgroundColor: '#ff4d4d', color:'white' }}>
            <CDropdownToggle style={{color:'white'}} >{selectedMarket}</CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem onClick={() => market('all', 'from')}>Select the Chain</CDropdownItem>
                {chainMarket.map((item, index) => (
                    <CDropdownItem onClick={() => market(item._id, 'from', item.address)} key={index}>
                        {item.address}
                    </CDropdownItem>
                ))}
            </CDropdownMenu>
        </CDropdown>

        <br></br>  <h4>To</h4><br></br>
        
        <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' , color:'white'}}>
            <CDropdownToggle style={{color:'white'}} >{selectedChainTo}</CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem onClick={() => chain('all', 'to')}>All</CDropdownItem>
                {chainDataTo.map((item, index) => (
                    <CDropdownItem onClick={() => chain(item.id, 'to', item.name)} key={index}>
                        {item.name}
                    </CDropdownItem>
                ))}
            </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginLeft: '2%', width: '53%', backgroundColor: '#ff4d4d', color:'white' }}>
            <CDropdownToggle style={{color:'white'}} >{selectedMarketTo}</CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem onClick={() => market('all', 'to')}>Select the Chain</CDropdownItem>
                {chainMarketTo.map((item, index) => (
                    <CDropdownItem onClick={() => market(item._id, 'to', item.address)} key={index}>
                        {item.address}
                    </CDropdownItem>
                ))}
            </CDropdownMenu>
        </CDropdown>

        <br></br>
        <CButton onClick={() => handleUpdate(paramMId, paramMIdTo)} style={{ marginLeft: '2%', marginTop: '2%', backgroundColor: '#ff4d4d', color: 'white' }}>{ loading ? <CSpinner/> :'Update Market'}</CButton>
    </CContainer>
);
};

export default VirtualProducts;