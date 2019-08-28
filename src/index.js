(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    // define(['b'], factory);
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    // module.exports = factory(require('b'));
    module.exports = factory('node');
  } else {
    // Browser globals (root is window)
    // root.returnExports = factory(root.b);
    root.returnExports = factory('browser');
  }
}(this, function (environment) {
  environment = environment || 'node';
  // attach properties to the exports object to define
  // the exported module properties.

  // var PATH_SERVER = 'https://social-selectors.itwcreativeworks.com/module/';
  var PATH_SERVER = 'https://cdn.jsdelivr.net/npm/social-selectors/module/libraries/';
  var PATH_LOCAL = './libraries/';

  // if ((typeof window !== 'undefined') && (window.XMLHttpRequest || XMLHttpRequest || ActiveXObject)) {
  //   environment = 'browser';
  // }
  // if (environment == 'browser') {
  //   registerName();
  // }
  //
  // function registerName() {
  //   // console.log('Registered slapform to window!');
  //   try {
  //     window.SocialSelectors = SocialSelectors;
  //   } catch (e) {
  //   }
  // }

  function SocialSelectors(options) {
    this.library = {};
    this.error = false;
    this.options = options || {};
  };

  SocialSelectors.prototype.load = function(payload) {
    // console.log('$$$ LOAD');

    payload = payload || {};
    payload.debug = typeof payload.debug !== 'undefined' ? typeof payload.debug : false;
    payload.environment = payload.environment || environment || 'browser';
    payload.location = payload.location || 'local';
    payload.library = payload.library || '';
    payload.device = payload.device || 'main';
    payload.path = payload.path || ''; // Overwrite existing hardcoded paths
    if (payload.cacheBreaker === true) {
      payload.cacheBreaker = '?cb=' + Date.now();
    } else if (typeof payload.cacheBreaker !== 'undefined') {
      payload.cacheBreaker = '?cb=' + payload.cacheBreaker;
    } else {
      payload.cacheBreaker = '';
    }

    var This = this;

    var workingPath = '';
    This.library = {};
    This.error = false;

    if (payload.environment == 'browser') {

    } else if (payload.environment == 'node') {
      // console.log('$$$ NODE');
      workingPath = (payload.location == 'local') ? PATH_LOCAL : PATH_SERVER;
      workingPath = (payload.path) ? payload.path : workingPath;
      workingPath = workingPath + payload.library + '/' + payload.device + '.json' + payload.cacheBreaker;
      if (payload.debug) {
        console.log('Working path = ', workingPath);
      }

      return new Promise(function(resolve, reject) {
        if (payload.location == 'local') {
          // console.log('$$$ LOCAL');
          try {
            This.library = require(workingPath);
            This.library = (typeof This.library === 'string') ? JSON.parse(This.library) : This.library;
            This.error = false;
            resolve(This.library);
          } catch (e) {
            This.library = e;
            This.error = e;
            reject(e);
          }
        } else if (payload.location == 'hosted') {
          var https = require('https');
          https.get(workingPath, function(res) {
            // console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);

            res.on('data', function(data) {
              // process.stdout.write(d);
              // console.log('data', data);
              var processed = data.toString();
              // console.log('data.toString()', processed);
              // console.log('JSON.parse', JSON.parse(processed));

              try {
                This.library = JSON.parse(processed);
                This.error = false;
                resolve(This.library);
              } catch (e) {
                This.library = e;
                This.error = e;
                console.error(e);
                reject(e);
              }
            });

          }).on('error', function(e) {
            This.library = e;
            This.error = e;
            console.error(e);
            reject(e);
          });
        }
      });

    }

  }

  SocialSelectors.prototype.get = function(path, def) {
    var This = this;
    var response = def || '';
    var obj = This.library || {};

    if (This.error) {
      return response;
    }

    var fullPath = (path || '')
      .replace(/\[/g, '.')
      .replace(/]/g, '')
      .split('.')
      .filter(Boolean);

    return revive(fullPath.every(everyFunc) ? obj : def);

    function everyFunc(step) {
      return !(step && (obj = obj[step]) === undefined);
    }

  }

  function revive(value) {
    // logic from: http://ovaraksin.blogspot.com/2013/10/pass-javascript-function-via-json.html
    return (value && (typeof value === 'string') && value.indexOf("function") === 0)
      ? new Function('return ' + value)()
      : value;
  }

  return SocialSelectors; // Enable if using UMD
  // module.exports = Slapform; // Enable if using regular module.exports
}));
