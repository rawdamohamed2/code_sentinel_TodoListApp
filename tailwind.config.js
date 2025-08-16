// export default {
//   content: ["./src/**/*.{js,jsx,ts,tsx,html}"], 
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      keyframes: {
        move: {
          '0%, 100%': { transform: 'translateY(0px) ' },
          '50%': { transform: 'translateY(4px)' },
        },
        bright: {
          '0%': {
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
          },
          '100%': {
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.4)',
          }
        },
        antibright: {
          '0%': {
            textShadow: '0 4px 15px rgba(255, 255, 255, 0.4)',
          },
          '50%': {
            textShadow: '0 2px 2px rgba(255, 255, 255, 0.4)',
          },
          '100%': {
            textShadow: '0 4px 15px rgba(255, 255, 255, 0.4)',
          },
        },
      },
      animation: {
        move: 'move 2s  infinite',
        bright:'bright 3s infinite',
        antibright:'antibright 3s infinite',
      },
      colors: {
        input:'#292047',
        border:'#ffffff33',
        text:'#e0e0ff',
        focus:'#ffffff99',
        containerTask:'#171036',
        task:'#251B43',
        taskcompleted:'rgba(100, 100, 100, 0.5)',
        delete:'#ff0066',
        update:'#00ffff',
        done:'#ffff00',
        hover:'#45405E',
        priority:'#452d8cff',
      },

    },
  },
  plugins: [],
}