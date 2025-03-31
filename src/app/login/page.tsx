'use client'
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
});

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-4 shadow-lg rounded-3 bg-white" style={{ width: "24rem" }}>
          <Card.Body>
            <h2 className="text-center mb-4">
              {isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
            </h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="d-flex flex-column gap-3">
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className="form-control"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger small" />
                  </div>

                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      className="form-control"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger small" />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-100">
                    {isSignUp ? "Registrarse" : "Ingresar"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="text-center mt-3">
              <button onClick={() => setIsSignUp(!isSignUp)} className="btn btn-link">
                {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
              </button>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
}
