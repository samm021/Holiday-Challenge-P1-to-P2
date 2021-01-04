const toLocale = (num) => {
    num = num.toLocaleString('id', { style: 'currency', currency: 'IDR' });
    let len = num.length;
    return num.substring(0, len - 3);
}

module.exports = { toLocale };