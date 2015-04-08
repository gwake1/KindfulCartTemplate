module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uncss:{
      dist:{
        files:{
          'css/style.css': ['index.html'],
          'css/foundation.css': ['index.html'],
          'css/normalize.css': ['index.html']
        }
      }
    }
  })
  grunt.loadNpmTasks('grunt-uncss');
}
