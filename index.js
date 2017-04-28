var fs = require("fs");
var markdown = require("markdown").markdown;
var template = require("art-template");



//异步读取posts文件夹下的md文件，获取文章信息对象（需要获得文章名，发表时间，tags[]）,若成功则调用生成html函数
function createAllHTML() {
    var files = fs.readdirSync("./posts");
    var mdInfos = [];
    
    files.forEach(function(fileName, index) {
        var mdContent = fs.readFileSync("./posts/" + fileName,'utf8');
        var mdHeader = getMdInfo(mdContent);
        
        mdInfos.push(mdHeader);

        var body = getHTMLContent(mdContent);

        var config = JSON.parse(fs.readFileSync("./config.json",'utf8'));
        var theme = config.theme;
        var markdownLayout = config.markdownLayout;

        console.log(config);

        var data = {
            theme: theme,
            markdownLayout: markdownLayout,
            title: mdHeader.title,
            date: mdHeader.date,
            content: body
        };

        var html = template("./SelfDefinedBlog/templates/article.art", data);
        generateHTML(index,mdHeader,html);
    });
    return mdInfos;
}
 
//获取md文件的头部信息
function getMdInfo(mdContent) {
    var header, title, date;

    // get the post's title
    header = /title:\s+(.+)/.exec(mdContent);
    title = header[1];
    
    // get the post's date
    header = /date:\s+(.+)/.exec(mdContent);
    date = header[1];

    return {
        title: title,
        date: date,
    };
}

//提取md文件除去头部之后的内容主体，以字符串返回
function getHTMLContent(mdContent) {
    var body = mdContent.slice(mdContent.indexOf("---", 4) + 4);
    var content = markdown.toHTML(body);
    return content;
}
//md解析器解析md文件，生成html放到publishes目录下，并用md5生成文件名(发表时间作为前缀).
function generateHTML(index, mdHeader, content) {
    var date = mdHeader.date;
    var fileNameHTML = date + "-" + index + ".html";
    var pathName = "./publishes/";

    var title = mdHeader.title;
    fs.writeFileSync(pathName + fileNameHTML, content);
}


//读取publishes目录下的html文档，利用templates目录下的home.art生成index.html放到根目录下
function createIndex(mdInfos) {
    var theme = JSON.parse(fs.readFileSync("./config.json"),'utf8').theme;

    var htmls_temp = fs.readdirSync("./publishes",'utf8');
    var htmls = htmls_temp.sort(function(a,b) {
        return a <= b;
    });
    var articles = [];
    console.log(htmls);
    
    for(var i = 0; i < htmls.length; i++) {
        var fileIndex = parseInt(htmls[i].slice(htmls[i].lastIndexOf("-") + 1));

        var articleTitle = mdInfos[fileIndex].title;
        var date = mdInfos[fileIndex].date;

        articles.push({
            fileName: htmls[i],
            title: articleTitle,
            date: date
        });
    }

    var data = {
        articles: articles,
        theme: theme
    };
    var html = template("./SelfDefinedBlog/templates/home.art", data);
    fs.writeFileSync("./index.html", html);
}

function init() {
    var mdInfos = createAllHTML();
    console.log(mdInfos);
    createIndex(mdInfos);
}

init();
