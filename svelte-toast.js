'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var assign = _interopDefault(require('object-assign'));

function assign$1 ( target ) {
	var arguments$1 = arguments;

	for ( var i = 1; i < arguments.length; i += 1 ) {
		var source = arguments$1[i];
		for ( var k in source ) { target[k] = source[k]; }
	}

	return target;
}

function appendNode ( node, target ) {
	target.appendChild( node );
}

function insertNode ( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function detachNode ( node ) {
	node.parentNode.removeChild( node );
}

function createElement ( name ) {
	return document.createElement( name );
}

function createText ( data ) {
	return document.createTextNode( data );
}

function setAttribute ( node, attribute, value ) {
	node.setAttribute( attribute, value );
}

var transitionManager = {
	running: false,
	transitions: [],

	add: function ( transition ) {
		transitionManager.transitions.push( transition );

		if ( !this.running ) {
			this.running = true;
			this.next();
		}
	},

	next: function () {
		transitionManager.running = false;

		var now = window.performance.now();
		var i = transitionManager.transitions.length;

		while ( i-- ) {
			var transition = transitionManager.transitions[i];

			if ( transition.running ) {
				if ( now >= transition.end ) {
					transition.running = false;
					transition.done();
				} else if ( now > transition.start ) {
					transition.update( now );
				}

				transitionManager.running = true;
			} else {
				transitionManager.transitions.splice( i, 1 );
			}
		}

		if ( transitionManager.running ) {
			requestAnimationFrame( transitionManager.next );
		}
	}
};

function differs ( a, b ) {
	return ( a !== b ) || ( a && ( typeof a === 'object' ) || ( typeof a === 'function' ) );
}

function dispatchObservers ( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) { continue; }

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( differs( newValue, oldValue ) ) {
			var callbacks = group[ key ];
			if ( !callbacks ) { continue; }

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) { continue; }

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}
}

function get ( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire ( eventName, data ) {
	var this$1 = this;

	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) { return; }

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this$1, data );
	}
}

function observe ( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.post : this._observers.pre;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) { group[ key ].splice( index, 1 ); }
		}
	};
}

function on ( eventName, handler ) {
	if ( eventName === 'teardown' ) { return this.on( 'destroy', handler ); }

	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) { handlers.splice( index, 1 ); }
		}
	};
}

function set ( newState ) {
	this._set( assign$1( {}, newState ) );
	this._root._flush();
}

function _flush () {
	var this$1 = this;

	if ( !this._renderHooks ) { return; }

	while ( this._renderHooks.length ) {
		this$1._renderHooks.pop()();
	}
}

var proto = {
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	_flush: _flush
};

function recompute ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'position' in newState && differs( state.position, oldState.position ) ) ) {
		state._position = newState._position = template.computed._position( state.position );
	}
}

var template = (function () {
  return {
    data: function data () {
      return {
        msg: '',
        type: '',
        position: 'bottom-center'
      }
    },
    computed: {
      _position: function _position (position) { return position.split('-').join(' ') }
    }
  }
}());

function create_main_fragment ( state, component ) {
	var div_class_value, div_1_class_value, text_value;

	var div = createElement( 'div' );
	setAttribute( div, 'svelte-17148720', '' );
	div.className = div_class_value = "toast-container " + ( state._position );
	var div_1 = createElement( 'div' );
	appendNode( div_1, div );
	div_1.className = div_1_class_value = "toast " + ( state.type );
	var text = createText( text_value = state.msg );
	appendNode( text, div_1 );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		update: function ( changed, state ) {
			if ( div_class_value !== ( div_class_value = "toast-container " + ( state._position ) ) ) {
				div.className = div_class_value;
			}

			if ( div_1_class_value !== ( div_1_class_value = "toast " + ( state.type ) ) ) {
				div_1.className = div_1_class_value;
			}

			if ( text_value !== ( text_value = state.msg ) ) {
				text.data = text_value;
			}
		},

		destroy: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function Toast$2 ( options ) {
	options = options || {};
	this._state = assign$1( template.data(), options.data );
	recompute( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	this._fragment = create_main_fragment( this._state, this );
	if ( options.target ) { this._fragment.mount( options.target, null ); }
}

assign$1( Toast$2.prototype, proto );

Toast$2.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign$1( {}, oldState, newState );
	recompute( this._state, newState, oldState, false );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) { this._fragment.update( newState, this._state ); }
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Toast$2.prototype.teardown = Toast$2.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.destroy( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var Toast = function Toast (opts) {
  this.opts = opts || {
    position: 'bottom-center',
    duration: 2000
  };
};

Toast.prototype.show = function show (msg, opts) {
    if ( opts === void 0 ) opts = {};

  this._show(msg, opts, 'default');
};

Toast.prototype.info = function info (msg, opts) {
    if ( opts === void 0 ) opts = {};

  this._show(msg, opts, 'info');
};

Toast.prototype.success = function success (msg, opts) {
    if ( opts === void 0 ) opts = {};

  this._show(msg, opts, 'success');
};

Toast.prototype.error = function error (msg, opts) {
    if ( opts === void 0 ) opts = {};

  this._show(msg, opts, 'error');
};

Toast.prototype._show = function _show (msg, opts, type) {
  var _opts = assign({}, this.opts, opts);
  var t = new Toast$2({
    target: document.querySelector('body'),
    data: {
      msg: msg,
      type: type,
      postion: _opts.postion
    }
  });

  setTimeout(function () {
    t.set({ type: t.get('type') + ' ' + 'anim' });
  }, 0);

  setTimeout(function () {
    t.destroy();
  }, _opts.duration);
};

module.exports = Toast;
