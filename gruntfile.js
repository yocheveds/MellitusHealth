module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/devextreme/',
                    src: ['css/**', 'js/*.js', 'js/localization/**', 'layouts/**'],
                    dest: 'www/'
                },
                {
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: ['**/jquery.min.js'],
                    dest: 'www/js/',
                    rename: function(dest, matchedSrcPath) {
                        return dest + 'jquery-2.2.3.min.js';
                    }
                },
                {
                    expand: true,
                    cwd: 'bower_components/knockout/dist/',
                    src: ['knockout.js'],
                    dest: 'www/js/',
                    rename: function(dest, matchedSrcPath) {
                        return dest + 'knockout-3.4.0.js';
                    }
                },
                {
                    expand: true,
                    cwd: 'bower_components/jszip/dist/',
                    src: ['**/*.js'],
                    dest: 'www/js/'
                },
                {
                    expand: true,
                    cwd: 'bower_components/globalize/lib/',
                    src: ['globalize.js'],
                    dest: 'www/js/',
                    rename: function(dest, matchedSrcPath) {
                        return dest + 'globalize.min.js';
                    }
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('UpdateDevExtreme', 'copy');
};