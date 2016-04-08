/**
 * Grunt!
 * More to come soon!
 */
module.exports = function (grunt) {
  // Grunt task loaders for folder, npm and grunt-source tasks
  require('load-grunt-tasks')(grunt);

  // Global Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ignores: ['!**/vendor/**',
      '!**/node_modules/**',
      '!**/.vagrant/**',
      '!**/build/**',
      '!**/wp-content/**',
      '!**/wordpress/**',
      '!Vagrantfile',
      '!package.json',
      '!composer.json',
      '!composer.lock'
    ],
    files: {
      all: ['**/*', '<%= ignores %>'],
      php: ['**/*.php', '<%= ignores %>'],
      js: ['**/*.js', '<%= ignores %>'],
      css: ['**/*.css', '<%= ignores %>'],
      json: ['**/*.json', '<%= ignores %>'],
      core: ['**/*']
    },
    clean: {
      all: ["vendor", "composer.lock", "wp", "wp-content", "build"]
    },
    copy: {
      theme: {
        files: [
          {
            expand: true,
            src: '<%= files.all %>',
            dest: 'build/wp-content/themes/<%= pkg.name %>'
          }
        ]
      },
      core: {
        files: [
          {
            expand: true,
            cwd: 'vendor/wordpress',
            src: '<%= files.core %>',
            dest: 'build'
          }
        ]
      }
    }
  });
  //On close of any tasks
  grunt.registerTask('close', ['clean:all']);

  // Default task(s).
  //TODO include civi as a composer zip
  grunt.registerTask('default', ['copy:core', 'copy:theme']);


};