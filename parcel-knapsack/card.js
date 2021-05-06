class Card{
    constructor(id, name, weight, profit){
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.profit = profit;
        this.get_html_tag = function() {
            const tag = `
            <div class="item_card">
                <div class="item_card_name">${this.name}</div>
                <div class="item_card_info">
                    <div class="item_card_weight">${this.weight} kg</div>
                    <div class="item_card_profit">Rp${this.profit}</div>
                </div>
                <input id="${this.id}" type="checkbox" class="discard_checkbox" style="display: none;">
                <label for="${this.id}" class="item_card_discard">×</label>
            </div>`;
            return tag;
        }
    }   
}

export default Card;