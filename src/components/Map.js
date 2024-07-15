import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useAppContext } from "../context/AppContext";
 
import { SET_ALERT } from './../context/context_reducer';



const createRoutineMachineLayer = ({data}) => {
console.log(data)
  const [{ user, token }, dispatch] = useAppContext()
  const [batchMarketsData, setBatchMarketsData] = useState([])
  setBatchMarketsData(id)
  let market = [];

  // useEffect(() => {
  //   console.log('data')
  //   if (user && token) {
  //     axios
  //     .get('https://15.160.211.157/assistant/batch/markets/' + id, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log('data',res.data)
  //         setBatchMarketsData(res.data)
  //         market = res.data
      
  //          } else if (res.status === 203) {
  //           dispatch({
  //             type: SET_ALERT,
  //             payload: {
  //               status: true,
  //               title: 'Batch markets loading error',
  //               message: res.data.message,
  //             },
  //           })
  //         }else if (res.status === 204) {
  //           dispatch({
  //             type: SET_ALERT,
  //             payload: {
  //               status: true,
  //               title: 'Batch markets loading error',
  //               message: res.data.message,
  //             },
  //           })
  //         } else if (res.status === 500) {
  //         dispatch({
  //           type: SET_ALERT,
  //           payload: {
  //             status: true,
  //             title: 'Batch markets loading error',
  //             message: res.data.message,
  //           },
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  //   }
  // }, [])
 

  const waypoints = batchMarketsData.markets?.map(item => L.latLng(item.lat, item.lng));
  const instance = L.Routing.control({
    waypoints: waypoints,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: true
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;