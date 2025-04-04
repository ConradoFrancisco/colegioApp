import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";


export const metadata: Metadata = {
  title: "Colegio app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{
  return (
    <>
      <html lang="en">
        <body>
          <NavBar/>
          <div className="main-panel" style={{ marginLeft: "260px" }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid d-flex justify-content-between">
                <h5>Panel de administración</h5>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navbarNav"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Inicio
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {children}
          </div>
        </body>
      </html>
    </>
  );
}
