
exports.up = function(knex) {
    return knex.schema.createTable('incidents', (table) => {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('institution_id').notNullable();
        table.foreign('institution_id').references('id').inTable('institutions');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
