import SabreDevStudioFlight from 'sabre-dev-studio/lib/sabre-dev-studio-flight.js';
import { USER_ID, USER_PASS } from './config.js';
const sabre_dev_studio_flight = new SabreDevStudioFlight({
    client_id: USER_ID,
    client_secret: USER_PASS,
    uri: 'https://api.test.sabre.com'
});

export default sabre_dev_studio_flight
