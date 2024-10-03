export const testUser = {
  success: true,
  user: {
    email: 'kerzolys@yandex.ru',
    name: 'gleb'
  },
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmE4ZjU3MTE5ZDQ1MDAxYjUwYTdkMSIsImlhdCI6MTcyNzY5NjcyNywiZXhwIjoxNzI3Njk3OTI3fQ.d4px2EAryBAjE3ljvbz6AOAwDXrldZ_CWUWIm6xA8ew',
  refreshToken:
    'a29bee7a9aa925bfc22da2f69e28c9b449a90aeef5aa8bca3a13ab32f3c43fc3153cd5dd900cb45a'
};

export const testIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

export const testConstructorIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0942',
    id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  }
];

export const testBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const testFeed = {
  orders: [
    {
      _id: '66fa426e119d45001b50a6d4',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0940'],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-09-30T06:17:18.765Z',
      updatedAt: '2024-09-30T06:17:19.596Z',
      number: 54644
    },
    {
      _id: '66fa4255119d45001b50a6d3',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093f'],
      status: 'done',
      name: 'Краторный бессмертный бургер',
      createdAt: '2024-09-30T06:16:53.122Z',
      updatedAt: '2024-09-30T06:16:53.980Z',
      number: 54643
    }
  ],
  total: 54318,
  totalToday: 118
};

export const testUserOrders = [
  {
    _id: '66fa426e119d45001b50a6d4',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0940'
    ],
    status: 'done',
    name: 'Флюоресцентный метеоритный бургер',
    createdAt: '2024-09-30T06:17:18.765Z',
    updatedAt: '2024-09-30T06:17:19.596Z',
    number: 54644
  }
];

export const testUserOrder = {
  name: 'Краторный люминесцентный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ],
    _id: '66fa3580119d45001b50a6bc',
    owner: {
      name: 'Gleb Khokhlov',
      email: 'kerzolys@gmail.com',
      createdAt: '2024-09-18T14:53:58.967Z',
      updatedAt: '2024-09-22T11:03:25.417Z'
    },
    status: 'done',
    name: 'Краторный люминесцентный бургер',
    createdAt: '2024-09-30T05:22:08.981Z',
    updatedAt: '2024-09-30T05:22:09.857Z',
    number: 54637,
    price: 2243
  }
};