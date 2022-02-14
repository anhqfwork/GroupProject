// Current User
const currentUser = {
    id: '1',
    name: 'Anh Nguyen',
    username: 'anhnguyen',
    email: 'anh@gmail.com',
    address: '18 Hoang Quoc Viet, Cau Giay, Hanoi',
    phoneNumber: '0123457698',
    gender: 'Male',
    dob: '01/01/2001',
    avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
}

// Cart
const cart = {
    id: '1',
    userId: '1',
    cartItems: [
        {
            product: {
                title: 'First Book',
                author: 'author',
                price: 10,
                img: 'https://pub-static.fotor.com/assets/projects/pages/60d3cc50363a48d2a1825b7e90d49963_thumb.jpg',
            },
            quantity: 2,
        },
        {
            product: {
                title: 'Second Book',
                author: 'author',
                price: 5,
                img: 'https://d1wnwqwep8qkqc.cloudfront.net/uploads/stage/stage_image/37836/optimized_large_thumb_stage.jpg',
            },
            quantity: 1,
        },
    ],
    price: 25,
}

// All Products
const products = [
    {
        title: 'Book one',
        author: 'author',
        img: 'https://pub-static.fotor.com/assets/projects/pages/60d3cc50363a48d2a1825b7e90d49963_thumb.jpg',
        price: 20,
    },
    {
        title: 'Book two',
        author: 'author',
        img: 'https://d1wnwqwep8qkqc.cloudfront.net/uploads/stage/stage_image/37836/optimized_large_thumb_stage.jpg',
        price: 10,
    },
    {
        title: 'Book three',
        author: 'author',
        img: 'https://assets-3.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg',
        price: 40,
    },
    {
        title: 'Book four',
        author: 'author',
        img: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781684123247/once-upon-a-story-the-jungle-book-9781684123247_hr.jpg',
        price: 50,
    },
    {
        title: 'Book five',
        author: 'author',
        img: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg',
        price: 20,
    },
    {
        title: 'Book six',
        author: 'author',
        img: 'https://images2.penguinrandomhouse.com/cover/9780525541622',
        price: 20,
    },
]

// Newest Products
const newestProducts = [
    {
        title: 'Book one',
        img: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg',
        price: 20,
    },
    {
        title: 'Book two',
        img: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781684123247/once-upon-a-story-the-jungle-book-9781684123247_hr.jpg',
        price: 10,
    },
    {
        title: 'Book three',
        img: 'https://images2.penguinrandomhouse.com/cover/9780525541622',
        price: 40,
    },
    {
        title: 'Book four',
        img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/teal-and-orange-fantasy-book-cover-design-template-056106feb952bdfb7bfd16b4f9325c11.jpg?ts=1603170391',
        price: 50,
    },
]

// New Arrivals
const bestSellers = [
    {
        title: 'Book one',
        img: 'https://pub-static.fotor.com/assets/projects/pages/60d3cc50363a48d2a1825b7e90d49963_thumb.jpg',
        price: 20,
    },
    {
        title: 'Book two',
        img: 'https://d1wnwqwep8qkqc.cloudfront.net/uploads/stage/stage_image/37836/optimized_large_thumb_stage.jpg',
        price: 10,
    },
    {
        title: 'Book three',
        img: 'https://assets-3.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg',
        price: 40,
    },
    {
        title: 'Book four',
        img: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781684123247/once-upon-a-story-the-jungle-book-9781684123247_hr.jpg',
        price: 50,
    },
    {
        title: 'Book five',
        img: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg',
        price: 20,
    },
    {
        title: 'Book six',
        img: 'https://images2.penguinrandomhouse.com/cover/9780525541622',
        price: 20,
    },
]

// A Specific Product
const product = {
    _id: '1',
    title: 'First book',
    category: 'Manga',
    publisher: 'KimDong',
    price: 20,
    inStock: 10,
    inDelivered: 13,
    description: 'A very good book that everyone loves',
    author: 'Anh Tran',
    img: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg',
    rating: 4,
}

// Related Products with Current Product
const relatedProducts = [
    {
        title: 'Book one',
        image: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg',
        price: 20,
    },
    {
        title: 'Book two',
        image: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781684123247/once-upon-a-story-the-jungle-book-9781684123247_hr.jpg',
        price: 10,
    },
    {
        title: 'Book three',
        image: 'https://images2.penguinrandomhouse.com/cover/9780525541622',
        price: 40,
    },
    {
        title: 'Book four',
        image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/teal-and-orange-fantasy-book-cover-design-template-056106feb952bdfb7bfd16b4f9325c11.jpg?ts=1603170391',
        price: 50,
    },
    {
        title: 'Book five',
        image: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781684123247/once-upon-a-story-the-jungle-book-9781684123247_hr.jpg',
        price: 50,
    },
    {
        title: 'Book six',
        image: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg',
        price: 50,
    },
]

// Reviews of a Specific Product
const reviews = [
    {
        _id: '1',
        product_id: '1',
        user_id: '1',
        name: 'Anh Nguyen',
        avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
        rating: 4,
        comment: 'This book is good',
        img: [
            {
                id: 1,
                src: "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg"
            },
            {
                id: 2,
                src: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
            },
        ]
    },
    {
        _id: '2',
        product_id: '1',
        user_id: '2',
        name: 'Somebody',
        avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
        rating: 3,
        comment: 'This book is so-so',
        img: []
    },
]

//Images for Slideshow
const imgSlide = [
    {
        id: 1,
        image: 'https://static.vecteezy.com/system/resources/previews/000/833/391/non_2x/horizontal-poster-with-open-book-and-space-scene-vector.jpg',
    },
    {
        id: 2,
        image: 'https://cf.shopee.vn/file/4190fe5b9419409889096ab7160666c7',
    },
    {
        id: 3,
        image: 'https://previews.123rf.com/images/seamartini/seamartini2001/seamartini200100970/137930644-bookstore-sketch-poster-vintage-books-fair-and-literature-festival-vector-book-store-edition-antiqua.jpg',
    },
]

const categories = ['Manga', 'Light Novel', 'Novel', 'Detective']
const publishers = [
    {
        name:'KimDong',
        img:"https://upload.wikimedia.org/wikipedia/vi/3/3b/Logo_nxb_Kim_%C4%90%E1%BB%93ng.png"
    },
    {
        name:'IPM',
        img: "https://cdn0.fahasa.com/media/wysiwyg/NXB/Logo-IPM.jpg"
    },
    {
        name:'Tre',
        img:"https://locrpctricks.files.wordpress.com/2018/04/tumblr_static_f25n7rsd1jscgw4koogg04woc.png"
    },
    {
        name:'Amak',
        img:"https://amak.vn/wp-content/uploads/2020/04/Logo-AMAK.png"
    },
    {
        name:'NhaNam',
        img: "https://static.ybox.vn/2020/2/5/1582276635522-1561977250696-Nh%C3%A3%20Nam.jpg"
    }
]
export { currentUser, cart, products, product, newestProducts, bestSellers, reviews, categories, publishers, relatedProducts, imgSlide }
