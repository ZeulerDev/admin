import React from 'react'
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
    CPaginationItem,CCardImage
  } from '@coreui/react'

const ItemList = ()=>{

    return(

        <CContainer>
        <CNavbar className="bg-body-tertiary">
          <CForm>
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
        </CNavbar>
  
        <CTable>
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
            {/* {ProductData.map((item, index) => (
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
            ))} */}
          </CTableBody>
        </CTable>
  
        <CPagination aria-label="Page navigation example">
          <CPaginationItem>Previous</CPaginationItem>
          <CPaginationItem>1</CPaginationItem>
          <CPaginationItem>2</CPaginationItem>
          <CPaginationItem>3</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination>
      </CContainer>
    )
    
}

export default ItemList