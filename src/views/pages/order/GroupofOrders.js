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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'

import { cilInfo, cilList, cilNotes, cilPencil } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { format } from 'date-fns';
import { BASE_URL } from '../../../context/config'

const GroupOfOrders = () => {
  const [{ user, token }, dispatch] = useAppContext()
  const [groceryGroupsData, setGroceryGroupsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [visibleBonus, setVisibleBonus] = useState(false)
  const [groceryGroupId, setGroceryGroupId] = useState('')
  const [bonus, setBonus] = useState('')

  const [status, setStatus] = useState('')
  const [mGroupData, setMGroupData] = useState([])
  const [chainData, setChainData] = useState([])
  const [paramCity, setParamCityData] = useState('')
  const [paramStatus, setParamStatusData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [paramChainId, setParamChainData] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [selectedChain, setSelectedChian] = useState('All Chains')
  const [pickerData, setPickerData] = useState([])
  const [loadingPickers, setLoadingPickers] = useState(false)
  const [visiblePicker, setVisiblePicker] = useState(false)
  const [picker, setPicker] = useState([])
  const [visibleAllPickers, setVisibleAllPickers] = useState(false)
  const [pickerId, setPickerId] = useState('')
  const [groceryId, setGroceryId] = useState('')
  const [groceryIdData, setGroceryIdData] = useState('')
  const [visible, setVisible] = useState(false)
  const [selectedDates, setSelectedDates] = useState([])
  const [isDisable, setIsDisable] = useState(true)

  useEffect(() => {
    if (user && token) {
      loadData(0, true)
    }
  }, [user, token, searchQuery, paramStatus,selectedDates])

  const loadData = (count, moveNext) => {
    setLoading(true)
    axios.get(
        BASE_URL+'assistant/grocery/group/' + count +'?rider=' +searchQuery + '&status=' + paramStatus+ '&date=' + selectedDates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log('data')
        if (res.status === 200) {
          setGroceryGroupsData(res.data)
          console.log('dataaaaaaa')
          setLoading(false)
          if (res.data.length < 50) {
            setIsDisable(true)
            console.log("ok")
          } else if (res.data.length > 49) {
            setIsDisable(false)
          }
        } else if (res.status === 204) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Grocery groups loading error',
              message: res.data.message,
            },
          })
        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Grocery groups error',
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
    console.log(itemsPerPage)
    const c = itemsPerPage + 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    const c = itemsPerPage - 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handleToggleBonus = (id, bonus = null) => {
    setVisibleBonus(!visibleBonus)
    setGroceryGroupId(id)
    if (bonus !== null) {
      setBonus(bonus)
    } else {
      console.log('Bonus number not provided')
    }
  }

  const handleUpdateBonus = () => {
    const data = {
      bonus: bonus,
    }

    console.log(data)
    if (user && token) {
      axios
        .put(BASE_URL+'assistant/grocery/group/bonus/' + groceryGroupId, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('updated')
            setVisibleBonus(false)
            const updatedEntity = res.data
            const found = groceryGroupsData.find((f) => f.id === updatedEntity._id)
            if (found) {
              found.bonus = updatedEntity.bonus
            }

            setGroceryGroupsData([...groceryGroupsData])
          } else if (res.status === 203) {
            console.log('203')
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Bonus Update error',
                message: res.data.message,
              },
            })
          } else if (res.status === 204) {
            console.log('204')
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Bonus Update error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Bonus Update error',
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
  const city = (city) => {
    if (city === 'all') {
      setParamCityData('')
      setSelectedCity('All Cities')
    } else {
      setParamCityData(city)
      setSelectedCity(city)
    }
  }

  const groceryStatus = (status) => {
    if (status === 'all') {
      setParamStatusData('')
      setSelectedStatus('All Status')
    } else {
      setParamStatusData(status)
      setSelectedStatus(status)
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

  useEffect(() => {
    loadPickersData()
  }, [paramCity, paramGroup, paramChainId, alert])

  const loadPickersData = () => {
    if (user && token) {
      setLoadingPickers(true)
      axios
        .get(
          BASE_URL+`assistant/shoppers/:skip?city=${paramCity}&group=${paramGroup}&chain=${paramChainId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            setPickerData(res.data)
            setLoadingPickers(false)
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

  const handlePickerToggle = (id, status, grocery) => {
    setVisiblePicker(!visiblePicker)
    console.log('Grocery ID', id)
    setPicker(grocery)
    setStatus(status)
  }

  const handleTogglePickers = (id, status, groceryId) => {
    setVisibleAllPickers(!visibleAllPickers)
    console.log('picker id', id)
    console.log('Grocery id', groceryId)
    setStatus(status)
    setGroceryId(groceryId)
    setPickerId(id)
  }

  const updatePickerAssign = (grocery, pId, batchStatus) => {
    console.log('bid', grocery, 'PID', pId, batchStatus)
    const data = {
      pickerId: pId,
      status: batchStatus,
    }
    console.log(data)
    if (user && token) {
      axios
        .put(BASE_URL+'assistant/grocery/group/picker/' + grocery, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('updated', res.data)
            if (visiblePicker) {
              setVisiblePicker(false)
            }
            setVisibleAllPickers(false)
            const updatedEntity = res.data
            // const found = groceryGroupsData.find((f) => f.id === updatedEntity._id)
            // if(found){
            //   console.log("done",found)
            //   found.bonus = updatedEntity.bonus
            // }

            const list = groceryGroupsData.map((item) => {
              if (item.id === updatedEntity._id) {
                console.log('matched')
                return updatedEntity
              } else {
                return item
              }
            })
            console.log('update obj', updatedEntity)
            setGroceryGroupsData([...list])
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker Assign ',
                message: "Successfully picker assigned to the grocery group",
                color: 'success',
              },
            })

            // setGroceryGroupsData([...groceryGroupsData])
          } else if (res.status === 203) {
            console.log('203')
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker Assign error',
                message: res.data.message,
              },
            })
          } else if (res.status === 204) {
            console.log('204')
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker Assign error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Picker Assign error',
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

  const handleToggle = (groceryId) => {
    setVisible(!visible)
    setGroceryIdData(groceryId)
  }

  const handleStatus = (id) => {
    console.log('status', id)

    if (user && token) {
      axios
        .put(
          BASE_URL+'assistant/grocery/group/status/' + id,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            console.log('updated', res.data)
            setVisible(false)
            const updatedEntity = res.data
            const found = groceryGroupsData.find((f) => f.id === updatedEntity._id)
            if (found) {
              console.log('done', found)
              found.status = updatedEntity.status
            }

            setGroceryGroupsData([...groceryGroupsData])
          } else if (res.status === 203) {
            console.log('203')
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Status update error',
                message: res.data.message,
              },
            })
          } else if (res.status === 204) {
            console.log('204')
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Status update error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Status update error',
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

  const handleDateRangeChange = (value) => {
    if(value){
      const formattedStartDate = format(value[0], 'MM/dd/yyyy HH:mm');
      const formattedEndDate = format(value[1], 'MM/dd/yyyy HH:mm');
    setSelectedDates([formattedStartDate,formattedEndDate]);

    }else{
    setSelectedDates([]);

    }
  };

  return (
    <CContainer>
        
      
        

        <CBadge style={{ marginLeft: '76%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle style={{color:'white'}}>{selectedStatus}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => groceryStatus('all')}>All Status</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('created')}>Created</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('ready')}>Ready</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('finalized')}>Finalized</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('freeze')}>Freeze</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('forced')}>Forced</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('open')}>Open</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('completed')}>Completed</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('waiting')}>Waiting</CDropdownItem>
            <CDropdownItem onClick={() => groceryStatus('paid ')}>Paid </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

      <CNavbar style={{marginTop:'1%'}} className="bg-body-tertiary">
      <DateRangePicker style={{ marginLeft:1 }} format="MM/dd/yyyy HH:mm"  onChange={handleDateRangeChange} />

<CFormInput
  type="text"
  placeholder="Search By Rider No"
  style={{ width: 300, marginLeft: '5%' }}
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
      </CNavbar>

      {loading ? (
        <CSpinner />
      ) : (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Rider Assign No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Rider Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Bonus</CTableHeaderCell>
              <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hour</CTableHeaderCell>
              <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
              <CTableHeaderCell scope="col">Start</CTableHeaderCell>
              <CTableHeaderCell scope="col">End</CTableHeaderCell>
              <CTableHeaderCell scope="col">Picker</CTableHeaderCell>
              <CTableHeaderCell scope="col">Order</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {groceryGroupsData.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{item.no}</CTableDataCell>
                  <CTableDataCell>{item.ridersAssigningNo}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge style={{ width: 80 }} color="info">
                      {item.ridersAssigningStatus}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{item.duration} min</CTableDataCell>
                  <CTableDataCell>
                    <CBadge style={{ width: 80 }} color="warning">
                      {item.status}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{item.date}</CTableDataCell>
                  <CTableDataCell>
                  {item.bonus !=null ? item.bonus.toFixed(2) : 0.00}{' '}
                    <Link to={``}>
                      <CIcon
                        icon={cilPencil}
                        size="sm"
                        onClick={() => handleToggleBonus(item.id, item.bonus)}
                      />
                    </Link>{' '}
                  </CTableDataCell>
                  <CTableDataCell>{item.amount}</CTableDataCell>
                  <CTableDataCell>{item.hour}</CTableDataCell>
                  <CTableDataCell>{item.rank + 1}</CTableDataCell>
                  <CTableDataCell>{item.start}</CTableDataCell>
                  <CTableDataCell>{item.end}</CTableDataCell>
                  <CTableDataCell>
                    {item.shopper ? (
                      <CButton
                        onClick={() => handlePickerToggle(item.id, item.status, item)}
                        size="sm"
                        style={{ width: 80, backgroundColor: '#ff4d4d' , color: 'white' }}
                        
                      >
                        View
                      </CButton>
                    ) : (
                      <CButton
                        onClick={() => handleTogglePickers(item.accepted, item.status, item.id)}
                        size="sm"
                        style={{ width: 80, backgroundColor: '#ff4d4d' , color: 'white'}}
                        
                      >
                        Add
                      </CButton>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.status === 'complete' ? (
                      <CButton size="sm" disabled={true} style={{ width: 80 , backgroundColor: '#ff4d4d' , color: 'white'}} >
                        Cancel
                      </CButton>
                    ) : item.status === 'canceled' ? (
                      <CButton size="sm" disabled={true} style={{ width: 80 , backgroundColor: '#ff4d4d' , color: 'white'}}>
                        Cancel
                      </CButton>
                    ) : (
                      <CButton
                        onClick={() => handleToggle(item.id)}
                        size="sm"
                        style={{ width: 80,backgroundColor: '#ff4d4d' , color: 'white' }}
                      >
                        Cancel
                      </CButton>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/order/grocerygroup/orders/${item.id}`}>
                      <CIcon icon={cilInfo} size="xl" />
                    </Link>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      )}

      <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 50 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination>

      <CModal
        alignment="center"
        visible={visibleBonus}
        scrollable
        size="sm"
        onClose={() => setVisibleBonus(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <a>Enter Bonus Amount</a>
          <br></br>
          <CFormInput
            type="text"
            placeholder="Bonus"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
         
          <CButton color="primary" onClick={() => handleUpdateBonus()}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        alignment="center"
        visible={visiblePicker}
        scrollable
        size="lg"
        onClose={() => setVisiblePicker(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Picker Information</CModalTitle>
        </CModalHeader>
        <CModalBody
          style={{
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Name
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" defaultValue={picker.shopper?.name} readOnly plainText />
              </CCol>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Email
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" defaultValue={picker.shopper?.email} readOnly plainText />
              </CCol>
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Contact
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" defaultValue={picker.shopper?.contact} readOnly plainText />
              </CCol>
            </CRow>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="warning"
            onClick={() => handleTogglePickers(picker.shopper?.id, status, picker.id)}
          >
            Change
          </CButton>
          {/* <CButton color="secondary" onClick={() => setVisiblePicker(false)}>
            Close
          </CButton> */}
        </CModalFooter>
      </CModal>

      <CModal
        alignment="center"
        visible={visibleAllPickers}
        scrollable
        size="xl"
        onClose={() => setVisibleAllPickers(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Picker Assing to the Grocery Batch</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CBadge style={{ marginLeft: '37%'}} color="secondary">Filter by</CBadge>
        <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
              <CDropdownToggle style={{color:'white'}}>{selectedCity}</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
                <CDropdownItem onClick={() => city('Milan')}>Milan</CDropdownItem>
                <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
              <CDropdownToggle style={{color:'white'}}>{selectedChain}</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
                {chainData.map((item, index) => (
                  <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
                    {item.name}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            <CDropdown style={{marginLeft: '2%', width:'17%',backgroundColor: '#ff4d4d'  }}>
              <CDropdownToggle style={{color:'white'}}>{selectedMarketGroup}</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => marketGroup('all')}>All</CDropdownItem>
                {mGroupData.map((item, index) => (
                  <CDropdownItem onClick={() => marketGroup(item._id, item.name)} key={index}>
                    {item.name}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          <CNavbar style={{marginTop:'1%'}} className="bg-body-tertiary">

          </CNavbar>

          {loadingPickers ? (
            <CSpinner />
          ) : (
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                  <CTableHeaderCell scope="col">City</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Language</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Market</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {pickerData.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.surname}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>{item.contact}</CTableDataCell>
                    <CTableDataCell>
                      {item.country === 'it' || item.country === 'Italy' ? 'Italy' : item.country}
                    </CTableDataCell>
                    <CTableDataCell>{item.city}</CTableDataCell>
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
                      {item.market?.chain?.name} - {item.market.address}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.id === pickerId ? (
                        <CButton
                          size="sm"
                          onClick={() => updatePickerAssign(groceryId, item.id, status)}
                          style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }}
                        >
                          Assigned
                        </CButton>
                      ) : (
                        <CButton
                          size="sm"
                          onClick={() => updatePickerAssign(groceryId, item.id, status)}
                          style={{ backgroundColor: '#ff4d4d', width: 90, color: 'white' }}
                        >
                          Add
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisibleAllPickers(false)}>
            Close
          </CButton> */}
        </CModalFooter>
      </CModal>

      <CModal
        alignment="center"
        visible={visible}
        scrollable
        size="sm"
        onClose={() => setVisible(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <a>Are you sure you want to cancel this grocery group order?</a>
          <br></br><br></br>
          {/* <CButton
            onClick={() => handleStatus(groceryIdData)}
            style={{ marginLeft: 200,backgroundColor: '#ff4d4d', color: 'white' }}
            color="primary"
          >
            Yes
          </CButton> */}
          <div style={{display : "flex", justifyContent : 'center'}}>
        <CButton  onClick={() => handleStatus(groceryIdData)} style={{  backgroundColor:'#ff4d4d', color:'white',marginRight: '10px' }} >Yes</CButton>
        <CButton onClick={() => setVisible(false)} style={{  backgroundColor:'#ff4d4d', color:'white',marginLeft: '10px' }} >No</CButton>
        </div>
        </CModalBody>
      </CModal>
    </CContainer>
  )
}

export default GroupOfOrders
