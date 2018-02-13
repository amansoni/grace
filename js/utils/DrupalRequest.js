import server from './DrupalServer';

/**
 * Fake XMLHttpRequest wrapper with a syntax similar to the much used request.js
 * @type {Object}
 */
var DrupalRequest = {
  /**
   * Pretends to post to a remote server with fake network latency
   * @param  {string}    endpoint The endpoint of the server that should be contacted
   * @param  {?object}   data     The data that should be transferred to the server
   * @param  {?function} callback Called after the server successfully did it's thing
   */
  post(endpoint, data, callback) {
    switch (endpoint) {
      case '/login':
        server.login(data.username, data.password, callback);
        break;
      case '/register':
        server.register(data.username, data.password, callback);
        break;
      case '/logout':
        server.logout(callback);
        break;
      default:
        break;
    }
  }
}

module.exports = fakeRequest;
