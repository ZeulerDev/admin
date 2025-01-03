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
    CBadge
} from '@coreui/react'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'
import { Link } from 'react-router-dom'
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const VirtualMarket = () => {

    const [{ user, token }, dispatch] = useAppContext()
    const [loading, setLoading] = useState(false)
    const [loadingActive, setLoadingActive] = useState(false)
    const [loadingDeActive, setLoadingDeActive] = useState(false)
    const [syncLoading, setSyncLoading] = useState(false)
    const [productData, setProductData] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(0)
    const [isDisable, setIsDisable] = useState(true)
    const [chainData, setChainData] = useState([])
    const [selectedChain, setSelectedChian] = useState('All Chains')
    const [selectedMarket, setSelectedMarket] = useState('All market')
    const [paramChainId, setParamChainData] = useState('')
    const [paramMId, setParamMarketData] = useState('')
    const [chainMarket, setChainMarketData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
    const [visiblePriceModal, setVisiblePriceModal] = useState(false)
    const [id, setId] = useState('')
    const [price, setPrice] = useState('')
    const [priceDisplay, setPriceDisplay] = useState('')
    const [resultCount, setResultCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchType, setSearchType] = useState('NAME')

    const [imageUpload, setImageUpload] = useState(false)
    const [productId, setProductId] = useState('')
    const [visible, setVisible] = useState(false)
    const [isActivate, setActivate] = useState(false)

    useEffect(() => {
        if (user && token) {
            loadData(0, true)
        }
    }, [user, token, paramMId, debouncedSearchQuery])

    useEffect(() => {
        const handler = setTimeout(() => {
          if (searchQuery.length >= 3) {
            setDebouncedSearchQuery(searchQuery);
        }else if(searchQuery.length === 0){
          setDebouncedSearchQuery(searchQuery);
        }
        }, 500);
    
        return () => {
          clearTimeout(handler);
        };
      }, [searchQuery]);
    

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

    const loadDataMarkets = (chainId) => {
        axios
            .get(
                BASE_URL + `assistant/reference/market/locations?brand=${chainId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    setChainMarketData(res.data.data)
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

    const loadData = (count, moveNext) => {
        setLoading(true)
        axios
            .get(BASE_URL + `virtual/product/all/${count}?marketId=${paramMId}&name=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setProductData(res.data.list)
                    setResultCount(res.data.count)
                    console.log(res.data.count)
                    setLoading(false)
                    if (res.data.list.length < 20) {
                        setIsDisable(true)
                        console.log("ok")
                    } else if (res.data.list.length > 19) {
                        setIsDisable(false)
                    }
                } else if (res.status === 203) {
                    setLoading(false)
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'product loading error error',
                            message: res.data.message
                        }
                    })
                } else if (res.status === 204) {
                    setLoading(false)
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'No Products',
                            message: "No products found in this market address",
                            color: 'info'
                        }
                    })
                } else if (res.status === 500) {
                    setLoading(false)
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'product loading error error',
                            message: res.data.message
                        }
                    })
                }
            }).catch((error) => {
                setLoading(false)
                console.error('Error:', error)
            })
    }

    const chain = (chainId, chianName) => {
        if (chainId === 'all') {
            setParamChainData('')
            setSelectedChian('All Chains')
            setParamMarketData('')
            setSelectedMarket('All Markets')
            setSearchQuery('')
        } else {
            setParamChainData(chainId)
            loadDataMarkets(chainId)
            setSelectedChian(chianName)
            setParamMarketData('')
            setSelectedMarket('All Markets')
            setSearchQuery('')
        }
    }

    const market = (mId, marketName) => {
        if (mId === 'all') {
            setParamMarketData('')
            setSelectedMarket('All Markets')
            setParamChainData('')
            setSelectedChian('All Chains')
            setChainMarketData([])
            setSearchQuery('')
        } else {
            setParamMarketData(mId)
            setSelectedMarket(marketName)
            setSearchQuery('')
        }
    }


    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        const c = itemsPerPage + 50
        setItemsPerPage(c)
        loadData(c, true)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
        const c = itemsPerPage - 50
        console.log(c)
        setItemsPerPage(c)
        loadData(c, false)
    }

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
                    message: 'Please enter the price',
                    color: 'warning'
                }
            })
        } else {
            handleUpdate(id)
        }
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

    const handleUpdate = (id) => {

        if (id) {
            let formData = {
                price: price + ' €'
            }

            if (user && token) {
                axios
                    .put(BASE_URL + 'product/update/price/' + id, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            const updatedEntity = res.data
                            const list = productData.map((ob) => {
                                if (ob.productId === updatedEntity.productId) {
                                    ob.price.basePrice = updatedEntity.price.basePrice
                                    ob.price.tax = updatedEntity.price.tax
                                    ob.price.markup = updatedEntity.price.markup
                                    ob.price.total = updatedEntity.price.total
                                    return ob
                                } else {
                                    return ob
                                }
                            })
                            setProductData([...list])
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Details Update',
                                    message: 'Product price update Success',
                                    color: 'success'
                                }
                            })
                            setId('')
                            setPrice('')

                            setVisiblePriceModal(false)
                            setPriceDisplay('')
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Details Update error',
                                    message: res.data.message,
                                    color: 'danger'
                                }
                            })
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Details Update error',
                                    message: res.data.message,
                                    color: 'danger'
                                }
                            })
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                    })

            }
        } else {
            alert('Please Check the Fields!')
        }

    }

    const handleToggleImageUploader = (id) => {
        setImageUpload(!imageUpload)
        setProductId(id)
    }

    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedImageView, setUploadedImageView] = useState(null);

    const handleImageUpload = (file) => {
        console.log(file)
        setUploadedImageView(URL.createObjectURL(file))
        setUploadedImage(file)
    };


    const handleImageUploadSubmit = async (id, img) => {
        console.log(id, img)


        if (user && token) {

            const formData = new FormData();
            formData.append('image', img);
            formData.append('id', id);

            axios.post(BASE_URL + 'test/product/image/update', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        setImageUpload(false)
                        setProductId('')
                        setUploadedImage(null)
                        console.log('response', res.data)

                        // const updatedEntity = res.data
                        // const found = productData.find((f) => f.id === updatedEntity.id)
                        // if(found){
                        //   found.bonus = updatedEntity.bonus
                        // }

                        // setProductData([...productData])

                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Image upload ',
                                message: 'Image upload success',
                                color: 'success'
                            }
                        })
                        loadData(0, true)
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Image upload error',
                                message: res.data.message,
                                color: 'danger'
                            }
                        })

                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }

    }




    const handleUpdateStatus = (id, status) => {

        if (id) {
            let formData = {
                status: status
            }

            if (user && token) {
                axios
                    .put(BASE_URL + 'product/update/status/' + id, formData, {
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
                                    title: 'Product Status Update',
                                    message: 'Product status update Success',
                                    color: 'success'
                                }
                            })
                            loadData(0, true)
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Details Update error',
                                    message: 'Product status update error',
                                    color: 'danger'
                                }
                            })
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Details Update error',
                                    message: 'Product status update error',
                                    color: 'danger'
                                }
                            })
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                    })

            }
        } else {
            alert('Please Check the Fields!')
        }

    }

    const handleStatus =(activate)=>{
        setVisible(true)
        if(activate === 'active'){
            setActivate(true)
        }else if(activate === 'deactive'){
            setActivate(false)
        }
    }

    const handleUpdateAllStatus = (status, mid) => {
        setLoadingActive(true)
        let isActive;
        if (status === '1') {
            isActive = true
        } else if (status === '0') {
            isActive = false
        }

        if (status, mid) {
            let formData = {
                status: isActive,
                mid: mid
            }
            console.log('data', formData)
            if (user && token) {
                axios
                    .put(BASE_URL + 'product/update/all', formData, {
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
                                    title: 'Product Status Update',
                                    message: 'Product status update Success',
                                    color: 'success'
                                }
                            })
                            loadData(0, true)
                            setLoadingActive(false)
                            setVisible(false)
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Details Update',
                                    message: 'No products found in this market address to update',
                                    color: 'info'
                                }
                            })
                            setLoadingActive(false)
                            setVisible(false)
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Details Update error',
                                    message: 'Product status update error',
                                    color: 'danger'
                                }
                            })
                            setLoadingActive(false)
                            setVisible(false)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                        setLoadingActive(false)
                        setVisible(false)
                    })

            }
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Alert',
                    message: 'Please select the market',
                    color: 'danger'
                }
            })
            setSyncLoading(false)
            setLoadingActive(false)
            setVisible(false)
        }

    }

    const handleSyncData = (mid) => {
        setSyncLoading(true)
        console.log('mid', mid)

        if (user && token) {
            if (mid) {
                console.log('data')
                axios
                    .put(BASE_URL + 'product/sync/all/' + mid, {}, {
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
                                    title: 'Product Sync',
                                    message: 'Product sync Success',
                                    color: 'success'
                                }
                            })
                            loadData(0, true)
                            setSyncLoading(false)
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Sync error',
                                    message: 'Product sync error',
                                    color: 'danger'
                                }
                            })
                            setSyncLoading(false)
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Product Sync error',
                                    message: 'Product sync error',
                                    color: 'danger'
                                }
                            })
                            setSyncLoading(false)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                        setSyncLoading(false)
                    })


            } else {
                setSyncLoading(false)
                dispatch({
                    type: SET_ALERT,
                    payload: {
                        status: true,
                        title: 'Alert',
                        message: 'Please select the market',
                        color: 'danger'
                    }
                })
            }
        }
    }

    return (
        <CContainer>
            <CBadge style={{ marginLeft: '0%' }} color="secondary">Action </CBadge>
            <CButton
                size="sm"
                onClick={() => { handleStatus('active') }}
                style={{ backgroundColor: '#ff4d4d', marginLeft: '2%', width: 120, color: 'white' }}
            >
                {loadingActive ? <CSpinner size='sm' /> : 'Activate All'}
            </CButton>
            <CButton
                size="sm"
                onClick={() => {  handleStatus('deactive') }}
                style={{ backgroundColor: '#ff4d4d', marginLeft: '2%', width: 120, color: 'white' }}
            >
                {loadingActive ? <CSpinner size='sm' /> : 'Deactivate All'}
            </CButton>
            <CButton
                size="sm"
                onClick={() => { handleSyncData(paramMId) }}
                style={{ backgroundColor: '#ff4d4d', marginLeft: '2%', width: 120, color: 'white' }}
            >
                {syncLoading ? <CSpinner size='sm' /> :
                    "Sync"
                }
            </CButton>


            <CBadge style={{ marginLeft: '15%' }} color="secondary">Filter by</CBadge>
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

            {/* <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' }}>
                <CDropdownToggle >{selectedMarket}</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem onClick={() => market('all')}>Select the Chain</CDropdownItem>
                    {chainMarket.map((item, index) => (
                        <CDropdownItem onClick={() => market(item._id, item.address)} key={index}>
                            {item.address}
                        </CDropdownItem>
                    ))}
                </CDropdownMenu>
            </CDropdown> */}
            <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' }}>
                <CDropdownToggle style={{ color: 'white' }}>
                    {selectedMarket.length > 15 ? `${selectedMarket.substring(0, 15)}...` : selectedMarket}
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem onClick={() => market('all')}>Select the Chain</CDropdownItem>
                    {chainMarket.map((item, index) => (
                        <CDropdownItem onClick={() => market(item._id, item.address)} key={index}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{item.address.substring(0, item.address.length / 2)}</span>
                                <span>{item.address.substring(item.address.length / 2)}</span>
                            </div>
                        </CDropdownItem>
                    ))}
                </CDropdownMenu>
            </CDropdown>
            <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
                {/* <CBadge style={{ marginLeft: '0.2%' }} color="secondary">Select the seatch type</CBadge>
                <CDropdown style={{ marginRight: '0%', width: '17%', backgroundColor: '#ff4d4d' }}>
                    <CDropdownToggle >{searchType} </CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem onClick={() => setSearchType('NAME')}>By Name</CDropdownItem>
                        <CDropdownItem onClick={() => setSearchType('ID')}>By Product Id</CDropdownItem>
                        <CDropdownItem onClick={() => setSearchType('BRAND')}>By BRAND NAME</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown> */}
                <CFormInput
                    type="text"
                    placeholder="Search products by name, brand name and product id"
                    style={{ width: 450, marginRight: '50%' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}

                />

            </CNavbar>

            {loading ? <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div> : <CTable>
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
                    {productData.map((item, index) => {
                        return (
                            <CTableRow key={index}>
                                <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                                <CTableDataCell>{item.pid}</CTableDataCell>
                                <CTableHeaderCell onClick={() => { handleToggleImageUploader(item.productId) }}><CCardImage style={{ width: '50px', height: '50px' }} src={`https://api.zeuler.com/image/` + item.image} /></CTableHeaderCell>
                                <CTableDataCell>{item.name}</CTableDataCell>
                                <CTableDataCell>{item.price.basePrice}<Link to={``}><CIcon icon={cilPencil} size="sm" onClick={() => handleToggleName(item.productId, item.price.basePrice)} /></Link></CTableDataCell>
                                <CTableDataCell>{item.brand}</CTableDataCell>
                                <CTableDataCell>{item.chainName}</CTableDataCell>
                                <CTableDataCell>{item.marketAddress}</CTableDataCell>
                                <CTableDataCell>
                                    {item.status ? (
                                        <CButton
                                            size="sm"
                                            onClick={() => { handleUpdateStatus(item.productId, false) }}
                                            style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }}
                                        >
                                            Deactivate
                                        </CButton>
                                    ) : (
                                        <CButton
                                            size="sm"
                                            onClick={() => { handleUpdateStatus(item.productId, true) }}
                                            style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }}
                                        >
                                            Activate
                                        </CButton>
                                    )}
                                </CTableDataCell>
                            </CTableRow>
                        )
                    })}
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

            <CModal alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
                <CModalHeader closeButton={false}>
                    <CModalTitle>Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Are you sure you want to change the status of all these products?</a><br></br><br></br>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <CButton onClick={() => {isActivate ?   handleUpdateAllStatus("1", paramMId) :    handleUpdateAllStatus("0", paramMId)}} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
                        <CButton onClick={() =>{
                             setVisible(false)
                             
                             }} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
                    </div>
                </CModalBody>
            </CModal>

            <CModal alignment="center" visible={visiblePriceModal} scrollable size='sm' onClose={() => setVisiblePriceModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Change Price</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Enter New Name</a><br></br>
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

            <CModal alignment="center" visible={imageUpload} scrollable size='lg'
                onClose={() => {
                    setImageUpload(false)
                    setUploadedImage(null)
                    setUploadedImageView(null)
                }}>
                <CModalHeader closeButton>
                    <CModalTitle>Image Uploader</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {
                        uploadedImageView && <CCardImage style={{ width: '100px', height: '100px' }} src={uploadedImageView} alt="Uploaded Image" />
                    }

                    <input
                        style={{ marginLeft: '5%' }}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                </CModalBody>
                <CModalFooter>

                    <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => { handleImageUploadSubmit(productId, uploadedImage) }}>Upload Image</CButton>
                </CModalFooter>
            </CModal>


        </CContainer>
    )
}

export default VirtualMarket
