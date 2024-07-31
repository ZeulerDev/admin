import React, { useEffect, useState } from 'react'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CSpinner,
  CWidgetStatsA,
} from '@coreui/react'

import { format } from 'date-fns';
import { useAppContext } from '../../context/AppContext';
import { SET_ALERT } from '../../context/context_reducer'
import axios from 'axios'
import { getStyle } from '@coreui/utils'

import { CChart, CChartLine } from '@coreui/react-chartjs';
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.css'
import { Date } from 'core-js';

const Dashboard = () => {

  const [selectedDates, setSelectedDates] = useState([])
  const [selectedDatesGraph, setSelectedDatesGraph] = useState([])
  const [loading, setLoading] = useState(false)
  const [{ user, token }, dispatch] = useAppContext()
  const [analyticsData, setAnalyticsData] = useState([])
  const [months, setMonth] = useState([])

  const [totalRevenue, setTotalRevenue] = useState([])
  const [totalOrders, setTotalOrders] = useState([])
  const [averageOrderGrossProfit, setAverageOrderGrossProfit] = useState([])
  const [totalGrossProfit, setTotalGrossProfit] = useState([])
  const [averageOrderCOGS, setAverageOrderCOGS] = useState([])
  const [selectAnalytics, setSelectAnalytics] = useState('Total Revenue')
  const [selectMonth, setSelectMonth] = useState('Select Month')
  const [selectYear, setSelectYear] = useState(new Date().getFullYear())
  const [chartMonth, setChartMonth] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
  const [chartDates, setChartDates] = useState([]);

  const [totalData, setTotalData] = useState([])

  useEffect(() => {
    const currentDate = new Date();

    const months = [];
    for (let i = 0; i < 4; i++) {
      const month = format(new Date(currentDate.getFullYear(), currentDate.getMonth() - i, currentDate.getDate()), 'MMMM');
      months.push(month);
    }
    const reversedMonths = months.reverse();
    setMonth(reversedMonths);
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 4, currentDate.getDate());
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(currentDate, 'yyyy-MM-dd');
    // setSelectedDates([formattedStartDate, formattedEndDate]);
    loadData([formattedStartDate, formattedEndDate]);
    console.log(formattedStartDate, formattedEndDate);
    setSelectedDates([formattedStartDate, formattedEndDate])


    const startDateArray = [];
    const endDateArray = [];

    for (let i = 0; i < 4; i++) {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, currentDate.getDate());
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i - 1, currentDate.getDate());
      const formattedStartDate = format(startDate, 'yyyy.MM.dd');
      const formattedEndDate = format(endDate, 'yyyy.MM.dd');
      startDateArray.push(formattedStartDate);
      endDateArray.push(formattedEndDate);
    }
    const combinedDates = startDateArray.map((start, index) => ({
      startDate: start,
      endDate: endDateArray[index],
    }));

    const reversedDates = combinedDates.reverse();

    reversedDates.forEach((date, index) => {
      // setTimeout(() => {
      loadDataGraph(date);
      // }, index * 50);
    });
    console.log(combinedDates);
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const firstMonth = new Date(currentYear, 0, 1);
    const lastMonth = new Date(currentYear, 11, 31);
    const formattedStartDate = format(firstMonth, 'yyyy-MM-dd');
    const formattedEndDate = format(lastMonth, 'yyyy-MM-dd');
    const date = [formattedStartDate, formattedEndDate];
    setSelectedDatesGraph(date);
    loadDataMainGraph(date, selectAnalytics,'year');
    // console.log(formattedStartDate, formattedEndDate);
  }, [])


  useEffect(() => {


    if (selectYear != null && selectMonth === 'Select Month') {

      for (let i = 0; i < 12; i++) {
        const startDate = new Date(selectYear, i, 1);
        const endDate = new Date(selectYear, i + 1, 0);
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        const date = [formattedStartDate, formattedEndDate];
        loadDataMainGraph(date, selectAnalytics,'year 2');
        // console.log(date)
      }

      const formattedStartDate = format(new Date(selectYear, 0, 1), 'yyyy-MM-dd');
      const formattedEndDate = format(new Date(selectYear, 11, 31), 'yyyy-MM-dd');
      const date = [formattedStartDate, formattedEndDate];
      console.log(' search date 1 block' + date)
      setSelectedDatesGraph(date);
      // setChartDates([]);

    } else if (selectYear != null && selectMonth != 'Select Month') {
      const startDate = new Date(selectYear, chartMonth.indexOf(selectMonth), 1);
      const endDate = new Date(selectYear, chartMonth.indexOf(selectMonth) + 1, 0);
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');

      const daysInMonth = new Date(selectYear, chartMonth.indexOf(selectMonth) + 1, 0).getDate();
      console.log('days in month', daysInMonth)

      for (let i = 0; i < daysInMonth; i++) {
        const startDate = new Date(selectYear, chartMonth.indexOf(selectMonth), i + 1);
        const endDate = new Date(selectYear, chartMonth.indexOf(selectMonth), i + 1);
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        const dateS = [formattedStartDate, formattedEndDate];
        loadDataMainGraph(dateS, selectAnalytics, 'month');
        // console.log(dateS)
      }


      const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      setChartDates(daysArray);
      const date = [formattedStartDate, formattedEndDate];
      // loadDataMainGraph(date, selectAnalytics, 'month 2');
      setSelectedDatesGraph(date);
      console.log(' search date 2 block' + date)
    }

  }, [selectYear, selectMonth, selectAnalytics])


  // useEffect(() => {
  //   const startDateArray = [];
  //   const endDateArray = [];

  //   for (let i = 0; i < 4; i++) {
  //     const currentDate = new Date();
  //     const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, currentDate.getDate());
  //     const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i - 1, currentDate.getDate());
  //     const formattedStartDate = format(startDate, 'yyyy.MM.dd');
  //     const formattedEndDate = format(endDate, 'yyyy.MM.dd');
  //     startDateArray.push(formattedStartDate);
  //     endDateArray.push(formattedEndDate);
  //   }
  //   const combinedDates = startDateArray.map((start, index) => ({
  //     startDate: start,
  //     endDate: endDateArray[index],
  //   }));

  //   const reversedDates = combinedDates.reverse();

  //   reversedDates.forEach((date, index) => {
  //     // setTimeout(() => {
  //       loadDataGraph(date);
  //     // }, index * 50);
  //   });
  //   // console.log(combinedDates);
  // }, []);

  const loadDataGraph = (date) => {
    // if (date.length === 2) {
    axios
      .get(`https://api.zeuler.com/panel/ue/kpi?start=${date.startDate}&end=${date.endDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setTotalRevenue(prevTotalRevenue => [...prevTotalRevenue, res.data.tot_rev]);
          setTotalOrders(prevTotalOrders => [...prevTotalOrders, res.data.tot_orders]);
          setAverageOrderGrossProfit(prevAvgOGP => [...prevAvgOGP, res.data.ave_order_gross_profit]);
          setTotalGrossProfit(prevTotalGrossProfit => [...prevTotalGrossProfit, res.data.tot_gross_profit]);
          setAverageOrderCOGS(prevAOC => [...prevAOC, res.data.ave_order_cogs]);
          console.log('graph')
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
    // }


  }


  const loadData = (date) => {
    // if (user && token) {
    console.log("date", date)

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

  const loadDataMainGraph = (date, analyticsType,from) => {
    // console.log("date", date,from)

    axios
      .get(`https://api.zeuler.com/panel/ue/kpi?start=${date[0]}&end=${date[1]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          switch (analyticsType) {
            case 'Total Revenue':
              setTotalData(totalData => [...totalData, res.data.tot_rev]);
              console.log('Total rev ', res.data.tot_rev)
              break;
            case 'Total Gross Profit':
              setTotalData(totalData => [...totalData, res.data.tot_gross_profit]);
              console.log('Total Gross Profit ', res.data.tot_gross_profit)

              break;
            case 'Total Orders':
              setTotalData(totalData => [...totalData, res.data.tot_orders]);
              console.log('TTotal Orders ', res.data.tot_orders)

              break;
            case 'Average Order Gross Profit':
              setTotalData(totalData => [...totalData, res.data.ave_order_gross_profit]);
              console.log('Average Order Gross Profit ', res.data.ave_order_gross_profit)

              break;
            case 'Average Order COGS':
              setTotalData(totalData => [...totalData, res.data.ave_order_cogs]);
              console.log('Average Order COGS ', res.data.ave_order_cogs)

              break;
            default:
              break;
          }
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

  const analyticsType = (type) => {
    setSelectAnalytics(type)
  }
  const yearSelection = (year) => {
    console.log(year)
    setSelectYear(year)
  }
  const monthSelection = (month) => {
    setSelectMonth(month)
  }

  return (
    <CContainer>
      {loading ? <CSpinner /> :

        <>
          <CRow >

            <CCol style={{ width: '20%' }}>
              <CWidgetStatsA style={{ height: 200, backgroundColor: '#ff4d4d', color: 'white' }} value={
                <h2>
                  {analyticsData?.tot_rev?.toFixed(2) || 0.00} €
                </h2>
              }
                title={
                  <h5 className=" fw-normal">
                    Total Revenue
                  </h5>
                }
                chart={
                  <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: 100 }}
                    data={{
                      labels: months,
                      datasets: [
                        {
                          label: 'Total Revenue',
                          backgroundColor: 'white',
                          borderColor: 'rgba(255,255,255,.55)',
                          pointBackgroundColor: getStyle('--cui-primary'),
                          pointBackgroundColor: 'white',
                          pointHoverBackgroundColor: 'yellow',
                          data: totalRevenue,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          border: {
                            display: false,
                          },
                          grid: {
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          min: -9,
                          max: 39,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 1,
                        },
                        point: {
                          radius: 4,
                          hitRadius: 10,
                          hoverRadius: 7,
                        },
                      },
                    }}
                  />
                }

              />
            </CCol>
            <CCol style={{ width: '20%' }}>
              <CWidgetStatsA style={{ height: 200, backgroundColor: '#ff4d4d', color: 'white' }} value={<><h2>
                {analyticsData?.tot_gross_profit?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={
                  <h5 className=" fw-normal">
                    Total Gross Profit
                  </h5>
                } chart={
                  <CChartLine
                    // ref={widgetChartRef2}
                    className="mt-3 mx-3"
                    style={{ height: 70 }}
                    data={{
                      labels: months,
                      datasets: [
                        {
                          label: 'Total Gross Profit',
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(255,255,255,.55)',
                          pointBackgroundColor: 'white',
                          pointHoverBackgroundColor: getStyle('--cui-primary'),
                          data: totalGrossProfit,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          border: {
                            display: false,
                          },
                          grid: {
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          min: -9,
                          max: 39,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 1,
                        },
                        point: {
                          radius: 4,
                          hitRadius: 10,
                          hoverRadius: 7,
                        },
                      },
                    }}
                  />
                }

              />
            </CCol>
            <CCol style={{ width: '20%' }}>
              <CWidgetStatsA style={{ height: 200, backgroundColor: '#ff4d4d', color: 'white' }} value={<><h2>
                {analyticsData.tot_orders ? analyticsData.tot_orders : 0}
              </h2>
              </>}
                title={<>
                  <h5 className=" fw-normal">
                    Total Orders
                  </h5>
                </>}
                chart={
                  <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: 100 }}
                    data={{
                      labels: months,
                      datasets: [
                        {
                          label: 'Total Orders',
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(255,255,255,.55)',
                          pointBackgroundColor: 'white',
                          pointHoverBackgroundColor: 'yellow', // Adding hover color
                          data: totalOrders,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          border: {
                            display: false,
                          },
                          grid: {
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          min: -9,
                          max: 39,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 1,
                        },
                        point: {
                          radius: 4,
                          hitRadius: 10,
                          hoverRadius: 7,
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>
            <CCol style={{ width: '20%' }}>
              <CWidgetStatsA style={{ height: 200, backgroundColor: '#ff4d4d', color: 'white' }} value={<><h2>
                {analyticsData?.ave_order_gross_profit?.toFixed(2) || 0.00} €
              </h2>
              </>}
                title={

                  <h5 className=" fw-normal">
                    Average Order Gross Profit
                  </h5>
                } chart={
                  <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: 70 }}
                    data={{
                      labels: months,
                      datasets: [
                        {
                          label: ' Average Order Gross Profit',
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(255,255,255,.55)',
                          pointBackgroundColor: 'white',
                          pointHoverBackgroundColor: 'yellow', // Adding hover color
                          data: averageOrderGrossProfit,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          border: {
                            display: false,
                          },
                          grid: {
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          min: -9,
                          max: 39,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 1,
                        },
                        point: {
                          radius: 4,
                          hitRadius: 10,
                          hoverRadius: 7,
                        },
                      },
                    }}
                  />
                }


              />
            </CCol>
            <CCol style={{ width: '20%' }}>
              <CWidgetStatsA
                style={{ height: 200, backgroundColor: '#ff4d4d', color: 'white' }} // Fixed backgroundColor typo
                value={
                  <>
                    <h2> {analyticsData?.ave_order_cogs?.toFixed(2) || 0.00} € </h2>
                  </>
                }
                title={
                  <h5 className="fw-normal"> Average Order COGS </h5>
                }
                chart={
                  <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: 70 }}
                    data={{
                      labels: months,
                      datasets: [
                        {
                          label: 'Average Order COGS',
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(255,255,255,.55)',
                          pointBackgroundColor: 'white',
                          pointHoverBackgroundColor: 'yellow', // Adding hover color
                          data: averageOrderCOGS,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: { display: false },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          border: { display: false },
                          grid: { display: false, drawBorder: false },
                          ticks: { display: false },
                        },
                        y: {
                          min: -9,
                          max: 39,
                          display: false,
                          grid: { display: false },
                          ticks: { display: false },
                        },
                      },
                      elements: {
                        line: { borderWidth: 1 },
                        point: {
                          radius: 4,
                          hitRadius: 10,
                          hoverRadius: 7, // Adjusted for a more visible hover effect
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>


          </CRow><br></br>

          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={3}>
                  <h3>{selectAnalytics}</h3>
                </CCol>

                <CCol sm={3}>
                  <CDropdown style={{ marginLeft: '30%', width: '90%', backgroundColor: '#ff4d4d', color: 'white' }}>
                    <CDropdownToggle style={{ color: 'white' }}>{selectYear} </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => { yearSelection('2024') }}>2024</CDropdownItem>
                      <CDropdownItem onClick={() => { yearSelection('2025') }}>2025</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
                <CCol sm={3}>
                  <CDropdown style={{ marginLeft: '20%', width: '90%', backgroundColor: '#ff4d4d', color: 'white' }}>
                    <CDropdownToggle style={{ color: 'white' }}>{selectMonth} </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => { monthSelection('Select Month') }}>Select Month</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('January') }}>January</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('February') }}>February</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('March') }}>March</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('April') }}>April</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('May') }}>May</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('June') }}>June</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('July') }}>July</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('August') }}>August</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('September') }}>September</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('October') }}>October</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('November') }}>November</CDropdownItem>
                      <CDropdownItem onClick={() => { monthSelection('December') }}>December</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>

                <CCol sm={3}>
                  <CDropdown style={{ marginLeft: '10%', width: '90%', backgroundColor: '#ff4d4d', color: 'white' }}>
                    <CDropdownToggle style={{ color: 'white' }}>{selectAnalytics} </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => { analyticsType('Total Revenue') }}>Total Revenue</CDropdownItem>
                      <CDropdownItem onClick={() => { analyticsType('Total Gross Profit') }}>Total Gross Profit</CDropdownItem>
                      <CDropdownItem onClick={() => { analyticsType('Total Orders') }}>Total Orders</CDropdownItem>
                      <CDropdownItem onClick={() => { analyticsType('Average Order Gross Profit') }}>Average Order Gross Profit</CDropdownItem>
                      <CDropdownItem onClick={() => { analyticsType('Average Order COGS') }}>Average Order COGS</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>

              </CRow><br></br>
              <CRow>
                <CCol sm={5}>
                  <div className="small text-body-secondary"><span style={{fontSize:15}}>{selectedDatesGraph[0]} - {selectedDatesGraph[1]}</span></div>
                </CCol>
              </CRow><br></br>
              <CCol  style={{backgroundColor: '#ff4d4d', color: 'white'}} sm={12} className="d-none d-md-block">
                <CChart
                style={{backgroundColor: '#ff4d4d', color: 'white'}}
                  type="line"
                  data={{
                    labels: selectMonth != 'Select Month' ? chartDates : chartMonth,
                    datasets: [
                      {
                        label: selectAnalytics,
                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                        borderColor: "rgba(220, 220, 220, 1)",
                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                        pointBorderColor: "#fff",
                        data: totalData,
                      }
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: getStyle('--cui-border-color-translucent'),
                          
                        },
                        ticks: {
                          color: 'white',
                        },
                      },
                      y: {
                        grid: {
                          color: getStyle('--cui-border-color-translucent'),
                        },
                        min: 0,
                        ticks: {
                          color: 'white',
                        },
                      },
                    },
                  }}
                />
              </CCol>

            </CCardBody>
            <CCardFooter>
            </CCardFooter>
          </CCard>
        </>
      }
    </CContainer>
  )


}

export default Dashboard
