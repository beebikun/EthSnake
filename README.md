# EthSnake

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
###
Used libs: Vue / Vuex / Web3js

## Description

A Snake-like game, that uses the last 10 blocks from Eth network as game tokens, which the snake has to collect to win. If the Snake crashes into a border or in itself the game is lose.
After a block is collected, it appears on `Collected Blocks` list with some tech details, like size, transactions count and so on. Bars behind the numbers mean the percent of this block value relatively other blocks. A block transactions list appears after a user clicks on `[SHOW]` button near `Transactions` on a block.

Metamask is required.

![preview](https://i.imgur.com/1ioz34b.png)
