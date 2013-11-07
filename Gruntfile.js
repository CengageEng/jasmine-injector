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
                            deps: ['resolvers/requirejs-resolver']
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
        }
    });

    /* These plugins provide necessary tasks. */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    /* Register tasks. */
    grunt.registerTask('test', ['jshint', 'connect', 'jasmine']);
    grunt.registerTask('default', ['jsbeautifier', 'test']);
    grunt.registerTask('jasmine-server', ['jasmine::build', 'open', 'connect::keepalive']);
};
