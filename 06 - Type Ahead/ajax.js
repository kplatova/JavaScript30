const russiaSubjects = 'https://raw.githubusercontent.com/asakasinsky/russia.json/master/json/russia.subjects.json';
const russiaFederalDistricts = 'https://raw.githubusercontent.com/asakasinsky/russia.json/master/json/russia.federal-districts.json';
const russiaLocality = 'https://raw.githubusercontent.com/asakasinsky/russia.json/master/json/russia.locality.json';

const all = [];

fetch(russiaSubjects)
    .then(blob => blob.json())
    .then(data => all.push(...data.data));

fetch(russiaFederalDistricts)
    .then(blob => blob.json())
    .then(data => all.push(...data.data));

fetch(russiaLocality)
    .then(blob => blob.json())
    .then(data => all.push(...data.data));


function findMatches(wordToMatch, where) {
    return where.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');

        return place.name.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, all);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const entered = place.name.replace(regex, `<span class="hl">${this.value}</span>`);

        return `
            <li>
                <span class="name">${entered}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
suggestions.addEventListener('keyup', displayMatches);

