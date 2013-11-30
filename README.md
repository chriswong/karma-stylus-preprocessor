# karma-stylus-preprocessor

## Configuration

### Options
 
 
 * `save`: [`Boolean`] Indicates whether result of compilation should be saved in project directory.
 * `paths`: [`Array`] of paths to folders that should be used for file lookup when using `@import`.
 * `compress`: [`Boolean`] Indicates whether css should be compressed or not.
 
### Example configuration

	module.exports = (config) -> config.set {
		basePath: ''
		preprocessors:
			'src/**/*.coffee': ['coffee']
			'src/resources/**/*.stylus': ['stylus']
	
		files: [
			'src/**/*.coffee'
			'src/resources/stylus/index.stylus'
		]

		coffeePreprocessor:
			options:
				bare: true
				sourceMap: false
			transformPath: (path) -> path.replace(/\.coffee$/, '.js')
	
		stylusPreprocessor:
			options:
				paths: ['src/resources/stylus']
				save: true
			transformPath: (path) -> path.replace(/\.stylus$/, '.compiled.css')
	
		
		browsers: ['Chrome']
		captureTimeout: 6000
		hostname: 'localhost'
		port: 9876
	
		plugins: [
			'karma-coffee-preprocessor'
			'karma-stylus-preprocessor'
			'karma-chrome-launcher'
		]
	
		singleRun: false
	}
