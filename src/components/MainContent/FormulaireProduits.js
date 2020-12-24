/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


const FormulaireProduits = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const SENDMAIL = gql`
    mutation Sendmail($name: String!,$subject: String!,$email: String!,$message: String!) {
      sendmail(name: $name, subject: $subject, email: $email,message: $message)
    }`;
  const [adminMailToSend, { data }] = useMutation(SENDMAIL, {
    onCompleted: () => {
      Swal.fire(
        'Message envoyé!',
        'Cliquez pour fermer!',
        'success'
      )
      setName('');
      setEmail('');
      setMessage('');
      setSubject('');
    }
  });

  return (
    <Fragment>
      <div className="formulaire form-produits">
        <div className="container">
          <form name="" id="" action="" onSubmit={e => {
            e.preventDefault();
            if (name && name !== '' && subject && subject !== '' && email && email !== '' && message && message !== '') {
              adminMailToSend({ variables: { name, subject, email, message } });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Vous devez remplir tous les champs pour envoyer un message à l'admin !",
              })
            }
          }}>
            <div className="type">
              <p>Sujet</p>
              <input type="radio" name="produits" id="bateaux" value="Bateaux" onChange={e => setSubject(e.target.value)} />
              <label for="bateaux">Bateaux</label>
              <input type="radio" name="produits" id="moteurs" value="Moteurs" onChange={e => setSubject(e.target.value)} />
              <label for="moteurs">Moteurs</label>
              <input type="radio" name="produits" id="remorques" value="Remorques" onChange={e => setSubject(e.target.value)} />
              <label for="remorques">Remorques</label>
              <input type="radio" name="produits" id="eletronique" value="Eletronique" onChange={e => setSubject(e.target.value)} />
              <label for="eletronique">Eletronique</label>
              <input type="radio" name="produits" id="autres" value="Autres" onChange={e => setSubject(e.target.value)} />
              <label for="autres">Autres</label>
            </div>
            <input type="text" name="name" placeholder="Nom" className="form-text" onChange={e => setName(e.target.value)}
              value={name} />
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

export default FormulaireProduits
