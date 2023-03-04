# falbot-dice

A module used in Falbot to roll dices in a good looking way

## Usage

```Node
const roll = require("falbot-dice")

console.log(roll("5d20 + 10d6"))
```

## Result

The result would be something like: 5d20 (5, 11, 3, 2, 15) + 10d6 (4, **6**, 5, **6**, 4, 5, 2, 4, 3, 3) = `78`
