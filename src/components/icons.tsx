type IconProps = {
  className?: string;
};

export function EyeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden="true">
      <path
        d="M0.767883 0.763794H4.51836L5.85443 14.0477C5.90996 14.4139 6.09597 14.7477 6.37819 14.9876C6.66039 15.2275 7.01979 15.3572 7.39015 15.3531H17.0651C17.4001 15.3706 17.7315 15.2779 18.0087 15.0894C18.286 14.9008 18.494 14.6267 18.6009 14.3088L20.6434 8.16594C20.7195 7.935 20.7398 7.68925 20.7023 7.44897C20.665 7.20868 20.571 6.9807 20.4284 6.78379C20.2797 6.57445 20.0808 6.40572 19.8502 6.29303C19.6195 6.18035 19.3641 6.12732 19.1076 6.13879H5.05586"
        stroke="currentColor"
        strokeWidth="1.53571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.8041 20.7274C16.38 20.7274 16.0362 20.3836 16.0362 19.9596C16.0362 19.5356 16.38 19.1917 16.8041 19.1917C17.2281 19.1917 17.5719 19.5356 17.5719 19.9596C17.5719 20.3836 17.2281 20.7274 16.8041 20.7274Z"
        stroke="currentColor"
        strokeWidth="1.53571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.82181 20.7274C6.39772 20.7274 6.05396 20.3836 6.05396 19.9596C6.05396 19.5356 6.39772 19.1917 6.82181 19.1917C7.24588 19.1917 7.58967 19.5356 7.58967 19.9596C7.58967 20.3836 7.24588 20.7274 6.82181 20.7274Z"
        stroke="currentColor"
        strokeWidth="1.53571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DeliveryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 26" fill="none" className={className} aria-hidden="true">
      <path
        d="M19.9988 19.0001C19.5211 19.0001 19.063 18.8103 18.7252 18.4725C18.3874 18.1348 18.1976 17.6766 18.1976 17.1989C18.1976 16.7212 18.3874 16.2631 18.7252 15.9253C19.063 15.5875 19.5211 15.3977 19.9988 15.3977C20.4765 15.3977 20.9347 15.5875 21.2724 15.9253C21.6102 16.2631 21.8 16.7212 21.8 17.1989C21.8 17.6766 21.6102 18.1348 21.2724 18.4725C20.9347 18.8103 20.4765 19.0001 19.9988 19.0001ZM11.5988 19.0001C11.1211 19.0001 10.663 18.8103 10.3252 18.4725C9.98738 18.1348 9.79761 17.6766 9.79761 17.1989C9.79761 16.7212 9.98738 16.2631 10.3252 15.9253C10.663 15.5875 11.1211 15.3977 11.5988 15.3977C12.0765 15.3977 12.5347 15.5875 12.8724 15.9253C13.2102 16.2631 13.4 16.7212 13.4 17.1989C13.4 17.6766 13.2102 18.1348 12.8724 18.4725C12.5347 18.8103 12.0765 19.0001 11.5988 19.0001Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.8 17.2H8V14.8C8 14.1635 8.25286 13.5531 8.70294 13.103C9.15303 12.6529 9.76348 12.4 10.4 12.4H12.8C13.4365 12.4 14.047 12.6529 14.4971 13.103C14.9471 13.5531 15.2 14.1635 15.2 14.8V15.4C15.2 15.8774 15.3896 16.3353 15.7272 16.6728C16.0648 17.0104 16.5226 17.2 17 17.2H18.2H13.4M21.8 17.2H22.4C23.0624 17.2 23.6144 16.6576 23.4896 16.0072C23.0924 13.9336 21.6392 12.4 19.4 12.4H18.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 7H18.8V15.8548" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M21.2 8.19995H20C19.6817 8.19995 19.3765 8.32638 19.1515 8.55142C18.9264 8.77647 18.8 9.08169 18.8 9.39995C18.8 9.71821 18.9264 10.0234 19.1515 10.2485C19.3765 10.4735 19.6817 10.6 20 10.6H21.2V8.19995Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 12.4H12.2C12.5183 12.4 12.8235 12.2736 13.0485 12.0485C13.2736 11.8235 13.4 11.5183 13.4 11.2V8.2C13.4 7.88174 13.2736 7.57652 13.0485 7.35147C12.8235 7.12643 12.5183 7 12.2 7H9.2C8.88174 7 8.57652 7.12643 8.35147 7.35147C8.12643 7.57652 8 7.88174 8 8.2V11.2C8 11.5183 8.12643 11.8235 8.35147 12.0485C8.57652 12.2736 8.88174 12.4 9.2 12.4Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 7h11v9H2V7zM13 10h4l3 3v3h-7v-6zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-11 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CoinsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M18.09 10.37A6 6 0 1110.34 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 6h1v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.71 13.88l.7.71-2.82 2.82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WarningIcon({ className }: IconProps) {
  return (
    <svg viewBox="6 6 12 10" fill="none" className={className} aria-hidden="true">
      <path
        d="M11.5197 9.39237V11.3015M11.5197 13.2106H11.5246M10.6949 6.93917L6.60903 13.6878C6.52479 13.8322 6.48021 13.9958 6.47974 14.1625C6.47927 14.3292 6.52291 14.4931 6.60634 14.6379C6.68976 14.7827 6.81005 14.9033 6.95524 14.9879C7.10043 15.0724 7.26546 15.1178 7.43391 15.1197H15.6056C15.774 15.1178 15.939 15.0724 16.0842 14.9879C16.2294 14.9033 16.3497 14.7827 16.4331 14.6379C16.5166 14.4931 16.5602 14.3292 16.5597 14.1625C16.5593 13.9958 16.5147 13.8322 16.4304 13.6878L12.3446 6.93917C12.2586 6.7989 12.1375 6.68293 11.9931 6.60244C11.8486 6.52196 11.6855 6.47968 11.5197 6.47968C11.3539 6.47968 11.1909 6.52196 11.0464 6.60244C10.9019 6.68293 10.7808 6.7989 10.6949 6.93917Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5281 16.2863C12.2355 16.5792 11.7608 16.5795 11.4678 16.2869C11.4676 16.2867 11.4674 16.2865 11.4672 16.2863L5.8405 10.6567V10.6567C5.54355 10.3677 5.53714 9.89262 5.82619 9.59567C6.11524 9.29872 6.59028 9.29232 6.88723 9.58137C6.89199 9.586 6.89669 9.5907 6.90133 9.59547L11.9976 14.6943L17.0938 9.59547C17.3827 9.2983 17.8577 9.29156 18.1549 9.58041C18.4521 9.86926 18.4588 10.3443 18.17 10.6415C18.165 10.6466 18.1599 10.6517 18.1547 10.6567L12.5281 16.2863Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1066 14.4203L12.0103 9.32146L6.91408 14.4203C6.61714 14.7093 6.14209 14.7029 5.85304 14.406C5.56941 14.1146 5.5695 13.6503 5.85325 13.359L11.4799 7.72951C11.7725 7.43653 12.2472 7.43626 12.5402 7.7289C12.5404 7.7291 12.5406 7.7293 12.5408 7.72951L18.1675 13.359C18.4575 13.655 18.4527 14.13 18.1567 14.4201C17.8651 14.7059 17.3984 14.706 17.1066 14.4203V14.4203Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WalkingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="13" cy="4" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M11.2 8L8.6 9.4L7 13.4M11.2 8L13.4 8.8L15.2 7M11.2 8L10.4 12L8 16.8M10.4 12L13 13L14.6 16.8M10.4 12L13.4 11.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CouponIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 9.5V6.5C4 5.67 4.67 5 5.5 5H18.5C19.33 5 20 5.67 20 6.5V9.5C18.9 9.5 18 10.4 18 11.5C18 12.6 18.9 13.5 20 13.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V13.5C5.1 13.5 6 12.6 6 11.5C6 10.4 5.1 9.5 4 9.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M13 6.5L13 16.5" stroke="currentColor" strokeWidth="1.4" strokeDasharray="1.6 1.6" strokeLinecap="round" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7.2V11.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MoreVerticalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  );
}

