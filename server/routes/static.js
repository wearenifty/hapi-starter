/**
 * Created by davidchiu on 3/21/16.
 *
 * Inert
 * https://github.com/hapijs/inert
 * Static file and directory handling for Hapi
 *
 *
 */

var Inert = require('inert');

exports.register = function(server) {
    server.register(Inert, function(err) {
        if (err) {
            throw err;
        }

        server.route({
            method: 'GET',
            path: '/favicon.ico',
            handler: function(request, reply) {
                reply.file('./public/favicon.ico');
            }
        });

        server.route({
            method: 'GET',
            path: '/js/{param*}',
            handler: {
                directory: {
                    path: './public/js'
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/images/{param*}',
            handler: {
                directory: {
                    path: './public/images'
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/css/{param*}',
            handler: {
                directory: {
                    path: './public/css'
                }
            }
        });
    });
}