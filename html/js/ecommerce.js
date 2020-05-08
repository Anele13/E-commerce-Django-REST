var localhost = 'http://localhost:8000'
var direccionAPI = "http://localhost:8001"

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}


function login(){
    $('#form_errors').html(" ")
    var username = $('#inputUsername').val()
    var password = $('#inputPassword').val()
    var URLredirect = getUrlParameter('nextPage');
    if (username){ //TODO: usuario habilitado
        sessionStorage.setItem('token', "1234");
        window.location.href = localhost+'/'+URLredirect;
    }
    else{
        $('#form_errors').append("<div class='alert alert-danger  text-center' role='alert'>Usuario o Contraseña incorrectos. Reintente!</div>")
    }
}


function logout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('carro')
}

function userIsLogged(){
    return sessionStorage.getItem('token')? true:false
}

function agregarAlCarro(idProducto){
    appendToStorage('carro',idProducto.toString())   
}

function eliminarDelCarro(idProducto){
    dropFromStorage('carro',idProducto.toString())
}

function getCarro(){
    return sessionStorage.getItem('carro')? sessionStorage.getItem('carro').split(',') : null
}

function productoEnCarro(idProducto){
    var data = sessionStorage.getItem('carro');
    if (data){
        return data.split(',').indexOf(idProducto)!==-1? true: false
    }
    return false
}

function appendToStorage(name, data){
    var old = sessionStorage.getItem(name)
    if(old === null){
        sessionStorage.setItem(name, data)
    }
    else{
        var arreglo = old.split(',')
        if(arreglo.indexOf(data)===-1){
            arreglo.push(data)
            sessionStorage.setItem(name,arreglo)
        } 
    }
}

function dropFromStorage(name, data){
    var old = sessionStorage.getItem(name).split(',');
    if(old !== null){
        if(old.length == 1){
            sessionStorage.removeItem(name)
        }
        else{
            old.indexOf(data)!==-1? old.pop(data): old
            sessionStorage.setItem(name, old);
        }
    }
}
