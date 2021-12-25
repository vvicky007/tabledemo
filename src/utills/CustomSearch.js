
export function deepSearch(data,searchVal){
    if(!data) return ;
    if(searchVal==='') 
    {   
        data.visibility = false;
        return data
    };
    if(data.title){
        if(data.title.toLowerCase().includes(searchVal.toLowerCase()))
        {   
            data.visibility = true
            return data;
        }
        else{
            if(!data.children){
                data.visibility = false;
            }
            
        }
    }
    if(data.children){
        for(let i = 0 ; i < data.children.length ; i++){
            // debugger;
            if(deepSearch(data.children[i],searchVal).visibility === true){
                data.visibility = true
            }
        }
        let flag = 0 ;
        for(let i = 0 ; i < data.children.length ; i++){
            if(data.children[i].visibility){
                data.visibility = true;
                flag++;
                break;
            }
        }
        if(flag === 0){
            data.visibility = false;
        }  
    }
    return data
}
export function search(data,searchVal){
    let result = []
    for(let i = 0 ; i < data.length;i++){
        result.push(deepSearch(data[i],searchVal))
    }
    return result
}