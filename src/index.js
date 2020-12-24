import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link : new HttpLink({
    uri: `${process.env.REACT_APP_DOMAINE}/admin/api`,
  }) 
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </ApolloProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for  example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
