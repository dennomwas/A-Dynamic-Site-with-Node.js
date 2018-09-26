let fs = require('fs');

const mergeValues = (values, content) => {
    for (let key in values) {
        content = content.replace(`{{${key}}}`, values[key]);
    }
    return content;
}

const view = (templateName, values, response) => {

    // Read from the template file
    let fileContents = fs.readFileSync(`./views/${templateName}.html`, {
        encoding: "utf8"
    });

    // Insert values into the content
    fileContents = mergeValues(values, fileContents);

    // Write out the contents response
    response.write(fileContents);

}

module.exports.view = view;