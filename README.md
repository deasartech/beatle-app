# Beatle App - A lyric memorisation game

[Check out the hosted version](https://beatle.pro)

## My goal was to build a web app that played a new song each day and tested the players ability to memorise the lyrics

This project is a React JS web app which uses Firebase for authentication, firestore database and storage. My overall aim was to achieve an interactive and user-friendly web interface which implemented a game design with UI flow. Once the user clicks play the client should play an audio snippet, on ending of the snippet the client should display an array of inputs where the user can enter the lyrics they memorise from the snippet. The format is inspired by Wordle and so there is a new song each day and the user gets three attempts to guess correctly, the number of points a player gains depends on the number guesses it takes them to enter the correct answer. For further gamification I wanted to add a leaderboard that displays the top 10 highest scoring players, and also allow users to view their score history when logged in.

Images
![input](https://user-images.githubusercontent.com/86922213/188456815-fc09822a-95af-484b-8434-948012f58206.png)
![All correct](https://user-images.githubusercontent.com/86922213/188456859-8b88135c-b495-4321-b84f-4d5ddeaf6b33.png)
![confetti guess correct](https://user-images.githubusercontent.com/86922213/188456893-a70736f1-d8e7-4ec1-ae95-776e857a7944.png)
Leaderboard [see here](https://user-images.githubusercontent.com/86922213/188456918-3a454f36-af2d-45aa-b4de-ca065f2f0a39.png)

> Beatle is featured in ["Wordle Spinoffs: The Complete and Authoritative Index"](https://medium.com/floodgates/the-complete-and-authoritative-list-of-wordle-spinoffs-fb00bfafc448)
> (https://user-images.githubusercontent.com/86922213/188456939-8d50e20f-5d75-4011-83cd-17427499d236.png)

## How I worked on this project

- I used feature branches and pull requests
- I used user stories to manage the software development process and maximise the potential of each component
- I asked friends and family to provide user feedback on each iteration which informed changes and improvements

## How to navigate this project

- Creating form controls (input boxes) and changing input focus [see here](https://user-images.githubusercontent.com/86922213/188458245-73fab3cd-6f42-463a-87e2-b6485c1e9ac8.png) & [see here](https://user-images.githubusercontent.com/86922213/188458279-3e0c8e7a-1f7e-41a7-b5d8-ebf60895714f.png)
- Interfacing with Firebase collections [see here](https://user-images.githubusercontent.com/86922213/188457664-11c3bd17-6c94-4118-bbe4-52b48adecf8d.png)
- Calculating time remaining until next song [see here](https://user-images.githubusercontent.com/86922213/188457722-a69a8621-be91-4122-a979-1dea72a15e19.png)

## Why I built the project this way

- React components allowed me to separate the app into independent and reusable units
- Soundcloud widget API has an extensive music database with various genres
- React-player for controlling the Soundcloud widget API
- React Bootstrap for styling mobile-first
- js-cookie
- I was able to create a fast and user-friendly sign-in process using firebase authentication with the choice of email and password
- Firestore allowed me to store data in the cloud, sync and retrieve data with expressive queries without having to worry about managing servers
- Able to retrieve top scores more efficiently by a more concise leaderboard collection which features players total points than iterating through every players scores and totalling them all in one process

## Minimum Version Requirements

- Node.js: v17.3.0
