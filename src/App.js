import './App.css';
//components
import {PostsPage,CommentPage} from './components';
// routing
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
// context
import { QuoteProvider } from './QuoteContext';
// assets
import logo from './assets/logo.svg';

const Navbar = ()=>{
  return (
    <nav>
        <div className="logo">
          <img className="scale-in-hor-left " src={logo} alt="logo" />
          <div className="quotes rotate-in-2-ccw">&#10078;</div>
        </div>
      </nav>
  )
}

function App() {

  return (
    <>
      <Navbar></Navbar>

      <Router>
        <QuoteProvider>
        <Routes>
            <Route path = "/" exact element={<PostsPage/>}/>
            <Route path = "/comments/:id"  exact element={<CommentPage/> }/>
        </Routes>
        </QuoteProvider>
      </Router>

    </>
    
  );
}

export default App;
