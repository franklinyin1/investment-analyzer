# Investment-Analyzer

Deployed application: https://investment-analyzer-ai.herokuapp.com/

This app is designed to improve stock fundamental data transparency for retail investors.

In order to run the app, follow the below steps:

- Clone the repo
- Run `npm install`
- Run `createdb investment-analyzer` (note: you will need to have PostgreSQL installed on your machine and running port 5432)
- Navigate to the following link: https://www.sec.gov/dera/data/financial-statement-data-sets.html
- Download the 2021 Q3 dataset (45.13 MB)
- Move the downloaded dataset (labeled '2021q3') into your sec-data folder
<<<<<<< HEAD
- Increase max Node memory by typing the following into your browser `export NODE_OPTIONS=--max_old_space_size=32768`
=======
- Increase max Mode memory by typing the following into your browser `export NODE_OPTIONS=--max_old_space_size=32768`
>>>>>>> 45d0026 (update ReadMe 2)
- Run `npm run seed`
- Run `npm run start:dev`
- Open your chrome browser and enter "localhost:8080" in your address bar



