'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const search = require('./search.js')

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// Only display # results
const MAX_RESULT = 3
// Facebook API token
const token = "EAADqvJj68NsBAHS3aMPCY7xjE2qltuzvtYVvdkoXPphZBCVz98eKUVgUfUviG3VY2si0QZAQ3nSZCzApZBTlPRGy4ZAZBkLa3MvaevZBaUeAETIdk0egIj7OlKvbXG2RmIqhiWLLPAaLHITP8zaEWeZBQVbsmZAKS0B55AU6nhEExlgZDZD"


// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text

		    try {
			    let pillStr = text.split(',')
		    	// sendTextMessage(sender, "DEBUG: pillStr length = " + pillStr.length)
			    if (pillStr.length == 3) {
			    	sendImTyping(sender, true)
			    	search.searchPill(pillStr[0], pillStr[1], pillStr[2], function(response) {
		    			sendImTyping(sender, false)
		    			// sendTextMessage(sender, "DEBUG: reponse = " + response)
			    		if (response == null) {
			    			sendTextMessage(sender, "Please enter a valid imprint, color, or shape")
			    		} else {
			    			// TODO: now it's returning img[], make it return Pill[], 
			    			// which contains all the pill info and img
			    			for (var i = 0; i < MAX_RESULT; i++) {
			    				sendImageMessage(sender, response[i])
			    			}
			    		}

			    	});
			    } else {
			    	sendTextMessage(sender, "Please enter in this format: \"{imprint}, {color}, {shape}\"")
			    }
		    	
		    } catch(e) {
		    	sendTextMessage(sender, "Something is wrong")
		    }
	    }
    }
    res.sendStatus(200)
})

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    sendMessage(sender, messageData)
}

function sendImageMessage(sender, img) {
    let messageData = { attachment:{ type: "image", payload: { url : img } } }
    sendMessage(sender, messageData)
}

function sendImTyping(sender, isTyping) {
	let isTypingStr = isTyping ? "typing_on" : "typing_off"
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			sender_action:isTypingStr
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function sendMessage(sender, messageData) {
	request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

