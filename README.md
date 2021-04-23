

# Eventruck



## Description

This website allows users to reserve and rent food trucks for events.

Depending on the role of the users (owners vs. users) they can undertake specific actions:

- Unregistered users can only view the food truck card without price or availability. 
- Registered users can search and view details of the trucks, as well as create request through a form and pay reservation.
- Registered owners can register food trucks and a presentation profile to offer their services and receive requests.



## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and check for recommended trucks, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can search food trucks and book them. As a owner I want to sign up on the web so I can register my food truck and share my profile.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **food truck profile** - As a owner I want to create, update and delete my food truck info.
- **user profile** - As a user I want to be able to create, edit and delete my profile.
- **result** - As a user I want to see the list of food trucks filter by my preferences.
- **food truck details** - As a user I want to see more details of the food truck and contact/book them.



## Server Routes (Back-end):

|            |                               |                                                              |                                                          |
| ---------- | ----------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| **Method** | **Route**                     | **Description**                                              | Request - Body                                           |
| `GET`      | `/`                           | Main page route. Renders home `index` view.                  |                                                          |
| `GET`      | `/login`                      | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                      | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                     | Renders `signup` options.                                    |                                                          |
| `GET`      | `/signup-user`                | Renders `signup` form view for users.                        |                                                          |
| `POST`     | `/signup-user`                | Sends Sign Up info to the server and creates user in the DB. | { email, password }                                      |
| `GET`      | `/signup-owner`               | Renders `signup` form view for owners.                       |                                                          |
| `POST`     | `/signup-owner`               | Sends Sign Up info to the server and creates user in the DB. | { email, password }                                      |
| `GET`      | `/private/edit-profile`       | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`       | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/register-foodtruck`         | Renders `register-foodtruck` form view for foodtrucks.       |                                                          |
| `POST`     | `/register-foodtruck`         | Sends Register Food truck info to the server and creates food truck in the DB. | { name, type, price, availablility}                      |
| `GET`      | `/foodtrucks`                 | Renders food trucks-list view.                               |                                                          |
| `GET`      | `/foodtruck/details/:id`      | Renders `food truck-details` view for the particular food truck. |                                                          |
| `GET`      | `/private/favorites`          | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`         | Private route. Adds a new favorite for the current user.     | { name, tag, city, }                                     |
| `DELETE`   | `/private/favorites/:eventId` | Private route. Deletes the existing favorite from the current user. |                                                          |



## Models	

User model

```
{
  name: String,
  email: String,
  password: String,
  image : String,
  preferences: String, enum: [],
  role: {
    type: String,
    enum: ["User", "Owner"],
    default: "User"
   }
  favorites: type: mongoose.Schema.Types.ObjectId,
    ref: 'Foodtruck',
  
}
```

Food truck model

```
{
  name: String,
  description: String,
  image: String,
  specialty: String,
  price:  Number,
  availability: Boolean,
  contact: type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
```



## Backlog

- Responsive desgin

- Add favorites and rates

- Interact with other users 

- Edit password with email validation

- Add comments and reviews

  



## Links

### Git

The url to your repository and to your deployed project



### Slides

The url to your presentation slides

