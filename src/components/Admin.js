import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateUser } from "./UpdateUser";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner2 from "./LoadingSpinner2";

function Users({ data, handleEdit, handleDelete}) {
    const { _id, fullName, email, userType} = data;
    return (
        <li  key={_id} id="userCard" className="card justify-content-center align-items-center">
                <p id="fullName">{fullName}</p>
                <p id="email">{email}</p>
                <p id="userType">{userType}</p>
                <button className="button" id="editBtnAdmin" class="btn w-50" name={_id} onClick={handleEdit}>Edit</button>
                <button className="button" id="deleteBtnAdmin" class="btn w-50" name={_id} onClick={handleDelete}>Delete</button>
        </li>
    );
}

function Admin() {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

useEffect(
        function () {
            setIsLoading(true)
            axios
                .get("https://todo-apilh.herokuapp.com/user")
                .then((res) => {
                    console.log(res.data);
                    setUser(res.data);
                    setIsLoading(false)
                }).catch((res, err) => {
                    alert(res.data)
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
        axios.delete(`https://todo-apilh.herokuapp.com/user/${e.target.name}`);
        setUser((data) => {
            return data.filter((user) => user._id !== e.target.name);
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
          <ul className="list-container">
              {user.map((data) => (
                  <Users
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

                  <UpdateUser
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

export default Admin;
