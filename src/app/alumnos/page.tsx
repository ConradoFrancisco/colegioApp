'use client'

import { Table, Container } from 'react-bootstrap'
import Link from 'next/link'

interface IAlumnoListado{
  id: number
  nombre: string
  apellido: string
  dni: string
  barrio: string
  direccion: string
  fechaNac: string
}

export default function AlumnosPage() {
  // Simulación de datos hasta traerlos desde el backend
  const alumnos : IAlumnoListado[] = [
    { id: 1, nombre: 'Valentina', apellido: 'Gómez',fechaNac: '2000-01-01',dni: '12345678',barrio: 'Centro',direccion: 'Av. Libertador 1234' },
    { id: 2, nombre: 'Lucas', apellido: 'Fernández',fechaNac: '2000-01-01',dni: '12345679',barrio: 'Centro',direccion: 'Av. Libertador 1234' },
  ]

  return (
    <Container className="my-4">
      <h1 className="mb-4">Listado de Alumnos</h1>

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a, index) => (
            <tr key={index}>
              <td>{a.id}</td>
              <td>{a.apellido}</td>
              <td>{a.nombre}</td>
              <td>{a.fechaNac}</td>
              <td>{a.barrio}</td>
              <td>{a.direccion}</td>
              <td>{a.dni}</td>
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
  )
}
