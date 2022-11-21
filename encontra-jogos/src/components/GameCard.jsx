import { Link } from "react-router-dom";
import { useState } from "react";

import { FaStar } from "react-icons/fa";

const GameCard = ({game, showLink = true}) => {

  const [active, setMode] = useState(false);
  const ToggleMode = () => {
      setMode(!active);
  };

  return (
    <div className="game-card">

        <img src={game.background_image} alt={game.name} />
        <div className="game-card-info">
          <h2>{game.name}</h2>
          <p>
              <FaStar/> {game.rating}
          </p>
          
          <div className="about-game">
          <h3>About</h3>
          <div className={active ? "descricaoOpen" : "descricaoSemiOpen" }>
            <h4>{game.description_raw}</h4>
          </div>
          <button onClick={ToggleMode}>Show More</button>
          </div>
          
        </div>


        {showLink && <Link to={`/game/${game.id}`}>Detalhes</Link>}
    </div>
  )
}

export default GameCard