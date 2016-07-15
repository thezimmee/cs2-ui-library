module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /** clean up old stuff */
        clean: {
            build: 'build'
        },
        /** less pre-compiler */
        less: {
            app: {
                options: {
                    // compress: true,
                    // sourceMap: true,
                    // sourceMapFileInline: true,
                    // sourceMapFilename: 'app.min.css.map',
                    // sourceMapBasepath: 'build/css',
                    plugins: [
                        new (require('less-plugin-autoprefix'))({ browsers: ['last 2 versions', '> 1%'] }),
                        new (require('less-plugin-clean-css'))()
                    ]
                },
                files: {
                    'build/css/app.min.css': 'src/less/app.less',
                }
            }
        },
        /** copy stuff to build directory */
        copy: {
            fonts: {
                src: [
                    'src/vendors/bower_components/material-design-iconic-font/dist/fonts/**/*'
                ],
                dest: 'build/fonts/',
                flatten: true,
                expand: true,
                cwd: '.'
            },
            assets: {
                src: [
                    'fonts/**/*',
                    'img/**/*',
                    'data/**/*',
                    'media/**/*'
                ],
                cwd: 'src/',
                dest: 'build/',
                expand: true
            },
            js: {
                src: [
                    'js/**/*'
                ],
                cwd: 'src/',
                dest: 'build/',
                expand: true
            },
            vendor: {
                src: [
                    'vendors/**/*'
                ],
                cwd: '.',
                dest: 'build/'
            },
            views: {
                src: [
                    'views/**/*'
                ],
                cwd: 'src/',
                dest: 'build/',
                expand: true
            },
            html: {
                src: ['*.html'],
                cwd: 'src/',
                dest: 'build/',
                expand: true
            }
        },
        /** replace text strings (i.e., urls, etc.) */
        // replace: {
        //     templates: {
        //         src: 'build/js/templates.js',
        //         overwrite: true,
        //         replacements: [
        //             {
        //                 from: 'src/template/',
        //                 to: 'template/'
        //             }
        //         ]
        //     }
        // },
        /** concatenate & register angular templates */
        ngtemplates: {
            app: {
                cwd: 'src/',
                src: [
                    'template/**/*.html',
                    'components/**/*.tpl.html'
                ],
                dest: 'build/js/templates.js',
                options: {
                    module: 'cloudspark',
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
                        'build/css/*.css',
                        'build/js/*.js',
                        'build/**/*.html',
                        'build/data/**/*',
                        'build/fonts/**/*',
                        'build/img/**/*',
                        'build/media/**/*'
                    ]
                },
                options: {
                    watchTask: true,
                    server: 'build',
                    port: 8080
                }
            }
        },
        /** watch files for changes and build incrementally */
        watch: {
            css: {
                files: [
                    'src/less/**/*.less',
                    'src/components/**/*.less'
                ],
                tasks: ['less']
            },
            templates: {
                files: [
                    'src/template/**/*.html',
                    'src/components/**/*.tpl.html'
                ],
                tasks: ['ngtemplates']
            },
            js: {
                files: ['src/js/**/*'],
                tasks: ['copy:js'],
                options: {
                    spawn: false
                }
            },
            views: {
                files: ['src/views/**/*.html'],
                tasks: ['copy:views'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['src/*.html'],
                tasks: ['copy:html'],
                options: {
                    spawn: false
                }
            },
            assets: {
                files: ['<%= copy.assets.src %>'],
                tasks: ['copy:assets'],
                options: {
                    cwd: {
                        files: '<%= copy.assets.cwd %>'
                    },
                    spawn: false
                }
            }
        }
    });

    grunt.event.on('watch', function (action, filepath) {
        grunt.config('copy.assets.src', filepath.replace('src/', ''));
        grunt.config('copy.js.src', filepath.replace('src/', ''));
        grunt.config('copy.views.src', filepath.replace('src/', ''));
        grunt.config('copy.html.src', filepath.replace('src/', ''));
    });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');

    // Default task(s).
    grunt.registerTask('default', [
        'clean',
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
