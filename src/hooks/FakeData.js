const serviceList = [
    { name: "マッサージ", value: 0 },
    { name: "ホットストーンマッサージ", value: 0 },
];

const shopList = [];

for (let i = 0; i < 49; i++) {
    // let randRate = Math.random() * 5
    // let randReviewCount = Math.round(Math.random() * 50)
    shopList.push({
        id: i,
        imgUrl: "",
        name: `shop${i}`,
        address: `address${i}`,
        rate: Math.round((Math.random() * 3 + 2) * 10) / 10,
        introduce: `This is shop${i} at address${i}`,
        reviewCount: Math.round(Math.random() * 50),
    });
}

export { shopList, serviceList }