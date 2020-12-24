/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import quiSommesNous from '../../assets/images/image4-qui-sommes-nous.jpg'
const LeporiMarine = (props) => {
  return (
    <Fragment>
      <div className="main-lepori">
        <div className="container">
          <h2>Lepori marine</h2>
          <div className="bloc-us">
            <div className="desc">
              <p>Depuis plus de 35 ans, cette entreprise familiale se passionne pour le nautisme à moteur principalement hors-bord.</p>
            </div>
            <div className="images">
              <img src={quiSommesNous} alt='slide1' />
              <div className="btn-link">
              <Link to="/">Qui sommes-nous?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default LeporiMarine
