const listaTareas = document.querySelector("#lista-tareas");
let tareas;

const loadTask = async () => {
  localStorage.clear();
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

  tareas.forEach(createTask);
};

const createTask = (tarea) => {
  const foto = tarea.foto ?? "noDisponible.jpg";

  const tareaHTML = `
    <article>
        <h2 class="fcc-btn" data-id="${tarea.id}">${tarea.nombre}</h2>
        <p>${tarea.texto}</p>
        <img src="img/${foto}" width="50" alt="...">

    </article>
  `;
  listaTareas.innerHTML += tareaHTML;
};

loadTask();

document.addEventListener("click", (event) => {

    if (event.target.tagName == "H2") {
     //console.log(event.target.dataset.id);
      sessionStorage.setItem("id", event.target.dataset.id);
    window.location = "detalle.html";
  }
});