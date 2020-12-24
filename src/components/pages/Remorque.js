/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */

import React, { Fragment, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Slider } from 'rsuite'
import FormulaireProduits from '../MainContent/FormulaireProduits'
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;

const FILTERS = gql`
 {

  allTypes{
    id 
    Type
  }

  allAnneeMiseEnServices{
    id
    AnneeDeMiseEnService
  }
  _allRemorquesMeta{count}

  allRemorques(
    sortBy: Prix_DESC,
    first:1
  ){
    id
    Prix
  }
  allAmenagementRemorques{
    id
    AmenagementRemorque
 }
 _allRemorquesMeta{count}
}      
`;

const Remorque = (props) => {
  const [nbrpage, setNbrpage] = useState(0);
  const [filters, setFilters] = useState([]);
 
  const [currentFilter, setCurrentFilter] = useState(gql`

  {
    allRemorques(sortBy:id_DESC,skip:${nbrpage},first:12){
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
   _allRemorquesMeta{count}
 }      
 `);

  const { data } = useQuery(FILTERS, {});
  const { data: dataRemorque } = useQuery(currentFilter,);
  const [etat,setEtat]=useState('TOUS')
  const handleFilter = (cle, value) => {
    if(cle==='Etat' && value==='NEUF' || cle==='Etat' && value==='OCCASION'){
      setEtat(value)
   }

    let filtersInitial = [...filters];
    const filter = filters.find(e => e.cle === cle);
    if (filter && filter.value) {
      filtersInitial = filters.filter(e => e.cle !== cle);
      filtersInitial.push({ cle, value })
      setFilters(filtersInitial);
      executeQuerry(filtersInitial)
    }
    else {
      filtersInitial.push({ cle, value })
      setFilters(filtersInitial);
      executeQuerry(filtersInitial)
    }
  }


  const executeQuerry = (filters) => {
    if (filters && filters[0]) {
      let min = 0;
      let max = 0;
      let min1 = 0;
      let max1 = 0;
      let min2 = 0;
      let max2 = 0;
      let min3 = 0;
      let max3 = 0;
      let prixMin = 0;
      let prixMax = data && data.allRemorques && data.allRemorques[0] ? data.allRemorques[0].Prix : '';
      var querry = '{allRemorques(sortBy: id_DESC, where: {';

      //pagination
      let next = filters.find(f => f.cle === "next");
      if (next) {
        let nbrePage = nbrpage + 12;
        setNbrpage(nbrePage)
        querry = `{allRemorques(sortBy:id_DESC, skip:${nbrePage},first:12 ,where: {`;
      }

      let prev = filters.find(f => f.cle === "prev");
      if (prev) {
        let nbrePage = nbrpage - 12;
        setNbrpage(nbrePage)
        querry = `{allRemorques(sortBy:id_DESC, skip:${nbrePage},first:12 ,where: {`;
      }
      filters.forEach(filter => {
        switch (filter.cle) {
          case 'Etat':
            if (filter.value === 'TOUS') {
              querry += ''
            } else {
              querry += ` Etat: ${filter.value}`
            }
            break;

          case 'AnneeMiseEnService':
            if (filter.value === 'TOUS') {
              querry += ''
            } else {
              querry += ` AnneeMiseEnService:{id: "${filter.value}" }`
            }
            break;

          case 'AmenagementRemorque':
            if (filter.value === 'TOUS') {
              querry += ''
            } else {
              querry += ` AmenagementRemorque:{id: "${filter.value}" }`
            }
            break;

          case 'typeDeBateaux':
            if (filter.value === 'TOUS') {
              querry += ''
            } else {
              querry += ` typeDeBateaux:{id: "${filter.value}" }`
            }
            break;

          case "min1":
            const filterPrixMin = filters.find(f => f.cle === "min1")
            if (filterPrixMin)
              prixMin = filterPrixMin.value;
            break;
          case "max1":
            const filterPrixMax = filters.find(f => f.cle === "max1")
            if (filterPrixMax)
              prixMax = filterPrixMax.value;
            break;

          case "LargeMin":
            const filterMin = filters.find(f => f.cle === "LargeMin")
            if (filterMin)
              min = filterMin.value;
            break;
          case "LargeMax":
            const filterMax = filters.find(f => f.cle === "LargeMax")
            if (filterMax)
              max = filterMax.value;
            break;

          case "LongMin":
            const filterMin2 = filters.find(f => f.cle === "LongMin")
            if (filterMin2)
              min2 = filterMin2.value;
            break;

          case "LongMax":
            const filterMax2 = filters.find(f => f.cle === "LongMax")
            if (filterMax2)
              max2 = filterMax2.value;
            break;

          case "chargeMin":
            const filterMin3 = filters.find(f => f.cle === "chargeMin")
            if (filterMin3)
              min3 = filterMin3.value;
            break;

          case "chargeMax":
            const filterMax3 = filters.find(f => f.cle === "chargeMax")
            if (filterMax3)
              max3 = filterMax3.value;
            break;

          case "PoidsTotalChargeMin":
            const filterMin1 = filters.find(f => f.cle === "PoidsTotalChargeMin")
            if (filterMin1)
              min1 = filterMin1.value;
            break;

          case "PoidsTotalChargeMax":
            const filterMax1 = filters.find(f => f.cle === "PoidsTotalChargeMax")
            if (filterMax1)
              max1 = filterMax1.value;
            break;
        }

        if (prixMax > 0 && prixMin > 0 && prixMax > prixMin) {
          querry += ` AND:[
          { Prix_gte: ${prixMin} }
          { Prix_lte: ${prixMax} }
          ]`
        }
        if (max >= 0 && min >= 0 && max > min && min !== 0 && max !== 0) {
          querry += ` AND:[
            { Largeur_gte: ${min} }
            { Largeur_lte: ${max} }
            ]`
        } else if ((min === null && max !== null) || min === "" || max === "" || min === null || max === null) {
          removeCategorieOnFilter()
        }
        if (max2 >= 0 && min2 >= 0 && max2 > min2 && min2 !== 0 && max2 !== 0) {
          querry += ` AND:[
            { Longueur_gte: ${min2} }
            { Longueur_lte: ${max2} }
            ]`
        } else if ((min2 === null && max2 !== null) || min2 === "" || max2 === "" || min2 === null || max2 === null) {
          removeCategorieOnFilter()
        }

        if (max3 >= 0 && min3 >= 0 && max3 > min3 && min3 !== 0 && max3 !== 0) {
          querry += ` AND:[
            { chargeUtile_gte: ${min3} }
            { chargeUtile_lte: ${max3} }
            ]`
        } else if ((min3 === null && max3 !== null) || min3 === "" || max3 === "" || min3 === null || max3 === null) {
          removeCategorieOnFilter()
        }

        if (max1 >= 0 && min1 >= 0 && max1 > min1 && min1 !== 0 && max1 !== 0) {
          querry += ` AND:[
            { PoidsTotalEnCharge_gte: ${min1} }
            { PoidsTotalEnCharge_lte: ${max1} }
            ]`
        } else if ((min1 === null && max1 !== null) || min1 === "" || max1 === "" || min1 === null || max1 === null) {
          removeCategorieOnFilter()
        }

      });
      querry += `}){
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
        _allRemorquesMeta{count}
      }`
      console.log(querry)
      setCurrentFilter(gql`${querry}`);
    }
    else {
      setCurrentFilter(gql`
      {
        allRemorques(sortBy:id_DESC){
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
       _allRemorquesMeta{count}
     }      
     `)
    }
  }
  const removeCategorieOnFilter = () => {
    setEtat('TOUS')
    setFilters(filters.filter(e => e.cle !== 'Etat'));
    executeQuerry(filters.filter(e => e.cle !== 'Etat'))
  }
  return (
    <Fragment>
      <Header />
      <div className="breadcrumbs">
        <div className="container">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li>Remorques</li>
          </ul>
        </div>
      </div>

      <div className="container">
        <h1>Découvrez nos remorques neufs ou occasions</h1>
        <div className="filtre">

          <div className="btn-filtre">
            <a href="#">Filter la recherche</a>
          </div>

          <div className="bloc-filtre">
            <div className="bloc-init">
              <a href="#" className="back"></a>
              <Link to="/Remorque" className="init">Réinitilaiser les filtres</Link>
            </div>

            <div className="type-prix">
              <div className="type">
                <p>Type de Remorque</p>
                <input onChange={(e) => filters.find(e => e.cle === 'Etat') ? removeCategorieOnFilter() : null}
                  type="radio" name='categorie' value="TOUS" id="type_tous" />
                <label htmlFor="type_tous">Tous</label>
                <input onChange={(e) => handleFilter('Etat', e.target.value)} type="radio" value="NEUF" name='categorie' id="type_neuf" />
                <label htmlFor="type_neuf">Neufs</label>
                <input onChange={(e) => handleFilter('Etat', e.target.value)} type="radio" value="OCCASION" name='categorie' id="type_occasions" />
                <label htmlFor="type_occasions">Occasions</label>
              </div>

              <div className="prix">
                <p>Prix</p>
                <div className="prix-range">0</div>
                <div id="slide-range">
                  <Slider
                    onChange={(e) => { handleFilter('min1', e); }}
                    max={data && data.allRemorques && data.allRemorques[0] ? data.allRemorques[0].Prix : ''} min={0}
                    defaultValue={[0, data && data.allRemorques && data.allRemorques[0] ? data.allRemorques[0].Prix : '']}
                  />
                </div>
                {data && data.allRemorques && data.allRemorques.map((remorque, id) => (
                  <div className="prix-range">{remorque.Prix}</div>
                ))}
              </div>

            </div>
            <div className="type-select">
              <div className="select">
                <select onChange={(e) => handleFilter('typeDeBateaux', e.target.value)} name="">
                  <option value='TOUS'>Type</option>
                  {data && data.allTypes.map((type, id) => (
                    <option key={type.id} value={type.id}>{type.Type}</option>
                  ))}
                </select>
              </div>

              <div className="select elts">
                <select name="" onChange={(e) => handleFilter('AnneeMiseEnService', e.target.value)}>
                  <option value='TOUS'>annee de mise en service</option>
                  {data && data.allAnneeMiseEnServices.map((annee, id) => (
                    <option value={annee.id}>{annee.AnneeDeMiseEnService}</option>
                  ))}
                </select>
              </div>

              <div className="select elts">
                <select name="" onChange={(e) => handleFilter('AmenagementRemorque', e.target.value)}>
                  <option value='TOUS'>Aménagement</option>
                  {data && data.allAmenagementRemorques.map((amenagement) => (
                    <option value={amenagement.id}>{amenagement.AmenagementRemorque}</option>
                  ))}
                </select>
              </div>


            </div>
            <div className="type-taille">
              <div className="elts">
                <p>Largeur</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('LargeMin', e.target.value) : handleFilter('LargeMin', 1)} type="number" name="" />
                  <span>m</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('LargeMax', e.target.value)} type="number" name="" />
                  <span>m</span>
                </div>
              </div>

              <div className="elts">
                <p>Longueur</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('LongMin', e.target.value) : handleFilter('LongMin', 1)} type="number" name="" />
                  <span>m</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('LongMax', e.target.value)} type="number" name="" />
                  <span>m</span>
                </div>
              </div>

              <div className="elts">
                <p>Charge Utile</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('chargeMin', e.target.value) : handleFilter('chargeMin', 1)} type="number" name="" />
                  <span>t</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('chargeMax', e.target.value)} type="number" name="" />
                  <span>t</span>
                </div>
              </div>

              <div className="elts">
                <p>Poids.T.Charge</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('PoidsTotalChargeMin', e.target.value) : handleFilter('PoidsTotalChargeMin', 1)} type="number" name="" />
                  <span>t</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('PoidsTotalChargeMax', e.target.value)} type="number" name="" />
                  <span>t</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="liste-produits">
        <div className="container">
          <div className="title-liste">{`Remorque > ${etat}`}</div>
          <div className="nbr-produits">{data && data._allRemorquesMeta && data._allRemorquesMeta.count ? data._allRemorquesMeta.count : 0} Remorques</div>
        </div>

        <div className="container">
          <div className="listes" >
            {dataRemorque && dataRemorque.allRemorques.map((remorque, id) => (
              <div className="produits" key={id}>
                {remorque.Image && remorque.Image[0] && remorque.Image[0].ImagesBateau && remorque.Image[0].ImagesBateau.filename ?
                  <img src={baseURL + (remorque.Image && remorque.Image[0] && remorque.Image[0].ImagesBateau && remorque.Image[0].ImagesBateau.filename ? remorque.Image[0].ImagesBateau.filename : '')} alt='image' /> : ""
                }

                {dataRemorque && remorque.Etat ?
                  <div className="cat">{remorque.Etat}</div> : ""
                }

                <div className="description">
                  {dataRemorque && remorque.Nom ?
                    <div className="nom">{remorque.Nom}</div> : ""
                  }

                  {dataRemorque && remorque.Prix ?
                    <div className="prix">Prix: {remorque.Prix} CHF</div> : ""
                  }

                  <Link to={{ pathname: `/Detail_Remorque/${remorque.id}` }}>Plus de détails</Link>
                </div>
              </div>
            ))}
          </div>
          {nbrpage + 12 / 12 > 1 ?
            <div className="pagination">
              {nbrpage > 0 &&
                (<a onClick={() => handleFilter("prev", nbrpage)} className="prev"></a>)
              }

              <p>Page {(nbrpage + 12) / 12} sur {dataRemorque && dataRemorque._allRemorquesMeta && dataRemorque._allRemorquesMeta.count && dataRemorque._allRemorquesMeta.count > 11 ? dataRemorque._allRemorquesMeta.count - 11 : 1}
              </p>
              {
                dataRemorque && (dataRemorque._allRemorquesMeta) && (dataRemorque._allRemorquesMeta.count > (nbrpage + 12)) &&
                (<a onClick={() => handleFilter("next", nbrpage)} className="next"></a>)
              }
            </div> : ""
          }

        </div>
      </div>
      <div className="formulaire form-produits">
        <div className="container">
          <h2 className='BlueTitle'>Une question à propos d’une Remorque ? Nous sommes là pour vous répondre.</h2>
          <p>Merci de remplir le formulaire ci-dessous, ou de nous contacter par e-mail ou téléphone.</p>
        </div>
      </div>
      <FormulaireProduits />
      <Footer />
    </Fragment>
  )
}

export default Remorque
