import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        setYear(currentYear);
    }, []);

    return (
        <footer className="bg-footer text-sm text-white py-7">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
                <div>
                    <img src="/assets/images/logo.webp" alt="LMS Logo" className="h-20 w-auto " />
                    <p className="mt-4 mr-8 sm:mt-7 max-w-xs">Join now to receive personalized recommendations from the full LMS catalog</p>

                        <p className="mt-6 sm:mt-8">Follow us</p>
                        <div className="flex justify-start mt-2 space-x-3 ">
                            <a href='https://web.facebook.com'>
                                <div className='bg-[#0470B0] rounded-full'>
                                    <svg width="20" height="20" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="white" />
                                        <path d="M22.2933 14.4761H19.1283V12.4003C19.1283 11.6208 19.645 11.439 20.0089 11.439C20.372 11.439 22.2424 11.439 22.2424 11.439V8.01201L19.1664 8C15.7518 8 14.9747 10.556 14.9747 12.1917V14.4761H13V18.0075H14.9747C14.9747 22.5394 14.9747 28 14.9747 28H19.1283C19.1283 28 19.1283 22.4856 19.1283 18.0075H21.9311L22.2933 14.4761Z" fill="white" />
                                    </svg>
                                </div>
                            </a>
                            <a href='https://www.youtube.com/'>
                                <div className='bg-[#0470B0]  rounded-full'>
                                    <svg width="20" height="20" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="white" />
                                        <path d="M26.5822 13.1861C26.3522 12.3256 25.6746 11.648 24.814 11.418C23.2542 11 17 11 17 11C17 11 10.7458 11 9.18598 11.418C8.32559 11.648 7.64781 12.3256 7.41785 13.1861C7 14.7458 7 18.0001 7 18.0001C7 18.0001 7 21.2544 7.41785 22.8139C7.64781 23.6744 8.32559 24.3523 9.18598 24.5822C10.7458 25 17 25 17 25C17 25 23.2542 25 24.814 24.5822C25.6746 24.3523 26.3522 23.6744 26.5822 22.8139C27 21.2544 27 18.0001 27 18.0001C27 18.0001 27 14.7458 26.5822 13.1861ZM14.9999 21.0002V15L20.196 18.0001L14.9999 21.0002Z" fill="white" />
                                    </svg>
                                </div>
                            </a>
                            <a href='https://www.x.com/'>
                                <div className='bg-[#0470B0] rounded-full'>
                                    <svg width="20" height="20" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="white" />
                                        <path d="M26 11.7316C25.3383 12.0257 24.6261 12.2241 23.8789 12.3129C24.6419 11.8562 25.2268 11.1327 25.5027 10.2697C24.7891 10.6931 23.9991 11.0004 23.1577 11.1663C22.4843 10.4487 21.5244 10 20.4622 10C18.423 10 16.7696 11.6534 16.7696 13.693C16.7696 13.982 16.8021 14.2637 16.8654 14.5344C13.7961 14.3802 11.0747 12.9103 9.25327 10.676C8.93539 11.2211 8.75343 11.8554 8.75343 12.5329C8.75343 13.8139 9.40527 14.9444 10.3962 15.6065C9.79112 15.5871 9.22148 15.4209 8.72346 15.1443C8.7231 15.1596 8.7231 15.1753 8.7231 15.191C8.7231 16.98 9.9961 18.4722 11.6856 18.812C11.3758 18.896 11.0495 18.9414 10.7126 18.9414C10.4744 18.9414 10.2431 18.9183 10.0177 18.8749C10.4879 20.3419 11.8515 21.4099 13.4673 21.4395C12.2034 22.4301 10.6114 23.0205 8.88095 23.0205C8.58316 23.0205 8.28902 23.003 8 22.9686C9.63474 24.0169 11.5757 24.6279 13.6609 24.6279C20.4538 24.6279 24.168 19.0009 24.168 14.1208C24.168 13.9608 24.1647 13.8011 24.1577 13.6425C24.879 13.123 25.5053 12.4722 26 11.7316Z" fill="white" />
                                    </svg>
                                </div>
                            </a>
                            <a href='https://www.instagram.com'>
                                <div className='bg-[#0470B0]  rounded-full'>
                                    <svg width="20" height="20" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="white" />
                                        <path d="M17.0001 13.3186C14.4598 13.3186 12.355 15.3872 12.355 17.9638C12.355 20.5404 14.4235 22.6089 17.0001 22.6089C19.5768 22.6089 21.6453 20.5041 21.6453 17.9638C21.6453 15.4234 19.5405 13.3186 17.0001 13.3186ZM17.0001 20.9396C15.3671 20.9396 14.0243 19.5968 14.0243 17.9638C14.0243 16.3307 15.3671 14.988 17.0001 14.988C18.6332 14.988 19.9759 16.3307 19.9759 17.9638C19.9759 19.5968 18.6332 20.9396 17.0001 20.9396Z" fill="white" />
                                        <path d="M21.8268 14.2621C22.4081 14.2621 22.8793 13.7909 22.8793 13.2096C22.8793 12.6284 22.4081 12.1572 21.8268 12.1572C21.2456 12.1572 20.7744 12.6284 20.7744 13.2096C20.7744 13.7909 21.2456 14.2621 21.8268 14.2621Z" fill="white" />
                                        <path d="M24.5484 10.4879C23.6048 9.50806 22.2621 9 20.7379 9H13.2621C10.1048 9 8 11.1048 8 14.2621V21.7016C8 23.2621 8.50806 24.6048 9.52419 25.5847C10.504 26.5282 11.8105 27 13.2984 27H20.7016C22.2621 27 23.5685 26.4919 24.5121 25.5847C25.4919 24.6411 26 23.2984 26 21.7379V14.2621C26 12.7379 25.4919 11.4315 24.5484 10.4879ZM24.4032 21.7379C24.4032 22.8629 24.004 23.7702 23.3508 24.3871C22.6976 25.004 21.7903 25.3306 20.7016 25.3306H13.2984C12.2097 25.3306 11.3024 25.004 10.6492 24.3871C9.99597 23.7339 9.66935 22.8266 9.66935 21.7016V14.2621C9.66935 13.1734 9.99597 12.2661 10.6492 11.6129C11.2661 10.996 12.2097 10.6694 13.2984 10.6694H20.7742C21.8629 10.6694 22.7702 10.996 23.4234 11.6492C24.0403 12.3024 24.4032 13.2097 24.4032 14.2621V21.7379Z" fill="white" />
                                    </svg>
                                </div>
                            </a>
                        </div>

                </div>
                <div>
                    <h3 className="mb-4 sm:mb-8">Company</h3>
                    <ul>
                        <li><Link href="/about" className="hover:underline">About Us</Link></li>
                        <li><Link href="/" className="hover:underline">Blog</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                        <li><Link href="/" className="hover:underline">Pricing</Link></li>
                        <li><Link href="/" className="hover:underline">Testimonials</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 sm:mb-8">Support</h3>
                    <ul>
                        <li><Link href="/" className="hover:underline">Help Center</Link></li>
                        <li><Link href={route('privacy-policy.show')} className="hover:underline">Terms of Service</Link></li>
                        <li><Link href={route('privacy-policy.show')} className="hover:underline">Legal</Link></li>
                        <li><Link href={route('privacy-policy.show')} className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="/" className="hover:underline">Status</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 sm:mb-8">Other Links</h3>
                    <ul>
                        <li><Link href="/" className="hover:underline">CA Notice at Collection</Link></li>
                        <li><Link href="/" className="hover:underline">Cookie Settings</Link></li>
                        <li><Link href="/" className="hover:underline">Accessibility</Link></li>
                    </ul>
                </div>
            </div>

            {/* The border and footer details now follow the container width */}
            <div className="container mx-auto">
                <div
                    className="border-t mt-8 sm:mt-16 pt-4 px-20 mr-4 ml-4"
                    style={{ borderTopColor: '#A4A5A4' }}>
                    <div className="container mt-4 mb-8 mx-auto text-center md:text-left flex justify-center items-center">
                        <p>© {year} LMS. All rights reserved. Developed And Maintained By Harshana</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
