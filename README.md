
# Whatsapp Server

This projects uses @WPPConnect lib to send automated messages on Whatsapp.



## Tech Stack

Node, Express, Typescript, Awilix, WPPConnect


## Run Locally

Clone the project

```bash
  git clone https://github.com/rodriguesabner/server-whatsapp
```

Go to the project directory

```bash
  cd server-whatsapp
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env.development file

`PORT`
## Features

- Multi Sessions
- Send text message
- Send image message
- Send location message
- Send video message


## API Reference

Collection Postman 👇

https://www.postman.com/gold-equinox-442131/workspace/wppconnect

#### Starting new session

```http
  POST /${FROM_PHONE_NUMBER_ID}/start
```

| Parameter              | Type     | Description                                 |
|:-----------------------|:---------|:--------------------------------------------|
| `FROM_PHONE_NUMBER_ID` | `string` | **Required**. Session name or Number Device |

#### Send Text Message

```http
  POST /${FROM_PHONE_NUMBER_ID}/messages
```

| Parameter              | Type     | Description                                 |
|:-----------------------|:---------|:--------------------------------------------|
| `FROM_PHONE_NUMBER_ID` | `string` | **Required**. Session name or Number Device |

Body:

```json
{
	"to": "NUMBER_HERE, MULTIPLE_NUMBERS_ACCEPTED",
	"type": "text",
	"recipient_type": "individual",
	"text": {
		"body": "Oi"  
	}
}
```

Check interface to send another types (location, image...): https://github.com/rodriguesabner/server-whatsapp/blob/master/src/interface/message.ts#L35
## Roadmap

- Unit tests
## Authors

- [@rodriguesabner](https://www.github.com/rodriguesabner)

