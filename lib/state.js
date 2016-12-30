'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.USER_REQUEST_FAILURE = exports.USER_REQUEST_SUCCESS = exports.USER_REQUEST = undefined;
exports.items = items;
exports.requests = requests;
exports.names = names;
exports.requestUser = requestUser;

var _redux = require('redux');

var _keyBy = require('lodash/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _wordpressRestApiOauth = require('wordpress-rest-api-oauth-1');

var _wordpressRestApiOauth2 = _interopRequireDefault(_wordpressRestApiOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*global SiteSettings */
/**
 * External dependencies
 */


var api = new _wordpressRestApiOauth2.default({
	url: SiteSettings.endpoint
});

/**
 * Term actions
 */
var USER_REQUEST = exports.USER_REQUEST = 'wordpress-redux/users/REQUEST';
var USER_REQUEST_SUCCESS = exports.USER_REQUEST_SUCCESS = 'wordpress-redux/users/REQUEST_SUCCESS';
var USER_REQUEST_FAILURE = exports.USER_REQUEST_FAILURE = 'wordpress-redux/users/REQUEST_FAILURE';

/**
 * Tracks all known post objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function items() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case USER_REQUEST_SUCCESS:
			var terms = (0, _keyBy2.default)([action.user], 'id');
			return Object.assign({}, state, terms);
		default:
			return state;
	}
}

/**
 * Returns the updated post requests state after an action has been
 * dispatched. The state reflects a mapping of post ID to a
 * boolean reflecting whether a request for the post is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function requests() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case USER_REQUEST:
		case USER_REQUEST_SUCCESS:
		case USER_REQUEST_FAILURE:
			return Object.assign({}, state, _defineProperty({}, action.userId, USER_REQUEST === action.type));
		default:
			return state;
	}
}

/**
 * Tracks the name->ID mapping for users
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function names() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case USER_REQUEST_SUCCESS:
			var userName = action.user.slug;
			var userId = action.user.id;
			return Object.assign({}, state, _defineProperty({}, userName, userId));
		default:
			return state;
	}
}

exports.default = (0, _redux.combineReducers)({
	items: items,
	requests: requests,
	names: names
});

/**
 * Triggers a network request to fetch a specific post from a site.
 *
 * @param  {string|number}  userId  User name or user ID
 * @return {Function}           Action thunk
 */

function requestUser(userId) {
	return function (dispatch) {
		dispatch({
			type: USER_REQUEST,
			userId: userId
		});

		// If we're looking for a user ID, we can request it directly
		var url = '/wp/v2/users/' + userId;
		var query = {};
		// If we're looking for a user name, we need to tweak the request slightly
		if ('string' === typeof userId) {
			url = '/wp/v2/users/';
			query.slug = userId;
		}

		api.get(url, query).then(function (data) {
			var user = data;
			if ((0, _isArray2.default)(data)) {
				user = data[0];
			}
			dispatch({
				type: USER_REQUEST_SUCCESS,
				userId: userId,
				user: user
			});
			return null;
		}).catch(function (error) {
			dispatch({
				type: USER_REQUEST_FAILURE,
				userId: userId,
				error: error
			});
		});
	};
}