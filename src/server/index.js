import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Routes from '../Routes'

const app = express()
app.use(express.static('public'))
const port = 3000

app.get('/*', (req, res) => {
  const reducer = (state = {name: 'hjh'}, action) => {
    return state
  }

  const store = createStore(reducer, applyMiddleware(thunk))
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>{Routes}</StaticRouter>
    </Provider>
  )

  res.send(
      `<html>
        <head>
          <title>ssr server demo</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script src="/index.js"></script>
        </body>
      </html>
      `
  )
})

app.listen(port)

