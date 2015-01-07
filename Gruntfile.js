module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['public/stylesheets/**/*.{scss,sass}','public/stylesheets/_partials/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      },
      livereload: {
        files: ['*.html', '*.jade', 'public/javascripts/**/*.{js,json}', 'public/stylesheets/*.css','public/images/**/*.{png,jpg,gif,svg}'],
        options: {
          livereload: 3000
        }
      }
    },
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'public/stylesheets/styles.css': 'public/stylesheets/app.scss'
        }
      }
    }
  });
  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};