/**
 * @TODO:
 *     - src to build?
 *     - grunt task for less/css
 *     - grunt task for js
 *     - organize files by components (8-1)
 *         - change template .html files to .tpl.html
 *         - move src/vendor to vendor/
 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /** less pre-compiler */
        less: {
            app: {
                options: {
                    // compress: true,
                    // sourceMap: true,
                    // sourceMapFilename: 'src/css/app.css.min.map',
                    // sourceMapBasepath: 'build/css',
                    plugins: [
                        new (require('less-plugin-autoprefix'))({ browsers: ['last 2 versions', '> 1%'] }),
                        new (require('less-plugin-clean-css'))()
                    ]
                },
                files: {
                    'src/css/app.min.css': 'src/less/app.less',
                }
            }
        },
        /** copy stuff as needed */
        copy: {
            fonts: {
                files: [
                    {
                        src: [
                            'src/vendors/bower_components/material-design-iconic-font/dist/fonts/**/*'
                        ],
                        dest: 'src/fonts/',
                        flatten: true,
                        expand: true,
                        filter: 'isFile',
                        cwd: '.',
                        nonull: true
                    }
                ]
            }
        },
        /** concatenate & register angular templates */
        ngtemplates: {
          materialAdmin: {
            src: ['src/template/**.html', 'src/template/**/**.html'],
            dest: 'src/js/templates.js',
            options: {
              htmlmin: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true
              }
            }
          }
        },
        /** serve it up */
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'src/assets/*.css',
                        'src/*.js',
                        'src/src/**/*.js',
                        'src/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: 'src',
                    port: 8080
                }
            }
        },
        /** watch files for changes and build incrementally */
        watch: {
            a: {
                files: ['src/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            b: {
                files: ['src/template/**/*.html'], // which files to watch
                tasks: ['ngtemplates'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', [
        // js
        'ngtemplates',
        // css
        'less',
        // copy stuff
        'copy',
        // serve
        'browserSync',
        'watch'
    ]);

};
