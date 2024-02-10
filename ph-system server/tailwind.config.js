/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/*.ejs", "./node_modules/flowbite/**/*.js"
    ],
  
  
    darkMode: 'class',
  
    theme: {
      extend: {
        colors: {
          "color-primery-dark": "#232122",
          primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" },
          current1: 'currentColor',
          transparent1: 'transparent',
          white1: '#FFFFFF',
          black1: '#1C2434',
          'black-2': '#010101',
          body1: '#64748B',
          bodydark1: '#AEB7C0',
          bodydark1: '#DEE4EE',
          bodydark2: '#8A99AF',
          primary1: '#3C50E0',
          secondary1: '#80CAEE',
          stroke1: '#E2E8F0',
          // gray: '#EFF4FB',
          graydark1: '#333A48',
          'gray-2': '#F7F9FC',
          'gray-3': '#FAFAFA',
          whiten1: '#F1F5F9',
          whiter1: '#F5F7FD',
          boxdark1: '#24303F',
          'boxdark-2': '#1A222C',
          strokedark1: '#2E3A47',
          'form-strokedark': '#3d4d60',
          'form-input': '#1d2a39',
          'meta-1': '#DC3545',
          'meta-2': '#EFF2F7',
          'meta-3': '#10B981',
          'meta-4': '#313D4A',
          'meta-5': '#259AE6',
          'meta-6': '#FFBA00',
          'meta-7': '#FF6766',
          'meta-8': '#F0950C',
          'meta-9': '#E5E7EB',
          success1: '#219653',
          danger1: '#D34053',
          warning1: '#FFA70B',
        },
        fontFamily: {
          'body': [
            'Inter',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'system-ui',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'Noto Sans',
            'sans-serif',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
            'Noto Color Emoji'
          ],
          'sans': [
            'Inter',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'system-ui',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'Noto Sans',
            'sans-serif',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
            'Noto Color Emoji'
          ]
        }
        , scale: {
  
        },
        spacing: {
          'simihalf': '49%',
        },
      },
    },
    plugins: [
      require('flowbite/plugin'),
      require('@tailwindcss/aspect-ratio'),
    ]
  }
  
  