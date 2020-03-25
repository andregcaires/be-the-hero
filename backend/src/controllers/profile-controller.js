const connection = require('../database/connection');

module.exports = {

    async select(req, res) {

        const institution_id = req.headers.autorization;

        const incidents = await connection('incidents')
            .where('institution_id', institution_id)
            .select('*');

        return res.json(incidents);
    },

}