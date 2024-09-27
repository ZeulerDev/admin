import React, { useState,useEffect } from 'react'
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
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdown,
    CSpinner,
  } from '@coreui/react'
  import { Link,useParams } from 'react-router-dom'
  import { useAppContext } from '../../../../context/AppContext'
  import axios from 'axios'
import { BASE_URL } from '../../../../context/config'
import { SET_ALERT } from '../../../../context/context_reducer'

const MarketDistance = ()=>{

  const { id } = useParams()
  const [{ user, token }, dispatch] = useAppContext()
  const [marketLocation, setMarketLocation] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingRoutes, setLoadingRoutes] = useState(false)

  useEffect(() => {
    loadData(id)
  },[user])

  const loadData = (id)=>{
    if(id){
      if (user && token) {
        setLoading(true)
        axios
          .get(BASE_URL+`market/group/distance/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setMarketLocation(res.data)
              setLoading(false)
            } else if (res.status === 500) {
              dispatch({
                type : SET_ALERT,
                payload : {
                  status : true,
                  title : 'Market group distance loading error',
                  message : res.data.message
                }
              })
            }
          }).catch((err) => {
            console.error('Error:', err)
          })
      }

    }else{
      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'Id Not found',
          color : 'danger',
        }
      })
    }
  }

  const fetchRoutes = (id)=>{
    if(user && token){
      setLoadingRoutes(true)
      axios.get(BASE_URL+`market/group/fetch/routes/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      .then((res)=>{
        if(res.status === 200){
          setLoadingRoutes(false)
          console.log('load data')
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Routes fetched',
              message : 'Routes fetched successfully',
              color : 'success'
            }
          })
          loadData(id)

          
        }else if(res.status === 500){
          dispatch({
            type : SET_ALERT,
            payload : {
              status : true,
              title : 'Routes fetching error',
              message : res.data.message,
              color : 'danger'
            }
          })
        }
      })


    }else{
      dispatch({
        type : SET_ALERT,
        payload : {
          status : true,
          title : 'User not found',
          message : 'Please login to continue'
        }
      })
    }
  }
 

  
    return(
        <CContainer>
            <CButton onClick={()=>{fetchRoutes(id)}} style={{ marginLeft: '82%', width: '17%', backgroundColor: '#ff4d4d', color: 'white' }}>
                   {loadingRoutes ? <CSpinner color="info" size="sm"/> : 
                   <>  Fetch Routes</>

                   }
                   
                 
            </CButton>
        <CNavbar style={{ marginTop: '1%' }} className="bg-body-tertiary">
       
        </CNavbar>
  
        {loading ? <CSpinner/> : <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Routers</CTableHeaderCell>
              <CTableHeaderCell scope="col">Distance</CTableHeaderCell>
              <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
              
            </CTableRow>
          </CTableHead>
          <CTableBody>
          {marketLocation.map((item, index) => (
            
              <CTableRow key={index}>
                <CTableDataCell>{index+1}</CTableDataCell>
                
                <CTableDataCell>
                {item.routeFlow.map((flow, flowIndex) => (
                  <div key={flowIndex}>{flow}</div>
               ))}

                </CTableDataCell>
                <CTableDataCell>{item.distance} m</CTableDataCell>
                <CTableDataCell>{item.duration} min</CTableDataCell>
              </CTableRow>
          ))}
          </CTableBody>
        </CTable>

        }
  
        {/* <CPagination aria-label="Page navigation example">
          <CPaginationItem>Previous</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination> */}
      </CContainer>
    )
}

export default MarketDistance


