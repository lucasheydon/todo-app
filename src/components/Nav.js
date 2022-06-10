import React from "react";
import {Link} from 'react-router-dom'
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav({SwitchTheme}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <FontAwesomeIcon icon={faBars}  />
        </button>
        <a id="title" class="navbar-brand mx-auto" href="#">App Name</a>
        <FontAwesomeIcon icon={faCircleQuestion} id="help" data-bs-toggle="modal" data-bs-target="#helpModal"  />
        <div class="modal" tabindex="-1" id="helpModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Help</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            <div class="modal-body">
              <p>Help information goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
          </div>
        </div> 
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
                <Link to='/login' className="nav-link">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link to='/register' className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
                <Link to='/todo' className="nav-link">ToDo</Link>
            </li>
            <li className="nav-item" id="navAdmin">
                <Link to='/admin' className="nav-link">Admin</Link>
            </li>
            <li>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={SwitchTheme}></input>
                <label className="form-check-label" for="flexSwitchCheckDefault" >Light / Dark mode</label>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
