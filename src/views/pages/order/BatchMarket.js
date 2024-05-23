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

const BatchMarkets = () => {
 
  const [{ user, token }, dispatch] = useAppContext()
  const navigate = useNavigate()
  const [batchMarketsData, setBatchMarketsData] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    if (user && token) {
      loadData(id)
    }
  }, [user, token])

  const loadData = (id) => {
    setLoading(true)
    axios
      .get('http://localhost:8003/assistant/batch/markets/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          setBatchMarketsData(res.data)
          setLoading(false)
        } else if (res.status === 203) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Batch markets loading error',
                message: res.data.message,
              },
            })
          }else if (res.status === 204) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Batch markets loading error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Batch markets loading error',
              message: res.data.message,
            },
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
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
              <CTableHeaderCell scope="col">Chain Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Orders</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {batchMarketsData.markets?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{item.chain}</CTableDataCell>
                <CTableDataCell>{item.address}</CTableDataCell>
                <CTableDataCell>
                <Link to={`/order/batches/market/orders/${id}/${item.id}`}>
                    <CIcon icon={cilList} size="xl"/>
                </Link>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}

      

     
    </CContainer>
  )
}

export default BatchMarkets
