import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import App from './App.tsx';
import './App.css';

const theme = extendTheme({
	styles: {
		global: {
			body: {
				fontFamily: "'Lato', sans-serif",
				minHeight: '100vh',
			},
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
