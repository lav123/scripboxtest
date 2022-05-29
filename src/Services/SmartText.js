import React from 'react';

export const SmartText = ({ children }) => {
    const text = children;
    const length=22;
    const [isReadMore, setIsReadMore] = React.useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    if (text.length < length) {
      return <p>{text}</p>;
    }
    return (
      <p className="text">
        {isReadMore ? text.slice(0, length) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };