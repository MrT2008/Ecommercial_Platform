import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faTruck, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Button from '../components/shares/Button';
import ReviewList from '../components/shoppingElements/ReviewList.jsx';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get('http://localhost:8080/seller/1/getProduct/8');
                setProduct(res.data.product);
            } catch (err) {
                console.error('Failed to fetch product:', err);
            }
        };
        fetchProduct();
    }, []);

    const shop = {
        name: 'Miumiu Shop',
        rating: 5,
        evaluation: '12.6k',
        products: 102,
        image: 'https://th.bing.com/th/id/R.3903470f5b74222bd2e2e09db1a0f2c3?rik=s%2fLEM7YUHQe2Zg&pid=ImgRaw&r=0',
    };

    const reviews = [
        {
            id: 1,
            user: 'Phương Liên',
            date: '22/11/2023',
            rating: 5,
            comment: 'These snacks are incredibly delicious! They have the perfect crunch and are packed with flavor. The seasoning is just right—not too strong, but enough to keep you coming back for more. Definitely a snack worth trying!'
        },
        {
            id: 2,
            user: 'Phương Liên',
            date: '22/11/2023',
            rating: 5,
            comment: 'These snacks are incredibly delicious! They have the perfect crunch and are packed with flavor. The seasoning is just right—not too strong, but enough to keep you coming back for more. Definitely a snack worth trying!'
        },
        {
            id: 3,
            user: 'Phương Liên',
            date: '22/11/2023',
            rating: 5,
            comment: 'These snacks are incredibly delicious! They have the perfect crunch and are packed with flavor. The seasoning is just right—not too strong, but enough to keep you coming back for more. Definitely a snack worth trying!'
        },
        {
            id: 4,
            user: 'Phương Liên',
            date: '22/11/2023',
            rating: 5,
            comment: 'These snacks are incredibly delicious! They have the perfect crunch and are packed with flavor. The seasoning is just right—not too strong, but enough to keep you coming back for more. Definitely a snack worth trying!'
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStarRegular} className="text-yellow-400" />);
            }
        }
        return stars;
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    if (!product) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <a href="/account" className="hover:text-blue-600">Account</a>
                <span className="mx-2">/</span>
                <a href="/furniture" className="hover:text-blue-600">Furniture</a>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{product.name}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="w-full md:w-1/2 bg-gray-100 p-8 rounded-lg">
                    <img
                        src={product.thumbnailURL}
                        alt={product.name}
                        className="w-full object-contain"
                    />
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

                    <div className="flex items-center gap-2 mb-1">
                        <div className="flex">
                            {renderStars(4.5)}
                        </div>
                        <span className="text-gray-500">(150 Reviews)</span>
                        <span className="text-green-500 ml-4">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                    </div>

                    <div className="text-2xl font-bold text-red-600 mb-4">${parseFloat(product.price).toFixed(2)}</div>

                    <p className="text-gray-700 mb-8">{product.description}</p>

                    <hr className="my-6" />

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center border border-gray-300 rounded">
                            <button onClick={decreaseQuantity} className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100">−</button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-12 text-center py-2"
                            />
                            <button onClick={increaseQuantity} className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100">+</button>
                        </div>
                        <Button text='Add to cart' otherClassName='mt-5' type='button' href='' />
                        <Button text='Buy Now' otherClassName='mt-5' type='button' href='' />
                    </div>

                    <div className="border border-gray-200 rounded mb-6">
                        <div className="p-4 flex items-start">
                            <FontAwesomeIcon icon={faTruck} className="text-gray-700 mt-1 mr-3" />
                            <div>
                                <h3 className="font-medium">Free Delivery</h3>
                                <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
                            </div>
                        </div>
                        <hr />
                        <div className="p-4 flex items-start">
                            <FontAwesomeIcon icon={faArrowRotateLeft} className="text-gray-700 mt-1 mr-3" />
                            <div>
                                <h3 className="font-medium">Return Delivery</h3>
                                <p className="text-sm text-gray-500">Free 30 Days Delivery Returns. <span className="text-blue-600">Details</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shop Section */}
            <div className="flex items-center justify-between border-t border-b py-6 mb-8">
                <div className="flex items-center">
                    <img src={shop.image} alt={shop.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                    <div>
                        <h3 className="font-medium text-lg">{shop.name}</h3>
                        <div className="flex text-yellow-400">
                            {Array(5).fill().map((_, i) => (
                                <FontAwesomeIcon key={i} icon={faStar} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-center">
                        <div className="font-medium text-blue-600">{shop.evaluation}</div>
                        <div className="text-sm text-gray-500">Evaluate</div>
                    </div>
                    <div className="text-center">
                        <div className="font-medium">{shop.products}</div>
                        <div className="text-sm text-gray-500">Product</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Chat Now</button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">View Shop</button>
                </div>
            </div>

            {/* Review List */}
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default ProductDetail;
