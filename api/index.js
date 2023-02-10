const express = require('express')
const app = express()
// const { connect } = require('./database')

app.use(express.json())

app.get('/api/v1/sensor/all', async (req, res) => {
    const sqlString = `SELECT COUNT(id), * FROM Sensors`
    // return await pool.request().query(sqlString, (err, data) => {
    //     res.status(200).json({
    //         success: true,
    //         sensors: data.recordset
    //     })
    // })
    return res.status(200).json({
        sql: sqlString
    })
})

app.get('/api/v1/sensor', async (req, res) => {
    const { page, limit, idSensor, description, value } = req.query;
    const conditionLimit = limit ? +limit : 10;
    const conditionSkip = page ? (+page - 1) * limit : 0;

    const likeIdSensor = `%${idSensor}%`
    const likeDescription = `%${description}%`
    const conditionValue = parseFloat(value) || -100000000
    const condition =  `idSensor LIKE ${idSensor ? likeIdSensor : '%'} 
                    AND description LIKE ${description ? likeDescription : '%'} 
                    AND value >= ${value === '0' ? 0 : conditionValue}`

    // const pool = await connect;
    const sqlString = `SELECT COUNT(id), * FROM Sensors 
                    WHERE ${condition}
                    ORDER BY id DESC
                    OFFSET ${conditionSkip}
                    LIMIT ${conditionLimit}
                    `
    // return await pool.request().query(sqlString, (err, data) => {
    //     res.status(200).json({
    //         success: true,
    //         sensors: data.recordset
    //     })
    // })
    return res.status(200).json({
        sql: sqlString
    })
})

app.listen(3002, () => console.log('Server running at port 3002'))