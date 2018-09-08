function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return
    // the object(it now contains the response!)
    var request = new XMLHttpRequest();
    request.open("GET", 'https://api.github.com/search/users?q='+ user, true);
    request.send();
   // var json = request.responseText;
    //var myObject = JSON.parse(json);
    return request;

}

function showUser(user) {

    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $('h2').text(user.items[0].login);
    $(".avatar").prepend("<img src=" + user.items[0].avatar_url + " />");
    $(".id").text(user.items[0].id);
    $(".link").prepend('<a href="' + user.items[0].html_url + '" >Link to Github page.</a>');



}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $('h2').text("No such user was found");


}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            $(".id").empty();
            $(".avatar").empty();
            $(".link").empty();

            //get the user's information and store the response
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            response.onreadystatechange = (function()
            {
                if (this.readyState==4 && this.status == 200) {
                    showUser(JSON.parse(response.responseText));
                    //else display suitable message
                } else {
                    noSuchUser(username);
                }
            })
        }
    })
});
