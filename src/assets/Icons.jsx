/* eslint-disable react/prop-types */
export const ChevronDown = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Lock = ({ fill, size, height, width, ...props }) => {
  const color = fill;

  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(3.5 2)">
        <path
          d="M9.121,6.653V4.5A4.561,4.561,0,0,0,0,4.484V6.653"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(3.85 0.75)"
        />
        <path
          d="M.5,0V2.221"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(7.91 12.156)"
        />
        <path
          d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.4,0,7.66,0Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(0.75 6.824)"
        />
      </g>
    </svg>
  );
};

export const Activity = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
        <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
        <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
      </g>
    </svg>
  );
};

export const Flash = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Server = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const TagUser = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Scale = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EyeIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

export const StoreIcon = ({ size, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 250 250"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M242.188 78.125C242.177 76.3628 241.572 74.6558 240.469 73.2812L216.25 42.9688C213.324 39.3145 209.615 36.3642 205.396 34.3359C201.177 32.3075 196.556 31.2529 191.875 31.25H58.125C53.4438 31.2529 48.823 32.3075 44.6041 34.3359C40.3851 36.3642 36.6758 39.3145 33.75 42.9688L9.53125 73.2812C8.42843 74.6558 7.82272 76.3628 7.8125 78.125C7.84542 83.5786 9.30496 88.9285 12.0461 93.6433C14.7872 98.358 18.7144 102.273 23.4375 105V210.938C23.4375 213.01 24.2606 214.997 25.7257 216.462C27.1909 217.927 29.178 218.75 31.25 218.75H218.75C220.822 218.75 222.809 217.927 224.274 216.462C225.739 214.997 226.562 213.01 226.562 210.938V105C231.286 102.273 235.213 98.358 237.954 93.6433C240.695 88.9285 242.155 83.5786 242.188 78.125ZM45.9375 52.7344C47.4004 50.9072 49.2551 49.4321 51.3645 48.4179C53.474 47.4038 55.7844 46.8765 58.125 46.875H191.875C194.216 46.8765 196.526 47.4038 198.635 48.4179C200.745 49.4321 202.6 50.9072 204.062 52.7344L226.562 80.625C225.964 84.3223 224.056 87.6814 221.188 90.0904C218.321 92.4995 214.683 93.7982 210.938 93.75C207.901 93.7454 204.932 92.8563 202.393 91.1913C199.854 89.5264 197.855 87.1578 196.641 84.375C196.04 82.9657 195.039 81.764 193.761 80.9193C192.483 80.0747 190.985 79.6244 189.453 79.6244C187.921 79.6244 186.423 80.0747 185.145 80.9193C183.867 81.764 182.866 82.9657 182.266 84.375C181.043 87.1477 179.041 89.505 176.502 91.16C173.964 92.8149 170.999 93.696 167.969 93.696C164.939 93.696 161.974 92.8149 159.435 91.16C156.897 89.505 154.894 87.1477 153.672 84.375C153.072 82.9657 152.07 81.764 150.792 80.9193C149.514 80.0747 148.016 79.6244 146.484 79.6244C144.953 79.6244 143.454 80.0747 142.177 80.9193C140.899 81.764 139.897 82.9657 139.297 84.375C138.074 87.1477 136.072 89.505 133.533 91.16C130.995 92.8149 128.03 93.696 125 93.696C121.97 93.696 119.005 92.8149 116.466 91.16C113.928 89.505 111.926 87.1477 110.703 84.375C110.103 82.9657 109.101 81.764 107.823 80.9193C106.546 80.0747 105.047 79.6244 103.516 79.6244C101.984 79.6244 100.486 80.0747 99.2078 80.9193C97.9299 81.764 96.9285 82.9657 96.3281 84.375C95.1056 87.1477 93.1032 89.505 90.5648 91.16C88.0263 92.8149 85.0615 93.696 82.0312 93.696C79.001 93.696 76.0362 92.8149 73.4977 91.16C70.9593 89.505 68.9569 87.1477 67.7344 84.375C67.134 82.9657 66.1326 81.764 64.8547 80.9193C63.5768 80.0747 62.0787 79.6244 60.5469 79.6244C59.015 79.6244 57.517 80.0747 56.2391 80.9193C54.9611 81.764 53.9597 82.9657 53.3594 84.375C52.1449 87.1578 50.1459 89.5264 47.6069 91.1913C45.0679 92.8563 42.0987 93.7454 39.0625 93.75C35.3173 93.7982 31.6795 92.4995 28.8115 90.0904C25.9436 87.6814 24.0365 84.3223 23.4375 80.625L45.9375 52.7344ZM70.3125 203.125V140.625H101.562V203.125H70.3125ZM210.938 203.125H117.188V132.812C117.188 130.74 116.364 128.753 114.899 127.288C113.434 125.823 111.447 125 109.375 125H62.5C60.428 125 58.4409 125.823 56.9757 127.288C55.5106 128.753 54.6875 130.74 54.6875 132.812V203.125H39.0625V109.375C47.049 109.386 54.7367 106.339 60.5469 100.859C66.3507 106.354 74.0391 109.416 82.0312 109.416C90.0234 109.416 97.7118 106.354 103.516 100.859C109.319 106.354 117.008 109.416 125 109.416C132.992 109.416 140.681 106.354 146.484 100.859C152.288 106.354 159.977 109.416 167.969 109.416C175.961 109.416 183.649 106.354 189.453 100.859C195.263 106.339 202.951 109.386 210.938 109.375V203.125Z"
      fill="#1D9634"
    />
    <path
      d="M140.625 125C138.553 125 136.566 125.823 135.101 127.288C133.636 128.753 132.812 130.74 132.812 132.812V179.688C132.812 181.76 133.636 183.747 135.101 185.212C136.566 186.677 138.553 187.5 140.625 187.5H187.5C189.572 187.5 191.559 186.677 193.024 185.212C194.489 183.747 195.312 181.76 195.312 179.688V132.812C195.312 130.74 194.489 128.753 193.024 127.288C191.559 125.823 189.572 125 187.5 125H140.625ZM179.688 171.875H148.438V140.625H179.688V171.875Z"
      fill="#1D9634"
    />
  </svg>
);

export const PlusIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);

