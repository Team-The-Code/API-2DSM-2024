import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts";
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
