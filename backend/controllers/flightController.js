import FlightsCollection from '../models/flightsschema.js';
import UserCollection from '../models/usersschema.js';



export const getAllFlights = async(req, res, next) => {
    try{
        const flights = await FlightsCollection.find();
        res.json({
            success: true,
            data: flights
        })

    }catch(err){
        next(err)
    }
}

export const createFlight  = async(req, res, next) => {
    console.log(req.body);
    try{

        const flight = new FlightsCollection(req.body);
        await flight.save()
        const user = await UserCollection.findByIdAndUpdate(flight.userId, {$push: {flights: flight._id}}, {new:true})
     
        res.json({
            success: true,
            data: user
        })
    }catch(err){
        next(err)
    }
}

    export const deleteFlight = async(req, res, next) => {
        try{
            const {id} = req.params;
            console.log(id);
            const bookedFlight = await FlightsCollection.findById(id)
            console.log(bookedFlight);
            if(bookedFlight){
                await FlightsCollection.deleteOne({_id: bookedFlight._id})
                
               const updateUser = await UserCollection.findByIdAndUpdate(bookedFlight.userId, {$pull: {flights: id}}, {new: true})
               console.log(updateUser);
                res.send({
                    success: true,
                    data: updateUser
                }) 
            }else{
                throw new Error( 'The bookmark does not exist!' )
            }
        }catch(err){
           
            next(err)
        }
    }