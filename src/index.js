document.addEventListener('DOMContentLoaded', () => {
  // This will give me the json for Pokemon
  let div = document.querySelector("#pokemon-container");

  fetch("http://localhost:3000/pokemon")
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    addPokemon(json);
  });

  // This function displays every pokemon
  function addPokemon(pokemonDataArray){
    for(let i = 0; i < pokemonDataArray.length; i++){
      div.append(createPokemonCard(pokemonDataArray[i]));
    }
  }


// First element of the pokemonDataArray which came from the fetch response to JSON.
// An array of objects.

// pokemonDataObj = {
//     "height": 10,
//     "weight": 130,
//     "id": 2,
//     "name": "ivysaur",
//     "abilities": [
//       "overgrow",
//       "chlorophyll"
//     ],
//     "moves": [],
//     "stats": [
//       {
//         "value": 80,
//         "name": "special-defense"
//       },
//       {
//         "value": 80,
//         "name": "special-attack"
//       },
//       {
//         "value": 63,
//         "name": "defense"
//       },
//       {
//         "value": 62,
//         "name": "attack"
//       },
//       {
//         "value": 60,
//         "name": "speed"
//       },
//       {
//         "value": 60,
//         "name": "hp"
//       }
//     ],
//     "types": [
//       "grass",
//       "poison"
//     ],
//     "sprites": {
//       "front": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
//       "back": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png"
//     }
//   }

  // This creates the Pokemon card
  function createPokemonCard(pokemonDataObj){
  let pokemonDiv = document.createElement('div');

  let pokemonName = document.createElement('h3');
  pokemonName.innerText = pokemonDataObj["name"];
  pokemonName.className = "center-text";

  let infoDiv = document.createElement('div');
  infoDiv.innerHTML = displayInfo(pokemonDataObj); // displayInfo(obj) returns an HTML string
  infoDiv.style = "display: none";

  let pokemonImage = document.createElement('img');
  pokemonImage.src = pokemonDataObj["sprites"]["front"];
  pokemonImage.alt = pokemonDataObj["sprites"]["back"];
  pokemonImage.className = "pokemon-image";
  pokemonImage.addEventListener("click", handlePokemonSprite);

  pokemonDiv.append(pokemonName);
  pokemonDiv.append(pokemonImage);
  // If I want to work on making a display when clicking on a card
  // change this code.
  // -----------------------
  pokemonDiv.append(infoDiv);
  //  --------------------------
  //pokemonDiv.innerText = JSON.stringify(pokemonDataObj);
  pokemonDiv.className = "pokemon-card pokemon-frame";
  pokemonDiv.addEventListener("click", handlePokeInfo);
  return pokemonDiv;
  }

  // This toggles the display info for a pokemon
  
  function handlePokeInfo(event){
    let infoDiv = event.target.lastElementChild;
    if (infoDiv.style.display === "none"){
      infoDiv.style.display = "initial";
    }else {
      infoDiv.style.display = "none";
    }
  }

  // This toggles the pokemon sprite image
  function handlePokemonSprite(event){
    let img = event.target;
    let alt = event.target.src;
    let src = event.target.alt;
    img.src = src;
    img.alt = alt;
  }

  // Parses the data to format pokemon info
  function displayInfo(data){
    let abilities = data.abilities.join(", ");
    let moves = data.moves.join(", ");
    let stats = data.stats.map(function(obj) {return `${obj.name}: ${obj.value}`}).join(", ");
    let types = data.types.join(", ");
    let spriteF = data.sprites.front;
    let spriteB = data.sprites.back;
    return `<ul>
    <li>Height: ${data["height"]}</li>
    <li>Weight: ${data["weight"]}</li>
    <li>Abilities: <ul>${abilities}</ul></li>
    <li>Moves: <ul>${moves}</ul></li>
    <li>Stats: <ul>${stats}</ul></li>
    <li>types: <ul>${types}</ul></li>
    <li><img src = ${spriteF}></img><img src = ${spriteB}></img></li>
    </ul>`
  }

  // Input SEARCH
  // Document must be fully loaded or the input bar will not be found

  let inputBar = document.querySelector("input");

  // Used keyup instead of down because my function
  // would only run when a key was pressed not when it was
  // released, causing me to press an extra key to see my
  // results, keyup fixes this. As soon as a key is
  // released, the function fires.

  inputBar.addEventListener("keyup", handleInput);

  function handleInput(event){
    let val = inputBar.value;
    console.log(val);
    for(let i = 0; i < div.children.length; i++){
      let card = div.children[i];
      if(val.length === 0){
        card.style = "display: initial";
      } else if(card.firstElementChild.innerText.includes(val)){
        console.log(card.firstElementChild.innerText);
        card.style = "display: initial";
      } else{
        card.style = "display: none";
      }
    }
  }
})
