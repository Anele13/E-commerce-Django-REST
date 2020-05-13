
$(document).ready(function() {
  mostrar(0,30);
  $('#b1').on('click', function() {
    buscar(0,30);
    return false;
  });
  $('#b2').on('click', function() {
    return false;
  });
  $('#b3').on('click', function() {
    $('#buscar').val("phone");
    buscar(0,30);
    $('#buscar').val("");
    return false;
  });
  $('#b4').on('click', function() {
    $('#buscar').val("led");
    buscar(0,30);
    $('#buscar').val("");
    return false;
  });
  $('#b5').on('click', function() {
    $('#buscar').val("tablet");
    buscar(0,30);
    $('#buscar').val("");
    return false;
  });
  $('#b6').on('click', function() {
    $('#buscar').val("laptop");
    buscar(0,30);
    $('#buscar').val("");
    return false;
  });
});

function mostrar(inicio,fin){
  var sig='<button type="button" class="btn btn-link float-right" onclick="mostrar('+inicio+'+'+30+',' +fin+'+'+30+')">Siguiente</button>'
  var ant='<button type="button" class="btn btn-link float-left" onclick="mostrar('+inicio+'-'+30+',' +fin+'-'+30+')">Anterior</button>';
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

function buscar(inicio,fin){
  var query=$('#buscar').val();
  var sig='<button type="button" class="btn btn-link float-right" onclick="buscar('+inicio+'+'+30+','+fin+'+'+30+')">Siguiente</button>' ;
  var ant='<button type="button" class="btn btn-link float-left" onclick="buscar('+inicio+'-'+30+',' +fin+'-'+30+')">Anterior</button>';    
  $.ajax({
    url: direccionAPI+ '/producto/',
    success: function(productos) {
      var result=filtrar(productos,query);
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
    },
    error: function() {
        console.log("Hay errores");
    }   
  });
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
      +'<div class="card shadow-sm p-3 mb-5 bg-white rounded" >'
      +'<img class="card-img" src="'+productos[i].imagen1+'">'
      +'<div class="card-body">'+'<h5 class="card-title">$'+productos[i].precio+'</h5>';
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