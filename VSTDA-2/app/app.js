(function() {
    'use strict';
    var app = angular.module('app', ['xeditable']);
    app.run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

})();
