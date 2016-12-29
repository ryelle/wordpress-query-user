'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _selectors = require('./selectors');

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Internal dependencies
 */


var debug = (0, _debug2.default)('query:users');

var QueryUser = function (_Component) {
	_inherits(QueryUser, _Component);

	function QueryUser() {
		_classCallCheck(this, QueryUser);

		return _possibleConstructorReturn(this, (QueryUser.__proto__ || Object.getPrototypeOf(QueryUser)).apply(this, arguments));
	}

	_createClass(QueryUser, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.request(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (true) {
				return;
			}

			this.request(nextProps);
		}
	}, {
		key: 'request',
		value: function request(props) {
			if (!props.requestingUser) {
				debug('Request user ' + props.userId);
				props.requestUser(props.userId);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return QueryUser;
}(_react.Component);

QueryUser.propTypes = {
	userId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).required,
	requestingUser: _react.PropTypes.bool,
	requestUser: _react.PropTypes.func
};

QueryUser.defaultProps = {
	requestUser: function requestUser() {}
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	var userId = ownProps.userId;

	return {
		requestingUser: (0, _selectors.isRequestingUser)(state, userId)
	};
}, function (dispatch) {
	return (0, _redux.bindActionCreators)({
		requestUser: _state.requestUser
	}, dispatch);
})(QueryUser);
module.exports = exports['default'];