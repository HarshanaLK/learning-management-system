import Footer from '@/Components/shared/Footer/Footer';
import NavBar from '@/Components/shared/NavBar/NavBar';
import { PropsWithChildren} from 'react';

export default function Authenticated({
    children,
}: PropsWithChildren<{ }>) {


    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar showLogo={false} bRoutes={undefined} />
            <main className='min-h-[90vh] container mx-auto px-4 md:px-0'>{children}</main>
            <Footer />
        </div>
    );
}
