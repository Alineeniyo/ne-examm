//use cors to allow the server to specify those who can access resources
export function corsFunction(req, res, next){

    const allowedOrigins = ['http://localhost:5173'];
    
    const origin = req.headers.origin;
     // Check if the request origin is in the list of allowed origins
    if (allowedOrigins.indexOf(origin) >= 0) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Set the CORS header to the origin of the request
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();     
}