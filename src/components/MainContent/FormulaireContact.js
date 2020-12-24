/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation,gql } from '@apollo/client';
import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';

const Formulaire = (props) => {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const SENDMAIL              = gql`
    mutation Sendmail($name: String!,$email: String!,$message: String!) {
      sendmail(name: $name,email: $email,message: $message)
    }`;

  const [adminMailToSend] = useMutation(SENDMAIL, {
    onCompleted: () => {
      Swal.fire(
        'Message envoyé!',
        'Cliquez pour fermer!',
        'success'
      )
      setName('');
      setEmail('');
      setMessage('');
    }
  });
  return (
    <Fragment>
      <div className="formulaire form-contact">
        <div className="container">
          <p>Merci de remplir le formulaire ci-dessous, ou de nous contacter par <a href="#">e-mail</a> ou téléphone.</p>
          <form name="" id="" action="" onSubmit={e => {
            e.preventDefault();
            if(name && name !== '' && email && email !== '' && message && message !== '') {
              adminMailToSend({ variables: { name, email, message } });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Vous devez remplir tous les champs pour envoyer un message à l'admin !",
               })
            }
          }}>
            <input type="text" name="subject" placeholder="Nom" className="form-text" onChange={e => setName(e.target.value)}
              value={name}/>
            <input type="email" name="email" placeholder="*E-mail" className="form-text" onChange={e => setEmail(e.target.value)}
              value={email} />
            <textarea name="message" placeholder="Message" className="form-textarea" onChange={e => setMessage(e.target.value)}
              value={message}></textarea>
            <input type="submit" name="envoyer" value="Envoyer" className="form-submit" />
          </form>
        </div>
      </div>

    </Fragment>
  )
}

export default Formulaire
