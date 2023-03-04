function rollDice(expressionRaw) {
	var expression = ""
	for (let c = 0; c < expressionRaw.length; c++) {
		if (["+", "-"].includes(expressionRaw[c]) && expressionRaw[c - 1] !== " ") {
			expression += ` ${expressionRaw[c]} `
			continue
		}
		expression += expressionRaw[c]
	}

	const parts = expression.split(" ")
	let result = ""
	let total = 0
	let add = true

	for (let i = 0; i < parts.length; i++) {
		let part = parts[i]
		let matches

		if (part.startsWith("d")) {
			part = "1" + part
		}

		if (part === "+") {
			add = true
			result += ` + `
			continue
		} else if (part === "-") {
			add = false
			result += ` - `
			continue
		}

		if ((matches = part.match(/^(\d+)d(\d+)$/))) {
			let count = parseInt(matches[1])
			let sides = parseInt(matches[2])
			let rolls = []

			for (let j = 0; j < count; j++) {
				let roll = randint(1, sides)
				rolls.push(roll)
				if (add) {
					total += roll
				} else {
					total -= roll
				}
			}

			result += part + " ("
			for (let j = 0; j < rolls.length; j++) {
				if (rolls[j] === 1) {
					result += "**" + rolls[j] + "**"
				} else if (rolls[j] === sides) {
					result += "**" + rolls[j] + "**"
				} else {
					result += rolls[j]
				}
				if (j < rolls.length - 1) {
					result += ", "
				}
			}
			result += ")"
		} else if ((matches = part.match(/^\d+$/))) {
			let value = parseInt(part)
			result += value
			if (add) {
				total += value
			} else {
				total -= value
			}
		} else {
			throw new Error("Invalid expression: " + part)
		}
	}

	result += " = " + "`" + total + "`"
	return result
}

module.exports = rollDice