// Total Routes: [
//   {
//     origin: {
//       lat: 40.84389883325273,
//       lng: 14.233272543997437,
//       address: 'Via Archimede, 8, Milano',
//       _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//     },
//     destination: {
//       lat: 45.526714415675954,
//       lng: 9.17378568983078,
//       address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//     },
//     totalDuration: 27845,
//     totalDistance: 791262,
//     route: [ [Object] ]
//   },
//   {
//     origin: {
//       lat: 40.84389883325273,
//       lng: 14.233272543997437,
//       address: 'Via Archimede, 8, Milano',
//       _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//     },
//     destination: {
//       lat: 40.8723052759449,
//       lng: 14.235817805589758,
//       address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//     },
//     totalDuration: 753,
//     totalDistance: 4700,
//     route: [ [Object] ]
//   },
//   {
//     origin: {
//       lat: 45.526714415675954,
//       lng: 9.17378568983078,
//       address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//     },
//     destination: {
//       lat: 40.84389883325273,
//       lng: 14.233272543997437,
//       address: 'Via Archimede, 8, Milano',
//       _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//     },
//     totalDuration: 27799,
//     totalDistance: 791776,
//     route: [ [Object] ]
//   },
//   {
//     origin: {
//       lat: 45.526714415675954,
//       lng: 9.17378568983078,
//       address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//     },
//     destination: {
//       lat: 40.8723052759449,
//       lng: 14.235817805589758,
//       address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//     },
//     totalDuration: 27496,
//     totalDistance: 789997,
//     route: [ [Object] ]
//   },
//   {
//     origin: {
//       lat: 40.8723052759449,
//       lng: 14.235817805589758,
//       address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//     },
//     destination: {
//       lat: 40.84389883325273,
//       lng: 14.233272543997437,
//       address: 'Via Archimede, 8, Milano',
//       _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//     },
//     totalDuration: 801,
//     totalDistance: 4661,
//     route: [ [Object] ]
//   },
//   {
//     origin: {
//       lat: 40.8723052759449,
//       lng: 14.235817805589758,
//       address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//     },
//     destination: {
//       lat: 45.526714415675954,
//       lng: 9.17378568983078,
//       address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//     },
//     totalDuration: 27921,
//     totalDistance: 791609,
//     route: [ [Object] ]
//   },
//   {
//     origin: {
//       lat: 40.84389883325273,
//       lng: 14.233272543997437,
//       address: 'Via Archimede, 8, Milano',
//       _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//     },
//     waypoints: [ [Object] ],
//     destination: {
//       lat: 40.8723052759449,
//       lng: 14.235817805589758,
//       address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//     },
//     totalDuration: 55341,
//     totalDistance: 1581259,
//     route: [ [Object], [Object] ]
//   },
//   {
//     origin: {
//       lat: 40.84389883325273,
//       lng: 14.233272543997437,
//       address: 'Via Archimede, 8, Milano',
//       _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//     },
//     waypoints: [ [Object] ],
//     destination: {
//       lat: 45.526714415675954,
//       lng: 9.17378568983078,
//       address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//     },
//     totalDuration: 28674,
//     totalDistance: 796309,
//     route: [ [Object], [Object] ]
//   },
//   {
//     origin: {
//       lat: 45.526714415675954,
//       lng: 9.17378568983078,
//       address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//     },
//     waypoints: [ [Object] ],
//     destination: {
//       lat: 40.8723052759449,
//       lng: 14.235817805589758,
//       address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//     },
//     totalDuration: 28552,
//     totalDistance: 796476,
//     route: [ [Object], [Object] ]
//   },
//   {
//     origin: {
//       lat: 45.526714415675954,
//       lng: 9.17378568983078,
//       address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//     },
//     waypoints: [ [Object] ],
//     destination: {
//       lat: 40.84389883325273,
//       lng: 14.233272543997437,
//       address: 'Via Archimede, 8, Milano',
//       _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//     },
//     totalDuration: 28297,
//     totalDistance: 794658,
//     route: [ [Object], [Object] ]
//   },
//   {
//     origin: {
//       lat: 40.8723052759449,
//       lng: 14.235817805589758,
//       address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//     },
//     waypoints: [ [Object] ],
//     destination: {
//       lat: 45.526714415675954,
//       lng: 9.17378568983078,
//       address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//     },
//     totalDuration: 28646,
//     totalDistance: 795923,
//     route: [ [Object], [Object] ]
//   },
//   {
//     origin: {
//       lat: 40.8723052759449,
//       lng: 14.235817805589758,
//       address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//       _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//     },
//     waypoints: [ [Object] ],
//     destination: {
//       lat: 40.84389883325273,
//       lng: 14.233272543997437,
//       address: 'Via Archimede, 8, Milano',
//       _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//     },
//     totalDuration: 55720,
//     totalDistance: 1583385,
//     route: [ [Object], [Object] ]
//   }
// ]




