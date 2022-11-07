import React, {Fragment} from "react";
import classes from './FlightsForm.module.css'

const FlightsForm = () =>{
    const submitHandler = ()=>{
        console.log('hi');
    }
    return(
        <Fragment>
            <form className= {classes.form} onSubmit={submitHandler}>
                <div>
                <label>From: </label>
                <input type= 'text' placeholder= 'city'/>
                </div>
                <div> <label>To: </label>
                <input type= 'text' placeholder= 'city'/>
                </div>
                <div><label>Departure: </label>
                <input type='date' placeholder= 'Departure date'/>
                </div>
                <div><label>Return: </label>
                <input type='date'  placeholder= 'Return'/>
                </div>
                <div> <label>Passengers: </label>
                <input type='number' placeholder= 'Passengers'/>
                </div>
               
                
                
               
                
            </form>


        </Fragment>
    )


}



export default FlightsForm