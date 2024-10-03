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
  CPaginationItem, CCardImage,
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
  CModalFooter,
  CBadge,
  CRow,
  CCol
} from '@coreui/react'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'
import { Link } from 'react-router-dom'
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const Categories = () => {

  const [{ user, token }, dispatch] = useAppContext()
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState([])
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
  const [id, setId] = useState('')
  const [price, setPrice] = useState('')
  const [priceDisplay, setPriceDisplay] = useState('')
  const [resultCount, setResultCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState('NAME')

  const [imageUpload, setImageUpload] = useState(false)
  const [productId, setProductId] = useState('')

  const [selectedMainCategory, setSelectedMainCategory] = useState('All Main Categories')
  const [paramMainCategory, setParamCMainCategoryData] = useState('')
  const [mainCategoriesData, setMainCategoriesData] = useState([])
  const [mainCId, setMainCID] = useState('')

  const [selectedSubCategory, setSelectedSubCategory] = useState('Select Main Categories')
  const [paramSubCategory, setParamSubCategoryData] = useState('')
  const [subCategoriesData, setSubCategoriesData] = useState([])

  useEffect(() => {
    if (user && token) {
      loadData(0, true)
    }
  }, [user, token, paramMId, searchQuery, paramSubCategory, paramChainId])

  useEffect(() => {
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
                message: res.data.message
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }, [])

  useEffect(() => {
    if (token) {
      axios
        .get(BASE_URL + 'product/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data[1])
            setMainCategoriesData(res.data)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Main Category Loading error',
                message: 'Main Category loading error'
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
        BASE_URL+`assistant/market/locations?brand=${chainId}`,
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
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Market Loading error',
              message: res.data.message
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
      .get(BASE_URL + `product/category/all/${count}?marketId=${paramMId}&name=${searchQuery}&category=${paramSubCategory}&mainCategory=${mainCId}&chainId=${paramChainId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProductData(res.data.list)
          setResultCount(res.data.count)
          setLoading(false)
          if (res.data.list.length < 20) {
            setIsDisable(true)
            console.log("ok")
          } else if (res.data.list.length > 19) {
            setIsDisable(false)
          }
        } else if (res.status === 203) {
          setLoading(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'product loading error error',
              message: res.data.message
            }
          })
        } else if (res.status === 204) {
          setLoading(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'No Products',
              message: "No products found in this market address",
              color: 'info'
            }
          })
        } else if (res.status === 500) {
          setLoading(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'product loading error error',
              message: res.data.message
            }
          })
        }
      }).catch((error) => {
        setLoading(false)
        console.error('Error:', error)
      })
  }

  const mainCategory = (index, categoryName) => {
    if (index === 'all') {
      setParamCMainCategoryData('')
      setSelectedMainCategory('All Main Categories')
      setMainCID('')
    } else {
      setParamCMainCategoryData(index)
      loadDataSubCategories(index)
      setSelectedMainCategory(categoryName)
      setMainCID(index)
    }
  }

  const loadDataSubCategories = (id) => {
    if (token) {
      axios
        .get(BASE_URL + 'product/categories/sub/' + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setSubCategoriesData(res.data)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Sub Category Loading',
                message: 'Sub Category loading error'
              }
            })
          }
        }).catch((err) => {
          console.error('Error: ', err)
        })
    }
  }

  const subCategories = (index, subName) => {
    // console.log('index',index)
    if (index === 'all') {
      setParamSubCategoryData('')
      setSelectedSubCategory('Select Main Categories')
      setParamCMainCategoryData('')
      setSelectedMainCategory('All Main Categories')
      setSubCategoriesData([])
      setMainCID('')
    } else {
      console.log('index', index)
      setParamSubCategoryData(index)
      setSelectedSubCategory(subName)
    }
  }


  const chain = (chainId, chianName) => {
    if (chainId === 'all') {
      setParamChainData('')
      setSelectedChian('All Chains')
      setParamMarketData('')
      setSelectedMarket('All Markets')
    } else {
      setParamChainData(chainId)
      loadDataMarkets(chainId)
      setSelectedChian(chianName)
      setParamMarketData('')
      setSelectedMarket('All Markets')
    }
  }

  const market = (mId, marketName) => {
    if (mId === 'all') {
      setParamMarketData('')
      setSelectedMarket('All Markets')
      setParamChainData('')
      setSelectedChian('All Chains')
      setChainMarketData([])
    } else {
      setParamMarketData(mId)
      setSelectedMarket(marketName)
    }
  }


  const nextPage = () => {
    setCurrentPage(currentPage + 1)
    const c = itemsPerPage + 50
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1)
    const c = itemsPerPage - 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const handleToggleName = (id, name) => {
    setVisiblePriceModal(true)
    setId(id)
    setPriceDisplay(name)
  }

  const updateName = () => {
    console.log("called")
    if (price == '') {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Alert',
          message: 'Please enter the price',
          color: 'warning'
        }
      })
    } else {
      handleUpdate(id)
    }
  }

  const handlePages = (page) => {
    setCurrentPage(page);
    const c = (page - 1) * 50;
    setItemsPerPage(c);
    loadData(c, true);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(resultCount / 50);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const startIndex = Math.max(currentPage - 2, 1);
    const endIndex = Math.min(startIndex + 4, totalPages);
    const displayedPageNumbers = pageNumbers.slice(startIndex - 1, endIndex);
    return displayedPageNumbers.map((number) => (
      <CPaginationItem
        key={number}
        active={currentPage === number}
        onClick={() => handlePages(number)}
      >
        {number}
      </CPaginationItem>
    ));
  };

  const handleUpdate = (id) => {

    if (id) {
      let formData = {
        price: price + ' €'
      }

      if (user && token) {
        axios
          .put(BASE_URL + 'product/update/price/' + id, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {

              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Product Details Update',
                  message: 'Product price update Success',
                  color: 'success'
                }
              })
              setId('')
              setPrice('')
              loadData(0, true)
              setVisiblePriceModal(false)
              setPriceDisplay('')
            } else if (res.status === 204) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Product Details Update error',
                  message: res.data.message,
                  color: 'danger'
                }
              })
            } else if (res.status === 500) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Product Details Update error',
                  message: res.data.message,
                  color: 'danger'
                }
              })
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })

      }
    } else {
      alert('Please Check the Fields!')
    }

  }

  const handleToggleImageUploader = (id) => {
    setImageUpload(!imageUpload)
    setProductId(id)
  }

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageView, setUploadedImageView] = useState(null);

  const handleImageUpload = (file) => {
    console.log(file)
    setUploadedImageView(URL.createObjectURL(file))
    setUploadedImage(file)
  };


  const handleImageUploadSubmit = async (id, img) => {
    console.log(id, img)


    if (user && token) {

      const formData = new FormData();
      formData.append('image', img);
      formData.append('id', id);

      axios.post(BASE_URL + 'test/product/image/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setImageUpload(false)
            setProductId('')
            setUploadedImage(null)
            console.log('response', res.data)

            // const updatedEntity = res.data
            // const found = productData.find((f) => f.id === updatedEntity.id)
            // if(found){
            //   found.bonus = updatedEntity.bonus
            // }

            // setProductData([...productData])

            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Image upload ',
                message: 'Image upload success',
                color: 'success'
              }
            })
            loadData(0, true)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Image upload error',
                message: res.data.message,
                color: 'danger'
              }
            })

          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    }

  }


 

  return (
    <CContainer>

      <CBadge style={{ marginLeft: '14%' }} color="secondary">Filter by</CBadge>
      
      <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d' }}>
        <CDropdownToggle >{selectedMainCategory}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => mainCategory('all')}>All Main Category</CDropdownItem>
          {mainCategoriesData.map((item, index) => (
            <CDropdownItem onClick={() => mainCategory(index, item)} key={index}>
              {item}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>

      <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d' }}>
        <CDropdownToggle >{selectedSubCategory}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => subCategories('all')}>Clear Category</CDropdownItem>
          {subCategoriesData.map((item, index) => (
            <CDropdownItem onClick={() => subCategories(index, item)} key={index}>
              {item}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
      <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d' }}>
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


      <CDropdown style={{ marginLeft: '2%', width: '18%', backgroundColor: '#ff4d4d' }}>
        {/* <CDropdownToggle >{selectedMarket}</CDropdownToggle>
           */}
        <CDropdownToggle>
          {selectedMarket.length > 15 ? `${selectedMarket.substring(0, 15)}...` : selectedMarket}
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => market('all')}>Select the Chain</CDropdownItem>
          {chainMarket.map((item, index) => (

            <CDropdownItem onClick={() => market(item._id, item.address)} key={index}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{item.address.substring(0, item.address.length / 2)}</span>
                <span>{item.address.substring(item.address.length / 2)}</span>
              </div>
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>




      <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
        {/* <CBadge style={{ marginLeft: '0.2%' }} color="secondary">Select the seatch type</CBadge>
        <CDropdown style={{ marginRight: '0%', width: '17%', backgroundColor: '#ff4d4d' }}>
          <CDropdownToggle >{searchType} </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => setSearchType('NAME')}>By Name</CDropdownItem>
            <CDropdownItem onClick={() => setSearchType('ID')}>By Product Id</CDropdownItem>
            <CDropdownItem onClick={() => setSearchType('BRAND')}>By BRAND NAME</CDropdownItem>
          </CDropdownMenu>
        </CDropdown> */}
        <CFormInput
          type="text"
          placeholder="Search products by name, brand name and product id"
          style={{ width: 450, marginRight: '50%' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

      </CNavbar>

      {loading ? <CSpinner /> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Product Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
            <CTableHeaderCell scope="col">Chain</CTableHeaderCell>
            <CTableHeaderCell scope="col">Market Address</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {productData.map((item, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                <CTableDataCell>{item.pid}</CTableDataCell>
                <CTableHeaderCell onClick={() => { handleToggleImageUploader(item.productId) }}><CCardImage style={{ width: '50px', height: '50px' }} src={`https://api.zeuler.com/image/` + item.image} /></CTableHeaderCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.price}<Link to={``}><CIcon icon={cilPencil} size="sm" onClick={() => handleToggleName(item.productId, item.price)} /></Link></CTableDataCell>
                <CTableDataCell>{item.brand}</CTableDataCell>
                <CTableDataCell>{item.chainName}</CTableDataCell>
                <CTableDataCell>{item.marketAddress}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>

      }

      <CPagination aria-label="Page navigation example">
        <CPaginationItem
          disabled={itemsPerPage <= 0 ? true : false}
          onClick={previousPage}
        >
          Previous
        </CPaginationItem>
        {renderPageNumbers()}
        <CPaginationItem
          disabled={isDisable === true ? true : false}
          onClick={nextPage}
        >
          Next
        </CPaginationItem>
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
          {/* <CButton color="secondary" onClick={() => setVisiblePriceModal(false)}>
            Close
          </CButton> */}
          <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => updateName()}>Save changes</CButton>
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={imageUpload} scrollable size='lg'
        onClose={() => {
          setImageUpload(false)
          setUploadedImage(null)
          setUploadedImageView(null)
        }}>
        <CModalHeader closeButton>
          <CModalTitle>Image Uploader</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            uploadedImageView && <CCardImage style={{ width: '100px', height: '100px' }} src={uploadedImageView} alt="Uploaded Image" />
          }

          <input
            style={{ marginLeft: '5%' }}
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </CModalBody>
        <CModalFooter>

          <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => { handleImageUploadSubmit(productId, uploadedImage) }}>Upload Image</CButton>
        </CModalFooter>
      </CModal>


    </CContainer>
  )
}

export default Categories
