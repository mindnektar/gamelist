import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'polyfills';
import store, { browserHistory } from 'store';
import App from './components/App';
import ScrollToTop from './components/ScrollToTop';
import '../style/app.sass';

injectTapEventPlugin();

const render = (AppComponent) => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <ScrollToTop>
                    <AppComponent />
                </ScrollToTop>
            </Router>
        </Provider>,
        document.getElementById('app'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });

    module.hot.accept('./reducers', () => {
        store.replaceReducer(require('./reducers').default);
    });
}
