/**
 * Created by davidchiu on 3/21/16.
 */

$(document).ready(function() {
    $.get('/testEndpoint', function(response) {
        console.log(response);
    });
});
