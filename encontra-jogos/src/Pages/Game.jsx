import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

import GameCard from "../components/GameCard";

import "./game.css";

const gameURL = import.meta.env.VITE_API_GAMES;
const apiKey = import.meta.env.VITE_API_KEY;

const Game = () => {
  const {id} = useParams();
  const [game, setGame] = useState(null);
  const [screenshot, setScreenshot] = useState(null)
  const [lojas, setLojas] = useState(null);

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
       <GameCard game={game} showLink={false}/>
        <h3 className="info-genero">
          Generos:{game.genres.length > 0 && game.genres.map((genero) => <div key={genero.id} className="generos">{genero.name}</div>)}
        </h3>

        <h3 className="info-plataforma">
          Plataformas: {game.platforms.length > 0 &&
          game.platforms.map((plataforma) => 
          <div key={plataforma.platform.id}  className="plataformas">{plataforma.platform.name}</div>)}
        </h3>

        <h3 className="info-screenshot">
          Screenshots: {screenshot.results.length > 0 &&
          screenshot.results.map((imagens) => 
          <div key={imagens.id} className="screenshots" ><img src={imagens.image}/></div>)}
        </h3>

        <h3 className="info-store">
          Lojas: {game.stores.length > 0 && 
          idUrlStore.idLoja.map((idSites, index) => 
          <div key={idSites} className="Link-lojas"> <a href={idUrlStore.urlLoja[index]} target="_blank">{idUrlStore.nomeLoja[index]}</a> </div>
          )}
        </h3>
        
        <h3 className="info-tags">
          Tags: {game.tags.length > 0 &&
          game.tags.map((categorias) => <div>{categorias.name}</div>)}
        </h3>

        <h3 className="info-description">
          Description: {game.description_raw}
        </h3>

        <h3 className="info-developers">
          Developers: {game.developers.length > 0 &&
          game.developers.map((devs) => <div key={devs.id} className="devs">{devs.name}</div>)}
        </h3>
      </>
      }

    </div>

  )
}

export default Game