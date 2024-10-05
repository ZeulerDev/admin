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

const DbRegisteredCategory = () => {

    const [{ user, token }, dispatch] = useAppContext()
    const [loading, setLoading] = useState(false)
    const [loadingCategories, setLoadingCategories] = useState(false)


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
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    const [productData, setProductData] = useState([])
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
    }, [user, token, debouncedSearchQuery])

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
  

    const loadData = (count, timer) => {
        console.log('search', searchQuery)
        setLoadingMain(true)
        axios.get(BASE_URL + `product/category/main/${count}?name=${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setCategoryData(res.data.list)
                    setResultCount(res.data.count)
                    console.log(res.data.list.length)
                    setLoadingMain(false)
                    clearTimeout(timer);
                    if (res.data.list.length < 50) {
                        setIsDisable(true)
                        console.log("ok")
                    } else if (res.data.list.length > 49) {
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

    const handleMainModel = () => {
        setVisibleMainModel(true)
    }
    const handleMainSubModel = (index) => {
        setVisibleMainSubModel(true)
        setIndex(index)
    }

    const handleMainCategory = () => {
        if (name) {
            console.log(name)
            handleSubmitMain(name)
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

    const handleMainSubCategory = () => {
        if (subName, index) {
            console.log(subName,index)
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

        if(name){
          const formData = {
            name: name,
          }
          if(user,token){
                  axios
                    .post(BASE_URL+'product/category/main/add', formData, {
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
                            title : 'Category Registration',
                            message : 'Category Registration Success',
                            color : 'success'
                          }
                        })
                        setVisibleMainModel(false)
                        setName('')
                        loadData(0)
                      } else if (res.status === 400) {
                        dispatch({
                          type : SET_ALERT,
                          payload : {
                            status : true,
                            title : 'Category Registration error',
                            message : "Category Registration error",
                            color:'warning'
                          }
                        })
                      } else if (res.status === 500) {
                        dispatch({
                          type : SET_ALERT,
                          payload : {
                            status : true,
                            title : 'Picker Registration error',
                            message : 'Picker Registration error 500',
                            color:'warning'
                          }
                        })
                      }
                    })
                    .catch((error) => {
                      console.error('Error:', error)
                    })
          }
        }else{
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Error!',
              message : 'Picker Registration error, Please Check the input fields',
              color:'warning'
            }
          })
        }
      }


      const handleSubmitMainSub = (name, index) => {

        if(name){
          const formData = {
            name: name,
            categoryId: index
          }
          if(user,token){
                  axios
                    .post(BASE_URL+'product/category/sub/add', formData, {
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
                            title : 'SubCategory Registration',
                            message : 'SubCategory Registration Success',
                            color : 'success'
                          }
                        })
                        setVisibleMainSubModel(false)
                        setIndex('')
                        setSubName('')
                      } else if (res.status === 400) {
                        dispatch({
                          type : SET_ALERT,
                          payload : {
                            status : true,
                            title : 'SubCategory Registration error',
                            message : "SubCategory Registration error",
                            color:'warning'
                          }
                        })
                      } else if (res.status === 500) {
                        dispatch({
                          type : SET_ALERT,
                          payload : {
                            status : true,
                            title : 'SubCategory Registration error',
                            message : 'SubCategory Registration error 500',
                            color:'warning'
                          }
                        })
                      }
                    })
                    .catch((error) => {
                      console.error('Error:', error)
                    })
          }
        }else{
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Error!',
              message : 'Category Registration error, Please Check the input fields',
              color:'warning'
            }
          })
        }
      }
    

    return (
        <CContainer>

            {/* <CBadge style={{ marginLeft: '48%', width: '7%' }} color="secondary">Select Category</CBadge> */}
            <CButton onClick={() => { handleMainModel() }} style={{ backgroundColor: '#ff4d4d', width: '17%', color: 'white' }}>Add Main Category</CButton>

            <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
                <CFormInput
                    type="text"
                    placeholder="Search here"
                    style={{ width: 450, marginRight: '30%' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}

                />
            </CNavbar>
            {loadingMain ? <CSpinner /> : <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Add Subcategory</CTableHeaderCell>

                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {categoryData.map((item, index) => {
                        return (
                            <CTableRow key={index}>
                                <CTableDataCell>{itemsPerPageCategory + index + 1}</CTableDataCell>
                                <CTableDataCell>{item.name}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleMainSubModel(item._id) }}>
                                        <CIcon icon={cilPencil} size='lg' style={{ color: 'white' }} />
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

            <CModal alignment="center" visible={visibleMainModel} scrollable size='sm' onClose={() => {
                setVisibleMainModel(false)
                setName('')
            }
            }>
                <CModalHeader closeButton>
                    <CModalTitle>Category Registration</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormInput
                        type="text"
                        placeholder="Enter Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </CModalBody>
                <CModalFooter>
                    <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => { handleMainCategory() }}>Save</CButton>
                </CModalFooter>
            </CModal>

            <CModal alignment="center" visible={visibleMainSubModel} scrollable size='sm' onClose={() => {
                setVisibleMainSubModel(false)
                setSubName('')
            }}>
                <CModalHeader closeButton>
                    <CModalTitle>Subcategory Registration</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormInput
                        type="text"
                        placeholder="Enter Subcategory Name"
                        value={subName}
                        onChange={(e) => setSubName(e.target.value)} />
                </CModalBody>
                <CModalFooter>
                    <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => { handleMainSubCategory() }}>Save</CButton> 
                </CModalFooter>
            </CModal>

            
        </CContainer>
    )
}

export default DbRegisteredCategory
