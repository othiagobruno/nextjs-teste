import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import NotificationContainer from 'components/NotificationContainer';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import configureStore from 'appStore/index';
import nextReduxSaga from 'next-redux-saga';
import { PersistGate } from 'redux-persist/integration/react';
import Nav from 'components/Nav';

class MyApp extends App {
	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}

	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps };
	}

	render() {
		const { Component, pageProps, store } = this.props;

		if (typeof window === 'undefined') {
			return (
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Provider store={store}>
						<Nav />
						<Component {...pageProps} />
						<NotificationContainer />
					</Provider>
				</ThemeProvider>
			);
		}

		return (
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Provider store={store}>
					<PersistGate persistor={store.__PERSISTOR} loading={null}>
						<Nav />
						<Component {...pageProps} />
						<NotificationContainer />
					</PersistGate>
				</Provider>
			</ThemeProvider>
		);
	}
}

export default withRedux(configureStore)(nextReduxSaga(MyApp));
