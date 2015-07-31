<?php

//Conexión a base de datos
$server = "localhost";
$username = "root";
$password = "";
$database = "prueba";
$con = mysql_connect($server, $username, $password) or die ("Error al conectar: " . mysql_error());
mysql_select_db($database, $con);

//Obtenemos por Post los valores enviados desde el móvil

$tipo = $_POST["tip"];
$nper = $_POST["per"];
$nhab = $_POST["nhab"];
$dias = $_POST["dia"];

//Insertamos en la base de datos

$sql = "INSERT INTO reserva (tipoHabitacion, noPersona, noHabitacion, noDias ) ";
$sql .= "VALUES ('$tipo', '$nper', '$nhab', '$dias')";
if (!mysql_query($sql, $con)) {
	die('Error: ' . mysql_error());
} else {
	echo json_encode(1);
}
mysql_close($con);
?>