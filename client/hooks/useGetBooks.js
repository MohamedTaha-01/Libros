import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function useGetBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  // GET /books request
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.40:3000/books");
      const result = await response.json();
      setBooks(result || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // fetch books
  useEffect(() => {
    fetchBooks();
  }, [isFocused]);

  return { books, loading };
}
