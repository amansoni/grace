<?php

function do_post_request($url, $data, $optional_headers = null)
{
         $params = array('http' => array(
                                  'method' => 'POST',
                                  'content' => $data
                           ));
         if ($optional_headers !== null) {
                $params['http']['header'] = $optional_headers;
         }
         $ctx = stream_context_create($params);
         $fp = @fopen($url, 'rb', false, $ctx);
         if (!$fp) {
                throw new Exception("Problem with $url, $php_errormsg");
         }
         $response = @stream_get_contents($fp);
         if ($response === false) {
                throw new Exception("Problem reading data from $url, $php_errormsg");
         }
         return $response;
}

function invalidate_user() {
        unset($_SESSION['org_launch_authenticated_userid']);
        unset($_SESSION['org_launch_trustid']);
        unset($_SESSION['org_launch_password']);
        unset($_SESSION['org_launch_clinician_name']);
        unset($_SESSION['org_launch_clinician_email']);
        unset($_SESSION['org_launch_default_population_name']);
        unset($_SESSION['org_launch_population_name']);
        unset($_SESSION['org_launch_group_title']);
        unset($_SESSION['org_launch_group_NID']);
        unset($_SESSION['org_launch_type']);
        unset($_SESSION['org_launch_salt']);
        unset($_SESSION['org_launch_tool']);
        unset($_SESSION['org_launch_metaScreeningLevel']);
        unset($_SESSION['org_launch_show_patient_list']);
}

function is_authenticated_user_is_same_as_drupal_user() {
        global $user;
        $status=false;
        if($user->uid == 0)
                $status = false;

        else if(isset($_SESSION['org_launch_authenticated_userid'])==false)
                $status = false;

        else if($user->uid == $_SESSION['org_launch_authenticated_userid'] )
                $status = true;
        else
                $status = false;

        if($status == false) {
                invalidate_user();
                return false;
        }
        else
                return true;
}

//to check if the logged-in user has access to the requested patient.
function is_patient_accessible($serial) {

        $trustid = $_SESSION['org_launch_trustid'];
        $groupNID = $_SESSION['org_launch_group_NID'];
        $org_launch_type = $_SESSION['org_launch_type'];
        $authenticated_userid = $_SESSION['org_launch_authenticated_userid'];


        if($org_launch_type == "private") {

                $clientsQuery = sprintf("SELECT * FROM org_launch_patients WHERE group_nid = '%s' AND clinician_drupal_uid = '%s' AND serial = '%s'",
                    mysql_real_escape_string($groupNID),
                    mysql_real_escape_string($authenticated_userid),
                    mysql_real_escape_string($serial));

        }
        else if( $org_launch_type == "public"){
                $clientsQuery = sprintf("SELECT * FROM org_launch_patients WHERE group_nid = '%s' AND serial = '%s'",
                        mysql_real_escape_string($groupNID),
                        mysql_real_escape_string($serial));

        }
        $clientsResult = mysql_query($clientsQuery) or die(mysql_error());
        if (mysql_num_rows($clientsResult)==0)
                return false;
        else
                return true;
}

function display_msg_and_exit($errorMsg) {
        include('org-launch-includes/baseHeader.php');
        echo "<div style=\"min-height:200px; color:#ff0000;\"> $errorMsg</div>";
        include('org-launch-includes/baseFooter.php');
        exit;
}


function get_patient_name($serial) {
        if(is_patient_accessible($serial)==false)
                return null;

        $trustid = $_SESSION['org_launch_trustid'];
        $groupNID = $_SESSION['org_launch_group_NID'];
        $org_launch_type = $_SESSION['org_launch_type'];
        $authenticated_userid = $_SESSION['org_launch_authenticated_userid'];


        if($org_launch_type == "private") {
                $clientsQuery = sprintf("SELECT * FROM org_launch_patients WHERE group_nid = '%s' AND clinician_drupal_uid = '%s' AND serial = '%s'",
                    mysql_real_escape_string($groupNID),
                    mysql_real_escape_string($authenticated_userid),
                    mysql_real_escape_string($serial));
        }
        else if( $org_launch_type == "public"){
                $clientsQuery = sprintf("SELECT * FROM org_launch_patients WHERE group_nid = '%s' AND serial = '%s'",
                        mysql_real_escape_string($groupNID),
                        mysql_real_escape_string($serial));
        }
        $clientsResult = mysql_query($clientsQuery) or die(mysql_error());

        $name="";
        $row = mysql_fetch_assoc($clientsResult);
        return $row['forename']." ".$row['surname'];
}



