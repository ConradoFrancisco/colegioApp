
'use client'
import { PiBookBookmarkFill, PiStudentBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { useState } from "react";
import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
export default function NavBar(){
  const [activeItem, setActiveItem] = useState("dashboard");

    return(
        <div
          className="sidebar"
          data-image="/light-bootstrap-dashboard-react/static/media/sidebar-3.9992d0ce.jpg"
          data-color="black"
        >
          <div
            className="sidebar-background"
            style={{
              backgroundImage:
                'url("/light-bootstrap-dashboard-react/static/media/sidebar-3.9992d0ce.jpg")',
            }}
          />
          <div className="sidebar-wrapper">
            <div className="logo d-flex align-items-center justify-content-start">
              <a
                href="https://www.creative-tim.com?ref=lbd-sidebar"
                className="simple-text logo-mini mx-1"
              >
                <div className="logo-img">
                  <PiBookBookmarkFill size={30} />
                </div>
              </a>
              <a
                className="simple-text"
                style={{ textDecoration: "none" }}
                href="http://www.creative-tim.com"
              >
                Colegio App
              </a>
            </div>
            <div className="nav">
            <li
                  className={activeItem === "users" ? "nav-item active" : "nav-item"}
                  onClick={() => setActiveItem("users")}
                >
                <Link
                  aria-current="page"
                  className="nav-link active"
                  href="/users"
                >
                  <FaUsers size={25} className="me-4" />
                  <p>Alta de usuarios</p>
                </Link>
              </li>
              <li
                  className={activeItem === "alumnos" ? "nav-item active" : "nav-item"}
                  onClick={() => setActiveItem("alumnos")}
                >
                <Link className="nav-link" href="/">
                  <PiStudentBold size={25} className="me-4" />
                  <p>Listado de alumnos</p>
                </Link>
              </li>
            </div>
          </div>
        </div>
    )
}