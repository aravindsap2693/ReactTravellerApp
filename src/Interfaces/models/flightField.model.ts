export interface airportItemProps {
  
    city?: string;
    value?:string;
   
 
  }
  

  export interface airportListProps {
    data: airportItemProps[]; 
    error: string | null;
  }