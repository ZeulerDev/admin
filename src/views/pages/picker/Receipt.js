import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import ReceiptPDF from '../../../components/FlatRateVatRegistrationPDF';
import OccasionalEmployeePDF from '../../../components/OccasionalEmployeePDF';
import OrdinaryVatRegistrationPDF from '../../../components/OrdinaryVatRegistrationPDF';
import FlatRateVatRegistrationPDF from '../../../components/FlatRateVatRegistrationPDF';
 

const Receipt = () => {

const  data ={
    name:"Chamod Maduwantha",
    address:'Via Giuseppe Tartini, 3/A, 20158 Milano MI, Italy',
    iban:'12347',
    vat:'978646546'
  }

    return(
        <div>
        {/* <PDFViewer style={{ width: "100%", height: "100vh" }}><FlatRateVatRegistrationPDF data={data} /></PDFViewer> */}
        {/* <PDFViewer style={{ width: "100%", height: "100vh" }}><OrdinaryVatRegistrationPDF data={data}/></PDFViewer> */}
        <PDFViewer style={{ width: "100%", height: "100vh" }}><OccasionalEmployeePDF data={data} /></PDFViewer>
      </div>
    )
}

export default Receipt