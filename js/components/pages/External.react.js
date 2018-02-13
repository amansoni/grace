import React, { Component } from 'react';
import { iframe} from 'react-router';

class External extends Component {
  render() {
      return(
        <div>
          <iframe src='https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php?clinclientid=testClient1&SID=3u2knifpk7gh1j74jhhd2o2543&metaExtendedSettingsJSTool={"startMode":1}' height='400' width='500'/>
        </div>
    );
  }
}

export default External;

//   <form id="grist" action="https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php" method="get" accept-charset="UTF-8">
//   <input type="hidden" name="clinclientid" value="testClient1"/>
//   <input type="hidden" name="metaPatientName" value="Abc"/>
//   <input type="hidden" name="metaExtendedSettingsJSTool" value='{"startMode":1}'/>
//   <input type="hidden" name="SID" value="3u2knifpk7gh1j74jhhd2o2543" />