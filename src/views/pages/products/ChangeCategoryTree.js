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
import { cilBan, cilList, cilMove, cilPen, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const CreateCategoryTree = () => {

    const [{ user, token }, dispatch] = useAppContext()
    const [loading, setLoading] = useState(false)
    const [loadingCategories, setLoadingCategories] = useState(false)
    const [loadingProduct, setLoadingProduct] = useState(false)

    const [itemsPerPageCategory, setItemsPerPageCategory] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(0)
    const [isDisable, setIsDisable] = useState(true)
    const [chainData, setChainData] = useState([])
    const [selectedChain, setSelectedChian] = useState('All Chains')
    const [selectedMarket, setSelectedMarket] = useState('All market')
    const [paramChainId, setParamChainData] = useState('')
    const [paramMId, setParamMarketData] = useState('')
    const [chainMarket, setChainMarketData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');


    const [selectMarketIds, setSelectMarketIds] = useState([])
    const [selectedMarketForID, setSelectedMarketForID] = useState('Selected markets')
    let [unMatchedCategories, setUnMatchedCategories] = useState([])
    const [visible, setVisible] = useState(false)

    const [selectedMainCategory, setSelectedMainCategory] = useState('All Main Categories')
    const [paramMainCategory, setParamCMainCategoryData] = useState('')
    const [mainCategoriesData, setMainCategoriesData] = useState([])
    const [mainCId, setMainCID] = useState('')

    const [selectedSubCategory, setSelectedSubCategory] = useState('Select Sub Categories')
    const [paramSubCategory, setParamSubCategoryData] = useState('')
    const [subCategoriesData, setSubCategoriesData] = useState([])
    const [newCategory, setNewCategory] = useState({
        mainCategory: '',
        subCategory: '',
        category: ''
    })

    const [newCategoryAdd, setNewCategoryAdd] = useState({
        selectMainCategory: '',
        selectMainSubCategory: '',
        moveMainCategory: '',
    })

    const [newCategoryAdd2, setNewCategoryAdd2] = useState({
        selectMainCategory: '',
        selectMainSubCategory: '',
        selectMainSecondSubCategory: '',
        moveMainCategory: '',
        moveMainSubCategory: ''
    })
    const [selectedItem, setSelectedItem] = useState([])

    const [selectedMainCategoryMove, setSelectedMainCategoryMove] = useState('Select Main Categories')
    const [paramMainCategoryMove, setParamCMainCategoryDataMove] = useState('')
    const [selectedSubCategoryMove, setSelectedSubCategoryMove] = useState('Select Sub Categories')
    const [paramSubCategoryMove, setParamSubCategoryDataMove] = useState('')
    const [mainCategoriesDataMove, setMainCategoriesDataMove] = useState([])
    const [subCategoriesDataMove, setSubCategoriesDataMove] = useState([])
    const [mainCIdMove, setMainCIDMove] = useState('')

    const [selectedMainCategorySelect2, setSelectedMainCategorySelect2] = useState('All Main Categories')
    const [paramMainCategorySelect2, setParamCMainCategoryDataSelect2] = useState('')
    const [selectedSubCategorySelect2, setSelectedSubCategorySelect2] = useState('Select Sub Categories')
    const [paramSubCategorySelect2, setParamSubCategoryDataSelect2] = useState('')
    const [mainCategoriesDataSelect2, setMainCategoriesDataSelect2] = useState([])
    const [subCategoriesDataSelect2, setSubCategoriesDataSelect2] = useState([])
    const [mainCIdSelect2, setMainCIDSelect2] = useState('')
    const [secondCategoryData, setSecondCategoryData] = useState([])
    const [selectSecondSubCategory, setSelectSecondSubCategory] = useState('Select Second Sub Categories')
    const [paramSecondSubCategory, setParamSecondSubCategory] = useState([])

    const [selectedMainCategoryMove2, setSelectedMainCategoryMove2] = useState('All Main Categories')
    const [paramMainCategoryMove2, setParamCMainCategoryDataMove2] = useState('')
    const [selectedSubCategoryMove2, setSelectedSubCategoryMove2] = useState('Select Sub Categories')
    const [paramSubCategoryMove2, setParamSubCategoryDataMove2] = useState('')
    const [mainCategoriesDataMove2, setMainCategoriesDataMove2] = useState([])
    const [subCategoriesDataMove2, setSubCategoriesDataMove2] = useState([])
    const [mainCIdMove2, setMainCIDMove2] = useState('')
    const [visibleProducts, setVisibleProducts] = useState(false)

    const [productData, setProductData] = useState([])
    const [resultCount, setResultCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemData, setItemData] = useState()

    useEffect(() => {
        if (token) {
            axios
                .get(BASE_URL + 'product/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data[1])
                        setMainCategoriesData(res.data)
                        setMainCategoriesDataMove(res.data)
                        setMainCategoriesDataMove2(res.data)
                        setMainCategoriesDataSelect2(res.data)
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Main Category Loading error',
                                message: 'Main Category loading error'
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
                BASE_URL+`assistant/market/locations?brand=${chainId}`,
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



    const chain = (chainId, chianName) => {
        if (chainId === 'all') {
            setParamChainData('')
            setSelectedChian('All Chains')
        } else {
            setParamChainData(chainId)
            loadDataMarkets(chainId)
            setSelectedChian(chianName)
        }
    }

    const market = (mId, marketName) => {
        if (mId === 'all') {
            setParamMarketData('')
            setSelectedMarket('All Markets')
            setParamChainData('')
            setSelectedChian('All Chains')
            setChainMarketData([])
            setSelectMarketIds([])
        } else {
            setParamMarketData(mId)
            setSelectedMarket(marketName)
            setSelectMarketIds([...selectMarketIds, { id: mId, name: marketName }]);
            setSelectedMarketForID(marketName)
        }
    }


    // const searchNewCategories = (categories) => {
    //     if (categories.length > 0) {
    //         let formData = categories.map((item) => item.id)

    //         console.log(formData)

    //         if (user && token) {
    //             setLoading(true)
    //             axios
    //                 .get(BASE_URL + `product/category/check?markets=${formData}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 })
    //                 .then((res) => {
    //                     if (res.status === 200) {
    //                         setUnMatchedCategories(res.data)
    //                         setLoading(false)
    //                         // dispatch({
    //                         //   type: SET_ALERT,
    //                         //   payload: {
    //                         //     status: true,
    //                         //     title: 'Unregistered Categories ',
    //                         //     message: 'Unregistered Categories Loaded',
    //                         //     color: 'success'
    //                         //   }
    //                         // })
    //                     } else if (res.status === 204) {
    //                         dispatch({
    //                             type: SET_ALERT,
    //                             payload: {
    //                                 status: true,
    //                                 title: 'Unregistered Categories error',
    //                                 message: res.data.message,
    //                                 color: 'danger'
    //                             }
    //                         })
    //                         setLoading(false)
    //                     } else if (res.status === 500) {
    //                         dispatch({
    //                             type: SET_ALERT,
    //                             payload: {
    //                                 status: true,
    //                                 title: 'Unregistered Categories error',
    //                                 message: res.data.message,
    //                                 color: 'danger'
    //                             }
    //                         })
    //                         setLoading(false)
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error:', error)
    //                     setLoading(false)
    //                 })

    //         }

    //     } else {
    //         dispatch({
    //             type: SET_ALERT,
    //             payload: {
    //                 status: true,
    //                 title: 'Select Market',
    //                 message: 'Please select the market to search',
    //                 color: 'warning'
    //             }
    //         })
    //         setLoading(false)
    //     }

    // }


    const handleCategoryUpdate = () => {
        console.log(newCategoryAdd)
        if(newCategoryAdd.selectMainCategory !== '' && newCategoryAdd.selectMainSubCategory!== '' && newCategoryAdd.moveMainCategory!== '' ){
        handleUpdateCategory()
        }else{
            
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Category Update',
                    message: 'Please Check the fields',
                    color: 'warning'
                }
            })
        }
    }

    const handleUpdateCategory = () => {

        if (newCategoryAdd) {
            let formData = {
                category: newCategoryAdd
            }

            if (user && token) {
                axios
                    .put(BASE_URL + 'product/update/file/category', formData, {
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
                                    title: 'Category Update',
                                    message: 'Category update Success',
                                    color: 'success'
                                }
                            })
                            setParamCMainCategoryDataMove('')
                            setSelectedMainCategoryMove('Select Main Categories')
                            setParamCMainCategoryData('')
                            setSelectedMainCategory('All Main Categories')
                            setParamSubCategoryData('')
                            setSelectedSubCategory('Select Sub Categories')
                            setSubCategoriesData([])
                            setNewCategoryAdd({
                                selectMainCategory: '',
                                selectMainSubCategory: '',
                                moveMainCategory: '',
                            })
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Category Update',
                                    message: 'No category found',
                                    color: 'danger'
                                }
                            })
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Category Update',
                                    message: 'Category update error',
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
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Category Update',
                    message: 'Please Check the Fields!',
                    color: 'warning'
                }
            })
        }

    }

    const mainCategory = (index, categoryName, type) => {

        if (type === 'move') {
            if (index === 'all') {
                setParamCMainCategoryDataMove('')
                setSelectedMainCategoryMove('Select Main Categories')
                setMainCIDMove('')
            } else {
                setParamCMainCategoryDataMove(index)
                loadDataSubCategoriesMove(index, 'move')
                setSelectedMainCategoryMove(categoryName)
                setMainCIDMove(index)
                setNewCategoryAdd({
                    ...newCategoryAdd,
                    moveMainCategory: index
                })
            }


        } else if (type === 'select') {
            if (index === 'all') {
                setParamCMainCategoryData('')
                setSelectedMainCategory('All Main Categories')
                setParamSubCategoryData('')
                setSelectedSubCategory('Select Sub Categories')
                setMainCID('')
            } else {
                setParamCMainCategoryData(index)
                loadDataSubCategories(index)
                setSelectedMainCategory(categoryName)
                setMainCID(index)
                setParamSubCategoryData('')
                setSelectedSubCategory('Select Sub Categories')
                setNewCategoryAdd({
                    ...newCategoryAdd,
                    selectMainCategory: index
                })
            }

        } else if (type === 'select2') {
            if (index === 'all') {
                setParamCMainCategoryDataSelect2('')
                setSelectedMainCategorySelect2('All Main Categories')
                setMainCIDSelect2('')
            } else {
                setParamCMainCategoryDataSelect2(index)
                loadDataSubCategoriesMove(index, 'select2')
                setSelectedMainCategorySelect2(categoryName)
                setMainCIDSelect2(index)
                setNewCategoryAdd2({
                    ...newCategoryAdd2,
                    selectMainCategory: index
                })

            }

        } else if (type === 'move2') {
            if (index === 'all') {
                setParamCMainCategoryDataMove2('')
                setSelectedMainCategoryMove2('All Main Categories')
                setMainCIDMove2('')
            } else {
                setParamCMainCategoryDataMove2(index)
                loadDataSubCategoriesMove(index, 'move2')
                setSelectedMainCategoryMove2(categoryName)
                setMainCIDMove2(index)
                setNewCategoryAdd2({
                    ...newCategoryAdd2,
                    moveMainCategory: index
                })
            }

        }


    }
    const subCategories = (index, subName, type) => {

        if (type === 'move') {
            if (index === 'all') {
                setParamSubCategoryDataMove('')
                setSelectedSubCategoryMove('Select Main Categories')
                setParamCMainCategoryDataMove('')
                setSelectedMainCategoryMove('Select Main Categories')
                setSubCategoriesDataMove([])
                setMainCIDMove('')
            } else {
                console.log('index', index)
                setParamSubCategoryDataMove(index)
                setSelectedSubCategoryMove(subName)

               
            }

        } else if (type === 'select') {
            if (index === 'all') {
                setParamSubCategoryData('')
                setSelectedSubCategory('Select Sub Categories')
                setParamCMainCategoryData('')
                setSelectedMainCategory('All Main Categories')
                setSubCategoriesData([])
                setMainCID('')
            } else {
                console.log('index', index)
                setParamSubCategoryData(index)
                setSelectedSubCategory(subName)

                setNewCategoryAdd({
                    ...newCategoryAdd,
                    selectMainSubCategory: index
                })
            }
        } else if (type === 'select2') {
            if (index === 'all') {
                setParamSubCategoryDataSelect2('')
                setSelectedSubCategorySelect2('Select Main Categories')
                setParamCMainCategoryDataSelect2('')
                setSelectedMainCategorySelect2('All Main Categories')
                setSubCategoriesDataMove([])
                setMainCIDMove('')
                setSelectSecondSubCategory('Select Second Sub Categories')
            } else {
                console.log('index', index)
                setParamSubCategoryDataSelect2(index)
                setSelectedSubCategorySelect2(subName)
                loadDataSubCategoriesSecondSub(mainCIdSelect2, index, 'select2')
                setNewCategoryAdd2({
                    ...newCategoryAdd2,
                    selectMainSubCategory: index
                })
            }

        } else if (type === 'move2') {
            if (index === 'all') {
                setParamSubCategoryDataMove2('')
                setSelectedSubCategoryMove2('Select Main Categories')
                setParamCMainCategoryDataMove2('')
                setSelectedMainCategoryMove2('All Main Categories')
                setSubCategoriesDataMove2([])
                setMainCIDMove2('')
            } else {
                console.log('index', index)
                setParamSubCategoryDataMove2(index)
                setSelectedSubCategoryMove2(subName)
                setNewCategoryAdd2({
                    ...newCategoryAdd2,
                    moveMainSubCategory: index
                })
            }

        }

    }


    const loadDataSubCategories = (id) => {
        if (token) {
            axios
                .get(BASE_URL + 'product/categories/sub/' + id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setSubCategoriesData(res.data)
                        console.log('select')
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Sub Category Loading',
                                message: 'Sub Category loading error'
                            }
                        })
                    }
                }).catch((err) => {
                    console.error('Error: ', err)
                })
        }
    }

    const loadDataSubCategoriesMove = (id, type) => {
        if (token) {
            axios
                .get(BASE_URL + 'product/categories/sub/' + id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {

                        if (type === 'move') {
                            setSubCategoriesDataMove(res.data)
                        } else if (type === 'select2') {
                            setSubCategoriesDataSelect2(res.data)
                        } else if (type === 'move2') {
                            setSubCategoriesDataMove2(res.data)
                        }
                        console.log('Move')
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Sub Category Loading',
                                message: 'Sub Category loading error'
                            }
                        })
                    }
                }).catch((err) => {
                    console.error('Error: ', err)
                })
        }
    }

    const loadDataSubCategoriesSecondSub = (id, sId, type) => {
        if (token) {
            setLoadingCategories(true)
            axios
                .get(BASE_URL + `product/categories/sub?mId=${id}&subId=${sId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setSecondCategoryData(res.data)
                        setLoadingCategories(false)
                        console.log('Done Load')
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Sub Category Loading',
                                message: 'Sub Category loading error'
                            }
                        })
                    }
                }).catch((err) => {
                    console.error('Error: ', err)
                })
        }
    }

    const handleSecondSubCategory = (item, index) => {
        setParamSecondSubCategory(item)
        setSelectSecondSubCategory(item.name)
        setNewCategoryAdd2({
            ...newCategoryAdd2,
            selectMainSecondSubCategory: item
        })
    }

    const handleCategorySecondUpdate = () => {
        console.log(newCategoryAdd2)
        handleUpdateSecondCategory()
    }

    const handleUpdateSecondCategory = () => {

        if (newCategoryAdd) {
            let formData = {
                category: newCategoryAdd2
            }

            if (user && token) {
                axios
                    .put(BASE_URL + 'product/update/file/second/category', formData, {
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
                                    title: 'Category Update',
                                    message: 'Category update Success',
                                    color: 'success'
                                }
                            })
                            const arr = secondCategoryData.filter(category => !selectedItem.some(item => item.name === category.name));
                            console.log(arr.length);
                            setMainCIDMove2('')
                            setParamSubCategoryDataMove2('')
                            setSecondCategoryData([...arr])

                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Category Update',
                                    message: 'No category found',
                                    color: 'danger'
                                }
                            })
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Category Update',
                                    message: 'Category update error',
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
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Category Update',
                    message: 'Please Check the Fields!',
                    color: 'warning'
                }
            })
        }

    }

    const handleCategoryModal = (item) => {
        setParamSecondSubCategory(item)
        setSelectSecondSubCategory(item.name)
        selectedItem.push(item)
        setNewCategoryAdd2({
            ...newCategoryAdd2,
            selectMainSecondSubCategory: item
        })
        setVisible(true)
    }

    const uploadCategory = () => {
        if (newCategoryAdd2.moveMainCategory !== '' && newCategoryAdd2.moveMainSubCategory !== '') {
            console.log(newCategoryAdd2)
            handleUpdateSecondCategory()
            setVisible(false)
            setNewCategoryAdd2({
                selectMainCategory: '',
                selectMainSubCategory: '',
                selectMainSecondSubCategory: '',
                moveMainCategory: '',
                moveMainSubCategory: ''
            })
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Check the fields',
                    message: 'Please select the Main and Sub Category',
                    color: 'warning'
                }
            })
        }
    }

    const handleProductView = (item) => {
        console.log(item)
        setItemData(item.ids)
        setVisibleProducts(true)
        loadData(0, item.ids)
    }

    const loadData = (count, item) => {
        setLoadingProduct(true)
        axios
            .get(BASE_URL + `product/category/${count}?ids=${item}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setProductData(res.data.list)
                    console.log(res.data.list.length)
                    setResultCount(res.data.count)
                    setLoadingProduct(false)
                    if (res.data.list.length < 50) {
                        setIsDisable(true)
                        console.log("ok")
                    } else if (res.data.list.length > 50) {
                        setIsDisable(false)
                    }
                } else if (res.status === 203) {
                    setLoadingProduct(false)
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'product loading error error',
                            message: res.data.message
                        }
                    })
                } else if (res.status === 204) {
                    setLoadingProduct(false)
                    // dispatch({
                    //     type: SET_ALERT,
                    //     payload: {
                    //         status: true,
                    //         title: 'No Products',
                    //         message: "No products found in this market address",
                    //         color: 'info'
                    //     }
                    // })
                } else if (res.status === 500) {
                    setLoadingProduct(false)
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
                setLoadingProduct(false)
                console.error('Error:', error)
            })
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        const c = itemsPerPage + 50
        setItemsPerPageCategory(c)
        loadData(c, itemData)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
        const c = itemsPerPage - 50
        console.log(c)
        setItemsPerPageCategory(c)
        loadData(c, itemData)
    }

    const handlePages = (page) => {
        setCurrentPage(page);
        const c = (page - 1) * 50;
        setItemsPerPageCategory(c);
        loadData(c, itemData);
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
    return (
        <CContainer>

            <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

            </CNavbar>
{/* 
            <CRow >
                <CCol style={{ marginTop: '2%' }} md={12}> */}
                    <CBadge style={{ marginLeft: '0%', width: '7%', marginTop:'2%' }} color="secondary">Select Category</CBadge>
                    <CDropdown style={{ marginLeft: '2%', width: '20%', backgroundColor: '#ff4d4d' }}>
                        <CDropdownToggle style={{ color: 'white' }}>{selectedMainCategory}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => mainCategory('all', null, 'select')}>Clear Main Category</CDropdownItem>
                            {mainCategoriesData.map((item, index) => (
                                <CDropdownItem onClick={() => mainCategory(index, item, 'select')} key={index}>
                                    {item}
                                </CDropdownItem>
                            ))}
                        </CDropdownMenu>
                    </CDropdown>
                    <CDropdown style={{ marginLeft: '2%', width: '20%', backgroundColor: '#ff4d4d' }}>
                        <CDropdownToggle style={{ color: 'white' }}>{selectedSubCategory}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => subCategories('all', null, 'select')}>Clear Category</CDropdownItem>
                            {subCategoriesData.map((item, index) => (
                                <CDropdownItem onClick={() => subCategories(index, item, 'select')} key={index}>
                                    {item}
                                </CDropdownItem>
                            ))}
                        </CDropdownMenu>
                    </CDropdown>
                {/* </CCol>

            </CRow> */}

            {/* <CRow> */}
                {/* <CCol style={{ marginTop: '1%' }} md={12}> */}
                    <CBadge style={{ marginLeft: '5%', width: '7%' }} color="secondary">Send To</CBadge>
                    <CDropdown style={{ marginLeft: '2%', width: '20%', backgroundColor: '#ff4d4d' }}>
                        <CDropdownToggle style={{ color: 'white' }}>{selectedMainCategoryMove}</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => mainCategory('all', null, 'move')}>Clear Main Category</CDropdownItem>
                            {mainCategoriesDataMove.map((item, index) => (
                                <CDropdownItem onClick={() => mainCategory(index, item, 'move')} key={index}>
                                    {item}
                                </CDropdownItem>
                            ))}
                        </CDropdownMenu>
                    </CDropdown>

                {/* </CCol> */}
            {/* </CRow> */}
            <CButton style={{ marginLeft: '0%', backgroundColor: '#ff4d4d', color: 'white', width: '19%', marginTop: '3%' }} onClick={() => { handleCategoryUpdate() }}>Update</CButton>


        </CContainer>
    )
}

export default CreateCategoryTree
