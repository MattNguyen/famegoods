import { useEffect, useState, useRef } from 'react';
import useAddress from "../utils/Address";
import * as UserData from "../utils/UserData";

const Box = require('3box');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


const ProfileEditor = () => {
  const [state, setState] = useState({
    buffer: null,
    file: null,
    loading: false,
    ipfsHash: '',
  });

  const profileImage = useRef();

  const captureFile = (e) => {
    e.preventDefault;
    const file = e.target.files[0];
    profileImage.current = file;
    setState(() => ({ file: file }));
  }

  const handleSubmit = async () => {
    try {
      const file = await ipfs.add(state.buffer);

      setState((x) => ({ ...x, ipfsHash: file.path }));
      
      //setState((x) => ({ ...x, loading: false, ...x }));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!state.file) return;
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(state.file);
    reader.onloadend = () => {
      setState((x) => ({ buffer: Buffer(reader.result), ...x }))
    };
    //setState((x) => ({ ...x, loading: true }))
    handleSubmit();
  }, [state.file, state.ipfsHash])

  return (
    <div>
      <form className="m-4">
        <input type="file" onChange={captureFile} />
      </form>
      <button 
        onClick={ () => {console.log(state.file)} } 
        className="rounded-lg bg-blue-400 text-white p-2 mb-4"
      >
      click for useRef
      </button>
        <br/>
      <button 
        onClick={ () => {console.log(state.buffer)} } 
        className="rounded-lg bg-blue-400 text-white p-2 mb-4"
      >
      click for buffer
      </button>
        <br/>
      <button 
        onClick={ () => {console.log(state.ipfsHash)} } 
        className="rounded-lg bg-blue-400 text-white p-2"
      >
      click for IPFS Hash
      </button>
      <div className="flex justify-center mt-4" >
        <img            
          src={`https://ipfs.infura.io/ipfs/${state.ipfsHash}`}
        />
      </div>
    </div>
  );
};

export default ProfileEditor;