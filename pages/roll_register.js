import {useEffect, useState} from 'react';

const Box = require('3box')

const RollRegister = () => {
  return (
    <div className="pb-24">
      <iframe 
        className="max-w-screen w-full min-h-screen" 
        style={{marginTop: "-68px"}} 
        src='https://app.tryroll.com/createAccount/no_claim'
      />
    </div>
   );

};

export default RollRegister;