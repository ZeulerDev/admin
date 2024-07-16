import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Line,
  Image,
} from '@react-pdf/renderer'

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
   bullet: {
    width: 8, 
    height: 8, 
    marginRight: 5, 
  },
})

const OccasionalEmployeePDF = ({data}) => {
  return (
    <Document>
      <Page size="A4">
        <View style={[styles.section, styles.page]}>
          <View style={styles.section}>
            <div style={{ fontWeight: 'bold', textAlign: 'left', fontSize: 10 }}>
              <Image src={imagePDF} style={{ width: 80, height: 80 }} />
              <Text style={{ marginTop: 18, fontWeight: 'heavy' }}>DATI FISCALI DEL RICEVENTE</Text>
              <Text style={{ marginTop: 18 }}>ZEULER SRL</Text>
              <Text style={{ marginTop: 5 }}>Viale Luigi Majno 28, 20129 Milano MI</Text>
              <Text style={{ marginTop: 5 }}>13022810967</Text>
            </div>
          </View>

          <View style={styles.section}>
            <div style={{ textAlign: 'left', fontSize: 10, marginLeft: 80 }}>
              <Text>RICEVUTA</Text>
              <Text style={{ marginTop: 24 }}>
                Data fattura: {data.date}
              </Text>
              <Text style={{ marginTop: 5 }}>Ricevuta n°: {data.no}</Text>
              <Text style={{ marginTop: 10 }}>DATI FISCALI DELL’EMITTENTE</Text>
              <Text style={{ marginTop: 5 }}>{data.name}</Text>
              <Text style={{ marginTop: 2 }}>{data.address}</Text>
              <Text style={{ marginTop: 2 }}>P.IVA/C.F.: {data.vat}</Text>
              <Text style={{ marginTop: 2 }}>Conto corrente/IBAN: {data.iban}</Text>
            </div>
          </View>
        </View>

        <View style={[styles.section, styles.page, { height: 3 }]}>
          <Svg height="1" width="600">
            <Line x1="0" y1="0" x2="600" y2="0" strokeWidth={1} stroke="rgb(0,0,0)" />
          </Svg>
        </View>

        <View style={[styles.section, styles.page]}>
          <View style={[styles.section]}>
            <div>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: -70 }}>
                SERVIZIO OFFERTO
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5 }}>
                TTOTALE PRESTAZIONE OFFERTA
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5, fontWeight: 'bold' }}>
                IVA ({ data.iva_percentage}%)
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5, fontWeight: 'bold' }}>
                RITENUTA D’ACCONTO ({ data.tax_percentage}%)
              </Text>
            </div>
          </View>

          <View style={[styles.section, styles.font]}>
            <div style={{ display : 'flex', alignItems : 'flex-end',marginLeft: 150  }}>
              <Text style={{ fontSize: 10, marginTop: -70 }}> </Text>
              <Text style={{ fontSize: 10, marginTop: 5}}>{data.total} €</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{data.iva} €</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{data.tax} €</Text>
            </div>
          </View>
        </View>

        <View style={[styles.section, styles.page,{marginTop: -70}]}>
          <Svg height="1" width="600">
            <Line x1="0" y1="0" x2="600" y2="0" strokeWidth={1} stroke="rgb(0,0,0)" />
          </Svg>
        </View>

        <View style={[styles.section, styles.page]}>
          <View style={[styles.section]}>
            <div>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: -65 }}>RETTIFICHE</Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5 }}>
                TOTALE MANCE RICEVUTE DEI CLIENTI <Text style={{ fontSize: 7 }}></Text>{' '}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 35 }}>
                TOTALE FATTURA{' '}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: 10, marginTop: 5 }}>
                TOTALE DA RICEVERE{' '}
              </Text>
            </div>
          </View>

          <View style={[styles.section, styles.font]}>
            <div style={{ display : 'flex', alignItems : 'flex-end',marginLeft: 175  }}>
              <Text style={{ fontSize: 10, marginTop: -65 }}> </Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{data.tips} €</Text>
              <Text style={{ fontSize: 10, marginTop: 35 }}>{data.payable} €</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{data.payable} €</Text>
            </div>
          </View>
        </View>

        <View style={[styles.section, styles.page]}>
          <div style={{ textAlign: 'center',marginLeft:60 }}>
            <Text style={[{ textAlign: 'center', fontSize: 6, marginTop: 3 }]}>
              Si dichiara inoltre sotto la propria responsabilità che tale compenso:
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 6, marginTop: 3}}>
              {' '}
               * ha carattere del tutto occasionale, non svolgendo il sottoscritto prestazioni di
              lavoro autonomo con carattere di abitualità;{' '}
            </Text>

            <Text style={{textAlign: 'center', fontSize: 6, marginTop: 3 }}> *  soggetta a ritenuta d’acconto ai sensi dell’art. 25 del Dpr 600/73; </Text>
            <Text  style={{ textAlign: 'center', fontSize: 6, marginTop: 3  }}>
              {' '}
               *  non è soggetto al regime Iva a norma dell’art. 5 Dpr 633/72 e successive
              modificazioni;{' '}
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 6, marginTop: 3 }}>
              {' '}
               *  non è soggetto al regime Iva a norma dell’art. 5 Dpr 633/72 e successive
               non è assoggettato a contributo previdenziale in quanto nel corso dell’anno solare il
              totale dei compensi ricevuti a titolo di collaborazione occasionale non supera i 5.000,00 euro. ;{' '}
            </Text>
          </div>
        </View>
      </Page>
    </Document>
  )
}

export default OccasionalEmployeePDF
