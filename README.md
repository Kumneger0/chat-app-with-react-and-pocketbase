# chat-app-with-react-and-pocketbase

## step 1
clone this repo and 
```
cd chat-app-with-react-and-pocketbase
npm i
 
```

***
## step 2

Download ***pocketbase*** from [here](https://pocketbase.io/docs/)
and extract zip file
***
## step 3
change your directory to where you pocketbase extracted
and run in your terminal
```
./pocketbase serve
```
```
//after that you will see like this 
//Server started at http://127.0.0.1:8090
// ➜ REST API: http://127.0.0.1:8090/api/
// ➜ Admin UI: http://127.0.0.1:8090/_/
 ```
copy this one which http://127.0.0.1:8090
and it your App.tsx file in line 20 
see example below
```
export const pb = new pocketbase("http://127.0.0.1:8090");
````

***
## step 4

in your web browser go to http://127.0.0.1:8090/_/
 - create your pocketbase admin account and after creating account 
 * edit the rule of users collection  to allow every one access
***
## step 5
- create new filed named contacts and type of relation and for collection chose users collection it self and relation type multiple
- create another filed named bio and type of plain text
- and then save changes

***
## step 6 
- create another collection named messages
- create 3 fileds
   - user1 type of  relation and select users collection relation type single
   - user2 type of relation and select users collection relation type single
   - conversation type of json
***

## step 7
```
back in your terminal and run npm run dev
```

#### now you can see the chat app running on localhost:5173

