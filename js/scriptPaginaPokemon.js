document.addEventListener("DOMContentLoaded", function () {

    const currentUrl = window.location.href;
    console.log(currentUrl); // Muestra la URL completa en la consola
    const urlP = new URL(currentUrl);
    const searchPokemon = urlP.search;
    const idPokemon = searchPokemon[4];

    async function obtenerPokemon(id){
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let resultado = await pokemon.json();
        console.log(resultado.forms[0].name)
    }

    obtenerPokemon(idPokemon);
})