import { useEffect, useState } from "react"
import Alert from 'react-bootstrap/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone , faMicrophoneSlash} from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import {createNode} from './utills/CustomSort'
export default function VoiceToText({dataHandler,length}){
    let SpeechRecognition
    const [error,setError] = useState()
    const [notes,setNotes] = useState()
    const [status,setStatus] = useState()
    const [recognition , setRecognition] = useState()
    useEffect(()=>{
        try{
         SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
         if(!recognition){
            setRecognition(new SpeechRecognition())
            Object.freeze(recognition)
         }
        }
        catch(e){
            setError(e)
        }
    },[])

    if(recognition){
        recognition.continuous = true;
        recognition.onresult = function(event) {

            // event is a SpeechRecognitionEvent object.
            // It holds all the lines we have captured so far. 
            // We only need the current one.
            var current = event.resultIndex;
          
            // Get a transcript of what was said.
            var transcript = event.results[current][0].transcript;
            setNotes(transcript)
            dataHandler(createNode(transcript,length))
            // Add the current transcript to the contents of our Note.
            // There is a weird bug on mobile, where everything is repeated twice.
            // There is no official solution so far so we have to handle an edge case.
            // var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
          
            // if(!mobileRepeatBug) {
            //   noteContent += transcript;
            //   noteTextarea.val(noteContent);
            // }
          };
          recognition.onstart = function() { 
            setStatus('Recording is started')
          }
          recognition.onspeechend = function() {
            setStatus('Ending the recording');
          }
          recognition.onerror = function(event) {
            if(event.error == 'no-speech') {
              setStatus('No speech was detected. Try again.');  
            };
            if(event.error === 'audio-capture'){
                setStatus('could not capture audio')
            }
            if (event.error == 'not-allowed'){
                setStatus('Info Blocked')
            }
          }
          
          
    }
    if(error){
        return  (
        <Alert variant='danger'>
            Some Error Occured, Please try refreshing
        </Alert>
        )
    }
    const stopRecording = ()=>{
        if(recognition){
            recognition.stop()
            setStatus('Recording is stopped')
        }
        else{
            setStatus('No Recording has been done...Please click record to start')
        }
    }
    const startRecording = ()=>{
        if(recognition){
            recognition.start();
            setStatus('Recording has Started')
        }
        else{
            setStatus('Please check your Permission')
        }
    }

    return (
        <>
            <textarea className="form-control" 
                     id="exampleFormControlTextarea1"  
                     value={notes} 
                     onChange={(e)=>{setNotes(e.target.value)}}
                     style={{marginTop:'20px',resize:'none',width:'400px'}}
                     >
            </textarea>
            <Button variant="primary" style={{marginTop:'10px'}} onClick={startRecording}>
                <FontAwesomeIcon icon={faMicrophone} style={{marginRight:'5px'}} />
                Record
            </Button>
            <Button variant="primary" style={{marginTop:'10px', marginLeft:'5px'}} onClick={stopRecording} >
                <FontAwesomeIcon icon={faMicrophoneSlash} style={{marginRight:'5px'}} />
                Stop
            </Button>
            <div style={{marginTop:'5px'}}>
               Status: {status}
            </div>
        </>
    )
   
}