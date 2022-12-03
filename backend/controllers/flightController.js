import FlightsCollection from '../models/flightsschema.js';



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
    try{
        const flight = new FlightsCollection(req.body);
        await flight.save()
        res.json({
            success: true,
            data: flight
        })
    }catch(err){
        next(err)
    }
}

    export const deleteFlight = async(req, res, next) => {
        try{
            const {id} = req.params;
            const bookedFlight = await FlightsCollection.findById(id)
            if(bookedFlight){
                const deletedFlight = await FlightsCollection.deleteOne({_id: bookedFlight._id})
                res.json({
                    success: true,
                    status: deletedFlight
                })
            }
        }catch(err){
            next(err)
        }
    }