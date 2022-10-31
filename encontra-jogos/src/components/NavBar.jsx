import { Link, useNavigate } from "react-router-dom";
import { BsController } from "react-icons/bs";

const NavBar = () => {
  return (
    <nav id="navbar">
        <h2>
            <Link to="/">
                <BsController />ENCONTRA-JOGOS
            </Link>
        </h2>
        <form>

        </form>
    </nav>
  )
}

export default NavBar