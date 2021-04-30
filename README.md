

# Eventruck



## Description

This website allows users to reserve and rent food trucks for events.

Depending on the role of the users (owners vs. clients) they can undertake specific actions:

- Unregistered clients can only view the food truck card without price or availability. 
- Registered clients can search and view details of the trucks, as well as create request through a form.
- Registered owners can register food trucks and a presentation profile to offer their services and receive requests.



## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and search for trucks, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can search food trucks and book them. As a owner I want to sign up on the web so I can register my food truck and share my profile.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **food truck profile** - As a owner I want to create, update and delete my food truck info.
- **client profile** - As a user I want to be able to edit and delete my profile and see my bookings.
- **owner profile** - As a owner I want to be able to  edit and delete my profile and see my foodtrucks.
- **result** - As a user I want to see the list of food trucks.
- **food truck details** - As a user I want to see more details of the food truck and book them.



## Server Routes (Back-end):

|            |                                 |                                                              |                                                          |
| ---------- | ------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| **Method** | **Route**                       | **Description**                                              | Request - Body                                           |
| `GET`      | `/`                             | Main page route. Renders home `index` view.                  |                                                          |
| `GET`      | `/login`                        | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                        | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                       | Renders `signup` options.                                    |                                                          |
| `GET`      | `/signup-client`                | Renders `signup` form view for users.                        |                                                          |
| `POST`     | `/signup-client`                | Sends Sign Up info to the server and creates user in the DB. | { email, password }                                      |
| `GET`      | `/signup-owner`                 | Renders `signup` form view for owners.                       |                                                          |
| `POST`     | `/signup-owner`                 | Sends Sign Up info to the server and creates user in the DB. | { email, password }                                      |
| `GET`      | `/private/edit-profile`         | Private route. Renders `edit-profile` form view.             |                                                          |
| `POST`     | `/private/edit-profile`         | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/edit-profile- owner`  | Private route. Renders `edit-profile -owner` form view.      |                                                          |
| `POST`     | `/private/edit-profile - owner` | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/register-foodtruck`           | Renders `register-foodtruck` form view for foodtrucks.       |                                                          |
| `POST`     | `/register-foodtruck`           | Sends Register Food truck info to the server and creates food truck in the DB. | { name, type, price, availablility}                      |
| `GET`      | `/foodtrucks`                   | Renders food trucks-list view.                               |                                                          |
| `GET`      | `/foodtruck/details/:id`        | Renders `food truck-details` view for the particular food truck. |                                                          |



## Models	

Client model

```javascript
{
  username: String,
  email: String,
  password: String,
  image : String,
}
```



Owner model

```javascript
{
  username: String,
  email: String,
  password: String,
  image : String,
  NIF/ID : Number,
  mobilephone: Number,
  foodtrucks: [{type: mongoose.Schema.Types.ObjectId,
                 ref: 'Foodtruck'}]
}
```



Food truck model

```javascript
{
  name: String,
  description: String,
  image: String,
  price:  Number,
  date: Date,
  food: {type: Boolean},
  drinks: {type: Boolean},
  coffee: {type: Boolean}, 
  bagels: {type: Boolean},
  sandwiches: {type: Boolean},
  burritos: {type: Boolean},
  crepes: {type: Boolean},
  hamburgers: {type: Boolean},
  pizza: {type: Boolean},
  sushi: {type: Boolean},
  smoothies: {type: Boolean},
  tea: {type: Boolean},
  coffee: {type: Boolean},
  beer: {type: Boolean},
  cocktails: {type: Boolean},
  iceCream: {type: Boolean},
  cakes: {type: Boolean},
  dessert: {type: Boolean},
  any: {type: Boolean},
  creator: {type: Schema.Types.ObjectId, ref: 'Owner' }
}
```



Booking model

```javascript
{
  client:  type: Schema.Types.ObjectId,
    ref: 'Client'
  foodtruck: type: Schema.Types.ObjectId,
    ref: 'Foodtruck'
  date: Date,
  bookingDate : Date,
 }
```



## Backlog

- Responsive design

- Add the option to create comments and reviews about food trucks and owners as well as having the option to add to favorites. So we could create recommendations for the user

- Sort by reviews, price...

- Implement passport and social log in

- Create the direct messaging option within the application

- Pay reservation

- Interact with other users 

- Edit password with email validation

  



## Links

### Git

https://github.com/Susana-Prado/Eventruck

### Trello

https://trello.com/b/RNIWgoe6/eventruck

### Deployment

https://eventruck.herokuapp.com/





