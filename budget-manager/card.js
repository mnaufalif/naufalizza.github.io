class Card{
    constructor(id, name, weight, profit){
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.profit = profit;
        this.get_html_tag = function() {
            const formatted_money = Number(this.profit).toLocaleString("id-ID");
            let max_occurence = "";
            if (this.weight<=0){
                max_occurence = "tidak dibatasi";
            }
            else {
                max_occurence = "Maks: " + String(this.weight) + " kali / bulan";
            }
            const tag = `
            <div class="item_card">
                <div class="item_card_name">${this.name}</div>
                <div class="item_card_info">
                    <div class="item_card_profit">Rp${formatted_money}</div>
                    <div class="item_card_weight">${max_occurence}</div>
                </div>
                <input id="${this.id}" type="checkbox" class="discard_checkbox" style="display: none;">
                <label for="${this.id}" class="item_card_discard">×</label>
            </div>`;
            return tag;
        }
    }   
}

export default Card;