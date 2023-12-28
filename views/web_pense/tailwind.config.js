const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter']
      }
    },
    screens: {
      sm: "576px",
      "sm-max": { max: "576px" },
      md: "768px",
      "md-max": { max: "768px" },
      lg: "992px",
      "lg-max": { max: "992px" },
      xl: "1200px",
      "xl-max": { max: "1200px" },
      "2xl": "1320px",
      "2xl-max": { max: "1320px" },
    },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
      0: "0 0 auto",
    },
    flexBasis: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
    }),
    transformOrigin: {
      center: "center",
      top: "top",
      "top-right": "top right",
      right: "right",
      "bottom-right": "bottom right",
      bottom: "bottom",
      "bottom-left": "bottom left",
      left: "left",
      "top-left": "top left",
      "10-10": "10% 10%",
      "10-90": "10% 90%",
    },
    spacing: {
      unset: "unset",
      px: "1px",
      0: "0px",
      0.4: "0.1rem",
      0.5: "0.125rem",
      0.6: "0.15rem",
      0.75: "0.2rem",
      1: "0.25rem",
      1.2: "0.3rem",
      1.25: "0.3125rem",
      1.4: "0.35rem",
      1.5: "0.375rem",
      1.6: "0.4rem",
      1.75: "0.4375rem",
      1.8: "0.45rem",
      2: "0.5rem",
      2.2: "0.55rem",
      2.5: "0.625rem",
      2.6: "0.65rem",
      2.7: "0.675rem",
      2.8: "0.7rem",
      3: "0.75rem",
      3.4: "0.85rem",
      3.5: "0.875rem",
      3.6: "0.9rem",
      4: "1rem",
      4.5: "1.125rem",
      4.8: "1.2rem",
      5: "1.25rem",
      5.3: "1.3rem",
      5.4: "1.35rem",
      5.5: "1.375rem",
      5.6: "1.4rem",
      6: "1.5rem",
      6.5: "1.625rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      13: "3.25rem",
      14: "3.5rem",
      16: "4rem",
      19: "4.75rem",
      20: "5rem",
      24: "6rem",
      25: "6.25rem",
      28: "7rem",
      30: "7.5rem",
      32: "8rem",
      34: "8.5rem",
      36: "9rem",
      40: "10rem",
      42: "10.5rem",
      44: "11rem",
      46: "11.5rem",
      48: "12rem",
      50: "12.5rem",
      52: "13rem",
      54: "13.5rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      68: "17rem",
      72: "18rem",
      75: "18.75rem",
      80: "20rem",
      85: "22rem",
      90: "22.5rem",
      92: "23rem",
      96: "24rem",
      100: "25rem",
      116: "29rem",
      120: "30rem",
      125: "31.25rem",
      135: "33.75rem",
      160: "40rem",
      180: "45rem",
      240: "60rem",
      285: "71.25rem",
      330: "82.5rem",
      "70/100": "70%",
      "31/100": "31%",
      "15/100": "15%",
      "1/100": "1%",
      "1/10": "10%",
      "1/2": "50%",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
    },
    transitionDelay: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms",
    },
    transitionDuration: {
      DEFAULT: "150ms",
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      250: "250ms",
      300: "300ms",
      350: "350ms",
      500: "500ms",
      600: "600ms",
      700: "700ms",
      1000: "1000ms",
    },
    transitionProperty: {
      none: "none",
      all: "all",
      DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
      color: "color",
      height: "height",
      "max-height": "max-height",
      opacity: "opacity",
      shadow: "box-shadow",
      background: "background-color",
      "border-color": "border-color",
      transform: "transform",
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      bounce: "cubic-bezier(0.34, 1.61, 0.7, 1.3)",
      linear: "linear",
      in: "cubic-bezier(0.42, 0, 1, 1)",
      "in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
      out: "cubic-bezier(0, 0, 0.58, 1)",
    },
    translate: ({ theme }) => ({
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%",
    }),
    flexGrow: {
      0: "0",
      DEFAULT: "1",
    },
    flexShrink: {
      0: "0",
      DEFAULT: "1",
    },
    container: {
      center: true,
      padding: "1.5rem",
      "max-width": {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1320px",
      },
    },
    willChange: {
      auto: "auto",
      scroll: "scroll-position",
      contents: "contents",
      transform: "transform",
    },
    zIndex: {
      auto: "auto",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
      100: "100",
      110: "110",
      990: "990",
      sticky: "1020",
    },
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities }) {
      addUtilities({
        ".transform3d": {
          transform: "perspective(999px) rotateX(0deg) translateZ(0)",
        },
        ".transform3d-hover": {
          transform: "perspective(999px) rotateX(7deg) translate3d(0,-4px,5px)",
        },
        ".transform-dropdown": {
          transform: "perspective(999px) rotateX(-10deg) translateZ(0) translate3d(0,37px,0)",
        },
        ".transform-dropdown-show": {
          transform: "perspective(999px) rotateX(0deg) translateZ(0) translate3d(0,37px,5px)",
        },
        ".flex-wrap-inherit": {
          "flex-wrap": "inherit",
        },
      });
      const typography = {
        a: {
          "letter-spacing": "-0.025rem",
        },

        hr: {
          margin: "1rem 0",
          border: "0",
          opacity: ".25",
        },

        img: {
          maxWidth: "none",
        },

        label: {
          display: "inline-block",
        },

        p: {
          "line-height": "1.625",
          "font-weight": "400",
          "margin-bottom": "1rem",
        },

        small: {
          "font-size": ".875em",
        },

        svg: {
          display: "inline",
        },

        table: {
          "border-collapse": "inherit",
        },

        "h1, h2, h3, h4, h5, h6": {
          "margin-bottom": ".5rem",
          color: "#344767",
        },

        "h1, h2, h3, h4": {
          "letter-spacing": "-0.05rem",
        },

        "h1, h2, h3": {
          "font-weight": "700",
        },
        "h4, h5, h6": {
          "font-weight": "600",
        },

        h1: {
          "font-size": "3rem",
          "line-height": "1.25",
        },
        h2: {
          "font-size": "2.25rem",
          "line-height": "1.3",
        },
        h3: {
          "font-size": "1.875rem",
          "line-height": "1.375",
        },
        h4: {
          "font-size": "1.5rem",
          "line-height": "1.375",
        },
        h5: {
          "font-size": "1.25rem",
          "line-height": "1.375",
        },
        h6: {
          "font-size": "1rem",
          "line-height": "1.625",
        },
      };
      addComponents(typography);
    }),
  ],
}

