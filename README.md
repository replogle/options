# options
Node module to set/get configuration &amp; runtime options

 Set and get configuration options. Set defaults, use environment variables or override from an object.
 Options are key-value pairs.

 Usage:
 const Options = require('./src/options.js')
 let opts = new Options
 opts.setOpts(objWithOptions)          // set key-value pair for each k-v pair in objWithOptions
 opts.setFromEnv(arrayOfEnvVarKeys)    // set k-v pairs using array of keys and their associated environment variables values
				       // Environment variables come from the 'process.env' object
 opts.getOpt(optName [,optType])       // get value for key optName as type optType
 opts.getAll()                         // get all k-v pairs

 Examples:
 let opts = new Options
 let a = opts.getOpt("theKey","string","The default value")
 let b = opts.getOpt("theKey")
