import { graphql, compose } from 'react-apollo';

export default (queries, Component) => (
    compose(
        ...(Array.isArray(queries) ? queries : [queries]).map((query) => {
            const name = query.definitions[0].selectionSet.selections[0].name.value;

            return graphql(query, {
                name,
                props: (props) => {
                    const { [name]: data, ...result } = props[name];

                    return { [name]: { ...result, data } };
                },
            });
        })
    )(Component)
);
