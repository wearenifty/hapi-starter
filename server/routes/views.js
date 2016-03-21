/**
 * Created by davidchiu on 3/21/16.
 *
 * Vision Routes
 * https://github.com/hapijs/vision
 * Template rendering for Hapi
 *
 * Scaffolding for Jade templates http://jade-lang.com/ .
 *
 */

var Vision = require('vision');

exports.register = function(server) {
    server.register(Vision, function(err) {
        if (err) {
            throw err;
        }

        server.views({
            engines: {jade: require('jade')},
            path: './public/jade',
            isCached: false,
            compileOptions: {
                pretty: true
            }
        });

        server.route({
            method: 'GET',
            path: '/',
            handler: function(request, reply) {
                reply.view('index')
            }
        });
    });
}