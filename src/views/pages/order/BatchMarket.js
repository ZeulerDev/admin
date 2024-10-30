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
import { BASE_URL } from '../../../context/config'

const BatchMarkets = () => {
 
  const [{ user, token }, dispatch] = useAppContext()
  const navigate = useNavigate()
  const [batchMarketsData, setBatchMarketsData] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

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
      loadData(id,timer)
    }

    return () => {
      clearTimeout(timer);
    };
  }, [user, token])

  const loadData = (id,timer) => {
    setLoading(true)
    axios
      .get(BASE_URL+'assistant/batch/markets/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data)
          setBatchMarketsData(res.data)
          setLoading(false)
          clearTimeout(timer);
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
        {/* <CForm>
          <CButton type="submit" color="success" variant="outline">
            Search
          </CButton>
        </CForm> */}
      </CNavbar>

      {loading ? (
        <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div>
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Chain Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Orders</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {batchMarketsData.length === 0 ? (
                        <CTableRow>
                          <CTableDataCell colSpan="4" style={{ textAlign: 'center',backgroundColor:"white" }}>
                            <h6 style={{ marginTop: "1%" }}>No Data</h6>
                          </CTableDataCell>
                        </CTableRow>
                      ) :  (
            batchMarketsData.markets?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index+1}</CTableDataCell>
                <CTableDataCell>{item.chain}</CTableDataCell>
                <CTableDataCell>{item.address}</CTableDataCell>
                <CTableDataCell>
                <Link to={`/order/batches/market/orders/${id}/${item.id}`}>
                    <CIcon icon={cilList} size="xl"/>
                </Link>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
          </CTableBody>
        </CTable>
      )}

      

     
    </CContainer>
  )
}

export default BatchMarkets
