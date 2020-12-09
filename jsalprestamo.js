
$( "#Boton" ).click(function() {
  $( "#our-feature" ).fadeOut( "slow", function()
   {
  });
});


setTimeout(function() {
  $("#page-loader").fadeOut("slow");
}, 2500);


$(document).ready(function(){    
  $('#Boton').click(function(){        
      
      var nom = document.getElementById("nombretxt").value;
      var apel = document.getElementById("apellidotxt").value;
 
      localStorage.setItem("Nombre", nom);
      localStorage.setItem("Apellido", apel);

      console.log(localStorage.getItem('Nombre'));
      console.log(localStorage.getItem('Apellido'));

      document.getElementById("nombretxt").value = "";
      document.getElementById("apellidotxt").value = "";
  });   
});

$("#BotonDePrestamo").click(function(){
  let timerInterval
Swal.fire({
  title: '¡Hola! \n' + localStorage.getItem('Nombre') + " " + localStorage.getItem('Apellido'),
  html: 'En lo que dure este Popup te estaremos enviando un mail a tu correo.',
  timer: 6000,
  timerProgressBar: true,
  willOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
          b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('Estaba cerrado por el temporizador')
  }
})
})

$("#dolar").click(function(){
  $.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales", function(posts){
    console.log(posts);
  Swal.fire({        
      type: 'info',
      title: 'Dólar Compra / Venta:',
      text: posts[0].casa.compra + "-" + posts[0].casa.venta,
      footer: '<a href=https://www.dolarsi.com/>¿Necesitas saber otras cotizaciones? Hace click acá.</a>'      
  });
});
})



// Listen for Submit
document.getElementById("calculadora-al-prestamo").addEventListener("submit", function(e) {
  // Hide Results
  document.getElementById("resultado").style.display = "none";

  // Show Loader
  document.getElementById("cargando").style.display = "block";

  setTimeout(calcularResultado, 2000);

  e.preventDefault();
});

// Calculate Results
function calcularResultado() {
  // UI Vars
  const monto = document.getElementById("monto");
  const interes = document.getElementById("interes");
  const anios = document.getElementById("anios");
  const pagoMensual = document.getElementById("pago-mensual");
  const pagoTotal = document.getElementById("pago-total");
  const totalInteres = document.getElementById("total-interes");
  
  const principal = parseFloat(monto.value);
  const calculatedInteres = parseFloat(interes.value) / 100 / 12;
  const calculatarPagos = parseFloat(anios.value) * 12;

  // Computed Monthly payment
  const x = Math.pow(1 + calculatedInteres, calculatarPagos);
  const mensual = (principal * x * calculatedInteres) / (x - 1);

  if (isFinite(mensual)) {
    pagoMensual.value = mensual.toFixed(2);
    pagoTotal.value = (mensual * calculatarPagos).toFixed(2);
    totalInteres.value = (mensual * calculatarPagos - principal).toFixed(2);

    // Show Results
    document.getElementById("resultado").style.display = "block";

    // Hide Loader
    document.getElementById("cargando").style.display = "none";
  } else {
    showError("Por favor compruebe las entradas numéricas.");
  }
}

//
function showError(error) {
  //
  document.getElementById("resultado").style.display = "none";

  //
  document.getElementById("cargando").style.display = "none";

  //
  const errorDiv = document.createElement("div");

  //
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //
  errorDiv.className = "alert alert-danger";

  //
  errorDiv.appendChild(document.createTextNode(error));

  //
  card.insertBefore(errorDiv, heading);

  //
  setTimeout(clearError, 3000);

  //
  function clearError() {
    document.querySelector(".alert").remove();
  }
}

function BotonDePrestamo(){
  document.getElementById("Solicita-tu-prestamo").style.background = "#4C60EC";
  document.getElementById("BotonDePrestamo").innerHTML = "¡Listo! en breve recibiras un mail";
  document.getElementById("BotonDePrestamo").style.background = "MediumSeaGreen";
 
  
}

  