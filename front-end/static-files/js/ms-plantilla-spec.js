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
                        <th width="10%">ID</th>
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

//Plantilla.plantillaTablaPersonas.actualiza y el sustituyeTag
describe("Plantilla.plantillaTablaPersonas.sustituyeTags", function () {
    const persona = {
        ref: { '@ref': { id: '359810708356989100' } },
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
    const plantilla = `
    <tr>
      <td>### ID ###</td>
      <td>### NOMBRE ###</td>
      <td>### EDAD ###</td>
      <td>### FECHA_NACIMIENTO ###</td>
      <td>### EQUIPO ###</td>
      <td>### DORSAL ###</td>
      <td>### POSICION ###</td>
      <td>### NACIONALIDAD ###</td>
      <td>### ALTURA ###</td>
      <td>### PESO ###</td>
      <td>### APODO ###</td>
      <td>
        <div><a href="javascript:Plantilla.mostrar('### ID ###')" class="opcion-secundaria mostrar">Info</a></div>
      </td>
    </tr>
    `;
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& significa el texto coincidente
    }
    it("La plantilla sustituye correctamente los tags", function () {
        const resultado = Plantilla.sustituyeTags(plantilla, persona);
        const expected = `
    <tr>
      <td>359810708356989100</td>
      <td>Tom Brady</td>
      <td>44</td>
      <td>3/8/1977</td>
      <td>Tampa Bay Buccaneers</td>
      <td>12</td>
      <td>Quarterback</td>
      <td>Estados Unidos</td>
      <td>1.93 m</td>
      <td>102 kg</td>
      <td>Tom Terrific</td>
      <td>
        <div><a href="javascript:Plantilla.mostrar('359810708356989100')" class="opcion-secundaria mostrar">Info</a></div>
      </td>
    </tr>
  `;
        const escapedExpected = escapeRegExp(expected);
        expect(resultado).toMatch(new RegExp(escapedExpected));
    });
});

//Plantilla.ordena
describe("Prueba de ordenamiento de tabla", function () {
    var table;

    beforeEach(function () {
        // Crea una tabla de ejemplo
        table = document.createElement("table");
        table.setAttribute("id", "tabla-personas");

        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode("ID"));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var th3 = document.createElement("th");
        th3.appendChild(document.createTextNode("Edad"));
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        var tr1 = document.createElement("tr");
        var td11 = document.createElement("td");
        td11.appendChild(document.createTextNode("1"));
        var td12 = document.createElement("td");
        td12.appendChild(document.createTextNode("María"));
        var td13 = document.createElement("td");
        td13.appendChild(document.createTextNode("30"));
        tr1.appendChild(td11);
        tr1.appendChild(td12);
        tr1.appendChild(td13);
        tbody.appendChild(tr1);

        var tr2 = document.createElement("tr");
        var td21 = document.createElement("td");
        td21.appendChild(document.createTextNode("2"));
        var td22 = document.createElement("td");
        td22.appendChild(document.createTextNode("Pedro"));
        var td23 = document.createElement("td");
        td23.appendChild(document.createTextNode("25"));
        tr2.appendChild(td21);
        tr2.appendChild(td22);
        tr2.appendChild(td23);
        tbody.appendChild(tr2);

        var tr3 = document.createElement("tr");
        var td31 = document.createElement("td");
        td31.appendChild(document.createTextNode("3"));
        var td32 = document.createElement("td");
        td32.appendChild(document.createTextNode("Lucía"));
        var td33 = document.createElement("td");
        td33.appendChild(document.createTextNode("35"));
        tr3.appendChild(td31);
        tr3.appendChild(td32);
        tr3.appendChild(td33);
        tbody.appendChild(tr3);

        table.appendChild(tbody);

        // Agrega la tabla al documento
        document.body.appendChild(table);
    });

    afterEach(function () {
        // Remueve la tabla del documento
        document.body.removeChild(table);
    });

    it("Comprobacion para ordenar la tabla ascendentemente por el nombre", function () {
        Plantilla.ordena();

        var rows = table.rows;

        // La primera fila es la fila de encabezados
        expect(rows[1].cells[1].textContent).toEqual("Lucía");
        expect(rows[2].cells[1].textContent).toEqual("María");
        expect(rows[3].cells[1].textContent).toEqual("Pedro");
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

    it("Debe llamar a Plantilla.recupera", function () {
        Plantilla.listar();

        expect(spyRecupera).toHaveBeenCalled();
    });
});