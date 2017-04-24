module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Grunfile.js', 'src/**/*.js']
        },

        // concatenate multiple js files into single
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n'
            },
            dist: {
                // the files to concatenate
                src: ['src/js/*.js'],
                // the location of the resulting JS file
                dest: 'dist/main.js'
            }
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/main.min.js': 'dist/main.js'
                }
            }
        },

        compass: { // Task
            compile: { // Target
                options: { // Target options
                    sassDir: 'src/scss',
                    specify: 'src/scss/*.scss',
                    cssDir: 'dist'
                }
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            build: {
                files: {
                    'dist/style.min.css': 'dist/style.css'
                }
            }
        },

        // configure watch to auto update ------------------------------------------
        watch: {
            stylesheets: {
                files: ['src/scss/*.scss'],
                tasks: ['compass', 'cssmin']
            },
            scripts: {
                files: 'src/js/*.js',
                tasks: ['jshint', 'concat', 'uglify']
            },
            livereload: {
                options: { livereload: true },
                files: 'src/**/*'
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001
                }
            }
        },

        custom: {
            hello: 'hello world',
            foo: [1, 2, 3],
            bar: false
        },
        imagemin: { // Task
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable no of properties
                    cwd: 'src', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'dist/' // Destination path prefix
                }]
            }
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('hello', function() {
        grunt.log.writeln('Hello World!');
    });
    grunt.registerMultiTask('custom', 'custom task to log stuff', function() {
        grunt.log.writeln(this.target + ': ' + this.data);
    });
    grunt.registerTask('default', ['connect', 'jshint', 'concat', 'uglify', 'compass', 'cssmin', 'imagemin', 'watch']);
};
