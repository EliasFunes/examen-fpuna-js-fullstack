import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">RR.HH <FontAwesomeIcon icon={faUsers}/> </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link active" to="/">Inicio <span
                            className="sr-only">(current)</span></NavLink>
                        <NavLink className="nav-item nav-link" to="/empleados">Empleados</NavLink>
                    </div>
                </div>
            </nav>
    )
    }
}