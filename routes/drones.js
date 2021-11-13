const express = require('express');
const router = express.Router();
const DroneModel = require('../models/Drone.model')
// require the Drone model here

router.get('/drones', (req, res, next) => {
  
    DroneModel.find()
    .then((drone) => {
      res.render('drones/list.hbs', {drone})
    })
    .catch(() => {
     next('No list of drones available')
    })

});

router.get('/drones/create', (req, res, next) => {
    res.render('drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
  
  const {name, propellers, maxSpeed} = req.body

  DroneModel.create({name, propellers, maxSpeed})
        .then(() => {
            
            res.redirect('/drones/')
        })
        .catch(() => {
            next("Unable to create new drone")
        })

});

router.get('/drones/:id/edit', (req, res, next) => {
  
  const {id} = req.params

    DroneModel.findById(id)
        .then((drone) => {
          
            res.render('drones/update-form.hbs', {drone})
            //res.status(404).render("not-found");

        })
        .catch(() => {
            next('Cannot find requested drone')
        })
});

router.post('/drones/:id/edit', (req, res, next) => {
  const {name, propellers, maxSpeed} = req.body
  const {id} = req.params
  

  DroneModel.findByIdAndUpdate(id, {name, propellers, maxSpeed})
        .then(() => {
            
            res.redirect('/drones/')
        })
        .catch(() => {
            next("Unable to update required drone")
        })
});

router.post('/drones/:id/delete', (req, res, next) => {
  const {id} = req.params

  DroneModel.findByIdAndRemove(id)
  .then((drone) => {
      //then send the user to the home page
      res.redirect('/drone/', {drone})
  })
  .catch(() => {
      next('Not able to delete drone')
  })
});

module.exports = router;
