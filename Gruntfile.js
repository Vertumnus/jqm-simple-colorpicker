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
      },
      karma: {
         options: {
            configFile: 'karma.conf.js'
         },
         test: {},
         coverage: {
            browsers: ['Chrome'],
            preprocessors: {
               'src/*.js': ['coverage'],
               'test/*.auto.html': ['html2js'],
               '**/*.less': ['less']
            },
            reporters: ['progress', 'coverage'],
            coverageReporter: {
               type: 'lcov',
               dir: 'coverage/'
            }
         }
      },
      coveralls: {
         io: {
            src: 'coverage/*/*.info'
         }
      }
   })
   
   grunt.loadNpmTasks('grunt-contrib-less')
   grunt.loadNpmTasks('grunt-contrib-uglify')
   grunt.loadNpmTasks('grunt-contrib-jshint')
   grunt.loadNpmTasks('grunt-npm-command')
   grunt.loadNpmTasks('grunt-karma')
   grunt.loadNpmTasks('grunt-coveralls')
   
   grunt.registerTask('check', ['jshint'])
   grunt.registerTask('test', ['karma:test'])
   grunt.registerTask('coverage', ['karma:coverage'])
   grunt.registerTask('build', ['check', 'coverage', 'less', 'uglify'])
   grunt.registerTask('publish', ['build', 'coveralls', 'npm-command:publish'])
}
