$(document).ready(function() {
    var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "MedryBW", "freecodecampliverpool"];


    var freecodecampUrl = "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp"
    var counter = 0;

    function getStrem() {
        var twichUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
        $.ajax({
            url: twichUrl + channels[counter],
            dataType: "jsonp",
            success: function(data) {
                fillAll(data);
                if (counter < channels.length) {
                    getStrem()
                }
            }
        });
    }
    getStrem();

    function fillAll(data) {
        var divisions = "<div> <a href='"+  "https://www.twitch.tv/" + channels[counter]+ "'>%data%</a></div>";
        var elementListed = "<h2" + " id='" + channels[counter] + "'>" + channels[counter] + "</h2>";
        if (data.stream) {
            var contentStreamed = "<p class = 'online'>" + data.stream.channel.game + "</p>";
            var newDivisions = divisions.replace("%data%", elementListed + contentStreamed);
            $("#All").append(newDivisions);
            $("#Online").append(newDivisions);
            counter++
        } else {
            var newDivisions = divisions.replace("%data%", elementListed);
            $("#All").append(newDivisions);
            $("#Offline").append(newDivisions);
            counter++;

        }
    }
    $("button").click(function(evt) {
        $("button").removeClass("active");
        evt.currentTarget.className += " active";
        var tabContentSelector = $(evt.currentTarget).text();
        $(".tabContent").addClass("doNotDisplay");
        $("#" + tabContentSelector).removeClass("doNotDisplay");
        updateSearchResults();
    })
    function updateSearchResults() {
        var valueSearched = ($(".searchBar").val()).toLowerCase();
        var tabContentActive = $("#" + $(".active").text()).children();
        for (var i = 0; i < tabContentActive.length; i++) {
            var streamId = (tabContentActive[i].children[0].children[0].id).toLowerCase();
            $(tabContentActive[i]).addClass("doNotDisplay");
            if (valueSearched == streamId.substring(0, valueSearched.length)) {
                $(tabContentActive[i]).removeClass("doNotDisplay");
            }
        }
    }
    $(".searchBar").keyup(updateSearchResults);

})
