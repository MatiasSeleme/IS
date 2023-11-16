
/*---
Función para procesar los parámetros recibidos en el URL
*/
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

/*---
Extrae del URL el id de cliente ya validado, su nombre y la última fecha de login, actualiza banner de seguridad
*/

var query = getQueryParams(document.location.search);
console.log("id:"+query.id);
console.log("contacto:"+query.contacto);
console.log("nombre:"+query.nombre);
console.log("ultima_fecha:"+query.fecha_ultimo_ingreso);

document.getElementById("lastlogin").innerHTML = "<table><tr><td>Cliente</td><td>"+query.id+"</td></tr><tr><td>Contacto</td><td>"+query.contacto+"</td></tr></tr><tr><td>Nombre</td><td>"+query.nombre+"</td></tr><tr><td>Ultimo ingreso</td><td>"+query.fecha_ultimo_ingreso+"</td></tr></table>";


/*---
Accede a REST API para obtener tickets
Tener en cuenta que typicode es un fake REST API
*/

//const APIREST_URL='http://my-json-server.typicode.com/lu7did/testJASON/ticket/';
// URL para acceder directamente a ésta función
//http://127.0.0.1:5500/listarTicket.html?id=0533a95d-7eef-4c6b-b753-1a41c9d1fbd0&nombre=Pedro%20E.%20Colla&ultimo=01/11/2023
//

const APIREST_URL='https://xe3qolsgh0.execute-api.us-east-1.amazonaws.com/listarTicketGET?clienteID='+query.id;
//clientID 0533a95d-7eef-4c6b-b753-1a41c9d1fbd0

const api_TicketURL=APIREST_URL;
const HTMLResponse=document.querySelector("#app");

fetch(`${api_TicketURL}`)
.then(res => {
    return res.json();
}).then(ticket=>{
    console.log(ticket);
    let f=false;
    let table=document.createElement("table");
    table.style.border="1px solid";
    table.style.backgroundColor="##626607";
    ticket.forEach((t)=> {
        if (t.clienteID == query.id) {
            if (f==false) {

                f=true;
                const hdr=["Cliente","ID","Motivo","Estado","Fecha"];
                let tr=document.createElement("tr");
                tr.style.border="1px solid";
                hdr.forEach((item) => {
                    let th=document.createElement("th");
                    th.style.border="1px solid";

                    th.innerText = item;
                    tr.appendChild(th);
                });
                table.appendChild(tr);                   
            }

            const body=[t.clienteID,`${t.id}`,`${t.solucion}`,`${t.estado_solucion}`,`${t.ultimo_contacto}`];
            let trl=document.createElement("tr");
            body.forEach((line) => {
                let td=document.createElement("td");
                td.style.border="1px solid";
                td.innerText = line;
                trl.appendChild(td);
            });
            table.appendChild(trl);                   

        }
    });

    if (f) {
        HTMLResponse.appendChild(table);
    } else {

        console.log("no tiene tickets");
        document.getElementById('mensajes').style.textAlign = "center";
        document.getElementById('mensajes').style.color="RED";
        document.getElementById("mensajes").innerHTML = "No hay tickets pendientes";
    }
});

const data = {
    "posts": [
        {
            "id": 1,
            "activo": false,
            "registrado": false,
            "contacto": "pedro_colla@hotmail.com",
            "fecha_alta": "29/09/2023",
            "fecha_cambio_password": "29/09/2023",
            "fecha_ultimo_ingreso": "29/09/2023",
            "nombre": "Pedro E. Colla",
            "password": "secret"
        },
        {
            "id": 2,
            "activo": false,
            "registrado": false,
            "contacto": "pedro_colla@gmail.com",
            "fecha_alta": "29/09/2023",
            "fecha_cambio_password": "29/09/2023",
            "fecha_ultimo_ingreso": "29/09/2023",
            "nombre": "Pedro E. Colla",
            "password": "ultrasecret"
        },
        {
            "id": 3,
            "activo": false,
            "registrado": false,
            "contacto": "colla.pedro@uader.edu.ar",
            "fecha_alta": "29/09/2023",
            "fecha_cambio_password": "29/09/2023",
            "fecha_ultimo_ingreso": "29/09/2023",
            "nombre": "Pedro E. Colla",
            "password": "moresecret"
        }
    ],
    "ticket": [
        // ... (tu información de tickets)
    ],
    "profile": { "name": "typicode" }
};

// Función para generar una tabla HTML basada en un conjunto de datos
function generateTable(containerId, dataArray) {
    const container = document.getElementById(containerId);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Crear encabezados de columna
    const headers = ["Cliente ID", "Contacto", "Nombre", "Fecha de Último Ingreso"];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Crear filas de datos
    dataArray.forEach(item => {
        const tr = document.createElement('tr');
        const clientData = [item.id, item.contacto, item.nombre, item.fecha_ultimo_ingreso];
        clientData.forEach(data => {
            const td = document.createElement('td');
            td.textContent = data;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

// Generar la tabla de clientes
generateTable('clientsTable', data.posts);
