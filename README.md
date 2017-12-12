# Image classification with PowerAI Vision

In this Code Pattern, we will use PowerAI Vision's Static Image Classification to create
a classifier that can recognize different types of vehicle damage.
Deep learning training will be used to create a model.
By deploying the model, we create a REST endpoint which can be used to
classify vehicle damage images.
We can test the model in the PowerAI Vision UI.
We'll also build an example app showing how to use the classifier from a web page.

> This example can easily be customized with your own datasets.

When the reader has completed this Code Pattern, they will understand how to:

* Create a dataset for image classification with PowerAI Vision
* Train and deploy a model based on the dataset classes
* Test the model
* Use the REST API to integrate the classifier in to an app

<!--Remember to dump an image in this path-->
![](doc/source/images/architecture.png)


## Flow
<!--Add new flow steps based on the architecture diagram-->
1. User runs the example app
2. An image is posted to the REST API endpoint
3. PowerAI Vision returns the image classification

<!-- TODO:
## Included components
* [Component](link): description
* [Component](link): description

## Featured technologies
* [Technology](link): description
* [Technology](link): description
-->

<!--Update this section when the video is created-->
<!-- TODO:
# Watch the Video
[![](http://img.youtube.com/vi/Jxi7U7VOMYg/0.jpg)](https://www.youtube.com/watch?v=Jxi7U7VOMYg)
-->

# Steps
Use the ``Deploy to IBM Cloud`` button **OR** run locally.

## Deploy to IBM Cloud
<!-- TODO: Update the repo and tracking id
[![Deploy to IBM Cloud](https://metrics-tracker.mybluemix.net/stats/527357940ca5e1027fbf945add3b15c4/button.svg)](https://bluemix.net/deploy?repository=https://github.com/IBM/watson-banking-chatbot.git)
-->
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/IBM/powerai-vehicle-damage-analyzer)


1. Press the above ``Deploy to IBM Cloud`` button and then click on ``Deploy``.

2. In Toolchains, click on Delivery Pipeline to watch while the app is deployed. Once deployed, the app can be viewed by clicking 'View app'.

3. Use the IBM Cloud dashboard to manage the app. The app is named `powerai-vehicle-damage-analyzer` with a unique suffix.

## Run locally
> NOTE: These steps are only needed when running locally instead of using the ``Deploy to IBM Cloud`` button.

<!-- TODO: expand each step -->

1. [Install Node.js](https://nodejs.org/en/download/)
1. Clone the repo
1. cd into this project's root directory
1.  Run `npm install` to install the app's dependencies 
1. Run `npm start` to start the app
1. Access the running app in a browser at <http://localhost:8081>
<!-- TODO: show how the app works -->

# Privacy Notice
If using the `Deploy to IBM Cloud` button some metrics are tracked, the following
information is sent to a [Deployment Tracker](https://github.com/IBM/cf-deployment-tracker-service) service
on each deployment:

* Node.js package version
* Node.js repository URL
* Application Name (`application_name`)
* Application GUID (`application_id`)
* Application instance index number (`instance_index`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)
* Labels of bound services
* Number of instances for each bound service and associated plan information

This data is collected from the `package.json` file in the sample application and the `VCAP_APPLICATION` and `VCAP_SERVICES` environment variables in IBM Cloud and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Cloud to measure the usefulness of our examples, so that we can continuously improve the content we offer to you. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

## Disabling Deployment Tracking
To disable tracking, simply remove ``require("cf-deployment-tracker-client").track();`` from the ``app.js`` file in the top level directory.

# Links
* [Demo on Youtube](https://www.youtube.com/watch?v=Jxi7U7VOMYg)
* [Watson Node.js SDK](https://github.com/watson-developer-cloud/node-sdk)
* [Relevancy Training Demo Video](https://www.youtube.com/watch?v=8BiuQKPQZJk)
* [Relevancy Training Demo Notebook](https://github.com/akmnua/relevancy_passage_bww)

# Learn more
* **Artificial Intelligence Code Patterns**: Enjoyed this Code Pattern? Check out our other [AI Code Patterns](https://developer.ibm.com/code/technologies/artificial-intelligence/).
* **AI and Data Code Pattern Playlist**: Bookmark our [playlist](https://www.youtube.com/playlist?list=PLzUbsvIyrNfknNewObx5N7uGZ5FKH0Fde) with all of our Code Pattern videos
* **PowerAI**: Get started or get scaling, faster, with a software distribution for machine learning running on the Enterprise Platform for AI: [IBM Power Systems](https://www.ibm.com/ms-en/marketplace/deep-learning-platform)

# License
[Apache 2.0](LICENSE)
