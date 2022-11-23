import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

import { FaStar } from 'react-icons/fa'

import "./game.css";


const gameURL = import.meta.env.VITE_API_GAMES;
const apiKey = import.meta.env.VITE_API_KEY;

const Game = () => {
  const {id} = useParams();
  const [game, setGame] = useState(null);
  const [screenshot, setScreenshot] = useState(null)
  const [lojas, setLojas] = useState(null);

  const [active, setMode] = useState(false);
  const ToggleMode = () => {
      setMode(!active);
  };

  const idUrlStore = {
    idLoja : [],
    urlLoja : [],
    nomeLoja : [],
  }

  if(game != null){
    for(let i = 0 ; i < game.stores.length; i++){
      idUrlStore.idLoja[i] = lojas[i].store_id;
      idUrlStore.urlLoja[i] = lojas[i].url;
      idUrlStore.nomeLoja[i] = game.stores[i].store.name;
    }
  }

  const getGame = async (url, urlScreenshot, urlLojas) =>{

    const resGame = await fetch(url);
    const resScreenshot = await fetch(urlScreenshot);
    const resLojas = await fetch(urlLojas);


    const dataGame = await resGame.json();
    const dataScreen = await resScreenshot.json();
    const dataLojas = await resLojas.json();


    setGame(dataGame);
    setScreenshot(dataScreen);
    setLojas(dataLojas.results)

    console.log(dataGame)
  }

  useEffect(()=>{
    const gameUrl = `${gameURL}/${id}?${apiKey}`;
    const screenshotUrl = `${gameURL}/${id}/screenshots?${apiKey}`;
    const lojasOficiaisUrl = `${gameURL}/${id}/stores?${apiKey}`
    getGame(gameUrl, screenshotUrl, lojasOficiaisUrl);

  },[])

  return (
    <div className="game-description">
      {game &&
      <>
      <div className="imagem-jogo">
        <img src={game.background_image} alt={game.name} />
        <p>Screenshots</p>
        <div className="info-screenshot">
          {screenshot.results.length > 0 &&
          screenshot.results.map((imagens) => 
          <div key={imagens.id} className="screenshots" ><img src={imagens.image}/></div>)}
        </div>

        <h3 className="info-store">
            Lojas: {game.stores.length > 0 && 
            idUrlStore.idLoja.map((idSites, index) => 
            <div key={idSites} className="Link-lojas"> <a href={idUrlStore.urlLoja[index]} target="_blank">{idUrlStore.nomeLoja[index]}</a> </div>
            )}
          </h3>
      </div>

      <div className="informacao-jogo">
          <div className="nome-star">
            <h2>{game.name}</h2>
            <p>
                  <FaStar/> {game.rating}
            </p>
          </div>

          <div className="about-game">
            <h3>About</h3>
            <div className={active ? "descricaoOpen" : "descricaoSemiOpen" }>
              <h4>{game.description_raw}</h4>
            </div>
            <button onClick={ToggleMode}>Show More</button>
          </div>

          <div className="detalhes-jogo">

            <div className="container-detalhes">
              <h3 className="detalhe-titulo">Gêneros</h3>
              <p>{game.genres.length > 0 && game.genres.map((genero) => <div key={genero.id} className="generos">{genero.name}</div>)}</p>
            </div>

            <div className="container-detalhes">
              <h3 className="detalhe-titulo">Data de Lançamento</h3>
              <p>{game.released}</p>
            </div>

            <div className="container-detalhes">
              <h3 className="detalhe-titulo">Desenvolvedores</h3>
              <p>{game.developers.length > 0 && game.developers.map((desenvolvedores) => <div key={desenvolvedores.id}>{desenvolvedores.name}</div>)}</p>
            </div>

            <div className="container-detalhes">
              <h3 className="detalhe-titulo">Publicadora</h3>
              <p>{game.publishers.length > 0 && game.publishers.map((publicadoras) => <div key={publicadoras.id}>{publicadoras.name}</div>)}</p>
            </div>

            <div className="container-detalhes">
              <h3 className="detalhe-titulo">Plataformas</h3>
              <p>{game.platforms.length > 0 && game.platforms.map((plataforma) => <div key={plataforma.platform.id}  className="plataformas">{plataforma.platform.name}</div>)}</p>        
            </div>

          </div>
          <div className="container-detalhes-tags">
              <h3 className="detalhe-titulo">Tags</h3>
              <p>{game.tags.length > 0 && game.tags.map((categorias) => <div key={categorias.id}>{categorias.name}</div>)}</p>
            </div>
      </div>
      </>
      }

    </div>

  )
}

export default Game