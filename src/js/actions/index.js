export default {
	setWidth: width => ({
		type: 'SET_WIDTH',
		width
	}),
	setHeight: height => ({
		type: 'SET_HEIGHT',
		height
	}),
	setLineSpacing: lineSpacing => ({
		type: 'SET_LINE_SPACING',
		lineSpacing
	}),
	setLetterSpacing: letterSpacing => ({
		type: 'SET_LETTER_SPACING',
		letterSpacing
	}),
	setImage: image => ({
		type: 'SET_IMAGE',
		image
	}),
	setOffsetX: offsetX => ({
		type: 'SET_OFFSET_X',
		offsetX
	}),
	setOffsetY: offsetY => ({
		type: 'SET_OFFSET_Y',
		offsetY
	}),
	setDirection: direction => ({
		type: 'SET_DIRECTION',
		direction
	}),
	setRow: row => ({
		type: 'SET_ROW',
		row
	}),
	setColumn: column => ({
		type: 'SET_COLUMN',
		column
	}),
	setLetters: letters => ({
		type: 'SET_LETTERS',
		letters
	})
}