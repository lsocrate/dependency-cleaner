'use strict';

var fs = require('fs')
var detective = require('detective')
var readdirp = require('readdirp')

var requisitions = []

function processFile (file) {
  fs.readFile(file.fullPath, function (err, data) {
    if (err) return
    var script = data.toString()
    requisitions = requisitions.concat(detective(script))
  });
}


module.exports = function (dir, fileFilter, callback) {
  readdirp({root: dir, fileFilter: fileFilter}, processFile,
    function allProcessed (err, res) {
      if (err) return callback(err)

      var uniquePackageRequisitions = requisitions.filter(function (reqStr, i, reqs) {
        return reqStr.charAt(0) != '.' && reqs.indexOf(reqStr) == i
      })

      fs.readFile(dir + '/package.json', function (err, data) {
        if (err) return callback(err)

        var dependencies = {
          used: [],
          unused: []
        }

        var packageJSON = JSON.parse(data.toString())
        Object.keys(packageJSON.dependencies).forEach(function (dependency) {
          if (uniquePackageRequisitions.indexOf(dependency) == -1) {
            dependencies.unused.push(dependency)
          } else {
            dependencies.used.push(dependency)
          }
        })

        if (typeof callback == 'function') return callback(null, dependencies)
      })
    }
  )
}
