document.addEventListener("DOMContentLoaded", function () {

    async function todoPokemon() {
        let consulta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1304");
        const resultado = await consulta.json();
        return resultado.results;
    }

    async function buscarPokemon() {

        const input = document.getElementById("nombre");
        const datalist = document.getElementById('pokemones');
        const formulario = document.getElementById("formularioBusqueda");
        const jsonPokemon = await todoPokemon();

        input.addEventListener("input", (event) => {
            let nombreBuscado = event.target.value.toLowerCase();
            const resultado = jsonPokemon.filter(item => item.name.toLowerCase().includes(nombreBuscado));
            // console.log(resultado);
            datalist.innerHTML = "";

            resultado.forEach(pokemon => {
                const option = document.createElement("option");
                option.value = pokemon.name;
                datalist.appendChild(option);
            });
        });

        formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            const nombrePokemon = input.value.trim().toLowerCase();

            if(nombrePokemon){
                const pokemonEncontrado = jsonPokemon.find(pokemon => pokemon.name === nombrePokemon);

                if(pokemonEncontrado){
                    const urlPokemon = pokemonEncontrado.url;
                    const idPokemon = urlPokemon.split("/").slice(-2, -1)[0];

                    window.location.href =`./views/detallePokemon.html?id=${idPokemon}`;
                }else{
                    alert("Pokémon no encontrado. Intenta con otro nombre.");
                }
            }else{
                alert("Por favor, ingresa el nombre de un Pokémon.");
            }
        });


    }


    buscarPokemon();

    let paginaActual = 1;
    const pokemonesPorPagina = 20;
    const contenedor = document.getElementById("contenedor");
    const tarjetaOriginal = document.getElementById("tarjetaPokemon");
    const paginaNav = document.getElementById("paginaNav");

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
            const baseUrl =`${window.location.origin}${window.location.pathname.split('/').slice(0, -1).join('/')}`;

            pokemones.forEach((pokemon, index) => {
                const nuevaTarjeta = tarjetaOriginal.cloneNode(true);
                nuevaTarjeta.id = `tarjetaPokemon-${(pagina - 1) * pokemonesPorPagina + index + 1}`;
                const titulo = nuevaTarjeta.querySelector("#nombreP");
                const texto = nuevaTarjeta.querySelector("#textoP");
                const imagen = nuevaTarjeta.querySelector("#imagenP");
                const linkPokemon = nuevaTarjeta.querySelector("#linkP");
                const linkPokemon2 = nuevaTarjeta.querySelector("#linkP2");
                const linkPokemon3 = nuevaTarjeta.querySelector("#linkP3");

                titulo.textContent = ucfirst(pokemon.name);
                texto.textContent = `Este es el Pokémon: ${ucfirst(pokemon.name)}.`;
                imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(pagina - 1) * pokemonesPorPagina + index + 1}.png`;
                linkPokemon.href = `${baseUrl}/views/detallePokemon.html?id=${(pagina - 1) * pokemonesPorPagina + index + 1}`;
                linkPokemon2.href = `${baseUrl}/views/detallePokemon.html?id=${(pagina - 1) * pokemonesPorPagina + index + 1}`;
                linkPokemon3.href = `${baseUrl}/views/detallePokemon.html?id=${(pagina - 1) * pokemonesPorPagina + index + 1}`;
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


    function ucfirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

});
