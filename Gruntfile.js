require('amd-ish');

module.exports = function (grunt) {
    grunt.initConfig({
        jasmine_node: {
            specNameMatcher: "_spec", // load only specs containing specNameMatcher
            projectRoot: ".",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath: "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.registerTask('default', 'jasmine_node');
}