const KEY = "app:storage";

const storage = () => {
    let _data = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    const _save = () => {
        window.localStorage.setItem(KEY, JSON.stringify(_data));
    };

    return {
        get(key) {
            return _data[key];
        },
        set(key, value) {
            _data[key] = value;
            _save();
        },
        remove(key) {
            delete _data[key];
            _save();
        },
        clear() {
            _data = {};
            _save();
        },
    };
};

export default storage();
