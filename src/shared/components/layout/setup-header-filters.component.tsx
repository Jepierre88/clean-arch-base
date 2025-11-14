'use client'
import { UseHeaderContext } from "../../context/header.context";

interface SetupHeaderFiltersProps {
    showDatePicker: boolean;
    showSearch: boolean;
}

export const SetupHeaderFilters = ({
    showDatePicker,
    showSearch
}: SetupHeaderFiltersProps)=>{
    const {setShowDatePicker, setShowSearch} = UseHeaderContext();
    setShowDatePicker(showDatePicker);
    setShowSearch(showSearch);

    return null
}