// Components
import Hits from "@components/search/Hits";

// Hooks
import { useMemo } from "react";

// Types
import type { v230203TaterMetadataSchema } from "@T/TATR";

/**
 * Apply filters to determine which records should be rendered.
 */
const SearchResults: React.FC<{
  loadingRecords: boolean;
  records: Record<string, { id: string; metadata: v230203TaterMetadataSchema }>;
  filters: {
    byOwner: {
      active: boolean;
      filterValue: Set<string>;
      loading: boolean;
    };
    byName: {
      active: boolean;
      filterValue: string;
      loading: boolean;
    };
  };
}> = ({ loadingRecords, records, filters }) => {
  const recordsFilteredByOwner = useMemo(() => {
    if (loadingRecords || filters.byOwner.loading) return {};
    else if (
      !filters.byOwner.active ||
      // Filter is active & query finished by address owns no tokens:
      filters.byOwner.filterValue.size === 0
    )
      return records;
    else {
      return Array.from(filters.byOwner.filterValue).reduce(
        (memo, tokenId) => ({
          ...memo,
          [tokenId]: records[tokenId]
        }),
        {}
      );
    }
  }, [loadingRecords, filters.byOwner, records]);

  // Convert to an array for rest of filters
  let filteredRecords = Object.values(recordsFilteredByOwner);

  filteredRecords = useMemo(() => {
    if (loadingRecords || filters.byName.loading) return [];
    else if (!filters.byName.active) return filteredRecords;
    else {
      const value = filters.byName.filterValue.toLowerCase();
      return filteredRecords.filter((record) =>
        record.metadata.name.toLowerCase().includes(value)
      );
    }
  }, [loadingRecords, filters.byName, filteredRecords]);

  const loaded = !filters.byOwner.loading && !filters.byName.loading;

  return <Hits hits={filteredRecords} loaded={loaded} />;
};

export default SearchResults;
