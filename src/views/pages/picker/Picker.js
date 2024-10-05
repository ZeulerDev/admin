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
  CBadge,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilAirplay, cilLeaf, cilPenAlt, cilPencil, cilTrash } from '@coreui/icons'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'
import '../../../scss/styles.scss'
import { BASE_URL } from '../../../context/config'


const Pickers = () => {

  const [visible, setVisible] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [pickerData, setPickerData] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramCity, setParamCityData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [paramChainId, setParamChainData] = useState('')
  const [paramCode, setParamCodeData] = useState('')
  const [debouncedParamCode, setDebouncedParamCodeData] = useState(paramCode)
  const [isActivate, setActivate] = useState(false)
  const [pickerId, setPickerId] = useState('')
  const [alert, setAlert] = useState(false)

  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [selectedChain, setSelectedChian] = useState('All Chains')

  const [mGroupData, setMGroupData] = useState([])
  const [chainData, setChainData] = useState([])

  const [visiblePicker, setVisiblePicker] = useState(false)
  const [pickerEditObj, setPickerEditObj] = useState([])
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [iban, setIban] = useState()
  const [cityEdit, setCityEdit] = useState()
  const [vat, setVat] = useState()
  const [address, setAddress] = useState()
  const [pId, setPId] = useState()

  const [passCode, setPassCode] = useState('')
  const [passCodeReEnter, setPassCodeReEnter] = useState('')
  const [visiblePasswordModal, setVisiblePasswordModal] = useState(false)

  useEffect(() => {
    loadMakerGroup()
    loadChain()
  }, [])

  const loadMakerGroup = () => {
    if (token) {
      axios
        .get(BASE_URL + 'market/groups/dropdown/fetch', {
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
                message: res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  const loadChain = () => {
    if (token) {
      axios
        .get(BASE_URL + 'assistant/market/chains/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setChainData(res.data)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Chain Loading error',
                message: res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

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
    loadPickersData(timer)
    return () => {
      clearTimeout(timer);
    };

  }, [paramCity, paramGroup, paramChainId, debouncedParamCode, alert])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (paramCode.length >= 3) {
        setDebouncedParamCodeData(paramCode);
    }else if(paramCode.length === 0){
      setDebouncedParamCodeData(paramCode)
    }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [paramCode]);

  const loadPickersData = (timer) => {
    if (user && token) {
      setLoading(true)

      let url = BASE_URL + `assistant/shoppers/0?city=${paramCity}&group=${paramGroup}&chain=${paramChainId}&code=${paramCode}`

      // if (paramCode) {
      //   url += ``
      // }
 
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
            clearTimeout(timer)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Error',
                message: res.data.message,
                color: 'warning'
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

  const handleToggle = (pickerId, isActive) => {
    setVisible(!visible)
    setActivate(isActive)
    setPickerId(pickerId)
  }
  const handleTogglePassword = () => {
    setVisiblePicker(false)
    setVisiblePasswordModal(true)

  }

  const handleActivate = () => {


    const data = {
      status: isActivate
    }

    console.log(pickerId, data)

    if (user && token) {
      axios
        .patch(BASE_URL + 'assistant/shopper/status/' + pickerId, data, { 
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
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker status update',
                message: "Picker status updated successfully",
                color: 'success'
              }
            })

          } else if (res.status === 203) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker status update error',
                message: res.data.message
              }
            })

          } else if (res.status === 204) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker status update error',
                message: res.data.message
              }
            })

          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker status update error',
                message: res.data.message
              }
            })

          }
        }).catch((error) => {
          console.error(error)

        })
    }
  }

  const handleTogglePicker = (pickerObj) => {
    console.log(pickerObj)
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
    if (name && surname && email && phone && iban && cityEdit && address) {

      const formData = {
        name: name,
        surname: surname,
        email: email,
        contact: phone,
        iban: iban,
        city: cityEdit,
        vat: vat,
        address: address,
      }

      const id = pickerEditObj.id

      if (user, token) {
        if (user && token) {
          axios
            .patch(BASE_URL + 'assistant/shopper/update/' + id, formData, {
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
                loadPickersData()
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Picker update',
                    message: 'Picker updated successfully',
                    color: 'success'
                  }
                })
              } else if (res.status === 203) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Picker update error',
                    message: 'Email already exists',
                    color: 'warning'
                  }
                })
              } else if (res.status === 204) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Picker update error',
                    message: res.data.message,
                    color: 'warning'
                  }
                })
              } else if (res.status === 404) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Picker update error',
                    message: 'Missing required fields',
                    color: 'warning'
                  }
                })
              } else if (res.status === 500) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Picker update error',
                    message: res.data.message,
                    color: 'warning'
                  }
                })
              }
            })
            .catch((error) => {
              console.error('Error:', error)
            })

        }
      }
    } else {

      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Error!',
          message: 'Picker update error, Please Check the input fields',
          color: 'warning'
        }
      })

    }


  }
  const handleToggleDelete = (id) => {
    setVisibleDelete(!visibleDelete)
    setPId(id)
  }


  const deletePicker = (id) => {
    axios
      .delete(
        BASE_URL + `assistant/shopper/delete/` + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Picker Delete',
              message: 'Picker deleted successfully',
              color: 'success'
            }
          })
          setVisibleDelete(false)
          loadPickersData()

        } else if (res.status === 404) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Picker remove error',
              message: res.data.message
            }
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Picker remove error',
              message: res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error:', err)
      })

  }

  const updatePassword = (id) => {
    if(passCode === '' || passCodeReEnter === ''){
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Password update error',
          message: 'Check the input fields',
          color: 'warning'
        }
      })

    }else if (passCode === passCodeReEnter) {
      const data = {
        passcode: passCode
      }
      
      console.log(data, id)
      if (user && token) {
        axios
          .patch(BASE_URL + 'assistant/shopper/update/' + id, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setVisiblePasswordModal(false)
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Password update',
                  message: 'Password updated successfully',
                  color: 'success'
                }
              })
              setVisiblePicker(true)
            } else if (res.status === 204) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Password update error',
                  message: res.data.message
                }
              })
            } else if (res.status === 404) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Password update error',
                  message: res.data.message
                }
              })
            } else if (res.status === 500) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Password update error',
                  message: res.data.message
                }
              })
            }
          }).catch((error) => {
            console.error(error)
          })
      }
    } else if(passCode !== passCodeReEnter){ 

      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Password update error',
          message: 'Password does not match',
          color: 'warning'
        }
      })
    
  }else{
    dispatch({
      type: SET_ALERT,
      payload: {
        status: true,
        title: 'Password update error',
        message: 'Password update error or check the input fields',
        color: 'warning'
      }
    })
  }
}

  return (
    <CContainer>
      <Link to={`/picker/addpicker`} className="picker-link">
        <CButton style={{ marginLeft: '0%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
          Add Picker
        </CButton>
      </Link>

      <CBadge style={{ marginLeft: '20%' }} color="secondary">Filter by</CBadge>
      <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
        <CDropdownToggle style={{ color: 'white' }}>{selectedCity}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
          <CDropdownItem onClick={() => city('Milan')}>Milan</CDropdownItem>
          <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
        <CDropdownToggle style={{ color: 'white' }}>{selectedChain}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
          {chainData.map((item, index) => (
            <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
              {item.name}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
      <CDropdown style={{ marginLeft: '2%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
        <CDropdownToggle style={{ color: 'white' }}>{selectedMarketGroup}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => marketGroup('all')}>All</CDropdownItem>
          {mGroupData.map((item, index) => (
            <CDropdownItem onClick={() => marketGroup(item._id, item.name)} key={index}>
              {item.name}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>

      <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
        <CFormInput
          type="text"
          placeholder="Search by Picker by picker Id, name, surname, email and contact"
          className="picker-input"
          value={paramCode}
          style={{ width: 480, marginLeft: '0%' }}
          onChange={(e) => setParamCodeData(e.target.value)}
        />

      </CNavbar>

      {loading ? <CSpinner /> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
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
            <CTableHeaderCell scope="col">Edit Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {pickerData.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>{item.code}</CTableDataCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.surname}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>{item.contact}</CTableDataCell>
              <CTableDataCell>{item.country === "it" || item.country === 'Italy' ? 'Italy' : item.country}</CTableDataCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>{item.language === 'en' ? 'English' : item.language === 'it' ? 'Italy' : item.language === 'es' ? 'Spanish' : item.language}</CTableDataCell>
              <CTableDataCell>{item.market?.chain?.name} - {item.market.address}</CTableDataCell>
              <CTableDataCell>
                <Link>
                  <CIcon icon={cilPencil} size='xl' onClick={() => handleTogglePicker(item)} />
                </Link>
              </CTableDataCell>
              <CTableDataCell>
                {item.activate ? <CButton size='sm' onClick={() => handleToggle(item.id, false)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Deactivate</CButton> : <CButton size='sm' onClick={() => handleToggle(item.id, true)} style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }} >Activate</CButton>}

              </CTableDataCell>
              <CTableDataCell>
                <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => handleToggleDelete(item.id)}>
                  <CIcon icon={cilTrash} size='lg' style={{ color: 'white' }} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      }

      <CModal alignment="center" visible={visiblePasswordModal} scrollable size='sm' onClose={() => setVisiblePasswordModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Update Password</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* <a>Are you sure you want to delete this picker?</a><br></br><br></br> */}
           <CCol md={12}>
        <CFormInput
              id="password"
              label="Enter New Password"
              type='password'
              onChange={(e) => setPassCode(e.target.value)}
            />
        </CCol>
        <br></br>
        <CCol md={12}>
        <CFormInput
              id="repassword"
              label="Re Enter Password"
              type='password'
              onChange={(e) => setPassCodeReEnter(e.target.value)}
            />
        </CCol>

        </CModalBody>
          <CModalFooter>
              <CButton type="submit" style={{ marginBottom: '3%', backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => {updatePassword(pickerEditObj.id)}}>
                Update
              </CButton>
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={visibleDelete} scrollable size='sm' onClose={() => setVisibleDelete(false)}>
        <CModalHeader closeButton={false}>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <a>Are you sure you want to delete this picker?</a><br></br><br></br>
          <div style={{ display: "flex", justifyContent: 'center' }}>
            <CButton onClick={() => deletePicker(pId)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
            <CButton onClick={() => setVisibleDelete(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
          </div>

        </CModalBody>
      </CModal>


      <CModal alignment="center" visible={visible} scrollable size='sm' onClose={() => setVisible(false)}>
        <CModalHeader closeButton={false}>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <a>Are you sure you want to {isActivate ? 'activate' : 'deactivate'} this picker?</a><br></br><br></br>
          {/* <CButton onClick={() => handleActivate()}  style={{ display : "flex", justifyContent : 'center' }} color="primary">Yes</CButton> */}
          <div style={{ display: "flex", justifyContent: 'center' }}>
            <CButton onClick={() => handleActivate()} style={{ backgroundColor: '#ff4d4d', color: 'white', marginRight: '10px' }} >Yes</CButton>
            <CButton onClick={() => setVisible(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', marginLeft: '10px' }} >No</CButton>
          </div>
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
        <CFormInput
              id="password"
              label="Password"
              type='password'
              defaultValue={pickerEditObj.passcode}
              onChange={(e) => setPassCode(e.target.value)}
            />
        </CCol> */}

            <CCol xs={6}>
              <CButton type="submit" style={{ marginBottom: '3%', width: '200px', backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => handleSubmit()}>
                Update Picker
              </CButton>
            </CCol>
            <CCol xs={6}>
              <span style={{ fontSize: 15, color: 'red', cursor: 'pointer', marginLeft: '64%', marginTop: '10%' }} onClick={() => handleTogglePassword()}>Change Password</span>
            </CCol>
          </div>
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setVisiblePicker(false)}>
            Close
          </CButton>
        </CModalFooter> */}
      </CModal>


    </CContainer>
  )
}

export default Pickers
