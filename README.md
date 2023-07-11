# SMART OPENMRS PROXY SERVER

The Fhir proxy server is a lightweight application designed to act as an intermediary between client applications and the FHIR server. In our development, it provides a set of functionalities to enhance and secure the communication between smartonfhir implementation and FHIR APIs present in our openmrs instance. This README file provides an overview of this proxy, its prerequisites, its features, and installation guidelines.

## Prerequisites

Before installing and running this proxy, ensure that you have the following prerequisites:

- **Node.js**: Make sure you have Node.js installed on your system. You can download Node.js from the official website: [https://nodejs.org](https://nodejs.org). The server has been tested with Node.js version v18.15.0

- **FHIR Server**: You will need access to a FHIR server that you want to proxy requests to. Ensure that you have the necessary credentials and the URL of the FHIR server.

## Features

1. **Authentication and Authorization**: The proxy server can handle authentication and authorization of client requests, ensuring that only authorized users can access the FHIR server.
2. **Caching**: It supports caching of FHIR resources to improve performance and reduce load on the FHIR server.
3. **Rate Limiting**: The proxy server can enforce rate limits on client requests to prevent abuse and ensure fair usage of server resources.
4. **Logging**: Comprehensive logging capabilities are available to track and analyze client requests and server responses.
5. **FHIR Version Conversion**: It can perform on-the-fly conversion between different versions of the FHIR specification, allowing clients to interact with FHIR servers that support different versions.
6. **Data Transformation**: The proxy server can transform FHIR resources between different formats, such as XML and JSON, based on client preferences.
7. **Request Filtering**: It supports filtering and transformation of client requests before forwarding them to the FHIR server, allowing customization of the request payload.
8. **Security**: The proxy server can enforce secure communication using encryption protocols, such as HTTPS, between clients and FHIR servers.
9. **Error Handling**: Comprehensive error handling mechanisms are in place to handle various error scenarios and provide meaningful error messages to clients.

## Installation

To install and run the FHIR Proxy Server, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Patholar/fhir-proxy-server.git
   cd openmrs-proxy
2. install packages
   ```bash
   yarn install
3. run proxy server
   ```bash
   yarn dev
   
## Folder Structure

### src

#### Controllers: 
This folder contains the controllers responsible for handling the business logic of the proxy server application. Each controller represents a specific functionality or a set of related functionalities. Controllers interact with fetching fhir api and send appropriate responses back to the client.

#### Middleware: 
The middleware folder contains the middleware functions that are used to process incoming requests before they reach the controllers. Middleware functions can perform tasks such as authentication, request validation, logging, etc. These functions are executed in the order they are defined, and they can modify the request or response objects as needed. Common examples of middleware include authentication middleware, error handling middleware, and logging middleware.

#### Routes: 
The routes folder contains the route definitions for the proxy server. Routes define the URL paths and the corresponding controller methods that should be executed when a request is made to a specific URL. Each route maps to a specific controller method.

#### Utils: 
The utils folder contains utility functions or modules that are used across different parts of the proxy server. These utilities can include helper functions, token functions, HTTP request functions, response functions, and other reusable code that doesn't fit directly into controllers. Placing them in the utils folder helps to keep the codebase organized and promotes reusability.

#### server.js
This js file contains the code for starting and configuring the server, enabling cors, and handling HTTP requests.

#### smart_urls.json
This JSON file contains .wellknown data.
