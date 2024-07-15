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
  CSpinner,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CBadge,
  CCol,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilAirplay, cilLeaf, cilPencil } from '@coreui/icons'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import '../../../scss/styles.scss'
import { BASE_URL } from '../../../context/config'

const Drivers = () => {
  const [visible, setVisible] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [driverData, setDriverData] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramCity, setParamCityData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [paramChainId, setParamChainData] = useState('')
  const [paramCode, setParamCodeData] = useState('')
  const [isActivate, setActivate] = useState(false)
  const [driverId, setDriverId] = useState('')
  const navigate = useNavigate()
  const[alert, setAlert] = useState(false)

  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [selectedChain, setSelectedChian] = useState('All Chains')

  const [mGroupData, setMGroupData] = useState([])
  const [chainData, setChainData] = useState([])

  const [visibleRider, setVisibleRider] = useState(false)
  const [riderEditObj, setRiderEditObj] =useState([])
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [iban, setIban] = useState()
  const [cityEdit, setCityEdit] = useState()
  const [vat, setVat] = useState()
  const [address, setAddress] = useState()

  useEffect(() => {
    loadMakerGroup()
    loadChain()
  }, [])

  const loadMakerGroup = () => {
    if (token) {
      axios
        .get(BASE_URL+'market/groups/dropdown/fetch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setMGroupData(res.data)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Market Group Loading error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  const loadChain = () => {
    if (token) {
      axios
        .get(BASE_URL+'assistant/market/chains/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setChainData(res.data)
            setAlert(false)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Chain Loading error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  useEffect(() => {
    loadDriversData()
  }, [paramCity, paramGroup, paramChainId,paramCode, alert])

  const loadDriversData = () => {
    if (user && token) {
      setLoading(true)
      let url = BASE_URL+`assistant/riders/:skip?city=${paramCity}&group=${paramGroup}&chain=${paramChainId}`
    
      if (paramCode) {
        url += `&code=${paramCode}`
      }
      axios
        .get(url,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setDriverData(res.data)
            setLoading(false)
            
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Error',
                message: res.data.message,
                color: 'warning',
              },
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }

  const city = (city) => {
    if (city === 'all') {
      setParamCityData('')
      setSelectedCity('All Cities')
    } else {
      setParamCityData(city)
      setSelectedCity(city)
    }
  }

  const marketGroup = (gId, groupName) => {
    if (gId === 'all') {
      setParamGroupData('')
      setSelectedMarketGroup('All Market Groups')
    } else {
      setParamGroupData(gId)
      setSelectedMarketGroup(groupName)
    }
  }

  const chain = (chainId, chianName) => {
    if (chainId === 'all') {
      setParamChainData('')
      setSelectedChian('All Chains')
    } else {
      setParamChainData(chainId)
      setSelectedChian(chianName)
    }
  }

  const handleToggle = (pickerId, isActive) => {
    setVisible(!visible)
    setActivate(isActive)
    setDriverId(pickerId)
  }

  const handleActivate = () => {
    const data = {
      status: isActivate,
    }
    console.log(isActivate)

    console.log(driverId, data)

    if (user && token) {
      axios
        .patch(BASE_URL+'assistant/rider/status/' + driverId, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('updated', res.data)
            setVisible(false)
            setActivate('')
            setDriverId('')
            const updatedEntity = res.data
            const list = driverData.map((ob) => {
             if(ob.id === updatedEntity.id){
                return updatedEntity
               } else {
              return ob
               }
               })
                 setDriverData([...list])

          } else if (res.status === 203) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Driver status update error',
                message: res.data.message,
              },
            })
          } else if (res.status === 204) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Driver status update error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Driver status update error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const handleTogglePicker = (riderObj) =>{
    setVisibleRider(!visibleRider)
    setRiderEditObj(riderObj)
    setName(riderObj.name)
    setSurname(riderObj.surname)
    setEmail(riderObj.email)
    setPhone(riderObj.contact)
    setIban(riderObj.iban)
    setCityEdit(riderObj.city)
    setAddress(riderObj.address)
    setVat(riderObj.vat)
  }

  const handleSubmit = () => {
    if(name && surname && email && phone && iban && cityEdit && vat && address){

      const formData = {
        name: name,
        surname: surname,
        email: email,
        contact: phone,
        iban: iban,
        city: cityEdit,
        vat:vat,
        address : address
      }

      const id = riderEditObj.id

      if(user,token){
          if(user && token){
              axios
                .patch(BASE_URL+'assistant/rider/update/'+id, formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    setVisibleRider(false)
                    const updatedEntity = res.data
                    const list = driverData.map((item) => {
                      if (item.id === updatedEntity.id) {
                        return updatedEntity
                      } else {
                        return item
                      }
                    })
                    setDriverData([...list])

                  } else if (res.status === 203) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Picker update error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  } else if (res.status === 204) {
                    console.log(res.message)
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Picker update error',
                        message : "Email Already include",
                        color:'warning'
                      }
                    })
                  } else if (res.status === 500) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Picker update error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  }
                })
                .catch((error) => {
                  console.error('Error:', error)
                })
        
            }
      }
    }else{

      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Error!',
          message : 'Picker update error, Please Check the input fields',
          color:'warning'
        }
      })

    }
    
      
  }

  return (
    <CContainer>
       <CNavbar className="bg-body-tertiary picker-navbar">
      <CFormInput
        type="text"
        placeholder="Search by Driver ID"
        className="picker-input"
        value={paramCode}
        onChange={(e) => setParamCodeData(e.target.value)}
      />
      <Link to={`/picker/addpicker`} className="picker-link">
        <CButton type="submit" color="success" variant="outline" className="picker-button">
          Add Picker
        </CButton>
      </Link>
      <CDropdown className="picker-dropdown" style={{ backgroundColor: '#ff4d4d' }}>
        <CDropdownToggle>{selectedCity}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
          <CDropdownItem onClick={() => city('Milan')}>Milan</CDropdownItem>
          <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CDropdown className="picker-dropdown" style={{ backgroundColor: '#ff4d4d' }}>
        <CDropdownToggle>{selectedChain}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
          {chainData.map((item, index) => (
            <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
              {item.name}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
      <CDropdown className="picker-dropdown" style={{ backgroundColor: '#ff4d4d' }}>
        <CDropdownToggle>{selectedMarketGroup}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => marketGroup('all')}>All</CDropdownItem>
          {mGroupData.map((item, index) => (
            <CDropdownItem onClick={() => marketGroup(item._id, item.name)} key={index}>
              {item.name}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
    </CNavbar>
      {/* <CNavbar className="bg-body-tertiary">
      <CFormInput  
         type ="text" 
         placeholder="Search by Rider ID" 
         style={{ width : 200, marginLeft: '2%' }}
         value={paramCode}
         onChange={(e) => setParamCodeData(e.target.value)}
        />
        <Link to={`/driver/adddriver`}>
          <CButton type="submit" color="success" variant="outline" style={{ marginLeft: '5px' }}>
            Add Driver
          </CButton>
        </Link>
        <CDropdown style={{ marginLeft: '3%', width: '10%', backgroundColor: '#ff4d4d' }}>
          <CDropdownToggle>{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milan')}>Milan</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginRight: '0%', width: '15%', backgroundColor: '#ff4d4d' }}>
          <CDropdownToggle>{selectedChain}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
            {chainData.map((item, index) => (
              <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginRight: '1%', width: '30%', backgroundColor: '#ff4d4d' }}>
          <CDropdownToggle>{selectedMarketGroup}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => marketGroup('all')}>All</CDropdownItem>
            {mGroupData.map((item, index) => (
              <CDropdownItem onClick={() => marketGroup(item._id, item.name)} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
      </CNavbar> */}

      {loading ? (
        <CSpinner />
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Country</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Language</CTableHeaderCell>
              <CTableHeaderCell scope="col">Group</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {driverData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.code}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.surname}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell>{item.contact}</CTableDataCell>
                <CTableDataCell>
                  {item.country === 'it' || item.country === 'Italy' ? 'Italy' : item.country}
                </CTableDataCell>
                <CTableDataCell>
                  {item.employeeId ? item.employeeId : <CBadge color="warning">Not Provide</CBadge>}
                </CTableDataCell>
                <CTableDataCell>
                  {item.language === 'en'
                    ? 'English'
                    : item.language === 'it'
                      ? 'Italy'
                      : item.language === 'es'
                        ? 'Spanish'
                        : item.language}
                </CTableDataCell>
                <CTableDataCell>
                  {item.groups.map((mar, index) => (
                    <div key={index}>{mar.name}</div>
                  ))}
                </CTableDataCell>
                <CTableDataCell>
                <Link>
                <CIcon icon={cilPencil} size='xl'  onClick={() => handleTogglePicker(item)}/>
                </Link>
              </CTableDataCell>
                <CTableDataCell>
                  {item.activate ? (
                    <CButton
                      size="sm"
                      onClick={() => handleToggle(item.id, false)}
                      style={{ backgroundColor: '#ff4d4d', width: 90 }}
                    >
                      Deactivate
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      onClick={() => handleToggle(item.id, true)}
                      style={{ backgroundColor: '#ff4d4d', width: 90 }}
                    >
                      Activate
                    </CButton>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}

      <CModal alignment="center" visible={visible} scrollable size="sm" onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <a>Are you sure you want to {isActivate ? 'activate' : 'deactivate'} this user?</a>
          <br></br>
          <CButton
            onClick={() => handleActivate()}
            style={{ display: 'flex', justifyContent: 'center' }}
            color="primary"
          >
            Yes
          </CButton>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={visibleRider} scrollable size="lg" onClose={() => setVisibleRider(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Driver Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <div className="row g-3" >
          <CCol md={6}>
            <CFormInput
              id="name"
              label="Firt Name"
              defaultValue={riderEditObj.name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="surname"
              label="LastName"
              defaultValue={riderEditObj.surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="address"
              label="Address"
              defaultValue={riderEditObj.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </CCol>
          {/* <CCol md={6}>
            <CFormInput
              id="password"
              label="Password"
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CCol> */}
          <CCol md={6}>
            <CFormInput
              id="email"
              label="Email"
              defaultValue={riderEditObj.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="phone"
              label="Contact Number"
              defaultValue={riderEditObj.contact}
              onChange={(e) => setPhone(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="iban"
              label="IBAN"
              defaultValue={riderEditObj.iban}
              onChange={(e) => setIban(e.target.value)}
            />
          </CCol>
          {/* <CCol md={6}>
            <CFormInput
              id="employeeid"
              label="Employee Id"
              defaultValue={riderEditObj.employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </CCol> */}
          <CCol md={6}>
            <CFormInput
              id="vat"
              label="Vat"
              defaultValue={riderEditObj.vat}
              onChange={(e) => setVat(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
          <CFormSelect
            id="inputState"
            label="City"
            value={cityEdit}
            onChange={(e) => setCityEdit(e.target.value)}
          >
            <option>{riderEditObj.city}</option>
            <option >Milano</option>
            <option>Napoli</option>
          </CFormSelect>
        </CCol>
        {/* <CCol md={6}>
          <CFormSelect
            id="gender"
            label="Gender"
            value={riderEditObj.gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>{riderEditObj.city}</option>
            <option >Male</option>
            <option>Female</option>
          </CFormSelect>
        </CCol> */}
  
        <CCol xs={12}>
            <CButton color="warning" type="submit" style={{ marginBottom:'3%', width:'200px' }} onClick={()=>handleSubmit()}>
              Update Rider
            </CButton>
          </CCol>
        </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleRider(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

    </CContainer>
  )
}

export default Drivers
