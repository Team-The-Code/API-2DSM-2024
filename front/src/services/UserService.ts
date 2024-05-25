import { UserProps } from "../types";
import api from "./api";

class UserService {
    async create(name:string, mail:string, password:string, profile:string): Promise<UserProps> {
        const {data} = await api.post("/cadastro",{
            name, mail, password, profile
        });
        console.log("data", data);
        return data;
    }
}

const service = new UserService();
export default service;