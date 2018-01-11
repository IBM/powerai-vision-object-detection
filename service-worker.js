/* global self, caches, fetch */
'use strict'

var CACHE_NAME = 'powerai-vision-object-detection';

var urlstocache = [
  'css/index.css',
  'img/camera.png'
];

// install/cache page assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('cache opened')
        return cache.addAll(urlstocache)
      })
  )
});


// service worker activated, remove outdated cache
self.addEventListener('activate', function (event) {
  console.log('worker activated')
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          // filter old versioned keys
          return key !== CACHE_NAME
        }).map(function (key) {
          return caches.delete(key)
        })
      )
    })
  )
});
