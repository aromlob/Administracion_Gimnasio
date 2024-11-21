//Realizar la redirecion de la web
window.document.addEventListener("change", (ev) =>{
    let formulario = document.getElementById("formularioCliente");
    let seleccion = document.getElementById("cliente");
    let idcliente= seleccion.options[seleccion.selectedIndex].value;
    let url = "/clientes/" + idcliente + "/planes";
    formulario.setAttribute("action",url);
    formulario.submit();
});