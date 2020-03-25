const connection = require('../database/connection');

module.exports = {
    async create (req, res) {
        const { title, description, value } = req.body;
        
        const institution_id = req.headers.autorization;
    
        const [id] = await connection('incidents').insert({
            title, description, value, institution_id
        });
    
        return res.json({ id: id});
    },

    async select(req, res) {

        const { page = 1 } = req.query;

        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('institutions', 'institution.id', '*', indicents.institution_id)
            .limit(5)
            .offset((page - 1) - 5)
            .select(['incidents.*'], 
                'institutions.name', 
                'institutions.email', 
                'institutions.whatsapp',
                'institutions.city',
                'institutions.uf');

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    async delete(req, res) {

        const { id } = req.params;
        const institution_id = req.headers.autorization;


        const incident = await connection('incidents')
            .where('id', id)
            .select('institution_id')
            .first();

        if (incident.institution_id !== institution_id) {
            return res.status(401).json({ error: 'Operation not allowed' });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    },

}