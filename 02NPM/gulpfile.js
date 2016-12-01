'use strict';

const gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  svgmin = require('gulp-svgmin'),
  webp = require('gulp-webp'),
  useref = require('gulp-useref'),
  concat = require('gulp-concat'),
  uncss = require('gulp-uncss'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  dir = {
    src: 'src',
    dist: 'dist',
    nm: 'node_modules'
  },
  files = {
    CSS: [
      `${dir.nm}/animate.css/animate.min.css`,
      `${dir.nm}/font-awesome/css/font-awesome.min.css`,
      `${dir.nm}/responsimple/responsimple.min.css`,
      `${dir.nm}/owl.carousel/dist/assets/owl.carousel.min.css`,
      `${dir.nm}/owl.carousel/dist/assets/owl.theme.default.min.css`,
      `${dir.dist}/css/estilos.css`
    ],
    mCSS: 'estilos.min.css',
    JS: [
      `${dir.nm}/jquery/dist/jquery.min.js`,
      `${dir.nm}/owl.carousel/dist/owl.carousel.min.js`,
      `${dir.nm}/wowjs/dist/wow.min.js`,
      `${dir.dist}/js/codigos.js`
    ],
    mJS: 'codigos.min.js',
    fonts: [`${dir.nm}/font-awesome/fonts/*.*`],
    statics: [
      `${dir.src}/humans.txt`,
      `${dir.src}/sitemap.xml`
    ]
  },
  opts = {
    pug: {
      pretty: true,
      locals: {
        title: 'Maratón',
        files: files
      }
    },
    sass: {outputStyle: 'compressed'},
    es6: {presets: ['es2015']}
  };

gulp.task('pug', () => {
  gulp
    .src(`${dir.src}/pug/*.pug`)
    .pipe(pug(opts.pug))
    .pipe(gulp.dest(dir.dist))
});

gulp.task('sass', () => {
  gulp
    .src(`${dir.src}/scss/*.scss`)
    .pipe( sass( opts.sass ) )
    .pipe( gulp.dest(`${dir.dist}/css`) );
});

gulp.task('es6', () => {
  gulp
    .src(`${dir.src}/es6/*.js`)
    .pipe( babel(opts.es6) )
    .pipe( gulp.dest(`${dir.dist}/js`) );
});