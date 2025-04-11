'use client'

import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

interface Alumno {
  id: number
  nombre: string
  apellido: string
  dni: string
  fechaNac: string
  direccion: string
  barrio: string
  socioEducativo: boolean
  escuela: string
  anioEscolar: string
}

interface AlumnoEditModalProps {
  alumno: Alumno
  show: boolean
  onClose: () => void
  onSave: (alumnoEditado: Alumno) => void
}

export default function AlumnoEditModal({ alumno, show, onClose, onSave }: AlumnoEditModalProps) {
  const [formData, setFormData] = useState<Alumno>(alumno)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    const newValue =
      type === 'checkbox' && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }))
  }

  const handleSubmit = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Alumno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaNac"
              value={formData.fechaNac}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Barrio</Form.Label>
            <Form.Control
              type="text"
              name="barrio"
              value={formData.barrio}
              onChange={handleChange}
            />
          </Form.Group>

          {/* ✅ Datos Académicos */}
          <hr />
          <h5>Datos Académicos</h5>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Condición SocioEducativa"
              name="socioEducativo"
              checked={formData.socioEducativo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Escuela</Form.Label>
            <Form.Control
              type="text"
              name="escuela"
              value={formData.escuela}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Año escolar</Form.Label>
            <Form.Control
              type="text"
              name="anioEscolar"
              value={formData.anioEscolar}
              onChange={handleChange}
            />
          </Form.Group>


        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
