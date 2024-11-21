"use strict";

//Realizar la redirecion de la web
window.document.addEventListener("change", function (ev) {
  var formulario = document.getElementById("formularioCliente");
  var seleccion = document.getElementById("cliente");
  var idcliente = seleccion.options[seleccion.selectedIndex].value;
  var url = "/clientes/" + idcliente + "/planes";
  formulario.setAttribute("action", url);
  formulario.submit();
});