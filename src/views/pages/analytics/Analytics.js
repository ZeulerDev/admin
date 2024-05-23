import {
  CCol,
  CContainer,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CRow,
  CWidgetStatsA,
} from '@coreui/react'
import React, { useState } from 'react'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.css'
import WidgetsDropdown from '../../widgets/WidgetsDropdown'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilOptions } from '@coreui/icons'

const Analytics = () => {
  const [selectedDates, setSelectedDates] = useState([])

  const handleDateRangeChange = (value) => {
    if (value) {
      const formattedStartDate = format(value[0], 'yyyy-MM-dd')
      const formattedEndDate = format(value[1], 'yyyy-MM-dd')
      setSelectedDates([formattedStartDate, formattedEndDate])
    } else {
      setSelectedDates([])
    }
  }
  return (
    <CContainer>
      <CNavbar className="bg-body-tertiary">
        <DateRangePicker
          style={{ marginLeft: 15 }}
          format="yyyy/MM/dd"
          onChange={handleDateRangeChange}
        />
      </CNavbar>
      <br></br>
      <CRow xs={{ gutter: 4 }} >
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="info"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="warning"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="danger"style={{ height:250 }} />
        </CCol>
      </CRow>
      <br></br>
      <CRow xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="info"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="warning"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="danger"style={{ height:250 }} />
        </CCol>
      </CRow>
      <br></br>
      <CRow xs={{ gutter: 4 }} >
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="info"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="warning"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="danger"style={{ height:250 }} />
        </CCol>
      </CRow>
      <br></br>
      <CRow xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="info"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="warning"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="danger"style={{ height:250 }} />
        </CCol>
      </CRow>
      <br></br>
      <CRow xs={{ gutter: 4 }} >
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="info"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="warning"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="danger"style={{ height:250 }} />
        </CCol>
      </CRow>
      <br></br>
      <CRow xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="info"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="warning"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="danger"style={{ height:250 }} />
        </CCol>
      </CRow>
      <br></br>
      <CRow xs={{ gutter: 4 }} >
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="info"style={{ height:250 }} />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="warning"style={{ height:250 }} />
        </CCol>
      </CRow>
      <br></br>
      
    </CContainer>
  )
}

export default Analytics
