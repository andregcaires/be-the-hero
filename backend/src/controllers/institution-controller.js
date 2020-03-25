const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create (req, res) {
        const {name, email, whatsapp, city, uf} = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('institutions').insert({
            id, name, whatsapp, email, city, uf
        });
    
        return res.json({ id: id});
    },

    async select(req, res) {
        const institutions = await connection('institutions').select('*');

        return res.json(institutions);
    }

}