const firstBalance = (balance) => {
    if (balance < 500000) {
        return -Infinity;
    } else {
        return balance;
    }
}

module.exports = { firstBalance };