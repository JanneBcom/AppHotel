//transferir archivos con metodo de phonegap
var	ft = {
	win: function (r) {
		if(r.response){
			navigator.notification.alert("Registrado Correctamente",
				function(){
					navigator.vibrate(2000); // se debe de agregar en el config para que realice la funcion
					navigator.notification.beep(1); //realizara una alerta de sonido.
					window.location.href="#home";
				}, "Bienvenido", "Finalizar");
		}else{
			alert("Error al subir la foto");
		}
	},
	fail: function (error) {
		alert("An error has occurred: Code = " + error.code);
	},
	start: function(path){
		var options = new FileUploadOptions();
		options.fileKey = "foto"; //nombre de la variable con la que se va a recibir en el php(servidor)$_POST['foto']
		options.fileName = "Janett"; //nombre con el que se va a guardar en el server la extension se define en el php del server.
		options.mimeType = "image/jpeg";

		var ft2 = new FileTransfer();
		ft2.upload(path, encodeURI("http://carlos.igitsoft.com/apps/test.php"), ft.win, ft.fail, options);
	}
}; 