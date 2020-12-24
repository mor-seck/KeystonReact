import React, { Fragment } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Formulaire from '../MainContent/Formulaire'
import QuiSommesNous from '../EntrepriseContent/QuiSommesNous'

const Entreprise = (props) => {
  return (
    <Fragment>
      <Header/>
      <QuiSommesNous />
      <Formulaire />
      <Footer />
    </Fragment>
  )
}

export default Entreprise
