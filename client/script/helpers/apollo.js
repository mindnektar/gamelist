export const createHandler = (__typename, query, variables) => ({
    variables,
    update: (cache, { data }) => {
        cache.writeQuery({
            query,
            data: {
                games: [
                    ...cache.readQuery({ query }).games,
                    data[`create${__typename}`],
                ],
            },
        });
    },
});

export const deleteHandler = (__typename, query, variables) => ({
    variables,
    optimisticResponse: {
        __typename: 'Mutation',
        [`delete${__typename}`]: {
            __typename,
            ...variables,
        },
    },
    update: (cache, { data }) => {
        const name = query.definitions[0].selectionSet.selections[0].name.value;
        const items = cache.readQuery({ query })[name];
        const deletedId = data[`delete${__typename}`]._id;

        cache.writeQuery({
            query,
            data: {
                [name]: items.filter(item => item._id !== deletedId),
            },
        });
    },
});
