require('../db') 
const mongoose = require('mongoose')

let DroneModel = require('../models/Drone.model')

DroneModel.create([
    { name: "Trololo", propellers: 6, maxSpeed: 25},
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
   
])
    .then(() => {
        console.log('All drones were created')
        mongoose.disconnect()
    })
    .catch((err) => {
        console.log('Error', err)
        mongoose.disconnect()
    })