export function LocationTargetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="5.5" stroke="#FA27A3" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="0.7" stroke="#FA27A3" strokeWidth="1.4" />
      <path d="M12 6.5V4M12 20v-2.5M17.5 12H20M4 12h2.5" stroke="#FA27A3" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function FavoriteBadgeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7492 8.97437L11.9756 12.8778C12.0593 13.125 11.9268 13.3932 11.6796 13.4769C11.5343 13.5261 11.3741 13.5017 11.25 13.4114L7.99991 10.9618L4.75633 13.4101C4.54459 13.5626 4.2493 13.5146 4.09678 13.3028C4.00735 13.1787 3.98358 13.0189 4.03301 12.8741L5.25051 8.98004L1.95754 6.61526H1.95754C1.74297 6.46137 1.6938 6.16267 1.8477 5.94811C1.93613 5.82482 2.07784 5.75082 2.22956 5.74871H6.28621L7.55203 1.83314V1.83314C7.62899 1.5858 7.89188 1.44767 8.13922 1.52463C8.28654 1.57046 8.4019 1.68582 8.44773 1.83314L9.71356 5.74871H13.7836C14.0476 5.75239 14.2586 5.96941 14.255 6.23343C14.2528 6.38529 14.1787 6.52711 14.0552 6.61551L10.7492 8.97437Z"
        fill="#E9B200"
      />
    </svg>
  );
}

