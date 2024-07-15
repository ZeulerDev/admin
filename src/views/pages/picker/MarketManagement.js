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
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilAirplay, cilLeaf } from '@coreui/icons'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SET_ALERT } from '../../../context/context_reducer'



const MarketManagement = () => {

  const [visible, setVisible] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [pickerData, setPickerData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [paramCity, setParamCityData] = useState('')
  const [paramGroup, setParamGroupData] = useState('')
  const [paramChainId, setParamChainData] = useState('')
  const [isActivate, setActivate] = useState(false)
  const [pickerId, setPickerId] = useState('')
  const[alert, setAlert] = useState(false)

  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedMarketGroup, setSelectedMarketGroup] = useState('All Market Groups')
  const [selectedChain, setSelectedChian] = useState('All Chains')

  const [mGroupData, setMGroupData] = useState([])
  const [chainData, setChainData] = useState([])

  const [selectedCityModal, setSelectedCityModal] = useState('All Cities')
  const [selectedChainModal, setSelectedChianModal] = useState('All Chains')
  const [chainDataModal, setChainDataModal] = useState([])
  const [paramCityModal, setParamCityDataModal] = useState('')
  const [paramChainIdModal, setParamChainDataModal] = useState('')
  const [chainMarket, setChainMarketData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [pickerIdModal, setPickerIdModal] = useState('')
  const [marketIdModal, setMarketIdModal] = useState('')
  
  
  useEffect(() => {
    loadMakerGroup()
    loadChain()
  }, [])

  const loadMakerGroup = () =>{
    if (token) {
      axios
        .get('https://15.160.211.157/market/groups/dropdown/fetch', {
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
        .get('https://15.160.211.157/assistant/market/chains/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setChainData(res.data)
            setChainDataModal(res.data)
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
  },[paramCity, paramGroup, paramChainId,alert])
  
  const loadPickersData = () => {
    if(user && token){
      setLoading(true)
      axios
        .get(`https://15.160.211.157/assistant/shoppers/:skip?city=${paramCity}&group=${paramGroup}&chain=${paramChainId}`, {
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

  const city = (city,type) => {

    if(type === 'view'){
      if (city === 'all') {
        setParamCityData('')
        setSelectedCity('All Cities')
      } else {
        setParamCityData(city)
        setSelectedCity(city)
      }

    }else if(type === 'modal'){
      if (city === 'all') {
        setParamCityDataModal('')
        setSelectedCityModal('All Cities')
      } else {
        setParamCityDataModal(city)
        setSelectedCityModal(city)
      }
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

  const chain = (chainId, chianName,type) => {

    if(type === 'view'){

      if (chainId === 'all') {
        setParamChainData('')
        setSelectedChian('All Chains')
        
      } else {
        setParamChainData(chainId)
        setSelectedChian(chianName)
      }

    }else if(type === 'modal'){
      if (chainId === 'all') {
        setParamChainDataModal('')
        setSelectedChianModal('All Chains')
        
      } else {
        setParamChainDataModal(chainId)
        setSelectedChianModal(chianName)
      }
    }

    
  }

  const handleToggle = (pId,mId) => {
    setVisible(!visible)
    console.log(pId,mId)

    setPickerIdModal(pId)
    setMarketIdModal(mId)
  }

  const handleActivate = () => {


    const data = {
      status: isActivate
    }

    console.log(pickerId, data)

    if(user && token){
       axios
        .patch('https://15.160.211.157/assistant/shopper/status/'+pickerId,data, {
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


  //modal
  useEffect(() => {
    if (user && token) {
      loadData(0, true)
    }
  }, [paramChainIdModal, paramCityModal, user])

  const loadData = (count, moveNext) => {
    setLoadingModal(true)
    axios
      .get(
        `https://15.160.211.157/assistant/market/locations/${count}?brand=${paramChainIdModal}&city=${paramCityModal}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setChainMarketData(res.data.data)
          setLoadingModal(false)
          if(moveNext){
            const nextCount = count + res.data.data.length
            setItemsPerPage(nextCount)
          } else {
            const nextCount = count - res.data.data.length
            if(count < 0){
              setItemsPerPage(0)
            } else {
              setItemsPerPage(nextCount)
            }
          }
        } else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Loading error',
              message : res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error: ', err)
      })
  }

  const nextPage = () => {
    loadData(itemsPerPage, true)
  }

  const previousPage = () => {
    loadData(itemsPerPage, false)
  }

  const addMarket = (pickerId, marketId, ) => {
    if(marketId && pickerId ){
      const formData = {
        market: marketId,
        shopper: pickerId,
      }

      if(user,token){
          if(user && token){
              axios
                .post('https://15.160.211.157/assistant/picker/assign/market', formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    setVisible(false)
                    setPickerIdModal('')
                    setMarketIdModal('')

                    const updatedEntity = res.data
                    const list = pickerData.map((ob) => {
                     if(ob.id === updatedEntity.id){
                        return updatedEntity
                       } else {
                      return ob
                       }
                       })
                         setPickerData([...list])

                  } else if (res.status === 204) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Market Assign error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  } else if (res.status === 500) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Market Assign error',
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
          message : 'Picker Registration error, Please Check the input fields',
          color:'warning'
        }
      })

    }
  }

  const removeMarket =(pickerId, marketId) =>{
    if(marketId && pickerId ){
      const formData = {
        market: marketId,
        shopper: pickerId,
      }

      if(user,token){
          if(user && token){
              axios
                .post('https://15.160.211.157/assistant/picker/remove/market', formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    setVisible(false)
                    setPickerIdModal('')
                    setMarketIdModal('')

                    const updatedEntity = res.data
                    const list = pickerData.map((ob) => {
                     if(ob.id === updatedEntity.id){
                        return updatedEntity
                       } else {
                      return ob
                       }
                       })
                         setPickerData([...list])
                  


                  } else if (res.status === 204) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Market remove error',
                        message : res.data.message,
                        color:'warning'
                      }
                    })
                  } else if (res.status === 500) {
                    dispatch({
                      type : SET_ALERT,
                      payload : {
                        status : true,
                        title : 'Market remove error',
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
          message : 'Picker Registration error, Please Check the input fields',
          color:'warning'
        }
      })

    }
  }
  

  return (
    <CContainer>
    <CNavbar className="bg-body-tertiary">
        <CDropdown style={{ marginLeft: '43%', width:'10%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle  >{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all','view')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milan','view')}>Milan</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli','view')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginRight: '0%', width:'15%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle >{selectedChain}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => chain('all',null,'view')}>All</CDropdownItem>
            {chainData.map((item, index) => (
              <CDropdownItem onClick={() => chain(item.id, item.name, 'view')} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginRight: '1%', width:'30%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle  >{selectedMarketGroup}</CDropdownToggle>
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
          <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
          <CTableHeaderCell scope="col">Country</CTableHeaderCell>
          <CTableHeaderCell scope="col">City</CTableHeaderCell>
          <CTableHeaderCell scope="col">Language</CTableHeaderCell>
          <CTableHeaderCell scope="col">Market</CTableHeaderCell>
          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
       { pickerData.map((item, index) =>(
      <CTableRow key={index}>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.surname}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>{item.contact}</CTableDataCell>
              <CTableDataCell>{item.country === "it" || item.country === 'Italy' ? 'Italy' : item.country }</CTableDataCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>{item.language === 'en' ? 'English' : item.language === 'it' ? 'Italy' : item.language === 'es' ? 'Spanish' : item.language}</CTableDataCell>
              <CTableDataCell>{item.market?.chain?.name} - {item.market.address}</CTableDataCell>
              <CTableDataCell>
                 {item.market?.id ? (
                     <CButton size='sm' onClick={() => handleToggle(item.id,item.market?.id)} style={{ backgroundColor:'#ff4d4d',width: 90 }} >Assign</CButton>
                 ) : (
                     <CButton size='sm' onClick={() => handleToggle(item.id,item.market?.id)} style={{ backgroundColor:'#ff4d4d',width: 90 }} >Add</CButton>
                 )}
             </CTableDataCell>
            </CTableRow>
))}
      </CTableBody>
    </CTable>

    }


      <CModal  visible={visible} scrollable size='xl' onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Market</CModalTitle>
          <CDropdown style={{ marginLeft: 0, width:'10%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle  >{selectedCityModal}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all','modal')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milano','modal')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli','modal')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginLeft: '20%', width:'15%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle >{selectedChainModal}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => chain('all',null,'modal')}>All</CDropdownItem>
            {chainDataModal.map((item, index) => (
              <CDropdownItem onClick={() => chain(item.id, item.name,'modal')} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
        </CModalHeader>
        <CModalBody>
         
        { loadingModal ? <CSpinner/> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {chainMarket.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{item.chain.name}</CTableDataCell>
              <CTableDataCell>{item.address}</CTableDataCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>{item.scraped}</CTableDataCell>
              <CTableDataCell>{
              marketIdModal === item._id ? 
              (
                <CButton size='sm' onClick={() => removeMarket(pickerIdModal, item._id)} style={{ backgroundColor:'#ff4d4d',width: 90 }} >Remove</CButton>
              ):(
                <CButton size='sm' onClick={() => addMarket(pickerIdModal, item._id)} style={{ backgroundColor:'#ff4d4d',width: 90 }} >Add</CButton>
              )
            }</CTableDataCell>
              
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      }
            

        <CModalFooter>
        <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 20 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem onClick={nextPage}>Next</CPaginationItem>
      </CPagination>
        </CModalFooter>

        </CModalBody>
      </CModal>

    
  </CContainer>
  )
}

export default MarketManagement
