module.exports = {
    up: knex => knex.schema.table('game', table => table.string('compilation')),
    down: knex => knex.schema.table('game', table => table.dropColumn('system')),
};
