'use script';

let new_keep = document.getElementById('new_keep')
let new_keep_btn = document.getElementById('new_keep_btn')
let keeps = document.getElementById('keeps')

new_keep.value = localStorage.getItem('input')
new_keep.oninput = save_input

function save_input(event) {
    console.log(event.target.value)
    localStorage.setItem('input', event.target.value)


}
let keeps_array = JSON.parse(localStorage.getItem('keeps')) || [];
render_keep()
new_keep_btn.onclick = add_keep
function render_keep() {
    keeps.innerHTML = ''
    let i = 0
    for (let value of keeps_array) {
    const keep_template = `
        <div class='col-3 p-2'>
            <div class='col border p-2'>
                <p class='text-wrap overflow-hidden'>${value}</p>
                <button class='btn btn-danger' data-index='${i}' data-action='delete'>
                    delete
                </button>
            </div>
        </div>
    `; 
    keeps.insertAdjacentHTML('afterbegin', keep_template)
    i++
}
}

function add_keep(event) {
    if (new_keep.value) {
        keeps_array.push(new_keep.value);
        localStorage.setItem('keeps', JSON.stringify(keeps_array))
        render_keep()
        new_keep.value = ''
        localStorage.removeItem('input')
        change_visible_add_keep()
    }
}

let btn_start_add_keep = document.getElementById('start_add_btn');
new_keep.hidden = true
new_keep_btn.hidden = true

btn_start_add_keep.onclick = change_visible_add_keep
function change_visible_add_keep() {
    new_keep.hidden = !new_keep_btn.hidden
    new_keep_btn.hidden = !new_keep_btn.hidden
    btn_start_add_keep.hidden = !btn_start_add_keep.hidden
}


keeps.onclick = check_action

function check_action(event) {
    let HTMLelement = event.target

    if (HTMLelement.dataset.action === 'delete') {
        delete_keep(HTMLelement.dataset.index)
    }
}

function delete_keep(index) {
    keeps_array.splice(index, 1)
    localStorage.setItem('keeps', JSON.stringify(keeps_array))
    render_keep();

}