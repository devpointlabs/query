import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { AuthProvider } from './providers/AuthProvider';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
 document.getElementById('root'));


