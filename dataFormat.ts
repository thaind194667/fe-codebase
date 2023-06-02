//// Mô tả dạng data input, output của các api
/// tên api đặt tùy ý

///// =============================== Get ===============================
////--- get searchbar data (get)
/// input 
/// output
type searchBarInfo = {  
    minPrice: Number,       /// giá tiền của service rẻ nhất 
    maxPrice: Number,       /// giá tiền của service đắt nhất
    serviceList : [String], /// danh sách tất cả các loại service (trùng thì gộp)
}


////--- get search result (get)
/// input
type input1 = {
    input: String,
    serviceList : [
        {name: String, value: Number}
    ],
    minPrice: Number,
    maxPrice: Number,
    minRate: Number,
    maxRate: Number
}
/// output
type searchResult = {   
    result : [  /// array of object, các thông tin của quán dựa trên kết quả tìm kiếm
        {
            id: Number,
            name: String, 
            address: String,
            price: Number,
            description: String,
            imgUrl: String,
            rating: Number,
            reviewCount: Number,
        }
    ],
}


////--- get shop details (get)
/// input: shopID
/// output
type ShopDetails = {    /// thông tin của quán
    id: Number,         
    name: String, 
    phone: String,
    address: String,
    description: String,
    imgUrl: [String],   /// array of string
    servicesList : [    /// array of object
        {
            id: Number,
            name: String,
            description: String,
            price: Number,
            duration: Number,
            status: Boolean,
        },
    ],
    ratingList : [      /// array of object
        {
            ratingId: Number,
            userName : String,
            userAvatarUrl: String,
            comment: String,
            rate: Number,
        }
    ]
}


////--- create new comment (post)
/// input:
type input2 = {
    // ratingId: Number,
    shopId: Number,
    userId: Number,
    comment: String | null,
    rate: Number,
}
/// output: 
type result2 = {
    code: Number,
    msg: String,    /// chuỗi thông báo kết quả
}


////--- delete comment (delete)
/// input:
type input3 = {
    ratingId: Number,
}
/// output: 
type result3 = {
    code: Number,
    msg: String,    /// chuỗi thông báo kết quả
}