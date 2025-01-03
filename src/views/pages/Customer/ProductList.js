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
  CForm,
  CPagination,
  CPaginationItem,CCardImage,
  CSpinner
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { BASE_URL } from '../../../context/config'

const ProductList = () => {
  const { id } = useParams()

  const [{ token }, dispatch] = useAppContext()
  const [loading, setLoading] = useState(false)
  const [ProductData, setProductData] = useState([])

  useEffect(() => {
    if (token) {
      setLoading(true)
      axios
        .get(BASE_URL+'assistant/products/list/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setProductData(res.data.products)
            setLoading(false)
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Order product loading error error',
                message : res.data.message
              }
            })
          }
        }).catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [])

  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
        {/* <CForm>
          <CButton type="submit" color="success" variant="outline">
            Search
          </CButton>
        </CForm> */}
      </CNavbar>

      { loading ? <div className="d-flex justify-content-center"><CSpinner style={{marginTop:"15%"}}/></div> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">SubTotal</CTableHeaderCell>
            <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
            <CTableHeaderCell scope="col">Saving</CTableHeaderCell>
            <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
            <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
            <CTableHeaderCell scope="col">Market</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {
            ProductData.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan="9" style={{ textAlign: 'center',backgroundColor:"white" }}>
                  <h6 style={{ marginTop: "1%" }}>No Data</h6>
                </CTableDataCell>
              </CTableRow>
            ) : (
          ProductData.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row"><CCardImage style={{ width :'50px', height:'50px' }} src={`https://api.zeuler.com/image/`+item.photo} /></CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.price}</CTableDataCell>
              <CTableDataCell>{item.subTotal}</CTableDataCell>
              <CTableDataCell>{item.measurement}</CTableDataCell>
              <CTableDataCell>{item.saving}</CTableDataCell>
              <CTableDataCell>{item.quantity}</CTableDataCell>
              <CTableDataCell>{item.chain}</CTableDataCell>
              <CTableDataCell>{item.market}</CTableDataCell>
            </CTableRow>
          ))
          )}
        </CTableBody>
      </CTable>

      }

      {/* <CPagination aria-label="Page navigation example">
        <CPaginationItem>Previous</CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem>Next</CPaginationItem>
      </CPagination> */}
    </CContainer>
  )
}

export default ProductList
