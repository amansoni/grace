<?php
require_once("../../libraries/LIB_PageBuilder.class.php");  //help with constructing the webpage
//-------------------------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------
$pageBuilder = new PageBuilder("classic");
$pageBuilder->openDoc("Light Launch Simulator");
$pageBuilder->closeHead();
echo "<body>\n";
  echo "<h2> For Internal Use Only. Not to be released to trusts!</h2><hr/>";
  
  if (isset($_REQUEST['username']) && isset($_REQUEST['password'])   ){
	$u=$_REQUEST['username'];
	$p=$_REQUEST['password'];
	//Addition by Abu 20101019
	//Updated 20110918
	$metaClinID = urlencode($_REQUEST['metaClinID']);
	//End Addition by Abu
	//Abu 2012-06-13 - made URL server agnostic
	$SID = do_post_request("https://".$_SERVER["SERVER_NAME"]."/login-headless.php","u=$u&p=$p&metaClinID=$metaClinID");
	
	if(strlen($SID)!=26) {
		//some error message has been sent by server as opposed to a valid SID.
		die("<pre>$SID<pre>");
	}
	echo "Session ID Obtained: $SID<br/><br/>";
	?>
	
	<form action="/panel/mhexperts/mh-dss-assess-light-launch.php" method="get" accept-charset="UTF-8">
		Grist ID: <input type="text" name="clinclientid" value="testClient1"/>
		Patient Name: <input type="text" name="metaPatientName" value="Abc"/>
		<br />
		Service Designation: <input type="text" name="metaServiceDesignation" value=""/>
		<br/><span style="color:gray;"><em>Java tool only</em>: version of Java tool <em>(leave blank for default)</em>:</span> <input type="text" name="javaToolBuildID" value=""/>
		<br/><span style="color:gray;"><em>Java tool only</em>: metaExtendedSettingsJSTool:</span> <input type="text" name="metaExtendedSettingsJSTool" value=""/>
		<br />
		<br />
		<input type="hidden" name="SID" value="<?php echo $SID;?>" />
		<input type="submit" value="Launch Grist" />
	</form>
	<br />
	Grist ID would normally be automatically obtained from trust's database
	<?php
	
  
  }
  else {
	?>
	<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" accept-charset="UTF-8">
		Username: <input type="text" name="username" value="trust-kumar-test"/>
		<br />
		Password: <input type="password" name="password" value="123456" />
		<input type="submit" value="Get Session ID" />
		<!--Addition by Abu 20101019-->
		<!--Spec says that the Trust can pass us a clinician identifier when logging in-->
		<br />
		<br />
		Clinician Identifier: <input type="text" name="metaClinID" value="Bua Amhed"/>
		<!--End Addition bu Abu-->
	</form> 
    <?php
  }
echo "</body>\n</html>\n";
