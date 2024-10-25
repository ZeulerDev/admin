import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../context/config';
import axios from 'axios';
import { SET_ALERT } from '../../../context/context_reducer'
import { useAppContext } from '../../../context/AppContext'
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
    CBadge,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const AddMarket = () => {

    const { id } = useParams()
    const [marketData, setMarketData] = useState([])
    const [loading, setLoading] = useState(false)
    const [{ user, token }, dispatch] = useAppContext()

    const [visible, setVisible] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [selectedCityModal, setSelectedCityModal] = useState('All Cities')
    const [selectedChainModal, setSelectedChianModal] = useState('All Chains')
    const [paramChainIdModal, setParamChainDataModal] = useState('')
    const [paramCityModal, setParamCityDataModal] = useState('')
    const [paramChainId, setParamChainData] = useState('')

    const [selectedCity, setSelectedCity] = useState('All Cities')
    const [paramCity, setParamCityData] = useState('')
    const [selectedChain, setSelectedChian] = useState('All Chains')
    const [chainData, setChainData] = useState([])
    const [chainDataModal, setChainDataModal] = useState([])

    const [chainMarket, setChainMarketData] = useState([])
    const [isDisable, setIsDisable] = useState(true)
    const [itemsPerPage, setItemsPerPage] = useState(0)

    const [marketIds, setMarketIds] = useState([])

    const [isDisableMarkets, setIsDisableMarkets] = useState(true)
    const [itemsPerPageMarkets, setItemsPerPageMarkets] = useState(0)
    const [resultCountMarkets, setResultCountMarkets] = useState(0)
    const [currentPageMarkets, setCurrentPageMarkets] = useState(1);


    useEffect(() => {
        console.log('id', id)
        loadMarkets(id)
    }, [])

    const loadMarkets = (id) => {
        if (id) {
            console.log('id', id)

            if (user && token) {
                setLoading(true)
                axios
                    .get(BASE_URL + 'promotion/all/markets/' + id, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log('market', res.data.market)
                            setMarketData(res.data.market)
                            setMarketIds(res.data.market.map((item) => item._id))
                            setLoading(false)
                        } else if (res.status === 203) {
                            setLoading(false)
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: ' markets loading error',
                                    message: res.data.message,
                                },
                            })
                        } else if (res.status === 500) {
                            setLoading(false)
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: ' markets loading error',
                                    message: res.data.message,
                                },
                            })
                        }
                    })
            } else {
                setLoading(false)
                dispatch({
                    type: SET_ALERT,
                    payload: {
                        status: true,
                        title: ' markets loading error',
                        message: 'No user or token found',
                    },
                })
            }
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: ' markets loading error',
                    message: 'No id found',
                },
            })
        }

    }

    useEffect(() => {
        loadChain()
    }, [])

    const loadChain = () => {
        if (token) {
            axios
                .get(BASE_URL + 'assistant/market/chains/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setChainData(res.data)
                        setChainDataModal(res.data)
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
    }

    const city = (city, type) => {

        if (type === 'view') {
            if (city === 'all') {
                setParamCityData('')
                setSelectedCity('All Cities')
            } else {
                setParamCityData(city)
                setSelectedCity(city)
            }

        } else if (type === 'modal') {
            if (city === 'all') {
                setParamCityDataModal('')
                setSelectedCityModal('All Cities')
            } else {
                setParamCityDataModal(city)
                setSelectedCityModal(city)
            }
        }
    }

    const chain = (chainId, chianName, type) => {

        if (type === 'view') {

            if (chainId === 'all') {
                setParamChainData('')
                setSelectedChian('All Chains')

            } else {
                setParamChainData(chainId)
                setSelectedChian(chianName)
            }

        } else if (type === 'modal') {
            if (chainId === 'all') {
                setParamChainDataModal('')
                setSelectedChianModal('All Chains')

            } else {
                setParamChainDataModal(chainId)
                setSelectedChianModal(chianName)
            }
        }


    }

    //modal
    useEffect(() => {
        if (user && token) {
            loadData(0, true)
        }
    }, [paramChainIdModal, paramCityModal, user])

    const loadData = (count, moveNext) => {
        setLoadingModal(true)
        axios
            .get(
                BASE_URL + `assistant/market/locations/${count}?brand=${paramChainIdModal}&city=${paramCityModal}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    setChainMarketData(res.data.data)
                    setResultCountMarkets(res.data.count)
                    console.log('data market')
                    setLoadingModal(false)
                    if (res.data.data.length < 20) {
                        setIsDisable(true)
                        console.log("ok")
                    } else if (res.data.data.length > 19) {
                        setIsDisable(false)
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

    const nextPageProducts = () => {
        setCurrentPageMarkets(currentPageMarkets + 1);
        const c = itemsPerPageMarkets + 20
        setItemsPerPageMarkets(c)
        loadDataMarket(c, true)
    }

    const previousPageProducts = () => {
        setCurrentPageMarkets(currentPageMarkets - 1);
        const c = itemsPerPageMarkets - 20
        console.log(c)
        setItemsPerPageMarkets(c)
        loadDataMarket(c, true)
    }

    const handlePagesProducts = (page) => {
        setCurrentPageMarkets(page);
        const c = (page - 1) * 20;
        setItemsPerPageMarkets(c);
        loadDataMarket(c, true)
    };

    const renderPageNumbersProducts = () => {
        const totalPages = Math.ceil(resultCountMarkets / 20);
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        const startIndex = Math.max(currentPageMarkets - 2, 1);
        const endIndex = Math.min(startIndex + 4, totalPages);
        const displayedPageNumbers = pageNumbers.slice(startIndex - 1, endIndex);
        return displayedPageNumbers.map((number) => (
            <CPaginationItem
                key={number}
                active={currentPageMarkets === number}
                onClick={() => handlePagesProducts(number)}
            >
                {number}
            </CPaginationItem>
        ));
    };


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

    const handleModalMarkets = () => {
        setVisible(true)
    }

    const addMarket = (promotionId, marketId,) => {
        if (marketId && promotionId) {
            const formData = {
                marketId: marketId,
            }

            if (user, token) {
                if (user && token) {
                    axios
                        .patch(BASE_URL + 'promotion/add/market/' + promotionId, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                setVisible(false)
                                loadMarkets(promotionId)
                                // const updatedEntity = res.data
                                // const list = marketData.map((ob) => {
                                //  if(ob.id === updatedEntity.id){
                                //     return updatedEntity
                                //    } else {
                                //   return ob
                                //    }
                                //    })
                                //      setMarketData([...list])

                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Market Assign',
                                        message: 'successfully Market assigned to the promotion',
                                        color: 'success'
                                    }
                                })

                            } else if (res.status === 400) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Market Assign error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 404) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Market Assign error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 500) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Market Assign error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error)
                        })

                }
            }
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Error!',
                    message: 'check again',
                    color: 'warning'
                }
            })
        }
    }



    const removeMarket = (promotionId, marketId) => {
        if (marketId && promotionId) {
            const formData = {
                marketId: marketId,
            }

            if (user, token) {
                if (user && token) {
                    axios
                        .patch(BASE_URL + 'promotion/remove/market/' + promotionId, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                loadMarkets(promotionId)
                                setVisible(false)

                                // const updatedEntity = res.data
                                // const list = marketData.map((ob) => {
                                //  if(ob.id === updatedEntity.id){
                                //     return updatedEntity
                                //    } else {
                                //   return ob
                                //    }
                                //    })
                                //      setMarketData([...list])
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Market Assign',
                                        message: 'successfully Market removed from the promotion',
                                        color: 'success'
                                    }
                                })


                            } else if (res.status === 204) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Market remove error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 500) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Market remove error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error)
                        })

                }
            }
        } else {

            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Error!',
                    message: 'check again',
                    color: 'warning'
                }
            })

        }
    }

    return (
        <CContainer>
            <CButton onClick={() => { handleModalMarkets() }} style={{ marginLeft: '0%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
                Add Market
            </CButton>

            <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary"></CNavbar>
            {loading ? <CSpinner /> : <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                        <CTableHeaderCell scope="col">City</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Remove Market </CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col"></CTableHeaderCell> */}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {marketData.length === 0 ? (
                                    <CTableRow>
                                        <CTableDataCell colSpan="5" style={{ textAlign: 'center', backgroundColor: "white" }}>
                                            <h6 style={{ marginTop: "1%" }}>No Data</h6>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) : (
                    marketData.map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{index + 1}</CTableDataCell>
                            <CTableDataCell>{item.chain.name}</CTableDataCell>
                            <CTableDataCell>{item.address}</CTableDataCell>
                            <CTableDataCell>{item.city}</CTableDataCell>
                            <CTableDataCell>
                                <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { removeMarket(id, item._id) }}>
                                    <CIcon icon={cilTrash} size='lg' style={{ color: 'white' }} />
                                </CButton>
                            </CTableDataCell>
                            {/* <CTableDataCell></CTableDataCell> */}

                        </CTableRow>
                    ))
                )}
                </CTableBody>
            </CTable>

            }


            <CModal visible={visible} scrollable size='xl' onClose={() => 
                {setVisible(false)
                setSelectedChianModal('All Chains')
                setSelectedCityModal('All Cities')
                setParamChainDataModal('')
                setParamCityDataModal('')}
                }>
                <CModalHeader closeButton>
                    <CModalTitle>Market assign view</CModalTitle>

                </CModalHeader>


                <CModalBody>
                    <CBadge style={{ marginLeft: '54%' }} color="secondary">Filter by</CBadge>
                    <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
                        <CDropdownToggle style={{ color: 'white' }} >{selectedCityModal}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => city('all', 'modal')}>All</CDropdownItem>
                            <CDropdownItem onClick={() => city('Milano', 'modal')}>Milano</CDropdownItem>
                            <CDropdownItem onClick={() => city('Napoli', 'modal')}>Napoli</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>

                    <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d', color: 'white' }}>
                        <CDropdownToggle style={{ color: 'white' }}>{selectedChainModal}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => chain('all', null, 'modal')}>All</CDropdownItem>
                            {chainDataModal.map((item, index) => (
                                <CDropdownItem onClick={() => chain(item.id, item.name, 'modal')} key={index}>
                                    {item.name}
                                </CDropdownItem>
                            ))}
                        </CDropdownMenu>
                    </CDropdown>
                    <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

                    </CNavbar>
                    {loadingModal ? <CSpinner /> : <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {chainMarket.length === 0 ? (
                                    <CTableRow>
                                        <CTableDataCell colSpan="6" style={{ textAlign: 'center', backgroundColor: "white" }}>
                                            <h6 style={{ marginTop: "1%" }}>No Data</h6>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) : (
                            chainMarket.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{itemsPerPageMarkets + index + 1}</CTableDataCell>
                                    <CTableDataCell>{item.chain.name}</CTableDataCell>
                                    <CTableDataCell>{item.address}</CTableDataCell>
                                    <CTableDataCell>{item.city}</CTableDataCell>
                                    <CTableDataCell>{item.scraped}</CTableDataCell>
                                    <CTableDataCell>
                                        {
                                            marketIds.includes(item._id) ? (
                                                <CButton size='sm' onClick={() => removeMarket(id, item._id)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Remove</CButton>
                                            ) : (
                                                <CButton size='sm' onClick={() => addMarket(id, item._id)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Add</CButton>
                                            )
                                        }
                                    </CTableDataCell>

                                </CTableRow>
                            ))
                        )}
                        </CTableBody>
                    </CTable>

                    }


                    <CModalFooter>
                    <CPagination aria-label="Page navigation example">
                            <CPaginationItem
                                disabled={itemsPerPageMarkets <= 0 ? true : false}
                                onClick={previousPageProducts}
                            >
                                Previous
                            </CPaginationItem>
                            {renderPageNumbersProducts()}
                            <CPaginationItem
                                disabled={isDisableMarkets === true ? true : false}
                                onClick={nextPageProducts}
                            >
                                Next
                            </CPaginationItem>
                        </CPagination>
                    </CModalFooter>

                </CModalBody>
            </CModal>


        </CContainer>
    );
};

export default AddMarket;