export function SwirlIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 52 53" fill="none" className={className} aria-hidden="true">
      <path
        d="M26.4665 1.3802C26.5132 0.55236 27.2243 -0.0849363 28.0481 0.00924435C41.2502 1.51859 51.505 12.7277 51.5052 26.3339C51.5052 40.9693 39.6406 52.8337 25.0052 52.8339C13.5388 52.8339 3.77559 45.551 0.0842355 35.3588C-0.205761 34.5581 0.281717 33.7014 1.10639 33.489C1.88743 33.2877 2.68347 33.7413 2.96367 34.4976C6.28105 43.4519 14.8971 49.8339 25.0052 49.8339C37.9838 49.8337 48.5052 39.3125 48.5052 26.3339C48.505 14.3271 39.4999 4.4252 27.8752 3.00972C27.0535 2.90967 26.4199 2.20658 26.4665 1.3802Z"
        fill="#FA27A3"
      />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.3333 21C16.5926 21 15.963 20.7375 15.4444 20.2125C14.9259 19.6875 14.6667 19.05 14.6667 18.3C14.6667 18.195 14.6741 18.0861 14.6889 17.9733C14.7037 17.8605 14.7259 17.7594 14.7556 17.67L8.48889 13.98C8.23704 14.205 7.95556 14.3814 7.64444 14.5092C7.33333 14.637 7.00741 14.7006 6.66667 14.7C5.92593 14.7 5.2963 14.4375 4.77778 13.9125C4.25926 13.3875 4 12.75 4 12C4 11.25 4.25926 10.6125 4.77778 10.0875C5.2963 9.5625 5.92593 9.3 6.66667 9.3C7.00741 9.3 7.33333 9.3639 7.64444 9.4917C7.95556 9.6195 8.23704 9.7956 8.48889 10.02L14.7556 6.33C14.7259 6.24 14.7037 6.1389 14.6889 6.0267C14.6741 5.9145 14.6667 5.8056 14.6667 5.7C14.6667 4.95 14.9259 4.3125 15.4444 3.7875C15.963 3.2625 16.5926 3 17.3333 3C18.0741 3 18.7037 3.2625 19.2222 3.7875C19.7407 4.3125 20 4.95 20 5.7C20 6.45 19.7407 7.0875 19.2222 7.6125C18.7037 8.1375 18.0741 8.4 17.3333 8.4C16.9926 8.4 16.6667 8.3364 16.3556 8.2092C16.0444 8.082 15.763 7.9056 15.5111 7.68L9.24444 11.37C9.27407 11.46 9.2963 11.5614 9.31111 11.6742C9.32593 11.787 9.33333 11.8956 9.33333 12C9.33333 12.105 9.32593 12.2139 9.31111 12.3267C9.2963 12.4395 9.27407 12.5406 9.24444 12.63L15.5111 16.32C15.763 16.095 16.0444 15.9189 16.3556 15.7917C16.6667 15.6645 16.9926 15.6006 17.3333 15.6C18.0741 15.6 18.7037 15.8625 19.2222 16.3875C19.7407 16.9125 20 17.55 20 18.3C20 19.05 19.7407 19.6875 19.2222 20.2125C18.7037 20.7375 18.0741 21 17.3333 21Z" />
    </svg>
  );
}

export function CoinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <path
        d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
        fill="#FC6EC1"
      />
      <circle cx="17.9999" cy="18" r="15.5202" fill="#FA27A3" stroke="#FDBCE2" strokeWidth="2" />
      <path
        d="M18 8.44839V26.2544M22.0468 11.6859H15.9766C15.2253 11.6859 14.5047 11.9843 13.9735 12.5156C13.4423 13.0468 13.1438 13.7673 13.1438 14.5186C13.1438 15.2699 13.4423 15.9905 13.9735 16.5217C14.5047 17.0529 15.2253 17.3514 15.9766 17.3514H20.0234C20.7747 17.3514 21.4952 17.6499 22.0265 18.1811C22.5577 18.7123 22.8562 19.4329 22.8562 20.1842C22.8562 20.9355 22.5577 21.656 22.0265 22.1872C21.4952 22.7185 20.7747 23.0169 20.0234 23.0169H13.1438"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
