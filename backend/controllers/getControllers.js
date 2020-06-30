const database = require('../database/database');
const client = database.client;
const dbName = database.dbName;
const request = require('request-promise');
const cheerio = require('cheerio');
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();


const updateAllBlogs = async(yesterday) => {
    var tags = ['artificial-intelligence', 'data-science', 'javascript', 'biotechnology', 'math', 'space', 'travel', 'outdoors',
        'world', 'photography', 'fitness', 'creativity', 'fiction', 'books', 'poetry', 'writing', 'true-crime', 'comics', 'tv', 'film',
        'music', 'style', 'lifestyle', 'beauty', 'environment', 'social-media', 'science', 'technology', 'deep-learning', 'blockchain', 'health', 'future', 'business',
        'work', 'culture', 'programming', 'design', 'LGBTQIA', 'politics', 'relationships', 'self', 'startups', 'food', 'neuroscience', 'python',
        'mental-health', 'mindfulness', 'spirituality', 'productivity', 'machine-learning', 'freelancing', 'leadership', 'economy', 'money', 'basic-income',
        'cryptocurrency', 'cybersecurity', 'privacy', 'blockchain', 'society', 'cities', 'self-driving-cars', 'transportation',
        'san-francisco', 'humor', 'language', 'digital-life', 'gadgets', 'gaming', 'erotica', 'sex'
    ]
    client.connect(async function(err, client) {
        const namespace = client.db(dbName).collection('blogs');
        var counter = 0;
        var updated = false;
        tags.forEach(async(tag, index) => {
            var tagdb = await namespace.findOne({tag});
            var updatedOn = tagdb.updatedOn;
            if(updatedOn !== yesterday){
                var link = 'https://medium.com/tag/' + tag + '/archive/' + yesterday;
                var options = {
                    method: 'GET',
                    url: link,
                    headers: {
                        "Connection": 'keep-alive'
                    }
                }
                updated = true;
                setTimeout(async() => {
                    var nowTagdb = await namespace.findOne({tag});
                    var nowUpdateStatus = nowTagdb.updatedOn;
                    if(nowUpdateStatus !== yesterday){
                        try{
                            var blogs = await getLatestBlogs(tag, options);
                            blogs.forEach(blog => {
                                if (blog.title) {
                                    namespace.findOne({ tag: tag, 'blogs.title': blog.title })
                                        .then(result => {
                                            if (!result) {
                                                namespace.updateOne({ tag }, { $push: { 'blogs': { $each: [blog], $position: 0 } } });
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                            });
                            namespace.updateOne({tag},{$set:{updatedOn:yesterday}});
                        }
                        catch(err){
                            console.log("Error occured while founding blogs for tag ",tag,err);
                        }
                    }
                }, 1000 * 30 * counter);
                counter++;
            }
        });
        if(!updated)
            namespace.updateOne({name:'updatedOn'},{$set:{date:yesterday}});
    });
}
const blogs = async function(req, res) {
    var { start, tag } = req.query;
    var blogs = [];
    var hasMore = true;
    if (start == 0) {
        blogs = await getLatestBlogs(tag);
        client.connect(async function(err, client) {

            var namespace = client.db(dbName).collection('blogs');
            var result = await namespace.findOne({ tag: tag });

            if (result.blogs.length < 10) hasMore = false;

            // blogs = blogs.filter(blog => !blog.linkToBlogPage.includes('onezero.medium')); 

            var responce = [...blogs];


            //if responce contains less than 10 blogs then query for blogs in database;
            for (var count = 0; count < result.blogs.length; count++)
                if (responce.length >= 10)
                    break;
                else {
                    var isPresent = responce.find(blog => blog.title == result.blogs[count].title);
                    if (!isPresent)
                        responce.push(result.blogs[count]);
                }


            res.send({ hasMore, blogs: responce });

            blogs = blogs.reverse(); //so that latest come at the top of array;
            blogs.forEach(blog => {
                if (blog.title) {
                    namespace.findOne({ tag: tag, 'blogs.title': blog.title })
                        .then(result => {
                            if (!result) {
                                namespace.updateOne({ tag }, { $push: { 'blogs': { $each: [blog], $position: 0 } } });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });


            var today = new Date();
            var month, year, date;
            year = today.getFullYear();
            month = today.getMonth() + 1;
            date = today.getDate() - 1; //for yesterday;
            if (month < 10)
                month = '0' + month;
            if (date < 10)
                date = '0' + date;
            var yesterday = year + '/' + month + '/' + date;
            var updatedOn = await namespace.findOne({name:'updatedOn'});
            var updatedOnDate = updatedOn.date;
            if(updatedOnDate !== yesterday) 
                updateAllBlogs(yesterday); //updates only if not updated till yesterday otherwise updates for yesterday;

        });
    } else {
        client.connect(function(err, client) {
            namespace = client.db(dbName).collection('blogs');
            namespace.findOne({ tag: tag })
                .then(result => {
                    if (result) {
                        blogs = result.blogs.slice(parseInt(start), parseInt(start) + 10);
                        blogs = blogs.filter(blog => !blog.linkToBlogPage.includes('onezero.medium'));
                        if (result.length < parseInt(start) + 10 || blogs.length == 0) hasMore = false;
                        res.send({ hasMore, blogs });
                    }
                })
        });
    }
}

const blogDetail = async(req, res) => {
    var link = req.query.q;
    var baseURL = "https://medium.com";
    if (link && !link.startsWith('https'))
        link = baseURL + link;
    var result;
    try {
        result = await scrapBlogDetail(link);
    } catch (err) {
        result = "";
        console.log(err);
    }
    return res.send({ body: result });
}
async function getLatestBlogs(tag, options = null) {
    
    var htm = '';
    
    if (!options)
        htm = await request('https://medium.com/tag/' + tag);
    else
        htm = await request(options);
    
        const $ = cheerio.load(htm);
    var result = [];
    $('div.streamItem').each(function(i, element) {
        var title = $(element).find('h3.graf--title');
        var description = $(element).find('h4.graf--subtitle');
        var linkToBlogPage = $(element).find('div.postArticle').children('div').eq(1).children('a').attr('href').split("?")[0];
        var authorLockup = $(element).find('div.postMetaInline-authorLockup');
        var details = authorLockup.children('div').text() + ", " + authorLockup.children('div').children('span.readingTime').attr('title');
        var writer = authorLockup.children('a').eq(0).text();
        var img = $(element).find('figure').find('img').attr('src');
        var engProb = lngDetector.detect(title.text()).filter(languageProb => languageProb[0] == 'english')[0];
        if (!linkToBlogPage.includes('onezero.medium') && title.text() && (engProb && engProb[1] > 0.001))
            result.push({ title: title.text(), description: description.text(), linkToBlogPage: linkToBlogPage, details: details, writer: writer, img: img });

    });
    return result;
}

async function scrapBlogDetail(link = 'https://medium.com/better-programming/the-secret-to-being-a-top-developer-is-building-things-heres-a-list-of-fun-apps-to-build-aac61ac0736c') {
    
    var splittedLink = link.split('/');
    var protocol = splittedLink[0];
    var host = splittedLink[2];
    var baseURL = protocol + '//' + host;
    /////

    var htm = await request(link);

    const $ = cheerio.load(htm);

    var article = $('article').eq(0);

    var tagsAndBloggerDetails = $(article).nextAll('div.r').eq(-1).prev();

    //removing the divs that are extra in most parent div containing tags;
    $($($(tagsAndBloggerDetails).children('div.n.p')).children('div.n.p')).children('div').children().not('.r').remove();
    
    tagsAndBloggerDetails.find('ul').find('a').each(function(index, a) {
            $(a).addClass('no-hover-effect');
            $(a).attr('onclick', 'event.preventDefault()');
            // $(a).attr('href','');
        })
        //constructing links and "More From" heading in container containing sugessted articles;
    tagsAndBloggerDetails.children().children().eq(-1).find('h2').each(function(i, h2) {
        if ($(h2).html() == 'More From Medium') {
            $(h2).html('More From Crawler');
        }
    });
    tagsAndBloggerDetails.children().children().eq(-1).find('h2').find('a').each(function(index, a) {
        var link = $(a).attr('href').split('?')[0];
        if (!link.startsWith('http'))
            link = baseURL + link;
        var link = '/detailed-article?q=' + link;
        $(a).attr('href', link);
        $(a).attr('id', 'reconstructed-link');
    })

    //constructing and changing text of responce button;(and constructing the link inside it)
    var responceButton = tagsAndBloggerDetails.children().children().children().children('div.r').eq(-1);
    responceButton.find('a').attr('href', '');
    var responceTextContainer = responceButton.find('span').eq(-1);
    if (responceTextContainer.text().includes("Write")) {
        responceTextContainer.text('No responces yet');
    } else {
        var splitted = responceTextContainer.text().trim().split(' ');
        var number = splitted[splitted.length - 1];
        responceTextContainer.text('Total ' + number.substr(1, 1) + " Responses");
    }
    $('img').each(function(index, img) {
        $(img).attr('style', 'opacity:1');
    });
    $('button').each(function(index, button) {
        if (!$(button).hasClass('mine'))
            $(this).remove();
    });
    $('a[rel=noopener]').each(function(index, a) {
        if ($(a).attr('id') != 'reconstructed-link') {
            $(a).addClass('no-hover-effect');
            $(a).attr('onclick', 'event.preventDefault()');
        }
        if($(a).attr('href').includes('sign'))
            $(a).parent().remove();
    })
    $('div.q').remove(); //to remove register button;
    return $('head').html() + $(article).html().toString() + tagsAndBloggerDetails.html();
    // $('a[rel')
}


module.exports = {
    blogs,
    blogDetail
}