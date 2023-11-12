document.addEventListener('DOMContentLoaded', () => {
  let imgLocal = JSON.parse(localStorage.getItem('urlImg'));
  if(imgLocal != '' && imgLocal != null && imgLocal != undefined ){
    profileImg();
  }

  const dataProfile = JSON.parse(localStorage.getItem('dataProfile'));

  const emailUsuario = JSON.parse(localStorage.getItem('datosUsuario'));

  const email = document.getElementById('email');
  email.value = emailUsuario.username;

  showDataProfile(dataProfile);
})
//Muestra los datos del pefil ingresados por el usuario
function showDataProfile(data) {
    document.getElementById('nombre').value = data.nombre;
    document.getElementById('segundoNombre').value = data.segundoNombre;
    document.getElementById('apellido').value = data.apellido;
    document.getElementById('segundoApellido').value = data.segundoApellido;
    document.getElementById('email').value = data.email;
    document.getElementById('contacto').value = data.contacto;
}

function profileImg(){
  let imgs = document.querySelectorAll('#divImg img')
  let imgLocal = JSON.parse(localStorage.getItem('urlImg'));

  if(imgLocal != '' && imgLocal != null && imgLocal != undefined ){
    Array.from(imgs).forEach(element => {
      element.src = imgLocal;
    });
  } 
}

function loadFile(event) {
  let imgs = document.querySelectorAll('#divImg img')

  let urlImg = URL.createObjectURL(event.target.files[0]);
  Array.from(imgs).forEach(element => {
    element.src = urlImg;
  });
  localStorage.setItem('urlImg', JSON.stringify(urlImg));
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          event.preventDefault()
          event.stopPropagation()
          Swal.fire({
            icon: 'success',
            title: 'Los cambios han sido guardados!',
            showConfirmButton: false,
            timer: 1500
            });

            let dataProfile = {
              nombre: document.getElementById('nombre').value,
              segundoNombre: document.getElementById('segundoNombre').value,
              apellido: document.getElementById('apellido').value,
              segundoApellido: document.getElementById('segundoApellido').value,
              email: document.getElementById('email').value,
              contacto: document.getElementById('contacto').value,
            }
            localStorage.setItem('dataProfile', JSON.stringify(dataProfile));
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


  


