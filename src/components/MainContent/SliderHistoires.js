/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment } from 'react'
import { useQuery, gql } from '@apollo/client';
import Slider from "react-slick";
import { Link } from 'react-router-dom'
const baseURL = "https://lepori.dev.pulse.digital/uploads/"

const ALLSLIDERHISTOIRE = gql`
 {
  allSliderHistoireMarins{
    id
    Titre 
    Description
    Image{filename publicUrl}
    Date
  }
}      
`;

const SliderHistoires = (props) => {
  const {data } = useQuery(ALLSLIDERHISTOIRE, {});
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    dots: true,
  }
  return (
    <Fragment>
      <div className="slider slider-histoire">
        <div className="slides">
          <Slider {...settings}>
            {data && data.allSliderHistoireMarins.map((slides, id) => (
              <div className="content-slides histoire slick-dots">
                {slides.Image && slides.Image && slides.Image && slides.Image.filename ?
                  <div className="images">
                    <img src={baseURL + (slides.Image && slides.Image && slides.Image && slides.Image.filename ? slides.Image.filename : '')} alt='image' />
                  </div>:""
                }
              
                <div className="content-info">
                  <div className="content">
                   { data && slides.Titre ?
                   <h2>{slides.Titre}</h2>:""
                   }

                   { data && slides.Date ?
                   <div className="date">{slides.Date}</div>:""
                   }

                   {data && slides.Description ?
                    <p>{slides.Description}</p>:""
                   }
                    <Link to="/HistoiresMarins">Toutes les histoires</Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </Fragment>
  )
}
export default SliderHistoires
