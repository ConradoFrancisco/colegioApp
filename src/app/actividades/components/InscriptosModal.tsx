'use client'
import { useEffect, useState } from "react";
import { Badge, Modal, Table } from "react-bootstrap";
import ActividadService from "../../../../services/ActividadService";
export interface IInscripto {
    id: number;
    alumno_id: number;
    alumno_nombre: string; // nombre completo
    actividad_id: number;
    fecha_inscripcion: string; // o Date si lo convertís
    observaciones: string | null;
    estado: "Inscripto" | "En espera"; // asumí que estos son los posibles
  }
export default function InscriptosModal({ idActividad,show,onHide }: { idActividad: number,show:boolean,onHide: () => void }) {

     const [inscriptos, setInscriptos] = useState<IInscripto[]>([]);
    const fetchInscriptos = async () => {
         const res = await ActividadService.getInscriptos(idActividad);
         console.log(res)
         setInscriptos(res.data);
    }

    useEffect(()=>{
        // fetch inscriptos
        // set inscriptos
        fetchInscriptos();
    },[idActividad])

        return(
        <>
            <Modal show={show} onHide={onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Inscriptos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Lista de inscriptos</p>
                    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre del alumno</th>
          <th>Fecha de inscripción</th>
          <th>Observaciones</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {inscriptos.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center">No hay inscriptos</td>
          </tr>
        ) : (
          inscriptos?.map((inscripto, index) => (
            <tr key={inscripto.id}>
              <td>{index + 1}</td>
              <td>{inscripto.alumno_nombre}</td>
              <td>{new Date(inscripto.fecha_inscripcion).toLocaleDateString()}</td>
              <td>{inscripto.observaciones || "-"}</td>
              <td>
                <Badge bg={inscripto.estado === "Inscripto" ? "success" : "warning"}>
                  {inscripto.estado}
                </Badge>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={onHide}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </>)
}