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
            // console.log(resultado.forms[0].name);
            return resultado;
        } catch (error) {
            console.log("Error en la obtencion del pokemon", error);

        }

    }

    function ucfirst(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

    async function obtenerAtributos(id){
        const jsonResultados = await obtenerPokemon(id);
        const estadisticas = jsonResultados.stats;
        const hp = estadisticas[0].base_stat;
        const attack = estadisticas[1].base_stat;
        const defense = estadisticas[2].base_stat;
        const special_attack = estadisticas[3].base_stat;
        const special_defense = estadisticas[4].base_stat;
        const speed = estadisticas[5].base_stat;


        const options = {
            colors: ["#1A56DB", "#FDBA8C"],
            series: [
              {
                name: "Organic",
                color: "#1A56DB",
                data: [
                  { x: "HP", y: hp },
                  { x: "Ataque", y: attack },
                  { x: "Defensa", y: defense },
                  { x: "Ataque especial", y: special_attack },
                  { x: "Defensa especial", y: special_defense },
                  { x: "Velocidad", y: speed },
                ],
              }
            ],
            chart: {
              type: "bar",
              height: "320px",
              fontFamily: "Inter, sans-serif",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "70%",
                borderRadiusApplication: "end",
                borderRadius: 8,
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
              style: {
                fontFamily: "Inter, sans-serif",
              },
            },
            states: {
              hover: {
                filter: {
                  type: "darken",
                  value: 1,
                },
              },
            },
            stroke: {
              show: true,
              width: 0,
              colors: ["transparent"],
            },
            grid: {
              show: false,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -14
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              floating: false,
              labels: {
                show: true,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            fill: {
              opacity: 1,
            },
          }
          
          if(document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(document.getElementById("column-chart"), options);
            chart.render();
          }
          

    }

    async function crearDetalles(id) {
        let jsonDetalles = await obtenerPokemon(id);
        const nombrePokemon = document.querySelector("#nombrePokemon");
        const parrafoPokemon = document.querySelector("#parrafoPokemon");
        const imagenPokemon = document.querySelector("#imagenPokemon");
        
        nombrePokemon.textContent = `${ucfirst(jsonDetalles.forms[0].name)}`;
        parrafoPokemon.textContent = `detalles del pokemon`;
        imagenPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }

    obtenerAtributos(idPokemon);
    crearDetalles(idPokemon);

    
})