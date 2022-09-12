/** Import libraries **/
import express from 'express';

/** CREATE APPLICATION **/
const app = express();

/** ROUTES **/
app.get('/ads', (request, response) => {
    return response.json([
        {id: 1, name: 'Ad 1'},
        {id: 2, name: 'Ad 2'},
        {id: 3, name: 'Ad 3'},
        {id: 4, name: 'Ad 4'},
        {id: 5, name: 'Ad 5'},
    ]);
});

// Port where the previous route is running
app.listen(3000);