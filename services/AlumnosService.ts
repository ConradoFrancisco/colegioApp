import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/alumnos";

class AlumnosService{
    public async getAlumnos(): Promise<[]> {
        const response = await axios.get(`${API_URL}?endpoint=alumnos/getAll`);
        return response.data;
    }
    public async CreateAlumno(data: unknown): Promise<[]> {
        try{
            const response = await axios.post(`${API_URL}?endpoint=alumnos/create`, data);
            toast.success(response.data.message);
            return response.data;
        }catch(e){
            console.log(e) 
            toast.error("Error al crear el alumno")
            return []
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AlumnosService();