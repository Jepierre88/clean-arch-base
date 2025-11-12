import { useEffect, useState } from "react";
import { TCommonContextType } from "../../types/common/common-context.type";
import { getCommonAction } from "@/src/app/global-actions/get-common.action";
import { EServices } from "../../enums/common/services.enum";
import { TVehicleType } from "../../types/common/vehicle-types.type";

export default function UseCommon() {
  const [commonData, setCommonData] = useState<TCommonContextType | undefined>(
    undefined
  );

  const getData = async () => {
    await Promise.all([
      getCommonAction<TVehicleType[]>(EServices.VEHICLE_TYPES),
    ]).then(([vehicleTypes]) => {
      setCommonData({
        vehicleTypes: vehicleTypes.data?.data || [],
      });
    })
  };

  useEffect(() => {
    getData();
  }, []);

  return { commonData, setCommonData };
}
