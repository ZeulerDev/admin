import { CBadge, CButton, CCardImage, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CNavbar, CPagination, CPaginationItem, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';
import { BASE_URL } from '../../../context/config';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer';

const CreateMarketing = () => {

    const [selectedType, setSelectedType] = useState('all');
    const [{ user, token }, dispatch] = useAppContext()
    const [loading, setLoading] = useState(false)
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
    const navigate = useNavigate()
    const [status, setStatus] = useState(false)
    const [paramId, setParamId] = useState('')

    // market section
    const [paramCity, setParamCityData] = useState('')
    const [selectedCity, setSelectedCity] = useState('All Cities')

    // market group section
    const [marketGroupData, setMarketGroupData] = useState([])

    useEffect(() => {
        if (status) {
           if (selectedType === 'Market') {
                loadDataMarket(0)
            } else if (selectedType === 'Market Group') {
                loadDataMarketGroup(0)
            }
        }
    }, [user, paramCity, paramChainId])

    useEffect(() => {
        if (selectedType === 'Product' && user && token) {
                loadData(0, true)
        }
     
      }, [user, token, paramMId, debouncedSearchQuery])
    
      useEffect(() => {
        if (selectedType === 'Product') {
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
        }
      }, [searchQuery]);

    const filter = (type) => {
        if (type === 'all') {
            setSelectedType('All')
            setStatus(false)
        } else if (type === 'Product') {
            loadData(0, true)
            loadDataChains()
            setSelectedType(type)
            setStatus(true)
        } else if (type === 'Market') {
            loadDataMarket(0)
            loadDataChains()
            setSelectedType(type)
            setStatus(true)
        } else if (type === 'Market Group') {
            loadDataMarketGroup(0)
            setSelectedType(type)
            setStatus(true)
        }
    }

    const loadData = (count, moveNext) => {
        setLoading(true)
        axios
            .get(BASE_URL + `product/all/${count}?marketId=${paramMId}&name=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setProductData(res.data.list)
                    setResultCount(res.data.count)
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

    const loadDataChains = () => {
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
    }

    const chain = (chainId, chianName) => {
        if (chainId === 'all') {
            setParamChainData('')
            setSelectedChian('All Chains')
        } else {
            setParamChainData(chainId)
            if (selectedType === 'Product') {
                loadDataMarkets(chainId)
            }
            setSelectedChian(chianName)
        }
    }
    const loadDataMarkets = (chainId) => {
        axios
            .get(
                BASE_URL + `assistant/market/locations?brand=${chainId}`,
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

    const handlePages = (page) => {
        setCurrentPage(page);
        let c;
        if (selectedType === 'Product') {
            c = (page - 1) * 50;
        } else if (selectedType === 'Market' || selectedType === 'Market Group') {
            c = (page - 1) * 20;
        }
        setItemsPerPage(c);
        if (selectedType === 'Product') {
            loadData(c, true);
        } else if (selectedType === 'Market') {
            loadDataMarket(c);
        } else if (selectedType === 'Market Group') {
            loadDataMarketGroup(c)
        }
    };

    const renderPageNumbers = () => {
        let totalPages
        if (selectedType === 'Product') {
            totalPages = Math.ceil(resultCount / 50);
        } else if (selectedType === 'Market' || selectedType === 'Market Group') {
            totalPages = Math.ceil(resultCount / 20);
        }
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

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        let c;
        if (selectedType === 'Product') {
            c = itemsPerPage + 50

        } else if (selectedType === 'Market' || selectedType === 'Market Group') {
            c = itemsPerPage + 20
        }
        setItemsPerPage(c)
        if (selectedType === 'Product') {
            loadData(c, true)
        } else if (selectedType === 'Market') {
            loadDataMarket(c)
        } else if (selectedType === 'Market Group') {
            loadDataMarketGroup(c)
        }
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
        let c;
        if (selectedType === 'Product') {
            c = itemsPerPage - 50
        } else if (selectedType === 'Market' || selectedType === 'Market Group') {
            c = itemsPerPage - 20
        }
        setItemsPerPage(c)
        if (selectedType === 'Product') {
            loadData(c, true)

        } else if (selectedType === 'Market') {
            loadDataMarket(c)
        } else if (selectedType === 'Market Group') {
            loadDataMarketGroup(c)
        }
    }

    // market section

    const city = (city) => {
        if (city === 'all') {
            setParamCityData('')
            setSelectedCity('All Cities')
        } else {
            setParamCityData(city)
            setSelectedCity(city)
        }
    }

    const loadDataMarket = (count) => {
        setLoading(true)
        axios
            .get(
                BASE_URL + `assistant/market/locations/${count}?brand=${paramChainId}&city=${paramCity}`,
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
                    setLoading(false)
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

    // market group section

    const loadDataMarketGroup = (count) => {
        setLoading(true)
        axios
            .get(BASE_URL + `market/groups/fetch/${count}?city=${paramCity}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    setMarketGroupData(res.data)
                    setLoading(false)
                    if (res.data.length < 20) {
                        setIsDisable(true)
                        console.log('ok')
                    } else if (res.data.length > 19) {
                        setIsDisable(false)
                    }
                } else if (res.status === 500) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Makrket Group loading error',
                            message: res.data.message
                        }
                    })
                }
            }).catch((err) => {
                console.error('Error:', err)
            })
    }

    // core components

    const handleSubmit = (id) => {
        console.log(selectedType,paramId)
    
        if(selectedType && id){
          const formData = {
            type: selectedType,
            id: id,
          }
        console.log(formData)
    
        if(user && token){
          axios
            .post(BASE_URL+'deepLink/urls/create', formData, {
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
                    title : 'Link Registration',
                    message : 'Link Registration Success',
                    color : 'success'
                  }
                })
                navigate('/marketing/all')
              } else if (res.status === 400) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Link Registration error',
                    message : 'Link Registration Failed',
                    color: 'info'
                  }
                })
              } else if (res.status === 500) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Link Registration error',
                    message : res.data.message
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

    return (
        <CContainer>
            <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
                <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' }}>
                    <CDropdownToggle style={{ color: 'white' }}>{selectedType}</CDropdownToggle>
                    <CDropdownMenu >
                        <CDropdownItem onClick={() => filter('all')}>All</CDropdownItem>
                        <CDropdownItem onClick={() => filter('Product')}>Product</CDropdownItem>
                        <CDropdownItem onClick={() => filter('Market')}>Market</CDropdownItem>
                        <CDropdownItem onClick={() => filter('Market Group')}>Market Group</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CNavbar>

            {selectedType === 'all' && <h1></h1>}
            {selectedType === 'Product' &&
                <>
                    <CBadge style={{ marginLeft: '57%' }} color="secondary">Filter by</CBadge>
                    <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' }}>
                        <CDropdownToggle >{selectedChain}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
                            {chainData.map((item, index) => (
                                <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
                                    {item.name}
                                </CDropdownItem>
                            ))}
                        </CDropdownMenu>
                    </CDropdown>

                    <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d' }}>
                        <CDropdownToggle>
                            {selectedMarket.length > 15 ? `${selectedMarket.substring(0, 15)}...` : selectedMarket}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => market('all')}>Select the Chain</CDropdownItem>
                            {chainMarket.map((item, index) => (
                                // <CDropdownItem onClick={() => market(item._id, item.address)} key={index}>
                                //   {item.address}
                                // </CDropdownItem>
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
                        {/* <CBadge style={{ marginLeft: '0.2%'}} color="secondary">Select the seatch type</CBadge> */}
                        {/* <CDropdown style={{ marginRight: '0%', width:'17%',backgroundColor: '#ff4d4d' }}>
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
                            style={{ width: 450, marginRight: '60%' }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}

                        />

                    </CNavbar>

                    {loading ? <CSpinner /> : <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Product Id</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Base Price</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Markup Percentage </CTableHeaderCell>
                                <CTableHeaderCell scope="col">Markup</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Market Address</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Add Link</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {productData.map((item, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                                        <CTableDataCell>{item.pid}</CTableDataCell>
                                        <CTableHeaderCell><CCardImage style={{ width: '50px', height: '50px' }} src={`https://api.zeuler.com/image/` + item.image} /></CTableHeaderCell>
                                        <CTableDataCell>{item.name}</CTableDataCell>
                                        <CTableDataCell>{(item.price?.basePrice ?? 0).toFixed(2)}\</CTableDataCell>
                                        <CTableDataCell>{(item.price?.tax ?? 0).toFixed(2)}</CTableDataCell>
                                        <CTableDataCell>{item.price.percentage}%</CTableDataCell>
                                        <CTableDataCell>{(item.price?.markup ?? 0).toFixed(2)}</CTableDataCell>
                                        <CTableDataCell>{(item.price?.total ?? 0).toFixed(2)}</CTableDataCell>
                                        <CTableDataCell>{item.brand}</CTableDataCell>
                                        <CTableDataCell>{item.chainName}</CTableDataCell>
                                        <CTableDataCell>{item.marketAddress}</CTableDataCell>
                                        <CTableDataCell>
                                        <CButton size='sm' style={{ backgroundColor: '#ff4d4d', marginLeft: '5px', color: 'white' }} variant="outline" onClick={() => {handleSubmit(item.productId) }}>
                                            Add
                                        </CButton>
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
                </>
            }

            {selectedType === 'Market' &&
                <>
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
                                <CTableHeaderCell scope="col">Scraped</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Add Link</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {chainMarket.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                                    <CTableDataCell>{item.chain?.name}</CTableDataCell>
                                    <CTableDataCell>{item.address}</CTableDataCell>
                                    <CTableDataCell>{item.city}</CTableDataCell>
                                    <CTableDataCell>{item.scraped}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton size='sm' style={{ backgroundColor: '#ff4d4d', marginLeft: '5px', color: 'white' }} variant="outline" onClick={() => {handleSubmit(item._id) }}>
                                            Add
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
                </>
            }
            {selectedType === 'Market Group' &&
                <>
                    <CBadge style={{ marginLeft: '75%', marginTop: '2%' }} color="secondary">Filter by</CBadge>
                    <CDropdown style={{ marginLeft: '2%', width: '17%', marginRight: '5px', backgroundColor: '#ff4d4d' }}>
                        <CDropdownToggle style={{ color: 'white' }}>{selectedCity}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
                            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
                            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>

                    <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
                    </CNavbar>
                    {loading ? <CSpinner /> : <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Add Link</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {marketGroupData.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                                    <CTableDataCell>
                                        <span>{item.name}</span>
                                    </CTableDataCell>
                                    <CTableDataCell>{item.city}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => { handleSubmit(item._id)}} size='sm' style={{ backgroundColor: '#ff4d4d', marginLeft: '5px', color: 'white' }}>
                                            Add
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>

                    }

                    <CPagination aria-label="Page navigation example">
                        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
                            Previous
                        </CPaginationItem>
                        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>
                            Next
                        </CPaginationItem>
                    </CPagination>
                </>
            }



        </CContainer>
    );
};

export default CreateMarketing;