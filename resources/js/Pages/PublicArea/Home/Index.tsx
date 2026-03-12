import HeroSection from './Partials/HeroSection';
import JoinPlatform from './Partials/JoinPlatform';
import FeedbackSection from './Partials/FeedbackSection';
import { Head } from '@inertiajs/react';
import Public from '@/Layouts/PublicLayout';
import BackgroundIcon from '@/Components/shared/BackgroundIcon/BackgroundIcon';
import PopularCourses from './Partials/PopularCourses';

const Home = ({
    courses,
    lessonCount, // Default to an empty array
}: {
    courses: any;
    lessonCount: any;
}) => {


    console.log(courses);

    return (
        <Public>
            <Head title="Home" />
            <HeroSection />
            <div className='-ml-16 mt-2 '>
                <BackgroundIcon fillColor="#BBE7C0" />
            </div>
            <div className='hidden md:block '>
                <div className="-mt-7 ml-80 flex  justify-end ">
                    <BackgroundIcon />
                </div>
            </div>

            <PopularCourses courses={courses} lessonCount={lessonCount} />

            <div className="flex float-end -mt-[30rem] mr-40">
                <BackgroundIcon fillColor="#BBE7C0" />
            </div>

            <div className="-ml-20 -mt-4">
                <BackgroundIcon fillColor=" #AAE0FE" />
            </div>
            <div className="-mt-11 ml-72 flex justify-end">
                <BackgroundIcon />
            </div>

            <JoinPlatform />
            <div className="float-right mr-12">
                <BackgroundIcon fillColor="#BBE7C0" />
            </div>
            <div className="mt-12 mr-[38rem] flex">
                <BackgroundIcon />
            </div>
            <div className='-mt-16'>
                <FeedbackSection />
            </div>
            <div className="flex justify-end mr-96 -mt-5 mb-5">
                <div>
                    <BackgroundIcon fillColor="#AAE0FE" />
                </div>
            </div>
        </Public>
    );
};

export default Home;



