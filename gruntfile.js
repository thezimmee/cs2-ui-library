module.exports = function(grunt) {
	/**
	 * flags
	 */
	var flags = {};
		flags.task = grunt.cli.tasks[0] || 'dev';
		flags.isProd = (flags.task === 'prod' || grunt.option('prod'));


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
	var _ = require('lodash');


	/**
	 * import global configuration
	 */
	var globals = require('./gruntfile.config.js');


	/**
	 * task configuration
	 */
	var taskConfig = {};
		/** clean up old stuff */
		taskConfig.clean = {
			build: 'build',
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
			app: {
				src: 'src/app.less',
				dest: 'build/css/app.min.css',
			}
		};
		/** process includes */
		taskConfig.includereplace = {
			md: {
				cwd: 'src/',
				expand: true,
				// @todo: try removing array from globs?
				src: '**/*.html.md',
				dest: '.temp/md/',
			},
			styles: {
				cwd: '.temp/style-guide/',
				expand: true,
				src: '**/*.html.md',
				dest: '.temp/md/',
			},
			options: {
				globals: globals.data,
				prefix: '@@',
				suffix: '',
				includesDir: 'src/',
				// docroot: '.',
				processIncludeContents: function (content, tplData, filepath) {
					// tplData.globals is a path for a property in globals.data (e.g., if tplData.globals === 'styles.bootstrap', this will grab globals.data.styles.bootstrap and merge it with the rest of tplData)
					if (tplData.globals) {
						var dataProperties = tplData.globals.split('/');
						var data = globals.data;
						for (var i = 0; i < dataProperties.length; i += 1) {
							data = data[dataProperties[i]];
						}
						// data = _.merge(tplData, data);
						content = _.template(content)(data);
					}
					return content;
				}
			}
		};
		/** markdown to html (then to templates) */
		taskConfig.markdownit = {
			md: {
				expand: true,
				src: '.temp/md/**/*.html.md',
				options: {
					highlightjs: true,
					html: true,
					plugins: {
						'markdown-it-anchor': {
							level: 1
						},
						'markdown-it-table-of-contents': {
							includeLevel: [2,3],
							containerClass: 'dss-toc',
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
		/** process templates */
		taskConfig.template = {
			options: {
				data: globals.data
			},
			md: {
				expand: true,
				cwd: '.temp/md/',
				src: '**/*.html.md',
				dest: '.temp/templates/'
			},
			html: {
				expand: true,
				cwd: 'src/',
				src: '**/*.tpl.html',
				dest: '.temp/templates/',
			},
			js: {
				expand: true,
				cwd: 'src/',
				src: [
					'app.js',
					'**/*.js',
					'!components/data/**/*.js'
				],
				dest: '.temp/app/'
			}
		};
		/** concatenate & register angular templates */
		taskConfig.ngtemplates = {
			app: {
				cwd: '.temp/templates',
				src: ['**/*.html.md', '**/*.tpl.html'],
				dest: '.temp/js/templates.js'
			},
			options: {
				module: 'cs2',
				htmlmin: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true
				}
			},
		};
		/** properly inject angular dependencies */
		taskConfig.ngAnnotate = {
			options: {
				singleQuotes: true
			},
			app: {
				src: ['.temp/app/app.js', '.temp/app/**/*.js'],
				dest: '.temp/js/app.annotated.js'
			}
		};
		/** concatenate files */
		taskConfig.concat = {
			options: {
				separator: ';',
			},
			dev: {
				src: [
					globals.vendorJs,
					'.temp/js/app.annotated.js',
					'.temp/js/templates.js'
				],
				dest: 'build/js/app.min.js'
			}
		};
		/** minify js */
		taskConfig.uglify = {
			options: {},
			prod: {
				expand: true,
				src: 'build/js/app.min.js'
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
					src: 'build/**/*.html'
				}]
			}
		};
		/** copy stuff to build directory */
		taskConfig.copy = {
			fonts: {
				cwd: '.',
				flatten: true,
				expand: true,
				src: globals.fonts,
				dest: 'build/fonts/'
			},
			assets: {
				expand: true,
				cwd: 'assets/',
				src: '**/*',
				dest: 'build/assets/'
			},
			index: {
				src: 'src/app.html',
				dest: 'build/index.html',
			}
		};
		/** jshint */
		taskConfig.jshint = {
			gruntfile: [
				'gruntfile.js',
				'gruntfile.config.js',
				'src/components/data/**/*.js'
			],
			dev: ['.temp/**/*.js'],
			options: {
				jshintrc: '.jshintrc',
				force: false
			}
		};
		/** lesshint */
		taskConfig.lesshint = {
			prod: {
				src: 'src/**/*.less',
				options: {
					lesshintrc: '.lesshintrc',
					force: false
				}
			},
		};
		/** html hint */
		taskConfig.htmlhintplus = {
			prod: {
				src: [
					'.temp/**/*.tpl.html',
					'.temp/**/*.html.md',
				],
			},
			options: {
				htmlhintrc: '.htmlhintrc',
				force: true
			}
		};
		/** serve it up */
		taskConfig.browserSync = {
			dev: {
				bsFiles: {
					src: [
						'build/css/*.css',
						'build/js/*.js',
						'build/*.html',
						'build/fonts/**/*',
					]
				},
				options: {
					watchTask: true,
					server: 'build',
					port: 8080
				}
			}
		};
		/** watch files for changes and build incrementally */
		taskConfig.watch = {
			less: {
				files: ['src/**/*.less'],
				// @todo: test with changed:
				tasks: ['lesshint', 'less'],
				options: {
					spawn: false
				}
			},
			index: {
				files: ['src/app.html'],
				tasks: ['copy:index'],
				options: {
					spawn: false
				}
			},
			md2temp: {
				files: ['src/**/*.html.md'],
				tasks: [
					'changed:includereplace',
					'changed:markdownit',
					'changed:template:md',
					'changed:htmlhintplus',
					'changed:jshint:dev',
					'ngtemplates',
					'concat:dev'
				],
				options: {
					spawn: false
				}
			},
			mdPartials2temp: {
				files: [
					'src/**/*.md',
					'*.md',
					'!src/**/*.html.md'
				],
				tasks: [
					'data',
					'styleguide',
					'includereplace',
					'markdownit:md',
					'template:md',
					'changed:htmlhintplus',
					'changed:jshint:dev',
					'ngtemplates',
					'ngAnnotate',
					'concat:dev'
				],
				options: {
					spawn: false
				}
			},
			html2templates: {
				files: ['src/**/*.tpl.html'],
				tasks: [
					'data',
					'changed:template:html',
					'changed:htmlhintplus',
					'changed:jshint:dev',
					'ngtemplates',
					'concat:dev'
				],
				options: {
					spawn: false
				}
			},
			js2templates: {
				files: ['src/**/*.js', '!src/components/data/**/*.js'],
				tasks: [
					'changed:template:js',
					'changed:htmlhintplus',
					'changed:jshint:dev',
					'ngAnnotate',
					'concat:dev'
				],
				options: {
					spawn: false
				}
			},
			data2temp: {
				files: [
					'gruntfile.js',
					'gruntfile.config.js',
					'src/components/data/**/*.js'
				],
				tasks: [
					'data',
					'changed:jshint:gruntfile',
					'styleguide',
					'includereplace',
					'markdownit',
					'template',
					'changed:htmlhintplus',
					'changed:jshint:dev',
					'ngtemplates',
					'ngAnnotate',
					'concat:dev',
				]
			},
		};
		// if production mode, add uglify to watchers
		if (flags.isProd) {
			taskConfig.watch.md2temp.tasks.push('uglify');
			taskConfig.watch.mdPartials2temp.tasks.push('uglify');
			taskConfig.watch.html2templates.tasks.push('uglify');
			taskConfig.watch.js2templates.tasks.push('uglify');
			taskConfig.watch.data2temp.tasks.push('uglify');
		}
		/** gh-pages deployment */
		taskConfig['gh-pages'] = {
			options: {
				base: 'build',
				message: grunt.option('msg') || '[Auto-generated commit]',
				tag: grunt.option('tag') || ''
			},
			src: 'build/**/*'
		};


	/**
	 * task modifications / variations (passed as CLI args)
	 */
	// log mode to console
	var task = flags.task.toUpperCase();
	var mode = flags.isProd ? 'PRODUCTION' : 'DEVELOPMENT';
	grunt.log.write('\nRunning [%s] in [%s] mode...\n', task, mode);


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
		// lint gruntfile
		'jshint:gruntfile',
		// clean old build
		'clean',
		// process markdown templates
		'styleguide',
		'includereplace',
		'markdownit',
		// process lodash templates
		'template',
		// js / angular templates
		'htmlhintplus',
		'jshint:dev',
		'ngtemplates',
		'ngAnnotate',
		'concat',
		// css
		'lesshint',
		'less',
		// assets
		'copy',
	]);
	grunt.registerTask('prod', [
		'dev',
		'uglify',
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
	// refresh data
	grunt.registerTask('data', function () {
		delete require.cache[require.resolve('./src/components/data/styles.js')];
		delete require.cache[require.resolve('./gruntfile.config.js')];
		globals = require('./gruntfile.config.js');
		// reset tasks that consume any data in globals
		grunt.config.set('includereplace.options.globals', globals.data);
		grunt.config.set('template.options.data', globals.data);
		grunt.config.set('copy.fonts.src', globals.data);
	});
	// create a file for each styleguide component with metadata from globals.data and append the component's content from /src/views/styles (if a file for the component exists)
	grunt.registerTask('styleguide', function () {
		// create vendor files
		_.each(globals.data.styles, function (style, key) {
			// transform classes from globals.data.styles
			if (style.classes) {
				_.each(style.classes, function (value, className) {
					if (typeof value === 'string') {
						style.classes[className] = {
							usage: value
						};
					}
					style.classes[className].name = className;
					// if it's a modifier, push to parent
					if (className.indexOf('--') > -1) {
						var parent = className.split('--')[0];
						if (!style.classes[parent].modifiers) {
							style.classes[parent].modifiers = [];
						}
						if (style.classes[parent].modifiers.indexOf(className) === -1) {
							style.classes[parent].modifiers.push(className);
						}
					}
				});
			}
			// if style.name doesn't exist already, use the file name
			style.name = style.name || (key[0].toUpperCase() + key.slice(1).toLowerCase()).replace(/-/g, ' ');
			// make sure style.related is an array
			if (typeof style.related === 'string') {
				style.related = [style.related];
			}
			// make sure certain properties exist
			style.intro = style.intro || '';
			style.content = style.content || '';
			// create style page
			// var content = '@@include(\'views/component-details/component-details.md\', {"globals": "styles/' + key + '"})\n\n';
			content = _.template(grunt.file.read('src/views/component-details/component-details.md'))(style);
			var files = grunt.file.expand('src/views/styles/_' + key + '.md');
			if (files.length) {
				_.each(files, function (filepath) {
					content += grunt.file.read(filepath);
				});
			} else {
				// if no file(s), add placeholder for "Examples" section
				content += '## Examples\n\nWe are working on adding live examples for this style block... stay tuned.';
			}
			grunt.file.write('.temp/style-guide/views/styles/' + key + '.html.md', content);
		});
	});
};
