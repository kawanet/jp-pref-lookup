# Japan Prefecture Lookup

[![Build Status](https://travis-ci.org/kawanet/jp-pref-lookup.svg?branch=master)](https://travis-ci.org/kawanet/jp-pref-lookup) [![npm version](https://badge.fury.io/js/jp-pref-lookup.svg)](https://badge.fury.io/js/jp-pref-lookup)

- JIS X 0401: To−Do−Fu−Ken (Prefecture) Identification Code
- Lookup: 10km grid mesh reverse geocoding
- Standalone: [jp-pref-lookup.min.js](https://rawgit.com/kawanet/jp-pref-lookup/master/dist/jp-pref-lookup.min.js) is just 20KB minified, 6KB gzipped

### Synopsis

```js
const Pref = require("jp-pref-lookup").Pref;

// by pair of latitude and longitude
console.log(Pref.lookup({lat: 35.68944, lng: 139.69167})); // => ["13"]

// by comma separated latitude and longitude
console.log(Pref.lookup({ll: "35.3606,138.7278"})); // => ["22", "19"]

// name for prefecture code
console.log(Pref.name("13")); // => "東京都"
console.log(Pref.name(27)); // => "大阪府"

// prefecture code for name
console.log(Pref.code("東京都")); // => "13"
console.log(Pref.code("大阪")); // => "27"
```

### Browser

- This works with [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) on Web browsers.

```html
<script src="jp-pref-lookup.min.js"></script>
<script>
  navigator.geolocation.getCurrentPosition(function(position) {
    var ll = position.coords.latitude + "," + position.coords.longitude;
    var array = Pref.lookup({ll: ll});
    var name = array && Pref.name(array[0]);
    alert(name);
  });
</script>
```

### GitHub

- [https://github.com/kawanet/jp-pref-lookup](https://github.com/kawanet/jp-pref-lookup)

### See Also

- [http://www.stat.go.jp/data/mesh/m_itiran.html](http://www.stat.go.jp/data/mesh/m_itiran.html)
- [http://kikakurui.com/x0/X0401-1973-01.html](http://kikakurui.com/x0/X0401-1973-01.html)
- [https://github.com/kawanet/jp-city-lookup](https://github.com/kawanet/jp-city-lookup)

### The MIT License (MIT)

Copyright (c) 2018 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
