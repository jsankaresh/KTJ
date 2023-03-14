import React from "react";
import { useContext,useEffect,useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

export default function Notes() {
  const con = useContext(NoteContext);
  
  const { notes,getNotes,updateNote} = con;
  const ref = useRef(null);
  const [note, setnote] = useState({title:"",description :"",tag :""});
  const navigate=useNavigate();

  const updateNoteDialog=(note)=>{
      ref.current.click();
      setnote(note);
      

  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
        
    }else{
      navigate('/login');
    }

    
  },[]);

  const valueChange=(e)=>{
    setnote({...note,[e.target.name]: e.target.value})
  }
  const handleClick=(e)=>{
    e.preventDefault();
    updateNote(note._id,note.title,note.description,note.tag);
    // addNote(note);
  }

  return (
    <div>
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
      <form>
        <div className="mb-3">
          <label htmlFor="title"  className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={valueChange}
            aria-describedby="emailHelp"
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
            value={note.description}
            onChange={valueChange}
            name="description"
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
       


        



      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>



      <h3>Your Notes</h3>
     
      <div className="row">
      {notes.map((note,key) => {
        return <NoteItem key={key} note={note} updateNoteDialog={updateNoteDialog} />;
      })}
      </div>
    </div>
  );
}

const NoteItem = (props) => {
  const con = useContext(NoteContext);
  const { deleteNote } = con;
  return(
  
    <div className="card m-3" style={{width:"20rem"}}>
  <div className="card-body">
    <h5 className="card-title">{props.note.title}</h5>
    <p className="card-text">{props.note.description}</p>
    <p className="card-text"><small className="text-muted">{props.note.tag}</small></p>
    <i className="fa fa-trash m-2" onClick={()=>{deleteNote(props.note._id)}}aria-hidden="true"></i>
    <i className="fa-solid fa-pen-to-square m-2" onClick={()=>props.updateNoteDialog(props.note)}></i>

  </div>
</div>
  )
};
