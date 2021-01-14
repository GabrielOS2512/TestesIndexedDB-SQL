  //Nome da Cache
  var cacheName = 'cachePWA';

  //O que sera iserido na cache
  var urlsToCache = [
    'index.php',
    'js/jquery.js',
    'js/dexie.js',
    'js/bd.js',
    'js/conexao.js',
    'css/bootstrap.css',
    'inserir.php',
    'favicon.ico',
    'manifest.json',
    'offline.html'
  ];

  self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open(cacheName)
        .then(function(cache) {
          console.log('|== Abriu Cache ==|');
          return cache.addAll(urlsToCache);
        })
    );
  });

// SW Ativar
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          }),
      );
    }),
  );
});

// self.addEventListener( 'activate', e => {
//
//     // Clean static cache
//     let cleaned = caches.keys().then( keys => {
//         keys.forEach( key => {
//             if ( key !== `static-${version}` && key.match('static-') ) {
//                 return caches.delete(key);
//             }
//         });
//     });
//     e.waitUntil(cleaned);
// });

// Estratégia Usada - Rede com fallback para Cache
const fallbackCache = (req) => {

    // Tentar pela Rede 1o
    return fetch(req).then( networkRes => {

        // Checar se a resposta foi ok, se não tenta a cache
        if( !networkRes.ok ) throw 'Fetch Error';

        // Atualiza a cache
        caches.open( `static-${version}` )
            .then( cache => cache.put( req, networkRes ) );

        // Retornar o clone da resposta da rede
        return networkRes.clone();
    })

    // Tentar pela cache
    .catch( err => caches.match(req) );
};

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request).catch(function () {
//       return caches.match(event.request);
//     }),
//   );
// });

//SW Fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
});

console.log("|--- SW Funcionando ---|");
