'use strict';

var template = require('./template.hbs');

var Module = function( options ) {
	this.options = options || {};

	this.el = document.createElement( this.tagName );
	this.el.className = this.className;
};

var proto = Module.prototype;

proto.tagName = 'div';

proto.className = 'module';

proto.render = function() {
	this.el.innerHTML = template({ str : this.options.str });
};

module.exports = Module;