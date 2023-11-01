import {React, useState, useCallback,useEffect, useRef} from "react";
import "./App.css"

const App =()=>{

const [length, setLength]=useState(8);
const [numberAllowed,setNumberAllowed]=useState(false);
const [charAllowed, setCharAllowed] = useState(false);

const[password, setPassword] = useState("");

const passwordgeneretor= useCallback(()=>{ 

  let pass =""
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numberAllowed) str+="0123456789";
  if(charAllowed) str+="!@#$%^&*-+=-_[]{}"

  for(let i=1;i<=length;i++){
    let char = Math.floor(Math.random()*str.length+1);
    pass+=str.charAt(char);
  }
  setPassword(pass); 
},[length,numberAllowed,charAllowed,setPassword])

useEffect(()=>{
  passwordgeneretor()
},[length,numberAllowed,charAllowed,passwordgeneretor])

let passwordRef= useRef(null);



const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
}, [password])

  return ( 
<div  className="passwordGeneretor">
  <h1> password generator</h1>
<div className="copy-box">
  <input className="password" type="text" value={password}    ref={passwordRef} placeholder="password" readOnly/>
  <button className="copy-btn" onClick={copyPasswordToClipboard}>copy</button>
  
</div>

<div className="range-box">
<input type="range" min={6} max={100}  ref={passwordRef}value={length} onChange={(e)=>{setLength(e.target.value)}}/>
<label className="length">length:{length}</label>
</div>
<div className="numberCheckBox"><input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setNumberAllowed((prev)=>!prev);
}}/>

<label  className="Number" htmlFor="numberInput"> Number </label>
</div>


<div className="charCheckBox"><input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={()=>{setCharAllowed((prev)=>!prev);
}}/>

<label className="character"  htmlFor="characterInput"> character </label>
</div>

</div>
  )
}
export default App;
