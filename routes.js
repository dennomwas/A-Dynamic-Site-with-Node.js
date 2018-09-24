let Profile = require("./profile.js");

// Handle HTTP route GET / and POST / i.e. Home
const homeRoute = (request, response) => {

    //if url == "/" && GET
    if (request.url === "/") {
        //show search
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.write("Header\n");
        response.write("Search\n");
        response.end('Footer\n');
    }
    //if url == "/" && POST
    //redirect to /:username
}

// Handle HTTP route GET /:username i.e. /username
const userRoute = (request, response) => {
    let username = request.url.replace("/", "");

    //if url == "/...."
    if (username.length > 0) {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.write("Header\n");

        //get json from Treehouse
        let studentProfile = new Profile(username);

        //on "end"
        studentProfile.on("end", (profileJSON) => {
            //show profile

            // store needed values
            let values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }

            // simple response
            response.write(`${values.username} has ${values.badges} badges`);
            response.end('Footer\n');
        });

        //on "error"
        studentProfile.on("error", (error) => {
            response.write(`${error.message}`);
            response.end('Footer\n');
        });

    }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;