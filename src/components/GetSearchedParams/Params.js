export const getParams = (param) => {
    const params = new URLSearchParams(window.location.search);

    const name = params.get(param);

    console.log(name);
    return name;
}