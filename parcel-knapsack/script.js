// const btn_test = document.getElementById("button_test");
// const lbl_weight = document.getElementById("label_total_weight");

const item_name = document.getElementById("added_item_name");
const item_weight = document.getElementById("added_item_weight");
const item_profit = document.getElementById("added_item_profit");
const button_add = document.getElementById("button_add");


let num = 0;


// FUNCTIONS
function set_inner(tag, value){
    tag.innerHTML = String(value);
}

function pop_value(item){
    if (item.value == undefined || item.value == null){
        return "";
    }
    const temp_str = item.value;
    item.value = "";
    return temp_str;
}

function add_item(){
    console.log(pop_value(item_name));
    console.log(pop_value(item_weight));
    console.log(pop_value(item_profit));
}
// --





// EVENTS
// btn_test.onclick = function(ev){
//     num++;
//     lbl_weight.innerHTML = String(num);
// }

button_add.onclick = function(ev){
    add_item();
}

item_profit.onkeypress = function(ev){
    if (ev.code == "Enter"){
        add_item();
    }
}
// --