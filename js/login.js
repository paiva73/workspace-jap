function contrasena() {
    var password = document.getElementById("passInput");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }