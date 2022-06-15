import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UpdateToDo } from "./UpdateToDo";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner2 from "./LoadingSpinner2";
import Cookies from 'js-cookie';

function ToDoItem({ data, handleEdit, handleDelete }) {
    const { _id, title} = data;
    return (
        <li  key={_id} id="todoCard" className="card">
                <p id="todoitem">{title}</p>
                <button className="button" id="editBtn" class="btn w-25" name={_id} onClick={handleEdit}>Edit</button>
                <button className="button" id="deleteBtn" class="btn w-25" name={_id} onClick={handleDelete}>Delete</button>
        </li>
    );
}

function ToDoList() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let isLoggedIn = localStorage.getItem('user');
  console.log(isLoggedIn);

  useEffect(() => {
    if(isLoggedIn == null){
        navigate('/login')
    }
  },[isLoggedIn])

  useEffect(
        function () {
            setIsLoading(true)
            axios
                .get("https://todo-apilh.herokuapp.com/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update]
    );

    function handleEdit(e) {
        setId(e.target.name);
        setOpen(true);
    }

    function handleUpdate() {
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) {
        axios.delete(`https://todo-apilh.herokuapp.com/todo/${e.target.name}`);
        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() {
        setId("");
        setOpen(false);
    }

if(isLoading){
    return <LoadingSpinner2 />
  } else {
    return (
      <section className="container">        
      <section className="contents">
      <Link to="/createtodo" className="button-new">
      <FontAwesomeIcon icon={faPlus} id="plusIcon" />
      </Link>
          <ul className="list-container">
              {todo.map((data) => (
                  <ToDoItem
                      data={data}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                  />
              ))}
          </ul>
      </section>
      {open ? (
          <section className="update-container">
              <div className="update-contents">
                  <p onClick={handleClose} className="close">
                  <FontAwesomeIcon icon={faX} id="xIcon" />
                  </p>
                  <UpdateToDo
                      _id={id}
                      handleClose={handleClose}
                      handleUpdate={handleUpdate}
                  />
              </div>
          </section>
      ) : (
          ""
      )}
  </section>
    );
}
}

export default ToDoList;
