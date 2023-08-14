var eye = document.getElementById("togglePassword");
var password = document.getElementById("passInput");

eye.addEventListener("click", function() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
})


/* Antes teniamos esta funcion para el checkbox */
/*function contrasena() {
    var password = document.getElementById("passInput");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }*/
