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
} from '@coreui/react'

import { cilInfo, cilList, cilNotes } from '@coreui/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { format } from 'date-fns';
import { BASE_URL } from '../../../context/config'

const GroceryOrderLits = () => {

  const { id } = useParams()

  const [visible, setVisible] = useState(false)
  const [visibleCustomer, setVisibleCustomer] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const navigate = useNavigate()
  const [ordersData, setOrdersData] = useState([])
  const [orderCustomerDetails, setOrderCustomerDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [orderDataDetails, setOrderDataDetails] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
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
    if (user && token) {
      loadData(0, timer)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [user, token, selectedDates])

  const loadData = (count, timer) => {
    setLoading(true)
    axios
      .get(BASE_URL+'assistant/grocery/order/' + count + '?cid=' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setOrdersData(res.data)
          setLoading(false)
          clearTimeout(timer)
          if (res.data.length < 50) {
            setIsDisable(true)
            console.log("ok")
          } else if (res.data.length > 49) {
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
    const c = itemsPerPage + 50
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    const c = itemsPerPage - 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handleToggle = (id) => {
    setVisible(!visible)
    console.log(id)
    if (token && user) {
      setLoadingModal(true)
      axios
        .get(BASE_URL+'assistant/grocery/order/product/'+ id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            setOrderDataDetails(res.data)
            setLoadingModal(false)
          } else if (res.status === 500) {
            setLoadingModal(false)
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
          setLoadingModal(false)
          console.error('Order details view error:', error)
        })
    }
  }


  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
      </CNavbar>

      {loading ? (
       <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Delivery Fee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Slot</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Markup</CTableHeaderCell>
              <CTableHeaderCell scope="col">Order Details</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {
            ordersData.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan="11" style={{ textAlign: 'center',backgroundColor:"white" }}>
                  <h6 style={{ marginTop: "1%" }}>No Data</h6>
                </CTableDataCell>
              </CTableRow>
            ) : (
            ordersData.map((item,index) => (
              <CTableRow key={index}>
                <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                <CTableDataCell>{item.no}</CTableDataCell>
                <CTableDataCell>{item.customer}</CTableDataCell>
                <CTableDataCell><CBadge style={{ width:80 }} color="info">{item.status}</CBadge></CTableDataCell>
                <CTableDataCell>{item.address}</CTableDataCell>
                <CTableDataCell>{item.deliveryFee}</CTableDataCell>
                <CTableDataCell>{item.slot}</CTableDataCell>
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>{(item.total ?? 0).toFixed(2)}</CTableDataCell>
                <CTableDataCell>{item.markup}</CTableDataCell>
                <CTableDataCell>
                  <Link>
                    <CIcon icon={cilInfo} size="xl" onClick={() => handleToggle(item.id)} />
                  </Link>
                </CTableDataCell>
                {/* <CTableDataCell>
              <Link to={`/customers/items`}>
                 <CIcon icon={cilList} size='xl'/>
                </Link>
              </CTableDataCell> */}
              </CTableRow>
            ))
            )}
          </CTableBody>
        </CTable>
      )}

      {/* <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination> */}

      <CModal visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Customer Order Information</CModalTitle>
        </CModalHeader>
        <CModalBody
          style={{
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {loadingModal ? (
          <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>
          ) : (
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Measure</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Market</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Status</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orderDataDetails.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="6" style={{ textAlign: 'center',backgroundColor:"white" }}>
                      <h6 style={{ marginTop: "1%" }}>No Data</h6>
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                orderDataDetails?.map((items, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      <CCardImage
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                        src={`https://api.zeuler.com/image/` + items.photo}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{items.name}</CTableDataCell>
                    <CTableDataCell>{(items.price ?? 0).toFixed(2)}</CTableDataCell>
                    <CTableDataCell>{items.qty}</CTableDataCell>
                    {/* <CTableDataCell>{items.measure}</CTableDataCell> */}
                    <CTableDataCell>
                      {items.chain} - {items.market}
                    </CTableDataCell>
                    {/* <CTableDataCell><CBadge style={{ width:80 }} color="info">{items.status}</CBadge></CTableDataCell> */}
                  </CTableRow>
                ))
                )}
              </CTableBody>
            </CTable>
          )}
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton> */}
        </CModalFooter>
      </CModal>

    </CContainer>
  )
}

export default GroceryOrderLits











// import React from 'react'
// import {
//     CContainer,
//     CTable,
//     CTableHead,
//     CTableRow,
//     CTableHeaderCell,
//     CTableBody,
//     CTableDataCell,
//     CButton,
//     CNavbar,
//     CForm,
//     CPagination,
//     CPaginationItem,CCardImage,
//     CFormInput
//   } from '@coreui/react'

// const ItemList = ()=>{

//     return(

//         <CContainer>
//          <CNavbar className="bg-body-tertiary">
//       <CFormInput  
//          type ="text" 
//          placeholder="Search by customer email" 

//          style={{ width : 450, marginLeft: '0%' }}
//          onChange={(e) => {}}
       
//          />
//       </CNavbar >
  
//         <CTable>
//           <CTableHead>
//             <CTableRow>
//               <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
//               <CTableHeaderCell scope="col">Name</CTableHeaderCell>
//               <CTableHeaderCell scope="col">Price</CTableHeaderCell>
//               <CTableHeaderCell scope="col">SubTotal</CTableHeaderCell>
//               <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
//               <CTableHeaderCell scope="col">Saving</CTableHeaderCell>
//               <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
//               <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
//               <CTableHeaderCell scope="col">Market</CTableHeaderCell>
//             </CTableRow>
//           </CTableHead>
//           <CTableBody>
//             {/* {ProductData.map((item, index) => (
//               <CTableRow key={index}>
//                 <CTableHeaderCell scope="row"><CCardImage style={{ width :'50px', height:'50px' }} src={`https://api.zeuler.com/image/`+item.photo} /></CTableHeaderCell>
//                 <CTableDataCell>{item.name}</CTableDataCell>
//                 <CTableDataCell>{item.price}</CTableDataCell>
//                 <CTableDataCell>{item.subTotal}</CTableDataCell>
//                 <CTableDataCell>{item.measurement}</CTableDataCell>
//                 <CTableDataCell>{item.saving}</CTableDataCell>
//                 <CTableDataCell>{item.quantity}</CTableDataCell>
//                 <CTableDataCell>{item.chain}</CTableDataCell>
//                 <CTableDataCell>{item.market}</CTableDataCell>
//               </CTableRow>
//             ))} */}
//           </CTableBody>
//         </CTable>
  
//         <CPagination aria-label="Page navigation example">
//           <CPaginationItem>Previous</CPaginationItem>
//           <CPaginationItem>1</CPaginationItem>
//           <CPaginationItem>2</CPaginationItem>
//           <CPaginationItem>3</CPaginationItem>
//           <CPaginationItem>Next</CPaginationItem>
//         </CPagination>
//       </CContainer>
//     )
    
// }

// export default ItemList