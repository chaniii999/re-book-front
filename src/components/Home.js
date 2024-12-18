import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Card({ book, imageUrl }) {
  return (
    <div className={`${styles.card} mb-4 shadow-sm`}>
      <Link
        to={`/board/detail/${book.bookUuid}`} // a 태그 대신 Link를 사용합니다.
        className={styles["text-decoration-none"]}
      >
        <img
          src={imageUrl}
          className={`${styles["card-img-top"]} ${styles["card-img"]}`}
          alt={`Cover of ${book.bookName}`}
        />
        <div className={styles["card-info"]}>
          <h3 className={styles["card-title"]}>{book.bookName}</h3>
          <p className={styles["author-pub"]}>
            {book.bookWriter} | {book.bookPub}
          </p>
          <div className={styles["like-rating"]}>
            <strong>❤️ {book.likeCount}</strong>
            <strong>
              ⭐{" "}
              {book.reviewCount === 0
                ? "0"
                : (book.bookRating / book.reviewCount).toFixed(1)}
            </strong>
            <strong> 🗨️ {book.reviewCount}</strong>
          </div>
        </div>
      </Link>
    </div>
  );
}

function Section({ title, books, imageUrl }) {
  return (
    <>
      <h2 className={styles["mt-5"]}>{title}</h2>
      <div className={styles.slider}>
        <div className={styles["slider-wrapper"]}>
          {books.map((book) => (
            <Card key={book.bookUuid} book={book} imageUrl={imageUrl} />
          ))}
        </div>
      </div>
    </>
  );
}

function Home() {
  const [data, setData] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    console.log(API_BASE_URL);

    fetch(`http://localhost:8181/`)
      .then((res) => res.json())
      .then((result) => {
        if (result.result) {
          setData(result.result);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const sections = [
    {
      title: "🔥HOT🔥 평점이 높은 도서",
      books: data.recommendedByRating,
      imageUrl: "/images/Cover1.jpg",
    },
    {
      title: "🔥HOT🔥 리뷰 수가 많은 도서",
      books: data.recommendedByReviewCount,
      imageUrl: "/images/Cover2.jpg",
    },
    {
      title: "🔥HOT🔥 좋아요 수가 많은 도서",
      books: data.recommendedByLikeCount,
      imageUrl: "/images/Cover3.jpg",
    },
  ];

  // 버튼 클릭 시 섹션 변경
  const handleSwitchSection = (direction) => {
    setCurrentSection(
      (prevSection) =>
        (prevSection + direction + sections.length) % sections.length
    );
  };

  return (
    <div className={`${styles.container} my-5 text-center`}>
      {sections.map((section, index) => (
        <div
          key={index}
          className={`${styles.section} ${
            currentSection === index ? styles["active-section"] : ""
          }`}
          style={{
            transform:
              currentSection === index
                ? "translateX(0)"
                : currentSection > index
                ? "translateX(-100%)"
                : "translateX(100%)",
            opacity: currentSection === index ? 1 : 0,
          }}
        >
          <Section
            title={section.title}
            books={section.books}
            imageUrl={section.imageUrl}
          />
        </div>
      ))}

      <button
        className={`${styles["control-button"]} ${styles["prev-button"]}`}
        onClick={() => handleSwitchSection(-1)}
      >
        &#9664;
      </button>
      <button
        className={`${styles["control-button"]} ${styles["next-button"]}`}
        onClick={() => handleSwitchSection(1)}
      >
        &#9654;
      </button>
    </div>
  );
}

export default Home;
