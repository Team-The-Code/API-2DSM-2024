 import {LoginProps} from "../types"
 import api from "./api";

 class UserLogin {
     async login(mail:string, password:string): Promise<LoginProps> {
         const {data} = await api.post("/login",{
            mail, password
         });
        console.log("data", data);
        return data;
     }
}

 const service1 = new UserLogin();
 export default service1;


