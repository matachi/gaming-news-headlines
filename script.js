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
        var container = $("#feed");

        var div = $('<div class="item"></div>');
        div.html(items[0].publishedDate + ' <a href="' + items[0].link +
            '">' + items[0].title + '</a>' + items[0].content);
        var i = 0
        div.click(function() {
            ++i;
            div.html(items[i].publishedDate + ' <a href="' + items[i].link +
                '">' + items[i].title + '</a>' + items[i].content);
            window.scrollTo(0, 0);
        });
        container.append(div);
    };
}

google.load("feeds", "1");
google.setOnLoadCallback(serenity.parseFeeds);
