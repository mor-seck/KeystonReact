/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
import React, { Fragment, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Slider } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";
import FormulaireProduits from '../MainContent/FormulaireProduits'
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;


const FILTERS = gql`
{
  allTypeDeMoteurs{id TypeDeMoteur}

  allAnneeMiseEnServices{
    id
    AnneeDeMiseEnService
  }

  allTypeDeRelevages{
    id
    TypeDeRelevage 
  }

  allMarques{
    id 
    Marque
  }
  _allMoteursMeta{count}

  allMoteurs(
    sortBy: Prix_DESC,
    first:1
  ){
    id
    Prix
  }
}`;

const Moteur = (props) => {
  const [nbrpage, setNbrpage] = useState(0);
  const [filters, setFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(gql`
  {
    allMoteurs(sortBy:id_DESC,skip:${nbrpage},first:12){
      id
      Modele
  		Marque{id Marque}
  		PuissanceEnCv
  		PuissanceEnKw
      LongueurArbre
      BarreFranche
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
    _allMoteursMeta{count}
  
  }`);
  const { data } = useQuery(FILTERS, {});
  const { data: dataMoteur } = useQuery(currentFilter,);
  const  [etat,setEtat]=useState('TOUS')
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
      let min2 = 0;
      let max2 = 0;
      let min3 = 0;
      let max3 = 0;
      let min4 = 0;
      let max4 = 0;
      let prixMin = 0;
      let prixMax = data && data.allMoteurs && data.allMoteurs[0] ? data.allMoteurs[0].Prix : '';
      var querry = '{allMoteurs(sortBy:id_DESC, where: {';

      //pagination
      let next = filters.find(f => f.cle === "next");
      if (next) {
        let nbrePage = nbrpage + 12;
        setNbrpage(nbrePage)
        querry = `{allMoteurs(sortBy:id_DESC, skip:${nbrePage},first:12 ,where: {`;
      }

      let prev = filters.find(f => f.cle === "prev");
      if (prev) {
        let nbrePage = nbrpage - 12;
        setNbrpage(nbrePage)
        querry = `{allMoteurs(sortBy:id_DESC, skip:${nbrePage},first:12 ,where: {`;
      }
      filters.forEach(filter => {

        switch (filter.cle) {
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
          case 'Etat':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += ` Etat:${filter.value}`
            }
            break;

          case 'typeDeMoteur':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += ` typeDeMoteur: {id: "${filter.value}" }`
            }
            break;

          case 'typeDeRelevage':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += ` typeDeRelevage: {id: "${filter.value}" }`
            }
            break;

          case 'Marque':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += ` Marque: {id: "${filter.value}" }`
            }
            break;

          case 'AnneeMiseEnService':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += ` AnneeMiseEnService:{id: "${filter.value}" }`
            }
            break;

          case 'Arbre':
            if (filter.value === "TOUS") {
              querry += ''
            } else {
              querry += ` Arbre:${filter.value}`
            }
            break;
          case 'BarreFranche':
            querry += ` BarreFranche:${filter.value}`
            break;

          case "PuissCVMin":
            const filterMin2 = filters.find(f => f.cle === "PuissCVMin")
            if (filterMin2)
              min2 = filterMin2.value;
            break;
          case "PuissCVMax":
            const filterMax2 = filters.find(f => f.cle === "PuissCVMax")
            if (filterMax2)
              max2 = filterMax2.value;
            break;

          case "PuissKWMin":
            const filterMin4 = filters.find(f => f.cle === "PuissKWMin")
            if (filterMin4)
              min4 = filterMin4.value;
            break;
          case "PuissKWMax":
            const filterMax4 = filters.find(f => f.cle === "PuissKWMax")
            if (filterMax4)
              max4 = filterMax4.value;
            break;

          case "HeureMin":
            const filterMin3 = filters.find(f => f.cle === "HeureMin")
            if (filterMin3)
              min3 = filterMin3.value;
            break;

          case "HeureMax":
            const filterMax3 = filters.find(f => f.cle === "HeureMax")
            if (filterMax3)
              max3 = filterMax3.value;
            break;

        }

        if (prixMax > 0 && prixMin > 0 && prixMax > prixMin) {
          querry += ` AND:[
          { Prix_gte: ${prixMin} }
          { Prix_lte: ${prixMax} }
          ]`
        }


        if (max2 >= 0 && min2 >= 0 && max2 > min2 && min2 !== 0 && max2 !== 0) {
          querry += ` AND:[
            { PuissanceEnCv_gte: ${min2} }
            { PuissanceEnCv_lte: ${max2} }
            ]`
        } else if ((min2 === null && max2 !== null) || min2 === "" || max2 === "" || min2 === null || max2 === null) {
          removeCategorieOnFilter()
        }

        if (max4 >= 0 && min4 >= 0 && max4 > min4 && min4 !== 0 && max4 !== 0) {
          querry += ` AND:[
            { PuissanceEnKw_gte: ${min4} }
            { PuissanceEnKw_lte: ${max4} }
            ]`
        } else if ((min4 === null && max4 !== null) || min4 === "" || max4 === "" || min4 === null || max4 === null) {
          removeCategorieOnFilter()
        }

        if (max3 >= 0 && min3 >= 0 && max3 > min3 && min3 !== 0 && max3 !== 0) {
          querry += ` AND:[
            { nombreHeureDeMarche_gte: ${min3} }
            { nombreHeureDeMarche_lte: ${max3} }
            ]`
        } else if ((min3 === null && max3 !== null) || min3 === "" || max3 === "" || min3 === null || max3 === null) {
          removeCategorieOnFilter()
        }

      });
      querry += `}){
        id
        Modele
        Marque{id Marque}
        PuissanceEnCv
        PuissanceEnKw
        LongueurArbre
        BarreFranche
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
      _allMoteursMeta{count}
      }`
      console.log(querry)
      setCurrentFilter(gql`${querry}`);
    }
    else {
      setCurrentFilter(gql`
      {
        allMoteurs(sortBy:id_DESC){
          id
          Modele
          Marque{id Marque}
          PuissanceEnCv
          PuissanceEnKw
          LongueurArbre
          BarreFranche
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
        _allMoteursMeta{count}
       
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
            <li><Link to="/">Accueil</Link></li>
            <li>Moteurs</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <h1>Découvrez nos moteurs neufs ou occasions</h1>
        <div className="filtre">
          <div className="btn-filtre">
            <a href="#">Filter la recherche</a>
          </div>
          <div className="bloc-filtre">
            <div className="bloc-init">
              <a href="#" className="back"></a>
              <Link to="/Moteur" className="init">Réinitilaiser les filtres</Link>
            </div>

            <div className="type-prix">
              <div className="type">
                <p>Type de Moteur</p>
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
                    max={data && data.allMoteurs && data.allMoteurs[0] ? data.allMoteurs[0].Prix : ''} min={0}
                    defaultValue={[0, data && data.allMoteurs && data.allMoteurs[0] ? data.allMoteurs[0].Prix : '']}
                  />
                </div>
                {data && data.allMoteurs && data.allMoteurs.map((moteur, id) => (
                  <div className="prix-range">{moteur.Prix}</div>
                ))}
              </div>
            </div>
            <div className="type-select">
              <div className="select">
                <select name="" onChange={(e) => handleFilter('Marque', e.target.value)}>
                  <option value='TOUS'>marque</option>
                  {data && data.allMarques.map((marque, id) => (
                    <option value={marque.id}>{marque.Marque}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select name="" onChange={(e) => handleFilter('typeDeRelevage', e.target.value)}>
                  <option value='TOUS'>Type de Relevage</option>
                  {data && data.allTypeDeRelevages.map((typeRelevage, id) => (
                    <option value={typeRelevage.id} key={id}>{typeRelevage.TypeDeRelevage}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select onChange={(e) => handleFilter('typeDeMoteur', e.target.value)} name="">
                  <option value='TOUS'>Type de Moteur</option>
                  {data && data.allTypeDeMoteurs.map((Typemoteur, id) => (
                    <option value={Typemoteur.id}>{Typemoteur.TypeDeMoteur}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select onChange={(e) => handleFilter('AnneeMiseEnService', e.target.value)} name="">
                  <option value='TOUS'>Annee de mise en service</option>
                  {data && data.allAnneeMiseEnServices.map((annee, id) => (
                    <option value={annee.id}>{annee.AnneeDeMiseEnService}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select onChange={(e) => handleFilter('Arbre', e.target.value)} name="">
                  <option value='TOUS'>Arbre</option>
                  <option value='S'>S</option>
                  <option value='L'>L</option>
                  <option value='X'>X</option>
                  <option value='U'>U</option>
                </select>
              </div>

              <div className="select">
                <select onChange={(e) => handleFilter('BarreFranche', e.target.value)} name="">
                  <option value='TOUS'>Barre Franche</option>
                  <option value='Avec'>Avec</option>
                  <option value='Sans'>Sans</option>
                </select>
              </div>
            </div>

            <div className="type-taille">
              <div className="elts">
                <p>Puissance CV</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('PuissCVMin', e.target.value) : handleFilter('PuissCVMin', 1)} type="number" name="" />
                  <span>CV</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('PuissCVMax', e.target.value)} type="number" name="" />
                  <span>CV</span>
                </div>
              </div>

              <div className="elts">
                <p>Puissance KW</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('PuissKWMin', e.target.value) : handleFilter('PuissKWMax', 1)} type="number" name="" />
                  <span>KW</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('PuissKWMax', e.target.value)} type="number" name="" />
                  <span>KW</span>
                </div>
              </div>

              <div className="elts">
                <p>Heure/Marche</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('HeureMin', e.target.value) : handleFilter('HeureMin', 1)} type="number" name="" />
                  <span>h</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('HeureMax', e.target.value)} type="number" name="" />
                  <span>h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="liste-produits">
        <div className="container">
          <div className="title-liste">{`Moteurs > ${etat }`}</div>
          <div className="nbr-produits">{data && data._allMoteursMeta && data._allMoteursMeta.count ? data._allMoteursMeta.count : 0} Moteurs</div>
        </div>

        <div className="container">
          <div className="listes" >
            {dataMoteur && dataMoteur.allMoteurs.map((moteur, id) => (
              <div className="produits" key={id}>
                { dataMoteur && moteur.Image && moteur.Image[0] && moteur.Image[0].ImagesBateau && moteur.Image[0].ImagesBateau.filename ?
                  <img src={baseURL + (moteur.Image && moteur.Image[0] && moteur.Image[0].ImagesBateau && moteur.Image[0].ImagesBateau.filename ? moteur.Image[0].ImagesBateau.filename : '')} alt='image' />:""
                }
               
                {
                dataMoteur && moteur.Etat ?
                  <div className="cat">{moteur.Etat}</div>: ""
                }
                <div className="description">
                  { dataMoteur && moteur.Modele ?
                   <div className="nom">{moteur.Modele}</div>:""
                  }
                
                { dataMoteur && moteur.Prix ?
                   <div className="prix">Prix {moteur.Prix} CHF</div>:""
                }
                 
                  <Link to={{ pathname: `/Detail_Moteur/${moteur.id}` }}>Plus de détails</Link>
                </div>
              </div>
            ))}
          </div>
          
          {nbrpage + 12 / 12 > 1 ?
          <div className="pagination">
            {nbrpage > 0 &&
              (<a onClick={() => handleFilter("prev", nbrpage)} className="prev"></a>)
            }

            <p>Page {(nbrpage + 12) / 12} sur {dataMoteur && dataMoteur._allMoteursMeta && dataMoteur._allMoteursMeta.count && dataMoteur._allMoteursMeta.count >11 ? dataMoteur._allMoteursMeta.count - 11 : 1}
            </p>
            {
              dataMoteur && (dataMoteur._allMoteursMeta) && (dataMoteur._allMoteursMeta.count > (nbrpage + 12)) &&
              (<a onClick={() => handleFilter("next", nbrpage)} className="next"></a>)
            }
          </div>:""
          }
        </div>
        
      </div>
      <div className="formulaire form-produits">
        <div className="container">
          <h2 className='BlueTitle'>Une question à propos d’un Moteur ? Nous sommes là pour vous répondre.</h2>
          <p>Merci de remplir le formulaire ci-dessous, ou de nous contacter par e-mail ou téléphone.</p>
        </div>
      </div>
      <FormulaireProduits />
      <Footer />
    </Fragment>
  );
}
export default Moteur
