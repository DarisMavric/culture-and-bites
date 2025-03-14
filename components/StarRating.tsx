import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const Star = ({ filled, size = 19, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 .587l3.668 7.431 8.165 1.187-5.917 5.768 1.396 8.139L12 18.896l-7.312 3.854 1.396-8.139L.167 9.205l8.165-1.187z"
        fill={filled ? "#B59F78" : "none"}
        stroke="#B59F78"
        strokeWidth={filled ? 0 : 2}
      />
    </Svg>
  </TouchableOpacity>
);

const StarRating = ({
  initialRating = 0,
  totalStars = 5,
  isEditable = true,
  onRatingChange,
  size = 19,
  margin = 1,
}) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handlePress = (star) => {
    if (isEditable) {
      setRating(star);
      if (onRatingChange) {
        onRatingChange(star);
      }
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: totalStars }, (_, index) => {
        const star = index + 1;
        return (
          <View
            key={index}
            style={{ marginRight: index < totalStars - 1 ? margin : 0 }}
          >
            <Star
              filled={star <= rating}
              onPress={() => handlePress(star)}
              size={size}
            />
          </View>
        );
      })}
    </View>
  );
};

export default StarRating;
