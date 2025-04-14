'use client'

import { useEffect, useState } from "react"
import { Button, Container, Modal, Table, Badge } from "react-bootstrap"
import ActividadModal from "./components/ActividadModal"

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

export default function ActividadesPage() {
  const [actividades, setActividades] = useState<IActividad[]>([])
  const [showModal, setShowModal] = useState(false)

  const fetchActividades = async () => {
    const res = await fetch("http://localhost/colegioApi/?endpoint=actividades/getAll")
    const data = await res.json()
    setActividades(data)
  }

  const handleCreate = async (actividad: IActividad) => {
    await fetch("http://localhost/colegioApi/?endpoint=actividades/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actividad),
    })
    setShowModal(false)
    fetchActividades()
  }

  useEffect(() => {
    fetchActividades()
  }, [])

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Actividades</h2>
        <Button onClick={() => setShowModal(true)}>+ Nueva actividad</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Turno</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Cupo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nombre}</td>
              <td>{a.tipo}</td>
              <td>{a.turno}</td>
              <td>{a.fecha_inicio}</td>
              <td>{a.fecha_fin}</td>
              <td>{a.cupo ?? "-"}</td>
              <td>
                <Badge bg={a.estado === "Activa" ? "success" : "secondary"}>
                  {a.estado}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ActividadModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreate} />
    </Container>
  )
}
