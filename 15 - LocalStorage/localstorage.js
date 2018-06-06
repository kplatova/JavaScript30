const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const checkAllBtn = addItems.querySelector('#check-all');
const uncheckAllBtn = addItems.querySelector('#uncheck-all');

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;

    const item = {
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    console.log('Localstorage', localStorage);
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
            <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''}>
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join('');
}

function checkAll(e) {
    e.preventDefault();

    items.forEach(item => {
        item.done = true;
    });
    populateList(items, itemsList);
}

function uncheckAll(e) {
    e.preventDefault();

    items.forEach(item => {
        item.done = false;
    });
    populateList(items, itemsList);
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
checkAllBtn.addEventListener('click', checkAll);
uncheckAllBtn.addEventListener('click', uncheckAll);

populateList(items, itemsList);