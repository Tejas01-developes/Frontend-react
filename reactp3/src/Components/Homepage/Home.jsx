import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {io} from 'socket.io-client'
const Home = () => {
    const navigate=useNavigate()
    const[frd,setfrd]=useState([])
    const[slt,setslt]=useState()
    const[msg,setmsg]=useState("")
    const[doc,setdoc]=useState(null)
    const[chat,setchat]=useState([])
    const loggedemail=localStorage.getItem("email");
    const navigateadd=()=>{
        navigate("/add")
    }

    useEffect(()=>{
      const getfriends=async()=>{
        try{
      const listurl=await axios.get("http://localhost:3000/apis/get",{
        withCredentials:true
      })
      if(listurl.data.success){
      console.log(listurl.data.friends)
      setfrd(listurl.data.friends)
      }
      }catch(err){
        console.log("error",err)
      }
      }
      getfriends();
      },[])
  
const handleselect=(friend)=>{
setslt(friend);
setmsg("")
}






const sendmessage=async()=>{
  if(!msg){
    alert("write message")
    return
  }
  try{
    const payload={
      reciver:slt.friends_email,
      message:msg
    }
const sendurl=await axios.post("http://localhost:3000/apis/send",payload,{withCredentials:true})
if(sendurl.data.success){
setchat(msg)
setmsg("")
}
  }catch(err){
    console.log("error",err)
  }
}


useEffect(()=>{
if(!slt) return
const getmsg=async()=>{
try{
  
const geturl=await axios.get("http://localhost:3000/apis/getmsg",{params:{
  friend:slt.friends_email,
},withCredentials:true});

if(geturl.data.success){
  setchat(geturl.data.messages)
}

}catch(err){
  console.log("error",err);
}
}

getmsg();
},[slt])





const socket=io("http://localhost:3000",{
  withCredentials:true
})


useEffect(()=>{
loggedemail,
socket.emit("join",loggedemail)
},[])











  return (
    <div>
      <div className='addcontact'>
        <h2>Add user</h2>
        <img src="https://static.thenounproject.com/png/100859-200.png" className='contect' onClick={navigateadd} />
        <h1 className='heading'>Chat Room</h1>
      </div>
      <hr />
<div className='chatcontainer'>
<div className='friends'>
{
frd.map((fr,i)=>(
  <div key={i} className='select' onClick={()=>handleselect(fr)}>
    {fr.friends_email}

  </div>
))



}
</div>


<div className='chat'>
  {
slt && (
<div>
<textarea name="textarea" className='textarea' placeholder='Write the message' value={msg} onChange={(e)=>setmsg(e.target.value)}/>
<button onClick={sendmessage}>send</button>
{/* <input type="file" value={doc} onChange={(e)=>setdoc(()=>e.target.value)}  /> */}
<div>
{
  chat.map((ms,i)=>(
    <div key={i}>
    {ms.msg}
    </div>
  ))
}
</div>
</div>
)
  }
</div>

</div>

    </div>
  )
}

export default Home
