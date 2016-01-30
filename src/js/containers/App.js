import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../actions'

import splitArray from 'split-array'

function downloadAsFile(fileName, svg){
	var serializer = new XMLSerializer()
	var source = serializer.serializeToString(svg)

	if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
		source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
	}
	if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
		source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
	}

	source = '<?xml version="1.0" standalone="no"?>\r\n' + source
	const a = document.createElement('a')
	a.download = fileName
	a.href = URL.createObjectURL(new Blob([source], {type: 'text/plain'}))
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}

class App extends Component{
	constructor(props){
		super(props)
		this.handleImageChange = this.handleImageChange.bind(this)
		this.renderCanvas = this.renderCanvas.bind(this)
		this.splitImage = this.splitImage.bind(this)
	}
	render(){
		const {actions, width, height, lineSpacing, letterSpacing, offsetX, offsetY, row, column, letters} = this.props

		this.renderCanvas(this.canvas)

		return (
			<div id="app">
				<div id="split-controller">
					<div>
						<label>image</label>
						<input type="file" onChange={this.handleImageChange} />
					</div>
					<div>
						<label>width</label>
						<input type="number" value={width} onChange={e => actions.setWidth(e.target.value)} />
					</div>
					<div>
						<label>height</label>
						<input type="number" value={height} onChange={e => actions.setHeight(e.target.value)} />
					</div>
					<div>
						<label>line spacing</label>
						<input type="number" value={lineSpacing} onChange={e => actions.setLineSpacing(e.target.value)} />
					</div>
					<div>
						<label>letter spacing</label>
						<input type="number" value={letterSpacing} onChange={e => actions.setLetterSpacing(e.target.value)} />
					</div>
					<div>
						<label>offset x</label>
						<input type="number" value={offsetX} onChange={e => actions.setOffsetX(e.target.value)}/>
					</div>
					<div>
						<label>offset y</label>
						<input type="number" value={offsetY} onChange={e => actions.setOffsetY(e.target.value)}/>
					</div>
					<div>
						<label>row</label>
						<input type="number" value={row} onChange={e => actions.setRow(e.target.value)}/>
					</div>
					<div>
						<label>column</label>
						<input type="number" value={column} onChange={e => actions.setColumn(e.target.value)}/>
					</div>
				</div>
				<canvas ref={canvas => this.canvas = canvas} />
				<div>
					<button id="split-button" onClick={this.splitImage}>split</button>
				</div>
				<div>
					<svg id="svg" xmlns="http://www.w3.org/svg/2000"
						width={offsetX + ((width + letterSpacing) * column)}
						height={offsetY + ((height + lineSpacing) * row)}
					>
						{(() => {
							const e = splitArray(letters, column)
							return e.map((r, rowIndex) => {
								return r.map((letter, columnIndex) => {
									const x = offsetX + ((width + letterSpacing) * columnIndex)
									const y = offsetY + ((height + lineSpacing) * rowIndex)
									return (
										<image
											xlinkHref={letter}
											key={`${rowIndex}-${columnIndex}`}
											width={width}
											height={height}
											x={x}
											y={y}
										/>
									)
								})
							})
						})()}
					</svg>
				</div>
				<button onClick={() => downloadAsFile('text.svg', document.getElementById('svg'))}>save</button>
			</div>
		)
	}

	handleImageChange(e){
		const {actions} = this.props
		const img = new Image()
		img.src = URL.createObjectURL(e.target.files[0])
		img.addEventListener('load', () => {
			actions.setImage(img)
		})
	}

	renderCanvas(canvas){
		const {width, height, lineSpacing, letterSpacing, offsetX, offsetY, row, column, image} = this.props

		if(!image) return
		if(!canvas) return

		console.log('render')
		canvas.width = image.width
		canvas.height = image.height
		// canvas.width = 500
		// canvas.height = 500 
		

		const context = canvas.getContext('2d')

		context.drawImage(image, 0, 0)

		context.strokeStyle = '#f00'
		context.lineWidth = 0.5
		Array.apply(null, Array(row)).forEach((v, rowIndex) => {
			Array.apply(null, Array(column)).forEach((v, columnIndex) => {

				const x = offsetX + ((width + letterSpacing) * columnIndex)
				const y = offsetY + ((height + lineSpacing) * rowIndex)
				context.strokeRect(x, y, width, height)
			})
		})
	}

	splitImage(){
		const {width, height, lineSpacing, letterSpacing, offsetX, offsetY, row, column, image} = this.props

		const canvas = document.createElement('canvas')
		canvas.width = image.width
		canvas.height = image.height
		// canvas.width = 500
		// canvas.height = 500

		const context = canvas.getContext('2d')
		context.drawImage(image, 0, 0)

		const letters = Array.apply(null, Array(row)).map((v, rowIndex) => {
			return Array.apply(null, Array(column)).map((v, columnIndex) => {

				const x = offsetX + ((width + letterSpacing) * columnIndex)
				const y = offsetY + ((height + lineSpacing) * rowIndex)
				const c = document.createElement('canvas')
				c.width = width
				c.height = height
				const ctx = c.getContext('2d')
				ctx.putImageData(context.getImageData(x, y, width, height), 0, 0)
				return c.toDataURL()
			})
		})
		this.props.actions.setLetters([].concat(...letters))
	}
}

function mapStateToProps(state){
	return state
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(App)