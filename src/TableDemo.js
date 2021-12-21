import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react';
import DropdownList from "react-widgets/DropdownList";
import styled from 'styled-components/macro';
import CaretDown from './components/CaretDown';
import CaretUp  from './components/CaretUp';
import { MultiSelect } from 'react-multi-select-component';
import {getData} from './request'
import { customSort,customSearch } from './utills/CustomSort';
import Pagination from './components/Pagination';
const cols = ['PROVIDER ID','PROVIDER NAME','PROVIDER GROUP ID','PROVIDER GROUP','PROVIDER PHONE','LEVEL 1 STATUS','CATEGORY OF CLOSED CHARTS','CHARTS OPEN']
// const rows = Array.from({length:10},()=>{
//   return {
//     providerid:'12',
//     providername:'smith rowe',
//     providergroupid:'11',
//     providergroup:'Arsenal',
//     providerphone:'98456789123',
//     level1status:'in progress',
//     categoryofclosedcharts:'<6',
//     chartsopen:'10'
//   }
// })
const MultiSelectLevel1 = styled(MultiSelect)`
font-size:12px;
border-radius:8px;
.dropdown-container{
  height:30px;
}
.dropdown-heading{
  height:30px !important;
}
`
const DropdownListStyled = styled(DropdownList)`
font-size:12px;
height:100% !important;
`

const dropdownlabels = (arr)=>{
  return arr.map((x)=>({label:x,value:x}))
}

function TableDemo() {
  const [tableFilters,setTableFilters] = useState({
    providerid:{
      sort:'asc',
      value:''
    },
    providername:{
      sort:'asc',
      value:''
    },
    providergroupid:{
      sort:'asc',
      value:''
    },
    providergroup:{
      sort:'asc',
      value:''
    },
    providerphone:{
      sort:'asc',
      value:''
    },
    level1status:{
      sort:'asc',
      value:['In Progress','Waiting','Confirmed'].map((x)=>({label:x,value:x}))
    },
    categoryofclosedcharts:{
      sort:'asc',
      value:['All Selected','<5','<10','0','<20']
    },
    chartsopen:{
      sort:'asc',
      value:''
    }
  })
  const [pagenum,setPageNum] = useState(1)
  const [rows,setRows] = useState([])
  const [filteredRows,setFilteredRows] = useState(rows)
  const [sortKey,setSortKey] = useState('providerid')
  useEffect(async ()=>{
    const start = (pagenum-1)*10+1
    const end = pagenum*10+1
    const data =  await getData(start,end)
    const sortedData = customSearch(tableFilters,data)
    const filteredData = customSort(tableFilters[sortKey].sort,sortKey,sortedData)
    setRows([...filteredData]) 
  },[pagenum,tableFilters])
  const changeFilters = (e)=>{
    
    setTableFilters({
      ...tableFilters,
      [e.target.name]:{
        ...tableFilters[e.target.name],
        value:e.target.value
      },
    })
  }
  const clickedSort = (e)=>{
    setSortKey(e.target.id)
    setTableFilters(()=>{
      let toggled = tableFilters[e.target.id]&& tableFilters[e.target.id].sort;
      if(toggled === 'asc'){
        const revertVals = {}
        for(let key in tableFilters){
          revertVals[key] = { value:tableFilters[key].value,sort:'asc'}
        }
        return {
          ...revertVals,
          [e.target.id]:{
            ...tableFilters[e.target.id],
            sort:'desc'
          },
        }
      }
      if(toggled === 'desc'){
        const revertVals = {}
        for(let key in tableFilters){
          revertVals[key] = { value:tableFilters[key].value,sort:'asc'}
        }
        return {
          ...revertVals,
          [e.target.id]:{
            ...tableFilters[e.target.id],
            sort:'asc'
          },
        }
      }
      return tableFilters 
    })
    
  }
  const changeMultiSelect = (args)=>{
    console.log('args ',args)
    setTableFilters({
      ...tableFilters,
      level1status:{
        ...tableFilters.level1status,
        value:[...args]
      }
    })
  }
  const changePageNum = (pagenum)=>{
    setPageNum(pagenum)
  }
  const changeDropdown = (args)=>{
    setTableFilters(()=>{
      if(args === 'All Selected'){
        args = ['All Selected','<5','<10','0','<20']
      }
      else{
        args = [args]
      }
      return {
        ...tableFilters,
        categoryofclosedcharts:{
          ...tableFilters.categoryofclosedcharts,
          value:[...args]
        }
      }
    })
  }
  return (
    <div >
      <div style={{overflow:'scroll'}}>
        <Table responsive="sm" bordered >
        <thead>
          <tr>
            {
              cols.map((col)=>{
                return (
                <th style={{whiteSpace:'nowrap',width:'150px !important'}} key={col}>
                  <div style={{display:'flex', width:'150px'}}>
                  {col}
                  { 
                    tableFilters[col.replace(/\s/g,'').toLowerCase()]&&
                    tableFilters[col.replace(/\s/g,'').toLowerCase()].sort === 'asc'?
                    <CaretDown click={clickedSort} id={col.replace(/\s/g,'').toLowerCase()} />:
                    <CaretUp  click={clickedSort} id={col.replace(/\s/g,'').toLowerCase()}/>
                  }
                  </div>
                
                
                  
                  <br/>
                  {
                  (col === 'PROVIDER ID'
                    || col === 'PROVIDER NAME'
                    || col === 'PROVIDER GROUP ID'
                    || col === 'PROVIDER GROUP'
                    || col === 'PROVIDER PHONE'
                  )
                  &&
                  <input 
                  type = 'text'
                  style = {{ border:'0.5px solid black', borderRadius:'5px',marginTop:'8px'}} 
                  placeholder={`Enter ${col.toLowerCase()}`}
                  onChange={changeFilters}
                  value={tableFilters[col.replace(/\s/g,'').toLowerCase()]?tableFilters[col.replace(/\s/g,'').toLowerCase()].value:''}
                  name = {col.replace(/\s/g,'').toLowerCase()}
                  />
                  }
                  {
                    col === 'LEVEL 1 STATUS'&&
                    <div style={{ width:'150px' ,height:'30px'}}>
                    <MultiSelectLevel1 
                      options={dropdownlabels(['In Progress','Waiting','Confirmed'])}
                      value = {[...tableFilters[col.replace(/\s/g,'').toLowerCase()].value]}
                      onChange={changeMultiSelect}
                      />
                    </div>
                    
                  }
                  {
                  col === 'CATEGORY OF CLOSED CHARTS'&&
                  <div style={{ width:'270px' }}>
                  <DropdownListStyled
                  defaultValue={'All Selected'}
                  data={['All Selected','<5','<10','0','<20']}
                  onChange={changeDropdown}
                />
                  </div>
                  }
                </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {rows.map((row,idx)=>{
            return (
            <tr key = {idx} >
              {
                Object.keys(row).filter((key)=>key!=='__typename').map((key,idx)=>{
                  return (
                    <td key={idx}>{row[key]}</td>
                  )
                })
              }
            </tr> 
            )
          })}
        </tbody>
        </Table>
      </div>
    
    <div style={{ float:'right',marginRight:'10px',marginTop:'20px'}}>
      <Pagination numofPages = {5} setPage={changePageNum} currentPage = {pagenum}/>
    </div>
    
  </div>
  );
}

export default TableDemo;
