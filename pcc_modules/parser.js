module.exports = {
    parseScraperOutput: (scraperOutput = []) => {
        // invalid parse
        if (scraperOutput.length == 0) {
            return "no PCC codes found for this postcode"
        }

        valid_output = ""
        scraperOutput.forEach(entry => {
            if (typeof entry == "string") {
                if (module.exports.is_pcc(entry) == true) {
                    // handle multiple codes
                    if (valid_output != "") {
                        valid_output += ", "
                    }
                    let new_code = module.exports.get_code(entry)
                    // console.log(`adding ${new_code}`)
                    valid_output += `${new_code}`
                } else {
                    // console.log(`${module.exports.get_code(entry)} is not pcc`)
                }
            } else {
                // console.log(`${entry} passed to parseScraperOutput is invalid string`)
            }
        });
        return valid_output

    // function close
    },

    is_pcc: (json_string = "") => {

        try {
            // debugger
            // parse
            const json_obj = JSON.parse(json_string)
            if (typeof json_obj === "object" && json_obj !== null && !Array.isArray(json_obj)) {
                if ("is_pcc" in json_obj) {
                    const output = json_obj["is_pcc"]
                    // is json converting to bool?
                    // if (typeof output === "boolean") {
                    // console.log(`output for ${json_obj}["is_pcc"] == ${output}`)
                    if (output == true) {
                        return output
                    // is_pcc is boolean
                    } else {
                        // console.log(`invalid output is ${output}`)
                        return false
                        }
                // is_pcc in JSON
                } else {return false}
            
            // console.log("code shouldn't have gotten here in is_pcc")
            return false

            // verify JSON object successfully parsed closed
            } else {return false}
        // try/catch close
        } catch {
            return false
        }

    // function close
    },

    // DRY - could the parsing be done outside the func?
    get_code: (json_string = "") => {

        try {
            // parse
            const json_obj = JSON.parse(json_string)
            if (typeof json_obj === "object" && json_obj !== null && !Array.isArray(json_obj)) {
                if ("code" in json_obj) {
                    const output = json_obj["code"]
                    return output
                    // code is boolean
                    } else {return ""}
                // code in JSON
                } else {return ""}
            
            // console.log("code shouldn't have gotten here in get_code")
            return ""

        // try/catch close
        } catch {
            return ""
        }

    // function close
    }

// module.exports close
}