import app from './api/app.js';


const PORT = process.env.PORT || 3000


const init = async () => {
    try {
        // db calls

        app.listen(prompt, () => {
            console.log(`Server is running on PORT : ${PORT} `)
        })   
    } catch (error) {
        console.log(`Server error`)
    }
}

init();


