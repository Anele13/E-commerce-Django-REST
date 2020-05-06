

$(document).ready(function() {
    getProducto(3) //TODO: no harcoding aca!
});

function getProducto(idProducto){
    $.ajax({
        url: direccionAPI + '/producto/'+idProducto,
        success: function(producto) {
            $('#card_nombre').html(producto.nombre)
            $('#card_precio').html(producto.precio)
            $('#id_producto').text(producto.id)
            if (productoEnCarro(idProducto.toString())){
                $('#btn_agregar_a_carro').html("Eliminar del carro <i class='fa fa-shopping-cart' aria-hidden='true'></i>");
            }
        },
        error: function() {
            console.log("Hay errores");
        }
    });
}

function agregarEliminarProducto(){
    var idProducto = $('#id_producto').text();
    if (userIsLogged()){
        if($('#btn_agregar_a_carro').text().includes("Agregar")){
            agregarAlCarro(idProducto)
            $('#btn_agregar_a_carro').html("Eliminar del carro <i class='fa fa-shopping-cart' aria-hidden='true'></i>");
        }
        else{
            eliminarDelCarro(idProducto)
            $('#btn_agregar_a_carro').html("Agregar al carro <i class='fa fa-shopping-cart' aria-hidden='true'></i>");
        }
    }
}