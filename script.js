const $container = document.querySelector(".container"); 
const $btnPrev = document.querySelector(".btn-prev"); 
const $btnNext = document.querySelector(".btn-next"); 
const $page = document.querySelector(".counter"); 
const $pokemons = document.querySelector(".title-pokemon")
const $allbtns = document.querySelector(".btn-content")
 
const LIMIT = 20; 
const TOTAL_POKEMONS = 1118; 
const TOTAL_PAGES = Math.floor(TOTAL_POKEMONS / LIMIT); 
 
let pageCounter = 1; 
 
let offsetCounter = 0; 
 
 
let api = { 
  main: "https://pokeapi.co/api/v2/pokemon/", 
}; 
 
const setInfoPokemon = (url) => 
  setData(url).then((data) => { 
    $container.innerHTML = CardPokemon(data); 
  }); 
 
const setData = (url) => fetch(url).then((res) => res.json()); 
 
window.addEventListener("load", () => { 
  setData(`${api.main}?offset=${offsetCounter}&limit=${LIMIT}`).then((data) => { 
    let temp = data.results 
      .map((pokemon) => TitlePokemonCard(pokemon)) 
      .join(""); 
    $container.innerHTML = temp; 
  }); 
}); 
 
// title card pokemons 
function TitlePokemonCard(pokemon) { 
  return ` 
    <div class="title-card"> 
      <h1>${pokemon.name}</h1> 
      <button onClick="setInfoPokemon('${pokemon.url}')">Узнать больше</button>
    </div> 
  `; 
} 
 
// Card info pokemons 
function CardPokemon(info) { 
  console.log(info); 
  $pokemons.style.display = 'none'
  $allbtns.style.display = 'none'
  return ` 
  <div class="pokemon_container">
    <div class="pokemon_info"> 
      <div class="left_side">
        <h1>Имя: ${info.name}</h1> 
        <h2>Рост: ${info.height} метров</h2> 
        <h3>Вес: ${info.base_experience} киллограм</h3> 
        <h4>Цвет: ${info.moves[0].move.name}</h4> 
      </div>
      <div class="right_side">
        <img src='${info.sprites.other.dream_world.front_default}'/> 
      </div>
    </div> 
      <button onClick="reloadWindowFunc()">Вернуться назад</button> 
  </div>
  `; 
} 
 
// Reload function 
function reloadWindowFunc() { 
  window.location.reload(); 
} 
 
// Pagination 
window.addEventListener("load", () => { 
  $page.innerHTML = pageCounter; 
  $btnPrev.setAttribute("disabled", true); 
}); 
 
$btnNext.addEventListener("click", (e) => { 
  e.preventDefault(); 
  $btnPrev.removeAttribute("disabled"); 
  if (pageCounter >= 1 && pageCounter <= TOTAL_PAGES) { 
    if (pageCounter === TOTAL_PAGES) { 
      $btnNext.setAttribute("disabled", true); 
      setData( 
       ` ${api.main}?offset=${(offsetCounter += LIMIT)}&limit=${LIMIT} `
      ).then((data) => { 
        pageCounter++; 
        $page.innerHTML = pageCounter; 
        let temp = data.results 
          .map((pokemon) => TitlePokemonCard(pokemon)) 
          .join(""); 
        $container.innerHTML = temp; 
      }); 
    } else { 
      setData( 
      `  ${api.main}?offset=${(offsetCounter += LIMIT)}&limit=${LIMIT} `
      ).then((data) => { 
        pageCounter++; 
        $page.innerHTML = pageCounter; 
        let temp = data.results 
          .map((pokemon) => TitlePokemonCard(pokemon)) 
          .join(""); 
        $container.innerHTML = temp; 
      }); 
    } 
  } 
}); 
 
$btnPrev.addEventListener("click", (e) => { 
  e.preventDefault(); 
  if ((pageCounter) => 1) { 
    pageCounter--; 
 
    if (pageCounter === 1) { 
      $btnPrev.setAttribute("disabled", true); 
      offsetCounter = 0; 
      setData(`${api.main}?offset=${offsetCounter}&limit=${LIMIT}`).then( 
        (data) => { 
          $page.innerHTML = pageCounter; 
          let temp = data.results 
            .map((pokemon) => TitlePokemonCard(pokemon)) 
            .join(""); 
          $container.innerHTML = temp; 
        } 
      ); 
    } else { 
      setData(`${api.main}?offset=${offsetCounter -= LIMIT}&limit=${LIMIT}`).then( 
        (data) => { 
          $btnNext.removeAttribute('disabled') 
          $page.innerHTML = pageCounter; 
          let temp = data.results 
            .map((pokemon) => TitlePokemonCard(pokemon)) 
            .join(""); 
          $container.innerHTML = temp; 
        } 
      ); 
    } 
  } 
});
