/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { Fragment } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Slider from "react-slick"
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;


const DetailBateaux = (props) => {

  const settings = {
    dots    : true,
    infinite: true,
    speed   : 500,
    autoplay: true,
    arrows  : true
  }
  const id = props.match.params.id
  const ELECTRONIQUE = gql`
  query{
    Bateau(where:{ id:"${id}"}){
      id
      Modele
      TypeDeBateau{id Type}
      Largeur
      Longueur
      Etat
      Poids
      Prix
      Marque{Marque}
      Moteur{id Modele}
      AnneeMiseEnService{AnneeDeMiseEnService}
      Image{ImagesBateau{id publicUrl filename}}
      Brochure{publicUrl filename}
      Remarque
    }

    allBateaus(first:4){
      id
      Modele
      TypeDeBateau{id Type}
      Largeur
      Longueur
      Etat
      Poids
      Prix
      Marque{Marque}
      Moteur{id Modele}
      AnneeMiseEnService{AnneeDeMiseEnService}
      Image{ImagesBateau{id publicUrl filename}}
      Brochure{publicUrl filename}
      Remarque
    }
}`;

  const { data } = useQuery(ELECTRONIQUE);
  return (

    <Fragment>
      <Header />
      <div className="breadcrumbs">
        <div className="container">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/Bateaux">Bateaux</Link></li>
            {data && data.Bateau && data.Bateau.Etat ?
              <li>
                {data && data.Bateau && data.Bateau.Etat}
              </li> : ''
            }

            {data && data.Bateau && data.Bateau.Modele ?
              <li>
                  {data && data.Bateau && data.Bateau.Modele ? data.Bateau.Modele : ''}
              </li> : ''
            }
          </ul>
        </div>
      </div>
      <div className="details">
        <div className="container">
          <div className="description">
            {data && data.Bateau && data.Bateau.Modele ?
              <h1>
                {data && data.Bateau && data.Bateau.Modele ? data.Bateau.Modele : ''}
              </h1> : ''
            }

            {data && data.Bateau && data.Bateau.Prix ?
              <div className="prix">
                Prix {data && data.Bateau && data.Bateau.Prix ? data.Bateau.Prix : ''} CHF
              </div> : ''
            }

            {data && data.Bateau && data.Bateau.BateauType ?
              <div className="type">
                {data && data.Bateau && data.Bateau.BateauType}
              </div> : ''
            }

            <div className="caracteristique">

              {data && data.Bateau && data.Bateau.Type && data.Bateau.Type.type ?
                <div>
                  <span>Type</span>
                  {data && data.Bateau && data.Bateau.Type && data.Bateau.Type.Type ? data.Bateau.Type.Type : ''}
                </div> : ''
              }

              {data && data.Bateau && data.Bateau.Marque && data.Bateau.Marque.Marque ?
                <div><span>Marque </span>
                  {data && data.Bateau && data.Bateau.Marque && data.Bateau.Marque.Marque}
                </div> : ''
              }

              {data && data.Bateau && data.Bateau.Longueur ?
                <div>
                  <span>Longueur (en m) </span>
                  {data && data.Bateau && data.Bateau.Longueur ? data.Bateau.Longueur : ''}
                </div> : ''
              }

              {data && data.Bateau && data.Bateau.Largeur ?
                <div>
                  <span>Largeur (en m) </span>
                  {data && data.Bateau && data.Bateau.Largeur ? data.Bateau.Largeur : ''}
                </div> : ''
              }

              {data && data.Bateau.Poids ?
                <div>
                  <span>Poids (en KG) </span>
                  {data && data.Bateau.Poids && data.Bateau && data.Bateau.Poids ? data.Bateau.Poids : ''}
                </div> : ''
              }

              {data && data.Bateau.Moteur && data.Bateau.Moteur.Nom ?
                <div>
                  <span>Moteur</span>
                  {data && data.Bateau.Moteur && data.Bateau.Moteur.Nom ? data.Bateau.Moteur.Nom : ''}
                </div> : ''
              }

              {data && data.Bateau && data.Bateau.AnneeMiseEnService ?
                <div>
                  <span>Année de mise en service </span>
                  {data && data.Bateau.AnneeMiseEnService && data.Bateau.AnneeMiseEnService.AnneeDeMiseEnService ? data.Bateau.AnneeMiseEnService.AnneeDeMiseEnService : ''}
                </div> : ''
              }

            </div>
            {data && data.Bateau && data.Bateau.Remarque ?
              <div className="remarques">
                Remarques <br />
                {data && data.Bateau.Remarque}
              </div> : ''
            }
          </div>

          <div className="slide-images slidetail">
            {data && data.Bateau.Image && data.Bateau.Image[0] && data.Bateau.Image[0].ImagesBateau && data.Bateau.Image[0].ImagesBateau.filename ?
              <div className="images">
                <Slider {...settings}>
                  {data && data.Bateau.Image && data.Bateau.Image[0] && data.Bateau.Image[0].ImagesBateau && data.Bateau.Image[0].ImagesBateau.filename ?
                    <div>
                      <img src={baseURL + (data && data.Bateau.Image && data.Bateau.Image[0] && data.Bateau.Image[0].ImagesBateau && data.Bateau.Image[0].ImagesBateau.filename ? data.Bateau.Image[0].ImagesBateau.filename : '')} alt='image' />
                    </div> : ''
                  }

                  {data.Bateau.Image && data.Bateau.Image[1] && data.Bateau.Image[1].ImagesBateau && data.Bateau.Image[1].ImagesBateau.filename ?
                    <div>
                      <img src={baseURL + (data && data.Bateau.Image && data.Bateau.Image[1] && data.Bateau.Image[1].ImagesBateau && data.Bateau.Image[1].ImagesBateau.filename ? data.Bateau.Image[1].ImagesBateau.filename : '')} alt='image' />
                    </div> : ""
                  }

                  {data.Bateau.Image && data.Bateau.Image[2] && data.Bateau.Image[2].ImagesBateau && data.Bateau.Image[2].ImagesBateau.filename ?
                    <div>
                      <img src={baseURL + (data && data.Bateau.Image && data.Bateau.Image[2] && data.Bateau.Image[2].ImagesBateau && data.Bateau.Image[2].ImagesBateau.filename ? data.Bateau.Image[2].ImagesBateau.filename : '')} alt='image' />
                    </div> : ""
                  }
                  {data.Bateau.Image && data.Bateau.Image[3] && data.Bateau.Image[3].ImagesBateau && data.Bateau.Image[3].ImagesBateau.filename ?
                    <div>
                      <img src={baseURL + (data && data.Bateau.Image && data.Bateau.Image[3] && data.Bateau.Image[3].ImagesBateau && data.Bateau.Image[3].ImagesBateau.filename ? data.Bateau.Image[3].ImagesBateau.filename : '')} alt='image' />
                    </div> : ""
                  }

                </Slider>
              </div> : ''
            }
          </div>
        </div>

        {data && data.Bateau && data.Bateau.Brochure && data.Bateau.Brochure.filename ?
          <div className="container btn-link-produits">
            <a href={baseURL + (data && data.Bateau.Brochure.filename)} className="brochure" target="blank">Télécharger la brochure</a>
            <Link to="/Contact">Contact</Link>
          </div> : ''
        }

      </div>

      <div className="liste-produits produits-related">
        <div className="container">
          <h3>Ces bateaux pourraient aussi vous intéresser</h3>
        </div>
        <div className="container">
          <div className="listes" >
            {data && data.allBateaus.map((bateau, id) => (
              <div className="produits" key={id}>
                { data && bateau.Image && bateau.Image[0] && bateau.Image[0].ImagesBateau && bateau.Image[0].ImagesBateau.filename ?
                  <img src={baseURL + (bateau.Image && bateau.Image[0] && bateau.Image[0].ImagesBateau && bateau.Image[0].ImagesBateau.filename ? bateau.Image[0].ImagesBateau.filename : '')} alt='image' /> : ""
                }

                {data && bateau.Etat ?
                  <div className="cat">{data && bateau.Etat}</div> : ""
                }

                <div className="description">
                  {data && bateau.Modele ?
                    <div className="nom">{data && bateau.Modele}</div> : ""
                  }

                  {data && bateau.Prix ?
                    <div className="prix">Prix {data && bateau.Prix} CHF</div> : ""
                  }

                  <Link to={{ pathname: `/Detail_Bateau/${bateau.id}` }}>Plus de détails</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="btn-back">
        <Link to="/Bateaux">Revenir sur la page précédente</Link>
      </div>
      <Footer />
    </Fragment>
  )
}

export default DetailBateaux
