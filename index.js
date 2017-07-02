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
			    			sendImgAndTxt(sender, response, 0, MAX_RESULT);
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

function sendImgAndTxt(sender, response, count, max) {
	if ( count >= max) {
		return;
	} else {
		sendImageMessage(sender, response[count].image, function() {
			sendTextMessage(sender, response[count].name);
			sendImgAndTxt(sender, response, count + 1, max);
		});
	}
}

function sendTextMessage(sender, text, callback) {
    let messageData = { text:text }
    sendMessage(sender, messageData, callback);
}

function sendImageMessage(sender, img, callback) {
    let messageData = { attachment:{ type: "image", payload: { url : img } } }
    sendMessage(sender, messageData, callback);
}

function sendImTyping(sender, isTyping, callback) {
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
	    if (callback) callback();
    })
}

function sendMessage(sender, messageData, callback) {
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
	    if (callback) callback()
    })
}



