/**
 * Created by davidchiu on 3/21/16.
 */
exports.register = function(server) {
    server.route({
        method: 'GET',
        path: '/testEndpoint',
        handler: function (request, reply) {
            return reply({
                'message': 'success!'
            });
        }
    });

}