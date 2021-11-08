// Current User
const currentUser = {
    id: '1',
    name: 'Anh Nguyen',
    username: 'anhnguyen',
    email: 'anh@gmail.com',
    address: 'Hanoi',
    phoneNumber: '0123457698',
    avatar: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
}

// Cart
const cart = {
    id: '1',
    userId: '1',
    cartItems: [
        {
            product: {
                title: 'First Book',
                price: 10,
                img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
            },
            quantity: 2,
        },
        {
            product: {
                title: 'Second Book',
                price: 5,
                img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
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
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 20,
    },
    {
        title: 'Book two',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 10,
    },
    {
        title: 'Book three',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 40,
    },
    {
        title: 'Book four',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 50,
    },
    {
        title: 'Book five',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 20,
    },
    {
        title: 'Book six',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 20,
    },
]

// Newest Products
const newestProducts = [
    {
        title: 'Book one',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 20,
    },
    {
        title: 'Book two',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 10,
    },
    {
        title: 'Book three',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 40,
    },
    {
        title: 'Book four',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 50,
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
    description: 'A very good book that everyone loves',
    author: 'Anh Tran',
    img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    rating: 4,
}

// Related Products with Current Product
const relatedProducts = [
    {
        title: 'Book one',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 20,
    },
    {
        title: 'Book two',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 10,
    },
    {
        title: 'Book three',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 40,
    },
    {
        title: 'Book four',
        img: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        price: 50,
    },
]

// Reviews of a Specific Product
const reviews = [
    {
        _id: '1',
        product_id: '1',
        user_id: '1',
        rating: 4,
        comment: 'This book is good',
    },
    {
        _id: '2',
        product_id: '1',
        user_id: '1',
        rating: 3,
        comment: 'This book is so-so',
    },
]

const categories = ['Manga', 'Light Novel', 'Novel', 'Detective']
const publishers = ['KimDong', 'IPM', 'Tre', 'Amak', 'NhaNam']

export { currentUser, cart, products, product, newestProducts, reviews, categories, publishers, relatedProducts }
