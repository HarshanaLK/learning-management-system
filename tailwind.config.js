import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#2BAFFC',
                footer: '#034A74',
                card: '#E5EBFB',
                join: '#0470B0',
                customYellow: '#FAB437',
                customPurple: '#9747FF',
                customGreen: '#55C360',
                bgBlue: '#D7F0FE66',
                backBlue:'#AAE0FE',
                backGreen:'#BBE7C0',
                btnHov:'#005AD2',

            },
            boxShadow: {
                'iconBox': ' 0px 4px 4px 0px #00000040',
                'feedbackBox': '0px 4px 35px 0px #7966EA14',
            },
            screens: {
                'xsm': '375px',
                'xlg':'1290px',
                'xlm':'1440px',
                'xlm-':'1370px',
                '+xsm':'425px',
            },
            zIndex: {
                '60': '60',
                '70': '70', 
            },
        },


    },
    plugins: [
        forms,
    ],
};






