const router = require('express').Router()
const db = require('../db/db');


// get, patch, delete together with this method
router.get('/t/:ticketId', (req, res)=>{
    const ticketId = req.params.ticketId;
    const ticket = db.findById(ticketId);
    res.status(200).json(ticket);
})
router.patch('/t/:ticketId', (req, res)=>{
    const ticketId = req.params.ticketId;
    const updatedTicket = db.updateById(ticketId, req.body);
    res.status(200).json({message: 'updated successfully', updatedTicket})
})
router.delete('/t/:ticketId', (req, res)=>{
    const ticketId = req.params.ticketId;
    db.deleteById(ticketId);
    res.status(203).send();
})

router.get('/u/:username', (req, res)=>{
    const username = req.params.username;
    const tickets = db.findByUserName(username);
    res.status(200).json(tickets)
})
router.patch('/u/:username', (req, res)=>{})
router.delete('/u/:username', (req, res)=>{})

router.post('/sell', (req, res)=>{
    const{username, price} = req.body;
    const ticket = db.create(username, price)
    res.status(201).json({message:'Ticket created successfully', ticket})
})
router.post('/bulk', (req, res)=>{
    const{username, price, quantity} = req.body;
    const tickets = db.bulkCreate(username, price, quantity)
    res.status(201).json({message:'Bulk Ticket created successfully', tickets})
})
router.get('/draw', (req, res)=>{
    const winnerCount = req.query.wc?? 3;
    const winners = db.draw(winnerCount);
    res.status(200).json(winners)
})
router.get('', (req, res)=>{
    const tickets = db.find();
    console.log(tickets);
    res.status(200).json(tickets);
})

// same as above
// router
//     .route('/tickets/t/:ticketId')
//     .get(()=>{})
//     .patch(()=>{})
//     .delete(()=>{})

module.exports = router;