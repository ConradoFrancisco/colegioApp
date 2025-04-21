import { IAlumno } from "@/app/alumnos/[id]/page";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/ColegioApp/alumnos";
interface GetAlumnosParams {
  busqueda?: string;
  barrio?: string;
  limit?: number;
  offset?: number;
}
class AlumnosService {
  public async getAlumnos(
    params: GetAlumnosParams = {}
  ): Promise<{ data: unknown; cant: unknown }> {
    const query = new URLSearchParams();

    if (params.busqueda) query.append("busqueda", params.busqueda);
    if (params.barrio) query.append("barrio", params.barrio);
    if (params.limit !== undefined)
      query.append("limit", params.limit.toString());
    if (params.offset !== undefined)
      query.append("offset", params.offset.toString());

    const response = await axios.get(
      `${API_URL}?endpoint=alumnos/getAll&${query.toString()}`
    );

    return {
      data: response.data.data,
      cant: response.data.total, // o 'cant' si cambiaste eso en el backend
    };
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
  public async updateFamiliar(id: number, data: unknown): Promise<[]> {
    try {
      const response = await axios.put(
        `${API_URL}?endpoint=familiares/update&id=${id}`,
        data
      );
      toast.success("Familiar modificado correctamente");
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

      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Error al crear obtener el alumno");
      return {} as IAlumno;
    }
  }
  public async createFamiliarYvincular(data: unknown): Promise<IAlumno> {
    try {
      const response = await axios.post(
        `${API_URL}?endpoint=alumnos/createFamiliar`,
        data
      );
      toast.success(response.data.message);
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
