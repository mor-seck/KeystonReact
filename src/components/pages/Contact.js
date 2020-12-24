/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FormulaireContact from '../MainContent/FormulaireContact'
import ImageEntete from '../../assets/images/slide-histoire.jpg';
import bateau from '../../assets/images/image-contact.jpg';
const Contact = (props) => {
  return (
    <Fragment>
      <Header />
      <div className="breadcrumbs">
        <div className="container">
          <ul>
            <li><a href="#">Accueil</a></li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="entete">
        <img src={ImageEntete} alt="Lepori" />
        <div className="description">
          <div className="container">
            <h2>N’hésitez pas à nous contacter directement pour plus de renseignements !</h2>
          </div>
        </div>
      </div>

      <FormulaireContact />

      <div className="container images-contact">
        <img src={bateau} alt="Lepori" />
      </div>
      <Footer />
    </Fragment>
  )
}

export default Contact
