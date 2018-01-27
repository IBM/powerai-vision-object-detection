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

function textColor(label) {
  switch (label) {
    case 'coca-cola': return 'white';
    case 'diet coke': return 'red';
    case 'coke zero': return 'white';
    default: return 'cornsilk';
  }
}

function boundaryColor(label) {
  switch (label) {
    case 'coca-cola': return 'red';
    case 'diet coke': return 'silver';
    case 'coke zero': return 'black';
    default: return 'cornflowerblue';
  }
}

function countByLabel(detectedObjects) {

  let countByLabel = {};
  if (detectedObjects.length > 0) {
    for (let i = 0; i < detectedObjects.length; i++) {
      const obj = detectedObjects[i];
      const label = obj['label'];
      countByLabel[label] = (countByLabel[label] || 0) + 1;
    }
  }

  let ret_strings = [];
  for (const key in countByLabel) {
    if (countByLabel.hasOwnProperty(key)) {
      ret_strings.push(countByLabel[key] + ' ' + key);  // e.g. 1 coca-cola
    }
  }
  return ret_strings.join(', ');
}

function drawBoundaryBoxes(detectedObjects, ctx) {

  ctx.lineWidth = 5;
  ctx.font="24px serif";

  if (detectedObjects.length > 0) {
    for (let i = 0; i < detectedObjects.length; i++) {
      const obj = detectedObjects[i];
      const label = obj['label'];
      const color = boundaryColor(label);
      ctx.strokeStyle = color;
      const xmin = obj['xmin'];
      const ymin = obj['ymin'];
      const xmax = obj['xmax'];
      const ymax = obj['ymax'];
      ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);

      // Now fill a rectangle at the top to put some text on.
      ctx.fillStyle = color;
      ctx.fillRect(xmin, ymin, xmax - xmin, 25);
      ctx.fillStyle = textColor(label);
      ctx.fillText(label + ': ' + obj['confidence'].toFixed(3), xmin + 5, ymin + 20);
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

  const article = document.querySelector('article');

  function populateMain(jsonResult) {

    // Remove previous results
    article.innerHTML = '';

    // Show the image if one was returned.
    if (jsonResult.hasOwnProperty("imageUrl")) {

      const myImg = new Image();
      myImg.style.display = "none";
      myImg.onload = function() {
        const myCanvas = document.createElement('canvas');
        const ctx = myCanvas.getContext('2d');
        ctx.canvas.height = myImg.height;
        ctx.canvas.width = myImg.width;
        ctx.drawImage(myImg, 0, 0, myImg.width, myImg.height);
        if (jsonResult.hasOwnProperty("classified")) {
          drawBoundaryBoxes(jsonResult.classified, ctx);
        }
        article.appendChild(myCanvas);
      };
      myImg.src = jsonResult.imageUrl;
      article.appendChild(myImg);
    }

    if (jsonResult.hasOwnProperty("classified")) {
      let classified = jsonResult.classified;

      const myCount = document.createElement('h3');
      myCount.textContent = classified.length + " objects detected";
      article.appendChild(myCount);
      article.appendChild(document.createTextNode(countByLabel(classified)));

      detectedObjectsTable(classified, article);
    }
    else {
      const myDiv = document.createElement('div');
      myDiv.className = 'error';
      myDiv.id = 'error-div';
      const myTitle = document.createElement('h3');
      myTitle.textContent = "ERROR";
      myDiv.appendChild(myTitle);
      // Dump keys/values to show error info
      for (const key in jsonResult) {
        if (jsonResult.hasOwnProperty(key)) {
          const myP = document.createElement('p');
          myP.textContent = key + ":  " + jsonResult[key];
          myDiv.appendChild(myP);
        }
      }
      article.appendChild(myDiv);
    }
  }

  const raw = top.frames['mytarget'];

  document.getElementById('mytarget').addEventListener('load', function(){

    let rawContent = raw.document.body.innerText;
    let rawJson = JSON.parse(rawContent);
    let rawJsonJson = JSON.parse(rawJson.data);
    console.log(rawJsonJson);

    populateMain(rawJsonJson);
  });

});

