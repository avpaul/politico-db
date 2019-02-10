process.env.mode = 'dev';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.mode === 'dev') {
    const browserSync = require('browser-sync');
    const bs = browserSync.create().init({
        files: './public/stylesheets/',
        logSnippet: false,
        online: false,
        logConnections: true,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true,
        },
        browser: 'google chrome',
        plugins: [{
            module: 'bs-html-injector',
            options: {
                files: ['./views/**.pug'],
            },
        }],
    });
    app.use(require('connect-browser-sync')(bs, { injectHead: true }));
}

app.use('/', indexRouter);
app.use('/v1', apiRouter);
app.use('/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
