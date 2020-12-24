/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { Fragment } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
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
    Electronique(where:{ id:"${id}"}){
      id
      Nom
      Marque{id Marque}
      Type{id Type}
      Modele{id Modele}
      TailleEnPouces
      Etat
      Prix
      Image{id ImagesBateau {id filename publicUrl}}
      Remarque
      Brochure{id filename publicUrl}
    }

    allElectroniques(sortBy:id_DESC,first:4){
      id
      Nom
      Marque{id Marque}
      Type{id Type}
      Modele{id Modele}
      TailleEnPouces
      Etat
      Prix
      Image{id ImagesBateau {id filename publicUrl}}
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
            <li><Link to="/Electronique">Electronique</Link></li>
            {data && data.Electronique && data.Electronique.Etat  ?
              <li>
                {data.Electronique.Etat }
              </li> : ""
            }

            {data && data.Electronique && data.Electronique.Nom ?
              <li>{data.Electronique.Nom}</li> : ""
            }

          </ul>
        </div>
      </div>

      <div className="details">
        <div className="container">

          <div className="description">

            {data && data.Electronique && data.Electronique.Nom ?
              <h1>{data.Electronique.Nom}</h1> : ""
            }

            {data && data.Electronique && data.Electronique.Prix ?
              <div className="prix">
                Prix {data.Electronique.Prix} CHF
              </div> : ""
            }

            {data && data.Electronique && data.Electronique.ElectroniqueType ?
              <div className="type">
                {data.Electronique.ElectroniqueType}
              </div> : ""
            }

            <div className="caracteristique">
              {data && data.Electronique && data.Electronique.Marque && data.Electronique.Marque.Marque ?
                <div>
                  <span>Marque </span> {data.Electronique.Marque.Marque}
                </div> : ""
              }

              {data && data.Electronique && data.Electronique.Modele && data.Electronique.Modele.Modele ?
                <div><span>Modele </span>
                  {data.Electronique.Modele.Modele}
                </div> : ""
              }

              {data && data.Electronique && data.Electronique.Type && data.Electronique.Type.Type ?
                <div><span>Type </span> {data.Electronique.Type.Type}</div> : ""
              }

              {data && data.Electronique && data.Electronique.TailleEnPouces ?
                <div><span>Taille (en Pouce) </span> {data.Electronique.TailleEnPouces}</div> : ""
              }
            </div>
            {data && data.Electronique && data.Electronique.Remarque ?
              <div className="remarques">
                Remarques <br />
                {data && data.Electronique.Remarque}
              </div> : ''
            }
          </div>

          {data && data.Electronique.Image && data.Electronique.Image[0] && data.Electronique.Image[0].ImagesBateau && data.Electronique.Image[0].ImagesBateau.filename ?
            <div className="slide-images slidetail">
              <div className="images">
              <Slider {...settings}>
                {data.Electronique.Image && data.Electronique.Image[0] && data.Electronique.Image[0].ImagesBateau && data.Electronique.Image[0].ImagesBateau.filename ?
                <div>
                  <img src={baseURL + (data.Electronique.Image && data.Electronique.Image[0] && data.Electronique.Image[0].ImagesBateau && data.Electronique.Image[0].ImagesBateau.filename ? data.Electronique.Image[0].ImagesBateau.filename : '')} alt='image' />
                </div>:""
                }
                {data.Electronique.Image && data.Electronique.Image[1] && data.Electronique.Image[1].ImagesBateau && data.Electronique.Image[1].ImagesBateau.filename ?
                <div>
                  <img src={baseURL + (data.Electronique.Image && data.Electronique.Image[1] && data.Electronique.Image[1].ImagesBateau && data.Electronique.Image[1].ImagesBateau.filename ? data.Electronique.Image[0].ImagesBateau.filename : '')} alt='image' />
                </div>:""
                }
                {data.Electronique.Image && data.Electronique.Image[2] && data.Electronique.Image[2].ImagesBateau && data.Electronique.Image[0].ImagesBateau.filename ?
                <div>
                  <img src={baseURL + (data.Electronique.Image && data.Electronique.Image[2] && data.Electronique.Image[2].ImagesBateau && data.Electronique.Image[2].ImagesBateau.filename ? data.Electronique.Image[2].ImagesBateau.filename : '')} alt='image' />
                </div>:""
                }
                {data.Electronique.Image && data.Electronique.Image[3] && data.Electronique.Image[3].ImagesBateau && data.Electronique.Image[3].ImagesBateau.filename ?
                <div>
                  <img src={baseURL + (data.Electronique.Image && data.Electronique.Image[3] && data.Electronique.Image[3].ImagesBateau && data.Electronique.Image[3].ImagesBateau.filename ? data.Electronique.Image[3].ImagesBateau.filename : '')} alt='image' />
                </div>:""
                } 
              </Slider>
              </div>
            </div> : ""
          }

        </div>

        <div className="container btn-link-produits">
          {data && data.Electronique && data.Electronique.Brochure && data.Electronique.Brochure.filename ?
            <a href={baseURL + (data.Electronique.Brochure.filename)} className="brochure" target="_blank">Télécharger la brochure</a>
            : ""
          }
          <Link to="/Contact">Contact</Link>
        </div>


      </div>

      <div className="liste-produits produits-related">
        <div className="container">
          <h3>Ces accessoires pourraient aussi vous intéresser</h3>
        </div>

        <div className="container">
          <div className="listes" >
            {data && data.allElectroniques.map((electronique, id) => (
              <div className="produits" key={id}>
                {data && electronique.Image && electronique.Image[0] && electronique.Image[0].ImagesBateau && electronique.Image[0].ImagesBateau.filename ?
                  <img src={baseURL + (data && electronique.Image && electronique.Image[0] && electronique.Image[0].ImagesBateau && electronique.Image[0].ImagesBateau.filename ? electronique.Image[0].ImagesBateau.filename : '')} alt='image' />:""
                }
              
                {data && data.Electronique && data.Electronique.Etat ?
                 <div className="cat">{data.Electronique.Etat}</div> :""
                }
                
                <div className="description">
                  {data && electronique && electronique.Nom ?
                    <div className="nom">{data && electronique.Nom}</div>:""
                  }

                  {data && electronique && electronique.Prix ?
                    <div className="prix">Prix {data && electronique.Prix} CHF</div>:""
                  }
                  
                  <Link to={{ pathname: `/Detail_Electronique/${data && electronique.id}` }}>Plus de détails</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="btn-back">
        <Link to="/Electronique">Revenir sur la page précédente</Link>
      </div>

      <Footer />
    </Fragment>
  )
}

export default DetailRemorque
