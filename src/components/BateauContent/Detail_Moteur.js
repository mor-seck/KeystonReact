/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Slider from 'react-slick'
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;


const DetailMoteur = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: true
  }
  const id = props.match.params.id
  const MOTEUR = gql`
  query{
    Moteur(where:{id:"${id}"}){
      id
      Modele
  		Marque{id Marque}
  		PuissanceEnCv
  		PuissanceEnKw
  		LongueurArbre
      TypeDeRelevage{id TypeDeRelevage}
      Etat
      TypeDeMoteur{id TypeDeMoteur}
      Prix
      nombreHeureDeMarche
      AnneeMiseEnService{id AnneeDeMiseEnService}
      Image{id ImagesBateau{id filename publicUrl}}
      Remarque
      Brochure{id filename publicUrl}
    }

    allMoteurs(first:4){
      id
      Modele
  		Marque{id Marque}
  		PuissanceEnCv
  		PuissanceEnKw
  		LongueurArbre
      TypeDeRelevage{id TypeDeRelevage}
      Etat
      TypeDeMoteur{id TypeDeMoteur}
      Prix
      nombreHeureDeMarche
      AnneeMiseEnService{id AnneeDeMiseEnService}
      Image{id ImagesBateau{id filename publicUrl}}
      Remarque
      Brochure{id filename publicUrl}
    }
}
      
`;
  const { data } = useQuery(MOTEUR);

  return (
    <Fragment>
      <Header />
      <div className="breadcrumbs">
        <div className="container">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/Bateaux">Bateaux</Link></li>
            {data && data.Moteur && data.Moteur.Etat ?
              <li>
                {data.Moteur.Etat}
              </li> : ""
            }
            {data && data.Moteur && data.Moteur.Modele ?
              <li>{data.Moteur.Modele}</li> : ""
            }
          </ul>
        </div>
      </div>

      <div className="details">
        <div className="container">
          <div className="description">
            {data && data.Moteur && data.Moteur.Modele ?
              <h1>{data.Moteur.Modele}</h1> : ""
            }
            {data && data.Moteur && data.Moteur.Prix ?
              <div className="prix">Prix {data.Moteur.Prix} CHF</div> : ""
            }

            {data && data.Moteur && data.Moteur.type ?
              <div className="type">{data.Moteur.type}</div> : ""
            }

            <div className="caracteristique">
              {data && data.Moteur && data.Moteur.PuissanceEnCv ?
                <div><span>Puissance en CV</span> {data.Moteur.PuissanceEnCv} </div> : ""
              }

              {data && data.Moteur && data.Moteur.PuissanceEnKw ?
                <div><span>Puissance en KW</span> {data.Moteur.PuissanceEnKw} </div> : ""
              }

              {data && data.Moteur && data.Moteur.LongueurArbre ?
                <div><span>LongueurArbre</span> {data.Moteur.LongueurArbre} </div> : ""
              }

              {data && data.Moteur && data.Moteur.BarreFranche ?
                <div><span> Barre Franche</span> {data.Moteur.BarreFranche} </div> : ""
              }

              {data && data.Moteur && data.Moteur.Marque && data.Moteur.Marque.Marque ?
                <div><span>Marque</span> {data.Moteur.Marque.Marque}</div> : ""
              }

              {data && data.Moteur && data.Moteur.typeDeRelevage && data.Moteur.typeDeRelevage.TypeDeRelevage ?
                <div><span>Type De Relevage</span> {data.Moteur.typeDeRelevage.TypeDeRelevage}</div> : ""
              }

              {data && data.Moteur && data.Moteur.TypeDeMoteur && data.Moteur.TypeDeMoteur.TypeDeMoteur ?
                <div><span>Type de Moteur</span> {data.Moteur.TypeDeMoteur.TypeDeMoteur}</div> : ""
              }

              {data && data.Moteur && data.Moteur.nombreHeureDeMarche ?
                <div><span>nombreHeureDeMarche</span> {data.Moteur.nombreHeureDeMarche}</div> : ""
              }

              {data && data.Moteur && data.Moteur.AnneeMiseEnService && data.Moteur.AnneeMiseEnService.AnneeDeMiseEnService ?
                <div><span>Année de mise en service</span> {data.Moteur.AnneeMiseEnService.AnneeDeMiseEnService} </div> : ""
              }
            </div>
            {data && data.Moteur && data.Moteur.Remarque ?
              <div className="remarques">
                Remarques <br />
                {data && data.Moteur.Remarque}
              </div> : ''
            }

          </div>
          {data && data.Moteur.Image && data.Moteur.Image[0] && data.Moteur.Image[0].ImagesBateau && data.Moteur.Image[0].ImagesBateau.filename ?
            <div className="slide-images slidetail">
              <div className="images">
                <Slider {...settings}>
                  {data.Moteur.Image && data.Moteur.Image[0] && data.Moteur.Image[0].ImagesBateau && data.Moteur.Image[0].ImagesBateau.filename ?
                    <div>
                      <img src={baseURL + (data.Moteur.Image && data.Moteur.Image[0] && data.Moteur.Image[0].ImagesBateau && data.Moteur.Image[0].ImagesBateau.filename ? data.Moteur.Image[0].ImagesBateau.filename : '')} alt='image' />
                    </div> : ""
                  }
                  {data.Moteur.Image && data.Moteur.Image[1] && data.Moteur.Image[1].ImagesBateau && data.Moteur.Image[1].ImagesBateau.filename ?
                    <div>
                      <img src={baseURL + (data.Moteur.Image && data.Moteur.Image[1] && data.Moteur.Image[1].ImagesBateau && data.Moteur.Image[1].ImagesBateau.filename ? data.Moteur.Image[1].ImagesBateau.filename : '')} alt='image' />
                    </div> : ""
                  }
                  {data.Moteur.Image && data.Moteur.Image[2] && data.Moteur.Image[2].ImagesBateau && data.Moteur.Image[0].ImagesBateau.filename ?
                    <div>
                      <img src={baseURL + (data.Moteur.Image && data.Moteur.Image[2] && data.Moteur.Image[2].ImagesBateau && data.Moteur.Image[2].ImagesBateau.filename ? data.Moteur.Image[2].ImagesBateau.filename : '')} alt='image' />
                    </div> : ""
                  }
                  {data.Moteur.Image && data.Moteur.Image[3] && data.Moteur.Image[3].ImagesBateau && data.Moteur.Image[3].ImagesBateau.filename ?
                    <div>
                      <img src={baseURL + (data.Moteur.Image && data.Moteur.Image[3] && data.Moteur.Image[3].ImagesBateau && data.Moteur.Image[3].ImagesBateau.filename ? data.Moteur.Image[3].ImagesBateau.filename : '')} alt='image' />
                    </div> : ""
                  }
                </Slider>
              </div>
            </div> : ""
          }

        </div>
        <div className="container btn-link-produits">
          {data && data.Moteur && data.Moteur.Brochure && data.Moteur.Brochure.filename ?
            <a href={baseURL + (data.Moteur.Brochure.filename)} className="brochure" target="_blank">
              Télécharger la brochure
            </a> : ""
          }
          <Link to="/Contact">Contact</Link>
        </div>
      </div>

      <div className="liste-produits produits-related">
        <div className="container">
          <h3>Ces moteurs pourraient aussi vous intéresser</h3>
        </div>
        <div className="container">
          <div className="listes" >
            {data && data.allMoteurs.map((moteur, id) => (
              <div className="produits" key={id}>
                {data && moteur.Image && moteur.Image[0] && moteur.Image[0].ImagesBateau && moteur.Image[0].ImagesBateau.filename ?
                  <img src={baseURL + (data && moteur.Image && moteur.Image[0] && moteur.Image[0].ImagesBateau && moteur.Image[0].ImagesBateau.filename ? moteur.Image[0].ImagesBateau.filename : '')} alt='image' /> : ""
                }
                {data && data.Moteur && data.Moteur.Etat ?
                  <div className="cat">{data && data.Moteur && data.Moteur.Etat}</div> : ""
                }

                <div className="description">

                  {data && data.Moteur && data.Moteur.Modele ?
                    <div className="nom">{moteur.Modele}</div> : ""
                  }

                  {data && data.Moteur && data.Moteur.Prix ?
                    <div className="prix">Prix {moteur.Prix}</div> : ""
                  }
                  <Link to={{ pathname: `/Detail_Moteur/${moteur.id}` }}>Plus de détails</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="btn-back">
        <Link to="/Moteur">Revenir sur la page précédente</Link>
      </div>

      <Footer />
    </Fragment>
  )
}

export default DetailMoteur
