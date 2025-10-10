import React from 'react';

const starImageUrl = 'https://openui.fly.dev/openui/16x16.svg?text=⭐';
const halfStarImageUrl = 'https://openui.fly.dev/openui/16x16.svg?text=⭐';
const logoUrls = {
  google: 'https://openui.fly.dev/openui/24x24.svg?text=G+',
  yelp: 'https://openui.fly.dev/openui/24x24.svg?text=Y',
  facebook: 'https://openui.fly.dev/openui/24x24.svg?text=F',
};

const RatingStar = ({ imageUrl }) => (
  <img aria-hidden="true" alt="star" src={imageUrl} className="w-4 h-4" />
);

const RatingSection = ({ rating, reviews, logo }) => (
  <div className="flex items-center space-x-2">
    {/* <img aria-hidden="true" alt={logo} src={logoUrls[logo]} className="w-6 h-6" /> */}
    <div>
      <div className="text-base font-bold">{rating}</div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{reviews} Reviews</div>
    </div>
  </div>
);

const RatingCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden max-w-md md:max-w-5xl mx-auto">
      <div className="bg-blue-600 text-white p-6 flex flex-col items-center justify-center w-full md:w-1/3">
        <div className="text-4xl font-bold">4.7</div>
        <div className="text-sm">of 5</div>
        <div className="flex space-x-1">
          <RatingStar imageUrl={starImageUrl} />
          <RatingStar imageUrl={starImageUrl} />
          <RatingStar imageUrl={starImageUrl} />
          <RatingStar imageUrl={starImageUrl} />
          <RatingStar imageUrl={halfStarImageUrl} />
        </div>
      </div>
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <RatingSection rating="4.8/5" reviews="1860" logo="google" />
        <RatingSection rating="4.6/5" reviews="1630" logo="yelp" />
        <RatingSection rating="4.7/5" reviews="2100" logo="facebook" />
      </div>
    </div>
  );
};

export default RatingCard;
