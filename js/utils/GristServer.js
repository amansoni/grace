// webpack doesn't like localStorage otherwise
let localStorage = global.window.localStorage;
var grisst = require('corsrequest')

/**
 * GRiST Server functions for session management
 * @type {Object}
 */
var server = {
  init(){

  },
  /**
   * Get the configuration values for the server and create a session
   * @param  {string} username Username for session
   * @param  {string} password Password for user
   * @param  {string} clinicianId Clinician Id, may be empty
   * @return {string}         Session Id, or an empty string
   */
  createGristSession(username, password, clinicianId) {
    var data = 'u=' + username + '&p=' + password + '&metaClinID=' + clinicianId
    var Config = require('Config')
    // https://eas-grist06.aston.ac.uk/user/login?_format=json" --data '{"name":"drupal8-user", "pass":"3A5-gr15t04_drupal8"}'
    return fetchData(Config.gristURL + Config.gristURLloginPath, data)    
  }
}

server.init();

module.exports = server;
