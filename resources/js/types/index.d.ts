import { Config } from 'ziggy-js';

export interface User {
    profile_avatar: any;
    permissions: any;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at?: string;
    address:string;
    date_of_birth:string;
    mobile:string;
    gender:string;
}


export interface Course {
    lesson_count: number;
    instructor_image: string;
    modules: any;
    id: number;
    title: string;
    author: string;
    lessons: number;
    image: string;
    rating: number;
    instructor_role: string;
    price: number;
    description: string;
    what_you_learn: string[];
    materials_included: string[];
    requirements: string[];
    tags: string[];
    audience: string;
    created_at?: string;
    updated_at?: string;
}

// interface PageProps {
//     course: Course;
// }

export interface module {
    id: number;
    module_title: string;
}







export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
