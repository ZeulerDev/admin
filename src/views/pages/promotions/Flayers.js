import React, { useState, useEffect } from 'react'
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
    CPagination,
    CPaginationItem, CCardImage,
    CSpinner,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CFormInput,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CBadge,
    CRow,
    CCol,
    CInputGroup,
    CDropdownDivider,
    CFormCheck
} from '@coreui/react'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'
import { Link } from 'react-router-dom'
import { cilBan, cilFolderOpen, cilList, cilMove, cilPen, cilPencil, cilSchool, cilStorage, cilTrash, cilViewColumn, cilViewModule } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

import Market from './../Market/Markets';

const Flayers = () => {

    const [{ user, token }, dispatch] = useAppContext()
    const [loading, setLoading] = useState(false)


    const [itemsPerPageCategory, setItemsPerPageCategory] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(0)
    const [isDisable, setIsDisable] = useState(true)
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    const [resultCount, setResultCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemData, setItemData] = useState()

    const [categoryData, setCategoryData] = useState([])
    const [loadingMain, setLoadingMain] = useState(false)
    const [visibleMainModel, setVisibleMainModel] = useState(false)
    const [visibleMainSubModel, setVisibleMainSubModel] = useState(false)
    const [name, setName] = useState('')
    const [subName, setSubName] = useState('')
    const [index, setIndex] = useState('')
    const [markets, setMarket] = useState([])
    const [products, setProducts] = useState([])
    const [visible, setVisible] = useState(false)
    const [visibleMarket, setVisibleMarket] = useState(false)
    const [statusModel, setStatusModel] = useState(false)
    const [activate, setActivate] = useState(false)
    const [flayerId, setFlayerId] = useState('')

    const [selectedCityModal, setSelectedCityModal] = useState('All Cities')
    const [selectedChainModal, setSelectedChianModal] = useState('All Chains')
    const [paramCity, setParamCityData] = useState('')
    const [selectedCity, setSelectedCity] = useState('All Cities')
    const [paramCityModal, setParamCityDataModal] = useState('')
    const [paramChainIdModal, setParamChainDataModal] = useState('')
    const [selectedChain, setSelectedChian] = useState('All Chains')
    const [paramChainId, setParamChainData] = useState('')
    const [mGroupData, setMGroupData] = useState([])
    const [chainData, setChainData] = useState([])
    const [chainDataModal, setChainDataModal] = useState([])
    const [loadingModal, setLoadingModal] = useState(false)
    const [chainMarket, setChainMarketData] = useState([])
    const [ifHaveMarket, setIfHaveMarket] = useState('')
    const [flayerAccId, setFlayerAccId] = useState('')
    const [flayerObject, setFlayerObject] = useState({
        flayerId: ''
    })

    const [visibleAssignMarket, setVisibleAssignMarket] = useState(false)
    const [fId, setFid] = useState('')
    const [assignMarkets, setAssignMarkets] = useState([])
    const [loadingMarketModal, setLoadingMarkerModal] = useState(false)

    const [isDisableMarkets, setIsDisableMarkets] = useState(true)
    const [itemsPerPageMarkets, setItemsPerPageMarkets] = useState(0)
    const [resultCountMarkets, setResultCountMarkets] = useState(0)
    const [currentPageMarkets, setCurrentPageMarkets] = useState(1);

    const [visibleDeleteProduct, setVisibleDeleteProduct] = useState(false)
    const [passData, setPassData] = useState({
        flayer: '',
        fPid: ''
    })
    const [selectAvailability, setSelectAvailability] = useState('All')
    const [paramAvailability, setParamAvailability] = useState('')

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
            setLoadingMain(false);
        }, 20000);

        if (user && token) {
            loadData(0, timer)
        }

        return () => {
            clearTimeout(timer);
        };
    }, [user, token, debouncedSearchQuery,paramAvailability])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery.length >= 3) {
                setDebouncedSearchQuery(searchQuery);
            } else if (searchQuery.length === 0) {
                setDebouncedSearchQuery(searchQuery);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);


    const loadData = (count, timer) => {
        setLoadingMain(true)
        axios.get(BASE_URL + `flayers/all/${count}?search=${searchQuery}&available=${paramAvailability}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setCategoryData(res.data.list)
                    setResultCount(res.data.count)
                    // console.log(res.data.list)
                    setLoadingMain(false)
                    clearTimeout(timer);
                    if (res.data.list.length < 20) {
                        setIsDisable(true)
                        // console.log("ok")
                    } else if (res.data.list.length > 19) {
                        setIsDisable(false)
                    }
                    console.log(res.data.list.length)
                } else if (res.status === 500) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Category loading error',
                            message: res.data.message
                        }
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        const c = itemsPerPage + 20
        setItemsPerPageCategory(c)
        loadData(c, itemData)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
        const c = itemsPerPage - 20
        console.log(c)
        setItemsPerPageCategory(c)
        loadData(c, itemData)
    }

    const handlePages = (page) => {
        setCurrentPage(page);
        const c = (page - 1) * 20;
        setItemsPerPageCategory(c);
        loadData(c, itemData);
    };

    const renderPageNumbers = () => {
        const totalPages = Math.ceil(resultCount / 20);
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
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


    const handleMarketView = (stores, fId) => {
        setVisibleMainSubModel(true)
        setMarket(stores)
        setFlayerAccId(fId)
    }

    const handleMainSubCategory = () => {
        if (subName, index) {
            console.log(subName, index)
            handleSubmitMainSub(subName, index)
            setVisibleMainModel(false)
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Check the fields',
                    message: 'Please check the fields',
                    color: 'warning'
                }
            })
        }
    }



    const handleSubmitMain = (name) => {

        if (name) {
            const formData = {
                name: name,
            }
            if (user, token) {
                axios
                    .post(BASE_URL + 'product/category/main/add', formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Category Registration',
                                    message: 'Category Registration Success',
                                    color: 'success'
                                }
                            })
                            setVisibleMainModel(false)
                            setName('')
                            loadData(0)
                        } else if (res.status === 400) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Category Registration error',
                                    message: "Category Registration error",
                                    color: 'warning'
                                }
                            })
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Picker Registration error',
                                    message: 'Picker Registration error 500',
                                    color: 'warning'
                                }
                            })
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                    })
            }
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Error!',
                    message: 'Picker Registration error, Please Check the input fields',
                    color: 'warning'
                }
            })
        }
    }

    const handleFlayersProductsModal = (id) => {
        if (id) {
            setVisible(true)
            handleFlayersProducts(id)
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Error!',
                    message: 'Flayers Product Loading error, Please Check the input fields',
                    color: 'warning'
                }
            })
        }
    }

    const handleFlayersProducts = (id) => {

        if (id) {
            console.log('id', id)
            if (user, token) {
                setLoading(true)
                axios
                    .get(BASE_URL + 'flayer/products/' + id, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            setProducts(res.data)
                            setLoading(false)
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayers Product Loading error',
                                    message: "Flayers Product Loading error",
                                    color: 'warning'
                                }
                            })
                            setLoading(false)
                        } else if (res.status === 404) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayers Product Loading error',
                                    message: "Flayers Product Loading error",
                                    color: 'warning'
                                }
                            })
                            setLoading(false)
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayers Product Loading error',
                                    message: "Flayers Product Loading error",
                                    color: 'warning'
                                }
                            })
                            setLoading(false)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                        setLoading(false)
                    })
            }
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Missing!',
                    message: 'Flayers Product Loading error',
                    color: 'warning'
                }
            })
        }
    }

    const handleToggle = (flayerId, isActive) => {
        setStatusModel(true)
        setActivate(isActive)
        setFlayerId(flayerId)
    }

    const handleActivate = () => {

        const data = {
            status: activate
        }

        console.log(flayerId, data)

        if (user && token) {
            axios
                .patch(BASE_URL + 'assistant/flayer/status/' + flayerId, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("updated")
                        setStatusModel(false)
                        setActivate('')
                        setFlayerId('')
                        loadData(0, null)
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Flayer status update',
                                message: "Flayer status updated successfully",
                                color: 'success'
                            }
                        })
                    } else if (res.status === 203) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Flayer status update error',
                                message: res.data.message
                            }
                        })
                    } else if (res.status === 204) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Flayer status update error',
                                message: res.data.message
                            }
                        })
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Flayer status update error',
                                message: res.data.message
                            }
                        })
                    }
                }).catch((error) => {
                    console.error(error)
                })
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

    useEffect(() => {
        if (user && token) {
            loadDataMarket(0, true)
        }
    }, [paramChainIdModal, paramCityModal, user])

    const loadDataMarket = (count, moveNext) => {
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
                    setLoadingModal(false)
                    if (res.data.data.length < 20) {
                        setIsDisableMarkets(true)
                    } else if (res.data.data.length > 19) {
                        setIsDisableMarkets(false)
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

    const handleMarketsView = (id, market) => {
        setVisibleMainSubModel(false)
        setVisibleMarket(true)
        setIfHaveMarket(market)
        loadChain()
        console.log(id)
        setFlayerObject({
            flayerId: id
        })
    }
    // const handleAddMarketClick= (id)=>{
    //     console.log('market id', id)
    //     setFlayerObject(prevState => ({
    //         ...prevState,
    //         flayerAccId: flayerAccId
    //     }));
    //     handleMarketAssign(id)
    // }

    const handleMarketAssign = (mid) => {


        const data = flayerObject

        if (mid && flayerObject !== null) {
            if (user && token) {
                console.log('data', data)
                axios
                    .patch(BASE_URL + 'flayer/market/update/' + mid, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("updated")

                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayer market update',
                                    message: "Flayer market updated successfully",
                                    color: 'success'
                                }
                            })
                            setVisibleMarket(false)
                            setVisibleMainSubModel(true)
                        } else if (res.status === 203) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayer market update error',
                                    message: res.data.message
                                }
                            })
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayer market update error',
                                    message: res.data.message
                                }
                            })
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayer market update error',
                                    message: res.data.message
                                }
                            })
                        }
                    }).catch((error) => {
                        console.error(error)
                    })
            }
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Missing!',
                    message: 'Flayers Loading error',
                    color: 'warning'
                }
            })
        }

    }


    const handleToggleName = (id) => {
        console.log('id', id)
        setVisibleAssignMarket(true)
        setFid(id)
        loadAssignMarketData(id)
    }

    const loadAssignMarketData = (id) => {
        setLoadingMarkerModal(true)
        axios
            .get(
                BASE_URL + `flayer/market/assign/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length !== 0) {
                        setAssignMarkets(res.data)
                        console.log('data market')
                        setLoadingMarkerModal(false)
                    } else {
                        setLoadingMarkerModal(false)
                        // dispatch({
                        //     type: SET_ALERT,
                        //     payload: {
                        //         status: true,
                        //         title: 'Market Loading',
                        //         message: 'No market assigned to this flayer',
                        //         color: 'info'
                        //     }
                        // })
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

    const handleDeleteProducts = (flayer, fPid) => {
        setVisibleDeleteProduct(true)
        setPassData({
            flayer: flayer,
            fPid: fPid
        })
    }

    const handleDeleteProduct = (data) => {
        console.log('data', data)
        if (data) {
            if (user && token) {
                axios
                    .delete(BASE_URL + `assistant/flayer/product/${data.fPid}?fid=${data.flayer}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayer Product delete',
                                    message: 'Flayer Product delete success',
                                    color: 'success'
                                }
                            })
                            setVisibleDeleteProduct(false)
                            handleFlayersProducts(data.flayer)
                            setPassData({
                                flayer: '',
                                fPid: ''
                            })

                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayer Product delete error',
                                    message: res.data.message,
                                    color: 'warning'
                                }
                            })
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Flayer Product delete error',
                                    message: res.data.message,
                                    color: 'warning'
                                }
                            })
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Flayer Product delete error',
                                message: res.data.message,
                                color: 'warning'
                            }
                        })
                    })
            }
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Flayer Product delete error',
                    message: 'Flayer Product delete error',
                    color: 'warning'
                }
            })
        }
    }

    const availability = (status) => {
        if (status === 'all') {
            setParamAvailability('')
            setSelectAvailability('All')
        } else {
            setParamAvailability(status)
            setSelectAvailability(status)
        }
    }

    return (
        <CContainer>

            <CBadge style={{ marginLeft: '75%' }} color="secondary">Filter by</CBadge>
            <CDropdown style={{ marginLeft: '2%', width: '17%', marginRight: '5px', backgroundColor: '#ff4d4d' }}>
                <CDropdownToggle style={{ color: 'white' }}>{selectAvailability}</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem onClick={() => availability('all')}>All</CDropdownItem>
                    <CDropdownItem onClick={() => availability('yes')}>Yes</CDropdownItem>
                    <CDropdownItem onClick={() => availability('no')}>No</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>

            <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
                <CFormInput
                    type="text"
                    placeholder="Search by Id, end date and retailer "
                    style={{ width: 450, marginRight: '30%' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}

                />
            </CNavbar>
            {loadingMain ? <div className="d-flex justify-content-center"><CSpinner style={{ marginTop: "15%" }} /></div> : <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Retailer</CTableHeaderCell>

                        <CTableHeaderCell scope="col">Market(s) Availability</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Markets</CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">Disabled</CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Products</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Assigned Market</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>

                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {categoryData.length === 0 ? (
                        <CTableRow>
                            <CTableDataCell colSpan="8" style={{ textAlign: 'center', backgroundColor: "white" }}>
                                <h6 style={{ marginTop: "1%" }}>No Data</h6>
                            </CTableDataCell>
                        </CTableRow>
                    ) : (
                        categoryData.map((item, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableDataCell>{itemsPerPageCategory + index + 1}</CTableDataCell>
                                    <CTableDataCell>{item.flayer_id}</CTableDataCell>
                                    <CTableDataCell>{item.endDate}</CTableDataCell>
                                    <CTableDataCell>{item.retailer}</CTableDataCell>
                                    <CTableDataCell>  {item.stores.some(store => store.isLinked) ? "Yes" : "No"}</CTableDataCell>
                                  
                                    {/* <CTableDataCell>{item.status === true ? 'Active' : 'Inactive'}</CTableDataCell> */}
                                    <CTableDataCell>
                                        <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleMarketView(item.stores, item._id) }}>
                                            <CIcon icon={cilList} size='lg' style={{ color: 'white' }} />
                                        </CButton>
                                    </CTableDataCell>
                                    {/* <CTableDataCell>{item.disabled === false ? 'No' : 'Yes'}</CTableDataCell> */}
                                    <CTableDataCell>
                                        <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleFlayersProductsModal(item._id) }}>
                                            <CIcon icon={cilViewModule} size='lg' style={{ color: 'white' }} />
                                        </CButton>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleToggleName(item._id) }}>
                                            <CIcon icon={cilList} size='lg' style={{ color: 'white' }} />
                                        </CButton>
                                    </CTableDataCell>
                                    <CTableDataCell>{item.status === true ? <CButton size='sm' onClick={() => { handleToggle(item._id, false) }} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Deactivate</CButton> : <CButton size='sm' onClick={() => { handleToggle(item._id, true) }} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Activate</CButton>}</CTableDataCell>

                                </CTableRow>
                            )
                        })
                    )}
                </CTableBody>
            </CTable>
            }

            <CPagination aria-label="Page navigation example">
                <CPaginationItem
                    disabled={itemsPerPageCategory <= 0 ? true : false}
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

            <CModal alignment="center" visible={visibleDeleteProduct} scrollable size='sm' onClose={() => setVisibleDeleteProduct(false)}>
                <CModalHeader closeButton={false}>
                    <CModalTitle>Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Are you sure you want to delete this flayer product?</a><br></br><br></br>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <CButton onClick={() => handleDeleteProduct(passData)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
                        <CButton onClick={() => setVisibleDeleteProduct(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
                    </div>

                </CModalBody>
            </CModal>

            <CModal alignment="center" visible={visibleAssignMarket} scrollable size='lg' onClose={() => {
                setAssignMarkets([])
                setVisibleAssignMarket(false)
            }}>
                <CModalHeader closeButton>
                    <CModalTitle>All Assign Markets details</CModalTitle>
                </CModalHeader>
                <CModalBody>

                    {loadingMarketModal ? <div className="d-flex justify-content-center"><CSpinner style={{ marginTop: "15%" }} /></div> : <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Chain Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {assignMarkets.length === 0 ? (
                                <CTableRow>
                                    <CTableDataCell colSpan="4" style={{ textAlign: 'center', backgroundColor: "white" }}>
                                        <h6 style={{ marginTop: "1%" }}>No Data</h6>
                                    </CTableDataCell>
                                </CTableRow>
                            ) : (
                                assignMarkets.map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{index + 1}</CTableDataCell>
                                        <CTableDataCell>{item.chain.name}</CTableDataCell>
                                        <CTableDataCell>{item.address}</CTableDataCell>
                                        <CTableDataCell>{item.city}</CTableDataCell>
                                    </CTableRow>
                                ))
                            )}
                        </CTableBody>
                    </CTable>

                    }

                </CModalBody>
                <CModalFooter>
                </CModalFooter>
            </CModal>

            <CModal alignment="center" visible={visibleMainSubModel} scrollable size='lg' onClose={() => {
                setVisibleMainSubModel(false)
                setSubName('')
            }}>
                <CModalHeader closeButton>
                    <CModalTitle>Markets</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Market</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {markets.map((item, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{index + 1}</CTableDataCell>
                                        <CTableDataCell>{item.address}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleMarketsView(item._id, item.market) }}>
                                                <CIcon icon={cilList} size='lg' style={{ color: 'white' }} />
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })}
                        </CTableBody>
                    </CTable>
                </CModalBody>
                <CModalFooter>

                </CModalFooter>
            </CModal>

            <CModal visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Flayers Products Information</CModalTitle>
                </CModalHeader>
                <CModalBody
                    style={{
                        overflowY: 'auto',
                        maxHeight: '70vh',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {loading ? (
                        <div className="d-flex justify-content-center"><CSpinner style={{ marginTop: "15%" }} /></div>
                    ) : (
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>

                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {products.length === 0 ? (
                                    <CTableRow>
                                        <CTableDataCell colSpan="5" style={{ textAlign: 'center', backgroundColor: "white" }}>
                                            <h6 style={{ marginTop: "1%" }}>No Data</h6>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) : (
                                    products?.map((items, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1}</CTableDataCell>
                                            <CTableDataCell>
                                                <CCardImage
                                                    style={{ width: 50, height: 50, borderRadius: 10 }}
                                                    src={`https://api.zeuler.com/image/` + items.image}
                                                />
                                            </CTableDataCell>
                                            <CTableDataCell>{items.name}</CTableDataCell>
                                            <CTableDataCell>{items.price}</CTableDataCell>
                                            <CTableDataCell>{items.description}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleDeleteProducts(items.flayer, items._id) }}>
                                                    <CIcon icon={cilTrash} size='lg' style={{ color: 'white' }} />
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))
                                )}
                            </CTableBody>
                        </CTable>
                    )}
                </CModalBody>
                <CModalFooter>
                </CModalFooter>
            </CModal>

            <CModal alignment="center" visible={statusModel} scrollable size='sm' onClose={() => setStatusModel(false)}>
                <CModalHeader closeButton={false}>
                    <CModalTitle>Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Are you sure you want to {activate ? 'activate' : 'deactivate'} this flayer?</a><br></br><br></br>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <CButton onClick={() => { handleActivate() }} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
                        <CButton onClick={() => { setStatusModel(false) }} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
                    </div>
                </CModalBody>
            </CModal>

            <CModal visible={visibleMarket} scrollable size='xl' onClose={() => {
                setVisibleMarket(false)
                setVisibleMainSubModel(true)
                setSelectedChianModal('All Chains')
                setSelectedCityModal('All Cities')
                setParamChainDataModal('')
                setParamCityDataModal('')
            }}>
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
                    {loadingModal ? <div className="d-flex justify-content-center"><CSpinner style={{ marginTop: "15%" }} /></div> : <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Assign Market</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {chainMarket.length === 0 ? (
                                <CTableRow>
                                    <CTableDataCell colSpan="5" style={{ textAlign: 'center', backgroundColor: "white" }}>
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
                                        <CTableDataCell>
                                            {
                                                ifHaveMarket === item._id ?
                                                    (
                                                        <CButton size='sm' onClick={() => { }} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Assigned</CButton>
                                                    ) : (
                                                        <CButton size='sm' onClick={() => { handleMarketAssign(item._id) }} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Add</CButton>
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
    )
}

export default Flayers
