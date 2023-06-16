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


////--- get all massage facility info
/// input
/// output
type allFacilityInfo = {   
    result : [  /// array of object, các thông tin của quán dựa trên kết quả tìm kiếm
        {
            id: Number,
            name: String, 
            address: String,
            description: String,
            imgUrl: String,
            rating: Number,
            reviewCount: Number,
        }
    ],
}


////--- get search result (get)
/// input
type input1 = {
    input: String,
    serviceList : [string],
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

/////////////////////////////// not yet
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


/////////////////////////////// not yet
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



///////-- create new massage shop (post)
/// input
type input4 = {
    name: String,
    description: String,
    location: String,
    phoneNumber: String,
    emailAddess: String, 
    serviceList: [    /// mảng object
        {
            serviceName: String,
            serviceDescription: String,
            imageURL: String, 
            priceList: [
                {
                    price: Number,
                    durationTime: Number,
                }
            ]
        }   
    ],
    imageLibrary: [ String ],  /// mảng string lưu image url
    staffList: [  
        {
            name: String,
            DOB: String,
            gender: Number,
            jlpt: Number,
            certificateImage: String,
            image: String,
            hometown: String,
        }
    ]
}
/// output : cho ra message báo thành công hay thất bại j j đó


///////-- get request list (get) (admin)
/// output
type output5 = [  /// mảng object
    {
        requestID: Number,
        username: String,  /// username của user thực hiện request
        facilityID: String,
        createdDate: String,
        requestStatus: Number,
    }
]


///////-- accept shop create request (post) (admin)
/// => set isActive	thành true
type input6 = {
    requestID: Number,
}

///////-- deny shop create request (post) (admin)
/// => set isActive	thành false
type input7 = {
    requestID: Number,
}

