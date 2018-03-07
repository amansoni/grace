let users;
// webpack doesn't like localStorage otherwise
let localStorage = global.window.localStorage;
var Config = require('Config')

/**
 * Contains the functions that call remote servers, using localStorage to persist data across page reloads
 * @type {Object}
 */
var interface = {
  init(){
    if (localStorage.users === undefined || !localStorage.encrypted) {
      // Set default user
      const AzureDiamond = "default";
      const AzureDiamondSalt = genSalt(AzureDiamond);
      const AzureDiamondPass = bcrypt.hashSync("default", AzureDiamondSalt);
      users = {
        [AzureDiamond]: bcrypt.hashSync(AzureDiamondPass, salt)
      };
      localStorage.users = JSON.stringify(users);
      localStorage.encrypted = true;
    } else {
      users = JSON.parse(localStorage.users);
    }
  },
  /**
   * Performs a login into Drupal using the JsonApi
   * @param  {string} username The username that should be checked
   * @param  {string} password The user's password
   * @return {object}  data from drupal
   */
  drupalLogin(username, password) {
    data = new Array()
    data['name'] = username
    data['pass'] = password
    // https://eas-grist06.aston.ac.uk/user/login?_format=json" --data '{"name":"drupal8-user", "pass":"3A5-gr15t04_drupal8"}'
    return fetchData(Config.drupalURL + Config.loginPath, data)    
  },
  /**
   * Creates an entry when a registered patient uses the system for the first time
   * @param {string} uid 
   * @param {string} groupId 
   * @param {string} gristId 
   */
  registerNewPatient(uid, groupId, gristId){
    // $gristID = md5($uid.$salt);
    // $str="INSERT INTO org_launch_direct_mygrace_patients (serial ,uid ,nid ,grist_id) VALUES (NULL , '$uid', '$groupNID', '$gristID')";
  },
  /**
   * Creates a grist session for the user
   * @param {string} trustId The trust identifier
   * @param {string} password The trust password from Druapl
   * @param {string} clinicianId The clinician identifier
   */
  createGristSession(trustId, password, clinicianId){
    // $SID = do_post_request("https://www.secure.egrist.org/login-headless.php","u=$trustid&p=$password&metaClinID=$clinicianName");

  },
  /**
   * Calls the myGrace SPA to return a page view that is displayed with the site. This should be a set of questions to be answered
   * @param {string} clinicianId 
   * @param {string} patientName 
   * @param {string} populationName 
   * @param {string} clinicianEmail 
   * @param {string} sessionId 
   * @param {string} screenLevel 
   */
  callGrace(clinicianId, patientName, populationName, clinicianEmail, sessionId, screenLevel){
//     <?php
//     $temp_json_sample = '{"array":[1,2,3],"boolean":true,"null":null,"number":123,"object":{"a":"b","c":"d","e":"f"},"string":"Hello World"}';
// ?>
// <div style="visibility:hidden">
//     <form action="https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php" method="post" name="theform" accept-charset="UTF-8">
//             <input type="hidden" name="clinclientid" value="<?php echo $gristID;?>"/>
//             <input type="hidden" name="metaPatientName" value="<?php echo htmlspecialchars($patientName);?>"/>
//             <input type="hidden" name="metaPopName" value="<?php echo htmlspecialchars($population);?>"/>
//             <input type="hidden" name="metaClinicianEmail" value="<?php echo htmlspecialchars($email);?>"/>
//             <input type="hidden" name="metaExtendedPatientData" value='<?php echo ($temp_json_sample); ?>'/>
//             <input type="hidden" name="SID" value="<?php echo $SID;?>"/>
//             <input type="hidden" name="toolType" value="java" />
//             <?php
//             if($mygristVersion != '')
//                     echo '<input type="hidden" name="javaToolBuildID" value="'.$mygristVersion.'"/>';

//             ?>
//             <?php
//             if($metaScreeningLevel != null)
//                     echo '<input type="hidden" name="metaScreeningLevel" value="'.$metaScreeningLevel.'"/>';

//             ?>
//             <input type="submit" value="" />
//     </form>
// </div>
// <script type="text/javascript">document.theform.submit();</script>

  },
  fetchData(url, data){

  },
  testCalls(name, password){
      var drupalUrl = 'https://eas-grist06.aston.ac.uk/user/login?_format=json"';
      var data =  '{"name":"amansoni", "pass":"3A5-gr15t04_drupal8"}';
      /** Drupal 8 Login
       * curl --header "Content-type: application/json" --request POST \
  --data '{"name":"amansoni", "pass":"3A5-gr15t04_drupal8"}' \
https://eas-grist06.aston.ac.uk/user/login?_format=json

{"current_user":{"uid":"2770","roles":["authenticated","administrator"],"name":"amansoni"},
"csrf_token":"EV9yVqnlme4xQEOX0bVa5Xm8xbsjLGbPbFJVewsX7BE",
"logout_token":"Igttnvrgdx-1OuBKKtCFljfJV4PxpejuHhz9kVONkvI"}
       */
      var p = '3A5-gr15t04_drupal8';
      var u = 'amansoni';

    var data = drupalLogin(username, password);
    console.log(data);
    //drupal login

    //grist login
  }
}

interface.init();

module.exports = interface;
