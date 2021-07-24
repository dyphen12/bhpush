require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:contact@prismasys.site', publicVapidKey, privateVapidKey);

// Subscribe route

app.post('/subscribe', (req, res) => {
  const subscription = req.body

  console.log(subscription);

  res.status(201).json({});

  // create payload
  const payload = JSON.stringify({
    title: 'Prisma Bounty Hunter',
    body: 'I will pay you nothing but hey, you can eat!'
  });

  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

app.post('/subscribedev', (req, res) => {

    console.log(req.body);
    console.log('Im here');

    var title = req.body['pushit']['title'];
    var subtitle = req.body['pushit']['subtitle'];
    var sub = req.body['pushit']['sub'];
    var joburl = req.body['pushit']['url'];
    console.log(joburl);

    res.status(201).json({});

  // create payload
  const payload = JSON.stringify({
    title: title,
    body: subtitle,
    url: joburl
  });

  webPush.sendNotification(sub, payload)
    .catch(error => console.error(error));

});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});