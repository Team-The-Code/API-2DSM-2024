import { useState } from "react"
import { useUser } from "../hooks";

export default function LoginPage(){
    const [mail,setMail] = useState("root@visiona.com.br");
    const [password,setPassword] = useState("123456");
    const {login} = useUser();

    function handle(){
        login(mail,password);
    }

    return <>
        <div>
            <label>e-mail</label>
            <input value={mail} onChange={(e)=>setMail(e.target.value)} />
        </div>
        <div>
            <label>Senha</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div>
            <button onClick={()=>handle()}>Logar</button>
        </div>
    </>
}