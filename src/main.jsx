import { createRoot } from 'react-dom/client'
import {App} from './Components/App/App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'


let root = createRoot(document.getElementById('root'));
root.render(
  <App/>
)


