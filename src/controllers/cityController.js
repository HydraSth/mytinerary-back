const City= require("../models/city")

const updateCity = async(req,res) => {
    const {id} =req.params;
    const {country, name, photo,rating,description,intineraries}=req.body;
    try {
        await City.updateOne({_id:id},{
            country:`${country}`,
            name:`${name}`,
            photo:`${photo}`,
            rating:`${rating}`,
            description:`${description}`,
            intineraries:`${intineraries}`
        })
        res.status(200).json({
            message:"City updated"
        })
    } catch (error) {
        res.status(500).json({
            mesage:error.message
        })
    }
}

const updateCities = async(req,res) => {
    const cities = req.body;
    try {
        const updatedCities = await City.updateMany({}, cities);
        res.status(201).json({
            message: "Cities updated",
            cities: updatedCities
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

const addCities = async ({body}, res) => {
    const cities = body;
    try {
        const insertedCities = await City.insertMany(cities);
        res.status(201).json({
            message: "Cities added",
            cities: insertedCities
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
};

const addCity= (req,res) => {
    let {country, name, photo,rating,description}=req.body;
    try{
        const place= new City({
            country:`${country}`,
            name:`${name}`,
            photo:`${photo}`,
            rating:`${rating}`,
            description:`${description}`
        })    
        place.save()
        res.status(201).json({
            message:"City added",
            place
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

const dbCities= async(req,res) => {
    try {
        let cities= await City.find()
        res.status(200).json({
            cities
        })
    } catch (error) {
        res.status(500).json({
            mesage:error.message
        })
    }
}

const getCity= async(req, res) => {
    const {name} =req.query;
    try {
        const patron = new RegExp(`^${name}`,"i");
        let city_filtered= await City.find({ name: patron });
        if (city_filtered.length > 0) {
            res.send({
                message:"Sucessfully",
                city:city_filtered
            })
        }else{
            res.json({
                message:"City not found",
                city:[]
            })
        }
         } catch (error) {
        res.status(500).json({
            mesage:`Something went wrong: ${error.message}`
        })
    }
}

const cityItineraries= async(req, res) => {
    const {name} =req.query;
    try {
        const patron = new RegExp(`^${name}`,"i");
        let city_filtered= await City.find({ name: patron }).populate('itineraries');
        if (city_filtered.length > 0) {
            res.send({
                message:"Sucessfully",
                itineraries:city_filtered[0].itineraries
            })
        }else{
            res.json({
                message:"City not found",
                city:[]
            })
        }
         } catch (error) {
        res.status(500).json({
            mesage:`Something went wrong: ${error.message}`
        })
    }
}

const deleteCity = async(req,res) => {
    const {id} =req.params;
    try {
        await City.findByIdAndDelete(id)
        res.status(200).json({
            message:"City deleted"
        })
    } catch (error) {
        res.status(500).json({
            mesage:error.message
        })
    }
}

const deleteAll= async(req,res) => {
    try {
        await City.deleteMany()
        res.status(200).json({
            message:"All cities were deleted"
        })
    } catch (error) {
        res.status(500).json({
            mesage:error.message
        })
    }
}

module.exports = { getCity, addCity,dbCities,addCities,deleteCity,cityItineraries,updateCity,updateCities}
