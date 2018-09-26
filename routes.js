let Profile = require("./profile.js");

// Handle HTTP route GET / and POST / i.e. Home
const homeRoute = (request, response) => {

    //if url == "/" && GET
    if (request.url === "/") {
        //show search
        if (request.method.toLowerCase() === "get") {
            //show search
            response.writeHead(200, header);
            render.view("header", {}, response);
            render.view("search", {}, response);
            render.view("footer", {}, response);
            response.end();
        } else {
            // get data from post body
            request.on("data", postBody => {

                // extract data from post body
                let query = querystring.parse(postBody.toString());

                // redirect to /username
                response.writeHead(303, {
                    "Location": "/" + query.username
                });
                response.end();
            });
        }
    }
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
            response.writeHead(200, header);
            render.view("header", {}, response);
            render.view("profile", values, response);
            render.view("footer", {}, response);
            response.end();
        });

        //on "error"
        studentProfile.on("error", (error) => {
            render.view("error", {
                errorMessage: error.message
            }, response);
            render.view("header", {}, response);
            render.view("search", {}, response);
            render.view("footer", {}, response);
            response.end()
        });

    }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;