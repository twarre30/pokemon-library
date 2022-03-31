const $pokemon = document.querySelector('#pokemon')
const $spinner = document.querySelector(".spinner")


function addPokemonImage(pokemon) {
    console.log(pokemon)
    const div = document.createElement('div')
    div.innerHTML = `
        <a href="pokemon.html?pokemon=${pokemon.name}">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        </a>    
    `
    $pokemon.append(div)
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(response => {
        addPokemonImage(response)
        $spinner.classList.add("hidden")
    })

