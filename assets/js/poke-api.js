const pokeApi = {};

function converPokeApiToPokemon (pokemonDetails){
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name
    pokemon.img = pokemonDetails.sprites.other.dream_world.front_default

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const ablites = pokemonDetails.abilities.map((ablitesAbility) => ablitesAbility.ability.name)
    const [type] = types
    const star = []
    
    pokemon.types = types
    pokemon.type = type
    
    pokemonDetails.stats.map((element, index) => {
      star[`${element.stat.name}`] = [
        element.base_stat,
        element.stat.name
      ]
    })
    pokemon.details = {
      about: {
        abilites: ablites,
        height:pokemonDetails.height,
        weight:pokemonDetails.weight,
        species: pokemonDetails.stats.start,
      },
      stars :{
        stars: star
      }
    }

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  //Pega o pokemon da lista e faz a requisição dos detalhes, retornando em json
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(converPokeApiToPokemon)
}
pokeApi.getPokemons = (offset = 0, limit = 3)=>{
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(url)
  //Faz a primeira chamada na pokeApi e pega a lista de pokemons
  .then((response) => response.json())
  .then((data) => data.results)
  //Passa o resultado da chamada para a função que retorna o json de detalhes do pokemon
  .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
  //Espera todas as promisses retornarem para prosseguir
  .then((detailRequests) => Promise.all(detailRequests))
  //retorna a lista de detalhes dos pokemons
  .then((pokemonsDetails) => pokemonsDetails)
  .catch((error) => console.error(error))
  .finally(()=> console.log("Requisição finalizada!"));
}