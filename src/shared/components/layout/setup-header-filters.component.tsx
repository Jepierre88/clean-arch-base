"use client";

import { useEffect } from "react";

import { UseHeaderContext } from "../../context/header.context";

interface SetupHeaderFiltersProps {
    showDatePicker: boolean;
    showSearch: boolean;
}

export const SetupHeaderFilters = ({
    showDatePicker,
    showSearch,
}: SetupHeaderFiltersProps) => {
    const { setShowDatePicker, setShowSearch } = UseHeaderContext();

    useEffect(() => {
        setShowDatePicker(showDatePicker);
    }, [setShowDatePicker, showDatePicker]);

    useEffect(() => {
        setShowSearch(showSearch);
    }, [setShowSearch, showSearch]);

    return null;
};