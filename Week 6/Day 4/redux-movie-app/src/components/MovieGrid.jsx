import { memo, useCallback, useMemo } from "react";
import { List } from "react-window";
import MovieCard from "./MovieCard";
import { useContainerWidth } from "../hooks/useContainerWidth";

const CARD_GAP = 16;
const ROW_HEIGHT = 455;

const MovieRow = memo(function MovieRow({ index, style, movies, columnCount, ariaAttributes }) {
  const start = index * columnCount;
  const rowItems = movies.slice(start, start + columnCount);

  return (
    <div style={style} className="movie-row" {...ariaAttributes}>
      <div
        className="row-grid"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          gap: `${CARD_GAP}px`,
        }}
      >
        {rowItems.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
});

function MovieGrid({ movies, onNearEnd }) {
  const { containerRef, width } = useContainerWidth();

  const columnCount = useMemo(() => {
    if (width < 520) return 1;
    if (width < 820) return 2;
    if (width < 1140) return 3;
    return 4;
  }, [width]);

  const rowCount = useMemo(() => Math.ceil(movies.length / columnCount), [movies.length, columnCount]);
  const rowProps = useMemo(() => ({ movies, columnCount }), [movies, columnCount]);

  const listHeight = useMemo(() => {
    if (typeof window === "undefined") return 680;
    return Math.max(500, window.innerHeight - 200);
  }, []);

  const handleRowsRendered = useCallback(
    ({ stopIndex }) => {
      if (rowCount > 0 && stopIndex >= rowCount - 3) {
        onNearEnd?.();
      }
    },
    [rowCount, onNearEnd],
  );

  return (
    <section ref={containerRef} className="virtual-container" aria-label="Movie results">
      <List
        rowComponent={MovieRow}
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        rowProps={rowProps}
        overscanCount={5}
        onRowsRendered={handleRowsRendered}
        style={{ height: listHeight, width: "100%" }}
      />
    </section>
  );
}

export default memo(MovieGrid);