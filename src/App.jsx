import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const getTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const removeTour = (id) => {
    setTours((prevTour) => prevTour.filter((tour) => tour.id !== id));
  };
  useEffect(() => {
    getTours();
  }, []);

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={() => getTours()}
          >
            refresh
          </button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
