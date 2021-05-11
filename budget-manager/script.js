import Card from './card.js';
// const btn_test = document.getElementById("button_test");
// const lbl_weight = document.getElementById("label_total_weight");

const item_name = document.getElementById("added_item_name");
const item_weight = document.getElementById("added_item_weight");
const item_profit = document.getElementById("added_item_profit");
const button_add = document.getElementById("button_add");
const item_container = document.getElementById("item_container");
let items_checkbox = document.getElementsByClassName("discard_checkbox");

const monthly_budget_label = document.getElementById("monthly_budget_label");
const monthly_budget_input = document.getElementById("monthly_budget_input");
const monthly_budget_button = document.getElementById("monthly_budget_button");

const main_content = document.getElementById("main_content");
const result_page = document.getElementById("result_page");
const show_result_button = document.getElementById("show_result_button");
const back_to_main_button = document.getElementById("back_to_main_button");

const result_content = document.getElementById("result_content");

let monthly_budget = 0;

let num = 0;

let items = [];

let knapsack_capacity = 30;
let selected_items = [];

// FUNCTIONS
// -- KNAPSACK FUNCs
function reset_process(){
    knapsack_capacity = 30;
    selected_items = [];
    result_content.innerHTML = "";
}

function process(){
    let cheapest_id = null;
    let cheapest_budget = 0;
    let cheapest_occurence = 30;

    
    // Step 1: sort items array by budget
    items.sort(function(a,b){
        return (b.profit - a.profit);
    });
    if (items.length > 0){
        cheapest_budget = items[items.length-1].profit;
        cheapest_id = items[items.length-1].id;
    }
    const monthly_min = cheapest_budget*knapsack_capacity;

    let remaining_budget = monthly_budget - monthly_min;

    if (remaining_budget < 0){ // budget bulanan tidak cukup
        alert(`budget bulanan tidak cukup.\nbudget bulanan: Rp${Number(monthly_budget).toLocaleString("id-ID")}\nkebutuhan minimal: Rp${Number(monthly_min).toLocaleString("id-ID")}`);
    } else { // budget bulanan cukup
        // Greedy - Knapsack starts here
        
        // Knapsack:
        // - capacity = jumlah hari (30)
        // - item weight = 1..max_occurence for each daily_budget
        // - item value = daily_budget's 'budget'


        // Step 2: 'memasukkan' daily_budgets ke knapsack dengan strategi greedy
        let budget_dif = 0;
        let this_max_oc = 0
        for (var i=0; i<items.length; i++){
            this_max_oc = 0;
            budget_dif = items[i].profit - cheapest_budget;
            if (budget_dif == 0){
                selected_items.push({obj: items[items.length-1], occurence: cheapest_occurence});
                knapsack_capacity -= cheapest_occurence;
                break;
            }
            this_max_oc = Math.floor(remaining_budget/budget_dif);
            if (items[i].weight !== 0){
                if (this_max_oc > items[i].weight){
                    this_max_oc = items[i].weight;
                }
            }
            if (this_max_oc > knapsack_capacity){
                this_max_oc = knapsack_capacity;
            }
            if (this_max_oc > 0){
                selected_items.push({obj: items[i], occurence: this_max_oc})
                remaining_budget -= this_max_oc*(budget_dif);
                knapsack_capacity -= this_max_oc;
                cheapest_occurence -= this_max_oc;
                // console.log(knapsack_capacity, cheapest_occurence, this_max_oc);
            }
        }

        // Step 3: cek apakah knapsack_capacity masih > 0
        //          dengan kata lain, akan ada hari yang belum mendapat alokasi budget harian
        if (knapsack_capacity > 0){
            alert("Alokasi budget < 30 hari, pastikan budget harian sudah di-set dengan benar.");
        }

        // Step 4: menampilkan hasil ke layar
        let total = 0;
        let result_tags = "";
        selected_items.forEach(item => {
            total += item.obj.profit * item.occurence;
            result_tags += `
            <div class="result_item">
                <p><strong>${item.obj.name}: ${item.occurence}</strong> kali</p>
            </div>
            `
        });
        let pre_text = `
                <h3>Hasil Perhitungan:</h3>
                <p>Budget: Rp${Number(monthly_budget).toLocaleString("id-ID")}</p>
                <p>Digunakan: Rp${Number(total).toLocaleString("id-ID")}</p>
                <p>Sisa: Rp${Number(monthly_budget-total).toLocaleString("id-ID")}</p>
                <p><strong>Rincian:</strong></p>
        `;
        result_tags = pre_text.concat(result_tags);
        result_content.innerHTML = result_tags;
        
    }
    
}


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
    draw_all();
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

function draw_all(){
    draw_cards();
    monthly_budget_label.innerHTML = String(monthly_budget.toLocaleString("id-ID"));
}

function add_item(){
    num++;
    const name = pop_value(item_name);
    const weight = Number(pop_value(item_weight));
    const profit = Number(pop_value(item_profit));
    const new_card = new Card(num, name, weight, profit);
    items.push(new_card)
    draw_all();
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

show_result_button.onclick = function(ev){
    main_content.style.display = "none";
    result_page.style.display = "block";
    process();
}

back_to_main_button.onclick = function(ev){
    main_content.style.display = "block";
    result_page.style.display = "none";
    reset_process();
}

monthly_budget_button.onclick = function(ev){
    if (Number(monthly_budget_input.value) >= 0){
        monthly_budget = Number(monthly_budget_input.value);
        monthly_budget_input.value = "";
        draw_all();
    }
}
// --
draw_all();
