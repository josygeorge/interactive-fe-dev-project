# Interactive Frontend Development Project

<!-- ASSIGNMENT INTRO -->
<br />
<p>
  <h3 align="center">Main Project 1 - 2021 FSSD Jan - Aug Batch, Canadian Business College</h3>
  <p align="center">
    In this project, I have built a frontend-app using the technologies that I have learned throughout Interactive Frontend Development classes. This project is built based on the concept of weather apps, an application helps the user to know the current weather details and the forecast for the coming week.
    <br />
    <br />
    <h3 align="center">
        <a href="https://josygeorge.github.io/interactive-fe-dev-project/">View Demo</a>
    </h3>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#git-installation">GIT Installation</a></li>
      </ul>
    </li>
    <li><a href="#git-usage">GIT Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE Project -->

## About The Project

[Live Project URL](https://josygeorge.github.io/interactive-fe-dev-project/)

- User can browse through the application to know about their current weather and forecast conditions based on their current geolocation.

- Also user can search for any city in the world to know the weather and forecast details of the same.
- An external weather API is used to fetch the data for the dynamic behaviour of the application.
- Concepts and elements of HTML5, CSS3, Bootstrap 4.6, fontawesome 4.7 are used.
- Javascript is being used to dynamically code the interfaces through jquery functions.
- jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax. It is free, open-source software using the permissive MIT License.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
- [jQuery](https://learn.jquery.com/about-jquery/)
- [fontawesome](https://fontawesome.com/)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- [Weather API](https://openweathermap.org/)

<!-- GETTING STARTED -->

## Getting Started

The project has the following file structure.

- index.html
  - This has a header which, has a logo, and a nav menu
  - Main section - which has a carousal slider and a section to browse to other pages.
  - footer
    - n.b. header and footer is common for all the 3 pages.
- weather.html
  - it has main section (1) to search for any city, (2) based on the search a section to display the weather information.
- forecast.html
  - it has main section (1) to search for any city, (2) based on the search a section to display the 7-day forecast information.
- js
  - weather.js
    - This js file has all the dynamic functionality for the weather.html page.
  - forecast.js
    - This js file has all the dynamic functionality for the forecast.html page.
  - countries.js
    - This js file is a custom file which has all the country codes and it's full names. This script is used in both weather.js and forecast.js for finding country names thorugh looping functionality.
- assets -> img -> has images for carousal slider.
- README.md

### Prerequisites

- A basic knowledge in the following is required.
  - Javascript
  - Jquery
  - Bootstrap, CSS, HTML
  - Logic
  - GIT basic operations

### GIT Installation

1. Get a GIT account at [https://github.com](https://github.com)
2. Create a repository

3. GIT init in the local machine
   ```sh
   git init
   ```
4. Add the files to GIT local machine
   ```sh
   git add .
   ```
5. Commit `commit`
   ```sh
   git commit -m "text_message"
   ```
6. Create a branch in the local
   ```sh
   git branch -M main
   ```
7. Remote add the repo
   ```sh
   git remote add origin https://github.com/your_username_/Project-Name.git
   ```
8. Push the files
   ```sh
   git push -u origin main
   ```

<!-- USAGE EXAMPLES -->

## GIT Usage

1. Add the files
   ```sh
   git add <filename>
   ```
2. Commit the change
   ```sh
   git commit -m "message"
   ```
3. Push the changes to the repo
   ```sh
   git push origin main
   ```

<!-- LICENSE -->

## License

Distributed under the GIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Josy George - [@github](https://github.com/josygeorge/)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Stack Overflow](https://stackoverflow.com)
- [Mozilla.Org](https://developer.mozilla.org/en-US/docs/Web/Guide/)
- [W3 Schools](https://www.w3schools.com)
- [Instructor Notes](https://github.com/anmarjarjees?tab=repositories)
