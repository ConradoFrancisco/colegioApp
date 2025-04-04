'use client'

import { Table, Container } from 'react-bootstrap'
import Link from 'next/link'

export default function AlumnosPage() {
  // Simulación de datos hasta traerlos desde el backend
  const alumnos = [
    { id: 1, nombre: 'Valentina', apellido: 'Gómez' },
    { id: 2, nombre: 'Lucas', apellido: 'Fernández' }
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.apellido}</td>
              <td>{a.nombre}</td>
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
