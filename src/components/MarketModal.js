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
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormCheck,
  CSpinner,
} from '@coreui/react'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const MarketModal = () => {
  const [{ user, token }, dispatch] = useAppContext()
  const [chainData, setChainData] = useState([])
  const [chainMarket, setChainMarketData] = useState([])
  const [paramChainId, setParamChainData] = useState('')
  const [paramCity, setParamCityData] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedChain, setSelectedChian] = useState('All Chains')
  const [isChecked, setIsChecked] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
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
  }, [])

  

  useEffect(() => {
    if (user && token) {
      loadData(0, true)
    }
  }, [paramChainId, paramCity, user])

  const loadData = (count, moveNext) => {
    setLoading(true)
    axios
      .get(
        `https://15.160.211.157/assistant/market/locations/${count}?brand=${paramChainId}&city=${paramCity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setChainMarketData(res.data.data)
          setLoading(false)
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

  const chain = (chainId, chianName) => {
    if (chainId === 'all') {
      setParamChainData('')
      setSelectedChian('All Chains')
    } else {
      setParamChainData(chainId)
      setSelectedChian(chianName)
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
  const handleCheckboxChange = (marketId, boolean, service) => {
  
    console.log(marketId)
    console.log(chainMarket)
    

    if(service === "delivery"){

      const updateData ={
        "market": marketId,
        "service":service
      }
      addService(updateData)
      console.log('add delivery')


    }else if(service === "pickup"){

      const updateData ={
        "market": marketId,
        "service":service
      }
      addService(updateData)
      console.log('add pickup')
    }
  }

  const remService = (marketId, boolean, service) => {

    if(service === "delivery"){

      const reData ={
        "market": marketId,
        "service":service
      }
      removeService(reData)
      console.log('remove delivery')


    }else if(service === "pickup"){

      const reData ={
        "market": marketId,
        "service":service
      }
      removeService(reData)
      console.log('remove pickup')
    }


  }
  
  const addService = (serviceData) => {
    
    axios
      .post(
        `https://15.160.211.157/assistant/markets/add/services`,serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
         console.log('Updated add service')
        } else if (res.status === 203) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Updated error',
              message : res.data.message
            }
          })
        }else if (res.status === 204) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Updated error',
              message : res.data.message
            }
          })
        } else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market Updated error',
              message : res.data.message
            }
          })
        }
      }).catch((err) => {
        console.error('Error:', err)
      })

  }

  const removeService = (serviceReData) => {

    axios
      .post(
        `https://15.160.211.157/assistant/markets/remove/services`,serviceReData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
         console.log('Updated remove service')
        } else if (res.status === 203) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market remove error',
              message : res.data.message
            }
          })
        }else if (res.status === 204) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market remove error',
              message : res.data.message
            }
          })
        } else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Market remove error',
              message : res.data.message
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
        <Link to={`/markets/addmarket`}>
          <CButton color="success" variant="outline" style={{ marginLeft: '3%',width:'200px' }}>
            Add New Market
          </CButton>
        </Link>

        <CDropdown style={{ marginLeft: '55%', width:'10%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle >{selectedCity}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => city('all')}>All</CDropdownItem>
            <CDropdownItem onClick={() => city('Milano')}>Milano</CDropdownItem>
            <CDropdownItem onClick={() => city('Napoli')}>Napoli</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <CDropdown style={{ marginRight: '1%', width:'15%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle >{selectedChain}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => chain('all')}>All</CDropdownItem>
            {chainData.map((item, index) => (
              <CDropdownItem onClick={() => chain(item.id, item.name)} key={index}>
                {item.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
      </CNavbar>

      { loading ? <CSpinner/> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Delivery</CTableHeaderCell>
            <CTableHeaderCell scope="col">Pickup</CTableHeaderCell>
            <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {chainMarket.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{item.chain.name}</CTableDataCell>
              <CTableDataCell>{item.address}</CTableDataCell>
              <CTableDataCell>{item.city}</CTableDataCell>
              <CTableDataCell>
                {item.services.includes('delivery') ? (
                  <CFormCheck 
                  id="flexCheckChecked" 
                  label="" 
                  defaultChecked
                  onChange={() => remService(item._id, true, 'delivery')}
                  />
                ) : (
                  <CFormCheck 
                    id="flexCheckChecked" 
                    label="" 
                    onChange={() => handleCheckboxChange(item._id, true, 'delivery')}
                    />
                )}
              </CTableDataCell>
              <CTableDataCell>
                {item.services.includes('pickup') ? (
                  <CFormCheck 
                  id="flexCheckChecked" 
                  label="" 
                  defaultChecked
                  onChange={() => remService(item._id, true, 'pickup')}
                  />
                ) : (
                  <CFormCheck
                    id="flexCheckChecked"
                    label=""
                    onChange={() => handleCheckboxChange(item._id, true, 'pickup')}
                  />
                )}
              </CTableDataCell>
              <CTableDataCell>{item.scraped}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      }

      <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 20 ? true : false} onClick={previousPage}>
          Previous
        </CPaginationItem>
        <CPaginationItem onClick={nextPage}>Next</CPaginationItem>
      </CPagination>
    </CContainer>
  )
}

export default MarketModal
