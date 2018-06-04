/*
* options.js
*
* Set and get configuration options. Set defaults, use environment variables or override from an object.
*
* Usage:
* const Options = require('./src/options.js')
* let opts = new Options
* opts.setOpts(objWithOptions)          // set key-value pair for each k-v pair in objWithOptions
* opts.setFromEnv(arrayOfEnvVarKeys)    // set k-v pairs using array of keys and their associated environment variables values
* opts.getOpt(optName [,optType])       // get value for key optName as type optType
* opts.getAll()                         // get all k-v pairs
*
* Examples:
* let opts = new Options
* let a = opts.getOpt("theKey","string","The default value")
* let b = opts.getOpt("theKey")
* 
* v 1.1.0 2017-12-14 jdr - added default values for getOpt
* v 1.0.0 2017-12-06 jdr - initial version 
*/

function Options() {
    // opts - the internal object to use for setting/getting options (key+value pairs)
    this.opts = {}
    
    // setOpts(valsObject) - set the options using the keys+values from the given object
    this.setOpts =  (valsObject) => {
        if ( typeof(valsObject)  == "object" ) {
            let keys=Object.keys(valsObject)
            for (let i=0; i < keys.length; i++) {
                this.opts[keys[i]] = valsObject[keys[i]]
            }
        } else {
            // TODO: ponder - what is the right thing to do?
            return false
        }
        return true
    }
    
    // getOpt(keyName [, keyType]) - get the value for the keyName, convert it to keyType if given (default "string")
    this.getOpt = (keyName, keyType="string", defaultVal="") => {
        let ret = ""
        switch (keyType) {
            case "string":
                ret = (typeof(this.opts[keyName]) != "undefined") ? this.opts[keyName] : defaultVal
                break;
            case "int":
                // round to nearest integer
                ret =  Math.round(Number((typeof(this.opts[keyName]) != "undefined") ? this.opts[keyName] : defaultVal))  
                break;
            case "number":
                ret = Number((typeof(this.opts[keyName]) != "undefined") ? this.opts[keyName] : defaultVal )
                break;
            case "flag":
                // if the flag key exists, mark it as true, regardless of the value
                ret = (typeof(this.opts[keyName]) != "undefined") 
                break;
            case "boolean":
                if (typeof(this.opts[keyName]) != "undefined") {
                    ret = Boolean(this.opts[keyName])
                } else {
                    ret = false || Boolean(defaultVal)      // note that this will be true for any non-empty string, even "false"
                }
                break;
            default:
        }
        return ret
    }
    
    // Include specific functions for each return type
    this.getString= (keyName,defaultVal="") => {
        return this.getOpt(keyName,"string",defaultVal)
    }
    this.getInt= (keyName,defaultVal="") => {
        return this.getOpt(keyName,"int",defaultVal)
    }
    this.getNumber= (keyName,defaultVal="") => {
        return this.getOpt(keyName,"number",defaultVal)
    }
    this.getFlag= (keyName,defaultVal="") => {
        return this.getOpt(keyName,"flag",defaultVal)
    }
    this.getBoolean= (keyName,defaultVal="") => {
        return this.getOpt(keyName,"boolena",defaultVal)
    }
    
    // setFromEnv(envArray) - use envArray for the key names to pull in environment variables 
    this.setFromEnv = (envArray) => {
        let ret = {}
        // Verify argArray is actually a non-empty array
        if (typeof(envArray) == "object" && Array.isArray(envArray)  && envArray.length > 0 ) {
            for (let i=0; i< envArray.length; i++) {
                if (typeof(process.env[envArray[i]]) == "string") {
                    ret[envArray[i]] = process.env[envArray[i]]
                }
            }
        } 
        return this.setOpts(ret)
    }
    
    // getAll() - return the full object of keys+values
    this.getAll = () => {
        return this.opts
    }
}

module.exports = Options