const express = require('express')
const {getClients, getClient} = require('../controllers/clientsController')
const router = express.Router()

router.get('/clients',getClients) 
router.get('/client',getClient) 

module.exports = router;

