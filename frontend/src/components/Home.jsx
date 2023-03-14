import React,{useState,useContext} from "react";
import NoteContext from "../context/notes/noteContext";
import Notes from "./Notes";

export default function Home() {
  
  const con= useContext(NoteContext)
  const {addNote}=con;
  const [note, setnote] = useState({title:"",description :"",tag :""});
  const valueChange=(e)=>{
    setnote({...note,[e.target.name]: e.target.value})
  }
  const handleClick=async(e)=>{
    e.preventDefault();
    let c=await addNote(note);
    setnote({title:"",description :"",tag :""});
  }
  return (
    <div className="container">
        <div className="container">
      <h3>Add a Note</h3>
      <form  onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title"  className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={valueChange}
            value={note.title}
            aria-describedby="emailHelp"
            minLength={5}
            required
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description"  className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={valueChange}
            value={note.description}
            name="description"
            minLength={10}
            required
          />
        </div>
       
        <div className="mb-3">
          <label htmlFor="description"  className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}
            onChange={valueChange}
            name="tag"
          />
        </div>
        <button type='submit'  className="btn btn-primary">
          Submit
        </button>






      </form>
      </div>
      <Notes/>
    </div>
  );
}
