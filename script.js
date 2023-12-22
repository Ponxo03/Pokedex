const main$$ = document.querySelector("main");
const ol$$ = document.querySelector("#pokedex");
const savePokemon = [];
const spinner = document.querySelector("#spinner");

const pokeInfo = async () => {
  for (let i = 1; i <= 151; i++) {
    const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemojason = await resultado.json();
    spinner.style.display = "none";
    console.log(pokemojason);
    savePokemon.push(pokemojason);
  }
  return savePokemon;
};

const mapearPokemon = (pokemonSinMapear) => {
  const personajesMapeados = pokemonSinMapear.map((personajes) => ({
    name: personajes.name,
    image: personajes.sprites["front_default"],
    type: personajes.types.map((type) => type.type.name).join(", "),
    id: personajes.id,
  }));

  return personajesMapeados;
};

const pintarPokemos = (pokemons) => {
  ol$$.innerHTML = " ";
  spinner.style.display = "block";
  for (const pintoPokemon of pokemons) {
    let pokeDiv$$ = document.createElement("div");
    pokeDiv$$.className = "card";
    ol$$.appendChild(pokeDiv$$);

    let img$$ = document.createElement("img");
    img$$.setAttribute("src", pintoPokemon.image);
    img$$.setAttribute("alt", pintoPokemon.name);
    img$$.className = "card-image";
    pokeDiv$$.appendChild(img$$);

    let name$$ = document.createElement("h2");
    name$$.textContent = pintoPokemon.name;
    name$$.className = "card-title";
    pokeDiv$$.appendChild(name$$);

    let type$$ = document.createElement("h4");
    type$$.className = "card-subtitle";
    type$$.textContent = pintoPokemon.type;
    pokeDiv$$.appendChild(type$$);
  }
};

const cogerInput = (pokemosMapeados) => {
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", () =>
    filtrarPoke(pokemosMapeados, input$$.value)
  );
};

const filtrarPoke = (arrayParaFiltrar, filtro) => {
  let personajesFiltrados = arrayParaFiltrar.filter((pokemonUnico) =>
    pokemonUnico.name.toLowerCase().includes(filtro.toLowerCase())
  );
  console.log(personajesFiltrados);
  pintarPokemos(personajesFiltrados);
};

const init = async () => {
  const pokemons = await pokeInfo();
  const pokemosMapeados = mapearPokemon(pokemons);
  //console.log("funciona",pokemosMapeados)
  pintarPokemos(pokemosMapeados);
  cogerInput(pokemosMapeados);
};
init();
