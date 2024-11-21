window.document.addEventListener("change", (ev) =>{
    let formulario = document.getElementById("formularioEntrenador");
    let seleccion = document.getElementById("entrenador");
    let identrenador= seleccion.options[seleccion.selectedIndex].value;
    let url = "/entrenadores/" + identrenador + "/sesiones";
    formulario.setAttribute("action",url);
    formulario.submit();
});