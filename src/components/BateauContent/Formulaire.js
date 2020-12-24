import React, { Fragment } from 'react'
const Formulaire = (props) => {
  return (
    <Fragment>
      <div className="formulaire">
        <div className="container">
          <h2 className='BlueTitle'>Un question à propos d’un bateau ? Nous sommes là pour vous répondre.</h2>
          <p>Merci de remplir le formulaire ci-dessous, ou de nous contacter par e-mail ou téléphone.</p>
          <form name="" id="" action="">
            <input type="text" name="nom" placeholder="Nom" className="form-text" />
            <input type="email" name="email" placeholder="Email" className="form-text" />
            <textarea name="message" placeholder="Message" className="form-textarea"></textarea>
            <input type="submit" name="envoyer" value="Envoyer" className="form-submit" />
          </form>
        </div>
      </div>
    </Fragment>
  )
}
export default Formulaire
