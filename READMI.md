**** index.html ****
aqui crearemos una estructura basica del html 
importamos: bootstrap,jquery, font-awesome, jquery-ui.min (este style es para nuestro buscados de productos) y un style he index.js que trabajaremos
y analizaremos uno a uno pero antes analizaremos nuestro html 

se crea un navbar clasico de bootstrap cn todo lo pedido un nombre  un dropdown con las categorias 
y un buscador que luego trabajaremos

al dropdown se le agregara todos los nombres de las categorias y le daremos un value con el id de cada categoria
acto seguido crearemos 2 div uno  con class container y otro con row para centralizar y dar mejor estructura al proyecto

mencion importante que a todo div con el que trabajaremos le pondremos un nombre de ID para manipularlo con nuestro index.js
nuestro row sera nuestro div padre esp queire decir que todo lo que haremos a continuacion se hara dentro de ese div 

**** index.js ****

** $(document).ready(async()=>{}**
esta función permite la activación del código javascript una vez que el árbol DOM esté cargado, sin esperar a las imágenes o los demás recursos. 
async, Cuando se llama a una función async , esta devuelve un elemento promesa. esto se usara mas adelante con un await que analizaremos
acontinuacion.

se crea una estructura ajax:
guardaremos en una constante nuestra respues 
y para que la gaurde usaremos el await que va de la mano con async, await  hace que JavaScript espere hasta que la promesa se establezca y devuelva su resultado.
type, el tipo de metodos que se utilizara 
url, es la url creada en nuestro servidor
success: en caso de que ajax se haya ejecutado con exito entrara aqui
data, es toda la data que noes entrego nuestra peticion api
{Data}, aqui desestructuraremos data ya que api entrega varia informacion pero solo nesecitamos la Data que es el producto puesto en json 
forEach, haremos un recorrido a la Data y desestructuraremos lo solicitado.
aqui utilizaremos el id creado anteriormente el divpadre y le indicaremos que todo lo creado a continuacion sera dentro de ese div 
 const guardarObjeto= await $.ajax({
                type:"GET",
                url:https://api-bsale-test1.herokuapp.com/api/v0/searchallproduct,
                success: (data)=>{
                         se toma la data completa pero la api ademas nos da mas informacion entonces debemos desestructurar la data 
                         y caputrar la data interna de nuestra api
                        const {Data} = data
                         se destructura cada valor que me dio la api y se usaran 
                         los valores que se solicitaron
                        Data.forEach(({name,url_image,price}) => {
                        como se menciono en el html el div padre es el 
                         el div principal en el cual vendra todo el div hijo puesto mas adelante
                        $("#divpadre").append(
                                <div class="card" style="width: 18rem;">
                                        <img src="${url_image}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                                <h5 class="card-title">${name}</h5>
                                                <label>$${price}</label>
                                                <button class="btn btn-secondary rounded-circle prueba"><i class="fas fa-cart-plus fa-1x "></i></button>
                                        </div>
                                </div>
                                );  
                        });
                }
        });



**  $("#category").on("change",({target})=>{ }**
    aqui indicamos que si el input con el id category subre un cambio este obtendra el id por meido del target 
    y lo trabajaremos 

      $("#divpadre").html("")
                  se toma la data completa que se guarda en la constantey al igual que la api  nos da mas informacion entonces debemos desestructurar la data 
                  y caputrar la data interna de nuestra api
                      for (const iterator of Data) {
                         filtramos que el id capturado de target sea igual al de category de nuestro producto de la base de datos 
                        if(iterator.category == target.value){
                                $("#divpadre").append(
                                        `<div class="card" style="width: 18rem;">
                                                <img src="${iterator.url_image}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                        <h5 class="card-title">${iterator.name}</h5>
                                                        <label>$${iterator.price}</label>
                                                        <button class="btn btn-secondary rounded-circle prueba"><i class="fas fa-cart-plus fa-1x "></i></button>
                                                </div>
                                        </div>`
                                        );     
                        }
                }
        })
basicamente es igual a la api anterior con la diferencia que tendremos un if 
para el filtro de productos  este if nos dira si el idcategory del producto es igual a nuestro target.value si es asi 
nos mostrara el producto con dicho id 


** $("#buscador").autocomplete({} **

aqui se utiliza un script  que se importo en nuestro index html 
este script hare que se peuda realizar nuestra busqueda de productos
al momento de escribir en el input que tiene el id buscador se activara automaticamente gracias 
al autocomplete esto hara que cada ves que escribamos algo nos mostrara los posibles autocompletados
        $("#buscador").autocomplete({
                source:  (request, response) => {
                        al igual que arriba destructuramos la data de nuesto objetos de la api
                        const {Data} = guardarObjeto
                        ya que no sabemos si viene en min o mayuscula los nombres de los productos transformamos en mayuscula 
                        todo lo escrito de nuestra caja de texto y lo guardaremos en una constante
                        
                        const mayuscula = request.term.toUpperCase();
                        creamos un arreglo para guardar los resultados
                        arr=[];
                        for (const iterator of Data) {
                                hacemos un recorrido a toda la data y hacemos que los nombres de los productos 
                                sean todos con mayusculas para evitar problemas de escritura
                                acto seguido nos buscara con indexOf realiza la llamada, de la primera ocurrencia del valor especificado
                                let posicion = iterator.name.toUpperCase().indexOf(mayuscula);
                                en caso de que encuentre ocurrencias entra y me gaurda en un arr
                                if(posicion !== -1){
                                        arr.push(iterator.name)
                                } 
                        }
                        al finalizar el for enviaremos todo el arreglo con los nombres encontrados con la similitud
                        response(arr)
                        esto hara que abajito de nuestro input se veran todos los posibles  nombres de los productos que deseo 
                },
                lo que se demora en el proceso de la busqueda del autocompletado
                delay: 500,
                //desde la tercera letra se mostrara la lista de datos 
                minLength: 3,
            });



**    $("#btnbuscar").on("click",()=>{}**
    agregamos un evento click con el id btnbuscar (este boton va de la mano con el input de arriba)
            destructuramos la data de nuesto objetos de la api
                const {Data} = guardarObjeto
                reseteamos el html cuando se active para que no se monten los resultados
                $("#divpadre").html("")
                for (const iterator of Data) {
                        a nuestro nombre del producto le preguntamos si es igual al valor del input buscador
                        if(iterator.name == $("#buscador").val()){
                                en caso de ser iguales nos busca todos los productos con ese nombre 
                                $("#divpadre").append(
                                        `<div class="card" style="width: 18rem;">
                                                <img src="${iterator.url_image}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                        <h5 class="card-title">${iterator.name}</h5>
                                                        <label>$${iterator.price}</label>
                                                        <button class="btn btn-secondary rounded-circle prueba"><i class="fas fa-cart-plus fa-1x "></i></button>
                                                </div>
                                        </div>`
                                );     
                        }
                }
                finalmente reseteamos el input para seguir utilizando si gustamos
                $("#buscador").val("");  
        })
          
});
