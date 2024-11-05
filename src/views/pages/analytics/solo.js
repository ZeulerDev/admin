import {
  CCol,
  CContainer,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CRow,
  CWidgetStatsA,
  CNav, CNavLink,
  CSpinner

} from '@coreui/react'

import React, { useState, useEffect } from 'react'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.css'
import { format } from 'date-fns';
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'

const Analytics = () => {
  const [selectedDates, setSelectedDates] = useState([])
  const [loading, setLoading] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [analyticsData, setAnalyticsData] = useState([])
  const [analyticsData2, setAnalyticsData2] = useState([])
  const [activeTab, setActiveTab] = useState('tab1');



  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 30);
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(currentDate, 'yyyy-MM-dd');
    setSelectedDates([formattedStartDate, formattedEndDate])
    // loadData([formattedStartDate, formattedEndDate]);
  }, [activeTab]);


  useEffect(() => {
    loadData(selectedDates);
    loadDataTab2(selectedDates);

  }, [selectedDates]);


  const handleDateRangeChange = (value) => {
    if (value) {
      const formattedStartDate = format(value[0], 'yyyy-MM-dd')
      const formattedEndDate = format(value[1], 'yyyy-MM-dd')
      setSelectedDates([formattedStartDate, formattedEndDate])
      console.log(formattedStartDate, formattedEndDate)
    } else {
      setSelectedDates([])
    }
  }


  const loadData = (date) => {
    if (date.length === 2) {
      console.log(date)
      setLoading(true)
      axios
        .get(`https://api.zeuler.com/panel/solo/ue/tab1/kpi?start=${date[0]}&end=${date[1]}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data)
            setAnalyticsData(res.data)
            setLoading(false)


          } else if (res.status === 204) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Analytics Data loading error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Analytics Data loading error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }


  }

  const loadDataTab2 = (date) => {
    if (date.length === 2) {
      console.log(date)
      setLoading(true)
      axios
        .get(`https://api.zeuler.com/panel/solo/ue/tab2/kpi?start=${date[0]}&end=${date[1]}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data)
            setAnalyticsData2(res.data)
            setLoading(false)


          } else if (res.status === 204) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Analytics Data loading error',
                message: res.data.message,
              },
            })
          } else if (res.status === 500) {
            dispatch({
              type: SET_ALERT,
              payload: {
                status: true,
                title: 'Analytics Data loading error',
                message: res.data.message,
              },
            })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }


  }

  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">

        <DateRangePicker
          style={{ marginLeft: 15 }}
          format="yyyy/MM/dd"
          onChange={handleDateRangeChange}
          value={selectedDates.length > 0 ? [new Date(selectedDates[0]), new Date(selectedDates[1])] : null}
        />
      </CNavbar>
      <br></br>

      {loading ? <CSpinner /> :

      <div>
      <CNav variant="tabs">
        <CNavLink
          active={activeTab === 'tab1'}
          onClick={() => {
            setActiveTab('tab1')
          }}
        >
          Tab 1
        </CNavLink>
        <CNavLink
          active={activeTab === 'tab2'}
          onClick={() => {
            setActiveTab('tab2')
          }}
        >
          Tab 2
        </CNavLink>
      </CNav>
      <CRow>
      
        <CCol>
        <br></br>
          {activeTab === 'tab1' && 
          <>
         <div>
         <CRow >
         
         <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d',color:'white' }} value={<><h2>
               {analyticsData.tot_orders  ? analyticsData.tot_orders : 0} 
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                   Total Orders
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d',color:'white' }} value={<><h2>
               {analyticsData.tot_batches ? analyticsData.tot_batches : 0}
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                   Total Batches
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d',color:'white' }} value={<><h2>
               {analyticsData?.ave_orders_per_batch?.toFixed(2) || 0.00} 
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                   Average Orders Per Batch
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.tot_driver_cost ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Total Solo-Driver Cost
                 </h5>
               </>} />
           </CCol>
         </CRow><br></br>
         <CRow>
        <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_driver_cost_per_order ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Solo-Driver Cost per Order
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.tot_markup ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Total Markup
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_markup ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Markup
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               { analyticsData?.aov ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Order Value(AOV)
                 </h5>
               </>} />
           </CCol>
         
         </CRow><br></br>
         <CRow >
        <CCol sm={6} xl={4} xxl={3}>
           <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>

             { analyticsData?.tot_value ?.toFixed(2) || 0.00} €
           </h2>
           </>}
             title={<>
               <h5 className=" fw-normal">
               Total Value
               </h5>
             </>} />
         </CCol>
         <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_batch_value ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Batch Value(ABV)
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_order_grocess_rev ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Order Gross Revenue
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               { analyticsData?.tot_gross_rev ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Total Gross Revenue
                 </h5>
               </>} />
           </CCol>
         
         </CRow><br></br>
         <CRow >
          <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' , color:'white'}} value={<><h2>
               {analyticsData?.ave_batch_gross_rev ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Batch Gross Revenue
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.order_cogs ?.toFixed(2) || 0} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Order COGS
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_order_cogs ?.toFixed(2) || 0} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Order COGS
                 </h5>
               </>} />
           </CCol>
           
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               { analyticsData?.ave_batch_cogs ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Batch COGS
                 </h5>
               </>} />
           </CCol>
         
         </CRow><br></br>
         <CRow >
        <CCol sm={6} xl={4} xxl={3}>
           <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
             {analyticsData?.tot_cogs ?.toFixed(2) || 0.00} €
           </h2>
           </>}
             title={<>
               <h5 className=" fw-normal">
               Total COGS
               </h5>
             </>} />
         </CCol>
         <CCol sm={6} xl={4} xxl={3}>
           <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
             {analyticsData?.ave_order_net_rev ?.toFixed(2) || 0.00} €
           </h2>
           </>}
             title={<>
               <h5 className=" fw-normal">
               Average Order Net Revenue
               </h5>
             </>} />
         </CCol>
         <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.tot_net_rev ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Total Net Revenue
                 </h5>
               </>} />
           </CCol>
           
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_batch_net_rev ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Total Cost Revenue
                 </h5>
               </>} />
           </CCol>
         
         </CRow><br></br>
         <CRow >
        <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_order_cost_rev  ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Order Cost Revenue
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.tot_driver_and_picker_cost?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                   Total Driver and Picker Cost
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
           <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
             {analyticsData?.ave_batch_cost_rev ?.toFixed(2) || 0.00} €
           </h2>
           </>}
             title={<>
               <h5 className=" fw-normal">
               Average Batch Cost Revenue
               </h5>
             </>} />
         </CCol>
           
         <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_order_gross_profit ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Order Gross Profit
                 </h5>
               </>} />
           </CCol>
         
         </CRow><br></br>
         <CRow >
        <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_batch_gross_profit ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Batch Gross Profit
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.tot_gross_profit ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Total Gross Profit
                 </h5>
               </>} />
           </CCol>
           <CCol sm={6} xl={4} xxl={3}>
             <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
               {analyticsData?.ave_order_grocess_margin  ?.toFixed(2) || 0.00} €
             </h2>
             </>}
               title={<>
                 <h5 className=" fw-normal">
                 Average Order Grocess Profit
                 </h5>
               </>} />
           </CCol>
         </CRow><br></br>
         </div>
         
        
          </>}
          {activeTab === 'tab2' && 
            <>
            <div>
            <CRow >
            
            <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d',color:'white' }} value={<><h2>
                  {analyticsData2.tot_orders  ? analyticsData2.tot_orders : 0} 
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                      Total Orders
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d',color:'white' }} value={<><h2>
                  {analyticsData2.tot_batches ? analyticsData2.tot_batches : 0}
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                      Total Batches
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d',color:'white' }} value={<><h2>
                  {analyticsData2?.ave_orders_per_batch?.toFixed(2) || 0.00} 
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                      Average Orders Per Batch
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  {analyticsData2?.tot_driver_cost ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Total Solo-Driver Cost
                    </h5>
                  </>} />
              </CCol>
            </CRow><br></br>
            <CRow>
           <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  {analyticsData2?.ave_driver_cost_per_order  ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Average Solo-Driver Cost per Order
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  {analyticsData2?.tot_markup ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Total Markup
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  {analyticsData2?.ave_markup ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Average Markup
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  { analyticsData2?.order_cogs  ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Order COGS
                    </h5>
                  </>} />
              </CCol>
            
            </CRow><br></br>
            <CRow >
           <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
   
                { analyticsData2?.ave_order_cogs  ?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                  Average Order COGS
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  {analyticsData2?.ave_batch_cogs  ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Average Batch COGS
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  {analyticsData2?.tot_cogs  ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Total COGS
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  { analyticsData2?.ave_order_gross_profit   ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Average Order Gross Profit
                    </h5>
                  </>} />
              </CCol>
            
            </CRow><br></br>
            <CRow >
             <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' , color:'white'}} value={<><h2>
                  {analyticsData2?.ave_batch_gross_profit  ?.toFixed(2) || 0.00} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Average Batch Gross Profit
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  {analyticsData2?.tot_gross_profit  ?.toFixed(2) || 0} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Total Gross Profit
                    </h5>
                  </>} />
              </CCol>
              <CCol sm={6} xl={4} xxl={3}>
                <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d', color:'white' }} value={<><h2>
                  {analyticsData2?.ave_order_grocess_margin  ?.toFixed(2) || 0} €
                </h2>
                </>}
                  title={<>
                    <h5 className=" fw-normal">
                    Average Order Grocess Profit
                    </h5>
                  </>} />
              </CCol>
              
            </CRow><br></br>
            </div>
            
           
             </>}
        </CCol>
      </CRow>
    </div>



      }


    </CContainer>
  )
}

export default Analytics
