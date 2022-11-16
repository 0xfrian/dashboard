async function getSignConvention(txs) {
    let positives = 0;
    let negatives = 0;
    for (const tx of txs) {
        if (Number(tx.amount) >= 0) positives++;
        else negatives ++;
    }

    if (positives >= negatives) return -1; 
    else return 1;
}

async function formatAmount(txs) {
    for (const tx of txs) {
        if (tx.amount.includes("$")) tx.amount = Number(tx.amount.replace("$", ""));
    }

    const convention = await getSignConvention(txs); 
    for (const tx of txs) {
        tx.amount = convention * tx.amount;
    }

    return txs;
}

async function sortTxs(txs, method="") {
    if (method == "monthly") {
        let txs_sorted = {};
        for (const tx of txs) {
            const [year, month, day] = tx.date.split("-");
            if (!txs_sorted[month]) txs_sorted[month] = [];
            txs_sorted[month].push(tx);
        }
        return txs_sorted;
    }
}

module.exports = {
    formatAmount,
    getSignConvention,
    sortTxs,
};

