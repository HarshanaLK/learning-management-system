
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import Public from './PublicLayout';

export default function StudentCourseLayout({ children }: PropsWithChildren) {

    const { url } = usePage();
    const [activeLink, setActiveLink] = useState('');

    const links = [
        { name: 'Home', href: '' },
        { name: 'Modules', href: '/users/modules/' },
        { name: 'Grades', href: '#' },
        { name: 'Notes', href: '#' },
        { name: 'Resources', href: '#' },
    ];

    useEffect(() => {
        const currentLink = links.find(link => url.includes(link.href));
        if (currentLink) {
            setActiveLink(currentLink.name);
        }
    }, [url]);

    return (
        <Public>
                <aside className="w-1/4 px-4 pl-10">
                    <nav className="text-2xl font-medium">
                        <div className="flex flex-col space-y-6 text-[#737373] border-l-4 border-[#A4A5A4]">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`-ml-1 pl-4 hover:text-[#2BAFFC] hover:border-[#2BAFFC] ${activeLink === link.name
                                        ? 'border-l-4 text-[#2BAFFC] border-[#2BAFFC]'
                                        : 'border-l-4 border-transparent'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </aside>
                <main>
                    {children}
                </main>
        </Public>

    );
}
