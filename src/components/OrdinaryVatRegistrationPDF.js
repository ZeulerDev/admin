import React from 'react'
import { Page, Text, View, Document, StyleSheet, Svg, Line, G, Polygon, Path, Image } from '@react-pdf/renderer'


import imagePDF from '../assets/brand/zeuler.ico'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 0,
    padding: 20,
    flexGrow: 1,
  },
  font: {
    textAlign: 'right',
  },
  image: {
    width: '10%',
    height: '10%',
  },
})

const OrdinaryVatRegistrationPDF = ({data}) => {

  return (
    <Document>
      <Page size="A4">
        <View style={[styles.section, styles.page]}>
          <View style={styles.section}>
            <div style={{ textAlign: 'left', fontSize: 10 }}>
            <Image src={imagePDF} style={{ width: 80, height: 80 }} />
              <Text style={{marginTop: 18}}>DATI FISCALI DEL RICEVENTE</Text>
              <Text style={{ marginTop: 18 }}>ZEULER SRL</Text>
              <Text style={{ marginTop: 5 }}>Viale Luigi Majno 28, 20129 Milano MI</Text>
              <Text style={{ marginTop: 5 }}>13022810967</Text>
            </div>
          </View>

          <View style={styles.section}>
            <div style={{ textAlign: 'left', fontSize: 10, marginLeft: 80 }}>
              <Text>RICEVUTA</Text>
              <Text style={{ marginTop: 24 }}>
                Data fattura: {data.date} (the day the invoice is received)
              </Text>
              <Text style={{ marginTop: 5 }}>Ricevuta n°: 2024-000000 (count n. receipts)</Text>
              <Text style={{ marginTop: 10 }}>DATI FISCALI DELL’EMITTENTE</Text>
              <Text style={{ marginTop: 5 }}>{data.name}</Text>
              <Text style={{ marginTop: 2 }}>{data.address}</Text>
              <Text style={{ marginTop: 2 }}>P.IVA/C.F.: {data.vat}</Text>
              <Text style={{ marginTop: 2 }}>Conto corrente/IBAN: {data.iban}</Text>

            </div>
          </View>
        </View>

        <View style={[styles.section, styles.page,{height:3}]}>
        <Svg height="1" width="600">
        <Line
          x1="0"
          y1="0"
          x2="600"
          y2="0"
          strokeWidth={1}
          stroke="rgb(0,0,0)"
        />
      </Svg>
        </View>

        <View style={[styles.section, styles.page]}>
          <View style={[styles.section]}>
            <div>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: -90 }}>
                SERVIZIO OFFERTO
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5 }}>
                TTOTALE PRESTAZIONE OFFERTA
                <Text style={{ fontSize: 7 }}>(Total earned in the period of 500/1,22)</Text>{' '}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5, fontWeight: 'bold' }}>
                IVA (22%)
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5, fontWeight: 'bold' }}>
                RITENUTA D’ACCONTO (20%)
              </Text>
            </div>
          </View>

          <View style={[styles.section, styles.font]}>
            <div style={{ textAlign: 'right',marginLeft: 140 }}>
              <Text style={{ fontSize: 10, marginTop: -90 }}> </Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{data.total} €</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}> €</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}> €</Text>
            </div>
          </View>
        </View>

        <View style={[styles.section, styles.page,{marginTop: -120 }]}>
        <Svg height="1" width="600">
        <Line
          x1="0"
          y1="0"
          x2="600"
          y2="0"
          strokeWidth={1}
          stroke="rgb(0,0,0)"
        />
      </Svg>
        </View>

        <View style={[styles.section, styles.page]}>
          <View style={[styles.section]}>
            <div>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: -100 }}>RETTIFICHE</Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5 }}>
                TOTALE MANCE RICEVUTE DEI CLIENTI <Text style={{ fontSize: 7 }}>(Tips)</Text>{' '}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 35 }}>
                TOTALE FATTURA{' '}
                <Text style={{ fontSize: 7 }}>
                  (Difference between Totale Prestazione Offerta and IVA + tips)
                </Text>{' '}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5 }}>
                TOTALE DA RICEVERE{' '}
                <Text style={{ fontSize: 7 }}>
                  (Difference between Totale Prestazione offerta and IVA + tips)
                </Text>{' '}
              </Text>
            </div>
          </View>

          <View style={[styles.section, styles.font]}>
            <div style={{ textAlign: 'right',marginLeft: 128 }}>
              <Text style={{ fontSize: 10, marginTop: -100 }}> </Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{data.tips} €</Text>
              <Text style={{ fontSize: 10, marginTop: 35 }}>{data.payable} €</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{data.payable} €</Text>
            </div>
          </View>
        </View>

        <View style={[styles.section, styles.page]}>
         
        </View>
      </Page>
    </Document>
  )
}

export default OrdinaryVatRegistrationPDF
