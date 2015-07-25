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
	}
};