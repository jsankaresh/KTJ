
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import MyNavbar from './components/MyNavbar';
import NoteState from './context/notes/NoteState';
import Login from './components/Login'
import PostPage from './components/PostPage';
import UserState from './context/user/UserState';
import PrivatePost from './components/PrivatePost';

function App() {
  
  return (
    <NoteState>
    <UserState>
    <Router>
    <div>
      <MyNavbar/>
      <div className='container fluid'>
      <Routes>
        <Route exact path='/' element={<PostPage/>}/>
        <Route exact path='/myPosts' element={<PrivatePost/>}/>
        <Route exact path='/login' element={<Login/>}/>
       
      </Routes>
      </div>
    </div>
    </Router>
    </UserState>
    </NoteState>
  );
}

export default App;
