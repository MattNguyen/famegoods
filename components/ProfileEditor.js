import {useEffect, useState} from 'react';
import useAddress from "../utils/Address";
import * as UserData from "../utils/UserData";
//import EditProfile from '3box-profile-edit-react';

const Box = require('3box')

const ProfileEditor = ({ address }) => {
  const [state, setState] = useState();

  const auth3Box = async () => {
    const box = await UserData.forUser(address);
    console.log(box);
  }




};

export default ProfileEditor;