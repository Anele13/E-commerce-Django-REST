
$(document).ready(function() {
  switchBotonLogin();
  masProductos(0,30);
  $('#b1').on('click', function() {
    filter_data(0,30);
    return false;
  });

  $('#b2').on('click', function() {
    return false;
  });

  $('#b3').on('click', function() {
    $('#buscar').val("phone");
    filter_data(0,30);
    $('#buscar').val("");
    return false;
  });

  $('#b4').on('click', function() {
    $('#buscar').val("led");
    filter_data(0,30);
    $('#buscar').val("");
    return false;
  });

  $('#b5').on('click', function() {
    $('#buscar').val("tablet");
    filter_data(0,30);
    $('#buscar').val("");
    return false;
  });

  $('#b6').on('click', function() {
    $('#buscar').val("laptop");
    filter_data(0,30);
    $('#buscar').val("");
    return false;
  });

  $('#price_range').slider({
    range:true,
    min:1,
    max:6000,
    values:[1, 6000],
    step:50,
    stop:function(event, ui){
        $('#price_show').html(ui.values[0] + ' - ' + ui.values[1]);
        $('#hidden_minimum_price').val(ui.values[0]);
        $('#hidden_maximum_price').val(ui.values[1]);
        filter_data(0,30);
    }
  });

  $(".my-rating").starRating({
    starSize: 23,
    disableAfterRate: false,
    ratedColor: 'gold',
    forceRoundUp: true,
    callback: function(currentRating, $el){
        $('#hidden_default_rating').val(currentRating)
        filter_data(0,30);
    }
  });
});

function masProductos(inicio,fin){
  var sig='<button type="button" class="btn btn-link float-right" onclick="masProductos('+inicio+'+'+30+',' +fin+'+'+30+')">Siguiente</button>'
  var ant='<button type="button" class="btn btn-link float-left" onclick="masProductos('+inicio+'-'+30+',' +fin+'-'+30+')">Anterior</button>';
  $.ajax({
    url: direccionAPI+ '/producto/',
    success: function(productos) {
      var p = getCol(productos,inicio,fin);
      if(inicio==0){
        p+=sig;   
      }else{
        if(fin==productos.length){
          p+=ant;
        }else{
          p+=ant+sig;
        }
      }
      $('#cont').html(p);
    },
    error: function() {  
      console.log("Hay errores");
    }
});
}

function redirigir(idProducto){
  window.location.href = localhost+'/producto.html?id='+idProducto;
}



function putProductosEnPantalla(result,inicio,fin){
  var sig='<button type="button" class="btn btn-link float-right" onclick="filter_data('+inicio+'+'+30+','+fin+'+'+30+')">Siguiente</button>' ;
  var ant='<button type="button" class="btn btn-link float-left" onclick="filter_data('+inicio+'-'+30+',' +fin+'-'+30+')">Anterior</button>'; 
  if(result.length!=0){
    var p=getCol(result,inicio,fin);
    if(result.length>30){
      if(inicio==0){
        p+=sig;   
      }else{
        if(fin>=result.length){
          p+=ant;
        }else{
          p+=ant+sig;
        }
      }
    }
    $('#cont').html(p);           
  }else{
    $('#cont').html('<div class="alert alert-danger  text-center" role="alert"> No se econtraron productos</div>');
  }
}


function getCol(productos, inicio,fin){
  var p="";
  for (i=inicio;i<fin;i+3){
    p=p+'<div class="row">';
    for(j=0;j<3;j++){
      if(productos[i]==null){
        i=fin;
        break;
      }
      p+='<div class="col-sm-3" onclick="redirigir('+productos[i].id+')">'
      +'<div class="card shadow-sm p-3 mb-5 bg-white rounded zoom" >'
      +'<img class="card-img" src="'+productos[i].imagen1+'">'
      +'<div class="card-body">'+'<h5 class="card-title">$ '+productos[i].precio+'</h5>';
      if(productos[i].forma_envio!=null){
        p+='<span class="badge badge-success">Envio gratis</span>';
      }else{
        p+='<span class="badge badge-primary">Envio con normalidad</span>';
      }
      p+='<p class="card-text">'+productos[i].nombre+'</p>'
      +'</div>'+'</div>'+'</div>';
      i++;
    }
    p+='</div>'
  }
  return p;
}

function filtrar(productos,query){
  return productos.filter(function(el) {
    if(el["nombre"]== null){  
      console.log(el.id);
    }else{
      return el["nombre"].toLowerCase().indexOf(query.toLowerCase()) > -1;
    }
  })
}

//Para el spinner mientras espera resultados
$( document ).ajaxStart(function() {
  $('#loading').show(); 
  $('#cont').hide()
});

$( document ).ajaxStop(function() {
  $('#loading').hide();  
  $('#cont').show();
});

//nuevos filtros
function filter_data(inicio,fin){
    var minimum_price = $('#hidden_minimum_price').val();
    var maximum_price = $('#hidden_maximum_price').val();
    var rating = $('#hidden_default_rating').val();
    var tipo = get_filter();
    var categoria = $('#buscar').val();
    $.ajax({
        url: direccionAPI+"/producto/",
        data:{  minimum_price:minimum_price,
                maximum_price:maximum_price,
                rating: rating,
                tipo:tipo},
        success:function(data){
            if(categoria == ''){
              putProductosEnPantalla(data,inicio,fin)
            }
            else{
              var result=filtrar(data,categoria);
              putProductosEnPantalla(result,inicio,fin)
            }
        }
    });
}

function get_filter(class_name){
    var filter = [];
    $('.common_selector:checked').each(function(){
        filter.push($(this).val());
    });
    return filter;
}

$('.common_selector').click(function(){
    filter_data(0,30);
});





