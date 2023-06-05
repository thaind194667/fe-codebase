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
    { name: "マッサージ", check: false },
    { name: "ホットストーンマッサージ", check: false },
    { name: "ディープティッシュマッサージ", check: false, },
    { name: "タイマッサージ", check: false},
    { name: "温石マッサージ", check: false},
    { name: "温石とタイコンボ", check: false},
    { name: "温石とタイコンボ1", check: false},
];

const parlorList = [];
for (let i = 0; i < 49; i++) {
    // let randRate = Math.random() * 5
    // let randReviewCount = Math.round(Math.random() * 50)
    parlorList.push({
        id: i,
        imgUrl: "",
        name: `SF SPA HANOI${i}`,
        address: `Phuong Mai, Kim Lien, Dong Da, Ha Noi${i * 10}`,
        rate: Math.round((Math.random() * 3 + 2) * 10) / 10,
        introduce: `20 年以上の経験から、SF スパは顧客への対応方法をよく知っています。高度な訓練を受けたプロフェッショナルなチームを擁し、顧客の健康と快適さに常に気を配っています。オールド スクエアの中心部に位置する SF スパは、混雑した都市や忙しい日常生活から逃れるのに最適な場所です。`,
        reviewCount: Math.round(Math.random() * 40 + 20),
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

const parlorServiceList = [
    {   
        id: 1,
        name: "マッサージ", 
        servicePrice: [
            {
                price: 100000, 
                duration: '15分', 
            },
            {
                price: 120000, 
                duration: '30分', 
            },
            {
                price: 140000, 
                duration: '45分', 
            },
            
        ],
        description: 'moo taraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
        customersCount: '１人', 
        note : 'aaa' },
    {   
        id: 2,
        name: "ホットストーンマッサージ", 
        servicePrice: [
            {
                price: 100000, 
                duration: '15分', 
            },
            {
                price: 120000, 
                duration: '30分', 
            },
            {
                price: 140000, 
                duration: '45分', 
            },
            
        ],
        description: 'moo tar', 
        customersCount: '１人', 
        note : 'bbb' },
    {   
        id: 3,
        name: "Massage Full Body", 
        servicePrice: [
            {
                price: 100000, 
                duration: '15分', 
            },
            {
                price: 1200000, 
                duration: '30分', 
            },
            {
                price: 140000, 
                duration: '45分', 
            },
            
        ],
        description: 'moo tar', 
        customersCount: '１人', 
        note : 'cccc' },
]


export { 
    parlorList, 
    serviceList, 
    parlorServiceList, 
    commentList,
    userList 
}