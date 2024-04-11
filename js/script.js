'use strict'

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
{
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const clickedHref = clickedElement.getAttribute('href');
    console.log(clickedHref);
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const clickedArticle = document.querySelector(clickedHref);
    console.log(clickedArticle);
    /* [DONE] add class 'active' to the correct article */
    clickedArticle.classList.add('active');
}

//const links = document.querySelectorAll('.titles a');
//console.log(links);

//for(let link of links){
    //link.addEventListener('click', titleClickHandler);
//}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector= '.titles';

const generateTitleLinks = function(){
    console.log('Title Links Generated!');
    //delete contents of link list in left table
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //for every article:
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    let html = '';

    for(let article of articles){
        const articleId = article.getAttribute('id');
        //console.log(articleId);
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        //console.log(articleTitle);

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        //console.log(linkHTML);

        //titleList.innerHTML = titleList.innerHTML +linkHTML;
        //titleList.insertAdjacentHTML("beforeend", linkHTML);
        //console.log(titleList);
        html = html + linkHTML;

        console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
    }

    //read its id and save as const
    //find element with article title and save its content to a const
    //using saved consts create HTML link code and save it as a new const
    //Insert created HTML link code to link list in left table

generateTitleLinks();

}