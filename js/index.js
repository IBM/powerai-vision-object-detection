/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function addRow(table, cellType, values) {
  const row = document.createElement('tr');
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    const cell = document.createElement(cellType);
    const text = document.createTextNode(val);
    cell.appendChild(text);
    row.appendChild(cell);
  }
  table.appendChild(row);
}

function drawBoundaryBoxes(detectedObjects, ctx) {
  if (detectedObjects.length > 0) {
    for (let i = 0; i < detectedObjects.length; i++) {
      const obj = detectedObjects[i];
      ctx.strokeStyle="#FF0000";
      ctx.lineWidth = 10;
      const xmin = obj['xmin'];
      const ymin = obj['ymin'];
      const xmax = obj['xmax'];
      const ymax = obj['ymax'];
      ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
      ctx.font="8px serif";
      ctx.fillStyle="white";
      ctx.fillText(obj['label'] + ': ' + obj['confidence'].toFixed(3), xmin, ymax);
    }
  }
}

function detectedObjectsTable(detectedObjects, parent) {
  if (detectedObjects.length > 0) {

    const table = document.createElement('table');

    addRow(table, 'th', ['Label', 'Conf', 'Min Pos', 'Max Pos']);

    for (let i = 0; i < detectedObjects.length; i++) {
      const obj = detectedObjects[i];
      const label = obj['label'];
      const conf = obj['confidence'].toFixed(3);
      const minPos = '(' + obj['xmin'] + ',' + obj['ymin'] + ')';
      const maxPos = '(' + obj['xmax'] + ',' + obj['ymax'] + ')';

      addRow(table, 'td', [label, conf, minPos, maxPos]);
    }
    parent.appendChild(table);
  }
}

window.addEventListener('load', function () {

  const main = document.querySelector('main');

  function populateMain(jsonResult) {

    // Remove the old errors
    $('div.error').remove();

    // Remove the old img
    // TODO: using class if needed  $('img.imgClass').remove();
    $('img').remove();

    // Remove the old counts
    $('h2').remove();

    // Remove the old table
    $('table').remove();

    // Remove the old canvas
    $('canvas').remove();

    // Show the image if one was returned.
    if (jsonResult.hasOwnProperty("imageUrl")) {

      // const myImg = document.createElement('img');
      const myImg = new Image();
      myImg.style.display = "none";
      // myImg.className = 'imgClass';
      myImg.onload = function() {
        console.log(myImg.height);
        console.log(myImg.width);
        const myCanvas = document.createElement('canvas');
        const ctx = myCanvas.getContext('2d');
        ctx.canvas.height = myImg.height;
        ctx.canvas.width = myImg.width;
        ctx.drawImage(myImg, 0, 0, myImg.width, myImg.height);
        if (jsonResult.hasOwnProperty("classified")) {
          drawBoundaryBoxes(jsonResult.classified, ctx);
        }
        main.appendChild(myCanvas);
      };
      myImg.src = jsonResult.imageUrl;
      main.appendChild(myImg);
    }

    if (jsonResult.hasOwnProperty("classified")) {
      let classified = jsonResult.classified;

      // TODO: Count by label
      const myCount = document.createElement('h2');
      myCount.textContent = classified.length + " objects detected";
      main.appendChild(myCount);

      detectedObjectsTable(classified, main);
    }
    else {
      const myDiv = document.createElement('div');
      myDiv.className = 'error';
      myDiv.id = 'error-div';
      const myTitle = document.createElement('h3');
      myTitle.textContent = "ERROR";
      myDiv.appendChild(myTitle);
      // Dump keys/values
      for (const key in jsonResult) {
        if (jsonResult.hasOwnProperty(key)) {
          const myP = document.createElement('p');
          myP.textContent = key + ":  " + jsonResult[key];
          myDiv.appendChild(myP);
        }
      }
      main.appendChild(myDiv);
    }
  }

  var raw = top.frames['mytarget'];

  $('#mytarget').load(function(){

    let rawContent = raw.document.body.innerText;
    let rawJson = JSON.parse(rawContent);
    let rawJsonJson = JSON.parse(rawJson.data);
    console.log(rawJsonJson);

    populateMain(rawJsonJson);
  });

});

