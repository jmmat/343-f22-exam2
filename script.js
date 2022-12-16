// when someone presses enter in the text box
// search github for a repository* based on the text the in the text box
// display the first 10 resulting repositories inside of the ordered list with id "results":
//  each (of the 10) result should be a list item  with the following contents:
//     an h2 element that has only an anchor tag inside of it
//        the anchor tag should link to the repository's html_url
//        the anchor tag should have only the repository's full_name as its content.
//     following the li's h2 element, there should be an unordered list with exactly the following 2 list items:
//        the first list item should have only an anchor tag inside of it
//           the anchor tag should link to the repository's first** issue's html_url
//           the anchor tag should have only the repository's first issue's title as its content.
//        the second list item should have only an anchor tag inside of it
//           the anchor tag should link to the repository's  issues (not the issues_url but the actual issues page***)
//           the anchor tag should have only "More..." as its content.
// Prior to their dynamic creation in the steps above, none of the following elements should be in the page:
//    li, h2, ul, a

// notes:
// * search for a repository with this github api endpoint: https://api.github.com/search/repositories?q=whatevertheytyped
// * repository: https://developer.github.com/v3/repos/#get
// ** the first issue is just the first issue of any state returned by a search of that repository's issues when searching all issue states.
//    e.g. https://api.github.com/repos/mattlogan/RhymeCity/issues?state=all
//    this search requires authentication unfortunately. you will have to add a second argument to your fetch invocation, 
//    e.g. (you can use this token i've created) fetch(url, {headers: {Authorization: 'token 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'}})
//    if the repository has no issues, then the anchor tag can instead just link to # and have "No Issues!" as its content.
// *** the issues page is just the repository's html_url (e.g. https://github.com/mattlogan/RhymeCity ) with "/issues" 
//    appended to it (e.g. https://github.com/mattlogan/RhymeCity/issues ).

function respond(response) {
    console.log(response);
    let resultsContainer = document.getElementById("results")
    resultsContainer.replaceChildren();
    let firstTenResults = response.items.slice(0, 10);
    firstTenResults.forEach((result) => {
        let text = document.createTextNode(`${result.full_name}`);
        let listElem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.appendChild(text);
        console.log(result.html_url);
        anchor.href = `${result.full_name}`;
        listElem.appendChild(anchor);
        resultsContainer.appendChild(listElem);
    });
}

async function getRepo(search) {
    let repo = await fetch(`https://api.github.com/search/repositories?q=${search}`, {headers: {Authorization: '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'}})
    .then(response => response.json())
    .then(response => respond(response))
    .catch(err => console.error(err));
}


let form = document.getElementById("daform");

form.addEventListener("submit", (event) => {
    console.log("Form submitted");
    console.log(document.querySelector('#query').value);
    getRepo(document.querySelector('#query').value);
});
