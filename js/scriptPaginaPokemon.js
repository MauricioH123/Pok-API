document.addEventListener("DOMContentLoaded", function () {

    const currentUrl = window.location.href;
    console.log(currentUrl); // Muestra la URL completa en la consola
    const urlP = new URL(currentUrl);
    const searchPokemon = urlP.search;
    const idPokemon = searchPokemon.split("=")[1];

    async function obtenerPokemon(id) {
        try {
            let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            let resultado = await pokemon.json();
            console.log(resultado.forms[0].name);
            return resultado;
        } catch (error) {
            console.log("Error en la obtencion del pokemon", error);

        }

    }

    async function crearDetalles(id) {
        let jsonDetalles = await obtenerPokemon(id);
        const nombrePokemon = document.querySelector("#nombrePokemon");
        const parrafoPokemon = document.querySelector("#parrafoPokemon");
        const imagenPokemon = document.querySelector("#imagenPokemon");
        
        nombrePokemon.textContent = `${jsonDetalles.forms[0].name}`;
        parrafoPokemon.textContent = `detalles del pokemon`;
        imagenPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }

    crearDetalles(idPokemon);
})