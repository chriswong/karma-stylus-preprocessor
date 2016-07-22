var stylus = require('stylus'),
    path = require('path'),
    fs = require('fs');

var createStylusPreprocessor = function (args, config, logger, helper) {
  config = config || {};
  var defaultOptions = {
    compress: false,
    save: false
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var log = logger.create('preprocessor:stylus');

  var transformPath = args.transformPath || config.transformPath || function (filePath) {
    return filePath.replace(/\.styl$/, '.css');
  };

  var rendered = function (done, filePath, error, content) {
    if (error !== null && error !== undefined) {
      log.error(error.stack);
    } else {
      if (options.save) {
        var p = path.resolve(filePath.replace(/\/([\.a-zA-Z0-9\-\_]+).css$/, '/'));
        helper.mkdirIfNotExists(p, function () {
          var n = filePath.match(/[a-zA-Z\-\.\_]+.css$/).reverse()[0];
          fs.writeFile(path.join(p, n), content, 'utf-8', function (error) {
            if (error) {
              log.error("Error:%s", error);
            }
            done(content);
          });
        });
      } else {
        done(content);
      }
    }
  };

  return function (content, file, done) {
    file.path = transformPath(file.originalPath);

    try {
      stylus.render(content, options, rendered.bind(null, done, file.path));
    } catch (error) {
      log.error('%s\n  at %s', error.message, file.originalPath);
      return;
    }
  };
};

createStylusPreprocessor.$inject = ['args', 'config.stylusPreprocessor', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:stylus': ['factory', createStylusPreprocessor]
};
