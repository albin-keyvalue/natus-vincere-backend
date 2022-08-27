const service = require('./service/index.js');
const express = require('express')

const app = express()
const port = 3000


app.get('/combinations', async (req, res) => {
	var response = null
	if (req.query.type == 'top') 
		response = await service.getTopRecommendation(req.query.color, req.query.gender)
	else if (type == 'bottom')
		response = await service.getBottomRecommendation(req.query.color, req.query.gender)
	else if (type == 'shoes')
		response = await service.getShoeRecommendation(req.query.color, req.query.gender)
	res.send(response)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})