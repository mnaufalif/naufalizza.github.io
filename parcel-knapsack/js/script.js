import Item from './item.js';
import {dp_knapsack} from './dp_knapsack.js';
// const btn_test = document.getElementById("button_test");
// const lbl_weight = document.getElementById("label_total_weight");

const budget_label = document.getElementById("budget_label");
const set_limit_input = document.getElementById("set_limit_input");
const set_limit_button = document.getElementById("set_limit_button");
const item_name = document.getElementById("added_item_name");
const item_weight = document.getElementById("added_item_weight");
const item_price = document.getElementById("added_item_price");
const process_button = document.getElementById("process_button");
const button_add = document.getElementById("button_add");
const item_container = document.getElementById("item_container");
let items_checkbox = document.getElementsByClassName("discard_checkbox");

const add_dummy_button = document.getElementById("add_dummy_button");

// VARs
let id_num = 0;
let list_item_card = []
let budget = Number(0);

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
    for (var i = 0; i<list_item_card.length; i++){
        if(list_item_card[i].id == id){
            list_item_card.splice(i,1);
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

function add_item(){
    id_num++;
    const name = pop_value(item_name);
    const max_occurence = Number(pop_value(item_weight));
    const price = Number(pop_value(item_price));
    const new_card = new Item(id_num, name, max_occurence, price);
    list_item_card.push(new_card)
    draw_cards();
}

// -- DRAW FUNCs
function draw_cards(){
    var tags = "";
    if (list_item_card.length == 0){
        tags = `
        <div class="item_card" style="background:white; border:0.1rem dashed black;">
            <p>list kosong, silakan tambah barang</p>
        </div>`
    } else {
        list_item_card.forEach(item => {
            tags += item.get_html_tag();
        });
    }
    item_container.innerHTML = tags;
    add_remove_listener();
}

function draw_budget(){
    budget_label.innerHTML = budget;
}

function add_dummy_item(){
    const dummy_data = [
        ['a', 2, 10],
        ['b', 1, 5],
        ['c', 0.5, 7],
        ['d', 0.3, 4]
    ]
    dummy_data.forEach(data => {
        id_num++;
        const new_card = new Item(id_num, data[0], data[1], data[2]);
        list_item_card.push(new_card)
    });
    draw_cards();
}



// EVENTS
// -- SET LIMIT EVENTS
set_limit_button.onclick = function(ev){
    if (set_limit_input.value === '0'){
        budget = 0;
        set_limit_input.value = "";
    }
    else if (Number(set_limit_input.value) >= 0){
        budget = Number(set_limit_input.value);
        set_limit_input.value = "";
    }
    draw_budget();
}
set_limit_input.onkeypress = function(ev){
    if (ev.code == "Enter"){
        if (set_limit_input.value === '0'){
            budget = 0;
            set_limit_input.value = "";
        }
        else if (Number(set_limit_input.value) >= 0){
            budget = Number(set_limit_input.value);
            set_limit_input.value = "";
        }
        draw_budget();
    }
}

// -- PROCESS BUTTON EVENTS
process_button.onclick = function(ev){
    console.log(dp_knapsack(list_item_card, budget));
}

button_add.onclick = function(ev){
    add_item();
}
item_price.onkeypress = function(ev){
    if (ev.code == "Enter"){
        add_item();
    }
}

// -- ADD DUMMY EVENTS
add_dummy_button.onclick = function(ev){
    add_dummy_item();
    budget = Number(2);
    draw_budget();

}


// --

// INIT
draw_budget();
draw_cards();
