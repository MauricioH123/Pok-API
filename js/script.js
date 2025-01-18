document.addEventListener("DOMContentLoaded", function () {
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

    const contenedor = document.getElementById("tarjetas");
    const trajetaOriginal = document.getElementById("tarjetaPokenmon");

    function crearTarjetas(cantidad){
        for(let i = 1; i <= cantidad; i++){
            const nuevaTarjeta = trajetaOriginal.cloneNode("true");
            nuevaTarjeta.id = `tarjetaPokenmon-${i}`;
            const titulo =  nuevaTarjeta.querySelector(".card-title");
            const texto = nuevaTarjeta.querySelector(".card-text");
            const imagen = nuevaTarjeta.querySelector(".card-img-top");

            titulo.textContent = `Tarjeta ${i}`;
            texto.textContent = `Este es el contenido personalizado de la tarjeta número ${i}.`;
            imagen.src = `https://via.placeholder.com/150?text=Tarjeta+${i}`; 

            contenedor.appendChild(nuevaTarjeta);
        }
    }

    crearTarjetas(10);
    
});
