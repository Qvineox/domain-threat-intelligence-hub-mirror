import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'localhost:7091/ws/queue';

export const socket = io(URL);