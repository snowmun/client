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
});

