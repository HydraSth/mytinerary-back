const express = require('express')
const {getCity, addCity,dbCities,addCities,deleteCity,cityItineraries,updateCity,updateCities} = require('../controllers/cityController')
const {addIntinerary,allItineraries,getItineraryId,getItineraryName,deleteItinerary,modifyItinerary} = require('../controllers/intineraryController')

const {fieldAddCity, fieldName} = require('../middlewares/verification')
const {Verification} = require('../middlewares/verifyAddItinerary')

const router = express.Router()

const {passportVerificator} = require('../middlewares/verifyAuth')


//Cities in data base
router.get('/dbCities',dbCities) 
//Post method to generate a new cities
router.post('/newCities',addCities) 
//Post method to generate a new city
router.post('/newCity',fieldAddCity,addCity) 
//Get method to get a specific city
router.get('/city',fieldName,getCity) 
//Delete method to delete a city
router.delete('/deleteCity/:id',deleteCity) 
//Update method to update a city
router.put('/updateCity/:id',updateCity) 
//Update method to update cities
router.put('/updateCities',updateCities) 
//Method to generate a new itinerary
router.get('/cityItineraries',passportVerificator.authenticate("jwt",{session:false}),cityItineraries) 


//Method to generate a new itinerary
router.post('/addIntinerary',Verification,addIntinerary) 
//Method to get all itineraries
router.get('/allItineraries',allItineraries)
//Method to get a single itinerary by id
router.get('/getItineraryId',getItineraryId)
//Method to get a single itinerary by name
router.get('/getItineraryName',getItineraryName)
//Method to mdofiy a single itinerary
router.patch('/modifyItinerary',modifyItinerary)
//Method to delete a single itinerary by id
router.delete('/deleteItinerary',deleteItinerary)

router.use('/auth',require('./auth'))

module.exports = router;

//Delete method to delete all cities
// router.delete('/deleteAllCities',deleteAll) 