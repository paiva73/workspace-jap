document.addEventListener('DOMContentLoaded', () => {
  let imgLocal = JSON.parse(localStorage.getItem('urlImg'));
  if(imgLocal != '' && imgLocal != null && imgLocal != undefined ){
    profileImg();
  }
})

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
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
  


