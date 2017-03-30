import {render} from 'react-dom';
import FWRouter from './utils/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for React onTouchTap
injectTapEventPlugin();

// Render router object inside of app html element
render(FWRouter, document.getElementById('app'));
