/* 
 * Copyright Armin Junge
 */
module.exports = function (grunt) {
   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      less: {
         task: {
            options: {
               compress: true,
               banner: '/*! <%= pkg.name %> (C)<%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            files: {
               'bin/<%= pkg.name %>.min.css': ['src/*.less']
            }
         }
      },
      uglify: {
         options: {
            banner: '/*! <%= pkg.name %> (C)<%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
         },
         dist: {
            files: {
               'bin/<%= pkg.name %>.min.js': ['src/*.js']
            }
         }
      },
      jshint: {
         files: ['Gruntfile.js', 'src/*.js', 'test/*.js'],
         options: {
            esversion: 6,
            asi: true,
            maxcomplexity: 15,
            maxdepth: 3,
            maxparams: 5
         }
      },
      'npm-command': {
         publish: {
            options: {
               cmd: 'publish'
            }
         }
      }
   })
   
   grunt.loadNpmTasks('grunt-contrib-less')
   grunt.loadNpmTasks('grunt-contrib-uglify')
   grunt.loadNpmTasks('grunt-contrib-jshint')
   grunt.loadNpmTasks('grunt-npm-command')
   
   grunt.registerTask('check', ['jshint'])
   grunt.registerTask('publish', ['npm-command:publish'])
   grunt.registerTask('default', ['jshint', 'less', 'uglify'])
}
