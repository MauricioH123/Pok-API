document.addEventListener("DOMContentLoaded", function () {

    function buscarPokemon(){
          document.getElementById("enviar").addEventListener("click", async () => {
        const pokemonName = document.getElementById("nombre").value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

        try {
            console.log(`Fetching URL: ${url}`);
            let response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Pokemon no encontrado: ${response.status}`);
            }

            let data = await response.json();
            console.log(data.name.toUpperCase());
            alert(`Nombre del Pokémon: ${data.name.toUpperCase()}`);

            let abilitiesList = data.abilities.map(ability => ability.ability.name);
            alert(`Habilidades del Pokémon: ${abilitiesList.join(', ')}`);

        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    });

    }

    buscarPokemon();
  
    const contenedor = document.getElementById("tarjetas");
    const trajetaOriginal = document.getElementById("tarjetaPokenmon");

    async function todosPokemones(){

        const datos = await fetch(`https://pokeapi.co/api/v2/pokedex`);
        const respuestas = await datos.json();
        console.log(respuestas.results.length + 1);
        const url = new URL(respuestas.results[0].url);
        const pokemones = await fetch(url);
        const respuestaN = await pokemones.json()
        const nombreP = [];
        for(let i = 0; i <= respuestas.results.length; i++){
            // console.log(respuestaN.pokemon_entries[i].pokemon_species.name);
            nombreP[i] = respuestaN.pokemon_entries[i].pokemon_species.name 
        }
        
        console.log(nombreP);
        return nombreP;

    }

    todosPokemones();

    function crearTarjetas(cantidad){
        for(let i = 1; i <= cantidad; i++){
            const nuevaTarjeta = trajetaOriginal.cloneNode("true");
            nuevaTarjeta.id = `tarjetaPokenmon-${i}`;
            const titulo =  nuevaTarjeta.querySelector(".card-title");
            const texto = nuevaTarjeta.querySelector(".card-text");
            const imagen = nuevaTarjeta.querySelector(".card-img-top");

            titulo.textContent = `Tarjeta ${i}`;
            texto.textContent = `Este es el contenido personalizado de la tarjeta número ${i}.`;
            imagen.src = ``; 

            contenedor.appendChild(nuevaTarjeta);
        }
    }

    crearTarjetas(10);
    
});
