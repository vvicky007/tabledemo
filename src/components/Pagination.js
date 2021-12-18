import {Pagination as PaginationB} from 'react-bootstrap'
export default function Pagination({numofPages,setPage,currentPage}){
    const pageArray = Array.from(Array(numofPages).keys())
    return (
        <>
            <PaginationB>
                <PaginationB.First onClick={()=>setPage(1)}/>
                <PaginationB.Prev onClick={()=>{
                    if(currentPage !==1) {
                        setPage(currentPage-1)
                    }
                }} />
                {
                   pageArray.map((num)=><PaginationB.Item key = {num+1} active = {currentPage === num+1} onClick={()=>setPage(num+1)} >{num+1}</PaginationB.Item>)
                }
                <PaginationB.Next onClick={()=>{
                    if(currentPage !==5) {
                        setPage(currentPage+1)
                    }
                }} />
                <PaginationB.Last onClick={()=>setPage(5)}/>
            </PaginationB>
        </>
    )
}