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


// import { LoginProps } from "../types";
// import axios from "axios";

// class UserLogin {
//     async login(name: string, mail: string, password: string): Promise<LoginProps> {
//         try {
//             const { data } = await axios.post<LoginProps>("/login", { name, mail, password });
//             console.log("data", data);
//             return data;
//         } catch (error) {
//             // Trate os erros aqui, por exemplo:
//             console.error("Ocorreu um erro ao fazer login:", error.response.data);
//             throw error.response.data; // Lançar o erro para que possa ser tratado pelo chamador
//         }
//     }
// }

// const service1 = new UserLogin();
// export default service1;