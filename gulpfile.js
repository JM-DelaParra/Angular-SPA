// Importes
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    livereload = require('tiny-lr')(),
    express = require('express');

// Globales
var EXPRESS_ROOT = 'public_html';
var EXPRESS_PORT_PRO = 20000;
var EXPRESS_PORT_DEV = 25000;
var LIVERELOAD_PORT = 35729;

// Rutas de producción
var productionPath = {
    main: 'public_html',
    views: 'public_html/views',
    assets: 'public_html/assets',
    assetsImg: 'public_html/assets/img',
    allFiles: 'public_html/**/*'
};

// Rutas de desarrollo
var developmentPath = {
    index: ['app/index.html'],
    views: ['app/views/**/*.html'],
    assets: ['app/assets/**/*', '!app/assets/img/**/*'],
    assetsImg: ['app/assets/img/**/*'],
    js: ['app/**/*.js', '!app/assets/libs/**', 'gulpfile.js'],
    stylus: ['app/stylus/**/*.styl']
};

// Por defecto
gulp.task('default', function() {
    console.log("");
    console.log("   gulp build -> Generar e iniciar aplicación en http://localhost:20000");
    console.log("   gulp watch -> Generar y observar desarrollo en http://localhost:25000");
    console.log("   gulp debug -> Validar código javascript");
    console.log("");
});

// Generar e iniciar aplicación
gulp.task('build', ['html', 'views', 'assets', 'js', 'styles'], function() {
    startExpress();
});

// Generar aplicación
gulp.task('onlyBuild', ['html', 'views', 'assets', 'js', 'styles'], function() {});

// Observar y desplegar cambios en la aplicación
gulp.task('watch', ['onlyBuild'], function() {
    watchDevelopmentFiles();
    startExpressLiveReload();
    startLiveReload();
    gulp.watch(productionPath.allFiles, notifyLiveReload);
});

// Validar código javascript
gulp.task('debug', function() {
    return gulp.src(developmentPath.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Copiar index.html a producción
gulp.task('html', function() {
    gulp.src(developmentPath.index)
        .pipe(gulp.dest(productionPath.main));
});

// Copiar vistas a producción
gulp.task('views', function() {
    gulp.src(developmentPath.views)
        .pipe(gulp.dest(productionPath.views));
});

// Copiar recursos a producción
gulp.task('assets', ['images'], function() {
    gulp.src(developmentPath.assets)
        .pipe(gulp.dest(productionPath.assets));
});

// Comprime y optimiza imágenes
gulp.task('images', function() {
    return gulp.src(developmentPath.assetsImg)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(productionPath.assetsImg));
});

// Concatenar archivos javascript, castear elementos de angular, minificar y enviar main.js a producción
gulp.task('js', function() {
    gulp.src(developmentPath.js)
        .pipe(concat('main.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(productionPath.main));
});

// Compilar archivos de stylus, minificar css generado, concatenar, añadir prefijos multinavegador y enviar style.css a producción
gulp.task('styles', function() {
    return gulp.src(developmentPath.stylus)
        .pipe(stylus({
            compress: true
        }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(productionPath.main));
});

// Crear servidor Express
function startExpress() {
    var app = express();
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT_PRO);
}

// Observar cambios en archivos de desarrollo
function watchDevelopmentFiles() {
    gulp.watch(developmentPath.index, ['html']);
    gulp.watch(developmentPath.views, ['views']);
    gulp.watch(developmentPath.js, ['js']);
    gulp.watch(developmentPath.stylus, ['styles']);
}

// Crear servidor Express para LiveReload
function startExpressLiveReload() {
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT_DEV);
}

// Iniciar LiveReload
function startLiveReload() {
    livereload = require('tiny-lr')();
    livereload.listen(LIVERELOAD_PORT);
}

// Notificar cambios
function notifyLiveReload(event) {
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    livereload.changed({
        body: {
            files: [fileName]
        }
    });
}
