/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Slider from 'react-slick'
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;


const DetailRemorque = (props) => {

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
    Remorque(where:{ id:"${id}"}){
      id
      Nom
      typeDeBateaux{id Type}
      Etat
      Marque{id Marque}
      chargeUtile
      Prix
      PoidsTotalEnCharge
      Longueur
      Largeur
      AmenagementRemorque{id AmenagementRemorque}
      AnneeMiseEnService{id AnneeDeMiseEnService}
      Image{id ImagesBateau{id filename publicUrl}}
      Remarque
      Brochure{id filename  publicUrl}
    }

    allRemorques{
      id
      Nom
      typeDeBateaux{id Type}
      Etat
      Marque{id Marque}
      chargeUtile
      Prix
      PoidsTotalEnCharge
      Longueur
      Largeur
      AmenagementRemorque{id AmenagementRemorque}
      AnneeMiseEnService{id AnneeDeMiseEnService}
      Image{id ImagesBateau{id filename publicUrl}}
      Remarque
      Brochure{id filename  publicUrl}
    }
}`;

  const { data } = useQuery(MOTEUR);
  return (
    <Fragment>
      <Header />
      <div className="breadcrumbs">
        <div className="container">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/Bateaux">Bateaux</Link></li>
            {data && data.Remorque && data.Remorque.Etat ?
              <li>
                  {data.Remorque.Etat}
              </li> : ""
            }

            {data && data.Remorque && data.Remorque.Nom ?
              <li>{data.Remorque.Nom}</li> : ""
            }

          </ul>
        </div>
      </div>

      <div className="details">
        <div className="container">
          <div className="description">
            {data && data.Remorque && data.Remorque.Nom ?
              <h1>{data.Remorque.Nom}</h1> : ""
            }

            {data && data.Remorque && data.Remorque.Prix ?
              <div className="prix">Prix {data.Remorque.Prix} CHF</div> : ""
            }

            {data && data.Remorque && data.Remorque.RemorqueType ?
              <div className="type">{data.Remorque.RemorqueType}</div> : ""
            }


            <div className="caracteristique">
              {data && data.Remorque && data.Remorque.Longueur ?
                <div><span>Longueur (en m)</span> {data.Remorque.Longueur}</div> : ""
              }
              {data && data.Remorque && data.Remorque.Largeur ?
                <div><span>Largeur (en m)</span> {data.Remorque.Largeur}</div> : ""
              }

              {data && data.Remorque && data.Remorque.typeDeBateaux && data.Remorque.typeDeBateaux.Type ?
                <div><span>Type</span> {data.Remorque.typeDeBateaux.Type}</div> : ""
              }

              {data && data.Remorque && data.Remorque.chargeUtile ?
                <div><span>Charge Util (en KG)</span> {data.Remorque.chargeUtile}</div> : ""
              }

              {data && data.Remorque && data.Remorque.PoidsTotalEnCharge ?
                <div><span>Poids Total Charge (en KG)</span> {data.Remorque.PoidsTotalEnCharge}</div> : ""
              }

              {data && data.Remorque && data.Remorque.AnneeMiseEnService && data.Remorque.AnneeMiseEnService.AnneeDeMiseEnService ?
                <div><span>Année de mise en service  </span>  {data.Remorque.AnneeMiseEnService.AnneeDeMiseEnService} </div> : ""
              }

            {data && data.Remorque && data.Remorque.AmenagementRemorque && data.Remorque.AmenagementRemorque.AmenagementRemorque ?
               <div><span>Aménagement Remorque :</span> {data.Remorque.AmenagementRemorque.AmenagementRemorque}
                </div> : ""
            }

            </div>
           

              {data && data.Remorque && data.Remorque.Remarque ?
              <div className="remarques">
                Remarques <br />
                {data && data.Remorque.Remarque}
              </div> : ''
            }

          </div>

          {data && data.Remorque.Image && data.Remorque.Image[0] && data.Remorque.Image[0].ImagesBateau && data.Remorque.Image[0].ImagesBateau.filename ?
            <div className="slide-images slidetail">
              <div className="images">
              <Slider {...settings}>
              {data && data.Remorque.Image && data.Remorque.Image[0] && data.Remorque.Image[0].ImagesBateau && data.Remorque.Image[0].ImagesBateau.filename ?
                <div>
                   <img src={baseURL + (data.Remorque.Image && data.Remorque.Image[0] && data.Remorque.Image[0].ImagesBateau && data.Remorque.Image[0].ImagesBateau.filename ? data.Remorque.Image[0].ImagesBateau.filename : '')} alt='image' />
                </div>:""
              } 
              {data && data.Remorque.Image && data.Remorque.Image[1] && data.Remorque.Image[1].ImagesBateau && data.Remorque.Image[1].ImagesBateau.filename ?
                <div>
                   <img src={baseURL + (data.Remorque.Image && data.Remorque.Image[1] && data.Remorque.Image[1].ImagesBateau && data.Remorque.Image[1].ImagesBateau.filename ? data.Remorque.Image[1].ImagesBateau.filename : '')} alt='image' />
                </div>:""
              } 
              {data && data.Remorque.Image && data.Remorque.Image[2] && data.Remorque.Image[2].ImagesBateau && data.Remorque.Image[2].ImagesBateau.filename ?
                <div>
                   <img src={baseURL + (data.Remorque.Image && data.Remorque.Image[2] && data.Remorque.Image[2].ImagesBateau && data.Remorque.Image[2].ImagesBateau.filename ? data.Remorque.Image[2].ImagesBateau.filename : '')} alt='image' />
                </div>:""
              } 
              {data && data.Remorque.Image && data.Remorque.Image[3] && data.Remorque.Image[3].ImagesBateau && data.Remorque.Image[3].ImagesBateau.filename ?
                <div>
                   <img src={baseURL + (data.Remorque.Image && data.Remorque.Image[3] && data.Remorque.Image[3].ImagesBateau && data.Remorque.Image[3].ImagesBateau.filename ? data.Remorque.Image[3].ImagesBateau.filename : '')} alt='image' />
                </div>:""
              } 
               
              </Slider>
              </div>
            </div> : ""
          }

        </div>

        <div className="container btn-link-produits">
          {data && data.Remorque && data.Remorque.Brochure && data.Remorque.Brochure.filename ?
            <a href={baseURL + (data.Remorque.Brochure.filename)} className="brochure" target="_blank">Télécharger la brochure</a> : ""
          }
          <Link to="/Contact">Contact</Link>
        </div>

      </div>

      <div className="liste-produits produits-related">
        <div className="container">
          <h3>Ces remorques pourraient aussi vous intéresser</h3>
        </div>

        <div className="container">
          <div className="listes" >
            {data && data.allRemorques.map((remorque, id) => (
              <div className="produits" key={id}>
                { data && remorque.Image && remorque.Image[0] && remorque.Image[0].ImagesBateau && remorque.Image[0].ImagesBateau.filename ?
                  <img src={baseURL + (remorque.Image && remorque.Image[0] && remorque.Image[0].ImagesBateau && remorque.Image[0].ImagesBateau.filename ? remorque.Image[0].ImagesBateau.filename : '')} alt='image' /> : ""
                }

                {data && remorque && remorque.Etat ?
                  <div className="cat">{remorque.Etat}</div> : ""
                }
                <div className="description">
                  {data && remorque && remorque.Nom ?
                    <div className="nom">{data && remorque && remorque.Nom}</div> : ""
                  }
                 {data && remorque.Prix ?
                    <div className="prix">Prix {data && remorque.Prix} CH</div>:""
                  }
                  
                  <Link to={{ pathname: `/Detail_Remorque/${remorque.id}` }}>Plus de détails</Link>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>

      <div className="btn-back">
        <Link to="/Remorque">Revenir sur la page précédente</Link>
      </div>

      <Footer />
    </Fragment>
  )
}

export default DetailRemorque
