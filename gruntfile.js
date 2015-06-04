module.exports = function(grunt) {
  const srcTypeScript = 'src/ts/**/{?,??,???,????,*[^.]????}.ts',
        tstTypeScript = 'src/ts/**/*.test.ts',
        tmpTypeScript = 'temp/<%= filename %>.temp.js',
        dstTypeScript = 'dist/raw/<%= filename %>.js';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    filename: 'algorithm',

    tslint: {
      source: {
        options: {
          configuration: grunt.file.readJSON("tslint.json")
        },
        files: {
          src: srcTypeScript
        }
      },
      test: {
        options: {
          configuration: grunt.file.readJSON("tslint.test.json")
        },
        files: {
          src: tstTypeScript
        }
      }
    },

    typescript: {
      options: {
        target: 'ES5',
        module: 'commonjs',
        sourceMap: false,
        comments: true
      },
      build: {
        src: [srcTypeScript, tstTypeScript],
        dest: tmpTypeScript
      },
      dist: {
        src: [srcTypeScript],
        dest: tmpTypeScript
      },
      watch: {
        options: {
          watch: {
            before: ['tslint'],
            after:['concat', 'shell:test'],
            atBegin: true
          }
        },
        src: [srcTypeScript, tstTypeScript],
        dest: tmpTypeScript
      }
    },

    concat: {
      ts: {
        options: {
          banner: [
            '/**',
            ' * ',
            ' * <%= pkg.name %>',
            ' * ',
            ' * @name <%= pkg.name %>',
            ' * @version <%= pkg.version %>',
            ' * ---',
            ' * @author <%= pkg.author %> <%= pkg.homepage %>',
            ' * @copyright 2015, <%= pkg.author %>',
            ' * @license <%= pkg.license %>',
            ' * ',
            ' */',
            '',
            '!new function(NAME, VERSION) {',
            '"use strict";',
            ''
          ].join('\n'),
          footer: [
            '}("<%= pkg.name %>", "<%= pkg.version %>");',
            ''
          ].join('\n'),
          separator: ''
        },
        src: tmpTypeScript,
        dest: dstTypeScript
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'src/ts/.d/', src: ['<%= filename %>.d.ts'], dest: 'dist/raw/' }
        ]
      }
    },

    clean: {
      temp: ['temp'],
      dest: ['dist']
    },

    watch: {
      options: {
        livereload: true
      },
      vagrant: {
        files: [srcTypeScript, tstTypeScript],
        tasks: process.platform === 'win32' ? [] : ['shell:vagrant']
      },
      test: {
        files: ['test/**/*.{js,ts}'],
        tasks: ['shell:test']
      }
    },

    shell: {
      options: {
        async: false,
        stdout: true,
        stderr: true
      },
      debug: {
        command: 'node-debug --node --harmony --exporse_gc --debug-brk node_modules/mocha/bin/_mocha'
      },
      test: {
        command: 'node --harmony --expose_gc node_modules/mocha/bin/_mocha'
      },
      coverage: {
        command: 'node --harmony --expose_gc node_modules/istanbul-harmony/lib/cli.js cover node_modules/mocha/bin/_mocha'
      },
      dev: {
        options: { async: true },
        command: 'grunt typescript:watch'
      },
      vagrant: {
        command: 'find src/ts -name *.ts -mtime -0.0002 | xargs -r -n 1 touch -a'
      }
    },

  });


  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell-spawn');

  grunt.registerTask('build', ['tslint:source', 'typescript:build', 'concat', 'copy']);
  grunt.registerTask('dev', ['shell:dev', 'watch']);
  grunt.registerTask('debug', ['build', 'shell:debug']);
  grunt.registerTask('test', ['build', 'shell:test']);
  grunt.registerTask('cov', ['build', 'shell:coverage']);
  grunt.registerTask('dist', ['clean', 'tslint:source', 'typescript:dist', 'concat', 'copy', 'clean:temp']);
};
