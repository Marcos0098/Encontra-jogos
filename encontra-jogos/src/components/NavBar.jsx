import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsController } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai"
import './navbar.css';

const NavBar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!search) return

    navigate(`/search?q=${search}`);
    setSearch("");
  }

  return (
    <nav id="navbar">
        <h2>
            <Link to="/">
                <BsController />ENCONTRA-JOGOS
            </Link>
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Pesquise um jogo" onChange={(e) => setSearch(e.target.value)} value={search} />
          <button type="submit">
            <AiOutlineSearch/>
          </button>
        </form>
    </nav>
  )
}

export default NavBar