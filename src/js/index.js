 $(document).ready(async()=>{
        //  se crea ajax para obtener el valor de la api y mostrarla en pantalla
        const guardarObjeto= await $.ajax({
                type:"GET",
                url:`https://api-bsale-test1.herokuapp.com/api/v0/searchallproduct`,
                success: (data)=>{
                        // se toma la data completa pero la api ademas nos da mas informacion entonces debemos desestructurar la data 
                        // y caputrar la data interna de nuestra api
                        const {Data} = data
                        // se destructura cada valor que me dio la api y se usaran 
                        // los valores que se solicitaron
                        Data.forEach(({name,url_image,price}) => {
                        // como se menciono en el html el div padre es el 
                        // el div principal en el cual vendra todo el div hijo puesto mas adelante
                        $("#divpadre").append(
                                `<div class="card" style="width: 18rem;">
                                        <img src="${url_image}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                                <h5 class="card-title">${name}</h5>
                                                <label>$${price}</label>
                                                <button class="btn btn-secondary rounded-circle prueba"><i class="fas fa-cart-plus fa-1x "></i></button>
                                        </div>
                                </div>`
                                );  
                        });
                }
        });
        $("#category").on("change",({target})=>{
                $("#divpadre").html("")
                 // se toma la data completa que se guarda en la constantey al igual que la api  nos da mas informacion entonces debemos desestructurar la data 
                 // y caputrar la data interna de nuestra api
                const {Data} = guardarObjeto
                // hacemor un for of en el cual recorreremos  por nuestro div padre
                for (const iterator of Data) {
                        // filtramos que el id capturado de target sea igual al de category de nuestro producto de la base de datos 
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
        // capturamos la caja de texto del id buscador para poder utilizarlo
        $("#buscador").autocomplete({
                source:  (request, response) => {
                        // destructuramos la data de nuesto objetos de la api
                        const {Data} = guardarObjeto
                        // transformamos en mayuscula todo lo escrito de nuestra caja de texto
                        const mayuscula = request.term.toUpperCase();
                        // creamos un arreglo para guardar los resultados
                        arr=[];
                        for (const iterator of Data) {
                                // hacemos un recorrido a toda la data y hacemos que los nombres de los productos 
                                // sean todos con mayusculas para evitar problemas de escritura
                                // acto seguido nos buscara con indexOf realiza la llamada, de la primera ocurrencia del valor especificado
                                let posicion = iterator.name.toUpperCase().indexOf(mayuscula);
                                // en caso de que encuentre ocurrencias entra y me gaurda en un arr
                                if(posicion !== -1){
                                        arr.push(iterator.name)
                                } 
                        }
                        // al finalizar el for enviaremos todo el arreglo con los nombres encontrados con la similitud
                        response(arr)
                },
                //demora en que se procesa la busqueda del autocompletado
                delay: 500,
                //desde la tercera letra se mostrara la lista de datos
                minLength: 3,
            });
        
        // agregamos un evento click con el id btnbuscar (este boton va de la mano con el input de arriba)
        $("#btnbuscar").on("click",()=>{
                // destructuramos la data de nuesto objetos de la api
                const {Data} = guardarObjeto
                // reseteamos el html cuando se active para que no se monten los resultados
                $("#divpadre").html("")
                for (const iterator of Data) {
                        // a nuestro nombre del producto le preguntamos si es igual al valor del input buscador
                        if(iterator.name == $("#buscador").val()){
                                // en caso de ser iguales nos busca todos los productos con ese nombre 
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
                // finalmente reseteamos el input para seguir utilizando si gustamos
                $("#buscador").val("");  
        })
          
});



