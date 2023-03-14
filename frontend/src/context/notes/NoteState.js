import NoteContext from "./noteContext";
import { useState,useEffect } from "react";
import {addPostApi, getAllPrivatePostApi, getAllPublicPostApi, joinRequestApi, removeMembersApi, selectMembersApi,deletePostApi} from "./ApiCalls";
const NoteState=(props)=>{
    
     
      const [notes, setnotes] = useState([]);
      const [privatePost, setPrivatePosts] = useState([]);
      
      const getPublicPost=async ()=>{
        const allNotes=await getAllPublicPostApi();
        if(allNotes.success==true){
          setnotes(allNotes.posts);
        }else{
          setnotes([]);
        }
      };



      const getPrivatePost=async ()=>{
        const allNotes=await getAllPrivatePostApi(localStorage.getItem('token'));
        if(allNotes.success==true){
          setPrivatePosts(allNotes.posts);
        }else{
          setPrivatePosts([]);
        }
        // const allNotes=await getAllNotesApi(localStorage.getItem('token'));
        // if(allNotes.success==true){
        //   setnotes(allNotes.notes);
        // }else{
        //   setnotes([]);
        // }
      };
     
      
      
      const addPostCall=async (note)=>{
        const t=await addPostApi(localStorage.getItem('token'),note.name,note.requiredTeamMembers);
        getPrivatePost()

      }

      const deletePostCall=async (id)=>{
        const t=await deletePostApi(localStorage.getItem('token'),id);
        getPrivatePost()
      }
      const requestJoin= async (eventId,userId)=>{
        // for(var i=0;i<notes.length;i++){
        //   if(notes[i]._id==id){
        //     const e=await updateNoteApi(localStorage.getItem('token'),id,title,description,tag)
        //   }
        // }
        let x=await joinRequestApi(eventId,userId);
        getPublicPost()
        return x;
      }

      const selectAuserForEvent= async (eventId,userId)=>{
        // for(var i=0;i<notes.length;i++){
        //   if(notes[i]._id==id){
        //     const e=await updateNoteApi(localStorage.getItem('token'),id,title,description,tag)
        //   }
        // }
        await selectMembersApi(localStorage.getItem('token'),eventId,userId);
        getPrivatePost()
      }

      const removeMembers= async (eventId,userId)=>{
        // for(var i=0;i<notes.length;i++){
        //   if(notes[i]._id==id){
        //     const e=await updateNoteApi(localStorage.getItem('token'),id,title,description,tag)
        //   }
        // }
        await removeMembersApi(localStorage.getItem('token'),eventId,userId);
        getPrivatePost();
      }
return(
    <NoteContext.Provider value={{notes,privatePost,getPublicPost,requestJoin,getPrivatePost,selectAuserForEvent,removeMembers,addPostCall,deletePostCall}}>
    {props.children}
</NoteContext.Provider>
)
}
export default NoteState;