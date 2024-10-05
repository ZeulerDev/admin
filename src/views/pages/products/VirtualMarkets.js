import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilBan, cilBasket, cilDelete, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import { BASE_URL } from '../../../context/config'

const VirtualMarkets = () => {
    const [{ user, token }, dispatch] = useAppContext()
    const [chainData, setChainData] = useState([])
    const [chainMarket, setChainMarketData] = useState([])
    const [paramChainId, setParamChainData] = useState('')
    const [paramCity, setParamCityData] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(0)
    const [selectedCity, setSelectedCity] = useState('All Cities')
    const [selectedChain, setSelectedChian] = useState('All Chains')
    const [isChecked, setIsChecked] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingDeleteMarket, setLoadingDeleteMarket] = useState(false)
    const [loadingDeleteProducts, setLoadingDeleteProducts] = useState(false)
    const [isDisable, setIsDisable] = useState(true)
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [visibleEmpty, setVisibleEmpty] = useState(false)
    const [mId, setMId] = useState('')
    const [mIdProducts, setMIdProducts] = useState('')
    const [resultCount, setResultCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
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

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Data Loading',
                    message: 'Data loading error: Timeout exceeded',
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
    }, [paramChainId, paramCity, user])

    const loadData = (count, timer) => {
        setLoading(true)
        axios
            .get(
                BASE_URL + `assistant/virtual/market/locations/${count}?brand=${paramChainId}&city=${paramCity}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    setChainMarketData(res.data.data)
                    setResultCount(res.data.count)
                    console.log('count',res.data.count)
                    setLoading(false)
                    clearTimeout(timer)
                    if (res.data.data.length < 20) {
                        setIsDisable(true)
                        console.log("ok")
                    } else if (res.data.data.length > 19) {
                        setIsDisable(false)
                    }
                } else if (res.status === 500) {
                    setLoading(false)
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
                setLoading(false)
                console.error('Error: ', err)
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
        loadData(c, true)
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

    const city = (city) => {
        if (city === 'all') {
            setParamCityData('')
            setSelectedCity('All Cities')
        } else {
            setParamCityData(city)
            setSelectedCity(city)
        }
    }
    const handleCheckboxChange = (marketId, boolean, service) => {

        console.log(marketId)
        console.log(chainMarket)


        if (service === "delivery") {

            const updateData = {
                "market": marketId,
                "service": service
            }
            addService(updateData)
            console.log('add delivery')


        } else if (service === "pickup") {

            const updateData = {
                "market": marketId,
                "service": service
            }
            addService(updateData)
            console.log('add pickup')
        }
    }

    const remService = (marketId, boolean, service) => {

        if (service === "delivery") {

            const reData = {
                "market": marketId,
                "service": service
            }
            removeService(reData)
            console.log('remove delivery')


        } else if (service === "pickup") {

            const reData = {
                "market": marketId,
                "service": service
            }
            removeService(reData)
            console.log('remove pickup')
        }


    }

    const addService = (serviceData) => {

        axios
            .post(
                BASE_URL + `assistant/markets/add/services`, serviceData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    console.log('Updated add service')
                } else if (res.status === 203) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market Updated error',
                            message: res.data.message
                        }
                    })
                } else if (res.status === 204) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market Updated error',
                            message: res.data.message
                        }
                    })
                } else if (res.status === 500) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market Updated error',
                            message: res.data.message
                        }
                    })
                }
            }).catch((err) => {
                console.error('Error:', err)
            })

    }

    const removeService = (serviceReData) => {

        axios
            .post(
                BASE_URL + `assistant/markets/remove/services`, serviceReData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    console.log('Updated remove service')
                } else if (res.status === 203) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market remove error',
                            message: res.data.message
                        }
                    })
                } else if (res.status === 204) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market remove error',
                            message: res.data.message
                        }
                    })
                } else if (res.status === 500) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market remove error',
                            message: res.data.message
                        }
                    })
                }
            }).catch((err) => {
                console.error('Error:', err)
            })

    }

    const handleToggle = (id) => {
        setVisible(!visible)
        setMId(id)
    }

    const handleMarketProductsToggle = (id) => {
        setVisibleEmpty(!visibleEmpty)
        setMIdProducts(id)
    }

    const deleteMarketVirtual = (id) => {
        if (user && token) {
            setLoadingDeleteMarket(true)
            console.log(id)
            axios
                .delete(
                    BASE_URL + `market/virtual/` + id,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Market Delete',
                                message: 'Market Remove Success',
                                color: 'success'
                            }
                        })
                        setLoadingDeleteMarket(false)
                        setVisible(false)
                        loadData(0, true)

                    } else if (res.status === 404) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Market remove error',
                                message: res.data.message
                            }
                        })
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Market remove error',
                                message: res.data.message
                            }
                        })
                    }
                }).catch((err) => {
                    console.error('Error:', err)
                })
        }
    }

    const deleteMarketProducts = (id) => {
        if (user && token) {
        setLoadingDeleteProducts(true)
        console.log('id', id)
        axios
            .delete(
                BASE_URL + `product/delete/all/` + id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market Products Delete',
                            message: 'Market Products Remove Success',
                            color: 'success'
                        }
                    })
                    setLoadingDeleteProducts(false)
                    setVisibleEmpty(false)
                    loadData(0, true)
                    console.log('Remove Market Products')

                } else if (res.status === 404) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market Products remove error',
                            message: res.data.message
                        }
                    })
                } else if (res.status === 500) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Market Products remove error',
                            message: res.data.message
                        }
                    })
                }
            }).catch((err) => {
                console.error('Error:', err)
            })
        }

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
        console.log(pageNumbers, totalPages);
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

    return (
        <CContainer>
            <CBadge style={{ marginLeft: '57%' }} color="secondary">Filter by</CBadge>
            <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' }}>
                <CDropdownToggle style={{ color: 'white' }}>{selectedCity}</CDropdownToggle>
                <CDropdownMenu >
                    <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
                    <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
                    <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>

            <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' }}>
                <CDropdownToggle style={{ color: 'white' }}>{selectedChain}</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
                    {chainData.map((item, index) => (
                        <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
                            {item.name}
                        </CDropdownItem>
                    ))}
                </CDropdownMenu>
            </CDropdown>
            <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
            </CNavbar>

            {loading ? <CSpinner /> : <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                        <CTableHeaderCell scope="col">City</CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">Delivery</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Pickup</CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Scraped</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Empty Products</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {chainMarket.map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                            <CTableDataCell>{item.chain.name}</CTableDataCell>
                            <CTableDataCell>{item.address}</CTableDataCell>
                            <CTableDataCell>{item.city}</CTableDataCell>
                            {/* <CTableDataCell>
                                {item.services.includes('delivery') ? (
                                    <CFormCheck
                                        id="flexCheckChecked"
                                        label=""
                                        defaultChecked
                                        onChange={() => remService(item._id, true, 'delivery')}
                                    />
                                ) : (
                                    <CFormCheck
                                        id="flexCheckChecked"
                                        label=""
                                        onChange={() => handleCheckboxChange(item._id, true, 'delivery')}
                                    />
                                )}
                            </CTableDataCell>
                            <CTableDataCell>
                                {item.services.includes('pickup') ? (
                                    <CFormCheck
                                        id="flexCheckChecked"
                                        label=""
                                        defaultChecked
                                        onChange={() => remService(item._id, true, 'pickup')}
                                    />
                                ) : (
                                    <CFormCheck
                                        id="flexCheckChecked"
                                        label=""
                                        onChange={() => handleCheckboxChange(item._id, true, 'pickup')}
                                    />
                                )}
                            </CTableDataCell> */}
                            <CTableDataCell>{item.scraped}</CTableDataCell>
                            <CTableDataCell>
                                <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => handleToggle(item._id)}>
                                    <CIcon icon={cilTrash} size='lg' style={{ color: 'white' }} />
                                </CButton>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => handleMarketProductsToggle(item._id)}>
                                    <CIcon icon={cilBan} size='lg' style={{ color: 'white' }} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            }


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

            {/* <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination> */}


            <CModal alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
                <CModalHeader closeButton={false}>
                    <CModalTitle>Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Are you sure you want to delete this market?</a><br></br><br></br>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        {
                            loadingDeleteMarket ? <CSpinner /> :
                                <>
                                    <CButton onClick={() => deleteMarketVirtual(mId)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }}>Yes</CButton>
                                    <CButton onClick={() => setVisible(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }}>No</CButton>
                                </>
                        }

                    </div>

                </CModalBody>
            </CModal>

            <CModal alignment="center" visible={visibleEmpty} scrollable size='sm' onClose={() => setVisibleEmpty(false)}>
                <CModalHeader closeButton={false}>
                    <CModalTitle>Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Are you sure you want to delete all products in this market?</a><br></br><br></br>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <CButton onClick={() => deleteMarketProducts(mIdProducts)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
                        <CButton onClick={() => setVisibleEmpty(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
                    </div>

                </CModalBody>
            </CModal>
        </CContainer>
    )
}

export default VirtualMarkets