const express = require('express') 
const bodyParser = require('body-parser')
const mockData = require('./src/__mockdata__/mockData')

const toneAnalyzer = require('./src/serviceHelper')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/analyze', async (request, response) => {
  const text = request.body.text
  response.setHeader('Content-Type', 'application/json')

  toneAnalyzer.tone({ tone_input: text, content_type: 'text/plain'},
    (err, tone) => {
      if (err) {
        console.log(err);
      } else {
        response.status(200).json(tone)
      }
    }
  )

})

app.post('/mockAnalyze', async(request, response) => {

  response.setHeader('Content-Type', 'application/json')
  response.status(200).json(mockData)
})

app.listen(3000, () => {
  console.log('express running localhost3000')
})
