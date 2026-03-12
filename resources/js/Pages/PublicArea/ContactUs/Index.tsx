import { Head, } from '@inertiajs/react';
import Public from '@/Layouts/PublicLayout';
import ContactForm from './Partials/ContactForm';
import BackgroundIcon from '@/Components/shared/BackgroundIcon/BackgroundIcon';



const Contact = () => {

    return (
        <Public>
            <Head title="Contact Us" />
            {/* Hero Section */}
            <section className="relative mt-30">
                <div
                    className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center"
                    style={{ backgroundImage: 'url(assets/images/contact/contact.webp)' }}
                >
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <h1 className="text-white text-3xl mt-20  sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            CONTACT US
                        </h1>
                    </div>
                </div>

                <div
                    className="absolute inset-0"
                    style={{
                        background: '#00000080'
                    }}
                ></div>

            </section>

            <section className='mt-24'>
                <div className="flex flex-wrap justify-center lg:space-x-24 space-x-0  mt-10 max-w-7xl mx-auto">

                    {/* Contact Us Card */}
                    <div className='lg:p-0 px-10 py-3 '>
                        <a
                            href="tel:+1 (469) 298-9803"
                        >
                            <div className="border-2 border-[#7B61FF] rounded-xl p-6 flex flex-col items-center w-60 h-36 group hover:bg-[#7B61FF] mb-6 sm:mb-0">
                                <svg
                                    width="50" height="50"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-[#7B61FF] group-hover:fill-white" d="M44.044 36.5241C42.4932 34.9616 38.7374 32.6813 36.9151 31.7624C34.5421 30.567 34.3467 30.4694 32.4815 31.8551C31.2374 32.7799 30.4102 33.6061 28.9542 33.2956C27.4981 32.985 24.334 31.234 21.5635 28.4723C18.793 25.7106 16.9405 22.4547 16.629 21.0036C16.3175 19.5524 17.1573 18.735 18.0733 17.4879C19.3643 15.7301 19.2667 15.4372 18.1632 13.0641C17.3028 11.2184 14.9561 7.4977 13.3878 5.95473C11.71 4.2975 11.71 4.59047 10.629 5.03969C9.74887 5.40999 8.90452 5.86011 8.10652 6.38442C6.54402 7.4225 5.67683 8.28481 5.07038 9.58071C4.46394 10.8766 4.19148 13.9147 7.32331 19.6041C10.4551 25.2936 12.6524 28.2028 17.2003 32.7379C21.7481 37.2731 25.2452 39.7116 30.3575 42.5788C36.6817 46.1208 39.1075 45.4303 40.4073 44.8249C41.7071 44.2194 42.5733 43.36 43.6133 41.7975C44.139 41.0008 44.5901 40.1574 44.961 39.278C45.4112 38.2008 45.7042 38.2008 44.044 36.5241Z" />
                                </svg>
                                <h3 className="text-[#7B61FF] text-xl font-medium group-hover:text-white group-hover:mr-4">Contact Us</h3>
                                <p className="text-[#999999] group-hover:text-white group-hover:mr-4 ">+94 711234567</p>
                            </div>
                        </a>
                    </div>

                    {/* Email Us Card */}
                    <div className='lg:p-0 px-10 py-3'>
                        <a
                            href="mailto:admin@lms.com"
                        >
                            <div className="border-2 border-[#FAB437] rounded-xl p-6 flex flex-col items-center w-60 h-36 group hover:bg-[#FAB437] mb-6 sm:mb-0">
                                <svg
                                    width="50" height="50"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-[#FAB437] group-hover:fill-white" d="M41.4063 9.37555H8.59375C6.43639 9.37555 4.6875 11.1244 4.6875 13.2818V36.7193C4.6875 38.8767 6.43639 40.6256 8.59375 40.6256H41.4063C43.5636 40.6256 45.3125 38.8767 45.3125 36.7193V13.2818C45.3125 11.1244 43.5636 9.37555 41.4063 9.37555Z" />
                                    <path className="group-hover:stroke-[#FAB437]" d="M10.939 15.6259L25.0015 26.5634L39.064 15.6259" stroke="white" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h3 className="text-[#FAB437] text-xl font-medium group-hover:text-white">Email Us</h3>
                                <p className="text-[#999999] group-hover:text-white">admin@lms.com</p>
                            </div>
                        </a>
                    </div>

                    {/* Location Card */}
                    <div className='lg:p-0 px-10 py-3'>
                        <a
                            href="https://maps.app.goo.gl/YK2h1SDZwKugXVyf9"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="border-2 border-[#55C360] rounded-xl py-6 px-2 flex flex-col items-center w-60 h-36 group hover:bg-[#55C360] mb-6 sm:mb-0">
                                <svg
                                   className="sm:w-9 sm:h-9 w-8 h-8  flex-shrink-0"
                                    width="41" height="51"
                                    viewBox="0 0 41 51"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path className="fill-[#55C360] group-hover:fill-white" d="M20.647 0.0186768C9.58983 0.0186768 0.646973 7.84368 0.646973 17.5187C0.646973 30.6437 20.647 50.0187 20.647 50.0187C20.647 50.0187 40.647 30.6437 40.647 17.5187C40.647 7.84368 31.7041 0.0186768 20.647 0.0186768ZM20.647 23.7687C18.7526 23.7687 16.9358 23.1102 15.5962 21.9381C14.2567 20.766 13.5041 19.1763 13.5041 17.5187C13.5041 15.8611 14.2567 14.2714 15.5962 13.0993C16.9358 11.9272 18.7526 11.2687 20.647 11.2687C22.5414 11.2687 24.3582 11.9272 25.6977 13.0993C27.0373 14.2714 27.7898 15.8611 27.7898 17.5187C27.7898 19.1763 27.0373 20.766 25.6977 21.9381C24.3582 23.1102 22.5414 23.7687 20.647 23.7687Z" />
                                </svg>
                                <h3 className="text-[#55C360] text-xl font-medium group-hover:text-white group-hover:ml-4">Location</h3>
                                <p className="text-[#999999] text-[15px] group-hover:text-white text-center ">Sabaragamuwa University of Sri Lanka, Belihuloya 70140</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section className='mt-28 sm:mb-36 mb-5'>
                <ContactForm />
            </section>

        </Public>
    );
};

export default Contact;





