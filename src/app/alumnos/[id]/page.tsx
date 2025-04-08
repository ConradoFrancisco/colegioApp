"use client";

import { Card, Container, Row, Col, Accordion, Table } from "react-bootstrap";
import AlumnoEditModal from "./components/EditarAlumnoModal";
import { useState } from "react";

interface IFamiliar {
  fecha_nacimiento: string;
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  parentesco: string;
}

interface IActividad {
  id: number;
  nombre: string;
  tipo: "Grupo" | "Taller";
  descripcion: string;
  cupo: number | null;
  turno: "TM" | "TT" | "TV" | "J Comp.";
  fecha_inicio: string;
  fecha_fin: string;
  estado: "Activa" | "Inactiva";
}

interface IAlumno {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNac: string;
  direccion: string;
  barrio: string;
  socioEducativo: boolean;
  escuela: string;
  familiares: IFamiliar[];
  actividades: IActividad[];
  anioEscolar: string;
  turno: "TM" | "TT" | "TV" | "J Comp.";
}
const alumno: IAlumno = {
  id: 1,
  nombre: "Valentina",
  apellido: "Gómez",
  dni: "12345678",
  fechaNac: "2000-01-01",
  direccion: "Av. Libertador 1234",
  barrio: "Centro",
  escuela: "Escuela N° 123",
  socioEducativo: true,
  anioEscolar: "5° grado",
  turno: "TT",
  familiares: [
    {
      id: 1,
      nombre: "Laura",
      apellido: "Gómez",
      dni: "34567890",
      telefono: "1122334455",
      parentesco: "Madre",
      fecha_nacimiento: "1985-10-20",
    },
    {
      id: 2,
      nombre: "Carlos",
      apellido: "Gómez",
      dni: "34567891",
      telefono: "1122334466",
      parentesco: "Padre",
      fecha_nacimiento: "1980-05-15",
    },
  ],
  actividades: [
    {
      id: 1,
      nombre: "Taller de Cerámica",
      tipo: "Taller",
      descripcion: "Actividades creativas con arcilla.",
      cupo: 15,
      turno: "TT",
      fecha_inicio: "2024-03-01",
      fecha_fin: "2024-12-15",
      estado: "Activa",
    },
    {
      id: 2,
      nombre: "Grupo Recreativo",
      tipo: "Grupo",
      descripcion: "Juegos y actividades al aire libre.",
      cupo: 25,
      turno: "TM",
      fecha_inicio: "2024-04-01",
      fecha_fin: "2024-11-30",
      estado: "Activa",
    },
  ],
};

export default function AlumnoDetailPage() {
  // Simulación de un alumno
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container className="my-4">
        <div className="d-flex justify-content-between m-2">
            
        <h1>
          {alumno.apellido}, {alumno.nombre}
        </h1>
        <button className="btn btn-primary py-2" onClick={() => setShowModal(true)}>
            Editar Alumno
        </button>
        </div>

        <Row className="mb-4 d-flex">
          <Col md={6} className="d-flex">
            <Card className="w-100">
              <Card.Header>Datos personales</Card.Header>
              <Card.Body>
                <p>
                  <strong>DNI:</strong> {alumno.dni}
                </p>
                <p>
                  <strong>Fecha de Nacimiento:</strong> {alumno.fechaNac}
                </p>
                <p>
                  <strong>Dirección:</strong> {alumno.direccion}
                </p>
                <p>
                  <strong>Barrio:</strong> {alumno.barrio}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Header>Datos académicos</Card.Header>
              <Card.Body>
                <p>
                  <strong>Escuela:</strong> Escuela N° 123
                </p>
                <p>
                  <strong>Año escolar:</strong> 5° grado
                </p>
                <p>
                  <strong>Turno:</strong> TT
                </p>
                <p>
                  <strong>Condición Socioeducativa:</strong> Sí
                </p>
                <p>
                  <strong>Estado:</strong> Lista de espera
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Accordion defaultActiveKey="0" className="mb-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Familiares</Accordion.Header>
            <Accordion.Body>
              {alumno.familiares && alumno.familiares.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>DNI</th>
                      <th>Fecha de Nacimiento</th>
                      <th>Teléfono</th>
                      <th>Parentesco</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumno.familiares.map((familiar, index) => (
                      <tr key={index}>
                        <td>{familiar.nombre}</td>
                        <td>{familiar.apellido}</td>
                        <td>{familiar.dni}</td>
                        <td>{familiar.fecha_nacimiento}</td>
                        <td>{familiar.telefono}</td>
                        <td>{familiar.parentesco}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-muted mb-3">
                  Este alumno aún no tiene familiares asociados.
                </div>
              )}

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-success"
                  onClick={() => console.log("abrir formulario")}
                >
                  + Agregar familiar
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Card className="mb-4">
          <Card.Header>Actividades inscriptas</Card.Header>
          <Card.Body>
            {alumno.actividades.length === 0 ? (
              <p>Este alumno no está inscripto en ninguna actividad.</p>
            ) : (
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Turno</th>
                    <th>Fechas</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {alumno.actividades.map((act) => (
                    <tr key={act.id}>
                      <td>{act.nombre}</td>
                      <td>{act.tipo}</td>
                      <td>{act.turno}</td>
                      <td>
                        {act.fecha_inicio} → {act.fecha_fin}
                      </td>
                      <td>{act.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
      <AlumnoEditModal
        alumno={alumno}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={(alumnoActualizado) => {
          console.log("Alumno actualizado:", alumnoActualizado);
          // Aquí puedes manejar la lógica para guardar los cambios en el alumno
        }}
      />
    </>
  );
}
