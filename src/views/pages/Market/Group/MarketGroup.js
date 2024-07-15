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
  CPaginationItem,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavGroup,
  CSpinner,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../../context/AppContext'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilInfo, cilLocationPin } from '@coreui/icons'
import { SET_ALERT } from '../../../../context/context_reducer'
import { BASE_URL } from '../../../../context/config'

const MarketGroup = () => {
  const [{ user, token }, dispatch] = useAppContext()
  const [paramCity, setParamCityData] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [marketGroupData, setMarketGroupData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [isDisable, setIsDisable] = useState(true)
  const [loading, setLoading] = useState(false)

  const city = (city) => {
    if (city === 'all') {
      setParamCityData('')
      setSelectedCity('All Cities')
    } else {
      setParamCityData(city)
      setSelectedCity(city)
    }
  }

  useEffect(() => {
    if (user && token) {
      loadData(0, true)
    }
  }, [user, paramCity])

  const loadData = (count, moveNext) => {
    setLoading(true)
    axios
      .get(BASE_URL+`market/groups/fetch/${count}?city=${paramCity}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.status)
        if (res.status === 200) {
          setMarketGroupData(res.data)
          setLoading(false)
          if (res.data.length < 20) {
            setIsDisable(true)
            console.log('ok')
          } else if (res.data.length > 19) {
            setIsDisable(false)
          }
        } else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Makrket Group loading error',
              message : res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error:', err)
      })
  }

  const nextPage = () => {
    const c = itemsPerPage + 20
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    const c = itemsPerPage - 20
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const deleteMarketGroup =(id)=>{
    console.log(id)
    axios
      .delete(
        BASE_URL+`marketgroup/`+id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Group Delete',
              message : 'Market Group Delete Success',
              color : 'success'
            }
          })
          loadData(0, true)
         console.log('Remove Market Group')

        }  else if (res.status === 203) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Group Delete',
              message : res.data.message,
              color : 'warning'
            }
          })
        }else if (res.status === 404) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Group Delete',
              message : res.data.message,
              color : 'warning'
            }
          })
        } else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Group Delete',
              message : res.data.message,
              color : 'warning'
            }
          })
        }
      }).catch((err) => {
        console.error('Error:', err)
      })

  }

  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
        <CForm>
          <Link to={`/marketgroups/marketmap`}>
            <CButton type="submit" color="success" variant="outline"  style={{ marginLeft: '5px' }}>
              Add Market
            </CButton>
          </Link>
          <Link to={`/marketgroups/createmarketgroup`}>
            <CButton type="submit" color="warning" variant="outline" style={{ marginLeft: '5px' }}>
              Create Market Group
            </CButton>
          </Link>
        </CForm>
        <CDropdown style={{ marginLeft: '40%', width: '10%', marginRight: '5px',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle>{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CNavbar>

     {loading ? <CSpinner/> :  <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Remove</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {marketGroupData.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{item.name}</CTableHeaderCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>
                <Link to={`/marketgroups/marketdistance/${item._id}`}>
                <CButton size='sm' color="light" variant="outline" style={{ marginLeft: '5px' }}>
                   view
                </CButton>
                </Link>
              </CTableDataCell>
              <CTableDataCell>
              <CButton size='sm' style={{backgroundColor: '#ff4d4d'}} variant="outline" onClick={() => deleteMarketGroup(item._id)}>
                   Remove
                </CButton>
           
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

     }

      <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>
          Next
        </CPaginationItem>
      </CPagination>
    </CContainer>
  )
}

export default MarketGroup
