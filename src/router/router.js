const express = require('express')
const {getCity, addCity,dbCities,addCities,deleteCity,deleteAll,updateCity} = require('../controllers/clientsController')
const router = express.Router()
const {fieldAddCity, fieldName} = require('../middlewares/verification')

//Cities in data base
router.get('/dbCities',dbCities) 
//Post method to generate a new cities
router.post('/newCities',addCities) 
//Post method to generate a new city
router.post('/newCity',fieldAddCity,addCity) 
//Get method to get a specific city
router.get('/city',fieldName,getCity) 
//Delete method to delete all cities
// router.delete('/deleteAllCities',deleteAll) 
//Delete method to delete a city
router.delete('/deleteCity/:id',deleteCity) 
//Update method to update a city
router.put('/updateCity/:id',updateCity) 

module.exports = router;

