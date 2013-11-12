/*global module:false*/
module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        jsbeautifier: {
            files: '<%= jshint.files %>',
            options: {
                'js': {
                    'preserve_newlines': true,
                    'max_preserve_newlines': 2
                }
            }
        },
        connect: {
            jasmine: {
                options: {
                    port: 8890
                }
            }
        },
        open: {
            injector: {
                url: '<%= jasmine.options.host %><%= jasmine.injector.options.outfile %>'
            },
            requirejs: {
                url: '<%= jasmine.options.host %><%= jasmine.requirejs.options.outfile %>'
            }
        },
        jasmine: {
            options: {
                host: 'http://127.0.0.1:<%= connect.jasmine.options.port %>/',
                template: require('grunt-template-jasmine-requirejs')
            },
            injector: {
                options: {
                    outfile: 'Injector_SpecRunner.html',
                    specs: 'test/jasmine-injector-spec.js'
                }
            },
            requirejs: {
                options: {
                    outfile: 'Requirejs_SpecRunner.html',
                    specs: 'test/requirejs-resolver-spec.js',
                    templateOptions: {
                        requireConfig: {
                            /* Need to load resolver soon so it can listen for requirejs.onResourceLoad */
                            deps: ['jquery', 'resolvers/requirejs-resolver'],
                            paths: {
                                'jquery': 'test/lib/jquery/jquery'
                            }
                        }
                    }
                }
            }
        },
        jshint: {
            files: ['package.json', 'Gruntfile.js', '**/*.js', '!node_modules/**/*', '!test/lib/**/*'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'test/lib',
                    layout: 'byComponent',
                    verbose: true,
                    cleanTargetDir: true,
                    cleanBowerDir: true
                }
            }
        }
    });

    /* These plugins provide necessary tasks. */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-bower-task');

    /* Register tasks. */
    grunt.registerTask('test', ['jshint', 'bower:install', 'connect', 'jasmine']);
    grunt.registerTask('default', ['jsbeautifier', 'test']);
    grunt.registerTask('jasmine-server', ['bower:install', 'jasmine::build', 'open', 'connect::keepalive']);
};
