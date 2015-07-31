//guardar reservaciones en el dispositivo
var almacen = {
	db: null,
	th: null,
	pr: null,
	ha: null,
	di: null,
	guardarReserva: function(th, pr, ha, di)	{
		almacen.db = window.openDatabase("hotelApp", "1.0","Hotel App",200000);
		almacen.th = th;
		almacen.pr = pr;
		almacen.ha = ha;
		almacen.di = di;		
		almacen.db.transaction(almacen.tablaReserva,almacen.error,almacen.confirmarReserva);
	},
	error: function(err){
		alert(err.code);
	},
	tablaReserva: function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS reservas ( th, pr, ha, di)');
		tx.executeSql('INSERT INTO reservas (th, pr, ha, di) VALUES ("'+almacen.th+'","'+almacen.pr+'","'+almacen.ha+'","'+almacen.di+'")');
	},
	confirmarReserva: function(){
		alert("Guardado en dispositivo, en espera de sincronizar con el server");
	},
	borrarReservas: function(){
		almacen.db = window.openDatabase("hotelApp","1.0","Hotel App",200000);
		almacen.db.transaction(almacen.deleteReservas,almacen.error,almacen.confirmarEliminada);
	},
	deleteReservas: function(tx){
		tx.executeSql("DELETE FROM reservas");
	},
	confirmarEliminada: function(){
		navigator.notification.alert("Reservas eliminadas", null, "Felicidades","Aceptar");
	},
	leerReservas: function(){
		almacen.db = window.openDatabase("hotelApp","1.0","Hotel App",200000);
		almacen.db.transaction(almacen.readReservas, almacen.error, almacen.confirmarLeidas);
	},
	readReservas: function(tx){
		tx.executeSql("SELECT * FROM reservas",[],function(tx2, r){
			for(i=0;i<r.rows.length; i++){
				var th = r.rows.item(i).th;
				var pr = r.rows.item(i).pr;
				var ha = r.rows.item(i).ha;
				var di = r.rows.item(i).di;
				
				almacen.enviaReserva(th,pr,ha,di);
				
				//Enviar reserva al servidor
			}
		},almacen.error);
	},
	confirmarLeidas: function(){
		almacen.borrarReservas();
	},
	enviaReserva: function (th, pr, ha, di){
					$.ajax({
						method: "POST",
						url: "http://192.168.0.2/prueba/validaDatos.php",
						data: { tip: th, per: pr, nhab: ha, dia:di },
						error: function(){
							alert("ajax connection error");
						}
					}).done(function( respuestaServer ) {
						navigator.notification.alert(msg);
							if(respuestaServer.valor==1){ 
								$.mobile.changePage("#home");
							}
							
        				});
				}
};