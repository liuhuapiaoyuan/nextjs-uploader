import { SVGProps } from 'react'

export const LoadingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='#007b94'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M12 2v4' />
    <path d='m16.2 7.8 2.9-2.9' />
    <path d='M18 12h4' />
    <path d='m16.2 16.2 2.9 2.9' />
    <path d='M12 18v4' />
    <path d='m4.9 19.1 2.9-2.9' />
    <path d='M2 12h4' />
    <path d='m4.9 4.9 2.9 2.9' />
  </svg>
)

// https://uxwing.com/pdf-icon/

export const FileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    shape-rendering='geometricPrecision'
    text-rendering='geometricPrecision'
    image-rendering='optimizeQuality'
    fillRule='evenodd'
    clip-rule='evenodd'
    viewBox='0 0 441 512.398'
  >
    <path
      fill='#262626'
      fillRule='nonzero'
      d='M60.863 0h174.809c3.382 0 6.384 1.619 8.279 4.124l110.107 119.119a10.292 10.292 0 012.745 7.012h.053v119.817a149.591 149.591 0 00-20.752-3.111v-92.212h-43.666v-.042h-.161c-22.046-.349-39.33-6.222-51.694-16.784-12.849-10.979-20.063-26.614-21.504-46.039a10.145 10.145 0 01-.095-1.404V20.752H60.863c-11.02 0-21.049 4.516-28.321 11.79-7.274 7.272-11.79 17.301-11.79 28.321v338.276c0 11.015 4.521 21.037 11.796 28.311 7.278 7.28 17.31 11.802 28.315 11.802h120.749a148.132 148.132 0 008.116 20.752H60.863c-16.73 0-31.958-6.85-42.987-17.881C6.852 431.099 0 415.882 0 399.139V60.863C0 44.114 6.842 28.894 17.87 17.87 28.894 6.842 44.114 0 60.863 0zm41.917 209.516c-5.727 0-10.372-4.645-10.372-10.372 0-5.726 4.645-10.372 10.372-10.372h151.286c5.727 0 10.372 4.646 10.372 10.372 0 5.727-4.645 10.372-10.372 10.372H102.78zm0 72.682c-5.727 0-10.372-4.646-10.372-10.373 0-5.727 4.645-10.372 10.372-10.372h143.27c2.83 0 5.395 1.134 7.265 2.971a149.435 149.435 0 00-25.876 17.774H102.78zm0 72.688c-5.727 0-10.372-4.645-10.372-10.372s4.645-10.372 10.372-10.372h85.566a148.095 148.095 0 00-7.597 20.744H102.78zM239.736 29.983v60.433c1.021 13.737 5.819 24.535 14.302 31.783 8.667 7.404 21.488 11.544 38.4 11.835v-.037h43.442L239.736 29.983z'
    />
    <path
      fill='red'
      d='M324.263 278.924c32.231 0 61.418 13.068 82.544 34.194C427.933 334.242 441 363.429 441 395.66c0 32.235-13.067 61.419-34.193 82.544-21.126 21.126-50.309 34.194-82.544 34.194-32.232 0-61.419-13.068-82.543-34.194-21.125-21.125-34.193-50.313-34.193-82.544 0-32.233 13.068-61.417 34.193-82.542 21.126-21.126 50.31-34.194 82.543-34.194z'
    />
    <path
      fill='#fff'
      d='M309.503 445.884h29.511c6.202 0 11.258-5.059 11.258-11.25v-32.26h20.777c3.75-.156 6.408-1.402 7.942-3.74 4.172-6.253-1.524-12.423-5.469-16.769l-42.111-42.81c-4.542-4.471-9.796-4.532-14.338 0l-43.119 43.983c-3.697 4.163-8.271 9.837-4.418 15.596 1.566 2.338 4.202 3.584 7.952 3.74h20.765v32.26c0 6.141 5.059 11.25 11.25 11.25z'
    />
  </svg>
)
// https://uxwing.com/pdf-icon/
export const PDFIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    shapeRendering='geometricPrecision'
    textRendering='geometricPrecision'
    imageRendering='optimizeQuality'
    fillRule='evenodd'
    clipRule='evenodd'
    viewBox='0 0 500 511.56'
    {...props}
  >
    <path
      fillRule='nonzero'
      d='M117.91 0h201.68c3.93 0 7.44 1.83 9.72 4.67l114.28 123.67c2.21 2.37 3.27 5.4 3.27 8.41l.06 310c0 35.43-29.4 64.81-64.8 64.81H117.91c-35.57 0-64.81-29.24-64.81-64.81V64.8C53.1 29.13 82.23 0 117.91 0zM325.5 37.15v52.94c2.4 31.34 23.57 42.99 52.93 43.5l36.16-.04-89.09-96.4zm96.5 121.3l-43.77-.04c-42.59-.68-74.12-21.97-77.54-66.54l-.09-66.95H117.91c-21.93 0-39.89 17.96-39.89 39.88v381.95c0 21.82 18.07 39.89 39.89 39.89h264.21c21.71 0 39.88-18.15 39.88-39.89v-288.3z'
    />
    <path
      fill='red'
      d='M28.04 194.61h443.92c15.43 0 28.04 12.63 28.04 28.04v188.54c0 15.4-12.63 28.04-28.04 28.04H28.04C12.64 439.23 0 426.61 0 411.19V222.65c0-15.43 12.62-28.04 28.04-28.04z'
    />
    <path
      fill='#fff'
      fillRule='nonzero'
      d='M150.36 348.17H125.2v29.21H86.5V256.45h60.95c27.74 0 41.6 14.9 41.6 44.7 0 16.38-3.61 28.51-10.83 36.37-2.71 2.97-6.45 5.49-11.22 7.55-4.78 2.07-10.32 3.1-16.64 3.1zm-25.16-60.76v29.8h8.9c4.65 0 8.03-.49 10.16-1.45 2.13-.97 3.19-3.2 3.19-6.68v-13.54c0-3.49-1.06-5.71-3.19-6.68-2.13-.97-5.51-1.45-10.16-1.45h-8.9zm79.82 89.97V256.45h54.17c21.8 0 36.77 4.65 44.89 13.93 8.13 9.29 12.19 24.8 12.19 46.54 0 21.73-4.06 37.24-12.19 46.53-8.12 9.29-23.09 13.93-44.89 13.93h-54.17zm54.75-89.97h-16.06v59.02h16.06c5.29 0 9.13-.62 11.52-1.84 2.38-1.23 3.58-4.03 3.58-8.42v-38.5c0-4.39-1.2-7.2-3.58-8.42-2.39-1.23-6.23-1.84-11.52-1.84zm145.99 45.08h-32.89v44.89h-38.7V256.45h79.33l-4.84 30.96h-35.79v16.25h32.89v28.83z'
    />
  </svg>
)

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </svg>
)
export const UploadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='m16 6-4-4-4 4' />
    <path d='M12 2v8' />
    <rect width='20' height='8' x='2' y='14' rx='2' />
    <path d='M6 18h.01' />
    <path d='M10 18h.01' />
  </svg>
)
export const UploadImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21' />
    <path d='m14 19.5 3-3 3 3' />
    <path d='M17 22v-5.5' />
    <circle cx='9' cy='9' r='2' />
  </svg>
)
