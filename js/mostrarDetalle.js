
const listaTareas = document.querySelector("#lista-tareas");
let tareas;

const loadTask = async () => {
  //localStorage.clear();
  listaTareas.innerHTML = "";

  tareas = localStorage.getItem("tareas");

  if (tareas == null) {
    const response = await fetch("json/tareas.json");
    tareas = await response.json();

    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  if (typeof tareas == "string") {
    tareas = JSON.parse(tareas);
  }

  //console.log(tareas);

  let idSet = sessionStorage.getItem('id');
  //console.log("este es el tarea seleccionado: "+idSet);
/*
for (let elemento of tareas) {
  if (idSet == elemento.id){
      let contenido = '';
      contenido += 'ID: ' + elemento.id + '<br>';
      contenido += 'Texto: ' + elemento.texto + '<br>';
      contenido += 'Foto: ' + elemento.foto + '<br>';
      contenido += 'Descripción: ' + elemento.descripcion + '<br>';
      contenido += 'Estrellas: ' + elemento.estrellas + '<br>';
     
      document.getElementById('tuElementoHTML').innerHTML = contenido;
  }
}
 */


//tareas.forEach(createTask);

tareas.forEach(tarea => {
  if (tarea.id == idSet) {
    createTask(tarea); // crea una tarea en la página web
  }
});

};


const createTask = (tarea) => {
  const foto = tarea.foto ?? "noDisponible.jpg";

  //-----------------------------------
  
  const p = document.createElement("p");

  const estrellas = ["🤍", "🤍", "🤍", "🤍", "🤍"];

  for (let i = 0; i < tarea.estrellas.length; i++) {
    estrellas[i] = "🧡";
  }

  p.textContent = estrellas.join("");

   console.log(p);
   
//----------------------

  const tareaHTML = `
    <article>
        <h2 data-id="${tarea.id}">${tarea.texto}</h2>
        <p><strong>Codigo del producto: </strong>${tarea.id}</p>
        <p>${tarea.descripcion}</p>
        <img src="img/${foto}" width="300" alt="...">
        <p><strong>Precio: </strong>${tarea.precio}</p>
        <p> ${ p.textContent}</p>
    </article>
  `;
  listaTareas.innerHTML += tareaHTML;
};
loadTask();
  
