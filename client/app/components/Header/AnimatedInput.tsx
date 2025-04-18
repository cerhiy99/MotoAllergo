import { useState, useEffect } from "react";
import styles from "./Header.module.css";

type Props = {
  dictionary: any;
};

const AnimatedInput: React.FC<Props> = ({ dictionary }: Props) => {
  const placeholderText:string = dictionary.animatedInput;
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < placeholderText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + placeholderText[index]);
        setIndex(index + 1);
      }, 120);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 1500);
    }
  }, [index, placeholderText]);

  return (
    <input
      type="text"
      placeholder={displayText}
      className={styles.searchInput}
    />
  );
};

export default AnimatedInput;
