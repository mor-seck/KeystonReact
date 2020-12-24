/* eslint-disable no-mixed-operators */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-cond-assign */
/* eslint-disable no-duplicate-case */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid  */
/* eslint-disable default-case */

import React, { Fragment, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FormulaireProduits from '../MainContent/FormulaireProduits'
import { NavLink, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Slider } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;

const FILTERS = gql`
{
  allMarques{
   id
   Marque
 }

 allTypes{
   id
   Type
 }

 allMoteurs{
   id
   Modele
 }

  allAnneeMiseEnServices{
   id
   AnneeDeMiseEnService
 }

  _allBateausMeta{count}

 allBateaus(
     sortBy: Prix_DESC,
     first:1
   ){
     id
     Prix
   }
 }`
  ;

const Bateaux = (props) => {
  const [nbrpage, setNbrpage] = useState(0);
  const [filters, setFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(gql`
  {
   allBateaus(sortBy:id_DESC,skip:${nbrpage},first:12){
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
     Image{ImagesBateau{publicUrl filename}}
     Brochure{publicUrl filename}
   }
   _allBateausMeta{count}
 }
 `);

  const { data } = useQuery(FILTERS);
  const { data: dataBeteau } = useQuery(currentFilter);
  const [etat, setEtat] = useState('TOUS')

  const handleFilter = (cle, value) => {
    if (cle === 'Etat' && value === 'NEUF' || cle === 'Etat' && value === 'OCCASION') {
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
      let min2 = 0;
      let max2 = 0;
      let min3 = 0;
      let max3 = 0;
      let prixMin = 0;
      let prixMax = data && data.allBateaus && data.allBateaus[0] ? data.allBateaus[0].Prix : 0;

      var querry = `{allBateaus(sortBy: id_DESC,skip:${nbrpage},first:12 where: {`;

      //pagination
      let next = filters.find(f => f.cle === "next");
      if (next) {
        let nbrePage = nbrpage + 12;
        setNbrpage(nbrePage)
        querry = `{allBateaus(sortBy:id_DESC, skip:${nbrePage},first:12 ,where: {`;
      }

      let prev = filters.find(f => f.cle === "prev");
      if (prev) {
        let nbrePage = nbrpage - 12;
        setNbrpage(nbrePage)
        querry = `{allBateaus(sortBy:id_DESC, skip:${nbrePage},first:12 ,where: {`;
      }


      filters.forEach(filter => {

        switch (filter.cle) {
          case 'Etat':
            querry += `Etat:${filter.value} `
            break;
          case 'Marque':
            if (filter.value === "TOUS") {

              querry += ''
            } else {
              querry += `Marque: { id: "${filter.value}" }`
            }
            break;
          case 'Moteur':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += `Moteur: { id: "${filter.value}" }`
            }

            break;
          case 'Type':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += `Type: { id : "${filter.value}" }`
            }
            break;
          case 'AnneeMiseEnService':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += `AnneeMiseEnService:{ id:"${filter.value}" }`
            }
            break;
          case "min":
            const filterPrixMin = filters.find(f => f.cle === "min")
            if (filterPrixMin)
              prixMin = filterPrixMin.value;
            break;
          case "max":
            const filterPrixMax = filters.find(f => f.cle === "max")
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
          case "PoidsMin":
            const filterMin3 = filters.find(f => f.cle === "PoidsMin")
            if (filterMin3)
              min3 = filterMin3.value;
            break;
          case "PoidsMax":
            const filterMax3 = filters.find(f => f.cle === "PoidsMax")
            if (filterMax3)
              max3 = filterMax3.value;
            break;
        }

        if (prixMax > 0 && prixMin > 0 && prixMax > prixMin) {
          querry += `AND:[
          { Prix_gte: ${prixMin} }
          { Prix_lte: ${prixMax} }
          ]`
        }

        if (max >= 0 && min >= 0 && max > min && min !== 0 && max !== 0) {
          querry += `AND:[
              { Largeur_gte: ${min} }
              { Largeur_lte: ${max} }
              ]`
        } else if ((min === null && max !== null) || min === "" || max === "" || min === null || max === null) {
          removeCategorieOnFilter()
        }

        if (max2 >= 0 && min2 >= 0 && max2 > min2 && min2 !== 0 && max2 !== 0) {
          querry += `AND:[
              { Longueur_gte: ${min2} }
              { Longueur_lte: ${max2} }
              ]`
        } else if ((min2 === null && max2 !== null) || min2 === "" || max2 === "" || min2 === null || max2 === null) {
          removeCategorieOnFilter()
        }

        if (max3 >= 0 && min3 >= 0 && max3 > min3 && min3 !== 0 && max3 !== 0) {
          querry += `AND:[
              { Poids_gte: ${min3} }
              { Poids_lte: ${max3} }
              ]`
        } else if ((min3 === null && max3 !== null) || min3 === "" || max3 === "" || min3 === null || max3 === null) {
          removeCategorieOnFilter()
        }
      });

      querry += `}){
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
        Image{ImagesBateau{publicUrl filename}}
        Brochure{publicUrl filename}
        }
        _allBateausMeta{count}
      }`
      console.log(querry)
      setCurrentFilter(gql`${querry}`);

    }
    else {
      setCurrentFilter(gql`
      {
       allBateaus(sortBy:id_DESC){
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
        Image{ImagesBateau{publicUrl filename}}
        Brochure{publicUrl filename}
       }
     }
     `)
    }
  }
  const removeCategorieOnFilter = () => {
    setEtat('TOUS')
    setFilters(filters.filter(e => e.cle !== 'Etat'))
    executeQuerry(filters.filter(e => e.cle !== 'Etat'))
  }


  return (
    <Fragment>
      <Header />
      <div className="breadcrumbs">
        <div className="container">
          <ul>
            <li><NavLink to="/">Accueil</NavLink></li>
            <li>Bateaux</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <h1>Découvrez nos bateaux neufs ou occasions</h1>
        <div className="filtre">
          <div className="btn-filtre">
            <a href="#">AFFICHER TOUS LES FILTRES</a>
          </div>
          <div className="bloc-filtre">
            <div className="bloc-init">
              <Link to="/" className="back"></Link>
              <Link to="/Bateaux" className="init">Réinitilaiser les filtres</Link>
            </div>
            <div className="type-prix">
              <div className="type">
                <p>Type de bateau</p>
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
                    onChange={(e) => { handleFilter('min', e); }}
                    max={data && data.allBateaus && data.allBateaus[0] ? data.allBateaus[0].Prix : []} min={0}
                    defaultValue={[0, data && data.allBateaus && data.allBateaus[0] ? data.allBateaus[0].Prix : []]}
                  />
                </div>
                {data && data.allBateaus && data.allBateaus.map((bateau, id) => (
                  <div className="prix-range">{bateau.Prix} </div>
                ))}
              </div>

            </div>
            <div className="type-select">
              <div className="select">
                <select onChange={(e) => handleFilter('Marque', e.target.value) ? setCurrentFilter() : null} name="">
                  <option value='TOUS' >marque</option>
                  {data && data.allMarques.map((marque, id) => (
                    <option key={marque.id} value={marque.id}>{marque.Marque}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select onChange={(e) => handleFilter('Type', e.target.value)} name="" >
                  <option value='TOUS'>Type</option>
                  {data && data.allTypes.map((type, id) => (
                    <option key={type.id} value={type.id}>{type.Type}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select onChange={(e) => handleFilter('Moteur', e.target.value)} name="">
                  <option value='TOUS' >Moteur</option>
                  {data && data.allMoteurs.map((moteur, id) => (
                    <option value={moteur.id}>{moteur.Modele}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select onChange={(e) => handleFilter('AnneeMiseEnService', e.target.value)} name="">
                  <option value='TOUS'>annee de mise en service</option>
                  {data && data.allAnneeMiseEnServices.map((annee, id) => (
                    <option value={annee.id}>{annee.AnneeDeMiseEnService}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className="type-taille">

              <div className="elts">
                <p>Largeur</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('LargeMin', e.target.value) : handleFilter('LargeMin', 1)} type="number" name="" id="largmin" />
                  <span>m</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('LargeMax', e.target.value) : handleFilter('LargeMax', 1)} type="number" name="" id="largmax" />
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
                <p>Poids</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('PoidsMin', e.target.value) : handleFilter('PoidsMin', 1)} type="number" name="" />

                  <span>kg</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('PoidsMax', e.target.value)} type="number" name="" />
                  <span>kg</span>
                </div>
              </div>

            </div>

            <div className="bloc-ok-filtre">
              <a href="#" className="ok-filtre">Filtrer la recherche</a>
            </div>
          </div>
        </div>
      </div>

      <div className="liste-produits">
        <div className="container">
          <div className="title-liste">{`Bateaux > ${etat}`}</div>
          <div className="nbr-produits">{data && data._allBateausMeta && data._allBateausMeta.count ? data._allBateausMeta.count : 0} Bateaux</div>
        </div>
        <div className="container">
          <div className="listes" >
            {dataBeteau && dataBeteau.allBateaus.map((bateau, id) => (
              <div className="produits" key={id}>
                {bateau.Image && bateau.Image[0] && bateau.Image[0].ImagesBateau && bateau.Image[0].ImagesBateau.filename ?
                  <img src={baseURL + (bateau.Image && bateau.Image[0] && bateau.Image[0].ImagesBateau && bateau.Image[0].ImagesBateau.filename ? bateau.Image[0].ImagesBateau.filename : '')} alt='image' /> : ""
                }
                {dataBeteau && bateau.Etat ?
                  <div className="cat">{bateau.Etat}</div> : ""
                }

                <div className="description">
                  {dataBeteau && bateau.Modele ?
                    <div className="nom">{bateau.Modele}</div> : ""
                  }

                  {dataBeteau && bateau.Prix ?
                    <div className="prix">Prix {bateau.Prix} CHF</div> : ''
                  }
                  <Link to={{ pathname: `/Detail_Bateau/${bateau.id}` }}>Plus de détails</Link>
                </div>
              </div>
            ))}
          </div>

          {
            nbrpage + 12 / 12 > 1 ?

              <div className="pagination">
                {nbrpage > 0 &&
                  (<a onClick={() => handleFilter("prev", nbrpage)} className="prev"></a>)
                }

                <p>Page {(nbrpage + 12) / 12} sur {dataBeteau && dataBeteau._allBateausMeta && dataBeteau._allBateausMeta.count && dataBeteau._allBateausMeta.count > 11 ? dataBeteau._allBateausMeta.count - 11 : 1}
                </p>

                {
                  dataBeteau && (dataBeteau._allBateausMeta) && (dataBeteau._allBateausMeta.count > (nbrpage + 12)) &&
                  (<a onClick={() => handleFilter("next", nbrpage)} className="next"></a>)
                }
              </div> : ""
          }
        </div>
      </div>
      <div className="formulaire form-produits">
        <div className="container">
          <h2 className='BlueTitle'>Une question à propos d’un bateau ? Nous sommes là pour vous répondre.</h2>
          <p>Merci de remplir le formulaire ci-dessous, ou de nous contacter par e-mail ou téléphone.</p>
        </div>
      </div>
      <FormulaireProduits />
      <Footer />
    </Fragment>
  )
}
export default Bateaux
