var Graphitus = {
	namespace: function(namespace, obj) {
		var parts = namespace.split('.');
		var parent = Graphitus;
		for(var i = 1, length = parts.length; i < length; i++) {
			var currentPart = parts[i];
			parent[currentPart] = parent[currentPart] || {};
			parent = parent[currentPart];
		}
		return parent;
	},

	keys: function(obj) {
		var keys = [];
		for (var key in obj) keys.push(key);
		return keys;
	},

	extend: function(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	},

	clone: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
};

Graphitus.namespace('Graphitus.Tree');

Graphitus.Tree = function(args) {
	var self = this;
	this.root = {};

	this.add = function(item) {
		this._addRecursive(this.root, item);
	},
	this._addRecursive =  function(parent, item) {
		  var parts = item.split('.');
		  var first = parts.shift();
		  parent[first] = parent[first] || {};
		  if (parts.length) { 
			  this._addRecursive(parent[first], parts.join('.'));
		  }
		  return parent[first]; 
	};
	
	this.getRoot = function(){
		return this.root;
	}
};

var graphitusConfig = null;

function loadGraphitusConfig(callback){
    $.ajax({
        type: "get",
        url: "config/config.json",
        dataType:'json',
        success: function(json) {
            graphitusConfig = json;
            console.log("Loaded configuration: " + JSON.stringify(graphitusConfig));
            callback();
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log(thrownError);
        }
    });
}
