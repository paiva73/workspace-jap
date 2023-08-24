let eye = document.getElementById("togglePassword");
let password = document.getElementById("passInput");

eye.addEventListener("click", function() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
})

let formulario = document.getElementById("formularioLogin");
formulario.addEventListener("submit", function(event) {
  
  const username = document.getElementById('email').value;
  const password = document.getElementById('passInput').value;

  event.preventDefault();
  const usuario = {
    username: username, 
    password: password
  };
  
  localStorage.setItem('datosUsuario', JSON.stringify(usuario));
  window.location.href = "index.html"; 
});
