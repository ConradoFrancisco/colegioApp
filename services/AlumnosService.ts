import { IAlumno } from "@/app/alumnos/[id]/page";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/ColegioApp/alumnos";

class AlumnosService {
  public async getAlumnos(): Promise<[]> {
    const response = await axios.get(
      `http://localhost/api/?endpoint=alumnos/getAll`
    );
    return response.data;
  }
  public async createAlumno(data: unknown): Promise<[]> {
    try {
      const response = await axios.post(
        `${API_URL}?endpoint=alumnos/create`,
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear el alumno");
      return [];
    }
  }
  public async updateAlumno(id: number, data: unknown): Promise<[]> {
    try {
      const response = await axios.put(
        `${API_URL}?endpoint=alumnos/update&id=${id}`,
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear el alumno");
      return [];
    }
  }
  public async getById(id: string): Promise<IAlumno> {
    try {
      const response = await axios.get(
        `${API_URL}?endpoint=alumnos/get&id=${id}`
      );
      /*   toast.success(response.data.message); */
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear obtener el alumno");
      return {} as IAlumno;
    }
  }
  public async createFamiliarYvincular(data:unknown): Promise<IAlumno> {
    try {
      const response = await axios.post(
        `${API_URL}?endpoint=alumnos/createFamiliar`,data
      );
      /*   toast.success(response.data.message); */
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear obtener el alumno");
      return {} as IAlumno;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AlumnosService();
