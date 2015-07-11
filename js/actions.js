//Funcionalidades principales
var fn = {
    init: function(){
        if(!fn.estaRegistrado())
            window.location.href = "#reg";
        
        $('#reg ul[data-role = listview] a').click(mc.start);
        $("#reg div[data-role = footer] a").click(fn.registrarClick);
    },
    deviceready: function(){
        document.addEventListener("deviceready", fn.init, false);
    },
    estaRegistrado: function(){
        return false;
    },
    registrarClick: function(){
        var nom = $('#regNom').val();
        var mai = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#fotoTomada').attr("rel");
        
        if(nom != '' && mai != '' && tel != '' && foto != undefined && foto != '')
            fn.enviarRegistro(nom,mai,tel,foto);
        else
            navigator.notification.alert("Todos los campos son requeridos", null, "Registro", "Aceptar");
    },
	enviarRegistro: function(nom,mai,tel,foto){
		alert("er");
		$.ajax({
  			method: "POST", //metodo por el ue se pasará
  			url: "http://carlos.igitsoft.com/apps/test.php", //url para el servidor interno o externo
  			data: { nom: nom, mail: mai, tel: tel }, //nombre de las variables del php : y despues nombres de las variables a enviasr
			error: alert("ajax connection error")
		}).done(function( msg ) { //recibe una respuesta del servidor
    		if(msg == 1){
				ft.start(foto); //envia foto
			}else{
				navigator.notificacion.alert("Error al enviar los datos", null, "Enviar Datos", "Aceptar");
			}
  		});
	}
};

$(fn.deviceready);