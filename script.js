var serenity = new function() {

    var feeds = [
        "http://www.gamespot.com/rss/game_updates.php?type=3",
        "http://www.gamesradar.com/all-platforms/news/rss/",
        "http://www.joystiq.com/rss.xml",
        "http://feeds.gawker.com/Kotaku/full"
    ];

    var items = [];

    this.parseFeeds = function() {
        for (var i = 0; i < feeds.length; ++i) {
            console.log(feeds[i]);
            getEntriesFromFeed(feeds[i]);
        }
    };

    var getEntriesFromFeed = function(feed2) {
        var feed = new google.feeds.Feed(feed2);
        feed.setNumEntries(60);
        feed.includeHistoricalEntries();
        feed.load(function(result) {
            if (!result.error) {
                for (var i = 0; i < result.feed.entries.length; i++) {
                    var entry = result.feed.entries[i];
                    items.push(entry);
                }
                if (items.length === 60 * 4) {
                    printItems();
                }
            }
        });
    };

    var printItems = function() {
        items.sort(function(a, b) {
            // Converts "Fri, 26 Oct 2012 04:01:00 -0700" to
            // "26 Oct 2012 04:01:00 -0700", then gets the time in milliseconds
            var time1 = new Date(a.publishedDate.substr(5)).getTime();
            var time2 = new Date(b.publishedDate.substr(5)).getTime();
            return time2 - time1;
        });
        var container = $("#news-item");
        var nextLink = $("#next-item-link");
        var prevLink = $("#prev-item-link");

        var subject = $('<h2><a href="' + items[0].link + '">' +
            items[0].title + '</a></h2>');
        container.append(subject);
        var pubDate = $("<p>" + items[0].publishedDate + "</p>");
        container.append(pubDate);
        var content = $(items[0].content);
        container.append(content);

        /**
         * Functionality to change news item.
         */
        var i = 0
        nextLink.click(function() {
            ++i;
            container.html("");
            subject = $('<h2><a href="' + items[i].link + '">' +
                items[i].title + '</a></h2>');
            container.append(subject);
            pubDate = $("<p>" + items[i].publishedDate + "</p>");
            container.append(pubDate);
            content = $(items[i].content);
            container.append(content);
            window.scrollTo(0, 0);
        });
        container.click(function() {
            //window.location = items[i].link;
        });
        prevLink.click(function() {
            --i;
            container.html("");
            subject = $('<h2><a href="' + items[i].link + '">' +
                items[i].title + '</a></h2>');
            container.append(subject);
            pubDate = $("<p>" + items[i].publishedDate + "</p>");
            container.append(pubDate);
            content = $(items[i].content);
            container.append(content);
            window.scrollTo(0, 0);
        });

        /**
         * Functionality to capture slide event.
         */
        var mouseDown = false;
        var startPos = {
            x: 0,
            y: 0
        };
        var firstLoop = false;
        var eventThrown = false;
        container.mouseup(function() {
            mouseDown = false;
            firstLoop = false;
            console.log("UP");
        }).mousedown(function() {
            mouseDown = true;
            firstLoop = true;
            startPos.x = 0;
            startPos.y = 0;
            console.log("DOWN");
            eventThrown = false;
        }).mousemove(function(event) {
            if (mouseDown) {
                if (firstLoop) {
                    startPos.x = event.pageX;
                    startPos.y = event.pageY;
                    firstLoop = false;
                }
                if (!eventThrown) {
                    if (startPos.x - event.pageX > 200) {
                        console.log("slide event!!!!!!");
                        eventThrown = true;
            ++i;
            container.html("");
            subject = $('<h2><a href="' + items[i].link + '">' +
                items[i].title + '</a></h2>');
            container.append(subject);
            pubDate = $("<p>" + items[i].publishedDate + "</p>");
            container.append(pubDate);
            content = $(items[i].content);
            container.append(content);
            window.scrollTo(0, 0);
                    }
                }
            }
        });
    };
}

google.load("feeds", "1");
google.setOnLoadCallback(serenity.parseFeeds);
