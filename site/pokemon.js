const $pokemon = document.querySelector('#pokemon')
const $spinner = document.querySelector(".spinner")
const main = document.querySelector('main')
const ul = document.querySelector('ul')


function addPokemonImage(pokemon) {
    const div = document.createElement('div')
    div.innerHTML = `
        <figure>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <figcaption>${pokemon.name}</figcaption>
        </figure>
    `
    $pokemon.append(div)
}

function addPokemonAbilities(pokemon) {
    const li = document.createElement('li')
    const flavor_text = (pokemon.flavor_text_entries)
        .find(flavor_text_entry => flavor_text_entry.language.name === 'en')
    li.innerHTML = `
        <span class = "ability-name">${pokemon.name}</span>
        <br>
        <span class="ability-short-description">${flavor_text.flavor_text}</span>
        `
    ul.append(li)
    console.log(pokemon)
    }



const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(response => {
        addPokemonImage(response)
        const abilitiesRequests = response.abilities
            .map(response => response.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        return Promise.all(abilitiesRequests)
    }).then(responses =>{
        $spinner.classList.add("hidden")
        responses.forEach(response => {
            addPokemonAbilities(response)
    })
})



    