/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Facebook from '../../assets/images/facebook-icon.svg'
import Instagram from '../../assets/images/instagram-icon.svg'
import Twitter from '../../assets/images/twitter-icon.svg'
import LeporiLogo from '../../assets/images/Lepori–logo.svg'
import { Link} from 'react-router-dom'
import NavItem from 'rsuite/lib/Nav/NavItem'

const Footer = () => {
  const date = new Date().getFullYear()

  return (

    <footer className="footer">
      <div className='footer-container'>
        <div className="container">
          <div className="logo-footer">
            <Link to="/"><img src={LeporiLogo} alt="logo lepori"></img></Link>
          </div>
        </div>
        <div className="container">
          <div className="bloc">
            <h3>Produits</h3>
            <ul>
              <li><Link to="/Bateaux">Bateaux</Link></li>
              <li><Link to="/Moteur">Moteurs</Link></li>
              <li><Link to="/Remorque">Remorques</Link></li>
              <li><Link to="/Electronique">Electroniques</Link></li>
            </ul>
          </div>
          <div className="bloc">
            <h3>Explorez</h3>
            <ul>
              <li><Link to="/">Lepori Marine</Link></li>
              <li><Link to="/HistoiresMarins">Histoires de marins</Link></li>
            </ul>
          </div>
          <div className="bloc">
            <h3>Contact</h3>
            <p>Lepori Marine sàrl <br />
            Route de Bremblens 1 <br />
          1122 Romanel/Morges <br /><br />
        021 869 74 25 <br />
              <NavItem href="mailto:info@lepori-marine.ch">Info@lepori-marine.ch</NavItem></p>
          </div>
          <div className="bloc">
            <h3>Suivez-nous</h3>
            <div className="link-social">
              <NavItem href="https://web.facebook.com/pages/category/Boat-Dealership/Lepori-Marine-sarl-254923988746353/?_rdc=1&_rdr" target="_blank"><img src={Facebook} alt="logo lepori" /></NavItem>
              <NavItem href="https://google.com" target="_blank"><img src={Instagram} alt="logo lepori" /></NavItem>
              <NavItem href="https://google.com" target="_blank"><img src={Twitter} alt="logo lepori" /></NavItem>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <p>Lepori marine {date} 
            <span> Design and development by 
              <a href="https://pulse.digital/" target="_blank">  PULSE.digital
              </a>
          </span></p>
          <div id="returnOnTop" title="Retour en haut">&nbsp;</div>
         
        </div>
      </div>
    </footer>
  )
}

export default Footer
