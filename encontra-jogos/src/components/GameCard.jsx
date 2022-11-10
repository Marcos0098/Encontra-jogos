import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

const GameCard = ({game, showLink = true}) => {

  return (
    <div className="game-card">
        <img src={game.background_image} alt={game.name} />
        <h2>{game.name}</h2>
        <p>
            <FaStar/> {game.rating}
        </p>
        {showLink && <Link to={`/game/${game.id}`}>Detalhes</Link>}
    </div>
  )
}

export default GameCard