import React from 'react';
import { render } from 'react-dom';
import App from './App';

const anchor = document.createElement('div');
anchor.id = 'extension-button';

document.body.insertBefore(anchor, document.body.childNodes[0]);

render(<App />, document.getElementById(anchor.id));
