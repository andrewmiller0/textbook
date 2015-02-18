# Textbook
![Badge of Honor](https://img.shields.io/badge/Built%20at-Fullstack-green.svg?style=flat-square)
> An online application for teacher SMS communication with parents and students


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

![TextBook Example](http://www.chuckmpierce.com/textbook/texting.webmhd.webm)
_Above: An example of the working app_


```html
<p>This is some sample output</p>
```
## Installation

1. Clone the repository

	```bash
	git clone https://github.com/angular/angular.js.git
	```
2.	Install dependencies

	```bash
	npm install    # installs node packages
	bower install  # installs bower dependencies
	```
4. Sign up for a free [Twilio trial account](https://www.twilio.com/try-twilio)
5. Edit the `/server/config/environment/local.env.js` to include your  TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and phoneNumber

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

-	New bug tacking system
-	Upgrade to Angular 2.0

#### Known bugs

- Syntax highlighting doesn't work in safari
- It ain't easy being cheezy.

## Contributors
* __Chuck Pierce__ -  [LinkedIn](http://linkedin.com/in/chuckmpierce) | [GitHub](https://github.com/ChuckPierce)
*  __Melissa Moy__ - [LinkedIn](https://www.linkedin.com/profile/view?id=54084202) | [GitHub](linkedin.com/in/meliis)
*  __Andrew Miller__ - [LinkedIn](https://www.linkedin.com/in/andrewmillerdev) | [GitHub](https://github.com/andrewmiller0)

## License

This projected is licensed under the terms of the [MIT license](/LICENSE)


