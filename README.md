# Smart Eye Recycling ♻️
 
<img src="https://img.shields.io/badge/HTML5-DD4B25" alt="HTML5"> <img src="https://img.shields.io/badge/JavaScript-EBD54D" alt="JS"> <img src="https://img.shields.io/badge/FireStore-FFCB2B" alt="FireStore"> <img src="https://img.shields.io/badge/Mapbox-4061F3" alt="Mapbox"> <img src="https://img.shields.io/badge/jQuery-1066A9" alt="jQuery">

![smartEye](https://github.com/char-lie-ho/SmartEye-Recycle/assets/116076259/4d53431a-89c7-4c42-9e2c-29de6f3c9fac)


# Summary: 📃
SmartEye is a web-based web application designed to assist and simplify the recycling process for residents in Vancouver to streamline the process of recycling. Instead of using text-based search (although we also include this feature!), we provide another option through the use of barcode recognition. In addition, we also build a review system for the recycling facilities, displaying facility locations on a map, setting recycling reminders and even allowing users to personalize the application by modifying their profile pictures!

### 👉 [Go to the deployed website](https://smart-eye-app.web.app/)
To explore the features, you can use the following dummy account:

- **Username:** `demo@test.ca`
- **Password:** `123456`

# Key Features: 🔑
### 1. Barcode scanner
* Harness the power of your device's camera with our app's barcode scanning feature powered by QuaggaJS. Connect to our database, granting instant access to recycling information.

<img src="https://github.com/char-lie-ho/SmartEye-Recycle/assets/116076259/e2b677a4-b97b-49ad-bcbe-e143dd6793a3" width="270" >

### 2. Keyword search
* Find recycling details with our keyword search feature. Simply enter relevant keywords to access the information you need quickly and efficiently.
<img src="https://github.com/char-lie-ho/SmartEye-Recycle/assets/116076259/998e11ee-7c84-4cdf-8f12-5f79048e0085" width="270">

### 3. Map display of recycling facilities
* Explore nearby recycling facilities with our app's MapBox integration in a user-friendly map view.
* Receive directions to the facilities as well!

<img src="https://github.com/char-lie-ho/SmartEye-Recycle/assets/116076259/bb50ef59-d74f-450b-b4d6-7be76ac8a095" width="270">


### 4. Facility review system
* Share your valuable insights with fellow users by contributing facility reviews based on your recycling experiences. Enhance the community's understanding of recycling facilities 
<img src="https://github.com/char-lie-ho/SmartEye-Recycle/assets/116076259/7224775f-7549-4246-94c2-0889c30cf6f9" width="270">

### 5. Recycling alarm 
* Never miss a recycling opportunity! Our app features a convenient recycling alarm to ensure you remember to take out your recyclables on time.

### 5. Personalize features
* Tailor your app experience to your preferences. Update your personal information and showcase your unique identity by easily changing your profile picture.

# Technologies and Resources Used 💻
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Mapbox (display facilities location on map)
* QuaggaJS (library for reading barcode)
* Recycle BC (recycling information, images)
* Google material icons
* SweetAlert 1.0 & 2.0 (Stylish popup boxes)
* Unsplash website (images)

# Complete setup/installation/usage 🛠️
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
1. Create a new account by providing necessary information such as username, email, and password.
2. Try the barcode scanning feature to quickly obtain information about any item's recyclability.
3. Alternatively, users can use the text-search function to search for recycling information by typing keywords.
4. Access the facility page to view nearby or favourite recycling facilities. 
5. Select a recycling facility from the list or map and get directions to reach the chosen location.
6. Users can contribute to the community by writing reviews about their experiences with recycling facilities.
7. Users may choose to set up recycling reminder alarms for scheduled recycling activities.
8. Optionally, users can personalize their accounts by uploading profile pictures and editing personal information.

# Known Bugs and Limitations 🐞
Here are some known bugs:
* The barcode database is limited and primarily intended for testing purposes
* The text-based search is limited to precise wordings for effective searches 
* The recycling reminder is not able to send any notification to users
* The nearby facilities are not able to show the nearest facilities based users' location
* The recycling information database is not fully completed 


# Features for Future 🚀
What we'd like to build in the future:
* Fully implement the recycling reminder features
* Enhance the recycling information in the database
* Use another library for barcode reading to improve scanning functionality

# Contributors 🙌
* Chalie Ho: Lead developer and project coordinator. Bringing expertise to the team, ensuring the project stayed on course. Implemented key features of the project such as the barcode scanning functionality and database management and took on the final quality assurance role.
  
* Xinli Wang: Core designer and proactive developer, the creative mind behind the project, handling design and actively contributing to development. Making our map feature come to life and improving the keyword search, adding both style and functionality to the project feature.

  
* Parteek Grewal: Innovative content Specialist and spokesperson, conducting thorough research to provide comprehensive recycling information to our team. He took the initiative to kickstart the map feature and added a unique touch to the project with creative and insightful contributions.
 
# Contents of Folder 📁
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html              # landing HTML file, this is what users see when you come to url
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
|
├── pages                      # Folder for html files
|   /about_us.html             # Developers' info
|   /camera.html               # Barcode scanner
|   /category_template.html    # Recycling information
|   /facility_info.html        # Recycling facilities information
|   /facility_review.html      # Write reviews for facility
|   /favorite_facility.html    # Check useres' favourite facilities
|   /login.html                # Login page
|   /main.html                 # Main page after users login
|   /map.html                  # A map to display recycling facilities
|   /nearby_facility.html      # Display nearby facilities
|   /post_scan.html            # Show a list of options for users after scanning barcode
|   /recycling_reminder.html   # Setup recycling alarms 
|   /search_instruction.html   # Main page for searching recycling items 
|   /support.html              # A page for user to leave reviews for the app or contact developers
|   /user_profile.html         # Update personal information for the users
|
├── images                                 # Folder for images
|   /aluminum_foil.jpg                     # Obtained from Recycle BC
|   /foam_packaging.jpg                    # Obtained from Recycle BC
|   /glass_bottles_and_container.jpg       # Obtained from Recycle BC
|   /paper_cardboard.jpg                   # Obtained from Recycle BC
|   /plastic_bags_and_overwrap.jpg         # Obtained from Recycle BC
|   /Plastic_bottles_and_containers.jpg    # Obtained from Recycle BC
|   /map.svg                               # Obtained from Google material icon
|   /barcode_scanner.svg                   # Obtained from Google material icon
|   /search.svg                            # Obtained from Google material icon
|   /charlie.jpeg                          # Charlie personal picture
|   /Xinli.jpg                             # Xinli peraonal picture
|   /profile.jpg                           # Obtained from Unsplash by Cédric VT
|   /landing.jpg                           # Obtained from Unsplash by Getty
|
├── scripts                      # Folder for scripts
|   /authentication.js           # Authentication for users 
|   /camera.js                   # Barcode scanner
|   /category.js                 # Read from database and display recycling information
|   /facility_info.js        # Template for each facility
|   /facility_reviews.js         # Write reviews for facilities
|   /favorite_facility.js       # Display users' favorite facilities
|   /firebaseAPI_smart_eye.js    # Firebase API
|   /main.js                     # Dynamically display greeting message and users' name
|   /map.js                      # Mapbox 
|   /nearby_facility.js          # Read from database and display facilities 
|   /post_scan.js                # Read the URL query and search in database to display recycling information
|   /recycling_reminder.js                 # Read, write, delete recycling reminders in users collection 
|   /script.js                   # Logout
|   /search_instruction.js                   # Read from database and display recycling information
|   /skeleton.js                 # Nav bar, footer, back button
|   /support.js                  # Add to database in the feedbacks collection
|   /user_profile.js             # Read from database and update users' information
|
├── styles                   # Folder for styles
|   /review.css              # Styles for facility_review.html
|   /search.css              # Styles for search_instruction.html
|   /stylesheet.css          # Styles for every page     
|   /user_profile.css        # Styles for user_profile.html
|
├── text                     # Folder for headers and footer
|   /footer.html             # footer HTML file
|   /nav_after_login.html    # navbar HTML file before login
|   /nav_before_login.html   # navbar HTML file after login

```


