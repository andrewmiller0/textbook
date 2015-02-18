# Textbook
![Badge of Honor](https://img.shields.io/badge/Built%20at-Fullstack-green.svg?style=flat-square)
> A web platform for teachers to communicate with parents via SMS messaging in an easy and organized way.


## Table of Contents

- [Examples](#examples)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [License](#license)

## Examples
### Demo

See a live version of the app [here](http://txtbk.herokuapp.com).

### Screenshot

![TextBook Example](http://www.chuckmpierce.com/textbook/texting.gif)<br />
_Above: An example of a teacher interacting with a parent using the app_


## Installation

1. Clone the repository

	```bash
	git clone https://github.com/andrewmiller0/textbook.git
	```
2.	Install dependencies

	```bash
	npm install    # installs node packages
	bower install  # installs bower dependencies
	```
4. Sign up for a free [Twilio trial account](https://www.twilio.com/try-twilio)
5. Create a `local.env.js` in `/server/config/environment` and include your  TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and phoneNumber

__Note:__ If you encounter errors in the installation process for npm, it is recommended that you try running the install command with `sudo`

## Usage

1.  Make sure that you have MongoDB installed correctly and running on your machine

    ```bash
    mongod
    ```
2. Serve the application with `grunt`
    ```bash
    grunt serve
    ```
3. Enjoy!

### Testing
To run the test suite, run the following command:

```bash
grunt test
```
### Roadmap

#### Features

-	More unit tests for frontend and backend
-	Classroom enrollment via SMS messaging
-	Ability to schedule messages
-	Message templating system
-	Native mobile app for iOS and Android

#### Known bugs

- Spreadsheet upload does not account for empty cells or corrupted files
- Edge case with same contact being on mulitple students for one teacher not met yet

## Contributors
* __Chuck Pierce__ -  [LinkedIn](http://linkedin.com/in/chuckmpierce) | [GitHub](https://github.com/ChuckPierce)
*  __Melissa Moy__ - [LinkedIn](https://www.linkedin.com/in/meliis) | [GitHub](https://github.com/meliis)
*  __Andrew Miller__ - [LinkedIn](https://www.linkedin.com/in/andrewmillerdev) | [GitHub](https://github.com/andrewmiller0)

## License

This projected is licensed under the terms of the [MIT license](/LICENSE)