function get_trust_details($group_nid) {
        $query = sprintf("SELECT * FROM org_launch_trusts WHERE drupal_group_nid = '%s'",
            mysql_real_escape_string($group_nid));
        $result = mysql_query($query) or die(mysql_error());

        //$num_rows = mysql_num_rows($result);

        return mysql_fetch_assoc($result);
}


function do_org_launch($trustid, $password, $population, $groupNID, $groupDefaultLaunchType , $salt, $tool, $metaScreeningLevel, $showPatientList) {
  global $user;
        if($user->uid==0) {
                invalidate_user();
                display_msg_and_exit("You are not logged in.");
                exit();
        }

        $groupValid=false;
        $groupTitle="";
        foreach ($user->og_groups as $group) {
                if($group['nid']==$groupNID) {
                        $groupValid=true;
                        $groupTitle=$group['title'];
                        break;
                }
        }
        if($groupValid==false) {
                invalidate_user();
                display_msg_and_exit("You do not have access to this group. Please contact admin.");
                exit();
        }

        //just in case an incorrect type was passed.
        if($groupDefaultLaunchType != "private" && $groupDefaultLaunchType !="public")
                $groupDefaultLaunchType = "private";

        $launchType = $groupDefaultLaunchType;

        //check if user has launch-type overridden.
        $overriddenLaunchType = getClinicianLaunchType($user->uid, $groupNID);
        if($overriddenLaunchType != null && $overriddenLaunchType != 'default') {
                $launchType = $overriddenLaunchType;
        }


        $name = $user->profile_real_name;
        if($name == null || $name == "")
                $name = $user->profile_first_name." ".$user->profile_last_name;
        //At this point the user is authenticated. So lets create some session variables to remember the use;
        $_SESSION['org_launch_authenticated_userid'] =  $user->uid;
        $_SESSION['org_launch_trustid'] = $trustid ;
        $_SESSION['org_launch_password'] = $password;
        $_SESSION['org_launch_clinician_name'] = $name;
        $_SESSION['org_launch_clinician_email'] = $user->mail;
        $_SESSION['org_launch_default_population_name'] = $population;
        $_SESSION['org_launch_population_name'] = $population;
        $_SESSION['org_launch_group_title'] = $groupTitle;
        $_SESSION['org_launch_group_NID'] = $groupNID;
        $_SESSION['org_launch_type'] = $launchType;
        $_SESSION['org_launch_salt'] = $salt;
        $_SESSION['org_launch_tool'] = $tool;
        $_SESSION['org_launch_show_patient_list'] = $showPatientList;
        if($metaScreeningLevel != null) {
                $_SESSION['org_launch_metaScreeningLevel'] = $metaScreeningLevel;
        }
        else
                unset($_SESSION['org_launch_metaScreeningLevel']);


        add_log_entry('login', $user->uid, $groupNID, '', "launch-type:$groupDefaultLaunchType");
        //print_r($_SESSION);
        //echo "<br/>is_authenticated_user_is_same_as_drupal_user()=".is_authenticated_user_is_same_as_drupal_user();
        //exit;


        //All good. lets redirect to org-launch page.
        ?>
        Loading. Please wait...
        <div style="visibility:hidden">
        <form action="org-launch.php" method="get" name="theform" >

        </form>
        <script type="text/javascript">document.theform.submit();</script>
        </div>

        <?php
}

