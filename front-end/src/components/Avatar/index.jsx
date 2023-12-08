import { useState } from "react";

import images from "~/assets/images";
import cx from "~/utils/cx";

function Avatar({ src, name = "", fallback = images.avatarPlaceholder }) {
    const [_src, setSrc] = useState(src ?? fallback);

    return (
        <img
            className={cx("w-[28px] h-[28px]", "object-cover", "rounded-full")}
            src={_src}
            alt={name}
            onError={() => setSrc(fallback)}
        />
    );
}

export default Avatar;
