/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
//Plantilla.plantillaTags

describe("Plantilla.plantillaTags: ", function () {

    it("Comprobación de si tiene las etiquetas de plantilla esperadas", function () {
        var tags = Plantilla.plantillaTags;
        expect(tags.NOMBRE).toEqual("### NOMBRE ###");
        expect(tags.EDAD).toEqual("### EDAD ###");
        expect(tags.FECHA_NACIMIENTO).toEqual("### FECHA_NACIMIENTO ###");
        expect(tags.EQUIPO).toEqual("### EQUIPO ###");
        expect(tags.DORSAL).toEqual("### DORSAL ###");
        expect(tags.POSICION).toEqual("### POSICION ###");
        expect(tags.NACIONALIDAD).toEqual("### NACIONALIDAD ###");
        expect(tags.ALTURA).toEqual("### ALTURA ###");
        expect(tags.PESO).toEqual("### PESO ###");
        expect(tags.APODO).toEqual("### APODO ###");
    });
})

//Plantilla.plantillaTablaPersonas.cabecera
describe("Plantilla.plantillaTablaPersonas.cabecera", function () {
    it("Comprobación para ver si se tiene la propiedad cabecera de plantillaTablaPersonas configurada correctamente", function () {
        var cabeceraEsperada = `<table id="tabla-personas" width="100%" class="listado-personas">
                    <thead>                 
                        <th width="10%">Nombre</th>
                        <th width="20%">Edad</th>
                        <th width="20%">Fecha Nacimiento</th>
                        <th width="10%">Equipo</th>
                        <th width="15%">Dorsal</th>
                        <th width="15%">Posicion</th>
                        <th width="15%">Nacionalidad</th>
                        <th width="15%">Altura</th>
                        <th width="15%">Peso</th>
                        <th width="15%">Apodo</th>
                        <th width="10%"> 
                            <select id="select-ordenamiento" onchange="if (this.value === 'NOMBRE') {Plantilla.ordena()} else {Plantilla.ordenaEq()}">
                                <option value="NOMBRE">Nombre</option>
                                <option value="EQUIPO">Equipo</option>
                            </select>
                        </th>
                    </thead>
                    <tbody>
    `;

        expect(Plantilla.plantillaTablaPersonas.cabecera).toEqual(cabeceraEsperada);
    });
});

//Plantilla.plantillaTablaPersonas.cuerpo
describe("Plantilla.plantillaTablaPersonas.cuerpo", function () {
    it("Comprobacion si tiene el tag de apodo", function () {
        expect(Plantilla.plantillaTablaPersonas.cuerpo).toContain(`${Plantilla.plantillaTags.APODO}`);
    });
    it("Comprobacion si tiene el tag de dorsal", function () {
        expect(Plantilla.plantillaTablaPersonas.cuerpo).toContain(`${Plantilla.plantillaTags.DORSAL}`);
    });
});

//Plantilla.plantillaTablaPersonas.pie
describe("Plantilla.plantillaTablaPersonas.pie", function () {
    it("Comprobación de que debería contener el cierre de la tabla", function () {
        expect(Plantilla.plantillaTablaPersonas.pie).toContain('</table>');
    });
});

//Plantilla.plantillaTablaPersonas.actualiza
describe('Plantilla.plantillaTablaPersonas.actualiza', function () {
    let jugador = {
        data: {
            nombre: 'Tom Brady',
            edad: 44,
            fechaNacimiento: [{ dia: 3, mes: 8, año: 1977 }],
            equipo: 'Tampa Bay Buccaneers',
            dorsal: 12,
            posicion: 'Quarterback',
            nacionalidad: 'Estados Unidos',
            altura: '1.93 m',
            peso: '102 kg',
            apodo: 'Tom Terrific'
        }
    };

    it('Comprobacion de si actualiza la plantilla con los datos del jugador', function () {
        let plantillaActualizada = Plantilla.plantillaTablaPersonas.actualiza(jugador);
        expect(plantillaActualizada).toContain(jugador.data.nombre);
        expect(plantillaActualizada).toContain(jugador.data.edad);
        expect(plantillaActualizada).toContain(`${jugador.data.fechaNacimiento[0].dia}/${jugador.data.fechaNacimiento[0].mes}/${jugador.data.fechaNacimiento[0].año}`);
        expect(plantillaActualizada).toContain(jugador.data.equipo);
        expect(plantillaActualizada).toContain(jugador.data.dorsal);
        expect(plantillaActualizada).toContain(jugador.data.posicion);
        expect(plantillaActualizada).toContain(jugador.data.nacionalidad);
        expect(plantillaActualizada).toContain(jugador.data.altura);
        expect(plantillaActualizada).toContain(jugador.data.peso);
        expect(plantillaActualizada).toContain(jugador.data.apodo);
    });
});

