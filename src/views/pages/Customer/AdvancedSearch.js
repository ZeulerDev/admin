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
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CNavbar,
    CForm,
    CPagination,
    CPaginationItem,
    CCardImage,
    CSpinner,
    CRow,
    CFormLabel,
    CCol,
    CFormInput,
    CBadge,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from '@coreui/react'

import { cilInfo, cilList, cilNotes } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { format } from 'date-fns';
import { BASE_URL } from '../../../context/config'

const Orders = () => {
    const [visible, setVisible] = useState(false)
    const [visibleCustomer, setVisibleCustomer] = useState(false)
    const [{ user, token }, dispatch] = useAppContext()
    const navigate = useNavigate()
    const [ordersData, setOrdersData] = useState([])
    const [orderCustomerDetails, setOrderCustomerDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [orderDataDetails, setOrderDataDetails] = useState([])
    const [selectedDates, setSelectedDates] = useState([])

    const [itemsPerPage, setItemsPerPage] = useState(0)
    const [isDisable, setIsDisable] = useState(true)
    const [resultCount, setResultCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchType, setSearchType] = useState('EMAIL')
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(currentDate, 'yyyy-MM-dd');
        setSelectedDates([formattedStartDate, formattedEndDate]);
        console.log(formattedStartDate, formattedEndDate)

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
    }, [user, token, selectedDates,searchQuery])

    const loadData = (count, timer) => {
        console.log(count, selectedDates)
        setLoading(true)
        axios
            .get(BASE_URL + `assistant/users/advance/search/${count}?date=${selectedDates}&name=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setOrdersData(res.data.list)
                    setResultCount(res.data.count)
                    console.log(res.data.list)
                    setLoading(false)
                    clearTimeout(timer)
                    if (res.data.list.length < 50) {
                        setIsDisable(true)
                        console.log("ok")
                    } else if (res.data.list.length > 49) {
                        setIsDisable(false)
                    }
                } else if (res.status === 204) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Orders loading error',
                            message: res.data.message,
                        },
                    })
                } else if (res.status === 500) {
                    dispatch({
                        type: SET_ALERT,
                        payload: {
                            status: true,
                            title: 'Orders loading error',
                            message: res.data.message,
                        },
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
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

    const handleToggle = (id) => {
        setVisible(!visible)
        console.log(id)
        if (token && user) {
            setLoadingModal(true)
            axios
                .get(BASE_URL + 'assistant/grocery/order/' + id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setOrderDataDetails(res.data)
                        setLoadingModal(false)
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Order details view error',
                                message: res.data.message,
                            },
                        })
                    }
                })
                .catch((error) => {
                    console.error('Order details view error:', error)
                })
        }
    }

    const handleCustomerToggle = (id) => {
        setVisibleCustomer(!loadingModal)
        console.log(id)
        if (token && user) {
            setLoadingModal(true)
            axios
                .get(BASE_URL + 'assistant/grocery/customer/' + id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setOrderCustomerDetails(res.data)
                        setLoadingModal(false)
                    } else if (res.status === 500) {
                        dispatch({
                            type: SET_ALERT,
                            payload: {
                                status: true,
                                title: 'Order details view error',
                                message: res.data.message,
                            },
                        })
                    }
                })
                .catch((error) => {
                    console.error('Order details view error:', error)
                })
        }
    }

    const handleDateRangeChange = (value) => {
        if (value) {
            const formattedStartDate = format(value[0], 'yyyy-MM-dd');
            const formattedEndDate = format(value[1], 'yyyy-MM-dd');
            setSelectedDates([formattedStartDate, formattedEndDate]);

        } else {
            setSelectedDates([]);

        }
    };

    return (
        <CContainer>
            <CNavbar className="bg-body-tertiary">
                <DateRangePicker style={{ marginLeft: 0 }} format="yyyy/MM/dd" onChange={handleDateRangeChange}
                    value={selectedDates.length > 0 ? [new Date(selectedDates[0]), new Date(selectedDates[1])] : null} />


{/* <CBadge style={{ marginLeft: '0.2%'}} color="secondary">Select the search type</CBadge> */}
      {/* <CDropdown style={{ marginRight: '0%', width:'20%',backgroundColor: '#ff4d4d' }}>
      <CDropdownToggle >{searchType} </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => setSearchType('NAME')}>By Name</CDropdownItem>
            <CDropdownItem onClick={() => setSearchType('SURNAME')}>By Surname</CDropdownItem>
            <CDropdownItem onClick={() => setSearchType('EMAIL')}>By Email</CDropdownItem>
            <CDropdownItem onClick={() => setSearchType('PHONE')}>By Contact Number</CDropdownItem>
          </CDropdownMenu>
        </CDropdown> */}
      <CFormInput  
         type ="text" 
         placeholder="Search by customer name, surname, email and contact" 
         style={{ width : 450,  marginRight: '0%' }}
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
       
         />
            </CNavbar>

            {loading ? (
                <CSpinner />
            ) : (
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Surname</CTableHeaderCell>
                            <CTableHeaderCell scope="col">email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Language</CTableHeaderCell>

                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {ordersData.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                                <CTableHeaderCell><CCardImage style={{ width: 50, height: 50, borderRadius: 10 }} src={`https://api.zeuler.com/image/` + item.photo} /></CTableHeaderCell>
                                <CTableDataCell>{item.name}</CTableDataCell>
                                <CTableDataCell>{item.surname}</CTableDataCell>
                                <CTableDataCell>{item.email}</CTableDataCell>
                                <CTableDataCell>{item.contact}</CTableDataCell>
                                <CTableDataCell>{item.country === "it" || item.country === 'Italy' ? 'Italy' : item.country}</CTableDataCell>
                                <CTableDataCell>{item.language === 'en' ? 'English' : item.language === 'it' ? 'Italy' : item.language}</CTableDataCell>
                                {/* <CTableDataCell>
              <Link to={`/customers/items`}>
                 <CIcon icon={cilList} size='xl'/>
                </Link>
              </CTableDataCell> */}
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            )}
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

        </CContainer>
    )
}

export default Orders
