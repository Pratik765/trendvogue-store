import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../store/itemSlice";
import { fetchStatusAction } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusAction.markFetchingStarted());

    fetch("http://localhost:8080/items", { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(({ items }) => {
        dispatch(fetchStatusAction.markFetchDone());
        dispatch(fetchStatusAction.markFetchingDone());
        // Handle both flattened array or nested legacy array gracefully
        const resolvedItems = Array.isArray(items[0]) ? items[0] : items;
        dispatch(itemsAction.addInitialItems(resolvedItems));
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch items from backend:", err);
          dispatch(fetchStatusAction.markFetchingDone());
        }
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus.fetchDone, dispatch]);

  return null;
};

export default FetchItems;
