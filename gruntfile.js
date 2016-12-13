module.exports = function(grunt) {
	// show time it takes for each task
	require('time-grunt-nowatch')(grunt);

	/**
	 * path configuration
	 */
	var paths = {
		less: {},
		js: {},
		fonts: {},
		assets: {},
		html: {},
		browserSync: {},
		watch: {},
	};
	paths.less = {
		src: 'src/less/app.less',
		dest: 'build/css/app.min.css',
		watch: ['src/**/*.less']
	};
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
	paths.markdown = {
		expand: true,
		src: 'src/**/*.md',
		dest: '.temp/',
		ext: '.md.html',
		rename: function (dest, src) {
			return dest + src.replace('src/', '');
		}
	};
	paths.js.templates = {
		src: [
			'src/**/*.tpl.html',
			'.temp/**/*.md.html',
		],
		dest: 'build/js/templates.js',
		options: {
			module: 'cs2',
			url: function (url) {
				return url.replace('src/', '').replace('.temp/', '').replace('.md.html', '.tpl.html');
			},
			htmlmin: {
				collapseWhitespace: true,
				collapseBooleanAttributes: true
			}
		},
		watch: ['src/**/*.tpl.html', 'src/**/*.md']
	};
	paths.js.app = {
		src: [
			// app js (angular)
			'src/app/app.js',
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
	paths.html = {
		cwd: 'src/',
		expand: true,
		src: [
			// '*.html'
			'index.html'
		],
		dest: 'build/',
		watch: ['src/index.html']
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
			startPath: '/#/',
			port: 8080,
			browser: '/Applications/Google Chrome.app'
		}
	};

	// paths.init() is to apply config properties programatically
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
		app: paths.less
	};
	/** concatenate files */
	taskConfig.concat = {
		options: {
			separator: ';',
		},
		vendor: paths.js.vendor,
	};
	/** markdown to html (then to templates) */
	taskConfig.markdownit = {
		all: {
			options: {
				highlightjs: true,
				html: true,
				plugins: {
					'markdown-it-anchor': {
						level: 1
					},
					'markdown-it-table-of-contents': {
						includeLevel: [2,3],
						containerClass: 'toc-test',
					},
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
			files: [paths.markdown],
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
		dev: {
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
		html: paths.html
	};
	/** serve it up */
	taskConfig.browserSync = {
		dev: paths.browserSync
	};
	/** watch files for changes and build incrementally */
	taskConfig.watch = {
		css: {
			files: paths.less.watch,
			tasks: ['less'],
			options: {
				spawn: false
			}
		},
		html: {
			files: paths.html.watch,
			tasks: ['newer:copy:html'],
			options: {
				spawn: false
			}
		},
	};
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
	 * default tasks (to be registered)
	 */
	var tasks = {
		default: ['dev'],
		dev: [
			'clean:temp',
			'clean:dev',
			// js
			'newer:markdownit',
			'newer:ngtemplates',
			'newer:concat:vendor',
			'newer:ngAnnotate:dev',
			// css
			'less',
			// copy stuff
			'newer:copy',
		],
		prod: [
			'newer:uglify:prod',
			'newer:replace:prod',
			'clean:prod'
		],
		deploy: [
			'dev',
			'prod',
			'ghpages'
		],
		serve: ['browserSync', 'watch']
	};


	/**
	 * task modifications / variations (passed as CLI args)
	 */
	var mode = 'DEVELOPMENT';
	// --prod or -P flag vs default (dev)
	if (grunt.cli.tasks[0] === 'deploy') {
		mode = 'DEPLOY';
		// --nobuild or -N
		if (grunt.option('nobuild') || grunt.option('N')) {
			mode: 'DEPLOY, NO BUILD'
			tasks.deploy = ['deploy'];
		}
	} else if (grunt.option('prod') || grunt.option('P')) {
		mode = 'PRODUCTION';
		// update watchers for prod
		taskConfig.watch.js = {
			files: [
				paths.js.vendor.watch,
				paths.js.app.watch,
				paths.js.templates.watch,
			],
			tasks: ['newer:concat:vendor', 'newer:ngtemplates', 'newer:ngAnnotate:dev', 'uglify:prod'],
			options: {
				spawn: false
			}
		};
		// add prod tasks
		tasks.default.push('prod');
	} else {
		// update watchers for dev
		taskConfig.watch.templates = {
			files: paths.js.templates.watch,
			tasks: ['newer:markdownit', 'newer:ngtemplates'],
			options: {
				spawn: false
			}
		};
		taskConfig.watch.vendorjs = {
			files: paths.js.vendor.watch,
			tasks: ['newer:concat:vendor'],
			options: {
				spawn: false
			}
		};
		taskConfig.watch.appjs = {
			files: paths.js.app.watch,
			tasks: ['newer:ngAnnotate:dev'],
			options: {
				spawn: false
			}
		};
	}
	// --build or -B: build only
	if (grunt.option('build') || grunt.option('B')) {
		mode += ', BUILD-ONLY';
	} else if (grunt.cli.tasks[0] !== 'deploy') {
		tasks.default.push('serve');
	}

	// log mode to console
	grunt.log.write('Running in [%s] mode (%s)...\n', mode, grunt.cli.tasks[0] === 'deploy' ? 'dev,prod,deploy' : tasks.default);


	// init grunt config
	grunt.initConfig(taskConfig);

	// on watch event
	// grunt.event.on('watch', function (action, filepath) {
		// grunt.config('copy.assets.src', filepath.replace('src/', ''));
		// grunt.config('copy.js.src', filepath.replace('src/', ''));
		// grunt.config('copy.html.src', filepath.replace('src/', ''));
	// });

	// gh-pages task
	grunt.registerTask('ghpages', 'deploys to gh-pages', function () {
		grunt.log.write('Deploying to github pages...');
		var ghpages = require('gh-pages');
		var path = require('path');
		ghpages.publish(path.join(__dirname, 'build'), function (error) {
			if (error) {
				grunt.log.error('Error running `gh-pages` task: ', error);
			}
		});
	})

	// grunt plugins
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-markdown-it');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-replace');

	// default task
	grunt.registerTask('default', tasks.default);

	// dev build task
	grunt.registerTask('dev', tasks.dev);

	// prepare for production
	grunt.registerTask('prod', tasks.prod);

	// serve task
	grunt.registerTask('serve', tasks.serve);

	// deploy to gh-pages task
	grunt.registerTask('deploy', tasks.deploy);
};
