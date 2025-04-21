'use client';
import NavPath from '@/app/components/NavPath/NavPath';
import Image from 'next/image';
import styles from './ProductContent.module.css';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

type ProductContentProps = {
    Id: number;
    name: string;
    features: string;
    description: string;
    condition: string;
    price: string;
    priceUsd: string;
    images: any[];
    dictionary: any; // Додаємо пропс для словника
};

const ExpandableSection = ({
    title,
    children,
    isOpenByDefault = false,
}: {
    title: string;
    children: React.ReactNode;
    isOpenByDefault?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(isOpenByDefault);
    const getIcon = (title: string) => {
        switch (title) {
            case 'Доставка':
                return (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.6602 6.66016H14.1602V3.33984H2.5C2.04427 3.33984 1.65365 3.5026 1.32812 3.82812C1.0026 4.15365 0.839844 4.54427 0.839844 5V14.1602H2.5C2.5 14.8503 2.74414 15.4395 3.23242 15.9277C3.7207 16.416 4.3099 16.6602 5 16.6602C5.6901 16.6602 6.2793 16.416 6.76758 15.9277C7.25586 15.4395 7.5 14.8503 7.5 14.1602H12.5C12.5 14.8503 12.7441 15.4395 13.2324 15.9277C13.7207 16.416 14.3099 16.6602 15 16.6602C15.6901 16.6602 16.2793 16.416 16.7676 15.9277C17.2559 15.4395 17.5 14.8503 17.5 14.1602H19.1602V10L16.6602 6.66016ZM16.25 7.91016L17.8906 10H14.1602V7.91016H16.25ZM5 15C4.76562 15 4.56706 14.9186 4.4043 14.7559C4.24154 14.5931 4.16016 14.3945 4.16016 14.1602C4.16016 13.9388 4.24154 13.7467 4.4043 13.584C4.56706 13.4212 4.76562 13.3398 5 13.3398C5.23438 13.3398 5.43294 13.4212 5.5957 13.584C5.75846 13.7467 5.83984 13.9388 5.83984 14.1602C5.83984 14.3945 5.75846 14.5931 5.5957 14.7559C5.43294 14.9186 5.23438 15 5 15ZM6.85547 12.5C6.62109 12.2396 6.3444 12.0345 6.02539 11.8848C5.70638 11.735 5.36458 11.6602 5 11.6602C4.63542 11.6602 4.29362 11.735 3.97461 11.8848C3.6556 12.0345 3.37891 12.2396 3.14453 12.5H2.5V5H12.5V12.5H6.85547ZM15 15C14.7656 15 14.5671 14.9186 14.4043 14.7559C14.2415 14.5931 14.1602 14.3945 14.1602 14.1602C14.1602 13.9388 14.2415 13.7467 14.4043 13.584C14.5671 13.4212 14.7656 13.3398 15 13.3398C15.2344 13.3398 15.4329 13.4212 15.5957 13.584C15.7585 13.7467 15.8398 13.9388 15.8398 14.1602C15.8398 14.3945 15.7585 14.5931 15.5957 14.7559C15.4329 14.9186 15.2344 15 15 15Z"
                            fill="#3960FF"
                        />
                    </svg>
                );
            case 'Гарантія та безпека':
            case 'Гарантия и безопасность':
                return (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.6602 3.33984H3.33984C2.87109 3.33984 2.47721 3.49935 2.1582 3.81836C1.83919 4.13737 1.67969 4.53125 1.67969 5L1.66016 15C1.66016 15.4688 1.82292 15.8626 2.14844 16.1816C2.47396 16.5007 2.87109 16.6602 3.33984 16.6602H16.6602C17.1289 16.6602 17.526 16.5007 17.8516 16.1816C18.1771 15.8626 18.3398 15.4688 18.3398 15V5C18.3398 4.53125 18.1771 4.13737 17.8516 3.81836C17.526 3.49935 17.1289 3.33984 16.6602 3.33984ZM16.6602 15H3.33984V10H16.6602V15ZM16.6602 6.66016H3.33984V5H16.6602V6.66016Z"
                            fill="#3960FF"
                        />
                    </svg>
                );
            case 'Наші переваги':
            case 'Наши преимущества':
                return (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.1602 10L17.1289 7.67578L17.4219 4.60938L14.4141 3.92578L12.832 1.26953L10 2.5L7.16797 1.26953L5.58594 3.92578L2.57812 4.60938L2.87109 7.67578L0.839844 10L2.87109 12.3047L2.57812 15.3906L5.58594 16.0742L7.16797 18.7305L10 17.5L12.832 18.7109L14.4141 16.0547L17.4219 15.3711L17.1289 12.3047L19.1602 10ZM15.4102 11.7578L15.625 14.082L13.3398 14.5898L12.1484 16.6016L10 15.6836L7.85156 16.6016L6.66016 14.5898L4.375 14.082L4.58984 11.7383L3.04688 10L4.58984 8.22266L4.375 5.91797L6.66016 5.41016L7.85156 3.39844L10 4.31641L12.1484 3.37891L13.3398 5.39062L15.625 5.91797L15.4102 8.24219L16.9531 10L15.4102 11.7578ZM9.16016 12.5H10.8398V14.1602H9.16016V12.5ZM9.16016 5.82031H10.8398V10.8203H9.16016V5.82031Z"
                            fill="#3960FF"
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.expandableSection}>
            <div className={styles.sectionHeader} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.titleWrapper}>
                    {getIcon(title)}
                    <span className={styles.sectionTitle} data-title={title}>
                        {title}
                    </span>
                </div>
                <span className={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
            </div>
            {isOpen && <div className={styles.sectionContent}>{children}</div>}
        </div>
    );
};

const ProductContent = ({
    Id,
    name,
    features,
    description,
    condition,
    price,
    priceUsd,
    images,
    dictionary,
}: ProductContentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [phoneError, setPhoneError] = useState('');
    const [showCartNotification, setShowCartNotification] = useState(false);
    const [showWishlistNotification, setShowWishlistNotification] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useCartStore();

    const isInWishlist = wishlist.some((item) => item.id === `${Id}`);
    const isInCart = cart.some((item) => item.id === `${Id}`);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ name: '', phone: '' });
        setPhoneError('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'phone') {
            const phoneRegex = /^(?:\+380|380|0)\d{9}$/;
            if (value && !phoneRegex.test(value)) {
                setPhoneError(dictionary.modal.phoneError);
            } else {
                setPhoneError('');
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        handleCloseModal();
    };

    const ImageSlider = () => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const filteredImages = images;
        const imagesToShow = filteredImages.length > 0 ? filteredImages : [images[0]];

        const nextSlide = () => {
            setCurrentSlide((prev) => (prev === imagesToShow.length - 1 ? 0 : prev + 1));
        };

        const prevSlide = () => {
            setCurrentSlide((prev) => (prev === 0 ? imagesToShow.length - 1 : prev - 1));
        };

        return (
            <div className={styles.imageSlider}>
                <button className={styles.sliderButtonLeft} onClick={prevSlide}>
                    ❮
                </button>
                <div className={styles.sliderWrapper}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER}${imagesToShow[currentSlide].src}`}
                        alt={name}
                        width={300}
                        height={300}
                        className={styles.sliderImage}
                    />
                </div>
                <button className={styles.sliderButtonRight} onClick={nextSlide}>
                    ❯
                </button>
                <div className={styles.sliderDots}>
                    {imagesToShow.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const QuantityCounter = () => {
        const handleIncrement = () => setQuantity((prev) => prev + 1);
        const handleDecrement = () => quantity > 1 && setQuantity((prev) => prev - 1);

        return (
            <div className={styles.quantityCounter}>
                <button onClick={handleDecrement} className={styles.quantityButton}>
                    -
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button onClick={handleIncrement} className={styles.quantityButton}>
                    +
                </button>
            </div>
        );
    };

    const handleAddToCart = () => {
        if (isInCart) return;
        const cartItem = {
            id: `${Id}`,
            lotNumber: `${Date.now()}`,
            name,
            price,
            image: images[0].src,
            quantity,
        };
        addToCart(cartItem);
        setShowCartNotification(true);
        setTimeout(() => setShowCartNotification(false), 2000);
    };

    const handleWishlistClick = () => {
        if (isInWishlist) {
            removeFromWishlist(`${Id}`);
            setShowWishlistNotification(true);
            setTimeout(() => setShowWishlistNotification(false), 2000);
        } else {
            const wishlistItem = {
                id: `${Id}`,
                lotNumber: `${Date.now()}`,
                name,
                price,
                image: images[0].src,
            };
            addToWishlist(wishlistItem);
            setShowWishlistNotification(true);
            setTimeout(() => setShowWishlistNotification(false), 2000);
        }
    };

    const isPhoneValid = () => {
        const phoneRegex = /^(?:\+380|380|0)\d{9}$/;
        return phoneRegex.test(formData.phone);
    };

    const isFormValid = formData.name.trim().length > 0 && isPhoneValid();

    return (
        <section className={styles.sectionProduct}>
            <div className={styles.ProductContent}>
                <NavPath />
                <div className={styles.container}>
                    <div className={styles.contentLeft}>
                        <div className={styles.header}>
                            <h1>{dictionary.title.replace('{name}', name)}</h1>
                        </div>
                        <ImageSlider />
                    </div>
                    <div className={styles.contentRight}>
                        <div className={styles.productSummary}>
                            <div className={styles.rating}>
                                <span className={styles.stars}>
                                    {[...Array(5)].map((_, index) => (
                                        <i key={index} className="fa-solid fa-star"></i>
                                    ))}
                                </span>
                                <span className={styles.inStock}>{dictionary.inStock}</span>
                            </div>
                            <div className={styles.priceWrapper}>
                                <p className={styles.price}>{dictionary.price.replace('{price}', price)}</p>
                                <div className={styles.wishlist} onClick={handleWishlistClick}>
                                    {/* {showWishlistNotification && (
                                        <div className={styles.notification}>
                                            {isInWishlist
                                                ? dictionary.wishlist.notificationAdd
                                                : dictionary.wishlist.notificationRemove}
                                        </div>
                                    )} */}
                                    <svg
                                        width="22"
                                        height="19.5"
                                        viewBox="0 0 18 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={isInWishlist ? styles.wishlistIconActive : styles.wishlistIcon}
                                    >
                                        <path
                                            d="M12.75 0.363281C12.0208 0.363281 11.3275 0.519531 10.6699 0.832031C10.0124 1.14453 9.45573 1.56771 9 2.10156C8.54427 1.56771 7.98763 1.14453 7.33008 0.832031C6.67253 0.519531 5.97917 0.363281 5.25 0.363281C4.61198 0.363281 4.01302 0.480469 3.45312 0.714844C2.89323 0.949219 2.4082 1.27148 1.99805 1.68164C1.58789 2.0918 1.26562 2.57682 1.03125 3.13672C0.783854 3.69661 0.660156 4.29557 0.660156 4.93359C0.660156 5.72786 0.829427 6.48958 1.16797 7.21875C1.51953 7.96094 2.00456 8.70964 2.62305 9.46484C3.24154 10.2201 3.98698 11.0143 4.85938 11.8477C5.74479 12.681 6.72135 13.5859 7.78906 14.5625L9 15.6367L10.2109 14.543C11.2786 13.5664 12.2552 12.668 13.1406 11.8477C14.013 11.0143 14.7585 10.2168 15.377 9.45508C15.9954 8.69336 16.4805 7.94792 16.832 7.21875C17.1706 6.48958 17.3398 5.72786 17.3398 4.93359C17.3398 4.29557 17.2161 3.69661 16.9688 3.13672C16.7344 2.57682 16.4121 2.0918 16.002 1.68164C15.5918 1.27148 15.1068 0.949219 14.5469 0.714844C13.987 0.480469 13.388 0.363281 12.75 0.363281ZM9.07812 13.3125L9 13.3906L8.92188 13.3125C7.93229 12.4141 7.02734 11.5872 6.20703 10.832C5.39974 10.0638 4.70964 9.3444 4.13672 8.67383C3.5638 8.00326 3.12109 7.36198 2.80859 6.75C2.49609 6.13802 2.33984 5.53255 2.33984 4.93359C2.33984 4.10026 2.61654 3.4069 3.16992 2.85352C3.72331 2.30013 4.41667 2.02344 5.25 2.02344C5.88802 2.02344 6.48698 2.20898 7.04688 2.58008C7.60677 2.95117 7.9974 3.42318 8.21875 3.99609H9.78125C10.0026 3.42318 10.3932 2.95117 10.9531 2.58008C11.513 2.20898 12.112 2.02344 12.75 2.02344C13.5833 2.02344 14.2767 2.30013 14.8301 2.85352C15.3835 3.4069 15.6602 4.10026 15.6602 4.93359C15.6602 5.53255 15.5039 6.13802 15.1914 6.75C14.8789 7.36198 14.4362 8.00326 13.8633 8.67383C13.2904 9.3444 12.6003 10.0638 11.793 10.832C10.9727 11.5872 10.0677 12.4141 9.07812 13.3125Z"
                                            className={isInWishlist ? styles.heartActive : styles.heart}
                                        />
                                    </svg>
                                    <span>
                                        {isInWishlist ? dictionary.wishlist.remove : dictionary.wishlist.add}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <QuantityCounter />
                                <div className={styles.buyButtonWrapper}>
                                    {/* {showCartNotification && (
                                        <div className={styles.notification}>
                                            {dictionary.actions.cartNotification}
                                        </div>
                                    )} */}
                                    <button
                                        className={styles.buyButton}
                                        onClick={handleAddToCart}
                                        disabled={isInCart}
                                    >
                                        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.0078 14H16.9922C16.9922 13.3125 16.8672 12.6641 16.6172 12.0547C16.3516 11.4453 15.9922 10.9141 15.5391 10.4609C15.0859 10.0078 14.5547 9.64844 13.9453 9.38281C13.3359 9.13281 12.6875 9.00781 12 9.00781C11.3125 9.00781 10.6641 9.13281 10.0547 9.38281C9.44531 9.64844 8.91406 10.0078 8.46094 10.4609C8.00781 10.9141 7.64844 11.4453 7.38281 12.0547C7.13281 12.6641 7.00781 13.3125 7.00781 14H4.99219C4.44531 14 3.97656 14.1953 3.58594 14.5859C3.19531 14.9766 3 15.4453 3 15.9922V27.9922C3 28.5547 3.19531 29.0312 3.58594 29.4219C3.97656 29.8125 4.44531 30.0078 4.99219 30.0078H19.0078C19.5547 30.0078 20.0234 29.8125 20.4141 29.4219C20.8047 29.0312 21 28.5547 21 27.9922V15.9922C21 15.4453 20.8047 14.9766 20.4141 14.5859C20.0234 14.1953 19.5547 14 19.0078 14ZM12 11C12.8281 11 13.5352 11.293 14.1211 11.8789C14.707 12.4648 15 13.1719 15 14H9C9 13.1719 9.29297 12.4648 9.87891 11.8789C10.4648 11.293 11.1719 11 12 11ZM12 21.0078C11.3125 21.0078 10.6641 20.875 10.0547 20.6094C9.44531 20.3438 8.91406 19.9844 8.46094 19.5312C8.00781 19.0781 7.64844 18.5469 7.38281 17.9375C7.13281 17.3281 7.00781 16.6797 7.00781 15.9922H9C9 16.8203 9.29297 17.5273 9.87891 18.1133C10.4648 18.6992 11.1719 18.9922 12 18.9922C12.8281 18.9922 13.5352 18.6992 14.1211 18.1133C14.707 17.5273 15 16.8203 15 15.9922H16.9922C16.9922 16.6797 16.8672 17.3281 16.6172 17.9375C16.3516 18.5469 15.9922 19.0781 15.5391 19.5312C15.0859 19.9844 14.5547 20.3438 13.9453 20.6094C13.3359 20.875 12.6875 21.0078 12 21.0078Z"
                                                fill="white"
                                            />
                                        </svg>
                                        {isInCart ? dictionary.actions.inCart : dictionary.actions.buy}
                                    </button>
                                </div>
                                <button className={styles.oneClickButton} onClick={handleOpenModal}>
                                    {dictionary.actions.oneClick}
                                </button>
                            </div>
                        </div>
                        <div className={styles.infoSections}>
                            <ExpandableSection title={dictionary.infoSections.delivery.title}>
                                <ul className={styles.deliveryList}>
                                    {dictionary.infoSections.delivery.items.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </ExpandableSection>
                            <ExpandableSection title={dictionary.infoSections.warrantyAndSafety.title}>
                                <p>{dictionary.infoSections.warrantyAndSafety.guarantee}</p>
                                <ul className={styles.deliveryList}>
                                    {dictionary.infoSections.warrantyAndSafety.items.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </ExpandableSection>
                            <ExpandableSection title={dictionary.infoSections.advantages.title} isOpenByDefault={false}>
                                <ul className={styles.deliveryList}>
                                    {dictionary.infoSections.advantages.items.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </ExpandableSection>
                        </div>
                    </div>
                </div>
                <div className={styles.features}>
                    <h2>{dictionary.features.title}</h2>
                    <div className={styles.featuresContent} dangerouslySetInnerHTML={{ __html: features }} />
                </div>

                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <h2>{dictionary.modal.title}</h2>
                                <button className={styles.closeButton} onClick={handleCloseModal}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L15 15M15 1L1 15" stroke="#000" strokeWidth="2" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.modalProductWrapper}>
                                <div className={styles.modalProductImg}>
                                    <img src={`${process.env.NEXT_PUBLIC_SERVER}${images[0].src}`} alt="" />
                                </div>
                                <p className={styles.modalProductName}>
                                    {name} <span className={styles.modalProductType}></span>
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">
                                        {dictionary.modal.nameLabel}{' '}
                                        <span className={styles.required}>{dictionary.modal.required}</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">
                                        {dictionary.modal.phoneLabel}{' '}
                                        <span className={styles.required}>{dictionary.modal.required}</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        pattern="^(?:\+380|380|0)\d{9}$"
                                        title={dictionary.modal.phoneError}
                                    />
                                    {phoneError && <span className={styles.errorMessage}>{phoneError}</span>}
                                </div>
                                <button type="submit" className={styles.modalBuyButton} disabled={!isFormValid}>
                                    {dictionary.modal.submitButton}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductContent;