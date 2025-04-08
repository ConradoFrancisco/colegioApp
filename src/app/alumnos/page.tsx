'use client'

import { Table, Container} from 'react-bootstrap'
import Link from 'next/link'
import AlumnosService from '../../../services/AlumnosService'
import { useEffect, useState } from 'react'
import AlumnoModal from './components/AlumnoModal'

interface IAlumnoListado{
  id: string
  nombre: string
  apellido: string
  barrio: string
  direccion: string
  dni: string
  edad:string
  escuela:string
  fecha_nacimiento: string
  socio_educativo:string
  last_modified:string | null
}

export default function AlumnosPage() {
  const [alumnos,setAlumnos] = useState<IAlumnoListado[] | null>(null)
  const [showModal, setShowModal] = useState(false)
  // Simulación de datos hasta traerlos desde el backend
  /* const alumnos : IAlumnoListado[] = [
    { id: 1, nombre: 'Valentina', apellido: 'Gómez',fechaNac: '2000-01-01',dni: '12345678',barrio: 'Centro',direccion: 'Av. Libertador 1234' },
    { id: 2, nombre: 'Lucas', apellido: 'Fernández',fechaNac: '2000-01-01',dni: '12345679',barrio: 'Centro',direccion: 'Av. Libertador 1234' },
  ] */
    const handleCreateAlumno = async (data:unknown) => {
      try {
        // Acá harías la llamada a tu backend para guardar el nuevo alumno
        console.log('Nuevo alumno:', data)
        // await AlumnosService.createAlumno(data)
        await getAlumnos()
      } catch (error) {
        console.error("Error al guardar alumno", error)
      }
    }
  
  const getAlumnos = async () => {
    const response = await AlumnosService.getAlumnos();
    setAlumnos(response)
  }

  useEffect(()=>{
    getAlumnos();
  },[])
  return (
    <>
    <Container fluid className="my-4">
      <div className="d-flex justify-content-between">
      <h1 className="mb-4">Listado de Alumnos</h1>
      <div className=''>

      <button className="btn btn-success" onClick={()=>setShowModal(true)}>Añadir alumno</button>
      </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
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
              <td>{a.id}</td>
              <td>{a.apellido}</td>
              <td>{a.nombre}</td>
              <td>{a.fecha_nacimiento}</td>
              <td>{a.dni}</td>
              <td>{a.barrio}</td>
              <td>{a.direccion}</td>
              <td>{a.escuela}</td>
              <td>
                <Link href={`/alumnos/${a.id}`} className="btn btn-primary btn-sm">
                  Más información
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <AlumnoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateAlumno}
      />
    </>
  )
}
