import {useEffect, useState} from 'react';
import useAddress from "../utils/Address";
import * as UserData from "../utils/UserData";
import EditProfile from '3box-profile-edit-react';

const Box = require('3box')

const ProfileEdit = () => {
  const [state, setState] = useState({});

  return (
    <div className="pb-24">
      <iframe 
        className="max-w-screen w-full min-h-screen" 
        style={{marginTop: "-68px"}} 
        src={`https://3box.io/${useAddress()}/edit`}
      />
    </div>
   );

};

export default ProfileEdit;

// Old sample code

/*

   useEffect( () => {
        async function a() {
             let space = await Box.openSpace('unroll-dev');
             console.log('space', space);
             setState(x=>({space}))
        }
        a();
   }, []);
   
   return state.space && <EditProfile
        // required
        box={Box}
        space={state.space}
        currentUserAddr={"0xffaDc07f1BFb127F4312e8652fE94aB0c771b54D"}
        // optional
        // customFields={customFields}
        // currentUser3BoxProfile={myProfile}
        // redirectFn={redirectFn}
   />
*/