/**
 * Created by davidchiu on 3/21/16.
 *
 * A starting point for Hapi projects with:
 * - Jade templates
 * - Static resource handling (images, css, js)
 * - API endpoints
 *
 */

var Hapi = require('hapi');

var server;

var initServer = function() {
    server = new Hapi.Server({
        debug: {
            request: ['error']
        }
    });

    server.connection({ port: ~~process.env.PORT || 3000 });

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
};

var initRoutes = function() {
    var views = require('./server/routes/views');
    var static = require('./server/routes/static');
    var api = require('./server/routes/api');
    
    views.register(server);
    static.register(server);
    api.register(server);
};

initServer();
initRoutes();