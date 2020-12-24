/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;

const ALLHISTOIREMARIN = gql`
{
  allHistoireMarins{
    id
    Titre
    Text
    Image{filename publicUrl}
    }

    allHeaderHistoireMarins{
      id
      Text
      ImageHeader{
        id
        filename
        publicUrl
      }
    }
}
`;
const HistoireMarins = (props) => {
  const { data } = useQuery(ALLHISTOIREMARIN, {});
  return (
    <Fragment>
      <Header />
      <div className="breadcrumbs">
        <div className="container">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li>Histoire de Marins</li>
          </ul>
        </div>
      </div>

      {data && data.allHeaderHistoireMarins.map((imageh, id) => (
        <div className="entete">
          <img src={baseURL + (imageh.ImageHeader && imageh.ImageHeader && imageh.ImageHeader && imageh.ImageHeader.filename ? imageh.ImageHeader.filename : '')} alt='image' />
          <div className="description">
            <div className="container">
              <h2>{imageh.Text}</h2>
            </div>
          </div>
        </div>
      ))}

      <div className="container" >
        {data && data.allHistoireMarins.map((histoire, id) => (
          <div className="services" key={id}>
            <img className="ImgService" src={baseURL + (histoire.Image && histoire.Image.filename ? histoire.Image.filename : '')} alt='image' />
            <h3>{histoire.Titre}</h3>
            <p>{histoire.Text}</p>
          </div>
        ))}
      </div>
      <Footer />
    </Fragment>
  )
}
export default HistoireMarins
