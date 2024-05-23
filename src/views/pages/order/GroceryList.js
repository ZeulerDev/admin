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
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'

const GroceryList = () => {
  const [visible, setVisible] = useState(false)
  const [visibleCustomer, setVisibleCustomer] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [groceryListData, setGroceryListData] = useState([])
  const [orderCustomerDetails, setOrderCustomerDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [orderDataDetails, setOrderDataDetails] = useState([])
  const [customerData, setCustomerData] = useState([])
  const [itemsData, setItemsData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(0)

  useEffect(() => {
    if (user && token) {
      loadData(0, true)
    }
  }, [user, token])

  const loadData = (count, moveNext) => {
    setLoading(true)
    axios
      .get('http://localhost:8003/assistant/grocery/list/' + count, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setGroceryListData(res.data)
          setLoading(false)
          if (moveNext) {
            const nextCount = count + res.data.length
            setItemsPerPage(nextCount)
          } else {
            const nextCount = count - res.data.length
            if (count < 0) {
              setItemsPerPage(0)
            } else {
              setItemsPerPage(nextCount)
            }
          }
        } else if (res.status === 204) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Grocery List loading error',
              message: res.data.message,
            },
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Grocery List loading error',
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
    loadData(itemsPerPage, true)
  }

  const previousPage = () => {
    loadData(itemsPerPage, false)
  }

  const handleToggle = (items) => {
    setVisible(!visible)
    setItemsData(items)
  }

  const handleCustomerToggle = (customer) => {
    setVisibleCustomer(!loadingModal)
    setCustomerData(customer)
  }

  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
        <CForm>
          {/* <CButton type="submit" color="success" variant="outline">
            Search
          </CButton> */}
        </CForm>
      </CNavbar>

      {loading ? (
        <CSpinner />
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Items</CTableHeaderCell>
              <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {groceryListData.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.data}</CTableDataCell>
                <CTableDataCell>{item.type}</CTableDataCell>
                <CTableDataCell>{item.address}</CTableDataCell>
                <CTableDataCell>
                    {
                        item.items === null ? 
                        (
                            <CIcon icon={cilInfo} size="xl"/>
                        )
                        :
                        (
                        <Link>
                         <CIcon icon={cilInfo} size="xl" onClick={() => handleToggle(item.items)} />
                        </Link>
                        )
                    }
                 
                </CTableDataCell>
                <CTableDataCell>
                    {item.customer === null ?
                    (<CIcon icon={cilList} size="xl" />)
                    :
                    (
                    <Link>
                    <CIcon icon={cilList} size="xl" onClick={() => handleCustomerToggle(item.customer)} />
                  </Link>
                    )
                    }

                  
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}

      <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 50 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem onClick={nextPage}>Next</CPaginationItem>
      </CPagination>

      <CModal visible={visible} scrollable size="xl" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Customer Information</CModalTitle>
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
            <CSpinner />
          ) : (
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Saving</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Measure</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Market</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {itemsData.map((items, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      <CCardImage
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                        src={`https://api.zeuler.com/image/` + items.photo}
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{items.name}</CTableDataCell>
                    <CTableDataCell>{items.price}</CTableDataCell>
                    <CTableDataCell>{items.saving ? items.saving.toFixed(2) : null}</CTableDataCell>
                    <CTableDataCell>{items.qty}</CTableDataCell>
                    <CTableDataCell>{items.um}</CTableDataCell>
                    <CTableDataCell>
                      {items.market?.chain?.name} - {items.market?.address}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={visibleCustomer}
        scrollable
        size="lg"
        onClose={() => setVisibleCustomer(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Customer Information</CModalTitle>
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
            <CSpinner />
          ) : (
            <div>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Name
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={customerData.name}
                    readOnly
                    plainText
                  />
                </CCol>
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={customerData.email}
                    readOnly
                    plainText
                  />
                </CCol>
               <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Contact
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    defaultValue={customerData.contact}
                    readOnly
                    plainText
                  />
                </CCol>
              </CRow>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleCustomer(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default GroceryList
