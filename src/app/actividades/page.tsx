'use client'

import { useEffect, useState } from "react"
import { Button, Container, Table, Badge } from "react-bootstrap"
import ActividadModal from "./components/ActividadModal"
import { FaEdit, FaPause, FaPlay, FaTrash } from "react-icons/fa";
import ActividadService from "../../../services/ActividadService";
import { ToastContainer } from "react-toastify";
import Paginator from "../components/common/Paginator";

export interface IActividad {
  id?: number;
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
  const [cant, setCant] = useState(0)
  const [limit, setLimit] = useState(4)
  const [offset, setOffset] = useState(0)

  const fetchActividades = async () => {
    const res = await ActividadService.getAll({ limit, offset })
    const { data,cant } = res
    setCant(cant)
    setActividades(data)
  }

  const handleCreate = async (actividad: IActividad) => {
    await ActividadService.createActividad(actividad)
    setShowModal(false)
    fetchActividades()
  }

  useEffect(() => {
    fetchActividades()
  }, [limit,offset])

  return (
    <>
    <Container fluid className="my-4">
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
            <th>Estado</th>
            <th /* className="d-flex" */ style={{width:'11%'}}>Inscripciones</th>
            <th style={{width:'10%'}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividades?.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nombre}</td>
              <td>{a.tipo}</td>
              <td>{a.turno}</td>
              <td>
                <Badge bg={a.estado === "Activa" ? "success" : "warning"}>
                  {a.estado}
                </Badge>
              </td>
              <td><button className="btn btn-primary">Ver Inscripciones</button></td>
              <td className="d-flex gap-2" /* style={{width:'10%'}} */><button className="btn btn-primary"><FaEdit/></button>
              <button className={`${a.estado === "Activa" ? 'btn btn-secondary' : 'btn btn-success'}`}>{a.estado === 'Activa' ? <FaPause/> : <FaPlay/>}</button>
              <button className="btn btn-danger"><FaTrash/></button>
              </td>
            </tr>
          ))}
        </tbody>
        
       
      </Table>
          <Paginator
            cantidad={cant}
            limit={limit}
            offset={offset}
            setOffset={setOffset}
          />
      <ActividadModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreate} />
    </Container>
      <ToastContainer />
</>
  )
}
