import Button from 'react-bootstrap/Button'

export default function CaretDown({id,click}){
    return (
        <div style = {{border:'none',background:'#fff',width:'4px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" id={id} style={{marginLeft: "12px",cursor: 'pointer'}} onClick = {click}>
                <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z">
                </path>
           </svg>
        </div>
    )
    }