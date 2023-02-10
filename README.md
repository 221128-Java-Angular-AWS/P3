# Revature Full Stack Java Project 3 Demo

<br />

## Digital Dominion

[Project Repo](https://github.com/221128-Java-Angular-AWS/P3)

<br>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#contributors">Contributors</a></li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#module-break-down">Module Break Down</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>
<br>

<!-- CONTACT -->

# Contributors

### Kirill Klimov - CI/CD Lead - kirill674@revature.net

 <img src="https://github.com/221128-Java-Angular-AWS/P2/raw/main/src/ui/src/assets/profilepic.jpg" width="80" height="80">

[![linkedin-shield]][kirill-linkedin]
[![github-shield]][kirill-github]


<br>

### Travis Morse - Scrum Master - travis741@revature.net

 <img src="e-commerce-frontend-angular-main\src\assets\images\travis_morse.jpg" alt="TravisPortrait" width="80" height="80">

[![linkedin-shield]][travism-linkedin]
[![github-shield]][travism-github]

<br>

### Audie Ni - Fronted Lead - audie520@revature.net

 <img src="https://github.com/221128-Java-Angular-AWS/P2/raw/main/src/ui/src/assets/profilepic.jpg" width="80" height="80">

[![linkedin-shield]][audie-linkedin]
[![github-shield]][audie-github]

<br>

### Brayden Nordine - Backend Lead - brayden018@revature.net

 <img src="https://github.com/221128-Java-Angular-AWS/P2/raw/main/src/ui/src/assets/profilepic.jpg" width="80" height="80">

[![linkedin-shield]][brayden-linkedin]
[![github-shield]][brayden-github]

<br>

### William Osborne - william185@revature.net

 <img src="https://github.com/221128-Java-Angular-AWS/P2/raw/main/src/ui/src/assets/profilepic.jpg" width="80" height="80">

[![linkedin-shield]][william-linkedin]
[![github-shield]][william-github]

<br>

### Travis Pomeroy - travis928@revature.net

 <img src="https://github.com/221128-Java-Angular-AWS/P2/raw/main/src/ui/src/assets/profilepic.jpg" width="80" height="80">

[![linkedin-shield]][travisp-linkedin]
[![github-shield]][travisp-github]

<br>

### Matthew Shen - matthew945@revature.net

 <img src="https://github.com/221128-Java-Angular-AWS/P2/raw/main/src/ui/src/assets/profilepic.jpg" width="80" height="80">

[![linkedin-shield]][matthew-linkedin]
[![github-shield]][matthew-github]

<br>

<!-- ABOUT THE PROJECT -->

# About The Project

<br>
<div align="center">
<img src="e-commerce-frontend-angular-main/src/assets/images/DDIcon.png" width="400" height="auto" alt="Digital Dominion Icon"/>
</div><br><br>

Digital Dominion was a collaborative project produced by the trainees of the Revature Next Gen Java AWS Angular v3.2 training course. This project aimed to create an e-commerce website based off of a set of provided project requirements and initial repository.

<br>

# Overview

<br>

Our team built out this project from an existing repo over the course of 3 weeks. We were expected to build off of the existing repo, develop new features, and deploy our application using Amazon Web Services.

Team Member Expectations and Workflow:

- Independently developed project components while maintaining communication with other team members
- Participated in daily standups to communicate progress, plans, and blockers
- Maintained a ticketing system to track progress
- Exceed expectations by implementing stretch goals on top of the baseline expectations

### Tech Stack

- [Angular](https://angular.io/)
- [Spring](https://spring.io/)
- [RxJS](https://rxjs.dev/)
- [PostgreSQL](https://www.postgresql.org/)

<br>

<!-- GETTING STARTED -->

# Getting Started

To explore the project, follow the instructions below.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/221128-Java-Angular-AWS/P3.git
   ```

2. Navigate to the frontend folder
   ```
   cd e-commerce-frontend-main
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

4. Navigate to e-commerce-backend-main/src/java/com/revature, and run ECommerceApplication.java to run the TomCat server

5. Serve the Angular application from the frontend folder
   ```sh
    ng serve --open
   ```
6. Navigate to `localhost:4200` in your browser

<br><br>

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### DevOps Advice

<br>

A t2-micro/small will likely not be capable enough for your needs, so try to go for t2-medium with an Amazon Linux image build.
The Jenkins script that we used is inside Jenkins-script.md.
More information about setting up the EC2 instance environment and more can be found in:
https://github.com/221128-Java-Angular-AWS/CICD-Prototyping

<br><br>

<!-- USAGE EXAMPLES -->

# Page Overviews

> ## Login/Register

<br>
<div align="center">
</div><br>

The login/register page allows for users to create an account or log into an existing account. Usernames and passwords are validated as the user fills in the inputs, and passwords
are hashed before being stored in the database for increased security. A cookie is generated to maintain a seamless user session experience. Users can also log out once they are
finished using the application.

<br>

> ## Home

<br>

<div align="center">
</div><br>

The main home page displays a list of products available for purchase, as well as basic information about each product. Clicking on a product will open up a detailed view. Multiple
copies of a product can be added to the cart, and items can be added to the wish list to be referenced later.

> ## Product Details

<br>

<div align="center">
</div><br>

More details about a product can be found on the Product Details page. Items can be added to the cart or wish list, and user reviews can be accessed from this page.

<br>

> ## Navbar

<br>

<div align="center">
</div><br>

A persistent navigation bar allows users to navigate the website, as well as to search for products.

<br><br>

> ## Orders

<br>

<div align="center">
</div><br>

The order history page allows users to view their previous orders, as well as the ability to add reviews for any purchased products.

<br><br>

> ## Cart

<br>

<div align="center">
</div><br>

The cart page allows users to view, modify, or empty their cart, as well as purchase the cart's contents.

<br><br>

> ## Profile

<br>

<div align="center">
</div><br>

A user profile page displays the users information and gives the option for that information to be edited. Order history is also displayed alongside the user's wish list.

<br><br>

## Acknowledgements

- [npm](https://www.npmjs.com/)
- [Img Shields](https://shields.io)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Figma](https://www.figma.com/)
- Special thanks to our amazing trainer, Kyle!

<!-- Contributor Links -->

[kirill-linkedin]: https://www.linkedin.com/in/kirill-klimov-001/
[kirill-github]: https://github.com/kklimov1
[travism-linkedin]: https://www.linkedin.com/in/travis-morse-7574107a/
[travism-github]: https://github.com/travis503
[audie-linkedin]: https://www.linkedin.com/in/audie-ni-116283126/
[audie-github]: https://github.com/tasukaru
[brayden-linkedin]: https://www.linkedin.com/
[brayden-github]: https://github.com/braydensn
[william-linkedin]: https://www.linkedin.com/in/william-osborne-b62910b0/
[william-github]: https://github.com/WEOzzy
[travisp-linkedin]: https://www.linkedin.com/in/travis-pomeroy-2a949b163/
[travisp-github]: https://github.com/TPomerz
[matthew-linkedin]: https://www.linkedin.com/
[matthew-github]: https://github.com/
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-grey?style=for-the-badge&logo=linkedin
[github-shield]: https://img.shields.io/badge/-GitHub-grey?style=for-the-badge&logo=github
