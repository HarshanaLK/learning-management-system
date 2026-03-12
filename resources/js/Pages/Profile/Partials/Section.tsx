import { ReactNode } from 'react';

interface SectionProps {
    title: string;
    children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-5 mt-1">{title}</h2>
            {children}
        </div>
    );
}
