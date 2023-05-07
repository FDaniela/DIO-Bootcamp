
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    pokemon.weight = pokeDetail.weight/10
    pokemon.height = pokeDetail.height/10

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => { 
    return fetch(pokemon.url) 
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) // Chamada AJAX da lista de Pokemons
        .then((response) => response.json()) //Retorna um response que transforma pra JSON
        .then((jsonBody) => jsonBody.results) //Manipula a lista de Pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //Converte para um nova lista de requisição de detalhe
        .then((detailRequests) => Promise.all(detailRequests)) //Retorna promisse quando as requisições de detalhe terminarem
        .then((pokemonsDetails) => pokemonsDetails)
}
