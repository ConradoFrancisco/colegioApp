import { Modal, Form, Button } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AlumnoFormValues {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNac: string;
  direccion: string;
  barrio: string;
  socioEducativo: boolean;
  escuela: string;
  anioEscolar: string;
  turno: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (values: AlumnoFormValues) => void;
}

const initialValues: AlumnoFormValues = {
  nombre: "",
  apellido: "",
  dni: "",
  fechaNac: "",
  direccion: "",
  barrio: "",
  socioEducativo: false,
  escuela: "",
  anioEscolar: "",
  turno: "TM",
};

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  dni: Yup.string().required("El DNI es obligatorio"),
  fechaNac: Yup.string().required("La fecha de nacimiento es obligatoria"),
  direccion: Yup.string().required("La dirección es obligatoria"),
  barrio: Yup.string().required("El barrio es obligatorio"),
  escuela: Yup.string().required("La escuela es obligatoria"),
  anioEscolar: Yup.string().required("El año escolar es obligatorio"),
  turno: Yup.string().required("El turno es obligatorio"),
});

export default function AlumnoModal({ show, onClose, onSubmit }: Props) {
  return (
    <Modal size="xl" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Alumno</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
          onClose();
        }}
      >
        {({ handleChange, values }) => (
          <FormikForm>
            <Modal.Body>
                <div className="row">

              {[
                { name: "nombre", label: "Nombre" },
                { name: "apellido", label: "Apellido" },
                { name: "dni", label: "DNI" },
                { name: "fechaNac", label: "Fecha de nacimiento", type: "date" },
                { name: "direccion", label: "Dirección" },
                { name: "barrio", label: "Barrio" },
                { name: "escuela", label: "Escuela" },
                { name: "anioEscolar", label: "Año escolar" },
              ].map(({ name, label, type = "text" }) => (
                <div className="col-md-6"  key={name}>

                <Form.Group className="mb-3">
                  <Form.Label>{label}</Form.Label>
                  <Field
                    as={Form.Control}
                    type={type}
                    name={name}
                    isInvalid={!ErrorMessage}
                  />
                  <ErrorMessage name={name} component="div" className="text-danger" />
                </Form.Group>
                </div>
              ))}
                </div>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Condición SocioEducativa"
                  name="socioEducativo"
                  checked={values.socioEducativo}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Turno</Form.Label>
                <Field as={Form.Select} name="turno">
                  <option value="TM">TM</option>
                  <option value="TT">TT</option>
                  <option value="TV">TV</option>
                  <option value="J Comp.">J Comp.</option>
                </Field>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Guardar
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
}