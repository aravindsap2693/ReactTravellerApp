// state.model.ts

// Define the shape of each state item
export interface stateItemProps {
  id: number;
  state: string;
  created_at: string;
  updated_at: string;
}

// Define the overall state structure
export interface stateListProps {
  stateList: stateItemProps[]; // This is the array to hold state items
  error: string | null;
}

