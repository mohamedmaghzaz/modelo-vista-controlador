
  // MODELO DE DATOS
let mis_peliculas_iniciales = [
      {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
      {titulo: "El Gato Rey", director: "El Camellero Web", "miniatura": "files/gatico.jpg"},
      {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
      {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"}
      
];

  //crear contenedor localStorage: mis_peliculas 
localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);

  // VISTAS
const indexView = (peliculas) => {
      let i=0;
      let view = "";

      while(i < peliculas.length) {
      view += `
      <div class="movie">
      <div class="movie-img">
                  <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
      </div>
      <div class="title">
      ${peliculas[i].titulo || "<em>Sin título</em>"}
      </div>
      <div class="actions">
      <button class="ver" data-my-id="${i}">Ver</button>
                  <!--Insertar aquí botones de "Show" y "Delete"-->
            <button class="show" data-my-id="${i}">editar</button>
            <button class="Delete" data-my-id="${i}">Borrar</button>
            </div>
      </div>\n`;
      i = i + 1;
      };

      /*Insertar aquí botones de "Añadir" y "Reset"*/
      view += `<div class="actions">
      <button class="create" data-my-id="${i}">Añadir</button>
      <button class="reset" data-my-id="${i}">Reset</button>
                  <div>`;
      return view;
};

const editView = (i, pelicula) => {
      return `<h2>Editar Película </h2>
      <div class="field">
      Título <br>
      <input  type="text" id="titulo" placeholder="Título" 
            value="${pelicula.titulo}">
      </div>
      <div class="field">
      Director <br>
      <input  type="text" id="director" placeholder="Director" 
            value="${pelicula.director}">
      </div>
      <div class="field">
      Miniatura <br>
      <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
            value="${pelicula.miniatura}">
      </div>
      <div class="actions">
            <button class="update" data-my-id="${i}">
                  Actualizar
            </button>
            <button class="index">
                  Volver
            </button>
      </div>`;
}

const showView = (pelicula) => {
      // Completar: genera HTML con información de la película
      // ...

      return `
      <h2>Vista de la pelicula ${pelicula.titulo}</h2>
      <p>
La película <b>${pelicula.titulo}</b>, dirigida por <b>${pelicula.director}</b>
      <img src="${pelicula.miniatura}" alt="${pelicula.miniatura}" />
      </p>
      <div class="actions">
      <button class="index">Volver</button>
      </div>`;
}

const newView = () => {
      // Completar: genera formulario para crear nuevo quiz
      // ...

      return `<h2>Crear Película</h2>
      <div class="field">
      Título <br>
      <input  type="text" id="tit" placeholder="Título" >
      </div>
      <div class="field">
      Director <br>
      <input  type="text" id="dir" placeholder="Director" ></div>

<div class="field">
Miniatura <br>
<input  type="text" id="min" placeholder="URL de la miniatura" ></div>


      <div class="actions">
            <button class="crear" >Crear</button>
            <button class="index" >Volver</button>
      </div>`;
};


  // CONTROLADORES 
const indexContr = () => {
      let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
      document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {
      // Completar: controlador que muestra la vista showView(pelicula)
      let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
      document.getElementById('main').innerHTML = showView(mis_peliculas[i]);

};

const newContr = () => {
      // Completar: controlador que muestra la vista newView()
      // ...
      document.getElementById('main').innerHTML= newView();
};

const createContr = () => {
      // Completar: controlador que crea una película nueva en el modelo guardado en localStorage
      // ...
      let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
      const nueva_pelicula= new Object();
      nueva_pelicula.titulo   =document.getElementById('tit').value;
      nueva_pelicula.director =document.getElementById('dir').value;
      nueva_pelicula.miniatura=document.getElementById('min').value;
      mis_peliculas.push(nueva_pelicula)
      localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
      indexContr();
};

const editContr = (i) => {
      let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
      document.getElementById('main').innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
      let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
      mis_peliculas[i].titulo    = document.getElementById('titulo').value;
      mis_peliculas[i].director  = document.getElementById('director').value;
      mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
      localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
      indexContr();
};

const deleteContr = (i) => {
      // Completar:  controlador que actualiza el modelo borrando la película seleccionada
      // Genera diálogo de confirmación: botón Aceptar devuelve true, Cancel false
      let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
      mis_peliculas.splice(i, 1);
      localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
      indexContr();
      };

const resetContr = () => {
      localStorage.clear();
      localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);
      indexContr();
};

  // ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener('click', ev => {
      if      (matchEvent(ev, '.index'))  indexContr  ();
      else if (matchEvent(ev, '.show'))   editContr   (myId(ev));
      else if (matchEvent(ev, '.update')) updateContr (myId(ev));

      else if(matchEvent(ev, '.ver')) showContr (myId(ev));
      else if(matchEvent(ev, '.Delete')) {
        if(confirm("¿Seguro que quieres borrar esta película?")){
         deleteContr (myId(ev)); 
        }
      }
      else if(matchEvent(ev, '.reset')) resetContr (myId(ev));
      else if(matchEvent(ev, '.create'))  newContr(myId(ev));
      else if(matchEvent(ev, '.crear'))    createContr(myId(ev));
})

  // Inicialización       
document.addEventListener('DOMContentLoaded', indexContr);
