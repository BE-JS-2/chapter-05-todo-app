const express = require('express')
const app = express()
const port = 3000
const mainRoutes = require('./src/routes/');
const errorHandler = require('./src/middleware/errorHandler');
const swaggerJSON = require('./swagger_output.json')
const swaggerUI = require('swagger-ui-express')



app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',mainRoutes)
app.use(errorHandler)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.listen(port,() => {
    console.log(`server running ${port}`)
})