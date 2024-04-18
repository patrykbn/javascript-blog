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
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

//const generateTitleLinks = function(){
    function generateTitleLinks(customSelector = ''){
    console.log('Title Links Generated!');
    //delete contents of link list in left table
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //for every article:
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for(let article of articles){
        /* find tags wrapper */
        const tagList = article.querySelector(optArticleTagsSelector);
        console.log(tagList);
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        console.log(articleTags);
        /* make html variable with empty string */
        let html = '';
        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray);
      /* START LOOP: for each tag */
        for(let tag of articleTagsArray){
            /* generate HTML of the link */
            const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            html = html + tagHTML;
            /* add generated code to html variable */
        }
        /* END LOOP: for each tag */
        console.log(html);
        tagList.innerHTML = html;
         /* insert HTML of all the links into the tags wrapper */
    }
    /* END LOOP: for every article: */
  }
  generateTags();

  function tagClickHandler(event){
    event.preventDefault();
    /* prevent default action for this event */
    const clickedElement = this;
    /* make new constant named "clickedElement" and give it the value of "this" */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    //const tag = clickedElement.querySelector(href);
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* find all tag links with class active */
    for(let activeTag of activeTags){
    /* START LOOP: for each active tag link */
        activeTag.classList.remove('active');
      /* remove class active */
    }
    /* END LOOP: for each active tag link */

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* find all tag links with "href" attribute equal to the "href" constant */
    for(let tagLink of tagLinks){
    /* START LOOP: for each found tag link */
        tagLink.classList.add('active');
      /* add class active */
    }
    /* END LOOP: for each found tag link */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    /* execute function "generateTitleLinks" with article selector as argument */
}
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags .list a');
    console.log(tagLinks);

    for(let tagLink of tagLinks){
        tagLink.addEventListener('click', tagClickHandler);
    }
    /* START LOOP: for each link */
  
      /* add tagClickHandler as event listener for that link */
  
    /* END LOOP: for each link */
  }

  addClickListenersToTags();
}