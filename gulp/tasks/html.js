/*
 * Node Dependencies
 */
var Colors = require("colors");
var Gulp = require("gulp");
var Jade = require("gulp-jade");
var Replace = require("gulp-replace-task");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../modules/config");
var replace = require("../modules/replace");
var paths = require("../modules/paths");

/*
 * Internal functions
 */
function onJadeError(callback, err)
{
  console.log(Colors.red.underline('"html" task failed!'));
  console.log(err.message);
  callback(err);
}
function onTaskComplete(callback)
{
  console.log(Colors.green.underline('"html" task completed successfully!'));
  callback();
}

/*
 * Task
 */
Gulp.task("html", function(callback) {

  Gulp
    .src(paths.relocate(config.common.paths.sources.html))
    .pipe(Jade(config.nodeModules.jade))
      .on("error", onJadeError.bind(null, callback))
    .pipe(Replace(replace))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
      .on("end", onTaskComplete.bind(null, callback));
});