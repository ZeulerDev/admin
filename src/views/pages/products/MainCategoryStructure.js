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
    CFormInput,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CBadge,
    CRow,
    CCol,
    CFormCheck
} from '@coreui/react'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'
import { Link } from 'react-router-dom'
import { cilBan, cilList, cilMove, cilPen, cilPencil, cilViewModule } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const MainCategoryStructure = () => {

    const [{ user, token }, dispatch] = useAppContext()
    const [loadingCategory, setLoadingCategory] = useState(false)
    const [visibleCategory, setVisibleCategory] = useState(false)
    const [loadingProduct, setLoadingProduct] = useState(false)


    const [isDisable, setIsDisable] = useState(true)
    const [visible, setVisible] = useState(false)


    const [selectedMainCategoryMove2, setSelectedMainCategoryMove2] = useState('All Main Categories')
    const [paramMainCategoryMove2, setParamCMainCategoryDataMove2] = useState('')
    const [mainCategoriesDataMove2, setMainCategoriesDataMove2] = useState([])
    const [mainCIdMove2, setMainCIDMove2] = useState('')
    const [visibleMainModel, setVisibleMainModel] = useState(false)


    const [name, setName] = useState('')
    const [subName, setSubName] = useState('')
    const [category, setCategory] = useState([])
    const [subCategoryData, setSubCategoryData] = useState([])

    useEffect(() => {
        loadDataMainCategories()
        fetchCategories()
    }, [])

    const loadDataMainCategories = () => {
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
                        // setMainCategoriesData(res.data)
                        // setMainCategoriesDataMove(res.data)
                        setMainCategoriesDataMove2(res.data)
                        // setMainCategoriesDataSelect2(res.data)
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
    }

    const mainCategory = (index, categoryName, type) => {

        if (type === 'move2') {
            console.log('index', index, categoryName, type)
            if (index === 'all') {

            } else {
                console.log('index', index, categoryName, type)
                setParamCMainCategoryDataMove2(index)
                setSelectedMainCategoryMove2(categoryName)
                setMainCIDMove2(index)
            }
        }
    }
  
    const uploadCategory = () => {
        console.log('save', paramMainCategoryMove2)
        if (subName && paramMainCategoryMove2 !== '') {
            setVisible(false)
            const data = {
                subName: subName,
                index: paramMainCategoryMove2
            }
            handleRegistrationCategory(data, 'sub')

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

    const handleMainModel = () => {
        setVisibleMainModel(true)
    }

    const handleMainSubModel = () => {
        setVisible(true)
    }

    const handleMainCategory = () => {
        if (name) {
            console.log(name)
            const data = {
                name: name
            }
            handleRegistrationCategory(data, 'main')
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


    const handleRegistrationCategory = (obj, type) => {
        if (obj && type) {
            let formData;

            if (type === 'main') {
                formData = {
                    name: obj.name
                }
            } else if (type === 'sub') {
                formData = {
                    name: obj.subName,
                    index: obj.index
                }
            }

            if (user, token) {
                axios
                    .post(BASE_URL + 'product/category/add', formData, {
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
                            setName('')
                            setSubName('')
                            setParamCMainCategoryDataMove2('')
                            loadDataMainCategories()
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
                                    title: 'Category Registration error',
                                    message: 'Category Registration error 500',
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
                    message: ' error, Please Check the input fields',
                    color: 'warning'
                }
            })

        }
    }

    const downloadFile = () => {
        if (user && token) {
            axios
                .get(BASE_URL + 'product/categories/download', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: 'blob', // Set the response type to blob
                })
                .then((res) => {
                    if (res.status === 200) {
                        const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.setAttribute('download', 'category.json'); // Set the file name
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Download file ',
                                message: 'Download file success',
                                color: 'success',
                            },
                        });
                        loadData(0, true);
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Download file ',
                                message: 'Download file error',
                                color: 'danger',
                            },
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    const fetchCategories = () => {
        if (user && token) {
            setLoadingCategory(true)
            axios.get(BASE_URL + 'product/list/categories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setCategory(res.data)
                    setLoadingCategory(false)
                } else if (res.status === 204) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Error!',
                            message: ' error',
                            color: 'warning'
                        }
                    })

                } else if (res.status === 500) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Error!',
                            message: ' error',
                            color: 'warning'
                        }
                    })
                }
            }).catch((error) => {
                dispatch({
                    type: SET_ALERT,
                    payload: {
                        status: true,
                        title: 'Error!',
                        message: ' error',
                        color: 'warning'
                    }
                })
            })
        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Error!',
                    message: ' error',
                    color: 'warning'
                }
            })
        }
    };

    const handleCategory = (item) => {
        setVisibleCategory(true)
        setSubCategoryData(item)
    }

    return (
        <CContainer>
            <CNavbar style={{ justifyContent: 'flex-start' }} className="bg-body-tertiary">
                <CBadge style={{ marginLeft: '0.2%' }} color="secondary">Download Category file</CBadge>
                <CButton
                    style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '0.5%' }}
                    onClick={() => {
                        downloadFile()
                    }}
                >
                    Download File
                </CButton>
                <CButton onClick={() => { handleMainModel() }} style={{ backgroundColor: '#ff4d4d', width: '17%', color: 'white', marginLeft: '41%' }}>Add Main Category</CButton>
                <CButton onClick={() => { handleMainSubModel() }} style={{ backgroundColor: '#ff4d4d', width: '17%', color: 'white', marginLeft: 5 }}>Add Sub Category</CButton>

            </CNavbar>

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


            <CModal alignment="center" visible={visible} scrollable size='lg' onClose={() => {
                setParamCMainCategoryDataMove2('')
                setSubName('')
                setVisible(false)
            }
            }>
                <CModalHeader closeButton>
                    <CModalTitle>Add Sub Category</CModalTitle>
                </CModalHeader>
                <CModalBody>

                    <CRow>
                        <CCol md={6}>
                            <a style={{ fontSize: 17, fontWeight: 'bold' }}>Select the Main Category</a><br></br><br></br>
                            {mainCategoriesDataMove2.map((item, index) => (
                                <CFormCheck
                                    onChange={() => mainCategory(index, item, 'move2')}
                                    key={index}
                                    type="radio"
                                    name="mainCategoryRadio"
                                    id={`flexRadioDefault${index}`}
                                    label={item}
                                    checked={mainCIdMove2 === index}
                                />
                            ))}

                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                placeholder="Enter Subcategory Name"
                                value={subName}
                                onChange={(e) => setSubName(e.target.value)} />

                            {/* <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => {uploadCategory() }}>Save</CButton> */}
                        </CCol >
                    </CRow>

                </CModalBody>
                <CModalFooter>
                    <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => { uploadCategory() }}>Save</CButton>
                </CModalFooter>
            </CModal>


            {loadingCategory ? <CSpinner /> : <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Main Category</CTableHeaderCell>
                        <CTableHeaderCell scope="col">View Sub Categories</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {category.map((item, index) => {
                        return (
                            <CTableRow key={index}>
                                <CTableDataCell>{index + 1}</CTableDataCell>
                                <CTableDataCell>{item.mainCategory}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleCategory(item.subCategories) }}>
                                        <CIcon icon={cilViewModule} size='lg' style={{ color: 'white' }} />
                                    </CButton>
                                </CTableDataCell>

                            </CTableRow>
                        )
                    })}
                </CTableBody>
            </CTable>
            }


            <CModal visible={visibleCategory} scrollable size="sm" onClose={() => setVisibleCategory(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>SubCategories Information</CModalTitle>
                </CModalHeader>
                <CModalBody
                    style={{
                        overflowY: 'auto',
                        maxHeight: '70vh',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >

                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">SubCategory</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {subCategoryData?.map((items, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{items}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CModalBody>
                <CModalFooter>
                </CModalFooter>
            </CModal>
        </CContainer>
    )
}

export default MainCategoryStructure
