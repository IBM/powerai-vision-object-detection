/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';
/* eslint-env node */

const express = require('express');
const request = require('request');
const MISSING_ENV =
  'Missing required runtime environment variable POWERAI_VISION_WEB_API_URL';

require('dotenv').config({
  silent: true,
});

const app = express();
const port = process.env.PORT || process.env.VCAP_APP_PORT || 8081;
const poweraiVisionWebApiUrl = process.env.POWERAI_VISION_WEB_API_URL;

console.log('Web API URL: ' + poweraiVisionWebApiUrl);

if (!poweraiVisionWebApiUrl) {
  console.log(MISSING_ENV);
}

app.use(express.static(__dirname));

app.post('/uploadpic', function(req, result) {
  if (!poweraiVisionWebApiUrl) {
    console.log(MISSING_ENV);
    result.send({data: JSON.stringify({error: MISSING_ENV})});
  } else {
    req.pipe(request.post({
      url: poweraiVisionWebApiUrl,
      agentOptions: {
        rejectUnauthorized: false,
      }}, function(err, resp, body) {
      if (err) {
        console.log(err);
      }
      console.log(body);
      result.send({data: body});
    }));
  }
});

app.listen(port, () => {
  console.log(`Server starting on ${port}`);
});

