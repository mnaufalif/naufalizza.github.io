function get_null_matrix(row, col){
    let null_mat = [];
    for (var i=0; i<row; i++){
        null_mat.push([]);
        for (var j=0; j<col; j++){
            null_mat[i].push(0);
        }
    }
    return null_mat;
}

function dp_knapsack(list_item_card, max_capacity){
    max_capacity = Number(max_capacity);
    const m_row = Number(list_item_card.length) + 1;
    const m_col = max_capacity + 1;
    let dynamic_matrix = get_null_matrix(m_row, m_col);

    // console.log(dynamic_matrix);
    
    // filling dynamic matrix
    for (var i=0; i<m_row; i++){
        for (var j=0; j<m_col; j++){
             if (i === 0){ // knapsack empty 
                dynamic_matrix[i][j] = Number(0);
             } else {
                 if (list_item_card[i-1].max_occurence > j){ // kapasitas lebih kecil dari max_occurence items
                    dynamic_matrix[i][j] = dynamic_matrix[i-1][j];
                } else {
                    const remaining_capacity = Math.ceil(j - list_item_card[i-1].max_occurence);
                    // console.log(remaining_capacity)
                    dynamic_matrix[i][j] = dynamic_matrix[i-1][remaining_capacity] + list_item_card[i-1].profit; 
                }
                console.log(list_item_card[i-1].max_occurence);
                console.log(j);
                console.table(dynamic_matrix);
             }
        }
    }
    
    let knapsack_list = [];
    // filling knapsack list
    let ci = m_row-1;
    let cj = m_col-1;
    // console.log(list_item_card);
    while (i>0){
        // item unkept
        // console.log(ci);
        // console.log(dynamic_matrix);
        if (dynamic_matrix[ci][cj] == dynamic_matrix[ci-1][cj]){
            knapsack_list.unshift(Number(0));
            ci--;
        }
        // item kept
        else {
            knapsack_list.unshift(Number(1));
            cj -= list_item_card[ci-1].profit.max_occurence;
            ci--;
        }
    }

    return {
        max_profit : dynamic_matrix[m_row-1][m_col-1],
        knapsack_list : knapsack_list
    }
}

export {dp_knapsack};