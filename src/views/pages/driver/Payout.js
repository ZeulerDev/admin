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
    CForm,
    CPagination,
    CPaginationItem,CCardImage,
    CBadge,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CSpinner,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CFormInput
  } from '@coreui/react'
  import axios from 'axios'
  import { useAppContext } from '../../../context/AppContext'
  import { SET_ALERT } from '../../../context/context_reducer'
  import { useNavigate } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer'
// import OrdinaryVatRegistrationPDF from '../../../components/OrdinaryVatRegistrationPDF'
import FlatRateVatRegistrationPDF from '../../../components/FlatRateVatRegistrationPDF'
import OccasionalEmployeePDF from '../../../components/OccasionalEmployeePDF'
import '../../../scss/styles.scss'
import { BASE_URL } from '../../../context/config'

const DriverPayout = ()=>{

    const [visible, setVisible] = useState(false)
    const [payOutConfirmation, setPayOutConfirmation] = useState(false)
    const [{user, token}, dispatch] = useAppContext()
    const [loading, setLoading] = useState(false)
    const [payout, setPayOutData] = useState([])
    const [pdf, setPdfData] = useState([])
    const [statusData, setStatus] = useState('All')
    const [statusParam, setStatusParam] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
    const [payoutStatus, setPayoutStatus] = useState('')
    const [payoutId, setPayoutId] = useState('')
    const[alert, setAlert] = useState(false)

    const [resultCount, setResultCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(0)
    const [isDisable, setIsDisable] = useState(true)

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
       if(user && token){
        loadData(0,timer)
       } 

       return () => {
        clearTimeout(timer);
      };
    },[statusParam,debouncedSearchQuery])

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

    const loadData  = (count, timer) => {
      setLoading(true)
      axios.get(BASE_URL+`assistant/drivers/payouts/${count}?status=${statusParam}&no=${searchQuery}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res)=>{
            if (res.status === 200) {
                setPayOutData(res.data.data)  
                setResultCount(res.data.count)
                setLoading(false)
                setAlert(false)
                clearTimeout(timer);
                if (res.data.data.length < 50) {
                  setIsDisable(true)
                  console.log("ok")
                } else if (res.data.data.length > 49) {
                  setIsDisable(false)
                }
              } else if (res.status === 204) {
                dispatch({
                  type : SET_ALERT,
                  payload : {
                    status : true,
                    title : 'Error',
                    message : res.data.message,
                    color:'warning'
                  }
                })
              }else if (res.status === 500) {
                  dispatch({
                    type : SET_ALERT,
                    payload : {
                      status : true,
                      title : 'Error',
                      message : res.data.message,
                      color:'warning'
                    }
                  })
                }


        })
        .catch((err)=>{
            console.log('Error', err)
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


    const handleToggle = (type, item) => {
        setVisible(!visible)
        

        const data = {
            type: type,
            item: item
        }
        setPdfData(data)
        console.log('Toggle', type, item)
    }

    const handleConfirmationToggle = (id, state) => {
      setPayOutConfirmation(!visible)
      setPayoutId(id)
      console.log("VIew",id, state)

      if(state === 'waiting'){
        setPayoutStatus('ready')
      }else if(state === 'sent'){
        setPayoutStatus('ready')
      }else if(state === 'ready'){
        setPayoutStatus('done')
      }
      
  }

  const handleConfirmation = () => {
    console.log('Confirmation', payoutStatus, payoutId)

    const data = {
      status: payoutStatus
    }

    if(user && token){
       axios
        .patch(BASE_URL+'assistant/payout/change/'+payoutId, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("updated")
            setPayOutConfirmation(false)
            const updatedEntity = res.data
            const list = payout.map((ob) => {
              if(ob.id === updatedEntity.id){
                return updatedEntity
              } else {
                return ob
              }
            })
            setPayOutData([...list])
          } else if (res.status === 203) {
              
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Driver Payout status error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 204) {
              console.log("204")
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Driver Payout status error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Driver Payout status update error',
                message : res.data.message
              }
            })
             
          }
        }).catch((error) => {
          console.error( error)
          
        })
    }
  }

    const status = (status) => {
      if (status === 'all') {
        setStatusParam('')
        setStatus('All')
        setSearchQuery('')
      } else {
        console.log(status)
        setStatusParam(status)
        setStatus(status)
        setSearchQuery('')
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
  

    return(

        <CContainer>
        <CBadge style={{ marginLeft: '75%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}}  >{statusData}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => status('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => status('pending')}>Pending</CDropdownItem>
            <CDropdownItem onClick={() => status('sent')}>Sent</CDropdownItem>
            <CDropdownItem onClick={() => status('ready')}>Ready</CDropdownItem>
            <CDropdownItem onClick={() => status('waiting')}>Waiting</CDropdownItem>
            <CDropdownItem onClick={() => status('done')}>Paid</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
       <CNavbar style={{marginTop:'1%'}} className="bg-body-tertiary">
       <CFormInput  
         type ="text" 
         placeholder="Search by No" 
         style={{ width : 450, marginLeft: '0%' }}
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
       
         />
        </CNavbar>
  
        {loading ? <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div> : <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tips</CTableHeaderCell>
              <CTableHeaderCell scope="col">Payable</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              <CTableHeaderCell scope="col">PDF</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {payout.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="11" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
            payout.map((item, index) => {
                let color = 'info'
                let status = ''
                if(item?.status === 'pending'){
                    status = 'Pending'
                    color = 'info'
                } else if(item?.status === 'done'){
                    status = 'Paid'
                    color = 'primary'
                } else if(item?.status === 'sent'){
                    status = 'Sent'
                    color = 'success'
                } else if(item?.status === 'waiting'){
                    status = 'Waiting'
                    color = 'warning'
                } else if(item?.status === 'ready'){
                    status = 'Ready'
                    color = 'danger'
                }
                return (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{item.no}</CTableDataCell>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>
                          <CBadge style={{ width:60 }} color={color}>{status}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{item.date}</CTableDataCell>
                      <CTableDataCell>{item.total}</CTableDataCell>
                      <CTableDataCell>{item.tax}</CTableDataCell>
                      <CTableDataCell>{item.tips}</CTableDataCell>
                      <CTableDataCell>{item.payable}</CTableDataCell>
                      {/* <CTableDataCell>{item.status === 'pending' ? <CBadge style={{ width:60, backgroundColor:'#ff4d4d' }}>Pending</CBadge> : item.status === 'sent' ? <CButton style={{ width:90, backgroundColor:'#ff4d4d' }}>Received</CButton>: item.status === 'ready ' ? <CButton  style={{ width:90, backgroundColor:'#ff4d4d' }}>To Pay</CButton>: item.status === 'waiting  ' ? <CButton  style={{ width:90, backgroundColor:'#ff4d4d' }}>Received</CButton>: <CBadge style={{ width:60, backgroundColor:'#ff4d4d' }} >Done</CBadge>}</CTableDataCell> */}
                      <CTableDataCell>
                        {item?.status === 'waiting' && <CButton onClick={() => handleConfirmationToggle(item.id,item.status)} size='sm' color={color} style={{ width:90 }}>Received</CButton>}
                        {item?.status === 'sent' && <CButton size='sm' onClick={() => handleConfirmationToggle(item.id,item.status)} color={color} style={{ width:90 }}>Received</CButton>}
                        {item?.status === 'ready' && <CButton size='sm' onClick={() => handleConfirmationToggle(item.id,item.status)} color={color} style={{ width:90 }}>To Pay</CButton>}
                      </CTableDataCell>
                      <CTableDataCell><CButton  size='sm' style={{ backgroundColor:'#ff4d4d', width:80 ,color:'white'}} onClick={() => handleToggle(item.type, item)} >View</CButton> </CTableDataCell>
                      {/* <CTableDataCell>{item.type === 'flat_rate' ? <CButton style={{ backgroundColor:'#ff4d4d' }} onClick={() => handleToggle(item.type, item)} >View</CButton> : item.type === 'occasional' ? <CButton style={{ backgroundColor:'#ff4d4d' }}>View</CButton> : <CButton disabled={true} style={{ backgroundColor:'#ff4d4d' }}>View</CButton>}</CTableDataCell> */}
                    </CTableRow>
                  )
            })
          )}
          </CTableBody>
        </CTable>}
       
  
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


        <CModal visible={visible} scrollable size='xl' onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Information</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ overflowY: 'auto', maxHeight: '70vh', display : "flex", justifyContent : 'center'}}>
          {
           pdf.type === 'flat_rate' ? (
             <PDFViewer style={{ width: "100%", height: "100vh" }}><FlatRateVatRegistrationPDF data={pdf.item} /></PDFViewer> 
          ) : pdf.type === 'occasional' ? (
            <PDFViewer style={{ width: "100%", height: "100vh" }}><OccasionalEmployeePDF data={pdf.item} /></PDFViewer>
          ) : null
          }
         </CModalBody>
      </CModal>

      <CModal 
      alignment="center" 
      transition={false}
      visible={payOutConfirmation} 
      scrollable size='lg' 
      onClose={() => setPayOutConfirmation(false)} 
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ overflowY: 'auto', maxHeight: '70vh', display : "flex", justifyContent : 'center'}}>
          <a>Are you sure you want to pay out status ?</a>
          <CButton
            onClick={() => handleConfirmation()}
            style={{ display: 'flex', justifyContent: 'center' }}
            color="primary"
          >
            Yes
          </CButton>
         </CModalBody>
      </CModal>

      <CModal alignment="center" visible={payOutConfirmation} scrollable size='sm' onClose={() => setPayOutConfirmation(false)}>
        <CModalHeader closeButton={false}>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Are you sure you want to pay out status ?</a><br></br><br></br>
        <div style={{display : "flex", justifyContent : 'center'}}>
        <CButton onClick={() => handleConfirmation()} style={{  backgroundColor:'#ff4d4d', color:'white',marginRight: '10px' }} >Yes</CButton>
        <CButton onClick={() => setPayOutConfirmation(false)} style={{  backgroundColor:'#ff4d4d', color:'white',marginLeft: '10px' }} >No</CButton>
        </div>
     
        </CModalBody>
      </CModal>





      </CContainer>
    )
    
}

export default DriverPayout