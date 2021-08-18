# Noughts and Crosses

The Noughts and Crosses is a common name called Tic-tac-toe. It's a game with X and O, and the first one to check 3 symbols in a row wins.
This project was developed for a challenge, where the following items were chosen:

* Logic;
* Quality;
* Clarity;
* Code organization.

## Technology used
Technologies used in the project

`TypeScript`: The use of TypeScript as a language was chosen, mainly because of the Object Oreantation and the typing control it allows

`ViteJS`: The base of this project was built using the [ViteJS](https://vitejs.dev/) framework, with the TypeScript template.

`SASS`: As CCS compiler to optimize writing style files.

`Local Storage DB`: As a database, in order to simplify the use of the application and test code and structure.


## Starting the game

1. Install package dependencies with `yarn install`;
2. Execute the project with `yarn dev`;
3. Open link in your Browser `http://localhost:3000/`;

### How to play

1. The game will already start in Easy mode, but it can easily be changed to the difficulty you want, using the difficulty selection button.

![](https://github.com/felipeaufe/noughts-and-crosses/blob/main/doc/screenshot_1.png?raw=true)


2. Player X will always be the real player, and player 0 the AI.

![](https://github.com/felipeaufe/noughts-and-crosses/blob/main/doc/screenshot_2.png?raw=true)

3. You can also select the Versus option and play with a friend.

![](https://github.com/felipeaufe/noughts-and-crosses/blob/main/doc/screenshot_3.png?raw=true)

# Project Structure

The important structural part of this project

```
noughts-and-crosses/
└── src/
    ├──── main.ts/
    ├──── components/
         ├──── board/
                ├──── botPlayer.ts
                ├──── winner.ts
                ├──── difficulty/
                └──── notifications/
         ├──── footer/
         └──── header/
    ├──── database/
    ├──── enums/
    ├──── interfaces
    ├──── store/
    ├──── styles/
    └──── util/
```

## Contributors

**@author:** 'Felipe Augusto *< [https://github.com/felipeaufe](https://github.com/felipeaufe) >*'
