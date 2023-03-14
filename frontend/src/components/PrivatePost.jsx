
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { getProfileApi, getUserApi } from '../context/notes/ApiCalls';
import NoteContext from '../context/notes/noteContext';
import UserContext from '../context/user/UserContext';
import  "./PostPage.css";

export default function PrivatePost() {
    
  let navigate=useNavigate();
  const ref = useRef(null);
  const ref1 = useRef(null);
  let {privatePost,getPrivatePost,selectAuserForEvent,removeMembers,addPostCall,deletePostCall}=useContext(NoteContext);
  let [post,selectPost]=useState({});
  const [note, setnote] = useState({name:"",requiredTeamMembers :0});
  const MoreInfoPopUp=async(userId)=>{
    let userProfile=await getProfileApi(userId)
    console.log(userProfile)
    if(userProfile.success){
        
    setIdForInfoOfUser(userProfile.user)
        
    ref.current.click();
    console.log(infoOfUser);
     

    }else{
        alert(`Error in fetching : ${userProfile.Error}`)
    }
    
    

}
  let [infoOfUser,setIdForInfoOfUser]=useState({});
  let {user,getUser}=useContext(UserContext);

  let onRequest=(event)=>{
    selectPost(event);
    
    
  }



  let selectAuser=(eventId,UserId)=>{
    selectAuserForEvent(eventId,UserId)


  }

  const valueChange=(e)=>{
    setnote({...note,[e.target.name]: e.target.value})
  }

  let removeAuser=(eventId,UserId)=>{
    removeMembers(eventId,UserId)


  }

  let showAddModal=()=>{
    ref1.current.click();
  }

  let addPost=()=>{
    if(note.requiredTeamMembers){
    addPostCall(note)
    }
  }
  let deletePost=(id)=>{
    deletePostCall(id);
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getPrivatePost();
      if(!user._id){
      getUser();
      }
      
    }else{
      navigate('/login');
    }

    
  },[]);

  useEffect(() => {
    if(post._id!=null){
        let note1=privatePost.find((e)=>(e._id==post._id))
        selectPost(note1);
    }

    
  },[privatePost]);

//   let statusOfPost=(event)=>{
//     if(event.joiningRequest.includes(user._id)){
//       return "Requested"
//     }
//     if(event.selectedMembers.includes(user._id)){
//       return "Selected"
//     }
//     return "Request"
//   }


  return (
    
    <div class="demo">
  <h1>Private Posts</h1>

  <button type="button" ref={ref} style={{visibility:'hidden'}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <div className='text-dark'>
        <div className='text-dark'>{infoOfUser._id}</div>
        
        <div className='text-dark'>{infoOfUser.name}</div>

        
        <div className='text-dark'>{infoOfUser.email}</div>
        
        <div className='text-dark'>{infoOfUser.about}</div>
       </div>
      
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>selectAuser(post._id,infoOfUser._id)} data-bs-dismiss="modal">Select User</button>
      </div>
    </div>
  </div>
</div>

 

<button type="button" ref={ref1} style={{visibility:'hidden'}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="name"  className="form-label text-dark">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={note.name}
            onChange={valueChange}
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="requiredTeamMembers"  className="form-label text-dark">
            Required Members
          </label>
          <input
            type="number"
            className="form-control"
            id="requiredTeamMembers"
            value={note.requiredTeamMembers}
            onChange={valueChange}
            name="requiredTeamMembers"
          />
        </div>
        
       


        



      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={addPost} data-bs-dismiss="modal">Add Event</button>
      </div>
    </div>
  </div>
</div>


  
 {
    post._id==null? <div className="table-responsive-vertical shadow-z-1">
 
    <table id="table" class="table  table-mc-light-blue">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Required</th>
            <th>Accept</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
              privatePost.map((e,k)=>{
                  return (
                      <tr key={k}>
                      <td data-title="ID">{e._id}</td>
                      <td data-title="Name">{e.name}</td>
                      <td data-title="Required">
                       {e.requiredTeamMembers}
                      </td>
       <td>
       <button onClick={()=>onRequest(e)} data-title="Accept">{e.joiningRequest.length} Requests</button>
       </td>
       <td>
       <button onClick={()=>deletePost(e._id)}  data-title="Accept">Delete</button>
       </td>
                    </tr>
                  )
              })
          }
    
        </tbody>
      </table>
      <button onClick={()=>showAddModal()}>Add</button>

  
      
    </div>:<div>
          <h2>{post.name}</h2>
          <div>Required Members : {post.requiredTeamMembers}</div>

<h3>Requests Pending</h3>
          <table id="table" class="table  table-mc-light-blue">
        <thead>
          <tr>
            <th>ID</th>
            <th>Accept</th>
          </tr>
        </thead>
        <tbody>
          {
              post.joiningRequest.map((e,k)=>{
                  return (
                      <tr key={k}>
                    <td>  <button onClick={()=>MoreInfoPopUp(e)} data-title="ID">{e}</button></td>
                      
       <td>
       <button onClick={()=>selectAuser(post._id,e)} data-title="Accept">Accept</button>
       </td>
       <td>
       <button onClick={()=>removeAuser(post._id,e)} data-title="Accept">Delete</button>
       </td>
                    </tr>
                  )
              })
          }
    
        </tbody>
      </table>
      <div className='m-3'></div>

      <h3>Selected members</h3>


      <table id="table" class="table  table-mc-light-blue">
        <thead>
          <tr>
            <th>ID</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {
              post.selectedMembers.map((e,k)=>{
                  return (
                      <tr key={k}>
                    <td>  <button onClick={()=>MoreInfoPopUp(e)} data-title="ID">{e}</button></td>
                      
       <td>
       <button onClick={()=>removeAuser(post._id,e)} data-title="Accept">Remove</button>
       </td>
       
                    </tr>
                  )
              })
          }
    
        </tbody>
      </table>

      <button onClick={()=>{
    selectPost({});
    
    setIdForInfoOfUser({})
      }}>Back</button>
   

    </div>
 }
  


</div>
  
  )


}


