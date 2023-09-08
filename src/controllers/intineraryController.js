const Intinerary= require("../models/intinerary")
const City= require("../models/city")

const addIntinerary=async (req,res) => {
    let {name,photo,author,price,duration,likes,hashtags,location,comments}=req.body;
    const patron = new RegExp(`^${location}`,"i");
    let city_filtered= await City.find({ name: patron })
    comments = comments ?? "No comments";
    try{
        const objIntinerary= new Intinerary({
            name:`${name}`,
            photo:`${photo}`,
            author:`${author}`,
            price:`${price}`,
            duration:`${duration}`,
            likes:`${likes}`,
            hashtags:`${hashtags}`,
            comments:`${comments}`,
            city:`${city_filtered[0]._id.toString()}`
        })    
        objIntinerary.save()
        await city_filtered[0].updateOne({itineraries:[...city_filtered[0].itineraries,objIntinerary]})
        //El populate se hace con el nombre de la propiedad que tiene el array, no con el nombre de su valor
        let city_updated= await City.find({ name: patron }).populate('itineraries');
        res.status(201).json({
            message:"New intinerary added",
            objIntinerary, 
            city_updated
        })

    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

const allItineraries=async (req,res) => {
    try{
        let intineraries= await Intinerary.find()
        res.status(200).json({
            intineraries
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}



const getItineraryId=async (req,res) => {
    try{
        let intinerary= await Intinerary.findById(req.query.id)
        res.status(200).json({
            intinerary
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

const getItineraryName=async (req,res) => {
    try{
        let city = await City.findOne({ name: req.query.name });
        let itineraries = await Intinerary.find({ city: city._id });
        res.status(200).json({
            itineraries
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

const deleteItinerary=async (req,res) => {
    const itinerary= await Intinerary.findById(req.query.id)
    const city= await City.findById(itinerary.city)
    let itinerary_index= city.itineraries.indexOf(req.query.id)
    let copy_itineraries= [...city.itineraries]
    await city.updateOne({itineraries:copy_itineraries.splice(itinerary_index,1)})
    console.log(itinerary_index);
    try{
        await Intinerary.findByIdAndDelete(req.query.id)
        res.status(200).json({
            message:"Itinerary deleted"
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

const modifyItinerary=async (req,res) => {
    try{
        cosnt = await Intinerary.findByIdAndUpdate(req.query.id,req.body)
        res.status(200).json({
            message:"Intinerary modified"
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

module.exports={addIntinerary,allItineraries,getItineraryId,getItineraryName,deleteItinerary,modifyItinerary}
