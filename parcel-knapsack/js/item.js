class Item{
    constructor(id, name, max_occurence, price){
        this.id = id;
        this.name = name;
        this.max_occurence = Number(max_occurence);
        this.price = Number(price);
        this.get_html_tag = function() {
            const tag = `
            <div class="item_card">
                <div class="item_card_name">${this.name}</div>
                <div class="item_card_info">
                    <div class="item_card_weight">${this.max_occurence} kg</div>
                    <div class="item_card_price">Rp${this.price}</div>
                </div>
                <input id="${this.id}" type="checkbox" class="discard_checkbox" style="display: none;">
                <label for="${this.id}" class="item_card_discard">×</label>
            </div>`;
            return tag;
        }
    }   
}

export default Item;