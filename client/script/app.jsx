import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import createHistory from 'history/createHashHistory';
import 'polyfills';
import App from './components/App';
import ScrollToTop from './components/ScrollToTop';
import '../style/app.sass';

const client = new ApolloClient({
    uri: '/api',
});

const render = (AppComponent) => {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Router history={createHistory()}>
                <ScrollToTop>
                    <AppComponent />
                </ScrollToTop>
            </Router>
        </ApolloProvider>,
        document.getElementById('app'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });
}
