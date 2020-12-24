import React, { Fragment } from 'react'
import Header from '../Header/Header'
import SliderTop from './SliderTop'
import CategorieHome from '../MainContent/CategorieHome'
import LeporiMarine from '../MainContent/LeporiMarine'
import SliderHistoires from '../MainContent/SliderHistoires'
import Formulaire from '../MainContent/Formulaire'
import Footer from '../Footer/Footer'

const Accueil = () => {
  return (
    <Fragment>
      <Header/>
      <SliderTop/>
      <CategorieHome/>
      <LeporiMarine/>
      <SliderHistoires/>
      <Formulaire/>
      <Footer/>
    </Fragment>
  )
}
export default Accueil
