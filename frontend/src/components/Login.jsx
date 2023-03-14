import React,{useState} from "react";
import { loginApi ,createUserApi} from "../context/notes/ApiCalls";
import {useNavigate} from 'react-router-dom';
import  "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({email:'',password:'',cpassword:'',username:''});
  const [signup, setSignUp] = useState(false);
  
  let history=useNavigate();


  const onSubmit=async (e)=>{
    e.preventDefault();
    if(signup){
      if(credentials.cpassword!==credentials.password){
        alert("Password Donot match!!");
      }
      const res=await createUserApi(credentials.username,credentials.email,credentials.password,credentials.about);
     
    if(!res.success){
      alert(res.Error);
      return;
    }
    localStorage.setItem('token',res.authToken);
    
    history('/');
    
  }else{
    const res=await loginApi(credentials.email,credentials.password);
    if(!res.success){
      alert(res.Error);
      return;
    }
    localStorage.setItem('token',res.authToken);
    
    history('/');
  }

  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});

  }
  return (
    // <div>
    //   <h2>{signup?'Sign Up':'Login'}</h2>
    //   <form onSubmit={onSubmit}>

    //   {signup && <div className="user-box">
    //       <label htmlFor="username" className="form-label">
    //         UserName
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="username"
            
    //         onChange={onChange}
    //         value={credentials.username}
    //         name="username"
    //       />
    //     </div>}

    //     <div className="mb-3">
    //       <label htmlFor="email" className="form-label">
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="email"
    //         value={credentials.email}
    //         name="email"
    //         onChange={onChange}
    //         aria-describedby="emailHelp"
    //       />

    //       <div id="emailHelp" className="form-text">
    //         We'll never share your email with anyone else.
    //       </div>
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="password" className="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="password"
            
    //         onChange={onChange}
    //         value={credentials.password}
    //         name="password"
    //       />
    //     </div>


    //     {signup&&<div className="mb-3">
    //       <label htmlFor="cpassword" className="form-label">
    //        Confirm Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="cpassword"
    //         onChange={onChange}
    //         value={credentials.cpassword}
    //         name="cpassword"
    //         minLength={8}
    //       />
    //     </div>}

    //     <button type="submit" className="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>
    //   <div style={{cursor:'pointer'}} onClick={()=>setSignUp(!signup)}>{signup?'Login':'Sign Up'}</div>

    // </div>
    <div className="login-box">
  <h2>{signup?'Sign Up':'Login'}</h2>
  <form onSubmit={onSubmit}>
    <div className="user-box">
      
      {signup&&<>
      <input type="text" 
      
      className="form-control"
      id="username"
         
      onChange={onChange}
       value={credentials.username}
       name="username"
 
 />
 <label>Username</label></>
  }
    </div>
    <div className="user-box">
    <input
           type="email"
          className="form-control"
          id="email"
          onChange={onChange}
         value={credentials.email}
           name="email"
          aria-describedby="emailHelp"
         />
      <label>Email</label>
    </div>
    <div className="user-box">
    <input
          type="password"
             className="form-control"
           id="password"
            
           onChange={onChange}
          value={credentials.password}
            name="password"
          />
      <label>Password</label>
    </div>
     <div className="user-box">
     {signup&&<>
      <input
             type="password"
             className="form-control"
             id="cpassword"
             onChange={onChange}
             value={credentials.cpassword}
             name="cpassword"
             minLength={8}
         />
      <label>Confirm Password</label>
     </>
      }
    </div>
     <div className="user-box">
     {signup&&<>
      <input type="text" 
      
      className="form-control"
      id="about"
         
      onChange={onChange}
       value={credentials.about}
       name="about"
 
 />
 <label>About</label></>
  }
     </div>
    
    <button type="submit" className="btn btn-primary">
        Submit
        </button>
        <div className="login"style={{cursor:'pointer'}} onClick={()=>setSignUp(!signup)}>{signup?'Login':'Sign Up'}</div>
    
  </form>
</div>
  );
};

export default Login;
