var eye = document.getElementById("togglePassword");
var password = document.getElementById("passInput");

eye.addEventListener("click", function() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
})

let formulario = document.getElementById("formularioLogin")
formulario.addEventListener("submit", function(event) {
  event.preventDefault();                                    //Esta funcion nativa no entiendo que hace en realidad, es como que evita que la pagina se recargue cuando se presiona el boton.

  const username = document.getElementById("email").value;
  const password = document.getElementById("passInput").value;

  //Acá deberíamos hacer una solicitud al servidor correspondiente para verificar las credenciales e iniciar la sesión correspondiente, pero como la letra pide inicio de sesion ficticia omitimos la solicitud.

  window.location.href = "index.html"; //

})
