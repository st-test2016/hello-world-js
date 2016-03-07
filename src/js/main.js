'use strict';

var Module = require('./module/Module');

var Main = (function() {

	return {

		initialize : function() {
			var module = new Module({
				str : 'Hello world!'
			});

			module.render();

			document.querySelector('main').appendChild( module.el );
		}

	}

}());

module.exports = Main.initialize();