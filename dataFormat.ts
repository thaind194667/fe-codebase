type searchBarInfo = {
    minPrice: Number,    /// giá tiền của service rẻ nhất 
    maxPrice: Number,    /// giá tiền của service đắt nhất
    serviceList : [      /// danh sách tất cả các loại service (trùng thì gộp)
        {name: String, }
    ]
}

type searchResult = {
    result : [
        {
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