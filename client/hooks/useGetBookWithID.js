import { useEffect, useState } from "react";

export default function useGetBookWithID(bookId) {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // GET /books/:id request function
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://192.168.1.40:3000/books/${bookId}`
        );
        const result = await response.json();
        setBook(result);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchBook();
  }, [bookId]);

  return { book, loading };
}
