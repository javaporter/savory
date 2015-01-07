module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['public/assets/stylesheets/**/*.{scss,sass}','public/assets/stylesheets/_partials/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      },
      livereload: {
        files: ['*.html', '*.jade', 'public/assets/javascripts/**/*.{js,json}', 'public/assets/stylesheets/*.css','public/assets/images/**/*.{png,jpg,gif,svg}'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      options: {
        includePaths: ['public/assets/bower_components/foundation/scss'],
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'public/assets/stylesheets/styles.css': 'public/assets/stylesheets/app.scss'
        }
      }
    }
  });
  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};