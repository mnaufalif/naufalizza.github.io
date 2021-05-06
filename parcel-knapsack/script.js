import Card from './card.js';
// const btn_test = document.getElementById("button_test");
// const lbl_weight = document.getElementById("label_total_weight");

const item_name = document.getElementById("added_item_name");
const item_weight = document.getElementById("added_item_weight");
const item_profit = document.getElementById("added_item_profit");
const button_add = document.getElementById("button_add");
const item_container = document.getElementById("item_container");
let items_checkbox = document.getElementsByClassName("discard_checkbox");

let num = 0;

let items = [
]

// FUNCTIONS
function pop_value(item){
    if (item.value == undefined || item.value == null){
        return "";
    }
    const temp_str = item.value;
    item.value = "";
    return temp_str;
}

function remove_item(id){
    for (var i = 0; i<items.length; i++){
        if(items[i].id == id){
            items.splice(i,1);
            break;
        }
    }
    draw_cards();
}

function add_remove_listener(){
    for (var i = 0; i<items_checkbox.length; i++){
        items_checkbox[i].onclick = function(ev){
            remove_item(this.id);
        }
    }
}

function draw_cards(){
    var tags = "";
    if (items.length == 0){
        tags = `
        <div class="item_card" style="background:white; border:0.1rem dashed black;">
            <p>list kosong, silakan tambah barang</p>
        </div>`
    } else {
        items.forEach(item => {
            tags += item.get_html_tag();
        });
    }
    item_container.innerHTML = tags;
    add_remove_listener();
}

function add_item(){
    num++;
    const name = pop_value(item_name);
    const weight = Number(pop_value(item_weight));
    const profit = Number(pop_value(item_profit));
    const new_card = new Card(num, name, weight, profit);
    items.push(new_card)
    draw_cards();
}






// EVENTS

button_add.onclick = function(ev){
    add_item();
}

item_profit.onkeypress = function(ev){
    if (ev.code == "Enter"){
        add_item();
    }
}
// --
draw_cards();
