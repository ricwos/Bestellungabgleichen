/* Tesseract-Worker mit eingebetteten deutschen Sprachdaten.
   Alles bleibt auf dem Gerät: die Sprachdaten kommen aus deu-data.js,
   nicht aus dem Netz. */
importScripts('deu-data.js');
(function () {
  var realFetch = self.fetch ? self.fetch.bind(self) : null;
  var bytes = null;
  self.fetch = function (url, opts) {
    if (String(url).indexOf('deu.traineddata') !== -1) {
      if (!bytes) {
        var bin = atob(self.DEU_TRAINEDDATA_GZ_B64);
        bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        self.DEU_TRAINEDDATA_GZ_B64 = null;
      }
      return Promise.resolve(new Response(bytes.slice(0), { status: 200 }));
    }
    return realFetch ? realFetch(url, opts) : Promise.reject(new Error('offline'));
  };
})();
importScripts('worker.min.js');
