
// Guardar en cache dinamico

function actualizaCacheDinamico(dynamicCache,req,res)
{

  if(res.ok){

     // La respuesta tiene data, almacenar en el cache
     return caches.open(dynamicCache).then( cache => {

      cache.put(req,res.clone())
      return res.clone()
       
     })
    
  }
  else
  {
    // Fallo el cache y fallo la red

    return res
      
  }  
}
