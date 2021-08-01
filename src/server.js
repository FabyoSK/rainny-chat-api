import { http } from './http';
import './app/websocket';

http.listen(process.env.PORT);
console.log(`Server running on port: ${process.env.PORT}`);
