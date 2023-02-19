const Ticket = require('../models/Ticket')
class MyDB{
    constructor(){
        this.tickets = []
    }

    /**
     * create and save a new ticket
     * @param {string} username 
     * @param {number} price 
     * @returns {Ticket} return a ticket object
     */
    create(username, price){
        const ticket = new Ticket(username, price);
        this.tickets.push(ticket)
        return ticket
    }

    /**
     * create multiple ticket for a single user
     * @param {string} username
     * @param {number} price
     * @param {number} quantity
     * @return {Array<Ticket>}
     */
    //sell multiple ticket
    bulkCreate(username, price, quantity){
        const result = []
        for (let i = 0; i < quantity; i++) {
           const ticket = this.create(username, price)
           result.push(ticket)
        }
        return result;
    }

    /**
     * return all available ticket
     */
    //return all tickets
    find(){
        return this.tickets;
    }
    
    /**
     * 
     * @param {string} ticketId 
     * @returns {Ticket}
     */
    //single tickets
    findById(ticketId){
        const ticket = this.tickets.find(
            /**
             * @param {Ticket} ticket
             */
            (ticket)=> ticket.id == ticketId  
        );
        return ticket;
    }

    /**
     * 
     * @param {string} username 
     * @return 
     */
    findByUserName(username){
        const tickets = this.tickets.filter(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.username == username
        );
        return tickets
    }
    //update ticket info
    /**
     * 
     * @param {string} ticketId 
     * @param {{username: string, price: number}} ticketBody 
     * @returns {Ticket}
     */
    updateById(ticketId, ticketBody){
        const ticket = this.findById(ticketId);
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price ?? ticket.price;
        ticket.updateAt = new Date();

        return ticket;
    }

    /**
     * @param{string} ticketId
     */
    //delete ticket info
    deleteById(ticketId){
        const index = this.tickets.findIndex((ticket)=>ticket.id == ticketId)
        if(index !== -1){
            this.tickets.splice(index, 1)
            return true
        }
        else{
            return false
        }
    }

/**
 * find winners
 * @param {number} winderCount 
 * @returns {Array<Ticket>}
 */
    draw(winnerCount){
        // let indexes = new Array(winnerCount)
        // for(let i = 0; i < indexes.length; i++){
        //     let index = Math.floor(Math.random() * this.tickets.length);
        //     while(indexes.includes(index)){
        //         index = Math.floor(Math.random() * this.tickets.length)
        //     }
        //     indexes[i] = index;
        // }
        // const winners = indexes.map((index) => this.tickets[index]);
        // return winners;
        let winnerAIndexes = new Array(winnerCount);

        let index = 0;
        while(index < winnerCount){
            let winnerIndex = Math.floor(Math.random() * this.tickets.length);
            console.log('winner index', winnerIndex);
            if(!winnerAIndexes.includes(winnerIndex)){
                winnerAIndexes[index++] = winnerIndex;
                continue;
            }
        }
        const winners = winnerAIndexes.map((index)=> this.tickets[index]);
        return winners;
    }
}

const myDB = new MyDB();
module.exports = myDB;