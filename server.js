import 'dotenv/config';
import app from './api/app.js';
import dbConnect from './api/common/config/db.js';

const PORT = process.env.PORT || 3000


const init = async () => {
    try {
        // db calls
        await dbConnect();
        
        app.listen(prompt, () => {
            console.log(`Server is running on PORT : ${PORT} `)
        })   
    } catch (error) {
        console.log("Failed to statr server!!!", err);
        process.exit(1);
    }
}

init();


