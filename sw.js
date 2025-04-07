// imports

importScripts('js/libs/sw-utils.js')

const STATIC_CACHE = 'static-v3'
const DYNAMIC_CACHE = 'dynamic-v1'
const INMUTABLE_CACHE = 'inmutable-v1'

const APP_SHELL = [
    // '/',
    'index.html',
    'css/style.css', 
    'img/favicon.ico',
    './img/avatars/wolverine.jpg',
    './img/avatars/hulk.jpg',
    './img/avatars/thor.jpg',
    './img/avatars/spiderman.jpg',
    './img/avatars/ironman.jpg',
    './js/app.js',
    './js/libs/sw-utils.js'
]

const APP_SHELL_INMUTABLE = [

'https://fonts.googleapis.com/css?family=Quicksand:300,400',
'https://fonts.googleapis.com/css?family=Lato:400,300',
 'css/animate.css',
 'js/libs/jquery.js',
 'css/all.css'
]


 // 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' 

self.addEventListener('install', e => {

const cacheStatic = caches.open(STATIC_CACHE).then (cache => {
cache.addAll(APP_SHELL)
})
  
const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
cache.addAll(APP_SHELL_INMUTABLE)
})

e.waitUntil(Promise.all([cacheStatic,cacheInmutable]))
  
})


self.addEventListener('activate', e => {


const respuesta = caches.keys().then( keys => {

    keys.forEach( key => {

    if (!key.includes(STATIC_CACHE) && key.includes('static'))
    {
      return caches.delete(key)      
    }
     
    })
 })

e.waitUntil(respuesta)
  
} )


// Cache con Network Fallback

self.addEventListener('fetch', e => {


  //Tengo que verificar en el cache si existe la request
  //

  const respuesta = caches.match(e.request).then( res => {

    if (res) {

    return res
      
    }else

    {

    console.log(e.request.url)

    return fetch(e.request).then(newRes => {

        actualizaCacheDinamico(DYNAMIC_CACHE,e.request,newRes)
      
    })
      
    }

    
  })



  e.respondWith(respuesta)


  
})
