# FTNIR - PKP project
Android app based on react-native (my first touch on it)

## Project purpose
This was a PKP project (funded). We were set as team of developers, where everyone had their own work. One person made backend, another frontend (webpage) and I made this android application. Point of this application is to provide users some login authentication and allow them insert some informations about the tests they made in lab or on the field. They collected soil samples, made some photos and provided information to application about some depth, GPS location, type of produce, etc. They also did some tests in lab about ph, p, k and others values. Soon as they made it, they could push element to server, which saved informations to database.

## Project structure (important files are in src/pages folder):
- login with full name + generated number (used in case there are two members with same name)
- creating elements:
  - generate id
  - specific informations(inputs) which are plain text, except image
  - get current location if possible
- list of elements:
  - list of captured elements with provided informations
  - more inputs for information about tests, which were done in lab (if not entered -> no upload)
  - all elements can be pushed to server
