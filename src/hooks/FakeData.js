/////////// Fake data for using, import into file to use
/////////   Modify is avaiable

const userList = [];
for(let i = 0; i < 10; i++) {
    userList.push({
        id: i,
        name: 'User' + i,
        avatarUrl: 'avatar' + i,
    })
}

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

const commentList = []
for(let i = 0; i < 10; i++) {
    commentList.push({
        name: 'User' + i,
        avatarUrl: 'avatar' + i,
        rate: Math.round((Math.random() * 3 + 2)),
        comment: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    })
}
// for()

const shopServiceList = [
    {   name: "マッサージ", 
        price: '100000 VND', 
        times: '15分', 
        description: 'moo taraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
        customersCount: '１人', 
        note : 'aaa' },
    {   name: "ホットストーンマッサージ", 
        price: '100000 VND', 
        times: '20分', 
        description: 'moo tar', 
        customersCount: '１人', 
        note : 'bbb' },
    {   name: "Massage Full Body", 
        price: '100000 VND', 
        times: '30分', 
        description: 'moo tar', 
        customersCount: '１人', 
        note : 'cccc' },
]


export { 
    shopList, 
    serviceList, 
    shopServiceList, 
    commentList,
    userList 
}