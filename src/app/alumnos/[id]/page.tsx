"use client";

import {
  Card,
  Container,
  Row,
  Col,
  Accordion,
  Table,
  Badge,
} from "react-bootstrap";
import AlumnoEditModal from "./components/EditarAlumnoModal";
import { useEffect, useState } from "react";
import FamiliarModal from "./components/FamiliarModal";
import AlumnosService from "../../../../services/AlumnosService";
import InscripcionModal from "./components/InscripcionModal";
import { ToastContainer } from "react-toastify";

interface IFamiliar {
  fechaNac: string;
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
  en_lista_espera: string;
}

export interface IAlumno {
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
}

export default function AlumnoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Simulación de un alumno
  const [showModal, setShowModal] = useState(false);
  const [showFamiliarModal, setShowFamiliarModal] = useState(false);
  const [showInscripcionModal, setShowInscripcionModal] = useState(false);
  const [alumno, setAlumno] = useState<IAlumno | undefined>({
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

    familiares: [
      {
        id: 1,
        nombre: "Laura",
        apellido: "Gómez",
        dni: "34567890",
        telefono: "1122334455",
        parentesco: "Madre",
        fechaNac: "1985-10-20",
      },
      {
        id: 2,
        nombre: "Carlos",
        apellido: "Gómez",
        dni: "34567891",
        telefono: "1122334466",
        parentesco: "Padre",
        fechaNac: "1980-05-15",
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
  });
  const [selectedFamiliar, setSelectedFamiliar] = useState<IFamiliar | null>({
    id: 1,
    nombre: "Laura",
    apellido: "Gómez",
    dni: "34567890",
    telefono: "1122334455",
    parentesco: "Madre",
    fechaNac: "1985-10-20",
  });
  const [flag, setFlag] = useState(0);
  // Funciones para abrir modal
  const handleAddFamiliar = () => {
    setSelectedFamiliar(null); // nuevo
    setShowFamiliarModal(true);
  };

  const handleEditFamiliar = (familiar: IFamiliar) => {
    setSelectedFamiliar({
      ...familiar,
    });
    setShowFamiliarModal(true);
  };
  useEffect(() => {
    const getAlumno = async () => {
      const response = await AlumnosService.getById(params.id as string);
      setAlumno(response as IAlumno); // Assuming the first element is the desired alumno
    };
    getAlumno();
  }, [flag]);
  return (
    <>
      <Container fluid className="my-4">
        <div className="d-flex justify-content-between m-2">
          <h1>
            {alumno?.apellido}, {alumno?.nombre}
          </h1>
          <button
            className="btn btn-primary py-2"
            onClick={() => setShowModal(true)}
          >
            Editar Alumno
          </button>
        </div>

        <Row className="mb-4 d-flex">
          <Col md={6} className="d-flex">
            <Card className="w-100 h-100">
              <Card.Header>Datos personales</Card.Header>
              <Card.Body>
                <p>
                  <strong>DNI:</strong> {alumno?.dni}
                </p>
                <p>
                  <strong>Fecha de Nacimiento:</strong> {alumno?.fechaNac}
                </p>
                <p>
                  <strong>Dirección:</strong> {alumno?.direccion}
                </p>
                <p>
                  <strong>Barrio:</strong> {alumno?.barrio}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex">
            <Card className="w-100 h-100">
              <Card.Header>Datos académicos</Card.Header>
              <Card.Body>
                <p>
                  <strong>Escuela:</strong> {alumno?.escuela}
                </p>
                <p>
                  <strong>Año escolar:</strong> {alumno?.anioEscolar}
                </p>
                <p>
                  <strong>Condición Socioeducativa:</strong>{" "}
                  {alumno?.socioEducativo ? "Sí" : "No"}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Accordion defaultActiveKey="0" className="mb-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Familiares</Accordion.Header>
            <Accordion.Body>
              {alumno?.familiares && alumno?.familiares.length > 0 ? (
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
                        <td>{familiar.fechaNac}</td>
                        <td>{familiar.telefono}</td>
                        <td>{familiar.parentesco}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditFamiliar(familiar)}
                          >
                            <i className="bi bi-pencil"></i>
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
                <button className="btn btn-success" onClick={handleAddFamiliar}>
                  + Agregar familiar
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="1" className="mb-4">
          <Accordion.Item eventKey="1">
            <div>
              <Accordion.Header className="d-flex justify-content-between">
                Actividades
              </Accordion.Header>
            </div>
            <Accordion.Body>
              {alumno?.actividades && alumno?.actividades.length > 0 ? (
                <Table striped bordered hover responsive>
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
                    {alumno.actividades.map((act, index) => (
                      <tr key={index}>
                        <td>{act.nombre}</td>
                        <td>{act.tipo}</td>
                        <td>{act.turno}</td>
                        <td>
                          {act.fecha_inicio} → {act.fecha_fin}
                        </td>
                        <td>
                          <Badge
                            bg={
                              act.en_lista_espera === "0"
                                ? "success"
                                : "warning"
                            }
                          >
                            {act.en_lista_espera === "0"
                              ? "Inscripto"
                              : "Lista de espera"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-muted mb-3">
                  Este alumno aún no está inscripto en ninguna actividad.
                </div>
              )}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-success"
                  onClick={() => setShowInscripcionModal(true)}
                >
                  + Nueva inscripción
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      {alumno && (
        <AlumnoEditModal
          setFlag={setFlag}
          saveAlumnno={AlumnosService.updateAlumno}
          alumno={alumno}
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
      {alumno && (
        <>
          <FamiliarModal
            setFlag={setFlag}
            show={showFamiliarModal}
            onHide={() => setShowFamiliarModal(false)}
            familiar={selectedFamiliar}
            alumno_id={alumno?.id}
            onSubmit={(familiar) => {
              console.log("Familiar actualizado:", familiar);
              // Aquí puedes manejar la lógica para guardar los cambios en el familiar
            }}
          />
          <InscripcionModal
            setFlag={setFlag}
            alumno_id={alumno?.id}
            show={showInscripcionModal}
            onClose={() => setShowInscripcionModal(false)}
          />
        </>
      )}
      <ToastContainer />
    </>
  );
}
