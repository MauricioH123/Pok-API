document.addEventListener("DOMContentLoaded", function () {

    function buscarPokemon() {
        document.getElementById("buscar").addEventListener("click", async () => {
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

    let paginaActual = 1;
    const pokemonesPorPagina = 20;
    const contenedor = document.getElementById("contenedor");
    const tarjetaOriginal = document.getElementById("tarjetaPokemon");
    const paginaNav = document.getElementById("paginaNav");

    // async function todosPokemones(){
    //     try {
    //         // Fetch principal para obtener la lista de pokédex
    //         const datos = await fetch(`https://pokeapi.co/api/v2/pokedex`);
    //         const respuestas = await datos.json();

    //         // Obtener la URL de la primera Pokédex
    //         const url = respuestas.results[0].url;
    //         const pokemones = await fetch(url);
    //         const respuestaN = await pokemones.json();

    //         // Crear el array de nombres de Pokémon
    //         const nombreP = respuestaN.pokemon_entries.map(entry => entry.pokemon_species.name);

    //         return nombreP; // Devolver el array de nombres
    //     } catch (error) {
    //         console.error("Error al obtener los datos:", error);
    //         return []; // En caso de error, devolver un array vacío
    //     }

    // }

    const totalPokemones = 1118;  // Total de Pokémon en la Pokédex
    const totalPaginas = Math.ceil(totalPokemones / pokemonesPorPagina); // Calcular el número total de páginas


    // Función para obtener los Pokémon de una página
    async function obtenerPokemones(pagina) {
        const offset = (pagina - 1) * pokemonesPorPagina;
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonesPorPagina}&offset=${offset}`;
        
        try {
            const respuesta = await fetch(url);
            const data = await respuesta.json();
            return data.results;
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            return [];
        }
    }

    // Función para crear tarjetas de Pokémon
    async function crearTarjetas(pagina) {
        try {
            contenedor.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevas tarjetas
            const pokemones = await obtenerPokemones(pagina);

            pokemones.forEach((pokemon, index) => {
                const nuevaTarjeta = tarjetaOriginal.cloneNode(true);
                nuevaTarjeta.id = `tarjetaPokemon-${(pagina - 1) * pokemonesPorPagina + index + 1}`;
                const titulo = nuevaTarjeta.querySelector("#nombreP");
                const texto = nuevaTarjeta.querySelector("#textoP");
                const imagen = nuevaTarjeta.querySelector("#imagenP");
                const linkPokemon = nuevaTarjeta.querySelector("#linkP");

                titulo.textContent = pokemon.name;
                texto.textContent = `Este es el Pokémon: ${pokemon.name}.`;
                imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(pagina - 1) * pokemonesPorPagina + index + 1}.png`;
                linkPokemon.href = `/Pok-API/views/detallePokemon.html?id=${(pagina - 1) * pokemonesPorPagina + index + 1}`;
                contenedor.appendChild(nuevaTarjeta);
            });

            // Actualizar la paginación
            actualizarPaginacion(pagina);

        } catch (error) {
            console.error("Error al crear tarjetas:", error);
        }
    }

    // Función para actualizar la paginación
    function actualizarPaginacion(pagina) {
        paginaNav.innerHTML = '';  // Limpiar la paginación existente

        const minPage = Math.max(1, pagina - 3);  // Asegurarse de no tener páginas negativas
        const maxPage = Math.min(totalPaginas, pagina + 3);  // Asegurarse de no exceder el total de páginas

        // Botón anterior
        const prevButton = document.createElement('li');
        prevButton.innerHTML = `<a href="#" class="px-4 py-2 text-gray-500 hover:bg-gray-100">Anterior</a>`;
        prevButton.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            if (pagina > 1) {
                paginaActual--;
                crearTarjetas(paginaActual);
            }
        });
        paginaNav.appendChild(prevButton);

        // Botones de páginas
        for (let i = minPage; i <= maxPage; i++) {
            const boton = document.createElement('li');
            boton.classList.add('flex', 'items-center');
            boton.innerHTML = `<a href="#" class="px-4 py-2 text-gray-500 hover:bg-gray-100">${i}</a>`;
            
            if (i === pagina) {
                boton.classList.add('bg-blue-500', 'text-white');
            }

            boton.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                paginaActual = i;
                crearTarjetas(paginaActual);
            });

            paginaNav.appendChild(boton);
        }

        // Botón siguiente
        const nextButton = document.createElement('li');
        nextButton.innerHTML = `<a href="#" class="px-4 py-2 text-gray-500 hover:bg-gray-100">Siguiente</a>`;
        nextButton.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            if (pagina < totalPaginas) {
                paginaActual++;
                crearTarjetas(paginaActual);
            }
        });
        paginaNav.appendChild(nextButton);
    }

    // Inicializar las tarjetas y la paginación en la primera página
    crearTarjetas(paginaActual);

    // async function crearTarjetas(){
    //     try{
    //         const nombres = await todosPokemones();

    //         nombres.forEach((nombre, index )=> {

    //             const nuevaTarjeta = trajetaOriginal.cloneNode(true);

    //             nuevaTarjeta.id = `tarjetaPokemon-${index + 1}`;
    //             const titulo = nuevaTarjeta.querySelector("#nombreP");
    //             const texto = nuevaTarjeta.querySelector("#textoP");
    //             const imagen = nuevaTarjeta.querySelector("#imagenP");

    //             titulo.textContent = `${nombre}`;
    //             texto.textContent  = `Este es el Pokémon: ${nombre}.`;
    //             imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`; // Ejemplo de imagen desde PokeAPI

    //             contenedor.appendChild(nuevaTarjeta);
    //         });

    //     }catch(error){
    //         console.error("Error al crear tarjetas:", error);
    //     }

    // }

    // crearTarjetas()

});
