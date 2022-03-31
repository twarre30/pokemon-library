const app = document.querySelector('#app')
const spinner = document.querySelector(".spinner")


function addPokemonImage(pokemon) {
    const div = document.createElement('div')
    div.innerHTML = `
        <a href="pokemon.html?pokemon=${pokemon.name}">
            <img src="${pokemon.sprites.front_default}" alt="$pokemon.name" />
        </a>    
    `
    app.append(div)
}



const url = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=800'
fetch(url)
    .then(response => {
        return response.json()
    }).then(response => {
        const urls = response.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches) 
    }).then(responses => {
        spinner.classList.add("hidden")
        responses.forEach(response => {
            addPokemonImage(response)
        })
        
    })




/*

const url = 'https://pokeapi.co/api/v2/pokemon/?limit=50&offset750'
    fetch(url)
    .then(response => response.json())
    .then(response => {
        const pokemonList = response.results;
        const httpRequests = pokemonList
            .map(pokemon => pokemon.url)
            .map(url => {
                return fetch(url).then(response => response.json())
    })
    
    return Promise.all(httpRequests) 
    }).then(res => {
        res.map(res => {
            const li = document.createElement('li')
            const img = document.createElement('img')
            img.src = response.sprites.font_default
            li.append(img)
            return li
        }).forEach(li => {
            ul.append(li)
        })
    })
    
    
    
    */
    