# honeybadger-takehome

## How to deploy

Set proper values on `.env` file (See `.env.sample`) and execute `docker-compose up -d`. 

The endpoint will be available at port 3000.

## How to test it

After it is running you can send a POST request to the `/records` endpoint with a JSON payload like this:

    {
        "RecordType": "Bounce",
        "Type": "SpamNotification",
        "TypeCode": 512,
        "Name": "Spam notification",
        "Tag": "",
        "MessageStream": "outbound",
        "Description": "The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.",
        "Email": "zaphod@example.com",
        "From": "notifications@honeybadger.io",
        "BouncedAt": "2023-02-27T21:41:30Z",
    }

The presence of the `TypeCode` key with value `512` will trigger a message to the Slack channel specified on the `.env` file.
