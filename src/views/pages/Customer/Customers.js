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
  CPagination,
  CPaginationItem,
  CCardImage,
  CSpinner,
  CCol,
  CFormInput
} from '@coreui/react'

import {
  cilInfo,
  cilList,
  cilNotes,
  cilPencil,
} from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT, SET_TOKEN } from '../../../context/context_reducer'
import CIcon from '@coreui/icons-react'
import { BASE_URL } from '../../../context/config'


const Customer = () => {
  const [visible, setVisible] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const navigate = useNavigate()
  const [customerData, setCustomerData] = useState([])
  const [customerAddressData, setAddressCustomerData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingAddress, setLoadingAddress] = useState(false)
  const [loadingMain, setLoadingMain] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(0)

  const [visibleCustomer, setVisibleCustomer] = useState(false)
  const [customerEditObj, setCustomerEditObj] = useState([])
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [isDisable, setIsDisable] = useState(true)
  const [resultCount, setResultCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPageAddress, setItemsPerPageAddress] = useState(0)
  const [currentPageAddress, setCurrentPageAddress] = useState(1)
  const [resultCountAddress, setResultCountAddress] = useState(0)
  const [isDisableAddress, setIsDisableAddress] = useState(true)
  const [addressId, setAddressId] = useState('')

  const [passCode, setPassCode] = useState('')
  const [passCodeReEnter, setPassCodeReEnter] = useState('')
  const [visiblePasswordModal, setVisiblePasswordModal] = useState(false)

  const [imageUpload, setImageUpload] = useState(false)
  const [userId, setProductId] = useState('')
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
      setLoadingMain(false);
    }, 20000);

    if (user && token) {
      loadData(0, timer)
    }

    return () => {
      clearTimeout(timer);
    };
  }, [user, token, debouncedSearchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.length >= 3) {
        setDebouncedSearchQuery(searchQuery);
      } else if (searchQuery.length === 0) {
        setDebouncedSearchQuery(searchQuery);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const loadData = (count, timer) => {
    setLoadingMain(true)
    axios.get(BASE_URL + 'assistant/customers/' + count + '?email=' + searchQuery, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setCustomerData(res.data.list)
          setResultCount(res.data.count)

          setLoadingMain(false)
          clearTimeout(timer);
          console.log(BASE_URL)
          if (res.data.list.length < 50) {
            setIsDisable(true)
            console.log("ok")
          } else if (res.data.list.length > 49) {
            setIsDisable(false)
          }

        } else if (res.status === 500) {
          dispatch({
            type: SET_ALERT,
            payload: {
              status: true,
              title: 'Customers loading error',
              message: res.data.message
            }
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    const c = itemsPerPage + 50
    setItemsPerPage(c)
    loadData(c, true)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    const c = itemsPerPage - 50
    console.log(c)
    setItemsPerPage(c)
    loadData(c, false)
  }

  const nextPageAddress = () => {
    setCurrentPageAddress(currentPageAddress + 1);
    const c = itemsPerPageAddress + 20
    setItemsPerPageAddress(c)
    handleToggle(addressId, c)
  }

  const previousPageAddress = () => {
    setCurrentPageAddress(currentPageAddress - 1);
    const c = itemsPerPageAddress - 20
    console.log(c)
    setItemsPerPageAddress(c)
    handleToggle(addressId, c)
  }

  const mangeAddressModal = (id) => {
    setVisible(!visible)
    setAddressId(id)
    handleToggle(id, 0)
  }


  const handleToggle = (id, count) => {
    setAddressId(id)
    if (token) {
      setLoadingAddress(true)
      axios
        .get(BASE_URL + `assistant/addresses/customer/${count}/` + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.count)
            setAddressCustomerData(res.data.list)
            setResultCountAddress(res.data.count)
            if (res.data.list.length < 20) {
              setIsDisableAddress(true)
              console.log("ok")
            } else if (res.data.list.length > 19) {
              setIsDisableAddress(false)
            }
            setLoadingAddress(false)
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Customers address error',
                message: res.data.message
              }
            })
          }
        }).catch((error) => {
          console.error('Customers address:', error)
        })
    }
  }

  const handleToggleCustomer = (customerObj) => {
    console.log(customerObj)
    setVisibleCustomer(!visibleCustomer)
    setCustomerEditObj(customerObj)
    setName(customerObj.name)
    setSurname(customerObj.surname)
    setEmail(customerObj.email)
    setPhone(customerObj.contact)
  }

  const handleSubmit = () => {
    if (name && surname && email && phone) {

      const formData = {
        name: name,
        surname: surname,
        email: email,
        contact: phone
      }

      const id = customerEditObj._id
      console.log('id', id)

      if (user, token) {
        if (user && token) {
          axios
            .patch(BASE_URL + 'assistant/customers/update/' + id, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                setVisibleCustomer(false)
                loadData(0, true)
                const updatedEntity = res.data
                const list = customerData.map((item) => {
                  if (item.id === updatedEntity.id) {
                    return updatedEntity
                  } else {
                    return item
                  }
                })
                setCustomerData([...list])

                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Customer update',
                    message: 'Customer updated successfully',
                    color: 'success'
                  }
                })

              } else if (res.status === 203) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Customer update error',
                    message: '203',
                    color: 'warning'
                  }
                })
              } else if (res.status === 204) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Customer update error',
                    message: '204',
                    color: 'warning'
                  }
                })
              } else if (res.status === 500) {
                dispatch({
                  type: SET_ALERT,
                  payload: {
                    status: true,
                    title: 'Customer update error',
                    message: '500',
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
          message: 'Customer update error, Please Check the input fields',
          color: 'warning'
        }
      })

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

  const handlePagesAddress = (page) => {
    setCurrentPageAddress(page);
    const c = (page - 1) * 20;
    setItemsPerPageAddress(c);
    handleToggle(addressId, c);
  };

  const renderPageNumbersAddress = () => {
    const totalPages = Math.ceil(resultCountAddress / 20);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const startIndex = Math.max(currentPageAddress - 2, 1);
    const endIndex = Math.min(startIndex + 4, totalPages);
    const displayedPageNumbers = pageNumbers.slice(startIndex - 1, endIndex);
    return displayedPageNumbers.map((number) => (
      <CPaginationItem
        key={number}
        active={currentPageAddress === number}
        onClick={() => handlePagesAddress(number)}
      >
        {number}
      </CPaginationItem>
    ));
  };

  const handleTogglePassword = () => {
    setVisibleCustomer(false)
    setVisiblePasswordModal(true)

  }

  const updatePassword = (id) => {
    if (passCode === '' || passCodeReEnter === '') {
      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Password update error',
          message: 'Check the input fields',
          color: 'warning'
        }
      })

    } else if (passCode === passCodeReEnter) {
      const data = {
        password: passCode
      }

      console.log(data, id)
      if (user && token) {
        axios
          .patch(BASE_URL + 'assistant/customers/update/' + id, data, {
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
            } else if (res.status === 203) {
              dispatch({
                type: SET_ALERT,
                payload: {
                  status: true,
                  title: 'Password update error',
                  message: res.data.message
                }
              })
            } else if (res.status === 204) {
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
    } else if (passCode !== passCodeReEnter) {

      dispatch({
        type: SET_ALERT,
        payload: {
          status: true,
          title: 'Password update error',
          message: 'Password does not match',
          color: 'warning'
        }
      })

    } else {
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

      axios.post(BASE_URL + 'test/customer/image/update', formData, {
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
    <CContainer >
      <CNavbar className="bg-body-tertiary">
        <CFormInput
          type="text"
          placeholder="Search by customer name, surname, email and contact"
          style={{ width: 450, marginLeft: '0%' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}

        />
      </CNavbar >

      {loadingMain ? <CSpinner /> : <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Surname</CTableHeaderCell>
            <CTableHeaderCell scope="col">email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">Language</CTableHeaderCell>
            <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">List</CTableHeaderCell>
            <CTableHeaderCell scope="col">Order</CTableHeaderCell>
            {/* <CTableHeaderCell scope="col">Products</CTableHeaderCell> */}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {customerData.length === 0? <h6 style={{marginTop:"1%"}}>No data</h6> :
          customerData.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{itemsPerPage + index + 1}</CTableDataCell>
              <CTableHeaderCell onClick={() => { handleToggleImageUploader(item._id) }}><CCardImage style={{ width: 50, height: 50, borderRadius: 10 }} src={`https://api.zeuler.com/image/` + item.photo} /></CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.surname}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>{item.contact}</CTableDataCell>
              <CTableDataCell>{item.country === "it" || item.country === 'Italy' ? 'Italy' : item.country}</CTableDataCell>
              <CTableDataCell>{item.language === 'en' ? 'English' : item.language === 'it' ? 'Italy' : item.language}</CTableDataCell>
              <CTableDataCell>
                <Link>
                  <CIcon icon={cilPencil} size='xl' onClick={() => handleToggleCustomer(item)} />
                </Link>
              </CTableDataCell>
              <CTableDataCell>
                <Link>
                  <CIcon icon={cilInfo} size='xl' onClick={() => mangeAddressModal(item._id)} />
                </Link>


              </CTableDataCell>
              <CTableDataCell>
                <Link to={`/customers/list/${item._id}`}>
                  <CIcon icon={cilNotes} size='xl' />
                </Link>
              </CTableDataCell>
              <CTableDataCell>
                <Link to={`/customers/items/${item._id}`}>
                  <CIcon icon={cilList} size='xl' />
                </Link>
              </CTableDataCell>
            </CTableRow>
          ))}
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

      {/* <CPagination aria-label="Page navigation example">
        <CPaginationItem disabled={itemsPerPage <= 0 ? true : false} onClick={previousPage}>Previous</CPaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <CPaginationItem key={index} active={itemsPerPage === index * 50} onClick={() => handlePage(index + 1)}>
            {index + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem disabled={isDisable === true ? true : false} onClick={nextPage}>Next</CPaginationItem>
      </CPagination> */}

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

          <CButton style={{ backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => { handleImageUploadSubmit(userId, uploadedImage) }}>Upload Image</CButton>
        </CModalFooter>
      </CModal>


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
          <CButton type="submit" style={{ marginBottom: '3%', backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => { updatePassword(customerEditObj._id) }}>
            Update
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={visible} scrollable size='xl'
        onClose={() => {
          setVisible(false)
          setItemsPerPageAddress(0)
          setCurrentPageAddress(1)
          setIsDisableAddress(true)
          setAddressId('')
        }}>
        <CModalHeader closeButton>
          <CModalTitle>Used Addresses</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ overflowY: 'auto', maxHeight: '70vh', display: "flex", justifyContent: 'center' }}>

          {
            loadingAddress ? <CSpinner /> : <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Intercom</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Flat</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Street</CTableHeaderCell>
                  <CTableHeaderCell scope="col">House Number</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {customerAddressData.map((items, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{itemsPerPageAddress + index + 1}</CTableDataCell>
                    <CTableDataCell>{items.name}</CTableDataCell>
                    <CTableDataCell>{items.intercom}</CTableDataCell>
                    <CTableDataCell>{items.flat}</CTableDataCell>
                    <CTableDataCell>{items.street}</CTableDataCell>
                    <CTableDataCell>{items.houseNumber}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          }


        </CModalBody>
        <CModalFooter>
          <CPagination aria-label="Page navigation example">
            <CPaginationItem
              disabled={itemsPerPageAddress <= 0 ? true : false}
              onClick={previousPageAddress}
            >
              Previous
            </CPaginationItem>
            {renderPageNumbersAddress()}
            <CPaginationItem
              disabled={isDisableAddress === true ? true : false}
              onClick={nextPageAddress}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CModalFooter>
      </CModal>


      <CModal visible={visibleCustomer} scrollable size="lg" onClose={() => setVisibleCustomer(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Customer Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row g-3">
            <CCol md={6}>
              <CFormInput
                id="name"
                label="Firt Name"
                defaultValue={customerEditObj.name}
                onChange={(e) => setName(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="surname"
                label="LastName"
                defaultValue={customerEditObj.surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="email"
                label="Email"
                defaultValue={customerEditObj.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="phone"
                label="Contact Number"
                defaultValue={customerEditObj.contact}
                onChange={(e) => setPhone(e.target.value)}
              />
            </CCol>

            <CCol xs={6}>
              <CButton type="submit" style={{ marginBottom: '3%', width: '200px', backgroundColor: '#ff4d4d', color: 'white' }} onClick={() => handleSubmit()}>
                Update Customer
              </CButton>
            </CCol>
            <CCol xs={6}>
              <span style={{ fontSize: 15, color: 'red', cursor: 'pointer', marginLeft: '64%', marginTop: '10%' }} onClick={() => handleTogglePassword()}>Change Password</span>
            </CCol>
          </div>
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleCustomer(false)}>
            Close
          </CButton>
        </CModalFooter> */}
      </CModal>

    </CContainer>
  )
}

export default Customer