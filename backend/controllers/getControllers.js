const database = require('../database/database');
const client = database.client;
const dbName = database.dbName;
const request = require('request-promise');
const cheerio = require('cheerio');
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();


function home(req,res){
    res.send({info:"This is homepage"});
}
var years = ['2020','2019','2018'];
var months = ['12','11','10','09','08','07','06','05','04','03','02','01'];
var days = ['31','30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','09','08','07','06','05','04','03','02','01'];
var thisYear = new Date().getFullYear();
var thisDay = new Date().getDate();
var thisMonth = new Date().getMonth()+1;
function createLinks(tag){
    var links = [];
    for(var i = 0; i < years.length; i++){
        for(var j = 0; j < months.length; j++){
            for(var k = 0; k < days.length; k++){
                if(parseInt(years[i]) == parseInt(thisYear)){
                    if(months[j] < thisMonth){
                        if(months[j] == 2 && days[k] < 29){
                            links.push(`https://medium.com/tag/${tag}/archive/${years[i]}/${months[j]}/${days[k]}`);
                        }
                        else if((months[j] == 4 || months[j] == 6 || months[j] == 9 || months[j] == 11) && days[k] < 31){
                            links.push(`https://medium.com/tag/${tag}/archive/${years[i]}/${months[j]}/${days[k]}`);
                        }
                        else if((months[j] == 1 || months[j] == 3 || months[j] == 5 || months[j] == 7 || months[j] == 8 || months[j] == 10 || months[j] == 12) && days[k] <= 31){
                            links.push(`https://medium.com/tag/${tag}/archive/${years[i]}/${months[j]}/${days[k]}`);
                        }
                    }
                    else if(months[j] == thisMonth){
                        if(days[k] <= thisDay-1){
                            links.push(`https://medium.com/tag/${tag}/archive/${years[i]}/${months[j]}/${days[k]}`);
                        }
                    }
                }
                else{
                    if(months[j] == 2 && days[k] < 29){
                        links.push(`https://medium.com/tag/${tag}/archive/${years[i]}/${months[j]}/${days[k]}`);
                    }
                    else if((months[j] == 4 || months[j] == 6 || months[j] == 9 || months[j] == 11) && days[k] < 31){
                        links.push(`https://medium.com/tag/${tag}/archive/${years[i]}/${months[j]}/${days[k]}`);
                    }
                    else if((months[j] == 1 || months[j] == 3 || months[j] == 5 || months[j] == 7 || months[j] == 8 || months[j] == 10 || months[j] == 12) && days[k] <= 31){
                        links.push(`https://medium.com/tag/${tag}/archive/${years[i]}/${months[j]}/${days[k]}`);
                    }
                }
            }
        }
    }
    return links;
}
const blogs = async function(req, res) {
    var { start, tag } = req.query;
    start = parseInt(start);
    console.log({start,tag});
    var tagError = false;
    var blogs = [];
    var hasMore = true;
    var notFound = false;

    if(!tag){
        console.log({info:'going to redirect to homepage'});
        return res.send({hasMore:false,blogs,tagError:true,notFound});
    }
    
    var links = createLinks(tag);
    var link = links[parseInt(start/10)];
    
    if(parseInt(start/10)+1 >= links.length)
        hasMore = false;
    
    var options = {
        method: 'GET',
        url: link,
        headers: {
            "Connection": 'keep-alive'
        }
    }
    
    try{
        blogs = await getLatestBlogs(tag,options);
        return res.send({hasMore,tagError,notFound,blogs});
    }
    catch(err){
        console.log(err.statusCode);
        if(err.statusCode == 404){
            return res.send({hasMore:false,tagError,blogs:[],notFound:true});
        }
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
async function getLatestBlogs(tag, options = null,socket,hasMore) {
    
    var htm = '';
    console.log(options);
    try{
        if (!options)
        htm = await request('https://medium.com/tag/' + tag);
        else
            htm = await request(options);
    }
    catch(err){
        console.log(err.statusCode);
        console.log({infoFromGet:'Cached'});
        if(err.statusCode == 404){
            socket.emit('FromAPI',{hasMore:false,streaming:false,blog:[],notFound:true})
        }
    }
    const $ = cheerio.load(htm);
    var result = [];
    const len = $('div.streamItem').length;
    var streaming = true,responce;
    $('div.streamItem').each(function(i, element) {
       try{
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
       }
       catch(err){
           console.log(err);
       }
    });
    
    result.forEach((blog,index)=>{
        setTimeout(function(){
            if(index < 10){
                if(index == 9 || index == result.length -1 )
                    streaming = false;
                responce = {
                    blog,streaming,hasMore,notFound:false
                }
                socket.emit('FromAPI',responce);
            }
        },index*1000);
    });
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

function socket(io){
    let interval;
    io.on('connection',socket => {
        console.log('New client connected');
        if(interval)
            clearInterval(interval);
        socket.on('getBlogs',(tag,start)=>{
            console.log(tag,start);
            var hasMore = true;
            var links = createLinks(tag);
            var link = links[parseInt(start/10)];
            if(parseInt(start/10)+1 >= links.length)
                hasMore = false;
            var options = {
                method: 'GET',
                url: link,
                headers: {
                    "Connection": 'keep-alive'
                }
            }
            getLatestBlogs(tag,options,socket,hasMore);
        });
        socket.on('disconnect',()=>{console.log('client disconnected');clearInterval(interval);});
    });
}

module.exports = {
    blogs,
    blogDetail,
    home,
    socket
}