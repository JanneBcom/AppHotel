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
            alert(nom + " - " + mai + " - " + tel);
        else
            navigator.notification.alert("Todos los campos son requeridos", null, "Registro", "Aceptar");
    }
};

$(fn.deviceready);