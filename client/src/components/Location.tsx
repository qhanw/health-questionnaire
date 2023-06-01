import React, { useCallback, useEffect, useMemo, useState } from "react";

import { List, SpinLoading, Grid } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import "./Location.css";

type LocationType = {
  onChange?: (value?: string[]) => void;
  value?: string[];
};
const Location: React.FC<LocationType> = ({ onChange, value }) => {
  const [position, setPosition] = useState<any>();
  const [geolocation, setGeolocation] = useState<any>();
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // TODO: 开发完成后放开
    // const geo = new window.qq.maps.Geolocation(
    //   "2XDBZ-3BZWF-FPEJL-JNMP6-CFJY3-56BLG",
    //   "PF"
    // );
    // setGeolocation(geo);
  }, []);

  const onGetLocation = useCallback(() => {
    setLoading(true);
    geolocation.getLocation(
      (pos: any) => {
        setIsFirst(false);

        setPosition({ ...pos, status: 1, timestamp: new Date() });
        setLoading(false);
      },
      () => {
        setIsFirst(false);
        setPosition({ status: 0, timestamp: new Date() });
        setLoading(false);
      },
      { timeout: 8000 }
    );
  }, [geolocation]);

  const text = useMemo(() => {
    if (!position) return "获取定位";
    if (position.status === 0) {
      if (onChange) onChange(undefined);
      return "定位失败";
    }

    if (position.status === 1 && position.province !== "四川省") {
      if (onChange) onChange(undefined);
      return "当前位置不在川内，不能参与该问卷调查！";
    }

    const area = [position.city, position.district, position.addr].filter(
      (c) => c
    );

    if (onChange) onChange(area);

    return area.slice(0, 2).join(",");
  }, [position]);

  return (
    <Grid className="cus-location" columns={2}>
      <Grid.Item>地址（四川省）</Grid.Item>
      <Grid.Item>
        <div
          className="cus-location-flex"
          {...(!loading ? { onClick: onGetLocation } : {})}
        >
          <span
            className={[
              "cus-location-desc",
              ...(!isFirst || value ? ["cus-location-text"] : []),
            ].join(" ")}
          >
            {value?.slice(0, 2).join(",") || text}
          </span>

          <span className="cus-location-icon">
            {loading ? (
              <SpinLoading style={{ "--size": "14px" }} />
            ) : (
              <RightOutline style={{ fontSize: 14 }} />
            )}
          </span>
        </div>
      </Grid.Item>
    </Grid>
  );
};

export default Location;