export const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const EditIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

export const DeleteIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="2em"
    role="presentation"
    viewBox="0 0 20 20"
    width="2em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const PhotoIcon = ({ size, fill, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Iconly/Regular/Light/Image 3">
      <g id="Image 2">
        <path
          id="Stroke 1"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3028 2.74994H7.65076C4.63876 2.74994 2.74976 4.88394 2.74976 7.90394V16.0499C2.74976 19.0699 4.63076 21.2039 7.65076 21.2039H16.2978C19.3228 21.2039 21.2028 19.0699 21.2028 16.0499V7.90394C21.2068 4.88394 19.3258 2.74994 16.3028 2.74994Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.7031 8.78515C10.7031 9.80515 9.87711 10.6311 8.85711 10.6311C7.83811 10.6311 7.01111 9.80515 7.01111 8.78515C7.01111 7.76515 7.83811 6.93915 8.85711 6.93915C9.87611 6.94015 10.7021 7.76615 10.7031 8.78515Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 5"
          d="M21.207 14.9512C20.284 14.0012 18.509 12.0822 16.579 12.0822C14.648 12.0822 13.535 16.3152 11.678 16.3152C9.821 16.3152 8.134 14.4012 6.646 15.6282C5.158 16.8542 3.75 19.3612 3.75 19.3612"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export const MaterialIcon = ({ size, fill, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Iconly/Regular/Light/Category">
      <g id="Category">
        <path
          id="Stroke 1"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 6.50012C3 3.87491 3.02811 3.00012 6.5 3.00012C9.97189 3.00012 10 3.87491 10 6.50012C10 9.12533 10.0111 10.0001 6.5 10.0001C2.98893 10.0001 3 9.12533 3 6.50012Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 6.50012C14 3.87491 14.0281 3.00012 17.5 3.00012C20.9719 3.00012 21 3.87491 21 6.50012C21 9.12533 21.0111 10.0001 17.5 10.0001C13.9889 10.0001 14 9.12533 14 6.50012Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 17.5001C3 14.8749 3.02811 14.0001 6.5 14.0001C9.97189 14.0001 10 14.8749 10 17.5001C10 20.1253 10.0111 21.0001 6.5 21.0001C2.98893 21.0001 3 20.1253 3 17.5001Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 7"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 17.5001C14 14.8749 14.0281 14.0001 17.5 14.0001C20.9719 14.0001 21 14.8749 21 17.5001C21 20.1253 21.0111 21.0001 17.5 21.0001C13.9889 21.0001 14 20.1253 14 17.5001Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export const CouponIcon = ({ size, fill, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Iconly/Regular/Light/Ticket Star">
      <g id="Ticket Star">
        <path
          id="Stroke 1"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.8572 20.4172C19.7302 20.4172 21.2492 18.8992 21.2502 17.0262V17.0242V14.3242C20.0132 14.3242 19.0112 13.3222 19.0102 12.0852C19.0102 10.8492 20.0122 9.84621 21.2492 9.84621H21.2502V7.14621C21.2522 5.27221 19.7352 3.75221 17.8622 3.75021H17.8562H6.14424C4.27024 3.75021 2.75124 5.26821 2.75024 7.14221V7.14321V9.93321C3.94424 9.89121 4.94524 10.8252 4.98724 12.0192C4.98824 12.0412 4.98924 12.0632 4.98924 12.0852C4.99024 13.3202 3.99124 14.3222 2.75624 14.3242H2.75024V17.0242C2.74924 18.8972 4.26824 20.4172 6.14124 20.4172H6.14224H17.8572Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3713 9.06321L12.9873 10.3102C13.0473 10.4322 13.1633 10.5172 13.2983 10.5372L14.6753 10.7382C15.0163 10.7882 15.1513 11.2062 14.9053 11.4452L13.9093 12.4152C13.8113 12.5102 13.7673 12.6472 13.7893 12.7822L14.0243 14.1522C14.0823 14.4912 13.7273 14.7492 13.4233 14.5892L12.1923 13.9422C12.0713 13.8782 11.9273 13.8782 11.8063 13.9422L10.5763 14.5892C10.2713 14.7492 9.91634 14.4912 9.97434 14.1522L10.2093 12.7822C10.2323 12.6472 10.1873 12.5102 10.0893 12.4152L9.09434 11.4452C8.84834 11.2062 8.98334 10.7882 9.32334 10.7382L10.7003 10.5372C10.8353 10.5172 10.9523 10.4322 11.0123 10.3102L11.6273 9.06321C11.7793 8.75521 12.2193 8.75521 12.3713 9.06321Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export const HomeIcon = ({ size, fill, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Iconly/Regular/Light/Home">
      <g id="Home">
        <path
          id="Home_2"
          d="M9.15722 20.7715V17.7048C9.1572 16.9248 9.79312 16.2909 10.581 16.2857H13.4671C14.2587 16.2857 14.9005 16.9211 14.9005 17.7048V17.7048V20.781C14.9003 21.4433 15.4343 21.9846 16.103 22.0001H18.0271C19.9451 22.0001 21.5 20.4608 21.5 18.562V18.562V9.83796C21.4898 9.09095 21.1355 8.38947 20.538 7.93315L13.9577 2.68542C12.8049 1.77169 11.1662 1.77169 10.0134 2.68542L3.46203 7.94268C2.86226 8.39714 2.50739 9.09979 2.5 9.84748V18.562C2.5 20.4608 4.05488 22.0001 5.97291 22.0001H7.89696C8.58235 22.0001 9.13797 21.4501 9.13797 20.7715V20.7715"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export const SwapIcon = ({ size, fill, ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Iconly/Regular/Light/Swap">
      <g id="Swap">
        <path
          id="Stroke 1"
          d="M16.8396 20.1643V6.54657"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 3"
          d="M20.9173 16.0682L16.8395 20.1649L12.7617 16.0682"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 5"
          d="M6.91115 3.83301V17.4508"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 7"
          d="M2.8335 7.92913L6.91127 3.83246L10.9891 7.92913"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export const EyeSlashFilledIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
      fill="currentColor"
    />
    <path
      d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
      fill="currentColor"
    />
    <path
      d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
      fill="currentColor"
    />
    <path
      d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
      fill="currentColor"
    />
    <path
      d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
      fill="currentColor"
    />
  </svg>
);

export const EyeFilledIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
      fill="currentColor"
    />
    <path
      d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
      fill="currentColor"
    />
  </svg>
);
