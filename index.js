/**
 * Created by davidchiu on 3/21/16.
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

};

initServer();
initRoutes();