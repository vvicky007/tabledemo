import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import { useState } from 'react';
import DropdownList from "react-widgets/DropdownList";
import styled from 'styled-components/macro';
import Combobox from "react-widgets/Combobox";
import { MultiSelect } from 'react-multi-select-component';
const cols = ['PROVIDER ID','PROVIDER NAME','PROVIDER GROUP ID','PROVIDER GROUP','PROVIDER PHONE','LEVEL 1 STATUS','CATEGORY OF CLOSED CHARTS','# OF CHARTS OPEN']
const rows = Array.from({length:10},()=>{
  return {
    providerid:'12',
    providername:'smith rowe',
    providergroupid:'11',
    providergroup:'Arsenal',
    providerphone:'98456789123',
    level1status:'in progress',
    categoryofclosedcharts:'<6',
    chartsopen:'10'
  }
})
const MultiSelectLevel1 = styled(MultiSelect)`
font-size:12px;
width:100%;
border-radius:8px;
`
const DropdownListStyled = styled(Combobox)`
font-size:10px;
`

const dropdownlabels = (arr)=>{
  return arr.map((x)=>({label:x,value:x}))
}

function App() {
  const [tableFilters,setTableFilters] = useState({
    providerid:'',
    providername:'',
    providergroupid:'',
    providergroup:'',
    providerphone:'',
    level1status:'',
    categoryofclosedcharts:'',
    chartsopen:''
  })
  const changeFilters = (e)=>{
    setTableFilters({
      ...tableFilters,
      [e.target.name]:e.target.value,
    })
  }
  return (
    <div>
    <Table responsive="sm" bordered >
      <thead>
        <tr>
          {
            cols.map((col)=>{
              return (
              <th>
                {col}
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
                value={tableFilters[col.replace(' ','').toLowerCase()]}
                name = {col.replace(' ','').toLowerCase()}
                />
                }
                {
                  col === 'LEVEL 1 STATUS'&&
                  <MultiSelectLevel1 
                  options={dropdownlabels(['Outstanding','Done'])}
                  value = {[]}
                   />
                }
                {
                  col === 'CATEGORY OF CLOSED CHARTS'&&
                <DropdownListStyled
                defaultValue="Yellow"
                data={["Red", "Yellow", "Blue", "Orange"]}
              />
                }
              </th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
       {rows.map((row)=>{
         return (
          <tr>
            {
              Object.keys(row).map((key)=>{
                return (
                  <td>{row[key]}</td>
                )
              })
            }
          </tr> 
         )
       })}
      </tbody>
    </Table>
    <DropdownListStyled
                  data={['1','2']}
                  dataKey='id'
                  textField='name'
                  defaultValue={1}
                />
                

  </div>
  );
}

export default App;
