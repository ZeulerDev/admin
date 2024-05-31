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
  CCol,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilAirplay, cilLeaf, cilPenAlt, cilPencil } from '@coreui/icons'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import '../../../scss/styles.scss'


const Pickers = () => {

  const [visible, setVisible] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [pickerData, setPickerData] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramCity, setParamCityData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [paramChainId, setParamChainData] = useState('')
  const [paramCode, setParamCodeData] = useState('')
  const [isActivate, setActivate] = useState(false)
  const [pickerId, setPickerId] = useState('')
  const[alert, setAlert] = useState(false)

  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [selectedChain, setSelectedChian] = useState('All Chains')

  const [mGroupData, setMGroupData] = useState([])
  const [chainData, setChainData] = useState([])

  const [visiblePicker, setVisiblePicker] = useState(false)
  const [pickerEditObj, setPickerEditObj] =useState([])
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

  const loadMakerGroup = () =>{
    if (token) {
      axios
        .get('http://localhost:8003/market/groups/dropdown/fetch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setMGroupData(res.data)
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Market Group Loading error',
                message : res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  const loadChain = ()=>{
    if (token) {
      axios
        .get('http://localhost:8003/assistant/market/chains/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setChainData(res.data)
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Chain Loading error',
                message : res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  useEffect(() => {
    loadPickersData()
  },[paramCity, paramGroup, paramChainId,paramCode,alert])
  
  const loadPickersData = () => {
    if(user && token){
      setLoading(true)

      let url = `http://localhost:8003/assistant/shoppers/:skip?city=${paramCity}&group=${paramGroup}&chain=${paramChainId}`

      if (paramCode) {
        url += `&code=${paramCode}`
      }

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setPickerData(res.data)  
            setLoading(false)
            setAlert(false)
          } else if (res.status === 500) {
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

  const handleToggle = (pickerId,isActive) => {
    setVisible(!visible)
    setActivate(isActive)
    setPickerId(pickerId)
  }

  const handleActivate = () => {


    const data = {
      status: isActivate
    }

    console.log(pickerId, data)

    if(user && token){
       axios
        .patch('http://localhost:8003/assistant/shopper/status/'+pickerId,data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("updated")
            setVisible(false)
            setActivate('')
            setPickerId('')
            setAlert(true)
            
          } else if (res.status === 203) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Picker status update error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 204) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Picker status update error',
                message : res.data.message
              }
            })
             
          }else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Picker status update error',
                message : res.data.message
              }
            })
             
          }
        }).catch((error) => {
          console.error( error)
          
        })
    }
  }

  const handleTogglePicker = (pickerObj) =>{
    setVisiblePicker(!visiblePicker)
    setPickerEditObj(pickerObj)
    setName(pickerObj.name)
    setSurname(pickerObj.surname)
    setEmail(pickerObj.email)
    setPhone(pickerObj.contact)
    setIban(pickerObj.iban)
    setCityEdit(pickerObj.city)
    setAddress(pickerObj.address)
    setVat(pickerObj.vat)
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

      const id = pickerEditObj.id

      if(user,token){
          if(user && token){
              axios
                .patch('http://localhost:8003/assistant/shopper/update/'+id, formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    console.log(res.data)
                    setVisiblePicker(false)
                    const updatedEntity = res.data
                    const list = pickerData.map((item) => {
                      if (item.id === updatedEntity.id) {
                        console.log('update obj')
                        return updatedEntity
                      } else {
                        return item
                      }
                    })
                    setPickerData([...list])

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
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Picker update error',
                        message : res.data.message,
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
        placeholder="Search by Picker ID"
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

    {loading ? <CSpinner/> : <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Id</CTableHeaderCell>
          <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
          <CTableHeaderCell scope="col">Country</CTableHeaderCell>
          <CTableHeaderCell scope="col">City</CTableHeaderCell>
          <CTableHeaderCell scope="col">Language</CTableHeaderCell>
          <CTableHeaderCell scope="col">Market</CTableHeaderCell>
          <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
       { pickerData.map((item, index) =>(
      <CTableRow key={index}>
              <CTableDataCell>{item.code}</CTableDataCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.surname}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>{item.contact}</CTableDataCell>
              <CTableDataCell>{item.country === "it" || item.country === 'Italy' ? 'Italy' : item.country }</CTableDataCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>{item.language === 'en' ? 'English' : item.language === 'it' ? 'Italy' : item.language === 'es' ? 'Spanish' : item.language}</CTableDataCell>
              <CTableDataCell>{item.market?.chain?.name} - {item.market.address}</CTableDataCell>
              <CTableDataCell>
                <Link>
                <CIcon icon={cilPencil} size='xl'  onClick={() => handleTogglePicker(item)}/>
                </Link>
              </CTableDataCell>
              <CTableDataCell>
                {item.activate ?  <CButton size='sm' onClick={() => handleToggle(item.id,false)} style={{ backgroundColor:'#ff4d4d',width: 90 }} >Deactivate</CButton> :  <CButton size='sm' onClick={() => handleToggle(item.id,true)} style={{ backgroundColor:'#ff4d4d',width: 90 }} >Activate</CButton>}
                
              </CTableDataCell>
            </CTableRow>
))}
      </CTableBody>
    </CTable>
    }


      <CModal alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Are you sure you want to {isActivate ? 'activate' : 'deactivate'} this user?</a><br></br>
        <CButton onClick={() => handleActivate()}  style={{ display : "flex", justifyContent : 'center' }} color="primary">Yes</CButton>
          
        </CModalBody>
      </CModal>

      <CModal visible={visiblePicker} scrollable size="lg" onClose={() => setVisiblePicker(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Picker Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <div className="row g-3" >
          <CCol md={6}>
            <CFormInput
              id="name"
              label="Firt Name"
              defaultValue={pickerEditObj.name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="surname"
              label="LastName"
              defaultValue={pickerEditObj.surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="address"
              label="Address"
              defaultValue={pickerEditObj.address}
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
              defaultValue={pickerEditObj.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="phone"
              label="Contact Number"
              defaultValue={pickerEditObj.contact}
              onChange={(e) => setPhone(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              id="iban"
              label="IBAN"
              defaultValue={pickerEditObj.iban}
              onChange={(e) => setIban(e.target.value)}
            />
          </CCol>
          {/* <CCol md={6}>
            <CFormInput
              id="employeeid"
              label="Employee Id"
              defaultValue={pickerEditObj.employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </CCol> */}
          <CCol md={6}>
            <CFormInput
              id="vat"
              label="Vat"
              defaultValue={pickerEditObj.vat}
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
            <option>{pickerEditObj.city}</option>
            <option >Milano</option>
            <option>Napoli</option>
          </CFormSelect>
        </CCol>
        {/* <CCol md={6}>
          <CFormSelect
            id="gender"
            label="Gender"
            value={pickerEditObj.gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>{pickerEditObj.city}</option>
            <option >Male</option>
            <option>Female</option>
          </CFormSelect>
        </CCol> */}
  
        <CCol xs={12}>
            <CButton color="warning" type="submit" style={{ marginBottom:'3%', width:'200px' }} onClick={()=>handleSubmit()}>
              Update Picker
            </CButton>
          </CCol>
        </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisiblePicker(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

    
  </CContainer>
  )
}

export default Pickers
