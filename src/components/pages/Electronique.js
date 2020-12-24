/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
import React, { Fragment, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import { Slider } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";
import FormulaireProduits from '../MainContent/FormulaireProduits';
const baseURL = `${process.env.REACT_APP_DOMAINE}/uploads/`;

const FILTERS = gql`
{
  allMarques{
    id 
    Marque
  }

  allMoteurs{
    id 
    Modele
  }

   allAnneeMiseEnServices{
    id
    AnneeDeMiseEnService
  }

  allTypes{
    id 
    Type
  }
  allModeles{id Modele}
  _allElectroniquesMeta{count}

  allAnneeMiseEnServices{
    id
    AnneeDeMiseEnService
  }

  allElectroniques(
    sortBy: Prix_DESC,
    first:1
  ){
    id
    Prix
  }
  _allElectroniquesMeta{count}
}      
`;
const Electronique = (props) => {
  const [nbrpage, setNbrpage] = useState(0);
  const [filters, setFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(gql`
  {
    allElectroniques{
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
   _allElectroniquesMeta{count}
 }      
 `);
  const { data } = useQuery(FILTERS, {});
  const { data: dataElectronique } = useQuery(currentFilter,);
  const  [etat,setEtat]=useState('TOUS')
  
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
      let min2 = 0;
      let max2 = 0;
      let prixMin = 0;
      let prixMax = data && data.allElectroniques && data.allElectroniques[0] ? data.allElectroniques[0].Prix : '';
      var querry = '{allElectroniques(sortBy:id_DESC, where: {';
       //pagination
       let next = filters.find(f => f.cle === "next");
       if (next) {
         let nbrePage = nbrpage + 12;
         setNbrpage(nbrePage)
         querry = `{allElectroniques(sortBy:id_DESC, skip:${nbrePage},first:12 ,where: {`;
       }
 
       let prev = filters.find(f => f.cle === "prev");
       if (prev) {
         let nbrePage = nbrpage - 12;
         setNbrpage(nbrePage)
         querry = `{allElectroniques(sortBy:id_DESC, skip:${nbrePage},first:12 ,where: {`;
       }
      filters.forEach(filter => {
        switch (filter.cle) {
          case 'Etat':
            if (filter.value === 'TOUS') {
              querry += ""
            } else {
              querry += `Etat: ${filter.value} `
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

          case 'Marque':
            if (filter.value === 'TOUS') {
              querry += ""
            } else {
              querry += `Marque: {id: "${filter.value}" }`
            }
            break;

          case 'Modele':
            if (filter.value === 'TOUS') {
              querry += ""
            } else {
              querry += `Modele: {id: "${filter.value}" }`
            }
            break;

         
          case 'Type':
            if (filter.value === 'TOUS') {
              querry += ""
            } else {
              querry += `Type:{id:"${filter.value}" }`
            }
            break;

          case "TailleMin":
            const filterMin2 = filters.find(f => f.cle === "TailleMin")
            if (filterMin2)
              min2 = filterMin2.value;
            break;

          case "TailleMax":
            const filterMax2 = filters.find(f => f.cle === "TailleMax")
            if (filterMax2)
              max2 = filterMax2.value;
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
              { TailleEnPouces_gte: ${min2} }
              { TailleEnPouces_lte: ${max2} }
              ]`
        } else if ((min2 === null && max2 !== null) || min2 === "" || max2 === "" || min2 === null || max2 === null) {
          removeCategorieOnFilter()
        }

      });
      querry += `}){
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
        _allElectroniquesMeta{count}
      }`
      console.log(querry)
      setCurrentFilter(gql`${querry}`);
    }
    else {
      setCurrentFilter(gql`
      {
        allElectroniques(sortBy:id_DESC){
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
       _allElectroniquesMeta{count}
     }      
     `)
    }
  }
  const removeCategorieOnFilter = () => {
    setEtat('TOUS')
    setFilters(filters.filter(e => e.cle !== 'ElectroniqueType'));
    executeQuerry(filters.filter(e => e.cle !== 'ElectroniqueType'))
  }

  return (
    <Fragment>
      <Header />
      <div className="breadcrumbs">
        <div className="container">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li>Electroniques</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <h1>Découvrez nos accessoires neufs ou occasions</h1>
        <div className="filtre">
          <div className="btn-filtre">
            <a href="#">Filter la recherche</a>
          </div>
          <div className="bloc-filtre">
            <div className="bloc-init">
              <a href="#" className="back"></a>
              <Link to="/Electronique" className="init">Réinitilaiser les filtres</Link>
            </div>

            <div className="type-prix">
              <div className="type">
                <p>Type d'Electronique</p>
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
                    max={data && data.allElectroniques && data.allElectroniques[0] ? data.allElectroniques[0].Prix : ''} min={0}
                    defaultValue={[0, data && data.allElectroniques && data.allElectroniques[0] ? data.allElectroniques[0].Prix : '']}
                  />
                </div>
                {data && data.allElectroniques && data.allElectroniques.map((electro, id) => (
                  <div className="prix-range">{electro.Prix}</div>
                ))}
              </div>
            </div>

            <div className="type-select">

              <div className="select">
                <select onChange={(e) => handleFilter('Marque', e.target.value)} name="">
                  <option value='TOUS'>marque</option>
                  {data && data.allMarques.map((marque, id) => (
                    <option key={marque.id} value={marque.id}>{marque.Marque}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select onChange={(e) => handleFilter('Type', e.target.value)} name="">
                  <option value='TOUS'>Type</option>
                  {data && data.allTypes.map((type, id) => (
                    <option key={type.id} value={type.id}>{type.Type}</option>
                  ))}
                </select>
              </div>

              <div className="select">
                <select name="" onChange={(e) => handleFilter('Modele', e.target.value)}>
                  <option value='TOUS'>Modele</option>
                  {data && data.allModeles.map((modele, id) => (
                    <option value={modele.id}>{modele.Modele}</option>
                  ))}
                </select>
              </div>

            
            </div>
            <div className="type-taille">
              <div className="elts">
                <p>Taille en Pouce</p>
                <div className="filtre-taille">
                  <span>De</span>
                  <input min="1" onChange={(e) => e.target.value ? handleFilter('TailleMin', e.target.value) : handleFilter('TailleMin', 1)} type="number" name="" />
                  <span>"</span>
                </div>
                <div className="filtre-taille">
                  <span>A</span>
                  <input min="1" onChange={(e) => handleFilter('TailleMax', e.target.value)} type="number" name="" />
                  <span>"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="liste-produits">
        <div className="container">
        <div className="title-liste">{`ACCESSOIRES > ${etat }`}</div>
          <div className="nbr-produits">{data && data._allElectroniquesMeta && data._allElectroniquesMeta.count ? data._allElectroniquesMeta.count : 0} ACCESSOIRES</div>
        </div>

        <div className="container">
          <div className="listes" >
            {dataElectronique && dataElectronique.allElectroniques.map((electronique, id) => (
              <div className="produits" key={id}>
                {electronique.Image && electronique.Image[0] && electronique.Image[0].ImagesBateau && electronique.Image[0].ImagesBateau.filename ?
                  <img src={baseURL + (electronique.Image && electronique.Image[0] && electronique.Image[0].ImagesBateau && electronique.Image[0].ImagesBateau.filename ? electronique.Image[0].ImagesBateau.filename : '')} alt='image' />:""
                }

                {dataElectronique && electronique.Etat ?
                  <div className="cat">{electronique.Etat}</div>:""
                }
                
                <div className="description">
                  {dataElectronique && electronique.Nom ?
                    <div className="nom"> {electronique.Nom}</div>:""
                  }
                  
                  {dataElectronique && electronique.Prix ?
                    <div className="prix">Prix {electronique.Prix} CHF</div>:""
                  }
                
                  <Link to={{ pathname: `/Detail_Electronique/${electronique.id}` }}>Plus de détails</Link>
                </div>
              </div>
            ))}
          </div>
          {nbrpage + 12 / 12 > 1 ?
          <div className="pagination">
            {nbrpage > 0 &&
              (<a onClick={() => handleFilter("prev", nbrpage)} className="prev"></a>)
            }
            <p>Page {(nbrpage + 12) / 12} sur {dataElectronique && dataElectronique._allElectroniquesMeta && dataElectronique._allElectroniquesMeta.count && dataElectronique._allElectroniquesMeta.count >11 ? dataElectronique._allElectroniquesMeta.count-11 : 1}
            </p>
            {
              dataElectronique && (dataElectronique._allElectroniquesMeta) && (dataElectronique._allElectroniquesMeta.count > (nbrpage + 12)) &&
              (<a onClick={() => handleFilter("next", nbrpage)} className="next"></a>)
            }
          </div>:''
          }
        </div>
      </div>
      <div className="formulaire form-produits">
        <div className="container">
          <h2 className='BlueTitle'>Une question à propos d’un Electronique ? Nous sommes là pour vous répondre.</h2>
          <p>Merci de remplir le formulaire ci-dessous, ou de nous contacter par e-mail ou téléphone.</p>
        </div>
      </div>
      <FormulaireProduits />
      <Footer/>
    </Fragment>
  )
}

export default Electronique
