$(document).ready(function() {
    switchBotonLogin();
    var param = getUrlParameter('id');
    param? getProducto(param) : getProducto(1) //generico
});

function getProducto(idProducto){
    $.ajax({
        url: direccionAPI + '/producto/'+idProducto,
        success: function(producto) {
            $('#card_nombre').html(producto[0].nombre)
            $('#card_precio').html('$ '+producto[0].precio)
            $('#id_producto').text(producto[0].id)
            $('#img_principal').attr('src',producto[0].thumbnail)
            $('#id_descripcion').html(producto[0].descripcion)
            $('#thumbnail-1').attr('src',producto[0].thumbnail)
            crearRating(producto[0].ranking);
            if (productoEnCarro(producto[0].id.toString())){
                $('#btn_agregar_a_carro').html("Eliminar del carro <i class='fa fa-shopping-cart' aria-hidden='true'></i>");
            }
        },
        error: function() {
            console.log("Hay errores");
        }
    });
}

function crearRating(puntaje){
    $(".my-rating").starRating({
        starSize: 23,
        ratedColor: 'gold',
        initialRating: puntaje,
        readOnly : true,
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
    else{
        var param = getUrlParameter('id');
        if (param)
            window.location.href = localhost+"/login.html?nextPage=producto.html?id="+param;
        else
            window.location.href = localhost+"/login.html?nextPage=producto.html";
    }
}
