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
  CCol,
  CInputGroup,
  CDropdownDivider,
  CFormCheck
} from '@coreui/react'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'
import { Link } from 'react-router-dom'
import { cilBan, cilList, cilPen, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'

const CreateCategory = () => {

  const [{ user, token }, dispatch] = useAppContext()
  const [loading, setLoading] = useState(false)
  const [loadingAll, setLoadingAll] = useState(false)
  const [loadingAllCon, setLoadingAllCon] = useState(false)

  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [isDisable, setIsDisable] = useState(true)
  const [isDisableProduct, setIsDisableProduct] = useState(true)
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
  const [searchType, setSearchType] = useState('NAME')

  const [imageUpload, setImageUpload] = useState(false)
  const [productId, setProductId] = useState('')

  const [selectMarketIds, setSelectMarketIds] = useState([])
  const [selectedMarketForID, setSelectedMarketForID] = useState('Selected Market ')
  let [unMatchedCategories, setUnMatchedCategories] = useState([])
  let [unMatchedCategoriesAll, setUnMatchedCategoriesAll] = useState([])
  const [visible, setVisible] = useState(false)

  const [selectedMainCategory, setSelectedMainCategory] = useState('All Main Categories')
  const [paramMainCategory, setParamCMainCategoryData] = useState('')
  const [mainCategoriesData, setMainCategoriesData] = useState([])
  const [mainCId, setMainCID] = useState('')

  const [selectedSubCategory, setSelectedSubCategory] = useState('Select Main Categories')
  const [paramSubCategory, setParamSubCategoryData] = useState('')
  const [subCategoriesData, setSubCategoriesData] = useState([])
  const [newCategory, setNewCategory] = useState({
    mainCategory: '',
    subCategory: '',
    category: ''
  })
  const [selectedItem, setSelectedItem] = useState([])

  const [productData, setProductData] = useState([])
  const [resultCount, setResultCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemData, setItemData] = useState()
  const [visibleProducts, setVisibleProducts] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [itemsPerPageCategory, setItemsPerPageCategory] = useState(0)

  useEffect(() => {
    if (user && token) {
      if (paramMId === '') {
        setLoadingAllCon(true)
        searchNewCategoriesAll()

        console.log('ok')
      } else {
        setLoadingAllCon(false)
        console.log('no')
      }
      console.log('all')
    }
  }, [user, token, paramMId])

  useEffect(() => {
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

  const searchNewCategoriesAll = () => {
    if (user && token) {
      setLoadingAll(true)
      axios
        .get(BASE_URL + `product/category/check/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUnMatchedCategoriesAll(res.data)
            setLoadingAll(false)
            console.log(res.data.length)
          } else if (res.status === 204) {
            setLoadingAll(false)
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Unregistered Categories error',
                message: res.data.message,
                color: 'danger'
              }
            })
            setLoading(false)
          } else if (res.status === 500) {
            setLoadingAll(false)
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Unregistered Categories error',
                message: res.data.message,
                color: 'danger'
              }
            })
            setLoading(false)
          }
        })
        .catch((error) => {
          setLoadingAll(false)
          console.error('Error:', error)
          setLoading(false)
        })

    }
  }

  const loadDataMarkets = (chainId) => {
    axios
      .get(
        BASE_URL + `assistant/market/locations?brand=${chainId}`,
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



  const chain = (chainId, chianName) => {
    if (chainId === 'all') {
      setParamChainData('')
      setSelectedChian('All Chains')
      setParamMarketData('')
      setSelectedMarket('All Markets')
      setChainMarketData([])
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

    } else if (mId === 'select') {
      setSelectMarketIds([])
      setSelectedMarketForID('Selected Market ')
    } else {
      setParamMarketData(mId)
      setSelectedMarket(marketName)
      setSelectMarketIds([...selectMarketIds, { id: mId, name: marketName }]);
      setSelectedMarketForID(marketName)
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

  const searchNewCategories = (categories) => {
    if (categories.length > 0) {
      let formData = categories.map((item) => item.id)

      console.log(formData)

      if (user && token) {
        setLoading(true)
        axios
          .get(BASE_URL + `product/category/check?markets=${formData}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setUnMatchedCategories(res.data)
              setLoading(false)
              // dispatch({
              //   type: SET_ALERT,
              //   payload: {
              //     status: true,
              //     title: 'Unregistered Categories ',
              //     message: 'Unregistered Categories Loaded',
              //     color: 'success'
              //   }
              // })
            } else if (res.status === 204) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Unregistered Categories error',
                  message: res.data.message,
                  color: 'danger'
                }
              })
              setLoading(false)
            } else if (res.status === 500) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Unregistered Categories error',
                  message: res.data.message,
                  color: 'danger'
                }
              })
              setLoading(false)
            }
          })
          .catch((error) => {
            console.error('Error:', error)
            setLoading(false)
          })

      }

    } else {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Select Market',
          message: 'Please select the market to search',
          color: 'warning'
        }
      })
      setLoading(false)
    }

  }

  const handleCategoryModal = (item) => {
    console.log(item)
    selectedItem.push(item)
    setNewCategory({
      ...newCategory,
      category: item
    });
    setVisible(true)
  }

  const uploadCategory = () => {
    if (newCategory.mainCategory !== '' && newCategory.subCategory !== '') {
      console.log(newCategory)
      handleUpdateCategory()
      setVisible(false)
      setNewCategory({
        mainCategory: '',
        subCategory: '',
        category: ''
      })
    } else {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Check the fields',
          message: 'Please select the Main and Sub Category',
          color: 'warning'
        }
      })
    }
  }

  const handleUpdateCategory = () => {

    if (newCategory) {
      let formData = {
        category: newCategory
      }

      if (user && token) {
        axios
          .put(BASE_URL + 'product/add/category', formData, {
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
                  title: 'Category Update',
                  message: 'Category update Success',
                  color: 'success'
                }
              })
              // searchNewCategories(selectMarketIds)
              console.log(unMatchedCategories.length);
              console.log(selectedItem);
              const arr = unMatchedCategories.filter(category => !selectedItem.some(item => item.name === category.name));
              console.log(arr.length);
              setMainCID('')
              setParamSubCategoryData('')
              setUnMatchedCategories([...arr])


              // console.log(unMatchedCategories.length);
              // searchNewCategories(selectMarketIds)

            } else if (res.status === 204) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Category Update',
                  message: 'No category found',
                  color: 'danger'
                }
              })
            } else if (res.status === 500) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Category Update',
                  message: 'Category update error',
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
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Category Update',
          message: 'Please Check the Fields!',
          color: 'warning'
        }
      })
    }

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
      setNewCategory({
        ...newCategory,
        mainCategory: index,
      });
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
      setNewCategory({
        ...newCategory,
        subCategory: index
      });
    }
  }

  const handleProductView = (item) => {
    console.log(item)
    setItemData(item.id)
    setVisibleProducts(true)
    loadData(0, item.id)
  }

  const loadData = (count, item) => {
    setLoadingProduct(true)
    axios
      .get(BASE_URL + `product/unregistered/category/${count}?id=${item}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProductData(res.data.list)
          // console.log(res.data.list.length)
          setResultCount(res.data.count)
          setLoadingProduct(false)
          if (res.data.list.length < 50) {
            setIsDisableProduct(true)
            console.log("ok")
          } else if (res.data.list.length > 50) {
            setIsDisableProduct(false)
          }
        } else if (res.status === 203) {
          setLoadingProduct(false)
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'product loading error error',
              message: res.data.message
            }
          })
        } else if (res.status === 204) {
          setLoadingProduct(false)
          // dispatch({
          //   type: SET_ALERT,
          //   payload: {
          //     status: true,
          //     title: 'No Products',
          //     message: "No products found in this market address",
          //     color: 'info'
          //   }
          // })
        } else if (res.status === 500) {
          setLoadingProduct(false)
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
        setLoadingProduct(false)
        console.error('Error:', error)
      })
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
    const c = itemsPerPageCategory + 50
    setItemsPerPageCategory(c)
    loadData(c, itemData)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1)
    const c = itemsPerPageCategory - 50
    console.log(c)
    setItemsPerPageCategory(c)
    loadData(c, itemData)
  }

  const handleToggleName = (id, name) => {
    setVisiblePriceModal(true)
    setId(id)
    setPriceDisplay(name)
  }


  const handlePages = (page) => {
    setCurrentPage(page);
    const c = (page - 1) * 50;
    setItemsPerPageCategory(c);
    loadData(c, itemData);
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

  return (
    <CContainer>

      <CBadge style={{ marginLeft: '0%' }} color="secondary">Filter by</CBadge>
      <CDropdown style={{ marginLeft: '2%', width: '19%', backgroundColor: '#ff4d4d' }}>
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

      <CDropdown style={{ marginLeft: '1%', width: '19%', backgroundColor: '#ff4d4d' }}>
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
      <CBadge style={{ marginLeft: '4%' }} color="secondary">Selected Markets</CBadge>
      <CDropdown style={{ marginLeft: '2%', width: '19%', backgroundColor: '#ff4d4d' }}>
        <CDropdownToggle>
          {selectedMarketForID.length > 15 ? `${selectedMarketForID.substring(0, 15)}...` : selectedMarketForID}
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => market('select')}>Select the Chain</CDropdownItem>
          {selectMarketIds.map((item, index) => (
            <CDropdownItem key={index}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{item.name.substring(0, item.name.length / 2)}</span>
                <span>{item.name.substring(item.name.length / 2)}</span>
              </div>
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>

      <CButton style={{ marginLeft: '1%', backgroundColor: '#ff4d4d', color: 'white', width: '19%' }} onClick={() => { searchNewCategories(selectMarketIds) }}>Search</CButton>
      <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">

      </CNavbar>

      {
        loadingAllCon ?
          loadingAll ? <CSpinner /> : <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Chain Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Insert</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {unMatchedCategoriesAll.length === 0 ? (
                                    <CTableRow>
                                        <CTableDataCell colSpan="5" style={{ textAlign: 'center', backgroundColor: "white" }}>
                                            <h6 style={{ marginTop: "1%" }}>No Data</h6>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) : (
              unMatchedCategoriesAll.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>
                      {/* {item.chainName.map((chain, index) => (
            <span key={index}>{chain} / </span>
          ))} */}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleCategoryModal(item) }}>
                        <CIcon icon={cilPen} size='lg' style={{ color: 'white' }} />
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleProductView(item) }}>
                        <CIcon icon={cilList} size='lg' style={{ color: 'white' }} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })
            )}
            </CTableBody>
          </CTable>

          :
          loading ? <CSpinner /> : <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Chain Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Insert</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {unMatchedCategories.length === 0 ? (
                                    <CTableRow>
                                        <CTableDataCell colSpan="5" style={{ textAlign: 'center', backgroundColor: "white" }}>
                                            <h6 style={{ marginTop: "1%" }}>No Data</h6>
                                        </CTableDataCell>
                                    </CTableRow>
                                ) : (
              unMatchedCategories.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>
                      {item.chainName.map((chain, index) => (
                        <span key={index}>{chain} / </span>
                      ))}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleCategoryModal(item) }}>
                        <CIcon icon={cilPen} size='lg' style={{ color: 'white' }} />
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton size='sm' style={{ backgroundColor: '#ff4d4d' }} variant="outline" onClick={() => { handleProductView(item) }}>
                        <CIcon icon={cilList} size='lg' style={{ color: 'white' }} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })
            )}
            </CTableBody>
          </CTable>

      }
      {/* <CPagination aria-label="Page navigation example">
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
        </CPagination> */}

      <CModal alignment="center" visible={visible} scrollable size='lg' onClose={() => {
        setMainCID('')
        setParamSubCategoryData('')
        setVisible(false)
      }
      }>
        <CModalHeader closeButton>
          <CModalTitle>Add Category</CModalTitle>
        </CModalHeader>
        <CModalBody>

          <CRow>
            <CCol md={6}>
              <a style={{ fontSize: 17, fontWeight: 'bold' }}>Select the Main Category</a><br></br><br></br>

              {mainCategoriesData.map((item, index) => (
                <CFormCheck
                  onChange={() => mainCategory(index, item)}
                  key={index}
                  type="radio"
                  name="mainCategoryRadio"
                  id={`flexRadioDefault${index}`}
                  label={item}
                  checked={mainCId === index}
                />
              ))}


            </CCol>
            <CCol md={6}>
              <a style={{ fontSize: 17, fontWeight: 'bold' }}>Select the Sub Category</a><br></br><br></br>
              {subCategoriesData.map((item, index) => (
                <CFormCheck onChange={() => subCategories(index, item)} key={index} checked={paramSubCategory === index} type="radio" name="subCategory" id={`flexRadioDefault2-${index}`} label={item} />
              ))}
            </CCol >
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => { uploadCategory() }}>Save</CButton>
        </CModalFooter>
      </CModal>


      <CModal alignment="center" visible={visibleProducts} scrollable size='xl' onClose={() => {
        setVisibleProducts(false)
        setProductData([])
        setResultCount(0)
        setCurrentPage(1)
        setItemsPerPageCategory(0)
      }
      }>
        <CModalHeader closeButton>
          <CModalTitle>View Products</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {loadingProduct ? <CSpinner /> : <CTable>
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
              {productData.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="8" style={{ textAlign: 'center', backgroundColor: "white" }}>
                    <h6 style={{ marginTop: "1%" }}>No Data</h6>
                  </CTableDataCell>
                </CTableRow>
              ) : (
                productData.map((item, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{itemsPerPageCategory + index + 1}</CTableDataCell>
                      <CTableDataCell>{item.pid}</CTableDataCell>
                      <CTableHeaderCell onClick={() => { }}><CCardImage style={{ width: '50px', height: '50px' }} src={`https://api.zeuler.com/image/` + item.image} /></CTableHeaderCell>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>{item.price}<Link to={``}></Link></CTableDataCell>
                      <CTableDataCell>{item.brand}</CTableDataCell>
                      <CTableDataCell>{item.chainName}</CTableDataCell>
                      <CTableDataCell>{item.marketAddress}</CTableDataCell>
                    </CTableRow>
                  )
                })
              )}
            </CTableBody>
          </CTable>

          }
        </CModalBody>
        <CModalFooter>
          <CPagination aria-label="Page navigation example">
            <CPaginationItem
              disabled={itemsPerPageCategory <= 0 ? true : false}
              onClick={previousPage}
            >
              Previous
            </CPaginationItem>
            {renderPageNumbers()}
            <CPaginationItem
              disabled={isDisableProduct === true ? true : false}
              onClick={nextPage}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CModalFooter>
      </CModal>



    </CContainer>
  )
}

export default CreateCategory
