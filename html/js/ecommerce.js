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

function hashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

function usuarioHabilitado(username, password){
    var usuarios_hash = [-442404218,2045108616] //usuario1:usuario1--usuario2:usuario2
    var hash_in = hashCode(username+password)
    return usuarios_hash.includes(hash_in)?  true: false
}

function login(){
    $('#form_errors').html(" ")
    var username = $('#inputUsername').val()
    var password = $('#inputPassword').val()
    var URLredirect = getUrlParameter('nextPage');
    if (usuarioHabilitado(username, password)){ 
        sessionStorage.setItem('token', "1234");
        if (URLredirect){
            window.location.href = localhost+'/'+URLredirect;
        }
        else{
            window.location.href = 'index.html';
        }
    }
    else{
        $('#form_errors').append("<div class='alert alert-danger  text-center' role='alert'>Usuario o Contraseña incorrectos. Reintente!</div>")
    }
}


function logout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('carro')
    sessionStorage.removeItem('compra')
    $('#container_login').html(
        "<button type='button' class='btn btn-outline-dark' onClick='redirectLogin()'>"+
            "<i class='fa fa-user' aria-hidden='true'></i> Login"+
        "</button>"
    )   
}

function getUserToken(){
    return sessionStorage.getItem('token')
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
            old.indexOf(data)!==-1? old.splice(old.indexOf(data), 1): old
            sessionStorage.setItem(name, old);
        }
    }
}

function switchBotonLogin(){
    $('#container_login').html('')
    if (userIsLogged()){
        $('#container_login').html(
            "<button type='button' class='btn btn-outline-dark' onClick='logout()'>"+
                "<i class='fa fa-user' aria-hidden='true'></i> Logout"+
            "</button>"
        )
    }
    else{
        $('#container_login').html(
            "<button type='button' class='btn btn-outline-dark' onClick='redirectLogin()'>"+
                "<i class='fa fa-user' aria-hidden='true'></i> Login"+
            "</button>"
        )   
    }
}

function redirectLogin(){
    window.location.href = localhost+"/login.html";
}

function registrarCompra(datosCompra){
    var token = getUserToken();
    var compra = {}
    compra[token] = datosCompra
    sessionStorage.setItem('compra',JSON.stringify(compra))
}