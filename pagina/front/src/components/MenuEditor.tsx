import { Link } from "react-router-dom";

export default function MenuUser() {
  return (
    <div>
      <Link to="/editors">Editor</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}