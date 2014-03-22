// Generated on 2014-02-01 using generator-webapp 0.4.7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // configurable paths
  var nodeConfig = {
    listen: 8000,
    dev: 'app',
    src: 'src',
    dist: 'public',
    js: 'js',
    css: 'css',
    img: 'img',
    bower: 'bower_components',
    express:{
      port: 3000
    }
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    c: nodeConfig,
    // Project settings
    yeoman: {
      app: require('./bower.json').appPath || 'app'
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/views/{,*/}*.jade',
          '<%= yeoman.app %>/{,*/}*.js',
          '<%= yeoman.app %>/assets/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      },
      mochaTest: {
        files: [ 'test/{,*}*/*_spec.js' ],
        tasks: [ 'spec' ]
      },
      jade: {
        files: [ 'src/partials/{,*}*/*.jade' ],
        tasks: [ 'jade' ]
      },
      express: {
        files: [ 'app/{,*}*/*.js' ],
        tasks: [ 'compile', 'express:dev' ]
      },
      karmaSpec: {
        files: [ 'test/{,*}*/*.js', 'src/js/*.js' ],
        tasks: [ 'concat', 'karma:unit' ]
      },
    },
    watchMocha: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/views/{,*/}*.jade',
          '<%= yeoman.app %>/{,*/}*.js',
          '<%= yeoman.app %>/src/{,*/}*.js',
          '<%= yeoman.app %>/assets/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      },

    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '<%= yeoman.app %>/src/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= c.dist %>/<%= c.js %>/{,*/}*.js',
            '<%= c.dist %>/<%= c.css %>/{,*/}*.css'
          ]
        }]
      },
      server: '.tmp'
    },
    concat: {
      vendor: {
        src: [
          '<%= c.dist %>/<%= c.bower %>/lodash/dist/lodash.js',
          '<%= c.dist %>/<%= c.bower %>/angular/angular.js',
          '<%= c.dist %>/<%= c.bower %>/angular-route/angular-route.js',
          '<%= c.dist %>/<%= c.bower %>/angular-cookies/angular-cookies.js',
          '<%= c.dist %>/<%= c.bower %>/angular-resource/angular-resource.js',
          '<%= c.dist %>/<%= c.bower %>/angular-animate/angular-animate.js',
          '<%= c.dist %>/<%= c.bower %>/angular-growl/build/angular-growl.js',
          '<%= c.dist %>/<%= c.bower %>/angular-local-storage/angular-local-storage.js',
          '<%= c.dist %>/<%= c.bower %>/angular-bootstrap/ui-bootstrap.js',
          '<%= c.dist %>/<%= c.bower %>/angular-bootstrap/ui-bootstrap-tpls.js',
        ],
        dest: '<%= c.dist %>/<%= c.js %>/vendor.js',
      },
      js: {
        src: [
          '<%= c.src %>/<%= c.js %>/controllers.js',
          '<%= c.src %>/<%= c.js %>/directives.js',
          '<%= c.src %>/<%= c.js %>/filters.js',
          '<%= c.src %>/<%= c.js %>/services.js',
          '<%= c.src %>/<%= c.js %>/app.js'
        ],
        dest: '<%= c.dist %>/<%= c.js %>/<%= pkg.name %>.js',
      },
    },
    cssmin: {
      minify: {
        options: {
          banner: '\n/*!\n * Minified board css file \n * <%= grunt.template.today("yyyy-mm-dd") %>\n */\n'
        },
        expand: true,
        cwd: '<%= c.dist %>/<%= c.css %>/',
        src: ['main.css'],
        dest: '<%= c.dist %>/<%= c.css %>/',
        ext: '.min.css'
      },
      combine: {
        files: {
          '<%= c.dist %>/<%= c.css %>/<%= pkg.name %>.css': [
            '<%= c.dist %>/bower_components/bootstrap/dist/css/bootstrap.min.css',
            '<%= c.dist %>/bower_components/angular-growl/build/angular-growl.min.css',
            '<%= c.dist %>/<%= c.css %>/main.min.css'
          ]
        }
      },
    },
    uglify: {
      js: {
        options: {
          banner: '/! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        src: '<%= c.dist %>/<%= c.js %>/<%= pkg.name %>.js',
        dest: '<%= c.dist %>/<%= c.js %>/<%= pkg.name %>.min.js'
      },
      vendor: {
        src: '<%= c.dist %>/<%= c.js %>/vendor.js',
        dest: '<%= c.dist %>/<%= c.js %>/vendor.min.js'
      }
    },
    sass: {
      compile: {
        files: {
          '<%= c.dist %>/<%= c.css %>/main.css': [
            '<%= c.src %>/<%= c.css %>/main.scss'
          ]
        }
      }
    },
    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [ 'test/**/*_spec.js']
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'config/karma.conf.js',
        singleRun: true
      },
      e2e: {
        configFile: 'config/karma-e2e.conf.js',
        singleRun: true
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'src/partials/',
          src: '**/*.jade',
          dest: 'public/partials',
          ext: '.html'
        }]
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= c.express.port %>'
      }
    },
    express: {
      options: {
        port: nodeConfig.express.port
      },
      dev: {
        options: {
          script: 'app.js',
          node_env: 'development',
        }
      },
      prod: {
        options: {
          script: 'app.js',
          node_env: 'production',
          port: '80'
        }
      },
      test: {
        options: {
          script: 'app.js'
        }
      }
    }
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('serve', [
    //'mochaTest',
    'compile',
    'express:dev',
    'watch'
  ]);

  grunt.registerTask('serve-prod', [
    //'mochaTest',
    'compile',
    'express:prod'
  ]);

  grunt.registerTask('spec', ['mochaTest']);
  grunt.registerTask('compile', ['jshint', 'sass', 'concat', 'cssmin:minify', 'uglify', 'cssmin:combine', 'jade']);

  grunt.registerTask('karmaSpec', ['concat', 'karma:unit', 'watch']);

  grunt.registerTask('default', ['spec']);
};
