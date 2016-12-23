module.exports = function(grunt) {
	/**
	 * flags
	 */
	var flags = {};
		flags.task = grunt.cli.tasks[0] || 'dev';
		flags.isProd = flags.task === 'prod';

	/**
	 * load grunt plugins
	 */
	// show time it takes for each task
	require('time-grunt-nowatch')(grunt);
	// auto plugin lazy loader
	require('jit-grunt')(grunt, {
		includereplace: 'grunt-include-replace',
		markdownit: 'grunt-markdown-it',
		htmlhintplus: 'grunt-htmlhint-plus',
		ngtemplates: 'grunt-angular-templates'
	});


	/**
	 * path configuration
	 */
	var paths = {};
		paths.less = {
			app: {
				src: ['src/app.less'],
				dest: 'build/css/app.min.css',
			},
			watch: ['src/**/*.less']
		};
		paths.html = {
			index: {
				src: 'src/app.html',
				dest: 'build/index.html',
			},
			watch: ['src/index.html']
		};
		paths.markdown = {
			app: {
				expand: true,
				src: 'src/**/*.html.md',
				dest: '.temp/',
				rename: function (dest, src) {
					return dest + src.replace('src/', '');
				}
			},
			temp: {
				expand: true,
				src: '.temp/**/*.html.md',
			}
		};
		paths.js = {};
		paths.js.vendor = {
			src: [
				// jquery
				'vendors/jquery/dist/jquery.min.js',
				// angular
				'vendors/angular/angular.min.js',
				'vendors/angular-ui-router/release/angular-ui-router.min.js',
				// other
				'vendors/highlightjs/highlight.pack.min.js',
			],
			dest: 'build/js/vendor.js'
		};
		paths.js.templates = {
			src: [
				'src/**/*.tpl.html',
				'.temp/**/*.html.md',
			],
			dest: 'build/js/templates.js',
			options: {
				module: 'cs2',
				url: function (url) {
					return url.replace('src/', '').replace('.temp/', '');
				},
				htmlmin: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true
				}
			},
			watch: ['src/**/*.tpl.html', 'src/**/*.md', '*.md']
		};
		paths.js.app = {
			src: [
				// app js (angular)
				'src/app.js',
				'src/**/*.js',
			],
			dest: 'build/js/app.annotated.js',
			watch: ['src/**/*.js']
		};
		paths.js.prod = {
			src: [
				paths.js.vendor.dest,
				paths.js.app.dest,
				paths.js.templates.dest,
			],
			dest: 'build/js/app.min.js'
		};
		paths.fonts = {
			cwd: '.',
			flatten: true,
			expand: true,
			src: [
				'vendors/material-design-iconic-font/dist/fonts/**/*',
				'vendors/roboto-fontface/fonts/Roboto/Roboto-Light.*',
				'vendors/roboto-fontface/fonts/Roboto/Roboto-Regular.*',
				'vendors/roboto-fontface/fonts/Roboto/Roboto-Medium.*',
				'vendors/roboto-fontface/fonts/Roboto/Roboto-Bold.*'
			],
			dest: 'build/fonts/'
		};
		paths.assets = {
			expand: true,
			cwd: 'assets/',
			src: ['**/*'],
			dest: 'build/assets/'
		};
		paths.browserSync = {
			bsFiles: {
				src: [
					'build/css/*.css',
					'build/js/*.js',
					'build/**/*.html',
					'build/fonts/**/*',
				]
			},
			options: {
				watchTask: true,
				server: 'build',
				port: 8080
			}
		};

		// paths.init() is to apply certain config properties programatically
		paths.init = function () {
			paths.js.vendor.watch = paths.js.vendor.src;
		};
		paths.init();


	/**
	 * task configuration
	 */
	var taskConfig = {};
		/** clean up old stuff */
		taskConfig.clean = {
			dev: 'build',
			prod: paths.js.prod.src,
			temp: '.temp'
		};
		/** less pre-compiler */
		taskConfig.less = {
			options: {
				ieCompat: false,
				paths: function (srcPath) {
					return [srcPath, 'src'];
				},
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
			app: paths.less.app
		};
		/** concatenate files */
		taskConfig.concat = {
			options: {
				separator: ';',
			},
			vendor: paths.js.vendor
		};
		/** process includes */
		taskConfig.includereplace = {
			markdown: {
				files: [paths.markdown.app],
				options: {
					globals: {},
					prefix: '@@',
					suffix: '',
					includesDir: 'src/',
					// docroot: '.',
				}
			}
		};
		/** markdown to html (then to templates) */
		taskConfig.markdownit = {
			all: {
				files: [paths.markdown.temp],
				options: {
					highlightjs: true,
					html: true,
					plugins: {
						'markdown-it-anchor': {
							level: 1
						},
						'markdown-it-table-of-contents': {
							includeLevel: [2,3],
							containerClass: 'ds-toc',
						},
						'markdown-it-footnote': {},
						'markdown-it-attrs': {},
						'markdown-it-container': function (md) {
							var container = require('markdown-it-container');
							var tags = [];
							md.use(container, 'html', {
								validate: function (name) {
									return name.trim().match(/([a-z]+)?\(.*\)/);
								},
								render: function (tokens, idx) {
									if (tokens[idx].nesting === 1) {
										var info = tokens[idx].info.trim();
										var attrs = info.match(/\(.*\)/) ? info.match(/\(.*\)/)[0] : null;
										var tag = info.split('(')[0];
										tags.push(tag);
										return '<' + tag + (attrs ?  ' ' + attrs.slice(1, attrs.length - 1) : '') + '>\n';
									} else {
										var html = '</' + tags[tags.length - 1] + '>\n';
										tags.pop();
										return html;
									}
								}
							});
						}
					}
				},
			}
		};
		/** concatenate & register angular templates */
		taskConfig.ngtemplates = {
			app: paths.js.templates
		};
		/** properly inject angular dependencies */
		taskConfig.ngAnnotate = {
			options: {
				singleQuotes: true
			},
			app: {
				files: [paths.js.app]
			}
		};
		/** minify js */
		taskConfig.uglify = {
			options: {},
			prod: {
				files: [paths.js.prod]
			}
		};
		/** replace text patterns */
		taskConfig.replace = {
			prod: {
				options: {
					patterns: [
						{
							match: /<!-- JS:([^\s]+)[\s\S]*?END -->/g,
							replacement: '<script src="$1"></script>'
						},
						// {
						// 	match: /<!-- CSS:([^\s]+)[\s\S]*?END -->/g,
						// 	replacement: '<link href="$1" rel="stylesheet" />'
						// }
					]
				},
				files: [{
					expand: true,
					src: ['build/**/*.html']
				}]
			}
		};
		/** copy stuff to build directory */
		taskConfig.copy = {
			fonts: paths.fonts,
			assets: paths.assets,
			html: paths.html.index
		};
		/** jshint */
		taskConfig.jshint = {
			dev: ['src/**/*.js'],
			gruntfile: ['gruntfile.js'],
			options: {
	            jshintrc: '.jshintrc',
	            force: !flags.isProd
	        }
		};
		/** lesshint */
		taskConfig.lesshint = {
			prod: {
				src: paths.less.app.src,
				options: {
					lesshintrc: '.lesshintrc',
					force: flags.isProd
				}
			},
		};
		/** html hint */
		taskConfig.htmlhintplus = {
			prod: {
				src: paths.js.templates.src,
				options: {
					htmlhintrc: '.htmlhintrc',
					force: flags.isProd
				}
			}
		};
		/** serve it up */
		taskConfig.browserSync = {
			dev: paths.browserSync
		};
		/** watch files for changes and build incrementally */
		taskConfig.watch = {
			less: {
				files: paths.less.watch,
				tasks: ['lesshint', 'less'],
				options: {
					spawn: false
				}
			},
			html: {
				files: paths.html.watch,
				tasks: [(flags.isProd ? 'changed:' : '') + 'copy:html'],
				options: {
					spawn: false
				}
			},
			// test
			gruntfile: {
				files: ['gruntfile.js'],
				tasks: ['jshint:gruntfile', flags.isProd ? 'prod' : 'dev'],
				options: {
					spawn: false,
					reload: true
				}
			}
		};
		if (flags.isProd) {
			taskConfig.watch.js_prod = {
				files: [
					paths.js.vendor.watch,
					paths.js.app.watch,
					paths.js.templates.watch,
				],
				tasks: [
					'jshint',
					'ngtemplates',
					'concat',
					'ngAnnotate',
					'uglify',
				],
				options: {
					spawn: false
				}
			};
		} else {
			taskConfig.watch.js_vendor = {
				files: paths.js.vendor.watch,
				tasks: ['concat'],
				options: {
					spawn: false
				}
			};
			taskConfig.watch.js_templates = {
				files: paths.js.templates.watch,
				tasks: [
					'includereplace',
					'changed:markdownit',
					'changed:htmlhintplus',
					'changed:jshint:dev',
					'ngtemplates',
				],
				options: {
					spawn: false
				}
			};
			taskConfig.watch.js_app = {
				files: paths.js.app.watch,
				tasks: ['changed:jshint:dev', 'ngAnnotate'],
				options: {
					spawn: false
				}
			};
		}
		/** gh-pages deployment */
		taskConfig['gh-pages'] = {
			options: {
				base: 'build',
				message: grunt.option('msg') || '[Auto-generated commit]',
				tag: grunt.option('tag') || ''
			},
			src: ['build/**/*']
		};


	/**
	 * task modifications / variations (passed as CLI args)
	 */
	// log mode to console
	var mode = flags.task.toUpperCase();
	grunt.log.write('Running in [%s] mode...\n', mode);


	/**
	 * task definitions
	 */
	// init grunt config
	grunt.initConfig(taskConfig);

	// register tasks
	grunt.registerTask('default', ['dev', 'serve']);
	grunt.registerTask('deploy', ['prod', 'ghpages']);
	grunt.registerTask('serve', ['browserSync', 'watch']);
	grunt.registerTask('dev', [
		// clean old build
		'clean:temp',
		'clean:dev',
		// markdown templates
		'includereplace',
		'markdownit',
		// js / angular templates
		'htmlhintplus',
		'jshint',
		'ngtemplates',
		'concat',
		'ngAnnotate',
		// css
		'lesshint',
		'less',
		// assets
		'copy',
	]);
	grunt.registerTask('prod', [
		// clean old build
		'clean:temp',
		'clean:dev',
		// markdown templates
		'includereplace',
		'markdownit',
		// js / angular templates
		'htmlhintplus',
		'jshint',
		'ngtemplates',
		'concat',
		'ngAnnotate',
		'uglify',
		// css
		'lesshint',
		'less',
		// assets
		'copy',
		'replace',
		// clean up
		'clean:prod'
	]);
	// deploy to gh-pages task
	grunt.registerTask('ghpages', 'deploys to gh-pages', function () {
		grunt.log.write('Deploying to github pages...');
		var ghpages = require('gh-pages');
		var path = require('path');
		ghpages.publish(path.join(__dirname, 'build'), function (error) {
			if (error) {
				grunt.log.error('Error running `gh-pages` task: ', error);
			}
		});
	});
};
