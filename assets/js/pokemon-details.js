const pokemonsList = document.querySelector("#pokemons")
const modal = document.querySelector("dialog")
const dialog = document.querySelector(".dialog")
const body = document.querySelector('body')


 pokemonsList.addEventListener('click', function (event) {
  let li = event.target.parentNode.closest(".pokemon");
  let span = li.querySelector('.number')
  let content = span.innerHTML.split('#')
  let pokemon = {
    url: `https://pokeapi.co/api/v2/pokemon/${content[1]}`
  }
    pokeApi.getPokemonDetail(pokemon).then((pokemon = []) => {
        console.log(pokemon.details.stars.stars);
        modal.innerHTML = `
        <section class="dialog ${pokemon.type}">
        <header class="header">
          <button class="button-diologClose ${pokemon.type}"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
        </header>

        <section class="apresentation">
          <span class="name"> ${pokemon.name} </span>
          <span class="number">#${pokemon.number}</span>
          <div class="details">
            <ol class="types-row">
              ${pokemon.types.map((types) => `<li class="type ${types}">${types}</li>`).join('')}
            </ol>
            <img class="img-pokemon" src="${pokemon.img}" alt="${pokemon.name}">
          </div>
        </section>

        <section class="description">
          <ul class="pokemon-informations">
            <li class="pokemon-information pokemon-about">About</li>
            <li class="pokemon-information pokemon-base-stats">Base stats</li>
          </ul>
          <div class="table">
            <table class="table-1">
              <tr>
                <th>height</th>
                <th>width</th>
                <th>abilites</th>
              </tr>
              <tr>
                <td>${(pokemon.details.about.height/10).toFixed(2)} cm</td>
                <td>${(pokemon.details.about.weight/10).toFixed(1)} kg</td>
                <td>
                ${pokemon.details.about.abilites.map((abilite) => `${abilite}`).join(' ')}
                </td>
              </tr>
            </table>
            <table  class="table-2 hide">
              <tr>
                <th>Attack</th>
                <th>Defense</th>
                <th>HP</th>
                <th>Speed</th>
              </tr>
              <tr>
                <td>${pokemon.details.stars.stars.attack[0]}</td>
                <td>${pokemon.details.stars.stars.defense[0]}</td>
                <td>${pokemon.details.stars.stars.hp[0]}</td>
                <td>${pokemon.details.stars.stars.speed[0]}</td>
              </tr>
            </table>
          </div>
        </section>
        </section>`;

        body.classList.add('modal-open') 
        body.classList.add('viewport-lg')
        modal.showModal()

        const buttonClose = document.querySelector(".button-diologClose");
        const stats = document.querySelector(".pokemon-base-stats");
        const about = document.querySelector(".pokemon-about");
        const tableOne = document.querySelector(".table-1");
        const tableTwo = document.querySelector(".table-2");
        
        about.addEventListener('click', function (event) {
          tableOne.classList.remove('hide')
          tableOne.classList.add('show')

          tableTwo.classList.remove('show')
          tableTwo.classList.add('hide')
        })
        stats.addEventListener('click', function (event) {
          tableTwo.classList.remove('hide')
          tableTwo.classList.add('show')

          tableOne.classList.remove('show')
          tableOne.classList.add('hide')
        })

        buttonClose.addEventListener('click', function (event){
          modal.close()
           body.classList.remove('modal-open') 
              body.classList.remove('viewport-lg')
        })
    }) 
}) 