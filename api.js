const pokemonContainer = document.getElementById("pokemon-container");
const loadMore = document.getElementById("loadMore");

let seleccion = document.getElementById("seleccion");
let imgSelected = document.getElementById("img-selected");
let nameSelected = document.getElementById("name");
let idSelected = document.getElementById("id");

const aside = document.querySelector(".popUp");
const modal = document.querySelector("#popUp");

let min = 1;
let max = 7;

loadMore.addEventListener("click", () => {
  min += 7 + 1;

  getPokemons(min, max);
});

async function getPokemon(id) {
  const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      createPokemon(data);
    })
    .catch((err) => console.log(err));
}
function getPokemons(min, max) {
  for (let i = min; i <= min + max; i++) {
    getPokemon(i);
  }
}

function createPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("pokemon-image-container");

  const image = document.createElement("img");
  image.src = pokemon.sprites.other.dream_world.front_default;

  imageContainer.appendChild(image);

  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = pokemon.name;

  const id = document.createElement("p");
  id.textContent = `#${pokemon.id.toString().padStart(1, 0)}`;
  id.classList.add("id");

  const btn = document.createElement("button");
  btn.classList.add("btn-detail");
  btn.innerHTML = "Ver Detalle";
  btn.onclick = function loadSelectedPokemons() {
    console.log("clicking");
    modal.showModal();

    const aside = document.createRange().createContextualFragment(
      `
      <aside>
        <div class="seleccion" id="seleccion">
         <div class="cerrar" onclick="cerrarAside()">
            x
        </div>
          <div class="info">
          <h2> ${pokemon.name.toUpperCase()}</h2>
            <img src="${pokemon.sprites.other.home.front_default}" id="img-selected" alt="image" />
            <p> Type = ${pokemon.types[0].type.name} </p>
            <p> Number = ${pokemon.id} </p>
            <p> Weight = ${pokemon.weight} </p>
            <p> Experience = ${pokemon.base_experience} </p>
            <p> Ability = ${pokemon.abilities[0].ability.name} </p>
            <p> HP = ${pokemon.stats[0].base_stat} </p>
            <p> Atack = ${pokemon.stats[1].base_stat} </p>
            <p> Defense = ${pokemon.stats[2].base_stat} </p>
            <p> Special Atack = ${pokemon.stats[3].base_stat} </p>
            <p> Special Defense = ${pokemon.stats[4].base_stat} </p>
            <p> Speed = ${pokemon.stats[5].base_stat} </p>




          </div>
        </div>
      </aside>
  `
    );

    const main = document.querySelector(".pokemon-detail");
    var seleccion = document.querySelector(".info")
    main.append(aside);
    seleccion.remove(aside);
  };
  card.appendChild(imageContainer);
  card.appendChild(name);
  card.appendChild(id);
  card.appendChild(btn);
  pokemonContainer.appendChild(card);
}

getPokemons(min, max);

function cerrarAside() {
  modal.close();
  console.log("cerrarAside");
}
