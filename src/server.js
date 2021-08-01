import { http } from './http';

http.listen(process.env.PORT);
console.log(`Server running on port: ${process.env.PORT}`);
