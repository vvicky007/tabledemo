import { useState,useCallback , useEffect, useRef } from "react"
import { Row,Col, ListGroupItem ,InputGroup,FormControl,Button} from "react-bootstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {postNotes,getNotes,getAnalysis} from './request'
import ListGroup from 'react-bootstrap/ListGroup'
import { faAngleRight,faAngleDown } from '@fortawesome/free-solid-svg-icons'
import debounce from 'lodash.debounce';
import { search } from "./utills/CustomSearch"
import { cloneDeep } from "@apollo/client/utilities"
import VoiceToText from "./VoiceToText"
export default function DisplayUL(){
    const [data,setData] = useState([])
    const [searchVal,setSearchVal] = useState('');
    const [filteredData,setFilteredData] = useState(data)
    const [analysis,setAnalysis] = useState([])
    const audioRef = useRef(null)
    const changeHandler = (e)=>{
        setSearchVal(e.target.value)
    }
    const debouncedChangeHandler = useCallback(debounce(changeHandler,800),[])
   
    useEffect(()=>{
        let filtered =  search([...data],searchVal)
        setFilteredData(cloneDeep(filtered))
    },[searchVal,data])
    useEffect(async()=>{
        if(data.length!==0){
            await postNotes(data)
        }   
    },[data])
    useEffect(async ()=>{
        // setData(await getNotes()) 
        const res = await getNotes()
        setData([...res])
        console.log('...')
        const analysed =  await getAnalysis()
        setAnalysis([...analysed])
     },[])
    const dataHandler = (obj)=>{
        setData([...data,obj])
    }
    return (
       <>
        <Col> 
            <input type="file" accept="audio/*" capture></input>
            <audio ref id="player" controls></audio>
            <InputGroup className="mb-3 mt-3" style={{width:'250px'}} >
                <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={debouncedChangeHandler}
                />
                {/* <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button> */}
            </InputGroup>
         </Col>
         {data&& <List data = {filteredData} />}
         <Col>
         <Row style={{marginTop:'20px'}}>
            <Col xs = {3}>Word</Col>
            <Col xs = {3}>Sentence</Col>
         </Row>
                {
                    analysis.map((ana)=>{
                        return (
                            <Row style={{marginTop:'10px'}}> 
                            <Col xs = {3}>{ana.word}</Col>
                            <Col xs = {3}>{ana.sentence}</Col>
                            </Row> 
                        )
                    })
                }
         </Col>
       </>
    )
}
function List({data}){
    return (
        <>  
        {
            data.map((node)=>{
                return <Tree node = {node}/>
            })
        }</>
      
    )
}
function Tree({node}){
    const [childVisibility,setChildVisibility] = useState(false);
    
    useEffect(()=>
    {
        setChildVisibility(()=>node.visibility)

    },[node])
    // if(!node.children) return ;
    return (
        <>
            <ListGroup style={{marginLeft:'10px'}} key = {node.id}>
                <ListGroup.Item style={{display:'flex'}} key = {node.id}>
                    {
                         node.children&&node.children.length>0&&
                         <FontAwesomeIcon icon={ childVisibility? faAngleDown:faAngleRight} onClick={()=>{setChildVisibility(!childVisibility)}} />
                    } 
                    <div style={{marginLeft:'8px'}}>
                    {node.title}
                    </div> 
                </ListGroup.Item>
                {
                    node.children&&childVisibility?
                    <List data={node.children} />:<></>
                }
            </ListGroup>
        </>
    )
}