/*
* Get launch preference of a clinician if it is overridden in the database.
* returns null if no record of the given clinician in the given group is found
*/
function getClinicianLaunchType($clinicianUID, $groupNID) {
        $clientsQuery = sprintf("SELECT * FROM org_launch_clinician_permissions WHERE clinician_drupal_uid = '%s' AND group_nid = '%s'",
                    mysql_real_escape_string($clinicianUID),
                    mysql_real_escape_string($groupNID));

        $clientsResult = mysql_query($clientsQuery) or die(mysql_error());
        $num_rows = mysql_num_rows($clientsResult);
        if($num_rows == 0)
                return null;
        else {
                $row = mysql_fetch_assoc($clientsResult);
                return $row['launch_type'];
        }
}

/**
* returns true if the given clinician has privileged access. false otherwise
*/
function getClinicianPrivilegedAccess($clinicianUID, $groupNID) {
        $clientsQuery = sprintf("SELECT priviledged_access FROM org_launch_clinician_permissions WHERE clinician_drupal_uid = '%s' AND group_nid = '%s'",
                    mysql_real_escape_string($clinicianUID),
                    mysql_real_escape_string($groupNID));

        $clientsResult = mysql_query($clientsQuery) or die(mysql_error());
        $num_rows = mysql_num_rows($clientsResult);
        if($num_rows == 0)
                return false;
        else {
                $row = mysql_fetch_assoc($clientsResult);
                if($row['priviledged_access']=='1')
                        return true;
                else
                        return false;
        }
}

/*
* ******************  WARNING   ********************
* DO NOT CHANGE THIS FUNCTION. used by drupal to determine if audit link has to be shown or not. Any error here will make drupal fall apart!!!!!
*/
function showAuditButton($groupNID) {
        global $user;
        return getClinicianPrivilegedAccess($user->uid, $groupNID);
}


function do_audit_launch($trustid, $password, $privilegedPassword, $groupNID, $tool) {
  global $user;
        if($user->uid==0) {
                invalidate_user();
                display_msg_and_exit("You are not logged in.");
                exit();
        }

        $groupValid=false;
        $groupTitle="";
        foreach ($user->og_groups as $group) {
                if($group['nid']==$groupNID) {
                        $groupValid=true;
                        $groupTitle=$group['title'];
                        break;
                }
        }
        if($groupValid==false) {
                invalidate_user();
                display_msg_and_exit("You do not have access to this group. Please contact admin.");
                exit();
        }


        //does the user have proper roles


        $roleValid=array_key_exists('8', $user->roles);
        if($roleValid==false) {
                display_msg_and_exit("You do not have sufficient role privileges to access this feature. Please contact admin.");
                exit();
        }


        $SID = do_post_request("https://www.secure.egrist.org/login-headless.php","u=$trustid&p=$password&pp=$privilegedPassword&metaClinID=$clinicianName");
        if(strlen($SID)!=26) {
                echo "trust-username or password or priviliged-password incorrect. Please contact admin.";
                exit;
        }

        //echo "all good SID=$SID";

        ?>
        Loading. Please wait...
                        <div style="visibility:hidden">

                        <form name="theform" action="https://www.secure.egrist.org/panel/mhexperts/mh-dss-console.php" method="post">
                                <input type="hidden" name="SID" value="<?php echo $SID; ?>"/>
                                <input type="hidden" name="orgLaunch" value="true"/>
                                <input type="hidden" name="origin" value="/node/<?php echo $groupNID; ?>"/>
                                <input type="submit" value="Launch Privileged Console" />
                        </form>

                        <script type="text/javascript">document.theform.submit();</script>
                        </div>

        <?php

}

function add_log_entry($type, $user_UID, $group_NID, $patient_serial, $metaData) {

        $epoch = time();
        $availabe_type = array("login","light-launch", "add-patient", "edit-patient", "delete-patient");

        if (!in_array($type, $availabe_type)) {
                echo "ERROR in loggin. please contact admin.";
                exit();
        }


        $logQuery = sprintf("INSERT INTO grist.org_launch_logs (entry_no, epoch, type, user_UID, group_NID, patient_serial, MetaData) VALUES (NULL , '%s', '%s', '%s', '%s','%s','%s')",
                                mysql_real_escape_string($epoch),
                                mysql_real_escape_string($type),
                                mysql_real_escape_string($user_UID),
                                mysql_real_escape_string($group_NID),
                                mysql_real_escape_string($patient_serial),
                                mysql_real_escape_string($metaData));

        $logResult = mysql_query($logQuery) or die(mysql_error());

}

