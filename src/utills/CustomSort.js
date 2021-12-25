import { AddRounded } from "@material-ui/icons";

export function customSort(type = 'asc',key,array){
    let arrToBeSorted = [...array]
    if(key !=='categoryofclosedcharts'&&key ==='chartsopen'){
        if(type==='asc'){
            return arrToBeSorted.sort((a,b)=>{
                if(a[key].toLowerCase()>b[key].toLowerCase()) return 1;
                if(a[key].toLowerCase()<b[key].toLowerCase()) return -1;
                return 0;
            })
        }
        else{
            return arrToBeSorted.sort((a,b)=>{
                if(a[key].toLowerCase()>b[key].toLowerCase()) return -1;
                if(a[key].toLowerCase()<b[key].toLowerCase()) return 1;
                return 0;
            }) 
        }
    }
    else
    { 
    if(type==='asc'){
        return arrToBeSorted.sort((a,b)=>{
            if(parseInt(a[key].replace('<','')) > parseInt(b[key].replace('<','')) ) return 1;
            if(parseInt(a[key].replace('<',''))<  parseInt(b[key].replace('<',''))) return -1;
            return 0;
        })
    }
    else{
        return arrToBeSorted.sort((a,b)=>{
            if(parseInt(a[key].replace('<','')) > parseInt(b[key].replace('<','')) ) return -1;
            if(parseInt(a[key].replace('<',''))<  parseInt(b[key].replace('<',''))) return 1;
            return 0;
        }) 
    }

    }
}
export function customSearch(filters,array){
    let result = array.filter((obj)=>{
        let searchResults = Object.keys(filters).map((key)=>{
            if(key ==='level1status'){
                let selectedValues = filters[key].value.map((x)=>x.value)
                return selectedValues.includes(obj[key]) === true?1:-1;
            }
            if(key ==='categoryofclosedcharts'){
                let selectedValues = filters[key].value
                return selectedValues.includes(obj[key]) === true?1:-1;
            }
            return obj[key].search(filters[key].value)
        })
        const index = searchResults.findIndex((ele)=> ele === -1)
        if(index === -1){
            return obj
        }
    })
    return result
}
export function searchTree(data,id){
    
}
export function addNode(data,obj,parent){

}
export function createNode(string,length){
   
    let split = string.split(' '),firstWord = 0
    for(let i = 0 ; i < split.length;i++){
        if(split[i]!==''){
            firstWord =i 
            break;
        }
    }
    let node = {
        id:length.toString(),
        children:[],
        title:split[firstWord],
        visibility:false
    }
    let res = node
    for(let i = firstWord+1 ; i < split.length ; i++){
        // node.children
        node.children = [
            {
            id:node.id+'-0',
            children:[],
            title:split[i],
            visibility:false
        }
    ]
    node = node.children[0]
    }
   return res;
}

