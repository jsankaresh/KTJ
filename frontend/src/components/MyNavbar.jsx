import { Link, useLocation, useNavigate} from 'react-router-dom';

import React from 'react'

export default function MyNavbar() {
    let location=useLocation();
    
    let navigate=useNavigate()
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login');
    }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to='/'>Smarthon</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to='/'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to='/myPosts'>Posts</Link>
        </li>
        
      </ul>
      
    </div>
    <span className="navbar-text">
      
    {!localStorage.getItem('token')?<Link to='/login'><button type="button" className="btn btn-dark end">Login</button></Link>:<button type="button" className="btn btn-dark end" onClick={handleLogout}>Logout</button>}
      </span>
  </div>
</nav>
  )
}
