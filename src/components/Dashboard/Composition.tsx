import React, { useState ,useEffect,useRef ,useCallback} from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client'

export default function Composition() {
  const [socket,setSocket] = useState<any>();
  const [quill,setQuill] = useState<any>();
  const [skelly,setSkeleton] = useState<any>();

// console.log("HelloCHAT")
// console.log(sessionStorage.getItem("Title"))
// console.log(sessionStorage.getItem("Story"))
// console.log(sessionStorage.getItem("Genre"))
console.log("checkskelly",skelly)

if(socket != null){
  socket.on('sendskelly', ()=> {
      console.log("sendingskelly",skelly)
    socket.emit('skeleton',skelly)
    })
    socket.on('receive-skeleton', (start: any)=> {
      console.log("start",start)
      if(start != null){
      quill.setText(start)
      }
    })
  }

  useEffect(() => {
    const s: any = io("http://localhost:3001")
    setSocket(s)
    s.emit("joinSession", () =>{
        })
  
    return () => {
      s.disconnect()
    }
  },[])

  useEffect(() => {
    if (socket == null || quill == null) return
    const handler =  (delta: any) => {
      quill.updateContents(delta)
    }
    socket.on('receive-changes',handler)


    return () => {
      socket.off('receive-changes',handler)
    }
  })

  useEffect(() => {
    if (socket == null || quill == null) return
    const handler =  (delta: any,oldDelta: any,source: string) => {
      if (source !== "user") return
      setSkeleton(quill.getText(0))
      // socket.emit("skeleton",skelly)
      socket.emit("send-changes",delta)
    }
    quill.on('text-change',handler)

    return () => {
      quill.off('text-change',handler)
    }
  })

 

  const wrapperRef = useCallback((wrapper: { innerHTML: string; append: (arg0: HTMLDivElement) => void; } | null) => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {theme: "snow"})
    const skeleton = sessionStorage.getItem("Story"!)
    console.log("skeleton2", skeleton)
    if(skeleton != null)
       {q.setText(skeleton.toString())
        setSkeleton(skeleton)
      }

    
    setQuill(q)
    
  },[])


  



  return (
    <div id="container" ref ={wrapperRef}></div>
  );
}

