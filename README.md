# Project Title

### Smart Eye Recycling

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to assist and simplify the recycling process for residents in BC, Canada through the use of photo recognition. Our team includes Charlie Ho, Parteek Grewal, and Xinli Wang.

## 2. Names of Contributors
List team members and/or short bio's here... 
* This is Charlie. I have a cat. 
* This is Xinli. I'm trying to see how this works
* My name is Parteek and I am very excited to learn how to use git!
	
## 3. Technologies and Resources Used
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

## 4. Complete setup/installion/usage
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

## 5. Known Bugs and Limitations
Here are some known bugs:
* The barcode database is limited and primarily intended for testing purposes
* The text-based search is limited to precise wordings for effective searches 
* The recycling reminder is not able to send any notification to users
* The nearby facilities are not able to show the nearest facilities based users location
* The recycling information database is not fully completed 


## 6. Features for Future
What we'd like to build in the future:
* Fully implement the recycling reminder features
* Enhance the recycling information in the database
* Use another library for barcode reading to improve scanning functionality

	
## 7. Contents of Folder
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


