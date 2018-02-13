module.exports = {
    up: knex => Promise.all([
        knex.schema.createTable('system', (table) => {
            table.uuid('id').notNullable();
            table.string('name').notNullable();
            table.integer('order').notNullable();
            table.unique('id');
        }),
        knex.schema.createTable('game', (table) => {
            table.uuid('id').notNullable();
            table.string('title').notNullable();
            table.uuid('system').notNullable();
            table.float('rating', 1);
            table.string('genre');
            table.integer('release');
            table.string('developer');
            table.text('description');
            table.string('youTubeId');
            table.unique('id');
            table.foreign('system').references('system.id');
        }),
        knex.schema.createTable('dlc', (table) => {
            table.uuid('id').notNullable();
            table.string('title').notNullable();
            table.uuid('parent').notNullable();
            table.float('rating', 1);
            table.unique('id');
            table.foreign('parent').references('game.id');
        }),
    ]),
    down: knex => Promise.all([
        knex.schema.dropTableIfExists('system'),
        knex.schema.dropTableIfExists('game'),
        knex.schema.dropTableIfExists('dlc'),
    ]),
};
