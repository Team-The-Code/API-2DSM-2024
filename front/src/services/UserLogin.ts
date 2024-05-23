 import {LoginProps} from "../types"
 import api from "./api";

 class UserLogin {
     async login(name:string, mail:string, password:string): Promise<LoginProps> {
         const {data} = await api.post("/login",{
            name, mail, password
         });
        console.log("data", data);
        return data;
     }
}

 const service1 = new UserLogin();
 export default service1;