$(document).ready(function() {
    switchBotonLogin();
    if (userIsLogged()){
        var listaProductos = getCarro();
        if(listaProductos){
            listaProductos.forEach(element => {
                $.ajax({
                    url: direccionAPI + '/producto/'+element,
                    success: function(producto) {
                        crearItem(producto[0])
                        calcularMontoFinal();
                    },
                    error: function() {
                        error("Errores buscando producto.");
                    }
                });         
            });
            
        }
        else{
            error("Todavia no tenes agregados productos a tu carrito!");
        }
    }
    else{
        window.location.href = '/login.html?nextPage=carrito.html';   
    }
});


function crearItem(producto){
    $('#container_producto').append("<hr>"+
                                    "<div class='row align-items-center contenedor_carrito'>"+
                                        "<div class='col-md-1 text-center'>"+
                                            "<img class='img-fluid' src='"+producto.thumbnail+"' alt='vans'>"+
                                        "</div>"+
                                        "<div class='col-md-5'>"+
                                            "<div class='id_producto' style='display:none'>"+producto.id+"</div>"+
                                            "<div class='cant_total' style='display:none'>"+producto.cantidad_disponible+"</div>"+
                                            "<h4 class='card-title' id='card_nombre'>"+producto.nombre+"</h4>"+
                                            "<h6 class='card-title' style='color: green'><i class='fa fa-truck' aria-hidden='true'></i> <strong>Envio Gratis</strong></h6>"+
                                        "</div>"+
                                        "<div class='col-md-2 col-sm-12 text-center'>"+
                                            "<div class='input-group mb-3'>"+
                                               "<div class='input-group-prepend '>"+
                                                    "<button class='btn btn-outline-secondary' type='button' onClick='restarProducto(this)'>-</button>"+
                                                "</div>"+
                                                "<input type='text' class='form-control input_cantidad' placeholder='1' value=1>"+
                                                "<div class='input-group-prepend'>"+
                                                    "<button class='btn btn-outline-secondary' type='button' onClick='sumarProducto(this)'>+</button>"+
                                                "</div>"+
                                            "</div>"+
                                            "<p class='cant_restante'>"+producto.cantidad_disponible+" unidades</p>"+
                                        "</div>"+
                                        "<div class='col-md-2 col-sm-12'>"+
                                            "<a class='btn btn-outline-secondary' href='"+localhost+'/producto.html?id='+producto.id+"'>Ver</a>"+
                                            "<button style='margin-left: 3px' class='btn btn-outline-danger' onClick='eliminarProducto("+producto.id+")'>Eliminar</button>"+
                                        "</div>"+
                                        "<div class='col-md-2'>"+
                                            "<h3 class='card-title card_precio'>$ "+producto.precio+"</h3>"+
                                        "</div>"+                                        
                                    "</div>"+
                                    "<hr>"
                                    )

}


function calcularMontoFinal(){
    var resultado = 0
    $('.card_precio').toArray().forEach(element => {
        var monto = Number((/(\d+\.\d+)/.exec($(element).html()) || []).pop())
        resultado = resultado + parseFloat(monto)
    });
    $('#precio_final').html("Total $ "+ resultado.toFixed(2))
}


function error(mensaje){
    $('#container_compra').parent().hide()
    $('#main_container').append("<div class='alert alert-danger  text-center' role='alert'>"+ mensaje+"</div>")
}


function eliminarProducto(idProducto){
    eliminarDelCarro(idProducto)
    location.reload();
}


function sumarProducto(boton){
    var cant_restante = Number((/(\d+)/.exec( $(boton).parents().eq(3).find('.cant_restante').html() ) || []).pop()) 
    var precio_producto = Number((/(\d+\.\d+)/.exec($(boton).parents().eq(3).find('.card_precio').html()) || []).pop())
    var cantidad_compra = parseInt($(boton).parent().prev().val())
    if (cant_restante - 1 > 0){
        $(boton).parents().eq(3).find('.cant_restante').html((cant_restante - 1)+' unidades')
        $(boton).parents().eq(3).find('.card_precio').html('$ '+(precio_producto * 2))
        $(boton).parent().prev().val(cantidad_compra + 1)
        calcularMontoFinal();
    }    
}


function restarProducto(boton){
    var cant_restante = Number((/(\d+)/.exec( $(boton).parents().eq(3).find('.cant_restante').html() ) || []).pop()) 
    var precio_producto = Number((/(\d+\.\d+)/.exec($(boton).parents().eq(3).find('.card_precio').html()) || []).pop())
    var cant_total = Number((/(\d+)/.exec($(boton).parents().eq(3).find('.cant_total').html()) || []).pop())
    var cantidad_compra = parseInt($(boton).parents().eq(3).find('.input_cantidad').val())
    if (cant_restante + 1 <= cant_total ){
        $(boton).parents().eq(3).find('.cant_restante').html((cant_restante + 1)+' unidades')
        $(boton).parents().eq(3).find('.card_precio').html('$ '+(precio_producto / 2))
        $(boton).parents().eq(3).find('.input_cantidad').val(cantidad_compra - 1)
        calcularMontoFinal();
    }   
}


function realizarCompra(){
    var datosCompra = {}
    $('.contenedor_carrito').toArray().forEach(element => {
        var id_producto = $(element).find('.id_producto').html()
        var cantidad = $(element).find('.input_cantidad').val()
        datosCompra[id_producto] = cantidad
    });
    registrarCompra(datosCompra);
    alert("Compra Exitosa! Felicitaciones!")
    window.location.href = localhost;
}