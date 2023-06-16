# FHIR PROXY SERVER

The Fhir proxy server is a lightweight application designed to act as an intermediary between client applications and FHIR server. In our development it provides a set of functionalities to enhance and secure the communication between smartonfhir implementation and FHIR apis present in our openmrs instance. This README file provides an overview of this proxy,prerequisites, its features and installation guidelines.

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
   
