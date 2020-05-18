(function (root, factory) {
  // https://github.com/umdjs/umd/blob/master/templates/returnExports.js
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  var PATH_SERVER = 'https://cdn.jsdelivr.net/npm/social-selectors/module/libraries/';
  var PATH_LOCAL = './libraries/';

  // var environment = (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]') ? 'node' : 'browser';
  var environment = 'node';

  function SocialSelectors(options) {
    this.loaded = false;
    this.library = {};
    this.error = false;
    this.options = options || {};
    this.options.debug = (typeof this.options.debug !== 'undefined') ? options.debug : false;
  };

  SocialSelectors.prototype.isLoaded = function(payload) {
    return this.loaded;
  };


  SocialSelectors.prototype.load = function(payload) {
    // console.log('$$$ LOAD');
    // this.extra = '7';
    payload = payload || {};
    payload.debug = typeof payload.debug !== 'undefined' ? typeof payload.debug : false;
    payload.environment = payload.environment || environment || 'node';
    payload.location = payload.location || 'local';
    payload.library = payload.library || '';
    payload.device = payload.device || 'main';
    payload.path = (payload.path || '') // Overwrite existing hardcoded paths
      .replace(/{{library}}/g, payload.library);
    if (payload.cacheBreaker === true) {
      payload.cacheBreaker = '?cb=' + Date.now();
    } else if (typeof payload.cacheBreaker !== 'undefined') {
      payload.cacheBreaker = '?cb=' + payload.cacheBreaker;
    } else {
      payload.cacheBreaker = '';
    }

    // options
    this.options.debug = payload.debug;

    var This = this;

    var workingPath = '';
    This.library = {};
    This.loaded = false;
    This.error = false;

    if (payload.environment == 'browser') {

    } else if (payload.environment == 'node') {
      // console.log('$$$ NODE');
      workingPath = (payload.location == 'local') ? PATH_LOCAL : PATH_SERVER;
      workingPath = workingPath + payload.library + '/' + payload.device + '.json';
      workingPath = (payload.path) ? payload.path : workingPath;
      workingPath += payload.cacheBreaker;

      if (This.options.debug) {
        console.log('Working path:', workingPath);
      }

      return new Promise(function(resolve, reject) {
        if (payload.location == 'local') {
          // console.log('$$$ LOCAL');
          try {
            This.library = require(workingPath);
            This.library = (typeof This.library === 'string') ? JSON.parse(This.library) : This.library;
            This.loaded = true;
            This.error = false;
            if (This.options.debug) {
              console.log('Loaded library:', This.library);
            }
            resolve(This.library);
          } catch (e) {
            This.library = e;
            This.loaded = false;
            This.error = e;
            reject(e);
          }
        } else if (payload.location == 'hosted') {
          var request = (workingPath.substring(0,5).indexOf('https') > -1) ? require('https') : require('http');
          var full = '';
          request.get(workingPath, function(res) {
            // console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);
            res.on('data', function(chunk) {
              full += chunk;
            });

            res.on('end', function() {
              try {
                This.library = JSON.parse(full.toString());
                This.loaded = true;
                This.error = false;
                if (This.options.debug) {
                  console.log('Loaded library:', This.library);
                }
                resolve(This.library);
              } catch (e) {
                This.library = e;
                This.loaded = false;
                This.error = e;
                console.error(e);
                reject(e);
              }
            });

            // res.on('data', function(data) {
            //   // process.stdout.write(d);
            //   // console.log('data', data);
            //   var processed = data.toString();
            //   // console.log('data.toString()', processed);
            //   // console.log('JSON.parse', JSON.parse(processed));
            //
            //   try {
            //     This.library = JSON.parse(processed);
            //     This.error = false;
            //     resolve(This.library);
            //   } catch (e) {
            //     This.library = e;
            //     This.error = e;
            //     console.error(e);
            //     reject(e);
            //   }
            // });

          }).on('error', function(e) {
            This.library = e;
            This.loaded = false;
            This.error = e;
            console.error(e);
            reject(e);
          });
        }
      });

    }

  }

  function prepareObject(value, overwrite) {
    return overwrite ? Object.assign(value, overwrite) : value;
  }

  SocialSelectors.prototype.get = function(path, def, options) {
    var This = this;
    var response = def || '';
    var obj = This.library || {};
    options = options || {};

    if (This.error) {
      return response;
    }

    var fullPath = (path || '')
      .replace(/\[/g, '.')
      .replace(/]/g, '')
      .split('.')
      .filter(Boolean);

    // return revive(fullPath.every(everyFunc) ? obj : def);
    var workingVal;

    if (fullPath.every(function (step) {
      return !(step && (obj = obj[step]) === undefined);
    })) {
      workingVal = obj;
    } else {
      workingVal = def;
      if (This.options.debug) {
        console.error("Could not access path, maybe it's incorrect?", path);
      }
    }

    // if ((typeof workingVal === 'string') && (workingVal.indexOf('$') == 0)) {
    //   if ((workingVal.indexOf('$get(') == 0)) {
    //     workingVal = This.get(workingVal.slice(0, -1).substring(5));
    //   } else if (workingVal.indexOf('$new(') == 0) {
    //
    //   }
    // }
    workingVal = typeof workingVal === 'object' ? prepareObject(workingVal, options.overwrite) : parseTriggers(This, workingVal);

    return revive(workingVal);

  }

  function revive(value) {
    // logic from: http://ovaraksin.blogspot.com/2013/10/pass-javascript-function-via-json.html
    if (value && (typeof value === 'string') && value.indexOf("function") === 0) {
      return new Function('return ' + value)();
    } else if (value && (typeof value === 'string') && value.indexOf("/") === 0) {
      // return new RegExp(value);
      var flags = value.replace(/.*\/([gimy]*)$/, '$1');
      var pattern = value.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
      return new RegExp(pattern, flags);
    } else {
      return value;
    }
    // return (value && (typeof value === 'string') && value.indexOf("function") === 0)
    //   ? new Function('return ' + value)()
    //   : value;
  }

  function parseTriggers(This, workingVal) {
    // console.log('parseTriggers', );

    var triggers = ['$get', '$new'];

    if (((typeof workingVal === 'string') && (triggers.some(function(v) { return workingVal.indexOf(v) >= 0; })))) {
      workingVal = ' ' + workingVal + ' ';
            // var occurances = (workingVal.match(/\$get\(/g) || []).length
            // for (var i = 0; i < occurances; i++) {
            //   // var workingValArray = workingVal.match(/(?<=\$get\().*?(?=\)\s)/)
            //   var workingValArray = workingVal.match(/(?=\$get\().*?(?=\)\s)/)
            //   console.log(workingValArray);
            //   workingVal = workingVal.replace('$get(' + workingValArray + ') ', This.get(workingValArray + '') + ' ');
            // }
      var valMatches = workingVal.match(/(?:\$get\().*?(?=\)\s)/g)
      for (var i = 0; i < valMatches.length; i++) {
        valMatches[i] = valMatches[i].replace('$get(', '');
        let fetched = This.get(valMatches[i]);
        if (typeof fetched !== 'string') {
          workingVal = fetched;
          break;
        }
        workingVal = workingVal.replace('$get(' + valMatches[i] + ') ', fetched + ' ');
      }
      workingVal = typeof workingVal === 'string' ? workingVal.trim() : workingVal;
    }
    return workingVal;

  }

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return SocialSelectors; // Enable if using UMD

}));
