$(document).ready(function() {
    if (userIsLogged()){
        var listaProductos = getCarro();
        if(listaProductos){
            listaProductos.forEach(element => {
                $.ajax({
                    url: direccionAPI + '/producto/'+element,
                    success: function(producto) {
                        crearItem(producto)
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
        window.location.href = localhost+'/index.html';
    }
});


function crearItem(producto){
    $('#container_producto').append("<hr>"+
                                    "<div class='row align-items-center'>"+
                                        "<div class='col-md-1'>"+
                                            "<img class='img-fluid' src='"+producto.thumbnail+"' alt='vans'>"+
                                        "</div>"+
                                        "<div class='col-md-9'>"+
                                            "<div id='id_producto' style='display:none'>"+producto.id+"</div>"+
                                            "<h4 class='card-title' id='card_nombre'>"+producto.nombre+"</h4>"+
                                            "<h6 class='card-title' style='color: green'><i class='fa fa-truck' aria-hidden='true'></i> <strong>Envio Gratis</strong></h6>"+
                                        "</div>"+
                                        "<div class='col-md-2'>"+
                                            "<h3 class='card-title' id='card_precio'>$ "+producto.precio+"</h3>"+
                                        "</div>"+
                                    "</div>"+
                                    "<hr>"
                                    )
    var monto_total = $('#precio_final').html().replace(/[^0-9]/g,'')
    var resultado = 0
    monto_total? resultado=(parseInt(producto.precio) + parseInt(monto_total)): resultado=parseInt(producto.precio) //TODO: operacion flotante
    $('#precio_final').html("Total $ "+ resultado)
}

function error(mensaje){
    $('#container_compra').hide()
    $('#main_container').append("<div class='alert alert-danger  text-center' role='alert'>"+ mensaje+"</div>")
}