/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment } from 'react'
import Slider from "react-slick";
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;

const ALLSLIDETOPHOME = gql`
 {
  allSliderHomeHeaders{
    id
    Titre
    Description
    Marque{Marque}
    Image{ImagesBateau{publicUrl filename}}
  }
}      
`;
const SliderHistoires = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  }
  const { data } = useQuery(ALLSLIDETOPHOME, {});

  return (
    <Fragment>
      <div className="slider-top">
        <Slider {...settings}>
          {data && data.allSliderHomeHeaders.map((slides, id) => (
            <div className="content-slides">
              {slides.Image[0] && slides.Image[0].ImagesBateau && slides.Image[0].ImagesBateau.filename ?
                <img src={baseURL + (slides.Image && slides.Image[0] && slides.Image[0].ImagesBateau && slides.Image[0].ImagesBateau.filename ? slides.Image[0].ImagesBateau.filename : '')} alt='image' /> : ""
              }
              <div className="description">
                <div className="container">
                  {data && slides.Titre ?
                    <div className="cat">{data && slides.Titre}</div> : ""
                  }
                  {data && slides.Description ?
                    <h2>{slides.Description}</h2> : ""
                  }
                  <div className="btn">
                    {data && slides.Marque && slides.Marque.Marque ?
                      <Link to="/Bateaux">Bateaux {slides.Marque.Marque}</Link> : ""
                    }
                    <Link to="/Bateaux">Toutes Les marques</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  )
}

export default SliderHistoires



