// ToDo:
//
// One default pages: title, better styling etc.

// Module

var http = require('http'),
    url  = require('url'),
    path = require('path'),
    fs   = require('fs');


// Content Type

var mimeTypes = {

  md  : 'text/plain',

  html: 'text/html' ,

  jpeg: 'image/jpeg',
  jpg : 'image/jpg' ,
  png : 'image/png' ,

  js  : 'text/javascript',
  css : 'text/css',

  json: 'application/json'

};


// Styling

var defaultCSS = '<style>' + fs.readFileSync( __dirname + '/style.css') + '</style>';


// Code

function init ( root, port ) {

  http.createServer( function ( req, res ) {

    var uri      = url.parse( req.url ).pathname,

        filename = path.join( root, unescape(uri) );


    if ( uri === '/favicon.ico' ) {

      res.writeHead( 200, { 'Content-Type': 'image/x-icon' });
      res.write('');
      res.end();
      return;
    }

    //
    if ( uri.charAt( uri.length - 1 ) !== '/' ) uri += '/';


    fs.stat( filename, function ( err, stats ) {

      if ( err ) throw err;

      if ( stats.isFile() ) {

        var type = path.extname( filename ).substr(1);

        res.writeHead( 200, { 'Content-Type': mimeTypes[type] });

        fs.createReadStream( filename ).pipe( res );

        return;
      }


      if ( stats.isDirectory() ) {

        fs.readdir( filename, function ( err, files ) {

          if ( err ) throw err;

          var list = files.map( function ( file ) {

            return '<li><a href="' + uri + file + '">'+ file +'</a></li>';

          }).join('<br>');

          res.writeHead( 200, { 'Content-Type': 'text/html' });
          res.write( defaultCSS + '<ul>' + list + '</ul>' );
          res.end();
        });

        return;
      }

      // Not Found
      res.writeHead( 404, { 'Content-Type': 'text/html' });
      res.write( defaultCSS + '<h2>File not found !</h2>');
      res.end();

    });

  }).listen( port, function(){ console.log('[open] running a local server => http://localhost:8080'); });

}

module.exports = { run: init };
