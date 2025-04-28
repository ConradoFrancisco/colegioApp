/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Table, Container, Accordion } from "react-bootstrap";
import Link from "next/link";
import AlumnosService from "../../../services/AlumnosService";
import { useEffect, useState } from "react";
import AlumnoModal from "./components/AlumnoModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paginator from "../components/common/Paginator";

import { LuFilter } from "react-icons/lu";

//Agregar Campos Inscripcion {preinscipcion,inscripto,lista de espera, Dado de baja, y contacto
interface IAlumnoListado {
  id: string;
  nombre: string;
  apellido: string;
  barrio: string;
  direccion: string;
  dni: string;
  edad: string;
  escuela: string;
  fecha_nacimiento: string;
  socio_educativo: string;
  last_modified: string | null;
  preinscripcion: string;
  contacto: string;
}

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState<IAlumnoListado[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [barrio, setBarrio] = useState("");
  const [flag, setFlag] = useState(0);
  // Simulación de datos hasta traerlos desde el backend
  /* const alumnos : IAlumnoListado[] = [
    { id: 1, nombre: 'Valentina', apellido: 'Gómez',fechaNac: '2000-01-01',dni: '12345678',barrio: 'Centro',direccion: 'Av. Libertador 1234' },
    { id: 2, nombre: 'Lucas', apellido: 'Fernández',fechaNac: '2000-01-01',dni: '12345679',barrio: 'Centro',direccion: 'Av. Libertador 1234' },
  ] */
  const handleCreateAlumno = async (data: unknown) => {
    try {
      // Acá harías la llamada a tu backend para guardar el nuevo alumno
      console.log("Nuevo alumno:", data);
      await AlumnosService.createAlumno(data);
      setFlag((flag) => flag + 1);
      getAlumnos();
    } catch (error) {
      console.error("Error al guardar alumno", error);
    } finally {
      setShowModal(false);
    }
  };
  const getAlumnos = async () => {
      const response: { cant: number; data: IAlumnoListado[] } = await AlumnosService.getAlumnos({
        busqueda,
        barrio,
        limit, // o el número que quieras
        offset, // más adelante podés hacer paginación real
      });
      setTotal(response.cant); // o 'total' si cambiaste eso en el backend
      setAlumnos(response.data);
    };

  useEffect(() => {
    getAlumnos();
  }, [limit,offset]);
  return (
    <>
      <Container fluid className="my-4">
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">Listado de Alumnos</h2>
          <div className="">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              + Añadir alumno
            </button>
          </div>
        </div>
        <div className="row">
          <Accordion defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header><LuFilter size={20}/> {' '} Filtros</Accordion.Header>
              <Accordion.Body>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre, apellido o dni"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Barrio"
                      value={barrio}
                      onChange={(e) => setBarrio(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mb-3 justify-content-between d-flex gap-2">
                    <button
                      className="btn btn-primary w-75 gap-2"
                      onClick={() => {
                        getAlumnos();
                        setOffset(0); // limpia y vuelve a pedir todo
                      } }
                    >
                      Buscar
                    </button>
                    <button
                      className="btn btn-secondary w-75"
                      onClick={() => {
                        setBusqueda("");
                        setBarrio("");
                        getAlumnos()
                        setOffset(0) // limpia y vuelve a pedir todo
                      }}
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>DNI</th>
              <th>Barrio</th>
              <th>Dirección</th>
              <th>Escuela</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos?.map((a, index) => (
              <tr key={index}>
                <td>{a.apellido}</td>
                <td>{a.nombre}</td>
                <td>{a.fecha_nacimiento}</td>
                <td>{a.dni}</td>
                <td>{a.barrio}</td>
                <td>{a.direccion}</td>
                <td>{a.escuela}</td>
                <td>
                  <Link
                    href={`/alumnos/${a.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Más información
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginator
          cantidad={total}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
          
        />
      </Container>
      <AlumnoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateAlumno}
      />
      <ToastContainer />
    </>
  );
}
