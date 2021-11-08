const currentEmployee = {
    _id: '1',
    username: 'anhnguyen',
    name: 'Anh',
    email: 'anh@gmail.com',
    phoneNumber: '01284372937',
    isAdmin: true,
    avatar: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
}

const allEmployees = [
    {
        _id: '1',
        username: 'anhnguyen',
        name: 'Anh',
        email: 'anh@gmail.com',
        phoneNumber: '01284372937',
        isAdmin: true,
        avatar: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    {
        _id: '2',
        username: 'baotran',
        name: 'Bao',
        email: 'bao@gmail.com',
        phoneNumber: '09832745834',
        isAdmin: false,
        avatar: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    {
        _id: '3',
        username: 'chinhvu',
        name: 'Chinh',
        email: 'chinh@gmail.com',
        phoneNumber: '09236842836',
        isAdmin: false,
        avatar: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
]

const anEmployee = {
    _id: '2',
    username: 'baotran',
    name: 'Bao',
    email: 'bao@gmail.com',
    phoneNumber: '09832745834',
    isAdmin: false,
    avatar: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
}

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

const orders = [
    {
        _id: '1',
        userId: '1',
        status: 'Pending',
        price: 25,
    },
    {
        _id: '1',
        userId: '1',
        status: 'Complete',
        price: 20,
    },
]

const order = {
    _id: '1',
    userId: '1',
    status: 'Pending',
    price: 25,
    orderItems: [
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
}




