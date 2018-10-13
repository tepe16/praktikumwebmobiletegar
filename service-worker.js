(function() {
  'use strict';

  // TODO 2.1 - Cache static assets on install
	  	var CACHE_NAME = 'elektronik';
		var urlsToCache = [
		'.',
		'index.html',
		'cover_bg_1.jpg',
		'app/index.html',
		'app/admin/css/materialize.css',
		'app/admin/js/materialize.js',
		'app/css/nivo-slider.css',
		'app/js/jquery.tools.min.js',
		'app/contact.html',
		'app/img/demo/xi2.jpg',
		'app/img/demo/xi3.jpg',
		'app/img/demo/xi4a.jpg',
		'app/img/demo/xi5.jpg',
		'app/img/demo/xinot5.jpg',
		'app/css/style.css'
		];
		self.addEventListener('install', function(event) {
		event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
		return cache.addAll(urlsToCache);
		})
		);
		});
	  // TODO 2.2 - Fetch from the cache
		self.addEventListener('fetch', function(event) {
		event.respondWith(
		caches.match(event.request)
		.then(function(response) {
		return response || fetchAndCache(event.request);
		})
		);
		});
		function fetchAndCache(url) {
		return fetch(url)
		.then(function(response) {
		// Check if we received a valid response
		if (!response.ok) {
		throw Error(response.statusText);
		}
		return caches.open(CACHE_NAME)
		.then(function(cache) {
		cache.put(url, response.clone());
		return response;
		});
		})
		
		}
})();
