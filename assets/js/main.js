const  buttonSeeMore = document.getElementById('button-seeMore')
let element = document.getElementById('pokemons')
let offset = 0;
const limit = 10;
const maxLimit = 151;

function loadMoreItens (offset, limit){
  pokeApi.getPokemons(offset, limit).then((pokemonsList = []) => {
    /* A função map passa o pokemon para a função que ensere o pokemon na li e o resultado o join concatena sem espaços, esse resultaso é enserido no HTML*/
    element.innerHTML += pokemonsList.map(insertPokemonLi).join('')
    })
}

//ensere pokemon no formato do html
function insertPokemonLi (pokemon){
  //Escreve os dados do pokemon na lista 
  
  return `
  <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name pokeId-${pokemon.number}"> ${pokemon.name} </span>
    <div class="detail">
      <ol class="types">
        ${pokemon.types.map((types) => `<li class="type ${types}">${types}</li>`).join('')}
      </ol>
      <img class="img-pokemon" src="${pokemon.img}" alt="imagem do ${pokemon.name}">
    </div>
  </li>`;
}

//permite ver mais pokemons na lista
buttonSeeMore.addEventListener("click", ()=>{
  offset += limit;
  let qtdNewPage = limit + offset
  if( qtdNewPage >= maxLimit){
    const newLimit = maxLimit - offset;
    loadMoreItens(offset, newLimit )
    buttonSeeMore.parentElement.removeChild(buttonSeeMore)
  }else{
    loadMoreItens(offset, limit)
  }
})

loadMoreItens (offset, limit)
