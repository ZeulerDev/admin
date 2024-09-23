import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    CCardImage,
    CFormInput,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Promotion from './Promotion';

const ManageProducts = () => {

    const { id } = useParams()
    const [marketData, setMarketData] = useState([])
    const [loading, setLoading] = useState(false)
    const [{ user, token }, dispatch] = useAppContext()

    const [visible, setVisible] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [selectedCityModal, setSelectedCityModal] = useState('All Cities')
    const [selectedMarketModal, setSelectedMarketModal] = useState('All Markets')
    const [paramChainIdModal, setParamChainDataModal] = useState('')
    const [paramCityModal, setParamCityDataModal] = useState('')
    const [paramChainId, setParamChainData] = useState('')

    const [selectedCity, setSelectedCity] = useState('All Cities')
    const [paramCity, setParamCityData] = useState('')
    const [selectedChain, setSelectedChian] = useState('All Chains')
    const [chainData, setChainData] = useState([])
    const [chainDataModal, setChainDataModal] = useState([])

    const [chainMarket, setChainMarketData] = useState([])


    const [marketIds, setMarketIds] = useState([{ _id: '', name: '' }])

    const [isDisableProducts, setIsDisableProducts] = useState(true)
    const [itemsPerPageProducts, setItemsPerPageProducts] = useState(0)
    const [resultCountProducts, setResultCountProducts] = useState(0)
    const [currentPageProducts, setCurrentPageProducts] = useState(1);

    const [resultCount, setResultCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [isDisable, setIsDisable] = useState(true)
    const [itemsPerPage, setItemsPerPage] = useState(0)

    const [products, setProducts] = useState([])
    const [productsModal, setProductsModal] = useState([])
    const [productsIds, setProductsModalIds] = useState([])
    const [marketId, setMarketId] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryModal, setSearchQueryModal] = useState('');
    const [isOperated, setIsOperated] = useState(false)

    const [visiblePriceModal, setVisiblePriceModal] = useState(false)
    const [pid, setId] = useState('')
    const [price, setPrice] = useState('')
    const [priceDisplay, setPriceDisplay] = useState('')

    const [visiblePriceModalAll, setVisiblePriceModalAll] = useState(false)
    const [priceAll, setPriceAll] = useState('')
    const [priceDisplayAll, setPriceDisplayAll] = useState('')

    useEffect(() => {
        console.log('id', id)
        loadProducts(id, 0)
    }, [searchQuery])

    const loadProducts = (id, count) => {
        if (id) {
            console.log('id', id)

            if (user && token) {
                setLoading(true)
                axios
                    .get(BASE_URL + `promotion/products/${count}?promotionId=${id}&name=${searchQuery}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log('products', res.data.list)
                            setProducts(res.data.list)
                            setResultCountProducts(res.data.count)
                            // setMarketIds(res.data.market.map((item) => item._id))
                            setProductsModalIds(res.data.list.map((item) => item.productId))
                            setLoading(false)

                            if (res.data.list.length < 50) {
                                setIsDisableProducts(true)
                                console.log("ok")
                            } else if (res.data.list.length > 49) {
                                setIsDisableProducts(false)
                            }

                        } else if (res.status === 203) {
                            console.log('products 203')
                            setLoading(false)
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: ' Products loading error',
                                    message: res.data.message,
                                },
                            })
                        } else if (res.status === 204) {
                            console.log('products 204')
                            setLoading(false)
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: ' Products loading error',
                                    message: 'No products found',
                                    color: 'info'
                                },
                            })
                        } else if (res.status === 500) {
                            console.log('products 500')
                            setLoading(false)
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: ' Products loading error',
                                    message: res.data.message,
                                },
                            })
                        }
                    })
            } else {
                console.log('products non')
                setLoading(false)
                // dispatch({
                //     type: SET_ALERT,
                //     payload: {
                //         status: true,
                //         title: ' markets loading error',
                //         message: 'No user or token found',
                //     },
                // })
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

    //modal
    // useEffect(() => {
    //     if (user && token) {
    //         // loadData(0, true)
    //     }
    // }, [paramChainIdModal, paramCityModal, user])

    // const loadData = (count, moveNext) => {
    //     setLoadingModal(true)
    //     axios
    //         .get(
    //             BASE_URL + `assistant/market/locations/${count}?brand=${paramChainIdModal}&city=${paramCityModal}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             },
    //         )
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 setChainMarketData(res.data.data)
    //                 console.log('data market')
    //                 setLoadingModal(false)
    //                 if (res.data.data.length < 20) {
    //                     setIsDisable(true)
    //                     console.log("ok")
    //                 } else if (res.data.data.length > 19) {
    //                     setIsDisable(false)
    //                 }
    //             } else if (res.status === 500) {
    //                 dispatch({
    //                     type: SET_ALERT,
    //                     payload: {
    //                         status: true,
    //                         title: 'Market Loading error',
    //                         message: res.data.message
    //                     }
    //                 })
    //             }
    //         }).catch((err) => {
    //             console.error('Error: ', err)
    //         })
    // }


    // const nextPage = () => {
    //     const c = itemsPerPage + 20
    //     setItemsPerPage(c)
    //     loadData(c, true)
    // }

    // const previousPage = () => {
    //     const c = itemsPerPage - 20
    //     console.log(c)
    //     setItemsPerPage(c)
    //     loadData(c, false)
    // }

    const handleModalMarkets = () => {
        setVisible(true)
    }

    const addProducts = (promotionId, pId,) => {
        console.log('promotionId', promotionId, 'pId', pId)
        if (pId && promotionId) {
            const formData = {
                productId: pId,
            }

            if (user, token) {
                if (user && token) {
                    axios
                        .patch(BASE_URL + 'promotion/add/product/' + promotionId, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                setVisible(false)
                                loadProducts(promotionId)
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
                                        title: 'Product Assign',
                                        message: 'successfully Product assigned to the promotion',
                                        color: 'success'
                                    }
                                })

                            } else if (res.status === 400) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product Assign error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 404) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product Assign error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 500) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product Assign error',
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



    const removeProduct = (promotionId, pid) => {
        console.log('promotionId', promotionId, 'pid', pid)
        if (pid && promotionId) {
            const formData = {
                productId: pid,
            }

            if (user, token) {
                if (user && token) {
                    axios
                        .patch(BASE_URL + 'promotion/remove/product/' + promotionId, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                loadProducts(promotionId)
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

    const nextPageProducts = () => {
        setCurrentPageProducts(currentPageProducts + 1);
        const c = itemsPerPageProducts + 50
        setItemsPerPageProducts(c)
        loadProducts(id, c)
    }

    const previousPageProducts = () => {
        setCurrentPageProducts(currentPageProducts - 1);
        const c = itemsPerPageProducts - 50
        console.log(c)
        setItemsPerPageProducts(c)
        loadProducts(id, c)
    }

    const handlePagesProducts = (page) => {
        setCurrentPageProducts(page);
        const c = (page - 1) * 50;
        setItemsPerPageProducts(c);
        loadProducts(id, c)
    };

    const renderPageNumbersProducts = () => {
        const totalPages = Math.ceil(resultCountProducts / 50);
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        const startIndex = Math.max(currentPageProducts - 2, 1);
        const endIndex = Math.min(startIndex + 4, totalPages);
        const displayedPageNumbers = pageNumbers.slice(startIndex - 1, endIndex);
        return displayedPageNumbers.map((number) => (
            <CPaginationItem
                key={number}
                active={currentPageProducts === number}
                onClick={() => handlePagesProducts(number)}
            >
                {number}
            </CPaginationItem>
        ));
    };

    const loadMarkets = (id) => {
        if (id) {
            console.log('id', id)

            if (user && token) {
                axios
                    .get(BASE_URL + 'promotion/all/markets/' + id, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log('market', res.data.market)
                            setMarketIds(res.data.market.map((item) => ({ _id: item._id, name: item.address })))
                        } else if (res.status === 203) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: ' markets loading error',
                                    message: res.data.message,
                                },
                            })
                        } else if (res.status === 500) {
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

    const market = (mID, marketName) => {
        if (marketName === 'all') {
            setMarketId('')
            setSelectedMarketModal("All Markets")
            loadMarketsProducts(0, '', id)
            console.log('all')
        } else {
            console.log('selected', mID)
            setMarketId(mID)
            setSelectedMarketModal(marketName)
            loadMarketsProducts(0, mID, id)
        }
    }

    useEffect(() => {
        if (isOperated) {
            loadMarketsProducts(0, marketId, id)
        }
    }, [searchQueryModal])

    const loadMarketsProducts = (count, market, promoId) => {

        if (user && token) {
            setLoadingModal(true)
            axios
                .get(BASE_URL + `promotion/all/markets/products/${count}?marketId=${market}&promoId=${promoId}&name=${searchQueryModal}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        // console.log('market', res.data.list)
                        setProductsModal(res.data.list)
                        setResultCount(res.data.count)
                        setLoadingModal(false)
                        setIsOperated(true)
                        if (res.data.list.length < 20) {
                            setIsDisable(true)
                            console.log("ok")
                        } else if (res.data.list.length > 19) {
                            setIsDisable(false)
                        }
                    } else if (res.status === 203) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: ' Products loading error',
                                message: res.data.message,
                            },
                        })
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: ' Products loading error',
                                message: res.data.message,
                            },
                        })
                    }
                })
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: ' Products loading error',
                    message: 'No user or token found',
                },
            })
        }
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        const c = itemsPerPage + 50
        setItemsPerPage(c)
        loadMarketsProducts(c, marketId, id)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
        const c = itemsPerPage - 50
        console.log(c)
        setItemsPerPage(c)
        loadMarketsProducts(c, marketId, id)
    }

    const handlePages = (page) => {
        setCurrentPage(page);
        const c = (page - 1) * 50;
        setItemsPerPage(c);
        loadData(c, true);
    };

    const renderPageNumbers = () => {
        const totalPages = Math.ceil(resultCount / 50);
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

    const handleToggleName = (id, name) => {
        setVisiblePriceModal(true)
        setId(id)
        setPriceDisplay(name)
    }

    const updateName = () => {
        console.log("called")
        if (price == '') {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Alert',
                    message: 'Please enter the promotion price',
                    color: 'warning'
                }
            })
        } else {
            handleUpdate(pid)
        }
    }

    const handleUpdate = (id) => {
        console.log('product Id', id)
        if (id) {
            const formData = {
                value: price,
            }
            console.log('formData', formData)

            if (user, token) {
                if (user && token) {
                    axios
                        .patch(BASE_URL + 'promotion/update/promo/value/' + id, formData, {
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
                                        title: 'Product Details Update',
                                        message: 'Product promotion price update Success',
                                        color: 'success'
                                    }
                                })
                                setId('')
                                setPrice('')
                                setVisiblePriceModal(false)
                                setPriceDisplay('')
                                //   console.log('res', res.data)
                                const updatedEntity = res.data
                                const list = products.map((ob) => {
                                    if (ob.productId === updatedEntity.productId) {
                                        ob.promo_value = updatedEntity.promo_value
                                        return ob
                                    } else {
                                        return ob
                                    }
                                })
                                setProducts([...list])


                            } else if (res.status === 400) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product update error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 404) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product update error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 500) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product update error',
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

    const handleToggleAllValueChange = () => {
        setVisiblePriceModalAll(true)
    }

    const changePromotionValueAll = () => {
        console.log("called")
        if (priceAll == '') {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Alert',
                    message: 'Please enter the promotion price',
                    color: 'warning'
                }
            })
        } else {
            handleUpdateAllPromotionValue(id)
        }
    }

    const handleUpdateAllPromotionValue = (id) => {
        console.log('promotion Id', id)
        if (id) {
            const formData = {
                value: priceAll,
            }
            console.log('formData', formData)

            if (user, token) {
                if (user && token) {
                    axios
                        .patch(BASE_URL + 'promotion/update/promo/all/value/' + id, formData, {
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
                                        title: 'Product Details Update',
                                        message: 'Product promotion price update Success',
                                        color: 'success'
                                    }
                                })
                                setPriceAll('')
                                setVisiblePriceModalAll(false)
                                setPriceDisplayAll('')
                                //   console.log('res', res.data)
                                loadProducts(id, 0)


                            } else if (res.status === 400) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product update error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 404) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product update error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 500) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Product update error',
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
            <CButton onClick={() => {
                // setSearchQuery(' ')
                handleModalMarkets()
                loadMarkets(id)
                loadMarketsProducts(0, marketId, id)
            }} style={{ marginLeft: '0%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
                Add Products
            </CButton>

            <CNavbar style={{justifyContent : 'flex-start'}} className="bg-body-tertiary">
                <CFormInput
                    type="text"
                    placeholder="Search products by nameeeee"
                    style={{ width: 450, marginRight: '0%' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}

                />

                <CButton onClick={() => {
                    handleToggleAllValueChange()
                }} style={{ marginLeft: '44%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
                    Apply All
                </CButton>
            </CNavbar>
            {loading ? <CSpinner /> : <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Product Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Promotion Value</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Market Address</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Remove</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {products.map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                            <CTableDataCell>{item.pid}</CTableDataCell>
                            <CTableHeaderCell onClick={() => { }}><CCardImage style={{ width: '50px', height: '50px' }} src={`https://api.zeuler.com/image/` + item.image} /></CTableHeaderCell>
                            <CTableDataCell>{item.name}</CTableDataCell>
                            <CTableDataCell>{item.price}</CTableDataCell>
                            <CTableDataCell>{item.promo_value} €<Link to={``}><CIcon icon={cilPencil} size="sm" onClick={() => handleToggleName(item.productId, item.promo_value)} /></Link></CTableDataCell>
                            <CTableDataCell>{item.brand}</CTableDataCell>
                            <CTableDataCell>{item.chainName}</CTableDataCell>
                            <CTableDataCell>{item.marketAddress}</CTableDataCell>
                            <CTableDataCell>
                                <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { removeProduct(id, item.productId) }}>
                                    <CIcon icon={cilTrash} size='lg' style={{ color: 'white' }} />
                                </CButton>
                            </CTableDataCell>
                            {/* <CTableDataCell></CTableDataCell> */}

                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            }
            <CPagination aria-label="Page navigation example">
                <CPaginationItem
                    disabled={itemsPerPageProducts <= 0 ? true : false}
                    onClick={previousPageProducts}
                >
                    Previous
                </CPaginationItem>
                {renderPageNumbersProducts()}
                <CPaginationItem
                    disabled={isDisableProducts === true ? true : false}
                    onClick={nextPageProducts}
                >
                    Next
                </CPaginationItem>
            </CPagination>


            <CModal visible={visible} scrollable size='xl' onClose={() => {
                setIsOperated(false)
                setVisible(false)
                setSearchQueryModal('')
            }}>
                <CModalHeader closeButton>
                    <CModalTitle>Products assign view</CModalTitle>

                </CModalHeader>

                <CModalBody>
                    <CBadge style={{ marginLeft: '64%' }} color="secondary">Filter by</CBadge>


                    <CDropdown style={{ marginLeft: '2%', width: '28%', backgroundColor: '#ff4d4d', color: 'white' }}>
                        <CDropdownToggle style={{ color: 'white' }}>{selectedMarketModal}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => market(null, 'all')}>All</CDropdownItem>
                            {marketIds.map((item, index) => (
                                <CDropdownItem onClick={() => market(item._id, item.name)} key={index}>
                                    {item.name}
                                </CDropdownItem>
                            ))}
                        </CDropdownMenu>
                    </CDropdown>
                    <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
                        <CFormInput
                            type="text"
                            placeholder="Search products by name"
                            style={{ width: 450, marginRight: '60%' }}
                            value={searchQueryModal}
                            onChange={(e) => setSearchQueryModal(e.target.value)}

                        />
                    </CNavbar>
                    {loadingModal ? <CSpinner /> : <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Product Id</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Market Address</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {productsModal.map((item, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                                        <CTableDataCell>{item.pid}</CTableDataCell>
                                        <CTableHeaderCell><CCardImage style={{ width: '50px', height: '50px' }} src={`https://api.zeuler.com/image/` + item.image} /></CTableHeaderCell>
                                        <CTableDataCell>{item.name}</CTableDataCell>
                                        <CTableDataCell>{item.price}<Link to={``}></Link></CTableDataCell>
                                        <CTableDataCell>{item.brand}</CTableDataCell>
                                        <CTableDataCell>{item.chainName}</CTableDataCell>
                                        <CTableDataCell>{item.marketAddress}</CTableDataCell>
                                        <CTableDataCell>
                                            {
                                                productsIds.includes(item.productId) ? (
                                                    <CButton size='sm' onClick={() => { removeProduct(id, item.productId) }} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Remove</CButton>
                                                ) : (
                                                    <CButton size='sm' onClick={() => { addProducts(id, item.productId) }} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Add</CButton>
                                                )
                                            }
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })}
                        </CTableBody>
                    </CTable>

                    }


                    <CModalFooter>
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
                    </CModalFooter>

                </CModalBody>
            </CModal>


            <CModal alignment="center" visible={visiblePriceModal} scrollable size='sm' onClose={() => setVisiblePriceModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Change Promotion Value</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Add Promotion Value</a><br></br>
                    <CFormInput
                        type="text"
                        placeholder={priceDisplay}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </CModalBody>
                <CModalFooter>
                    {/* <CButton color="secondary" onClick={() => setVisiblePriceModal(false)}>
            Close
          </CButton> */}
                    <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => updateName()}>Save changes</CButton>
                </CModalFooter>
            </CModal>

            <CModal alignment="center" visible={visiblePriceModalAll} scrollable size='sm' onClose={() => setVisiblePriceModalAll(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Add promotion value to all products</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Add Promotion Value</a><br></br>
                    <CFormInput
                        type="text"
                        // placeholder={priceDisplayAll}
                        value={priceAll}
                        onChange={(e) => setPriceAll(e.target.value)} />
                </CModalBody>
                <CModalFooter>
                    {/* <CButton color="secondary" onClick={() => setVisiblePriceModal(false)}>
            Close
          </CButton> */}
                    <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => changePromotionValueAll()}>Save changes</CButton>
                </CModalFooter>
            </CModal>

        </CContainer>
    );
};

export default ManageProducts;