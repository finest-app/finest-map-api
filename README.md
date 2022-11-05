
# Finest Map API

Finest Map API Server
![image](https://user-images.githubusercontent.com/61679509/200099560-be74c33c-6f05-4fba-922c-5d6bab1c9564.png)

## Tech Stack

**Server:** Node, AdonisJS, SQLite


## Documentation

[Finest Map Gallery](https://kdocs.cn/l/ccAdYKH0RqAu)

[Finest Map Documentation](https://kdocs.cn/l/cdt43ZWUAF2k)


## Deployment

#### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [SQLite3](https://www.sqlite.org/index.html)
- [Git](https://git-scm.com/)

#### Get Started
```bash
git clone https://github.com/finest-app/finest-map-api.git
# clone repository
cd finest-map-api
npm install
# installing dependencies
node ace migration:run 
# for create database tables
npm run dev 
# for starting http server
# The server should run on http://127.0.0.1:3333/
```
:exclamation:The first time you run it you need to create an .env file in the project directory with the same contents as the .env.example file.

## Authors

- [@Visualizeit](https://github.com/Visualizeit)


## License

[MIT](https://choosealicense.com/licenses/mit/)

