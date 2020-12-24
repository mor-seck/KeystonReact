/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Accueil from './components/pages/Accueil';
import Bateaux from './components/pages/Bateaux';
import Moteur from './components/pages/Moteur';
import Remorque from './components/pages/Remorque';
import Electronique from './components/pages/Electronique';
import Entreprise from './components/pages/Entreprise';
import HistoiresMarins from './components/pages/HistoireMarins';
import Contact from './components/pages/Contact';
import Detail_Bateau from './components/BateauContent/Detail_Bateau';
import Detail_Moteur from './components/BateauContent/Detail_Moteur';
import Detail_Remorque from './components/BateauContent/Detail_Remorque';
import Detail_Electronique from './components/BateauContent/Detail_Electronique';
function App() {

  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route exact path="/Accueil" component={Accueil} />
        <Route path="/Bateaux" component={Bateaux} />
        <Route path="/Moteur" component={Moteur} />
        <Route path="/Remorque" component={Remorque} />
        <Route path="/Electronique" component={Electronique} />
        <Route path="/Entreprise" component={Entreprise} />
        <Route path="/HistoiresMarins" component={HistoiresMarins} />
        <Route path="/Contact" component={Contact} />
        <Route path="/Detail_Bateau/:id" component={Detail_Bateau} />
        <Route path="/Detail_Moteur/:id" component={Detail_Moteur} />
        <Route path="/Detail_Remorque/:id" component={Detail_Remorque} />
        <Route path="/Detail_Electronique/:id" component={Detail_Electronique} />
      </Switch>
    </Router>
  );
}
export default App;
