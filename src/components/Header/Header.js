import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import LeporiLogo from '../../assets/images/Lepori–logo.svg';

class Header extends Component {
  render() {
    return (
      <>
        <div className="header">
          <div className="header-wrapper">
            <div className="container">
              <div className="logo">
                <Link to="/Accueil"><img src={LeporiLogo} alt="logo lepori"></img></Link>
              </div>
              <div className="menu-header">
                <ul onClick={this.handleResponsiveClick}>
                  <li><NavLink to='/Accueil' activeClassName="activeNav">Accueil</NavLink></li>
                  <li><NavLink to='/Bateaux' activeClassName="activeNav">Bateaux</NavLink></li>
                  <li><NavLink to='/Moteur' activeClassName="activeNav">Moteurs</NavLink></li>
                  <li><NavLink to='/Remorque' activeClassName="activeNav">Remorques</NavLink></li>
                  <li><NavLink to='/Electronique' activeClassName="activeNav">Electroniques</NavLink></li>
                  <li><NavLink to='/Entreprise' activeClassName="activeNav">Entreprise</NavLink></li>
                  <li><NavLink to='/HistoiresMarins' activeClassName="activeNav">Histoires de marins</NavLink></li>
                  <li><NavLink to='/Contact' activeClassName="activeNav">Contact</NavLink></li>
                </ul>
                <div className="close-menu"></div>
              </div>
              <div className="burger">
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Header
