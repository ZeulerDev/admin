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
  CNavbar,
  CPagination,
  CPaginationItem,CCardImage,
  CSpinner,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'
import { Link } from 'react-router-dom'
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const Products = () => {

  const [{user, token }, dispatch] = useAppContext()
  const [loading, setLoading] = useState(false)
  const [ProductData, setProductData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [isDisable, setIsDisable] = useState(true)
  const [chainData, setChainData] = useState([])
  const [selectedChain, setSelectedChian] = useState('All Chains')
  const [selectedMarket, setSelectedMarket] = useState('All market')
  const [paramChainId, setParamChainData] = useState('')
  const [paramMId, setParamMarketData] = useState('')
  const [chainMarket, setChainMarketData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePriceModal, setVisiblePriceModal] = useState(false)
  const [id,setId] = useState('')
  const [price , setPrice] = useState('')
  const [priceDisplay , setPriceDisplay] = useState('')

  useEffect(() => {
    if (user && token) {
        loadData(0, true)
    }
  }, [user, token,paramMId,searchQuery])

  useEffect(() => {
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
  }, [])

  const loadDataMarkets = (chainId) => {
    axios
      .get(
        `http://localhost:8003/assistant/market/locations?brand=${chainId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          setChainMarketData(res.data.data)
          if (res.data.data.length < 20) {
            setIsDisable(true)
            console.log("ok")
          } else if (res.data.data.length > 19) {
            setIsDisable(false)
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

  const loadData = (count, moveNext) => {
    setLoading(true)
    axios
      .get( BASE_URL+`product/all/${count}?marketId=${paramMId}&name=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProductData(res.data)
          setLoading(false)
          if (res.data.length < 20) {
              setIsDisable(true)
              console.log("ok")
            } else if (res.data.length > 19) {
              setIsDisable(false)
            }
        } else if (res.status === 203) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'product loading error error',
              message : res.data.message
            }
          })
        }else if (res.status === 204) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'No Products',
              message : "No products found in this market address",
              color : 'info'
            }
          })
        }else if (res.status === 500) {
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'product loading error error',
              message : res.data.message
            }
          })
        }
      }).catch((error) => {
        console.error('Error:', error)
      })
  }

  const chain = (chainId, chianName) => {
    if (chainId === 'all') {
      setParamChainData('')
      setSelectedChian('All Chains')
    } else {
      setParamChainData(chainId)
      loadDataMarkets(chainId)
      setSelectedChian(chianName)
    }
  }

  const market = (mId, marketName) => {
    if (mId === 'all') {
        setParamMarketData('')
      setSelectedMarket('All Markets')
      setParamChainData('')
      setSelectedChian('All Chains')
    } else {
        setParamMarketData(mId)
      setSelectedMarket(marketName)
    }
  }


  const nextPage = () => {
    const c = itemsPerPage + 50
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    const c = itemsPerPage - 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handleToggleName = (id, name)=>{
    setVisiblePriceModal(true)
    setId(id)
    setPriceDisplay(name)
  }

  const updateName = () => {
    console.log("called")
    if(price == ''){
      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Alert',
          message : 'Please enter the price',
          color : 'warning'
        }
      })
    }else{
      handleUpdate(id)
    }
  }

  const handleUpdate = (id) => {

    if(id){
      let formData = {
        price:price+' €'
      }

    if(user && token){
      axios
        .put(BASE_URL+'product/update/price/'+id, formData, {
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
                title : 'Product Details Update',
                message : 'Product price update Success',
                color : 'success'
              }
            })
            setId('')
            setPrice('')
            loadData(0, true)
            setVisiblePriceModal(false)
            setPriceDisplay('')
          } else if (res.status === 204) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Product Details Update error',
                message : res.data.message,
                color : 'danger'
              }
            })
          }else if (res.status === 500) {
            dispatch({
              type : SET_ALERT,
              payload : {
                status : true,
                title : 'Product Details Update error',
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
      <CNavbar className="bg-body-tertiary">
      <CFormInput  
         type ="text" 
         placeholder="Search by Product name" 
         style={{ width : 450, marginLeft: '2%' }}
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
       
         />
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

        <CDropdown style={{ marginRight: '1%', width:'35%',backgroundColor: '#ff4d4d'  }}>
          <CDropdownToggle >{selectedMarket}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => market('all')}>Select the Chain</CDropdownItem>
            {chainMarket.map((item, index) => (
              <CDropdownItem onClick={() => market(item._id, item.address)} key={index}>
                {item.address}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
      </CNavbar>

      { loading ? <CSpinner/> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
            <CTableHeaderCell scope="col">Market Address</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {ProductData.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row"><CCardImage style={{ width :'50px', height:'50px' }} src={`https://api.zeuler.com/image/`+item.photo} /></CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.price}<Link to={``}><CIcon icon={cilPencil} size="sm" onClick={() => handleToggleName(item.productId, item.price)}  /></Link></CTableDataCell>
              <CTableDataCell>{item.chainName}</CTableDataCell>
              <CTableDataCell>{item.marketAddress}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      }

    <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>Previous</CPaginationItem>
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination>

      <CModal alignment="center" visible={visiblePriceModal} scrollable size='sm' onClose={() => setVisiblePriceModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Change Price</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <a>Enter New Name</a><br></br>
        <CFormInput
         type="text" 
         placeholder={priceDisplay}
         value={price}
         onChange={(e) => setPrice(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisiblePriceModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => updateName()}>Save changes</CButton>
        </CModalFooter>
      </CModal>


    </CContainer>
  )
}

export default Products
