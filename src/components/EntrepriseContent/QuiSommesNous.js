/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react';
import imgQuiSommesNous from '../../assets/images/lepori-img.png';
import bateau from '../../assets/images/bateau.png';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom'
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;
const ALLENTREPRISE = gql`
{
  allEntreprises{id Titre Text }
  allHeaderEntreprises{
    id
    ImageHeader{filename publicUrl}
    TextHeader
  }
}
`;
const QuiSommesNous = (props) => {
  const {data } = useQuery(ALLENTREPRISE, {});
  return (
    <Fragment>
      <div className="breadcrumbs">
        <div className="container">
          <ul>
          <li><Link to="/">Accueil</Link></li>
          <li>Entreprise</li>
          </ul>
        </div>
      </div>

      {data && data.allHeaderEntreprises.map((header, id) => (
        <div className="entete">
          <img src={baseURL + (header.ImageHeader && header.ImageHeader && header.ImageHeader && header.ImageHeader.filename ? header.ImageHeader.filename : '')} alt='image' />
          <div className="description">
            <div className="container">
              <h2>{data && header.TextHeader}</h2>
            </div>
          </div>
        </div>
      ))}

      <div className="container" >
        {data && data.allEntreprises.map((entreprises, id) => (
          <div className="services" key={id}>
            <h3>{entreprises.Titre}</h3>
            <p>{entreprises.Text}</p>
          </div>
        ))}
      </div>

      <div className="main-lepori">
        <div className="quiSommesNous">
          <div className="container">
            <div className='images'>
              <img src={imgQuiSommesNous} />
            </div>
            <div className='textes'>
              <p>
                Nous sommes aussi bien spécialisé dans la vente
                de bateaux neufs et d’occasion que dans l’après-vente
                ; à savoir le service et l’entretien des moteurs,
                le gardiennage et l’hivernage de votre bateau,
                le transport en remorque, et beaucoup d’autres.
                <span>M. Lepori</span>
              </p>
            </div>
          </div>

        </div>
      </div>
      <img className='imgQuiSommesNous' src={bateau}></img>
    </Fragment>
  )
}

export default QuiSommesNous
