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

import { cilClipboard, cilInfo, cilList, cilNotes } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { format } from 'date-fns';
import { BASE_URL } from '../../../context/config'

const RegisteredCategories = () => {
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
    const [searchType, setSearchType] = useState('NAME')
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

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
    }, [user, token, debouncedSearchQuery,searchType])

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
        console.log(count, selectedDates)
        setLoading(true)
        axios
            .get(BASE_URL + `product/registered/category/${count}?name=${searchQuery}&type=${searchType}`, {
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


    return (
        <CContainer>
            <CNavbar className="bg-body-tertiary" style={{justifyContent : 'flex-start'}}>


                <CBadge style={{ marginLeft: '0.2%' }} color="secondary">Select the search type</CBadge>
                <CDropdown style={{ marginLeft: '0.5%', width: '20%', backgroundColor: '#ff4d4d' }}>
                        <CDropdownToggle >{searchType} </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={() => setSearchType('NAME')}>By Name</CDropdownItem>
                            <CDropdownItem onClick={() => setSearchType('ID')}>By Id</CDropdownItem>
                        </CDropdownMenu>
                </CDropdown>
                <CFormInput
                    type="text"
                    placeholder="Search here"
                    style={{ width: 450, marginLeft: '0.5%' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}

                />
            </CNavbar>

            {loading ? (
                <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>
            ) : (
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Subcategory name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Main category Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Is included</CTableHeaderCell>
                            {/* <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Market</CTableHeaderCell> */}

                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {ordersData.length === 0 ? (
                                    <CTableRow>
                                        <CTableDataCell colSpan="5" style={{ textAlign: 'center', backgroundColor: "white" }}>
                                            <h6 style={{ marginTop: "1%" }}>No Data</h6>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) : (
                        ordersData.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                              
                                <CTableDataCell>
                                    <div style={{display: 'flex',justifyContent:'space-between'  }}>   
                                    <div>{item.categoryId}</div>
                                    <div><CIcon
                                        icon={cilClipboard}
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.categoryId);
                                            dispatch({
                                                type: SET_ALERT,
                                                payload: {
                                                    status: true,
                                                    title: 'Copy Success',
                                                    message: 'Category ID copied to clipboard',
                                                    color: 'success',
                                                },
                                            });
                                        }}
                                    />
                                       
                                    </div>
                                    </div>
                                    
                                </CTableDataCell>
                                <CTableDataCell>{item.name}</CTableDataCell>
                                <CTableDataCell>{item.mainCategory}</CTableDataCell>
                                <CTableDataCell>{item.isInclude === true ? 'Yes': 'No'}</CTableDataCell>
                                {/* <CTableDataCell>{item.chainName}</CTableDataCell>
                                <CTableDataCell>{item.marketAddress}</CTableDataCell> */}
                            </CTableRow>
                        ))
                    )}
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

export default RegisteredCategories
