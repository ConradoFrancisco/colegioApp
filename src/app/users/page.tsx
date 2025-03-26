"use client";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../../services/UserService";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

interface IClientUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  estado: string;
  rol: string;
}

export default function Users() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IClientUser | null>(null);
  const [action, setAction] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [users, setUsers] = useState<IClientUser[] | null>(null);
  const [flag, setFlag] = useState<boolean>(false)

  const getUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response);
  };

  const OpenModalAction = (action: number, user: IClientUser | null) => {
    setAction(action);
    setOpen(true);
    setSelectedUser(user);
  };
  useEffect(() => {
    getUsers();
  }, [flag]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mt-4">
            <div className="strpied-tabled-with-hover card">
              <div className="card-header">
                <h4 className="card-title">
                  Usuarios registrados en el sistema
                </h4>
                <p className="card-category">
                  Aquí puedes dar de baja,alta o eliminar un usuario
                </p>
              </div>
              <div className="table-full-width table-responsive px-0 card-body">
                <table className="table-hover table-striped table">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre</th>
                      <th className="border-0">email</th>
                      <th className="border-0">Fecha de creación</th>
                      <th className="border-0">Rol</th>
                      <th className="border-0">estado</th>
                      <th className="border-0">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.created_at}</td>
                          <td>{user.rol}</td>
                          <td>
                            {user.estado === "1" ? (
                              <button className="btn btn-success w-75 disabled">
                                Activo
                              </button>
                            ) : (
                              <button className="btn btn-danger w-75 disabled">
                                {" "}
                                Inactivo
                              </button>
                            )}
                          </td>
                          <td>
                            <div className="d-flex justify-content-around gap-2">
                              {user.estado === "0" ? (
                                <button
                                  className="btn btn-success w-100"
                                  onClick={() => OpenModalAction(1, user)}
                                >
                                  Activar
                                </button>
                              ) : (
                                <button
                                  className="btn btn-danger w-100"
                                  onClick={() => OpenModalAction(2, user)}
                                >
                                  {" "}
                                  Desactivar
                                </button>
                              )}
                              <button
                                className="btn btn-secondary w-25"
                                onClick={() => OpenModalAction(3, user)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {(() => {
          switch (action) {
            case 1:
              return (
                <div className="p-4">
                  <h4>
                    Usted esta a punto de activar el usuario :{" "}
                    {selectedUser?.name}
                  </h4>{" "}
                  <p>¿Desea Proseguir?</p>
                  <div className="d-flex gap-2 w-75">
                    <button
                      className="btn btn-success"
                      onClick={async () => {
                        if (selectedUser?.id !== undefined) {
                          await UserService.setStates(selectedUser.id, 1);
                          setFlag(!flag)
                          setOpen(false);

                        }
                      }}
                    >
                      Continuar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setOpen(false)}
                    >
                      Regresar
                    </button>
                  </div>
                </div>
              );
            case 2:
              return (
                <div className="p-4">
                  <h4>
                    Usted esta a punto de desactivar el usuario :{" "}
                    {selectedUser?.name}
                  </h4>{" "}
                  <p>¿Desea Proseguir?</p>
                  <div className="d-flex gap-2 w-75">
                    <button
                      className="btn btn-success"
                      onClick={async () => {
                        if (selectedUser?.id !== undefined) {
                          await UserService.setStates(selectedUser.id, 0);
                          setFlag(!flag)
                          setOpen(false);
                        }
                      }}
                    >
                      Continuar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setOpen(false)}
                    >
                      Regresar
                    </button>
                  </div>
                </div>
              );
            case 3:
              return (
                <div className="p-4">
                  <h4>
                    Usted esta a punto de eliminar el usuario :{" "}
                    {selectedUser?.name}
                  </h4>{" "}
                  <p>esta acción no se puede deshacer ¿Desea Proseguir?</p>
                  <div className="d-flex gap-2 w-75">
                    <button className={`btn btn-success ${disabled ? 'disabled' : ''}`}onClick={async () => {
                        if (selectedUser?.id !== undefined) {
                          setDisabled(true)
                          try{
                            await UserService.deleteUser(selectedUser.id);
                            setFlag(!flag)
                            setOpen(false);
                          }catch(e){
                            console.log(e)
                          }finally{
                            setDisabled(false)
                          }
                        }
                      }}>Continuar</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setOpen(false)}
                    >
                      Regresar
                    </button>
                  </div>
                </div>
              );
            default:
              return <p>Acción no reconocida</p>;
          }
        })()}
      </Modal>
    <ToastContainer />

    </>
  );
}
