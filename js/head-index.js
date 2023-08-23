function verificarExistencia(){
    const hayDatos = JSON.parse(localStorage.getItem('datosUsuario'));
    if (!hayDatos) {
        window.location.href = "login.html"
    }
}
verificarExistencia();