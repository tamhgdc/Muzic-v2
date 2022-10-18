import * as React from "react";

import { useTopViews } from "hooks";
import { WrapperItemList } from "layouts";

export const TopViewsMillion = () => {
    const { dataMillion, loadingMillion, getTopViewsMillionApi, errorMillion } = useTopViews();
    React.useEffect(() => {
        if (!dataMillion.length) getTopViewsMillionApi({ _type: "million" });
    }, [errorMillion]);
    return <WrapperItemList data={dataMillion} loading={loadingMillion} title="Top Triệu View" />;
};
