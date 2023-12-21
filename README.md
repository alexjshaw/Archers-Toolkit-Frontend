# Archers Toolkit Frontend
A Full Stack Application build with React and Mantine. The Back-End can be found [here](https://github.com/alexjshaw/Archers-Toolkit-Backend).

# Introduction
This project began life as my final project for the Full Stack bootcamp I undertook with Boolean UK, with the back-end being built over the course of 7 days. Since finishing the course the Back-End has continued to evolve, and I have begun to work on the Front-End. It is very much a work in progress, and will continue to be worked on in the coming weeks and months.

# Overview
The idea for this project came from many years of personal experience dealing with poorly designed, feature poor, archery apps. I have used dozens of apps over the years, and there are three consistent problems that I aim to address over the course of this project.

- Complexity - Apps are either too shallow for competitive archers or  too complex for novices.
- Features - Most apps have a very narrow focus, with lots of archers needing to use multiple different apps to access all of the features they need.
- Usability - Unintuitive interfaces, digging through multiple menus, or needing to read lengthy tutorials to understand how to use a feature are far too common.

# Features
Based on my own experience, and having spoken to a wide range of archers of all standards, the intended feature set of the project is as follows:

**Round Scoring:**  Users will be able to record their scores as they shoot a round, selecting from a large number of standard rounds, a custom round of their own creation, or a freeform practice session. They will have the ability to score by simply entering their arrow values, or by placing arrows on a virtual target. The latter method will provide instant feedback on their group size and location, allowing them to respond accordingly.

**Data Tracking:**  Users can view data on their scoring history, enabling them to view their progression over time and identify trends within their shooting and how different factors effect their scores.

**Archers Handicap:**  Every user will have a Handicap generated based on the official Archery GB Handicap tables. Their handicap is effectively a rating that reflects their ability level. Every score they shoot is given a handicap value, and these values are then used to calculate the users overall handicap. This will be used behind the scenes within a few other features.

**Social:**  Curating a list of friends within the app will enable users to share scores, compare results and compete against other archers with ease.

**Simulated Competitions:**  Any round may be shot as a simulated competition. In this mode a competitors score will be revealed as a user progresses through their own round, enabling users to compare themselves to others and practice the mental side of competing. Users will be able to shoot against scores shared with them by their friends, or a random score chosen from a user with a similar handicap. If no such score is available the system will randomly generate a suitble score for them to compete against

**Leagues:**  A robust league system will be in place, that will enable any user to create a league with their own custom rules and open it up to the community or privately invite their friends. They will be able to customise the number of rounds, permitted bow types, round types, number of scores required, and whether it is an open competition or if users handicaps will be used to enable archers of varying standards to compete on a level playing field.

# Tech Stack
**Front End**

-   React
-   React-Router
-   Vite
-   Auth0
-   Mantine

**Back End**

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   CORS
-   Auth0
-   Helmet

**Documentation**

-   Swagger
-   YAML
