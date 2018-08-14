module.exports = (knex, table) => knex.select().from(table).then(data => Promise.resolve(
    data.reduce((result, current) => ({
        ...result,
        [current.id]: current,
    }), {})
));