function getPatientHashedID($serial) {
        $clientsQuery = sprintf("SELECT hashed_id FROM org_launch_patients WHERE serial = '%s'",
                    mysql_real_escape_string($serial));

        $clientsResult = mysql_query($clientsQuery) or die(mysql_error());
        $row = mysql_fetch_assoc($clientsResult);
        return $row['hashed_id'];
}

function getPatientIdentifier($serial) {
        $clientsQuery = sprintf("SELECT patient_indentifier FROM org_launch_patients WHERE serial = '%s'",
                    mysql_real_escape_string($serial));

        $clientsResult = mysql_query($clientsQuery) or die(mysql_error());
        $row = mysql_fetch_assoc($clientsResult);
        return $row['patient_indentifier'];
}



function do_java_light_launch($trustid, $password, $population, $groupNID, $salt, $tool, $metaScreeningLevel) {
  global $user;
        if($user->uid==0) {
                echo "You are not logged in.";
                invalidate_user();
                exit();
        }

        $groupValid=false;
        $groupTitle="";
        foreach ($user->og_groups as $group) {
                if($group['nid']==$groupNID) {
                        $groupValid=true;
                        $groupTitle=$group['title'];
                        break;
                }
        }
        if($groupValid==false) {
                echo "You do not have access to this group. Please contact admin.";
                invalidate_user();
                exit();
        }

        $mygristVersion = '';
        if($tool=='grist-java-experimental'){
                $mygristVersion = 'experimental';
        }



        $gristID = "";
        $uid=$user->uid;
        $result = mysql_query("SELECT * FROM org_launch_direct_mygrace_patients where uid='$uid' AND nid='$groupNID'  ");
        $row = mysql_fetch_array($result);
        if($row == FALSE) {
                //new patient. let's register
                $gristID = md5($uid.$salt);
                $str="INSERT INTO org_launch_direct_mygrace_patients (serial ,uid ,nid ,grist_id) VALUES (NULL , '$uid', '$groupNID', '$gristID')";
                $result_insert = mysql_query($str);
        }
        else {
                $gristID = $row['grist_id'];
        }




        $name = $user->profile_real_name;
        if($name == null || $name == "")
                $name = $user->profile_first_name." ".$user->profile_last_name;
        $clinicianName = $name;
        $email = $user->mail;
        $patientName = $name;
        $SID = do_post_request("https://www.secure.egrist.org/login-headless.php","u=$trustid&p=$password&metaClinID=$clinicianName");
        ?>
        <?php
                $temp_json_sample = '{"array":[1,2,3],"boolean":true,"null":null,"number":123,"object":{"a":"b","c":"d","e":"f"},"string":"Hello World"}';
        ?>
        <div style="visibility:hidden">
                <form action="https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php" method="post" name="theform" accept-charset="UTF-8">
                        <input type="hidden" name="clinclientid" value="<?php echo $gristID;?>"/>
                        <input type="hidden" name="metaPatientName" value="<?php echo htmlspecialchars($patientName);?>"/>
                        <input type="hidden" name="metaPopName" value="<?php echo htmlspecialchars($population);?>"/>
                        <input type="hidden" name="metaClinicianEmail" value="<?php echo htmlspecialchars($email);?>"/>
                        <input type="hidden" name="metaExtendedPatientData" value='<?php echo ($temp_json_sample); ?>'/>
                        <input type="hidden" name="SID" value="<?php echo $SID;?>"/>
                        <input type="hidden" name="toolType" value="java" />
                        <?php
                        if($mygristVersion != '')
                                echo '<input type="hidden" name="javaToolBuildID" value="'.$mygristVersion.'"/>';

                        ?>
                        <?php
                        if($metaScreeningLevel != null)
                                echo '<input type="hidden" name="metaScreeningLevel" value="'.$metaScreeningLevel.'"/>';

                        ?>
                        <input type="submit" value="" />
                </form>
        </div>
        <script type="text/javascript">document.theform.submit();</script>
        <?php
}
?>