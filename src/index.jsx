import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as firebase  from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBRu9imf5_2f3zFaaThJhOAk9e8D3_o9a4",
  authDomain: "test-crud-ab6ab.firebaseapp.com",
  databaseURL: "https://test-crud-ab6ab.firebaseio.com",
  projectId: "test-crud-ab6ab",
  storageBucket: "test-crud-ab6ab.appspot.com",
  messagingSenderId: "858148934912"
};

firebase.initializeApp(config);


import App from './components/App.jsx'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