// origin: {
//   lat: 40.84389883325273,
//   lng: 14.233272543997437,
//   address: 'Via Archimede, 8, Milano',
//   _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
// } destination: {
//   lat: 45.526714415675954,
//   lng: 9.17378568983078,
//   address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
// } waypoints: []
// origin: {
//   lat: 40.84389883325273,
//   lng: 14.233272543997437,
//   address: 'Via Archimede, 8, Milano',
//   _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
// } destination: {
//   lat: 40.8723052759449,
//   lng: 14.235817805589758,
//   address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
// } waypoints: []
// origin: {
//   lat: 45.526714415675954,
//   lng: 9.17378568983078,
//   address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
// } destination: {
//   lat: 40.84389883325273,
//   lng: 14.233272543997437,
//   address: 'Via Archimede, 8, Milano',
//   _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
// } waypoints: []
// origin: {
//   lat: 45.526714415675954,
//   lng: 9.17378568983078,
//   address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
// } destination: {
//   lat: 40.8723052759449,
//   lng: 14.235817805589758,
//   address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
// } waypoints: []
// origin: {
//   lat: 40.8723052759449,
//   lng: 14.235817805589758,
//   address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
// } destination: {
//   lat: 40.84389883325273,
//   lng: 14.233272543997437,
//   address: 'Via Archimede, 8, Milano',
//   _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
// } waypoints: []
// origin: {
//   lat: 40.8723052759449,
//   lng: 14.235817805589758,
//   address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
// } destination: {
//   lat: 45.526714415675954,
//   lng: 9.17378568983078,
//   address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
// } waypoints: []
// others: length 6
// origin: {
//   lat: 40.84389883325273,
//   lng: 14.233272543997437,
//   address: 'Via Archimede, 8, Milano',
//   _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
// } destination: {
//   lat: 40.8723052759449,
//   lng: 14.235817805589758,
//   address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
// } waypoints: [
//   {
//     lat: 45.526714415675954,
//     lng: 9.17378568983078,
//     address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//     _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//   }
// ]
// duration: 27942 distance: 794080
// duration: 27966 distance: 792517
// origin: {
//   lat: 40.84389883325273,
//   lng: 14.233272543997437,
//   address: 'Via Archimede, 8, Milano',
//   _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
// } destination: {
//   lat: 45.526714415675954,
//   lng: 9.17378568983078,
//   address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
// } waypoints: [
//   {
//     lat: 40.8723052759449,
//     lng: 14.235817805589758,
//     address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//     _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//   }
// ]
// duration: 753 distance: 4700
// duration: 28018 distance: 794427
// origin: {
//   lat: 45.526714415675954,
//   lng: 9.17378568983078,
//   address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
// } destination: {
//   lat: 40.8723052759449,
//   lng: 14.235817805589758,
//   address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
// } waypoints: [
//   {
//     lat: 40.84389883325273,
//     lng: 14.233272543997437,
//     address: 'Via Archimede, 8, Milano',
//     _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//   }
// ]
// duration: 28269 distance: 794296
// duration: 753 distance: 4700
// origin: {
//   lat: 45.526714415675954,
//   lng: 9.17378568983078,
//   address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
// } destination: {
//   lat: 40.84389883325273,
//   lng: 14.233272543997437,
//   address: 'Via Archimede, 8, Milano',
//   _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
// } waypoints: [
//   {
//     lat: 40.8723052759449,
//     lng: 14.235817805589758,
//     address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//     _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
//   }
// ]
// duration: 27966 distance: 792517
// duration: 801 distance: 4661
// origin: {
//   lat: 40.8723052759449,
//   lng: 14.235817805589758,
//   address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
// } destination: {
//   lat: 45.526714415675954,
//   lng: 9.17378568983078,
//   address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
// } waypoints: [
//   {
//     lat: 40.84389883325273,
//     lng: 14.233272543997437,
//     address: 'Via Archimede, 8, Milano',
//     _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
//   }
// ]
// duration: 801 distance: 4661
// duration: 27942 distance: 794080
// origin: {
//   lat: 40.8723052759449,
//   lng: 14.235817805589758,
//   address: 'Via Giuseppe Tartini, 4/A, 20158 Milano MI, Italy',
//   _id: new ObjectId('6618c8b78c9c48a7fa1c880a')
// } destination: {
//   lat: 40.84389883325273,
//   lng: 14.233272543997437,
//   address: 'Via Archimede, 8, Milano',
//   _id: new ObjectId('62b29f4ebfc13d66d0251fc1')
// } waypoints: [
//   {
//     lat: 45.526714415675954,
//     lng: 9.17378568983078,
//     address: 'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
//     _id: new ObjectId('6617c771fdd4c9cde96b5ac3')
//   }
// ]