import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface FamiliarFormProps {
  show: boolean
  onHide: () => void
  onSubmit: (values: FamiliarFormValues | { id: number }) => void
  familiar?: FamiliarFormValues | null
  alumnoId: number
}

export interface FamiliarFormValues {
  apellido: string
  nombre: string
  dni: string
  fechaNac: string
  telefono: string
  parentesco: string
}

const validationSchema = Yup.object({
  apellido: Yup.string().required('Requerido'),
  nombre: Yup.string().required('Requerido'),
  dni: Yup.string().required('Requerido'),
  fechaNac: Yup.string().required('Requerido'),
  telefono: Yup.string().required('Requerido'),
  parentesco: Yup.string().required('Requerido'),
})

const familiaresExistentes = [
  { id: 1, nombre: 'Carlos Pérez', dni: '12345678' },
  { id: 2, nombre: 'María González', dni: '23456789' },
]

export default function FamiliarModal({ show, onHide, onSubmit, familiar }: FamiliarFormProps) {
  const [usarExistente, setUsarExistente] = useState(false)
  const [familiarSeleccionado, setFamiliarSeleccionado] = useState<number | null>(null)

  const initialValues: FamiliarFormValues = familiar || {
    apellido: '',
    nombre: '',
    dni: '',
    fechaNac: '',
    telefono: '',
    parentesco: '',
  }

  const handleSubmit = (values: FamiliarFormValues) => {
    onSubmit(values)
    onHide()
  }

  const handleSeleccionarExistente = () => {
    if (familiarSeleccionado) {
      onSubmit({ id: familiarSeleccionado })
      onHide()
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{familiar ? 'Editar Familiar' : 'Agregar Familiar'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!usarExistente && (
          <Button variant="outline-primary" onClick={() => setUsarExistente(true)} className="mb-3">
            Seleccionar familiar ya registrado
          </Button>
        )}

        {usarExistente ? (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Elegir familiar existente</Form.Label>
              <Form.Select
                value={familiarSeleccionado ?? ''}
                onChange={(e) => setFamiliarSeleccionado(parseInt(e.target.value))}
              >
                <option value="">Seleccione un familiar</option>
                {familiaresExistentes.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nombre} (DNI: {f.dni})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setUsarExistente(false)}>
                Volver al formulario
              </Button>
              <Button
                variant="primary"
                onClick={handleSeleccionarExistente}
                disabled={!familiarSeleccionado}
              >
                Asociar al alumno
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values)
              actions.setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <FormikForm>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Field name="apellido" className="form-control" />
                  <ErrorMessage name="apellido" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Field name="nombre" className="form-control" />
                  <ErrorMessage name="nombre" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>DNI</Form.Label>
                  <Field name="dni" className="form-control" />
                  <ErrorMessage name="dni" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Field name="fechaNac" type="date" className="form-control" />
                  <ErrorMessage name="fechaNac" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Field name="telefono" className="form-control" />
                  <ErrorMessage name="telefono" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Parentesco</Form.Label>
                  <Field name="parentesco" className="form-control" />
                  <ErrorMessage name="parentesco" component="div" className="text-danger" />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Guardar
                  </Button>
                </Modal.Footer>
              </FormikForm>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  )
}
