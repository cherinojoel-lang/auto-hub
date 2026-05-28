/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0' }],
                sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
                base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
                lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
                xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0', fontWeight: 'bold' }],
                '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0', fontWeight: 'bold' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0', fontWeight: 'bold' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0', fontWeight: 'bold' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '0', fontWeight: 'bold' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '0', fontWeight: 'bold' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0', fontWeight: 'bold' }],
                '8xl': ['5.25rem', { lineHeight: '1', letterSpacing: '0', fontWeight: 'bold' }],
                '9xl': ['6rem', { lineHeight: '1', letterSpacing: '0', fontWeight: 'bold' }],
            },
            fontFamily: {
                heading: ['Aptos Display', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
                paragraph: ['Aptos', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            colors: {
                primary: '#0A1628',
                secondary: '#CC4A00',
                accent: '#213A5C',
                background: '#F5F5F5',
                foreground: '#1A1A1A',
                link: '#0A1628',
                success: '#27AE60',
                warning: '#F39C12',
                'neutral-100': '#F8F9FA',
                'neutral-900': '#1A1A1A',
                'card-bg': '#FFFFFF',
                'alt-bg': '#F5F5F5',
                'warm-bg': '#F5F5F5',
                'text-secondary': '#4B5563',
                'border-line': '#D8DEE8',
                'cta-hover': '#A83C00',
                'reserved': '#F39C12',
            },
            zIndex: {
                '1000': '1000',
            },
            keyframes: {
                'wa-pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.15)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'wa-pulse': 'wa-pulse 2s ease-in-out 2',
                'fade-in': 'fade-in 0.3s ease-out',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
