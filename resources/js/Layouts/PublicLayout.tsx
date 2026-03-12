
import Footer from '@/Components/shared/Footer/Footer';
import Header from '@/Components/shared/NavBar/Header';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Public({ children }: PropsWithChildren) {
    return (
        <div className='w-full h-full'>
            <Header />
            <main>
                {children}
            </main>
            <div className='mb-8 m-4'>
                <Footer />
            </div>
        </div>
    );
}
