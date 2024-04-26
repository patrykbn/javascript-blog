'use strict'

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
{
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    //console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const clickedHref = clickedElement.getAttribute('href');
    //console.log(clickedHref);
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const clickedArticle = document.querySelector(clickedHref);
    //console.log(clickedArticle);
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
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassCountAuhtors = 2,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list.authors'

//const generateTitleLinks = function(){
    function generateTitleLinks(customSelector = ''){
    //console.log('Title Links Generated!');
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

        //console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    //console.log(links);

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
    }

    //read its id and save as const
    //find element with article title and save its content to a const
    //using saved consts create HTML link code and save it as a new const
    //Insert created HTML link code to link list in left table

generateTitleLinks();

function calculateTagsParams(tags){
    const params = {max: 0, min: 999999};
    for(let tag in tags){
        //console.log(tag + ' is used ' + tags[tag] + ' times');
        if(tags[tag] > params.max){
            params.max = tags[tag];
        }
        params.min = Math.min(tags[tag], params.min);
    }
    return params;
}

function calculatetagClass(count, params){
    const classNumber = optCloudClassPrefix + Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1);
    //console.log(classNumber);
    return classNumber;
}

 function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    /* START LOOP: for every article: */
    for(let article of articles){
        /* find tags wrapper */
        const tagList = article.querySelector(optArticleTagsSelector);
        //console.log(tagList);
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        //console.log(articleTags);
        /* make html variable with empty string */
        let HTML = '';
        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        //console.log(articleTagsArray);
      /* START LOOP: for each tag */
        for(let tag of articleTagsArray){
            /* generate HTML of the link */
            const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            HTML = HTML + tagHTML;
            /* add generated code to html variable */
            /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){
            /* [NEW] add generated code to allTags array */
            allTags[tag] = 1;
          } else {
            allTags[tag]++;
          }
        }
        /* END LOOP: for each tag */
        //console.log(html);
        tagList.innerHTML = HTML;
         /* insert HTML of all the links into the tags wrapper */
    }
    /* END LOOP: for every article: */
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
  
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams', tagsParams);
    let allTagsHTML = '';
    //console.log('allTags', allTags);

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
        /* [NEW] generate code fof link and add it to allTagsHTML */
        const tagLinkHTML = '<li><a class="' + calculatetagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
        allTagsHTML += tagLinkHTML;
        
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add HTML from allTagsHTML to taglist */
    tagList.innerHTML = allTagsHTML;
    //console.log(allTags);
  
  }
  generateTags();

  function tagClickHandler(event){
    event.preventDefault();
    /* prevent default action for this event */
    const clickedElement = this;
    /* make new constant named "clickedElement" and give it the value of "this" */
    const href = clickedElement.getAttribute('href');
    //console.log(href);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const tag = href.replace('#tag-', '');
    //console.log(tag);
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
    //console.log(tagLinks);

    for(let tagLink of tagLinks){
        tagLink.addEventListener('click', tagClickHandler);
    }
    /* START LOOP: for each link */
  
      /* add tagClickHandler as event listener for that link */
  
    /* END LOOP: for each link */
  }

  addClickListenersToTags();

/////////////////////////////////////////////////////////////////////////////////////////////////////
function calculateAuthorParams(authors){
    const params = {max: 0, min: 999999};
    for(let author in authors){
        //console.log(tag + ' is used ' + tags[tag] + ' times');
        if(authors[author] > params.max){
            params.max = authors[author];
        }
        params.min = Math.min(authors[author], params.min);
    }
    return params;
}

function calculateAuthorClass(count, params){
    const classNumber = optCloudClassPrefix + Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCountAuhtors + 1);
    //console.log(classNumber);
    return classNumber;
}

function generateAuthors(){
    let allAuthors = {};
    //console.log(allAuthors);
    //find all articles
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    // start loop for every article
    for(let article of articles){
        //get author from "data-Author"
        const dataAuthor = article.getAttribute('data-author');
        //console.log(dataAuthor);
        //find author link under article title
        const articleAuthor = article.querySelector('.post-author');
        //add article author from "data-author"
        articleAuthor.innerHTML = dataAuthor;
        articleAuthor.setAttribute("href", '#author-' + dataAuthor);
        //console.log(articleAuthor);
        if(!allAuthors[dataAuthor]){
            allAuthors[dataAuthor] = 1;
        } else {
            allAuthors[dataAuthor]++;
        }
        //count amount of articles each author has
    }

    const authorList = document.querySelector(optAuthorsListSelector);
    //find author list in right column
    const authorParams = calculateAuthorParams(allAuthors);
    //console.log('authorParams', authorParams);
    let authorListHTML = '';
    //console.log('allAuthors',allAuthors);

    for(let author in allAuthors){
        const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[author], authorParams) + '" href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')<a/></li>';
        authorListHTML += authorLinkHTML;
    }
    authorList.innerHTML = authorListHTML;
    }
  
  generateAuthors();

  function authorClickHandler(event){
    event.preventDefault();
    /* prevent default action for this event */
    const clickedElement = this;
    /* make new constant named "clickedElement" and give it the value of "this" */
    const href = clickedElement.getAttribute('href');
    //console.log(href);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const author = href.replace('#author-', '');
    //console.log(tag);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"');
    /* find all tag links with class active */
    for(let activeAuthor of activeAuthors){
    /* START LOOP: for each active tag link */
        activeAuthor.classList.remove('active');
      /* remove class active */
    }
    /* END LOOP: for each active tag link */

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* find all tag links with "href" attribute equal to the "href" constant */
    for(let authorLink of authorLinks){
    /* START LOOP: for each found tag link */
        authorLink.classList.add('active');
      /* add class active */
    }
    /* END LOOP: for each found tag link */
    generateTitleLinks('[data-author="' + author + '"]');
    /* execute function "generateTitleLinks" with article selector as argument */
}
  function addClickListenersToAuthors(){
    /* find all links to tags */
    const authorLinks = document.querySelectorAll('.post-author');
    //console.log(tagLinks);

    for(let authorLink of authorLinks){
        authorLink.addEventListener('click', authorClickHandler);
    }
    /* START LOOP: for each link */
      /* add tagClickHandler as event listener for that link */
    /* END LOOP: for each link */
  }

  addClickListenersToAuthors();
}