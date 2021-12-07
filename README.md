# Shop Searcher

This web app it shows the most near places around your approximate position.
The user can choose about multiple types of places: restaurants, pharmacy, aquarius, gym ...
The user can choose the search radius.
The user is allowed to have a profile, and save the favorite places, and order it in folders.

**NOTE**: This repository content just the server side of the application. In order to used you will need to run the front side located in the this [ Frontend repository](https://github.com/jonCroatanUto/shopSeracher_front.git)

### Features

- This app work with mongo db database deployed in Atlas mongoDB
- The front side point to a not deployed node server
- The server is also contained in a docker container
- The front side it's developed with a combination of React, typescript and Redux
- All the global variable are located in the `.env` file, in the client and in the server
- This app show the closer places using Google Apis data .

# Index

- [Shop Searcher](#shop-searcher)
    - [Features](#features)
- [Index](#index)
  - [🚀 To start](#-to-start)
- [🦴 Project Structure](#-project-structure)
  - [Folder structure 🗂](#folder-structure-)
- [✨ Wishlist and decisions made](#-wishlist-and-decisions-made)
- [🕵️‍♂️ Resources](#️️-resources)
- [🖇️ Contributing](#️-contributing)

## 🚀 To start

To start executing this application you should:

- Choose a folder in your local machine and open the terminal
- Run the comand:

```
git clone https://github.com/jonCroatanUto/shopSeracher_back.git
```

- Go inside the folder `shopSeracher_back` and run:

```
npm install
```

- run the server side app with the comand :

```
npm start
```

- For this project you should use [google api key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- Create an `.env` file in the root folder adding the following variables:

```
GOOGLE_API_KEY= Need a google api key
PORT="4000"
MONGO_DB_URL_PRODUCTION=
- Need to have an acount in Altas mongoDB
- Need to have the conecction atlas key
```
[google api key](https://developers.google.com/maps/documentation/javascript/get-api-key)
[Altas mongoDB](https://www.mongodb.com/es/cloud/atlas/register)
[conecction atlas key](https://docs.atlas.mongodb.com/connect-to-cluster/)

###

# 🦴 Project Structure

## Folder structure 🗂

<pre>
├───public
└───src
    ├───config  <i>//This file manege the env file  </i>
    |
    ├───db      <i>//Mongoose conection with database hosted in Atles mongoDB   </i>
    |	  
    ├───controller      <i>//Functions declarations  </i>
    |      | 
    |      ├─── `shopController` shop Controller
    |      ├─── `shopListController` shop ListController
    |      └─── `isersController` user Controller
    |     
    ├───routes <i>//Functions executions endpoints  </i>
    |      | 
    |      ├─── `shopRoutes` Shop endpoints 
    |      ├─── `shopListRoutes` Shop list endpoints 
    |      └─── `usersRoutes` User endpoint 
    |
    └───models <i>//this format the data structure collections   </i>
           | 
           ├─── `shopListModel` shop list collection structure
           ├─── `shopModel` shop collection structure
           └─── `usersModel` user collection structure
</pre>

# ✨ Wishlist and decisions made

- Search bar: Allow to the user to search in the the his favorites places saves.
- Precision locating: I'm sure there is a way to locate the exactly position of the user. I wish to investigate this deeply
- Token: create a token when a specific user is singUp , and develop a system to refresh that each time.
- Display folder content: do a doubleClick to and call to the Favorites places saved in that specific folder.
- Improve the CRUDs: develop a Delete/Update for the favorites places and for the folders
- Authentication security: Use the userReducer to redirect if you access to profile without identify (now you can acces by de url)
- Authentication security: Create a hoc to wrap the pages that only can have access an identify user. For example profile page.
- Save activity: use cookies or localStorage to save the information provided by google APIs
-

# 🕵️‍♂️ Resources

- [axios](https://www.npmjs.com/package/axios)
- [Express](https://expressjs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [helmet](https://helmetjs.github.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [morgan](https://www.npmjs.com/package/morgan)
- [mongoose](https://mongoosejs.com/docs/)

# 🖇️ Contributing

If you want to contribute, please fork the repository, create a new branch whit your contribution, and push the branch as a pull requests.
