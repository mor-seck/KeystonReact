import React, { Fragment } from 'react'
import image1 from '../../assets/images/image1-Des-bateaux-neufs-Et-occasions.jpg'
import image2 from '../../assets/images/image2-Représentants-régionaux.jpg'
import image3 from '../../assets/images/home-remorques.jpg'
import image4 from '../../assets/images/home-electronique.jpg'


const CategorieHome = (props) => {
  return (
    <Fragment>
      <div className="container">

        <div className="bloc-content">
          <div className="images">
            <img src={image1} alt="Lepori" />
          </div>
          <div className="description">
            <div className="categorie">Bateaux</div>
            <h2>Des bateaux neufs et occasions</h2>
            <div className="content">Sur notre site, vous trouverez des offres et des promotions pour des bateaux neufs et d’occasion.</div>
            <a href="/Bateaux">Découvrir les bateaux</a>
          </div>
        </div>

      <div className="bloc-content">
          <div className="description">
            <div className="categorie">Moteurs</div>
            <h2>Représentants régionaux</h2>
            <div className="content">Pour les moteurs hors-bords, nous sommes les représentants régionaux d’une palette de marque de moteurs haut de gamme.</div>
            <a href="/Moteur">Découvrir les moteurs</a>
          </div>
          <div className="images">
            <img src={image2}alt="Lepori" />
          </div>
        </div>

        <div className="bloc-content">
          <div className="images">
            <img src={image3} alt="Lepori" />
          </div>
          <div className="description">
            <div className="categorie">Remorques</div>
            <h2>Spécialistes Remorques</h2>
            <div className="content">Nous assurons le service, la réparation et la préparation à l’expertise de remorques de toute marque.</div>
            <a href="/Remorque">Découvrir les remorques</a>
          </div>
        </div>

        <div className="bloc-content">

          <div className="description">
            <div className="categorie">Electronique</div>
            <h2>Electronique indispensables à la navigation</h2>
            <div className="content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</div>
            <a href="/Electronique">Découvrir les accessoires</a>
          </div>
          <div className="images">
            <img  src={image4} alt="Lepori" />
          </div>
        </div>

      </div>
    </Fragment>
  )
}

export default CategorieHome
