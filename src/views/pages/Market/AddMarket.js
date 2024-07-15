import React, { useEffect, useState } from 'react'
import {
  CForm,
  CCol,
  CFormInput,
  CButton,
  CFormSelect,
  CFormCheck,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'


const AddMarket = () => {
  const [chainData, setChainData] = useState([])
  const [{ user, token }, dispatch] = useAppContext()
  const [source, setSource] = useState([
    'conad',
    'carrefour',
    'everli',
    'everli_Carrefour',
    'pam',
    'cosicomodo',
    'il_Gigante',
  ])


  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [address, setAddress] = useState('')
  const [selectedChain, setSelectedChain] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const navigate = useNavigate()

  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [scheduleList, setScheduleList] = useState([]);

  const manageSchedule = () => {
    if (day && startTime && closeTime) {
      const existingSchedule = scheduleList.find(schedule => schedule.day === day);
      if (existingSchedule) {
        
        dispatch({
          type : SET_ALERT,
          payload : {
            status : true,
            title : 'Day already exists',
            message : 'Schedule for ' + day + ' already exists'
          }
        })
        return; 
      }
      const newSchedule = {
        day,
        info: {
          startTime,
          closeTime,
        },
      };
      setScheduleList([...scheduleList, newSchedule]);
      setDay('');
      setStartTime('');
      setCloseTime('');
    } else {
      console.log('All fields are required');
      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Please Check',
          message : 'All fields are required'
        }
      })
    }
  };
  

  const removeScheduleDay = (indexToRemove) => {
    const updatedScheduleList = scheduleList.filter((_, index) => index !== indexToRemove);
    setScheduleList(updatedScheduleList);
  };
  
  
  const handleSubmit = () => {

    console.log(scheduleList)

    if(latitude && longitude && address && selectedChain && selectedCity && selectedSource){

      

      const formData = {
        lat: latitude,
        lng: longitude,
        address: address,
        id: selectedChain,
        city: selectedCity,
        source: selectedSource,
        times: scheduleList,
      }
    console.log(formData)

    if(user && token){
      axios
        .post('https://15.160.211.157/assistant/market/create', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Market Registration',
                message : 'Market Registration Success',
                color : 'success'
              }
            })
            navigate('/markets')
          } else if (res.status === 204) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Market Registration error',
                message : res.data.message
              }
            })
          } else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Market Registration error',
                message : res.data.message
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

  useEffect(() => {
    if (token && user) {
      axios
        .get('https://15.160.211.157/assistant/market/chains/all', {
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
                title : 'Market Registration error',
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
      <div className="row g-3" >
        <CCol md={6}>
          <CFormInput
            id="inputlatitue"
            label="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            id="inputlongtitu"
            label="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            id="inputAddress"
            label="Address"
            placeholder=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </CCol>
        
        <CCol md={4}>
          <CFormSelect
            id="inputState"
            label="City"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option>Select City</option>
            <option>Milano</option>
            <option>Napoli</option>
          </CFormSelect>
        </CCol>
        <CCol md={4}>
          <CFormSelect
            id="inputState"
            label="Market Chain"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option>Select Chain</option>
            {chainData.map((item, index) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={4}>
          <CFormSelect
            id="inputState"
            label="Source"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option>Select</option>
            {source.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </CFormSelect>
        </CCol>

        <CCol md={2}>
        <CFormSelect
          id="inputState"
          label="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option>Select Day</option>
          <option value={'mon'}>Monday</option>
          <option value={'tue'}>Tuesday</option>
          <option value={'wed'}>Wednesday</option>
          <option value={'thu'}>Thursday</option>
          <option value={'fri'}>Friday</option>
          <option value={'sat'}>Saturday</option>
          <option value={'sun'}>Sunday</option>          
        </CFormSelect>
      </CCol>
            
      <CCol md={4}>
        <CFormInput
          id="inputstart"
          label="Start Time"
          type='time'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </CCol>
      <CCol md={4}>
        <CFormInput
          id="inputend"
          label="Close Time"
          type='time'
          value={closeTime}
          onChange={(e) => setCloseTime(e.target.value)}
        />
      </CCol>
      <CCol md={2}>
        <CButton style={{ marginTop:31 }} color="primary" onClick={manageSchedule}>Add</CButton>
      </CCol>
      
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Day</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Close Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {scheduleList.map((schedule, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{schedule.day === 'mon' ? 'Monday' : schedule.day === 'tue' ? 'Tuesday' :schedule.day === 'wed' ? 'Wednesday' :schedule.day === 'thu' ? 'Thursday' :schedule.day === 'fri' ? 'Friday' : schedule.day === 'sat' ? 'Saturday' :  'Sunday'}</CTableDataCell>
              <CTableDataCell>{schedule.info.startTime}</CTableDataCell>
              <CTableDataCell>{schedule.info.closeTime}</CTableDataCell>
              <CTableDataCell>
              <CButton
                 color="danger"
                 onClick={() => removeScheduleDay(index)}
              >
              Remove
              </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      

      <CCol xs={12}>
          <CButton color="warning" type="submit" style={{ marginBottom:'3%', width:'200px' }} onClick={()=>handleSubmit()}>
            Add Market
          </CButton>
        </CCol>
      </div>
    </CContainer>
  )
}

export default AddMarket
