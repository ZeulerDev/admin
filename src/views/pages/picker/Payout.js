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
//   import { useNavigate } from 'react-router-dom'
// import { PDFViewer } from '@react-pdf/renderer'
// import OrdinaryVatRegistrationPDF from '../../../components/OrdinaryVatRegistrationPDF'
// import FlatRateVatRegistrationPDF from '../../../components/FlatRateVatRegistrationPDF'
// import OccasionalEmployeePDF from '../../../components/OccasionalEmployeePDF'
import { BASE_URL } from '../../../context/config'

const Payout = ()=>{

    const [visible, setVisible] = useState(false)
    const [payOutConfirmation, setPayOutConfirmation] = useState(false)
    const [{user, token}, dispatch] = useAppContext()
    const [loading, setLoading] = useState(false)
    const [payout, setPayOutData] = useState([])
    const [pdf, setPdfData] = useState([])
    const [statusData, setStatus] = useState('All')
    const [statusParam, setStatusParam] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [payoutStatus, setPayoutStatus] = useState('')
    const [payoutId, setPayoutId] = useState('')


    useEffect(() => {
      console.log('Payout with')
       if(user && token){
        console.log('Payout with user')
        loadData()
       } 
    },[statusParam,searchQuery])

    useEffect(() => {
      console.log('just call in effect')
    }, [])

    // return (
    //   <CContainer> 
    //     <h1>Just Call</h1>
    //   </CContainer>
    // )

    const loadData =()=>{
      setLoading(true)
      axios.get(BASE_URL+`assistant/pickers/payouts/0?status=${statusParam}&no=${searchQuery}`,{
          headers:{
              Authorization: `Bearer ${token}`,
          },
      })
      .then((res)=>{
          if (res.status === 200) {
              setPayOutData(res.data)  
              setLoading(false)

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
                title : 'Pricker Payout status error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 204) {
              console.log("204")
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Pricker Payout status error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Pricker Payout status update error',
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
      } else {
        console.log(status)
        setStatusParam(status)
        setStatus(status)
      }
    }

    return(

        <CContainer>
        <CNavbar className="bg-body-tertiary">
        <CFormInput  
         type ="text" 
         placeholder="Search By No" 
         style={{ width : 200, marginLeft: '1%' }}
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
       
         />
        <CDropdown style={{ marginLeft: '65%', width:'10%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle  >{statusData}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => status('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => status('pending')}>Pending</CDropdownItem>
            <CDropdownItem onClick={() => status('sent')}>Sent</CDropdownItem>
            <CDropdownItem onClick={() => status('ready')}>Ready</CDropdownItem>
            <CDropdownItem onClick={() => status('waiting')}>Waiting</CDropdownItem>
            <CDropdownItem onClick={() => status('done')}>Done</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <br></br>
        </CNavbar>
  
        {loading ? <CSpinner/> : <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tips</CTableHeaderCell>
              <CTableHeaderCell scope="col">Payable</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {payout.map((item, index) => {
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
                      {/* <CTableDataCell>
                        {item?.status === 'waiting' && <CButton onClick={() => handleConfirmationToggle(item.id,item.status)} size='sm' color={color} style={{ width:90 }}>Received</CButton>}
                        {item?.status === 'sent' && <CButton size='sm' onClick={() => handleConfirmationToggle(item.id,item.status)} color={color} style={{ width:90 }}>Received</CButton>}
                        {item?.status === 'ready' && <CButton size='sm' onClick={() => handleConfirmationToggle(item.id,item.status)} color={color} style={{ width:90 }}>To Pay</CButton>}
                      </CTableDataCell>
                      <CTableDataCell><CButton  size='sm' style={{ backgroundColor:'#ff4d4d', width:80 }} onClick={() => handleToggle(item.type, item)} >View</CButton> </CTableDataCell> */}
                      {/* <CTableDataCell>{item.type === 'flat_rate' ? <CButton style={{ backgroundColor:'#ff4d4d' }} onClick={() => handleToggle(item.type, item)} >View</CButton> : item.type === 'occasional' ? <CButton style={{ backgroundColor:'#ff4d4d' }}>View</CButton> : <CButton disabled={true} style={{ backgroundColor:'#ff4d4d' }}>View</CButton>}</CTableDataCell> */}
                    </CTableRow>
                  )
            })}
          </CTableBody>
        </CTable>}
       
  
        {/* <CPagination aria-label="Page navigation example">
          <CPaginationItem>Previous</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination> */}


        {/* <CModal visible={visible} scrollable size='xl' onClose={() => setVisible(false)}>
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

      <CModal  transition={false} alignment="center" visible={payOutConfirmation} scrollable size='lg' onClose={() => setPayOutConfirmation(false)}>
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
      </CModal> */}





      </CContainer>
    )
    
}

export default Payout