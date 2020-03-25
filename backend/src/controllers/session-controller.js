const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create (req, res) {
        const { id } = req.body;
    
        const institution = await connection('institutions')
            .where('id', id)
            .select('name')
            .first();

        if (!institution) {
            return res.status(400).json({ error: 'No institutuion found by this id' });
        }
    
        return res.json(institution);
    },

    async select(req, res) {
        const institutions = await connection('institutions').select('*');

        return res.json(institutions);
    }

}