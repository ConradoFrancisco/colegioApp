import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/alumnos";

class AlumnosService{
    public async getAlumnos(): Promise<[]> {
        const response = await axios.get(`${API_URL}?endpoint=alumnos/getAll`);
        console.log(response)
        return response.data;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AlumnosService();