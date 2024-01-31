#######################################
# This file is not to be run directly #
#######################################

This is the files for CSE416 - Sukoco backend. This files are written in Express.js with Typescript

# How to Run

1. Make sure the path is on the root of the project, and type "npm install"

2. Type "npm run build". This will generate the compiled files from Typescript to Javascript.

2. type "npm start"

3. It will show the port below. 

4. If you want to deploy, then use dist folder. This folder contains all compiled files. You should write a package.json before you deploy.

5. If you want to develop over this file, then use "npm run dev". This instruction will run nodemon to apply a change immediately.

# Explanation of the files

1. 'index.ts' is the file to run the server.

2. All the files for APIs is in the folder of 'API'

3. Each folder stands for each APIs.

4. ~API.ts is to import the functions for each APIs. On this file, you can find the uri of each API call.

5. \modules\session.ts is to simplify the session database, but for the reason of the readability, it is excluded, but you may use it if you want.