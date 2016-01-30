const assign = Object.assign

export default function(state, action){
	switch(action.type){
		case 'SET_WIDTH':
			return assign({}, state, {
				width: Number(action.width)
			})
		case 'SET_HEIGHT':
			return assign({}, state, {
				height: Number(action.height)
			})
		case 'SET_LINE_SPACING':
			return assign({}, state, {
				lineSpacing: Number(action.lineSpacing)
			})
		case 'SET_LETTER_SPACING':
			return assign({}, state, {
				letterSpacing: Number(action.letterSpacing)
			})
		case 'SET_IMAGE':
			return assign({}, state, {
				image: action.image
			})
		case 'SET_OFFSET_X':
			return assign({}, state, {
				offsetX: Number(action.offsetX)
			})
		case 'SET_OFFSET_Y':
			return assign({}, state, {
				offsetY: Number(action.offsetY)
			})
		case 'SET_ROW':
			return assign({}, state, {
				row: Number(action.row)
			})
		case 'SET_COLUMN':
			return assign({}, state, {
				column: Number(action.column)
			})
		case 'SET_LETTERS':
			return assign({}, state, {
				letters: action.letters
			})
		default:
			return state
	}
}