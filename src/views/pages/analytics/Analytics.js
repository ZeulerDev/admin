import {
  CCol,
  CContainer,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CRow,
  CSpinner,
  CWidgetStatsA,
} from '@coreui/react'
import React, { useState,useEffect } from 'react'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.css'
import { format } from 'date-fns';
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
import { SET_ALERT } from '../../../context/context_reducer'

const Analytics = () => {
  const [selectedDates, setSelectedDates] = useState([])
  const [loading, setLoading] = useState(false)
  const [{user, token }, dispatch] = useAppContext()
  const [analyticsData, setAnalyticsData] = useState([])

  

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 30);
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(currentDate, 'yyyy-MM-dd');
    setSelectedDates([formattedStartDate, formattedEndDate])
    // loadData([formattedStartDate, formattedEndDate]);
  }, []);


  useEffect(() => {
    loadData(selectedDates);
  }, [selectedDates]);

  const handleDateRangeChange = (value) => {
    if (value) {
      const formattedStartDate = format(value[0], 'yyyy-MM-dd')
      const formattedEndDate = format(value[1], 'yyyy-MM-dd')
      setSelectedDates([formattedStartDate, formattedEndDate])
      console.log(formattedStartDate , formattedEndDate)
    } else {
      setSelectedDates([])
    }
  }

 
  const loadData = (date) => {
    if (date.length === 2) {
      console.log(date)
      setLoading(true)
    axios
      .get(`https://api.zeuler.com/panel/ue/kpi?start=${date[0]}&end=${date[1]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
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

      { loading ? <CSpinner/> : 
      
      <>
       <CRow xs={{ gutter: 4 }}>
         
          <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData.tot_orders ? analyticsData.tot_orders : 0} 
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Orders
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
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
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
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
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.aov?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                  Average Order Value
                  </h5>
                </>} />
            </CCol>
          </CRow><br></br>
          <CRow xs={{ gutter: 4 }}>
         <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.tot_value?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Value
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.tot_cost_product?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Cost Products
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.ave_order_rev?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Average Order Revenue
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                { analyticsData?.tot_rev?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Revenue
                  </h5>
                </>} />
            </CCol>
          
          </CRow><br></br>
          <CRow xs={{ gutter: 4 }}>
         <CCol sm={6} xl={4} xxl={3}>
            <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>

              { analyticsData?.ave_batch_cogs?.toFixed(2) || 0.00} €
            </h2>
            </>}
              title={<>
                <h5 className=" fw-normal">
                  Average Batch COGS
                </h5>
              </>} />
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.ave_order_cogs?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Average Order COGS
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.tot_cogs?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total COGS
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                { analyticsData?.ave_order_gross_profit?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Average Order Gross Profit
                  </h5>
                </>} />
            </CCol>
          
          </CRow><br></br>
          <CRow xs={{ gutter: 4 }}>
           <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.tot_gross_profit?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Gross Profit
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.grocess_margin?.toFixed(2) || 0} %
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Order Gross Margin (%)
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.ave_order_grocess_margin?.toFixed(2) || 0} %
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Average Order Gross Margin (%)
                  </h5>
                </>} />
            </CCol>
            
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                { analyticsData?.tot_driver_cost?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Driver Cost
                  </h5>
                </>} />
            </CCol>
          
          </CRow><br></br>
          <CRow xs={{ gutter: 4 }}>
         <CCol sm={6} xl={4} xxl={3}>
            <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
              {analyticsData?.ave_driver_cost_per_order?.toFixed(2) || 0.00} €
            </h2>
            </>}
              title={<>
                <h5 className=" fw-normal">
                  Average Driver Cost per Order
                </h5>
              </>} />
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>
            <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
              {analyticsData?.ave_driver_cost_per_driver?.toFixed(2) || 0.00} €
            </h2>
            </>}
              title={<>
                <h5 className=" fw-normal">
                  Average Driver Cost per Driver
                </h5>
              </>} />
          </CCol>
          <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.tot_picker_cost?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Picker Cost
                  </h5>
                </>} />
            </CCol>
            
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.ave_picker_cost_per_order?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Average Picker Cost per Order
                  </h5>
                </>} />
            </CCol>
          
          </CRow><br></br>
          <CRow xs={{ gutter: 4 }}>
         <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.ave_picker_cost_per_picker?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Average Picker Cost per Picker
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
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
            <CWidgetStatsA style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
              {analyticsData?.ave_driver_and_picker_cost_per_order?.toFixed(2) || 0.00} €
            </h2>
            </>}
              title={<>
                <h5 className=" fw-normal">
                  Average Driver and Picker Cost per Order
                </h5>
              </>} />
          </CCol>
            
          <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.ave_markup?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Average Markup
                  </h5>
                </>} />
            </CCol>
          
          </CRow><br></br>
          <CRow xs={{ gutter: 4 }}>
         <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.tot_markup?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Markup
                  </h5>
                </>} />
            </CCol>
            <CCol sm={6} xl={4} xxl={3}>
              <CWidgetStatsA  style={{ height: 160,backgroundColor:'#ff4d4d' }} value={<><h2>
                {analyticsData?.ave_small_order_fee?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Average Small Order Fee
                  </h5>
                </>} />
            </CCol>
          </CRow><br></br>
          </>
          
                  
      }
     
      
    </CContainer>
  )
}

export default Analytics
