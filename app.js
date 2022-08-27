const service = require('./service/index.js');
const express = require('express')
var cors = require('cors')

const app = express()
const port = 9090

app.use(cors())

app.get('/combinations', async (req, res) => {
	var response = null
	if (req.query.type == 'top' || req.query.type == 'shirt' || req.query.type == 'casual-shirt' || req.query.type == 't-shirt') 
		response = await service.getTopRecommendation(req.query.color, req.query.gender)
	else if (req.query.type == 'bottom' || req.query.type == 'jeans')
		response = await service.getBottomRecommendation(req.query.color, req.query.gender)
	else if (req.query.type == 'shoes'  || req.query.type == 'heels')
		response = await service.getShoeRecommendation(req.query.color, req.query.gender)
	res.send(response)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})