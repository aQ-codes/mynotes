import React , {useState, useEffect} from "react";
import { useParams , useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import notes from '../assets/data'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'


const NotePage = () => {

  let [note, setNote ] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  // console.log(id)
  useEffect ( () => {
      
    getNote()

  }, [id])   //whenever id changes

  let getNote = async () => {
     if (id === 'new')    return
   
     let response = await fetch (`http://localhost:8000/notes/${id}`)
     let data = await response.json()
     setNote(data)

  }

  let createNote = async () => {

    await fetch(`http://localhost:8000/notes/`, {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify( {...note, 'updated': new Date()} )
    })

  }

  let updateNote = async () => {

    await fetch(`http://localhost:8000/notes/${id}`, {
      method : 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify( {...note, 'updated': new Date()} )
    })

  }

  let deleteNode = async () => {

    await fetch(`http://localhost:8000/notes/${id}`, {
      method : 'DELETE',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify( {note} )
    })
    // history.push('/')
    navigate(-1)

  }


  let handleSubmit = () => {

    if (id !== 'new' && !note.body){
      deleteNode()
    }
    else if (id !== 'new'){
      updateNote()
    }
    else if (id === 'new' && note !== null){
      createNote()
    }

    // history.push('/')
    navigate(-1)
  }
  // const note = notes.find(note => note.id === Number(id))
  // console.log("props:", id);
  return (
    <div className="note">
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== 'new' ? (<button onClick = {deleteNode} >Delete</button>) : (<button onClick = {handleSubmit} >Done</button>) }
        
      </div>
       <textarea onChange={(e) => {setNote({ ...note, 'body': e.target.value } )
    } }  value = {note?.body}></textarea> 
       {/* <p>{note?.body}</p>  */}

    </div>
  );
};

export default NotePage;
