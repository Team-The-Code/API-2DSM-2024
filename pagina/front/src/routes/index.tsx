import AdmRoutes from "./AdmRoutes";
import UnsignedRoutes from "./UnsignedRoutes";
import { useUser } from "../hooks";
import UserRoutes from "./UserRoutes";

export default function Routes(){
    const {token,profile} = useUser();

    return !token? <UnsignedRoutes /> : profile === "adm" ? <AdmRoutes /> : <UserRoutes />;
}