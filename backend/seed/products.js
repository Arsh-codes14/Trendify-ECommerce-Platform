// Starter catalog used by `npm run seed` and auto-seeding on an empty database.
// Images are served by the backend from /static/products.
const products = [
  {
    "name": "Women Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 600,
    "image": [
      "/static/products/p_img1.png"
    ],
    "category": "Women",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "date": 1716634345448,
    "bestSeller": true
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1200,
    "image": [
      "/static/products/p_img2_1.png",
      "/static/products/p_img2_2.png",
      "/static/products/p_img2_3.png",
      "/static/products/p_img2_4.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "date": 1716621345448,
    "bestSeller": true
  },
  {
    "name": "Girls Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1320,
    "image": [
      "/static/products/p_img3.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "L",
      "XL"
    ],
    "date": 1716234545448,
    "bestSeller": true
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 660,
    "image": [
      "/static/products/p_img4.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "XXL"
    ],
    "date": 1716621345448,
    "bestSeller": true
  },
  {
    "name": "Women Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 780,
    "image": [
      "/static/products/p_img5.png"
    ],
    "category": "Women",
    "subCategory": "Topwear",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "date": 1716622345448,
    "bestSeller": true
  },
  {
    "name": "Girls Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 840,
    "image": [
      "/static/products/p_img6.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "L",
      "XL"
    ],
    "date": 1716623423448,
    "bestSeller": true
  },
  {
    "name": "Men Tapered Fit Flat-Front Trousers",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1140,
    "image": [
      "/static/products/p_img7.png"
    ],
    "category": "Men",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "L",
      "XL"
    ],
    "date": 1716621542448,
    "bestSeller": false
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 840,
    "image": [
      "/static/products/p_img8.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716622345448,
    "bestSeller": false
  },
  {
    "name": "Girls Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 600,
    "image": [
      "/static/products/p_img9.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "date": 1716621235448,
    "bestSeller": false
  },
  {
    "name": "Men Tapered Fit Flat-Front Trousers",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 660,
    "image": [
      "/static/products/p_img10.png"
    ],
    "category": "Men",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "L",
      "XL"
    ],
    "date": 1716622235448,
    "bestSeller": false
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 720,
    "image": [
      "/static/products/p_img11.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "date": 1716623345448,
    "bestSeller": false
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 900,
    "image": [
      "/static/products/p_img12.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716624445448,
    "bestSeller": false
  },
  {
    "name": "Women Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 780,
    "image": [
      "/static/products/p_img13.png"
    ],
    "category": "Women",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716625545448,
    "bestSeller": false
  },
  {
    "name": "Boy Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 960,
    "image": [
      "/static/products/p_img14.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716626645448,
    "bestSeller": false
  },
  {
    "name": "Men Tapered Fit Flat-Front Trousers",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 840,
    "image": [
      "/static/products/p_img15.png"
    ],
    "category": "Men",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716627745448,
    "bestSeller": false
  },
  {
    "name": "Girls Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1020,
    "image": [
      "/static/products/p_img16.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716628845448,
    "bestSeller": false
  },
  {
    "name": "Men Tapered Fit Flat-Front Trousers",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 900,
    "image": [
      "/static/products/p_img17.png"
    ],
    "category": "Men",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716629945448,
    "bestSeller": false
  },
  {
    "name": "Boy Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1080,
    "image": [
      "/static/products/p_img18.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716631045448,
    "bestSeller": false
  },
  {
    "name": "Boy Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 960,
    "image": [
      "/static/products/p_img19.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716632145448,
    "bestSeller": false
  },
  {
    "name": "Women Palazzo Pants with Waist Belt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1140,
    "image": [
      "/static/products/p_img20.png"
    ],
    "category": "Women",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716633245448,
    "bestSeller": false
  },
  {
    "name": "Women Zip-Front Relaxed Fit Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1020,
    "image": [
      "/static/products/p_img21.png"
    ],
    "category": "Women",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716634345448,
    "bestSeller": false
  },
  {
    "name": "Women Palazzo Pants with Waist Belt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1200,
    "image": [
      "/static/products/p_img22.png"
    ],
    "category": "Women",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716635445448,
    "bestSeller": false
  },
  {
    "name": "Boy Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1080,
    "image": [
      "/static/products/p_img23.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716636545448,
    "bestSeller": false
  },
  {
    "name": "Boy Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1260,
    "image": [
      "/static/products/p_img24.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716637645448,
    "bestSeller": false
  },
  {
    "name": "Girls Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1140,
    "image": [
      "/static/products/p_img25.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716638745448,
    "bestSeller": false
  },
  {
    "name": "Women Zip-Front Relaxed Fit Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1320,
    "image": [
      "/static/products/p_img26.png"
    ],
    "category": "Women",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716639845448,
    "bestSeller": false
  },
  {
    "name": "Girls Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1200,
    "image": [
      "/static/products/p_img27.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716640945448,
    "bestSeller": false
  },
  {
    "name": "Men Slim Fit Relaxed Denim Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1380,
    "image": [
      "/static/products/p_img28.png"
    ],
    "category": "Men",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716642045448,
    "bestSeller": false
  },
  {
    "name": "Women Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1260,
    "image": [
      "/static/products/p_img29.png"
    ],
    "category": "Women",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716643145448,
    "bestSeller": false
  },
  {
    "name": "Girls Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1440,
    "image": [
      "/static/products/p_img30.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716644245448,
    "bestSeller": false
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1320,
    "image": [
      "/static/products/p_img31.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716645345448,
    "bestSeller": false
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1500,
    "image": [
      "/static/products/p_img32.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716646445448,
    "bestSeller": false
  },
  {
    "name": "Girls Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1380,
    "image": [
      "/static/products/p_img33.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716647545448,
    "bestSeller": false
  },
  {
    "name": "Women Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1560,
    "image": [
      "/static/products/p_img34.png"
    ],
    "category": "Women",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716648645448,
    "bestSeller": false
  },
  {
    "name": "Women Zip-Front Relaxed Fit Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1440,
    "image": [
      "/static/products/p_img35.png"
    ],
    "category": "Women",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716649745448,
    "bestSeller": false
  },
  {
    "name": "Women Zip-Front Relaxed Fit Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1620,
    "image": [
      "/static/products/p_img36.png"
    ],
    "category": "Women",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716650845448,
    "bestSeller": false
  },
  {
    "name": "Women Round Neck Cotton Top",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1500,
    "image": [
      "/static/products/p_img37.png"
    ],
    "category": "Women",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716651945448,
    "bestSeller": false
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1680,
    "image": [
      "/static/products/p_img38.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716653045448,
    "bestSeller": false
  },
  {
    "name": "Men Printed Plain Cotton Shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1560,
    "image": [
      "/static/products/p_img39.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716654145448,
    "bestSeller": false
  },
  {
    "name": "Men Slim Fit Relaxed Denim Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1740,
    "image": [
      "/static/products/p_img40.png"
    ],
    "category": "Men",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716655245448,
    "bestSeller": false
  },
  {
    "name": "Men Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1620,
    "image": [
      "/static/products/p_img41.png"
    ],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716656345448,
    "bestSeller": false
  },
  {
    "name": "Boy Round Neck Pure Cotton T-shirt",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1800,
    "image": [
      "/static/products/p_img42.png"
    ],
    "category": "Kids",
    "subCategory": "Topwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716657445448,
    "bestSeller": false
  },
  {
    "name": "Kid Tapered Slim Fit Trouser",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1680,
    "image": [
      "/static/products/p_img43.png"
    ],
    "category": "Kids",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716658545448,
    "bestSeller": false
  },
  {
    "name": "Women Zip-Front Relaxed Fit Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1860,
    "image": [
      "/static/products/p_img44.png"
    ],
    "category": "Women",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716659645448,
    "bestSeller": false
  },
  {
    "name": "Men Slim Fit Relaxed Denim Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1740,
    "image": [
      "/static/products/p_img45.png"
    ],
    "category": "Men",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716660745448,
    "bestSeller": false
  },
  {
    "name": "Men Slim Fit Relaxed Denim Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1920,
    "image": [
      "/static/products/p_img46.png"
    ],
    "category": "Men",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716661845448,
    "bestSeller": false
  },
  {
    "name": "Kid Tapered Slim Fit Trouser",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1800,
    "image": [
      "/static/products/p_img47.png"
    ],
    "category": "Kids",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716662945448,
    "bestSeller": false
  },
  {
    "name": "Men Slim Fit Relaxed Denim Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1980,
    "image": [
      "/static/products/p_img48.png"
    ],
    "category": "Men",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716664045448,
    "bestSeller": false
  },
  {
    "name": "Kid Tapered Slim Fit Trouser",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1860,
    "image": [
      "/static/products/p_img49.png"
    ],
    "category": "Kids",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716665145448,
    "bestSeller": false
  },
  {
    "name": "Kid Tapered Slim Fit Trouser",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 2040,
    "image": [
      "/static/products/p_img50.png"
    ],
    "category": "Kids",
    "subCategory": "Bottomwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716666245448,
    "bestSeller": false
  },
  {
    "name": "Women Zip-Front Relaxed Fit Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 1920,
    "image": [
      "/static/products/p_img51.png"
    ],
    "category": "Women",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716667345448,
    "bestSeller": false
  },
  {
    "name": "Men Slim Fit Relaxed Denim Jacket",
    "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    "price": 2100,
    "image": [
      "/static/products/p_img52.png"
    ],
    "category": "Men",
    "subCategory": "Winterwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "date": 1716668445448,
    "bestSeller": false
  }
];

export default products;