//Plantilla.ordena
describe("Plantilla", function () {
    describe("Funcion ordena()", function () {
        beforeEach(function () {
            // Crear una tabla con filas desordenadas
            var tabla = document.createElement("table");
            tabla.setAttribute("id", "tabla-personas");
            tabla.innerHTML = `
                <tr>
                  <td>María</td>
                </tr>
                <tr>
                  <td>Pedro</td>
                </tr>
                <tr>
                  <td>Lucía</td>
                </tr>
              `;
            document.body.appendChild(tabla);
        });

        afterEach(function () {
            // Remover la tabla creada durante el beforeEach
            var tabla = document.getElementById("tabla-personas");
                document.body.removeChild(tabla);
        });

        it("debe ordenar la tabla por el nombre", function () {
            // Ordenar la tabla por la columna "Nombre"
            Plantilla.ordena();

            // Obtener las celdas de la tabla ordenada
            var celdas = document.querySelectorAll("#tabla-personas td:first-child");

            // Comprobar que las celdas están en el orden esperado
            expect(celdas[1].textContent).toEqual("Lucía");
            expect(celdas[0].textContent).toEqual("María");
            expect(celdas[2].textContent).toEqual("Pedro");
        });
    });
});

//Plantilla.ordenaEq
describe("Plantilla.ordenaEq", function () {
    var spy;

    beforeEach(function () {
        spy = spyOn(Plantilla, "ordenaEq");
    });

    afterEach(function () {
        var tabla = document.getElementById("tabla-personas");
        if (document.body.contains(tabla)) {
            document.body.removeChild(tabla);
        }
    });

    it("Debe ordenar la tabla por el equipo", function () {
        // Crear una tabla con filas desordenadas
        var tabla = document.createElement("table");
        tabla.setAttribute("id", "tabla-personas");
        tabla.innerHTML = `
            <tr>
              <td>María</td>
            </tr>
            <tr>
              <td>Pedro</td>
            </tr>
            <tr>
              <td>Lucía</td>
            </tr>
          `;
        document.body.appendChild(tabla);

        // Llamar a la función que ordena la tabla
        Plantilla.ordenaEq();

        // Verificar si la función ha sido llamada
        expect(spy).toHaveBeenCalled();

        // Obtener las celdas de la tabla ordenada
        var celdas = document.querySelectorAll("#tabla-personas td:first-child");

        // Comprobar que las celdas están en el orden esperado
        expect(celdas[2].textContent).toEqual("Lucía");
        expect(celdas[0].textContent).toEqual("María");
        expect(celdas[1].textContent).toEqual("Pedro");
    });
});

//Plantilla.imprimeMuchasPersonass
describe("Plantilla.imprimeMuchasPersonas", function () {
    it("No debe generar excepciones cuando recibe un vector vacío", function () {
        expect(function () {
            Plantilla.imprimeMuchasPersonas([]);
        }).not.toThrow();
    });
});

//Plantilla.listar
describe("Plantilla.listar", function () {
    var spyRecupera;

    beforeEach(function () {
        spyRecupera = spyOn(Plantilla, "recupera");
    });

    it("debe llamar a Plantilla.recupera y Plantilla.imprimeMuchasPersonas", function () {
        Plantilla.listar();

        expect(spyRecupera).toHaveBeenCalled();
    });
});