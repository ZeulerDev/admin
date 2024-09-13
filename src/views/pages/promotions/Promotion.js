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
    CPagination,
    CPaginationItem,
    CSpinner,
    CDropdown,
    CDropdownToggle,
    CDropdownItem,
    CDropdownMenu,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CCol,
    CFormInput,
    CFormSelect,
    CBadge,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilAirplay, cilLeaf, cilPenAlt, cilPencil, cilSettings, cilTrash } from '@coreui/icons'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import '../../../scss/styles.scss'
import { BASE_URL } from '../../../context/config'


const Promotion = () => {

    const [visible, setVisible] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [{ user, token }, dispatch] = useAppContext()
    const [promotionData, setPromotionData] = useState([])
    const [loading, setLoading] = useState(false)
    const [paramCity, setParamCityData] = useState('')
    const [paramGroup, setParamGroupData] = useState('')
    const [paramChainId, setParamChainData] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [isActivate, setActivate] = useState(false)
    const [promotionId, setPromotionId] = useState('')


    const [selectedCity, setSelectedCity] = useState('All Cities')
    const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
    const [selectedChain, setSelectedChian] = useState('All Chains')

    const [mGroupData, setMGroupData] = useState([])
    const [chainData, setChainData] = useState([])

    const [visiblePromotion, setVisiblePromotion] = useState(false)
    const [promotionEditObj, setPromotionEditObj] = useState([])
    const [name, setName] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [code, setCode] = useState()

    const [passCode, setPassCode] = useState('')
    const [passCodeReEnter, setPassCodeReEnter] = useState('')
    const [visiblePasswordModal, setVisiblePasswordModal] = useState(false)

    const [isDisable, setIsDisable] = useState(true)
    const [resultCount, setResultCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(0)
    const [pid, setPId] = useState('')

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
        loadData(0, timer)
        return () => {
            clearTimeout(timer);
        };

    }, [searchQuery])

    const loadData = (count, timer) => {
        if (user && token) {
            setLoading(true)

            let url = BASE_URL + `promotion/all/${count}?name=${searchQuery}`

            axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setPromotionData(res.data.list)
                        console.log('result', res.data.list)
                        setResultCount(res.data.count)
                        setLoading(false)
                        clearTimeout(timer)

                        if (res.data.list.length < 20) {
                            setIsDisable(true)
                            console.log("ok")
                        } else if (res.data.list.length > 19) {
                            setIsDisable(false)
                        }

                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Error',
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


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        const c = itemsPerPage + 50
        setItemsPerPage(c)
        loadData(c, true)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
        const c = itemsPerPage - 50
        console.log(c)
        setItemsPerPage(c)
        loadData(c, false)
    }

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

    const handleToggle = (promotionId, isActive) => {
        setVisible(!visible)
        setActivate(isActive)
        setPromotionId(promotionId)
    }
    const handleTogglePassword = () => {
        setVisiblePromotion(false)
        setVisiblePasswordModal(true)

    }

    const handleActivate = () => {

        const data = {
            status: isActivate
        }

        console.log(promotionId, data)

        if (user && token) {
            axios
                .patch(BASE_URL + 'promotion/update/status/' + promotionId, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("updated")
                        setVisible(false)
                        setActivate('')
                        setPromotionId('')
                        const updatedEntity = res.data
                        const list = promotionData.map((item) => {
                            if (item.id === updatedEntity.id) {
                                console.log('update obj')
                                return updatedEntity
                            } else {
                                return item
                            }
                        })
                        setPromotionData([...list])
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Promotion status update',
                                message: "Promotion status updated successfully",
                                color: 'success'
                            }
                        })

                    } else if (res.status === 404) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Promotion status update error',
                                message: res.data.message
                            }
                        })

                    } else if (res.status === 400) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Promotion status update error',
                                message: res.data.message
                            }
                        })

                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Picker status update error',
                                message: res.data.message
                            }
                        })

                    }
                }).catch((error) => {
                    console.error(error)

                })
        }
    }

    const handleToggleUpdatePromotion = (promotionObj) => {
        console.log(promotionObj)
        setPromotionEditObj(promotionObj)
        setVisiblePromotion(!visiblePromotion)
        setName(promotionObj.name)
        setStartDate(promotionObj.startDate)
        setEndDate(promotionObj.endDate)
        setCode(promotionObj.promo_id)
    }

    const handleSubmit = () => {
        if (name && startDate && endDate && code) {

            const formData = {
                name: name,
                startDate: startDate,
                endDate: endDate,
                promo_id: code,
            }

            const id = promotionEditObj._id
            console.log(formData, id)

            if (user, token) {
                if (user && token) {
                    axios
                        .put(BASE_URL + 'promotion/update/' + id, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                console.log(res.data)
                                setVisiblePromotion(false)
                                const updatedEntity = res.data
                                const list = promotionData.map((item) => {
                                    if (item.id === updatedEntity.id) {
                                        console.log('update obj')
                                        return updatedEntity
                                    } else {
                                        return item
                                    }
                                })
                                setPromotionData([...list])
                                // loadData()
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Promotion update',
                                        message: 'Promotion details updated successfully',
                                        color: 'success'
                                    }
                                })
                            } else if (res.status === 404) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Promotion update error',
                                        message: 'Missing required fields',
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 400) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Promotion update error',
                                        message: res.data.message,
                                        color: 'warning'
                                    }
                                })
                            } else if (res.status === 500) {
                                dispatch({
                                    type: SET_ALERT,
                                    payload: {
                                        status: true,
                                        title: 'Promotion update error',
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
                    message: 'Picker update error, Please Check the input fields',
                    color: 'warning'
                }
            })

        }


    }
    const handleToggleDelete = (id) => {
        setVisibleDelete(!visibleDelete)
        setPId(id)
    }


    const deletePromotion = (id) => {
        const data = {
            disabled: true
        }

        console.log(id, data)

        if (user && token) {
            axios
                .patch(BASE_URL + 'promotion/delete/' + id, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("updated")
                        setVisibleDelete(false)
                        setPId('')
                        loadData()
                        // const updatedEntity = res.data
                        // let list = promotionData.map((item) => {
                        //     if (item.id === updatedEntity.id) {
                        //         console.log('update obj')
                        //          list = promotionData.filter((item) => item.id === id);

                        //         return updatedEntity
                        //     } else {
                        //         return item
                        //     }
                        // })
                        // setPromotionData([...list])
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Promotion Delete',
                                message: "Promotion delete successfully",
                                color: 'success'
                            }
                        })

                    } else if (res.status === 404) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Promotion delete error',
                                message: res.data.message
                            }
                        })

                    } else if (res.status === 400) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Promotion delete error',
                                message: res.data.message
                            }
                        })

                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Picker delete error',
                                message: res.data.message
                            }
                        })

                    }
                }).catch((error) => {
                    console.error(error)

                })
        }
    }

    const updatePassword = (id) => {
        if (passCode === '' || passCodeReEnter === '') {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Password update error',
                    message: 'Check the input fields',
                    color: 'warning'
                }
            })

        } else if (passCode === passCodeReEnter) {
            const data = {
                passcode: passCode
            }

            console.log(data, id)
            if (user && token) {
                axios
                    .patch(BASE_URL + 'assistant/shopper/update/' + id, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            setVisiblePasswordModal(false)
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Password update',
                                    message: 'Password updated successfully',
                                    color: 'success'
                                }
                            })
                            setVisiblePromotion(true)
                        } else if (res.status === 204) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Password update error',
                                    message: res.data.message
                                }
                            })
                        } else if (res.status === 404) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Password update error',
                                    message: res.data.message
                                }
                            })
                        } else if (res.status === 500) {
                            dispatch({
                                type: SET_ALERT,
                                payload: {
                                    status: true,
                                    title: 'Password update error',
                                    message: res.data.message
                                }
                            })
                        }
                    }).catch((error) => {
                        console.error(error)
                    })
            }
        } else if (passCode !== passCodeReEnter) {

            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Password update error',
                    message: 'Password does not match',
                    color: 'warning'
                }
            })

        } else {
            dispatch({
                type: SET_ALERT,
                payload: {
                    status: true,
                    title: 'Password update error',
                    message: 'Password update error or check the input fields',
                    color: 'warning'
                }
            })
        }
    }

    return (
        <CContainer>
            <Link to={`/promotions/add/promotion`} className="picker-link">
                <CButton style={{ marginLeft: '0%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
                    Add Promotion
                </CButton>
            </Link>

            <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
                <CFormInput
                    type="text"
                    placeholder="Search by Promotion by name"
                    className="picker-input"
                    value={searchQuery}
                    style={{ width: 480, marginLeft: '0%' }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

            </CNavbar>

            {loading ? <CSpinner /> : <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Promotion Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Manage Markets</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Manage Products</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Edit Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {promotionData.map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{index + 1}</CTableDataCell>
                            <CTableDataCell>{item.promo_id}</CTableDataCell>
                            <CTableDataCell>{item.name}</CTableDataCell>
                            <CTableDataCell>{new Date(item.startDate).toLocaleDateString()}</CTableDataCell>
                            <CTableDataCell>{new Date(item.endDate).toLocaleDateString()}</CTableDataCell>
                            <CTableDataCell>{item.status === true ? "Active" : "De active"}</CTableDataCell>
                            <CTableDataCell>
                                <Link to={`/promotions/market/${item._id}`} >
                                    <CButton size='sm' style={{ backgroundColor: '#ff4d4d', color: "white" }} variant="outline">
                                        <CIcon icon={cilSettings} size='lg' style={{ color: 'white' }} />
                                    </CButton>
                                </Link>
                            </CTableDataCell>
                            <CTableDataCell>
                                <Link  to={`/promotions/products/${item._id}`} >
                                    <CButton size='sm' style={{ backgroundColor: '#ff4d4d', color: "white" }} variant="outline">
                                        <CIcon icon={cilSettings} size='lg' style={{ color: 'white' }} />
                                    </CButton>
                                </Link>
                            </CTableDataCell>
                            <CTableDataCell>
                                <Link>
                                    <CIcon icon={cilPencil} size='xl' onClick={() => handleToggleUpdatePromotion(item)} />
                                </Link>
                            </CTableDataCell>
                            <CTableDataCell>
                                {item.status ? <CButton size='sm' onClick={() => handleToggle(item._id, false)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Deactivate</CButton> : <CButton size='sm' onClick={() => handleToggle(item._id, true)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Activate</CButton>}

                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => handleToggleDelete(item._id)}>
                                    <CIcon icon={cilTrash} size='lg' style={{ color: 'white' }} />
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


            <CModal alignment="center" visible={visibleDelete} scrollable size='sm' onClose={() => setVisibleDelete(false)}>
                <CModalHeader closeButton={false}>
                    <CModalTitle>Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Are you sure you want to delete this promotion?</a><br></br><br></br>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <CButton onClick={() => deletePromotion(pid)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
                        <CButton onClick={() => setVisibleDelete(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
                    </div>

                </CModalBody>
            </CModal>


            <CModal alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
                <CModalHeader closeButton={false}>
                    <CModalTitle>Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <a>Are you sure you want to {isActivate ? 'activate' : 'deactivate'} this promotion?</a><br></br><br></br>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <CButton onClick={() => handleActivate()} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
                        <CButton onClick={() => setVisible(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
                    </div>
                </CModalBody>
            </CModal>

            <CModal visible={visiblePromotion} scrollable size="lg" onClose={() => setVisiblePromotion(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Edit Promotion Information</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="row g-3" >
                        <CCol md={6}>
                            <CFormInput
                                id="name"
                                label="Promotion Name"
                                defaultValue={promotionEditObj.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                id="startDate"
                                label="Start Date"
                                type='date'
                                defaultValue={promotionEditObj.startDate?.split('T')[0] || ''}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                id="endDate"
                                label="End Date"
                                type='date'
                                defaultValue={promotionEditObj.endDate?.split('T')[0] || ''}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </CCol>

                        <CCol md={6}>
                            <CFormInput
                                id="promotionid"
                                label="Promotion ID"
                                readOnly
                                defaultValue={promotionEditObj.promo_id}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </CCol>

                        <CButton type="submit" style={{ marginBottom: '3%', width: '200px', backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => handleSubmit()}>
                            Update Promotion
                        </CButton>

                    </div>
                </CModalBody>
                {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setVisiblePicker(false)}>
            Close
          </CButton>
        </CModalFooter> */}
            </CModal>


        </CContainer>
    )
}

export default Promotion
