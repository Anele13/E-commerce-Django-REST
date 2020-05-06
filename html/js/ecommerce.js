var localhost = 'http://localhost:8000'
var direccionAPI = "http://localhost:8001"

function login(){
    //localStorage.setItem('token', json.token);
    $('#form_errors').html(" ")
    var username = $('#inputUsername').val()
    var password = $('#inputPassword').val()
    if (username){ //TODO: usuario habilitado
        localStorage.setItem('token', "1234");
        window.location.href = localhost+'/producto.html';
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
    return localStorage.getItem('carro')? localStorage.getItem('carro').split(',') : null
}

function productoEnCarro(idProducto){
    var data = localStorage.getItem('carro');
    if (data){
        return data.split(',').indexOf(idProducto)!==-1? true: false
    }
    return false
}

function appendToStorage(name, data){
    var old = localStorage.getItem(name)
    if(old === null){
        localStorage.setItem(name, data)
    }
    else{
        var arreglo = old.split(',')
        if(arreglo.indexOf(data)===-1){
            arreglo.push(data)
            localStorage.setItem(name,arreglo)
        } 
    }
}

function dropFromStorage(name, data){
    var old = localStorage.getItem(name).split(',');
    if(old !== null){
        old.indexOf(data)!==-1? old.pop(data): old
        localStorage.setItem(name, old);
    }
}