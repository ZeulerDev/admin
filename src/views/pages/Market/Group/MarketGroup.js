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
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CModalFooter,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../../context/AppContext'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilInfo, cilLocationPin, cilPencil, cilTrash } from '@coreui/icons'
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
  const [visible, setVisible] = useState(false)
  const [marketGroupId, setMarketGroupId] = useState('')
  const [visibleName, setVisibleName] = useState(false)
  const [id,setId] = useState('')
  const [name , setName] = useState('')
  const [nameDisplay , setNameDisplay] = useState('')

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

  const handleToggle = (id) => {
    setVisible(!visible)
    setMarketGroupId(id)
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
          setVisible(false)
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

  const handleToggleName = (id, name)=>{
    setVisibleName(true)
    setId(id)
    setNameDisplay(name)
    console.log(name)
  }

  const updateName = () => {
    console.log('name',name)
    if(name == ''){
      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Alert',
          message : 'Please Enter Name',
          color : 'danger'
        }
      })
    }else{
      handleUpdate(id)
    }
  }

  const handleUpdate = (id) => {

    if(id){

      let formData = {
        name: name,
      }
      
    console.log(formData, id)

    if(user && token){
      axios
        .put(BASE_URL+'marketgroup/update/'+id, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
              const updatedEntity = res.data
              const found = marketGroupData.find((f) => f.id === updatedEntity.id)
              if(found){
                found.name = updatedEntity.name
              }

              setMarketGroupData([...marketGroupData])

            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Market Group Update',
                message : 'Market group name updated successfully',
                color : 'success'
              }
            })
            setId('')
            setName('')
            // loadData(0, true)
            setVisibleName(false)
            setNameDisplay('')
          } else if (res.status === 204) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Pick up area update  error',
                message : res.data.message,
                color : 'danger'
              }
            })
          }else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Pick up area update  error',
                message : res.data.message,
                color : 'danger'
              }
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })

    }
   }else{
    alert('Please Check the Fields!')
   }
    
  }

  return (
    <CContainer>
          <Link to={`/marketgroups/marketmap`}>
            <CButton style={{ marginLeft: '0%',width:'17%',backgroundColor: '#ff4d4d', color:'white' }}>
              Add Market
            </CButton>
          </Link>
          <Link to={`/marketgroups/createmarketgroup`}>
            <CButton  style={{ marginLeft: '2%',width:'17%',backgroundColor: '#ff4d4d', color:'white' }}>
              Create Market Group
            </CButton>
          </Link>
          <CBadge style={{ marginLeft: '39%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{marginLeft: '2%', width: '17%', marginRight: '5px',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}}>{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      <CNavbar style={{marginTop:'1%'}} className="bg-body-tertiary">

      </CNavbar>

     {loading ? <CSpinner/> :  <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Remove</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {marketGroupData.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell >{index + 1}</CTableDataCell>
              <CTableDataCell>
                  <span>{item.name}</span>
  <Link to={``}>
    <CIcon
      style={{ marginLeft: 20, float: 'right' }}
      icon={cilPencil}
      size="sm"
      onClick={() => handleToggleName(item._id, item.name)}
    />
  </Link>
</CTableDataCell>
              {/* <CTableDataCell >{item.name}<Link to={``}><CIcon style={{marginLeft:"10%"}} icon={cilPencil} size="sm" onClick={() => handleToggleName(item._id, item.name)}  /></Link></CTableDataCell> */}
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>
                <Link to={`/marketgroups/marketdistance/${item._id}`}>
                <CButton size='sm' style={{backgroundColor: '#ff4d4d',marginLeft: '5px', color:'white'}}>
                   view
                </CButton>
                </Link>
              </CTableDataCell>
              <CTableDataCell>
              <CButton size='sm' style={{backgroundColor: '#ff4d4d'}} variant="outline" onClick={() => handleToggle(item._id)}>
              <CIcon icon={cilTrash} size='lg' style={{color:'white'}}/>
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

      <CModal alignment="center" visible={visibleName} scrollable size='sm' onClose={() => setVisibleName(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Change Name</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Enter New Name</a><br></br>
        <CFormInput
         type="text" 
         placeholder={nameDisplay}
         value={name}
         onChange={(e) => setName(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          
          <CButton style={{backgroundColor:'#ff4d4d', color:'white'}} onClick={() => updateName()}>Save changes</CButton>
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
        <CModalHeader closeButton={false}>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Are you sure you want to delete this market group?</a><br></br><br></br>
        <div style={{display : "flex", justifyContent : 'center'}}>
        <CButton onClick={() => deleteMarketGroup(marketGroupId)} style={{  backgroundColor:'#ff4d4d', color:'white',marginRight: '10px' }} >Yes</CButton>
        <CButton onClick={() => setVisible(false)} style={{  backgroundColor:'#ff4d4d', color:'white',marginLeft: '10px' }} >No</CButton>
        </div>
     
        </CModalBody>
      </CModal>
    </CContainer>
  )
}

export default MarketGroup
