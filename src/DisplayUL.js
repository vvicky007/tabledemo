import { useState,useCallback , useEffect } from "react"
import { Row,Col, ListGroupItem ,InputGroup,FormControl,Button} from "react-bootstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'
import { faAngleRight,faAngleDown } from '@fortawesome/free-solid-svg-icons'
import debounce from 'lodash.debounce';
import { search } from "./utills/CustomSearch"
import { cloneDeep } from "@apollo/client/utilities"

export default function DisplayUL({data}){
    const [searchVal,setSearchVal] = useState('');
    const [filteredData,setFilteredData] = useState(data)
    const changeHandler = (e)=>{
        setSearchVal(e.target.value)
    }
    const debouncedChangeHandler = useCallback(debounce(changeHandler,800),[])
    useEffect(()=>{
        let filtered =  search(data,searchVal)
        setFilteredData(cloneDeep(filtered))
    },[searchVal])
    return (
       <>
        <Col> 
            <InputGroup className="mb-3" style={{width:'250px'}} >
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
            <Row>
            <InputGroup className="mb-3" style={{width:'250px'}} >
                <FormControl
                placeholder="Enter Parent Value"
                aria-label="Enter Parent Value"
                aria-describedby="basic-addon2"
                onChange={debouncedChangeHandler}
                />
            </InputGroup>
            <InputGroup className="mb-3" style={{width:'250px'}} >
                <FormControl
                placeholder="Add Data"
                aria-label="Data"
                aria-describedby="basic-addon2"
                onChange={debouncedChangeHandler}
                />
                
            </InputGroup>
            <Button variant="outline-secondary" variant="primary" id="button-addon2" size="sm" style={{width:'200px',height:'38px'}} >
                    Search
                </Button>
            </Row>
         </Col>
         <List data = {filteredData} />
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
                    {node.label}
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